import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { cssVar } from '@/hooks/useOx';

/**
 * Oxigen's startup tiles: an image rendered as a halftone dot field whose dots push away from the
 * cursor and swirl back (R .26, strength .15, ease .16). The plain <img> is server-rendered and
 * stays as the fallback (and for crawlers / no-JS).
 */
export default function DitherTile({ src, alt, className, rotate = 0 }: { src: string; alt: string; className?: string; rotate?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    img.src = src;
    type D = { hx: number; hy: number; x: number; y: number; r: number };
    let dots: D[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = false;
    const m = { x: -1e4, y: -1e4 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h || !img.complete) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const step = Math.max(4, Math.round(w / 46));
      const off = document.createElement('canvas');
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d')!;
      // cover-fit
      const s = Math.max(cols / img.width, rows / img.height);
      o.drawImage(img, (cols - img.width * s) / 2, (rows - img.height * s) / 2, img.width * s, img.height * s);
      const px = o.getImageData(0, 0, cols, rows).data;
      dots = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
          const r = (1 - lum) * step * 0.52;
          if (r > 0.35) {
            const cx = x * step + step / 2;
            const cy = y * step + step / 2;
            dots.push({ hx: cx, hy: cy, x: cx, y: cy, r });
          }
        }
      setLive(true);
    };

    const draw = () => {
      const ink = cssVar('--ink', '17 18 20').split(/\s+/).join(',');
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgb(${ink})`;
      const R = 0.26 * Math.max(w, h);
      for (const d of dots) {
        if (!reduced) {
          const dx = d.hx - m.x;
          const dy = d.hy - m.y;
          const dist = Math.hypot(dx, dy);
          let tx = d.hx;
          let ty = d.hy;
          if (dist < R) {
            const f = (1 - dist / R) * 0.15 * R;
            const a = Math.atan2(dy, dx) + (1 - dist / R) * 0.8; // swirl
            tx += Math.cos(a) * f;
            ty += Math.sin(a) * f;
          }
          d.x += (tx - d.x) * 0.16;
          d.y += (ty - d.y) * 0.16;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const loop = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };
    const onLoad = () => {
      build();
      draw();
    };
    img.onload = onLoad;
    if (img.complete) onLoad();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      // undo the tile rotation approximately by using the bounding box
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
    };
    const onLeave = () => {
      m.x = -1e4;
      m.y = -1e4;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [src]);

  return (
    <div className={cn('relative aspect-square overflow-hidden bg-card', className)} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('absolute inset-0 h-full w-full object-cover grayscale contrast-125 transition-opacity duration-700', live && 'opacity-0')}
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  );
}
