import { useEffect, useRef, useState } from 'react';

export const isBrowser = typeof window !== 'undefined';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);
  return fine;
}

/** Fires once when the element crosses `threshold`. SSR-safe: false on the server. */
export function useInViewOnce<T extends Element>(threshold = 0.2, rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return { ref, inView };
}

/** 0..1 progress of an element scrolling through the viewport (top hits top → bottom hits bottom). */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        progress.current = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return { ref, progress };
}

/** Decide whether a heavy WebGL scene should run on this device. */
/**
 * True only for a dedicated GPU (or Apple silicon). Software renderers (SwiftShader, llvmpipe,
 * hardware acceleration off) and integrated laptop graphics (Intel UHD/Iris, AMD Radeon APUs)
 * report false: they stutter on the live scenes, so those PCs get the frame sequence instead.
 */
export function hasDedicatedGPU() {
  try {
    const c = document.createElement('canvas');
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = (c.getContext('webgl2', opts) || c.getContext('webgl', opts)) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return false;
    if (/nvidia|geforce|quadro|rtx|radeon\s*rx|radeon\s*pro|arc\s*a\d|apple/i.test(renderer)) return true;
    if (/intel|iris|uhd|radeon\s*\(tm\)\s*(graphics|\d{3}m)|radeon\s*(graphics|vega)|vega\s*\d/i.test(renderer)) return false;
    return true; // unknown but hardware: try live, the fps guard falls back if it stutters
  } catch {
    return false;
  }
}

export type SceneMode = 'webgl' | 'frames' | 'poster';

/**
 * How a scroll story renders its background:
 *  - webgl:  live three.js scene (desktop with a dedicated GPU)
 *  - frames: pre-rendered image sequence scrubbed by scroll (phones, PCs on integrated or no GPU)
 *  - poster: a single still (reduced motion, data saver)
 */
export function sceneMode(): SceneMode {
  if (!isBrowser) return 'poster';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'poster';
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return 'poster';
  if ((window as Window & { __sceneCapture?: unknown }).__sceneCapture) return 'webgl'; // frame capture script
  if (window.innerWidth < 760) return 'frames';
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return 'frames';
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return 'frames';
  return hasDedicatedGPU() ? 'webgl' : 'frames';
}

/** Read a CSS custom property from :root (used by canvases to follow the palette). */
export function cssVar(name: string, fallback = '#000') {
  if (!isBrowser) return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** "R G B" channel var → css rgb() string */
export function cssRgb(name: string, alpha = 1, fallback = '0 0 0') {
  const v = cssVar(name, fallback);
  return `rgb(${v.split(/\s+/).join(',')}${alpha < 1 ? `,${alpha}` : ''})`.replace('rgb(', alpha < 1 ? 'rgba(' : 'rgb(');
}
