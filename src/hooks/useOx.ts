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
 * 'dedicated' (discrete GPU or Apple silicon), 'integrated' (Intel UHD/Iris, AMD Radeon APUs,
 * unknown hardware) or 'none' (no WebGL, or a software renderer: SwiftShader, llvmpipe,
 * hardware acceleration switched off).
 */
export function gpuClass(): 'dedicated' | 'integrated' | 'none' {
  try {
    const c = document.createElement('canvas');
    const opts = { failIfMajorPerformanceCaveat: true };
    const gl = (c.getContext('webgl2', opts) || c.getContext('webgl', opts)) as WebGLRenderingContext | null;
    if (!gl) return 'none';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return 'none';
    if (/nvidia|geforce|quadro|rtx|radeon\s*rx|radeon\s*pro|arc\s*a\d|apple/i.test(renderer)) return 'dedicated';
    return 'integrated'; // Intel / AMD APUs / unknown: live scene at 1x resolution, fps guard as backstop
  } catch {
    return 'none';
  }
}

export type SceneMode = 'webgl' | 'lite' | 'frames' | 'poster';

/**
 * How a scroll story renders its background:
 *  - webgl:  live three.js scene at high DPI (desktop with a dedicated GPU)
 *  - lite:   the same live scene at 1x resolution (integrated graphics), still 60 fps
 *  - frames: pre-rendered image sequence scrubbed by scroll (phones, PCs with no usable GPU)
 *  - poster: a single still (reduced motion, data saver)
 */
export function sceneMode(): SceneMode {
  if (!isBrowser) return 'poster';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'poster';
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return 'poster';
  if ((window as Window & { __sceneCapture?: unknown }).__sceneCapture) return 'webgl'; // frame capture script
  const forced = new URLSearchParams(window.location.search).get('scene'); // testing: ?scene=webgl|lite|frames|poster
  if (forced === 'webgl' || forced === 'lite' || forced === 'frames' || forced === 'poster') return forced;
  if (window.innerWidth < 760) return 'frames';
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return 'frames';
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return 'frames';
  const gpu = gpuClass();
  return gpu === 'dedicated' ? 'webgl' : gpu === 'integrated' ? 'lite' : 'frames';
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
