import { useEffect, useRef, type MutableRefObject } from 'react';

/** Frame sets rendered from the 3D scenes by scripts/capture-frames.py (see public/frames/). */
export const FRAME_COUNT = 120;
export type FrameVariant = 'd' | 'm'; // d = landscape 1920x1200, m = portrait 810x1620

export const frameSrc = (scene: string, variant: FrameVariant, i: number) => `/frames/${scene}/${variant}/${String(i).padStart(3, '0')}.avif`;

let avifSupport: Promise<boolean> | null = null;
/** AVIF decodes in every current browser; very old ones keep the static poster instead. */
export function supportsAvif() {
  avifSupport ??= new Promise((resolve) => {
    const im = new Image();
    im.onload = () => resolve(im.width > 0);
    im.onerror = () => resolve(false);
    im.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAJwAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAgAAAAIAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAAL21kYXQSAAoIGAA2iAhoNCAyGRlHh4Yhh5555oAAAJBAyRxhSak9iLHwUuA=';
  });
  return avifSupport;
}

/**
 * Scroll-scrubbed image sequence on a 2D canvas: the stand-in for a live WebGL scene on phones
 * and PCs without a usable GPU. Frames load nearest-first around the current scroll position
 * (coarse grid first, then filling in), and the two frames around the exact position cross-fade.
 */
export function ScrollFrames({
  scene,
  progress,
  onReady,
  count = FRAME_COUNT,
}: {
  scene: string;
  progress: MutableRefObject<number>;
  onReady?: () => void;
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;
    const variant: FrameVariant = window.innerHeight > window.innerWidth ? 'm' : 'd';
    const imgs: (HTMLImageElement | null)[] = Array(count).fill(null);
    const requested = new Set<number>();
    let alive = true;
    let readySent = false;
    let dirty = true;
    let smoothed = progress.current;

    // Next frame to fetch: walk coarse-to-fine grids, and within a grid take the frame closest
    // to where the visitor is now, so the current view sharpens first.
    const pick = () => {
      const cur = smoothed * (count - 1);
      for (const step of [24, 12, 6, 3, 1]) {
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < count; i += step) {
          if (requested.has(i)) continue;
          const d = Math.abs(i - cur);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best >= 0) return best;
      }
      return -1;
    };
    const next = () => {
      if (!alive) return;
      const i = pick();
      if (i < 0) return;
      requested.add(i);
      const im = new Image();
      im.src = frameSrc(scene, variant, i);
      im.decode()
        .then(() => {
          if (!alive) return;
          imgs[i] = im;
          dirty = true;
          if (!readySent) {
            readySent = true;
            readyRef.current?.();
          }
        })
        .catch(() => undefined)
        .finally(next);
    };
    for (let c = 0; c < 6; c++) next();

    const resize = () => {
      // full device resolution (capped at 2x); the frames are 1920 / 810 px wide
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.imageSmoothingQuality = 'high';
      dirty = true;
    };
    resize();
    window.addEventListener('resize', resize);

    // object-fit: cover, biased right on landscape frames (the subject sits right of centre)
    const draw = (im: HTMLImageElement, alpha: number) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s;
      const h = im.naturalHeight * s;
      const fx = variant === 'd' ? 0.68 : 0.5;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, (cw - w) * fx, (ch - h) * 0.5, w, h);
    };
    const find = (from: number, dir: 1 | -1) => {
      for (let j = from; j >= 0 && j < count; j += dir) if (imgs[j]) return j;
      return -1;
    };

    let last = -1;
    let raf = 0;
    const tick = () => {
      smoothed += (progress.current - smoothed) * 0.22;
      const f = Math.min(count - 1, Math.max(0, smoothed * (count - 1)));
      const key = Math.round(f * 100);
      if (dirty || key !== last) {
        last = key;
        dirty = false;
        let a = find(Math.floor(f), -1);
        let b = find(Math.ceil(f), 1);
        if (a < 0) a = b;
        if (b < 0) b = a;
        if (a >= 0) {
          draw(imgs[a]!, 1);
          if (b !== a) draw(imgs[b]!, (f - a) / (b - a));
          ctx.globalAlpha = 1;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [scene, count, progress]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
