import { useEffect, useRef, type MutableRefObject } from 'react';

/** Frame sets rendered from the 3D scenes by scripts/capture-frames.py (see public/frames/). */
export const FRAME_COUNT = 40;
export type FrameVariant = 'd' | 'm'; // d = landscape 1200x750, m = portrait 540x1080

export const frameSrc = (scene: string, variant: FrameVariant, i: number) => `/frames/${scene}/${variant}/${String(i).padStart(2, '0')}.webp`;

/** Load order: coarse to fine, so the whole story is scrubbable early and sharpens as frames arrive. */
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  const add = (i: number) => {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  add(0);
  add(count - 1);
  for (let step = 16; step >= 1; step >>= 1) for (let i = 0; i < count; i += step) add(i);
  return order;
}

/**
 * Scroll-scrubbed image sequence on a 2D canvas: the GPU-free stand-in for a live WebGL scene.
 * Draws the two frames around the current progress and cross-fades between them.
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
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const variant: FrameVariant = window.innerHeight > window.innerWidth ? 'm' : 'd';
    const imgs: (HTMLImageElement | null)[] = Array(count).fill(null);
    let alive = true;
    let readySent = false;
    let dirty = true;

    const order = loadOrder(count);
    let k = 0;
    const next = () => {
      if (!alive || k >= order.length) return;
      const i = order[k++];
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => {
        if (!alive) return;
        imgs[i] = im;
        dirty = true;
        if (!readySent) {
          readySent = true;
          readyRef.current?.();
        }
        next();
      };
      im.onerror = () => next();
      im.src = frameSrc(scene, variant, i);
    };
    for (let c = 0; c < 4; c++) next();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
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

    let smoothed = progress.current;
    let last = -1;
    let raf = 0;
    const tick = () => {
      smoothed += (progress.current - smoothed) * 0.2;
      const f = Math.min(count - 1, Math.max(0, smoothed * (count - 1)));
      const key = Math.round(f * 200);
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
