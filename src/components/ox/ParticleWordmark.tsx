import { useEffect, useRef } from 'react';
import { cssVar } from '@/hooks/useOx';

/**
 * Oxigen's footer wordmark: the word drawn as a grid of square "voxels" that scatter away from
 * the cursor and drift back like air. Only animates while on screen.
 */
export default function ParticleWordmark({ word = 'virtusco', className }: { word?: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; a: boolean };
    let pts: P[] = [];
    let w = 0;
    let h = 0;
    let cell = 8;
    let size = 5;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = false;
    let alive = true; // font loading resolves async; never touch a canvas after unmount

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (!alive || rect.width < 1 || rect.height < 1) return false;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(4, Math.round(w / 190));
      size = Math.max(2, cell * 0.66);

      const off = document.createElement('canvas');
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext('2d')!;
      const fam = cssVar('--font-sans', 'sans-serif');
      let fs = h * 1.02;
      o.font = `800 ${fs}px ${fam}`;
      const m = o.measureText(word);
      fs = fs * Math.min(1, (w * 0.995) / m.width);
      o.font = `800 ${fs}px ${fam}`;
      o.textBaseline = 'alphabetic';
      o.fillStyle = '#fff';
      const tw = o.measureText(word).width;
      o.fillText(word, (w - tw) / 2, h * 0.8);
      const data = o.getImageData(0, 0, off.width, off.height).data;

      const accentIdx = word.indexOf('o', word.length - 2); // the final "o" gets accent voxels
      const accentX0 = accentIdx >= 0 ? (w - tw) / 2 + o.measureText(word.slice(0, accentIdx)).width : Infinity;

      pts = [];
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          if (data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3] > 128) {
            pts.push({ x, y, hx: x, hy: y, vx: 0, vy: 0, a: x > accentX0 && Math.random() < 0.18 });
          }
        }
      }
    };

    const draw = () => {
      const light = cssVar('--light', '236 238 238').split(/\s+/).join(',');
      const accent = cssVar('--accent', '234 56 76').split(/\s+/).join(',');
      ctx.clearRect(0, 0, w, h);
      const R = Math.max(70, w * 0.07);
      for (const p of pts) {
        if (!reduced) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 2.2;
            p.vx += (dx / d) * f + (-dy / d) * f * 0.35; // push + a little swirl
            p.vy += (dy / d) * f + (dx / d) * f * 0.35;
          }
          p.vx += (p.hx - p.x) * 0.045;
          p.vy += (p.hy - p.y) * 0.045;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }
        const disp = Math.min(1, Math.hypot(p.x - p.hx, p.y - p.hy) / 30);
        ctx.fillStyle = p.a ? `rgba(${accent},${0.95})` : `rgba(${light},${0.88 - disp * 0.5})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
    };

    const loop = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const start = () => {
      if (build() === false) return;
      draw();
    };
    // Fonts load lazily: request the exact face the canvas uses, otherwise it draws in a fallback.
    const fam = cssVar('--font-sans', 'sans-serif');
    if (document.fonts?.load) document.fonts.load(`800 100px ${fam}`, word).then(start, start);
    else start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => start());
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [word]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
