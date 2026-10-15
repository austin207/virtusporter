import { Suspense, useEffect, useRef, useState, type ComponentType, type MutableRefObject, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { sceneMode, type SceneMode } from '@/hooks/useOx';
import { ScrollFrames } from './ScrollFrames';

export interface SceneProps {
  /** 0..1 scroll progress through the whole story; read every frame, never causes re-renders */
  progress: MutableRefObject<number>;
  /** pointer position in -1..1, for subtle parallax */
  pointer: MutableRefObject<{ x: number; y: number }>;
  onReady?: () => void;
}

type CaptureWindow = Window & { __sceneCapture?: { progress: number } };

/**
 * Renders the static poster first (server, first client paint, reduced motion), then swaps in
 * either the live 3D scene (GPU desktops) or its pre-rendered frame sequence (phones, GPU-less
 * or weak PCs), and cross-fades once it reports ready. A live scene that can't hold ~28 fps is
 * replaced by the frame sequence.
 */
export function SceneGate({
  Scene,
  poster,
  frames,
  progress,
  pointer,
}: {
  Scene: ComponentType<SceneProps>;
  poster: ReactNode;
  /** frame-set name under public/frames/ (omit to fall back to the poster) */
  frames?: string;
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
}) {
  const [mode, setMode] = useState<SceneMode | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let m = sceneMode();
    if (m === 'frames' && !frames) m = 'poster';
    if (m === 'poster') return;
    // Keep the main thread free right after load: start on the first scroll / pointer / touch,
    // or after ~2.5 s once the browser is idle, whichever comes first.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      cleanup();
      setMode(m);
    };
    const events = ['scroll', 'pointermove', 'touchstart', 'keydown'] as const;
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const timer = window.setTimeout(() => (idle ? idle(start, { timeout: 1500 }) : start()), (window as CaptureWindow).__sceneCapture ? 0 : 2500);
    const cleanup = () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    return cleanup;
  }, [frames]);

  // Frame-rate guard: integrated / weak GPUs that pass the WebGL checks but stutter get the frames.
  useEffect(() => {
    if (mode !== 'webgl' || !ready || !frames || (window as CaptureWindow).__sceneCapture) return;
    let raf = 0;
    let n = 0;
    let t0 = 0;
    let slow = 0;
    const warmup = window.setTimeout(() => {
      const tick = (t: number) => {
        if (document.visibilityState !== 'visible') {
          t0 = 0;
          n = 0;
        } else if (!t0) {
          t0 = t;
        } else if (++n === 60) {
          const fps = (n * 1000) / (t - t0);
          if (fps < 28) slow++;
          else slow = 0;
          if (slow >= 2) {
            setReady(false);
            setMode('frames');
            return;
          }
          t0 = t;
          n = 0;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 1500);
    return () => {
      clearTimeout(warmup);
      cancelAnimationFrame(raf);
    };
  }, [mode, ready, frames]);

  return (
    <div className="absolute inset-0">
      <div className={cn('absolute inset-0 transition-opacity duration-1000', ready ? 'opacity-0' : 'opacity-100')}>{poster}</div>
      {mode === 'webgl' && (
        <Suspense fallback={null}>
          <div className={cn('absolute inset-0 transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0')}>
            <Scene progress={progress} pointer={pointer} onReady={() => setReady(true)} />
          </div>
        </Suspense>
      )}
      {mode === 'frames' && frames && (
        <div className={cn('absolute inset-0 transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}>
          <ScrollFrames scene={frames} progress={progress} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}

/**
 * Oxigen's story: a pinned full-screen scene behind a column of 100svh chapters with text bottom-left.
 * At the end the scene (and last chapter) shrink to .87 and lift away to hand off to the paper sections.
 */
export function ScrollStory({
  Scene,
  poster,
  frames,
  chapters,
  className,
  rail,
  handoff = true,
  id,
}: {
  id?: string;
  Scene: ComponentType<SceneProps>;
  poster: ReactNode;
  frames?: string;
  chapters: { key: string; node: ReactNode; align?: 'left' | 'right'; rail?: string }[];
  className?: string;
  rail?: string;
  handoff?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [chapter, setChapter] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let lastCh = -1;
    const tick = () => {
      const el = sectionRef.current;
      const stage = stageRef.current;
      if (el && stage) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const cap = (window as CaptureWindow).__sceneCapture;
        const p = cap ? cap.progress : total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        progress.current = p;
        // Active chapter = the one whose text block sits closest to 60% of the viewport height.
        // (Deriving it from progress drifted: progress spans n-1 viewports, chapters span n.)
        // Prefer the chapter with the most text actually on screen; fall back to the nearest one.
        const vh = window.innerHeight;
        const target = vh * 0.6;
        let ch = 0;
        let bestVisible = 0;
        let bestDist = Infinity;
        let nearest = 0;
        textRefs.current.forEach((t, i) => {
          if (!t) return;
          const tr = t.getBoundingClientRect();
          const visible = Math.max(0, Math.min(tr.bottom, vh) - Math.max(tr.top, 0));
          if (visible > bestVisible) {
            bestVisible = visible;
            ch = i;
          }
          const d = Math.abs((tr.top + tr.bottom) / 2 - target);
          if (d < bestDist) {
            bestDist = d;
            nearest = i;
          }
        });
        if (bestVisible === 0) ch = nearest;
        if (ch !== lastCh) {
          lastCh = ch;
          setChapter(ch);
        }
        if (handoff) {
          // hand-off: after the pinned range ends, shrink to .87 while the section scrolls away
          const over = Math.min(1, Math.max(0, (-r.top - total) / (window.innerHeight * 0.7)));
          const e = over * over * (3 - 2 * over);
          stage.style.transform = `scale(${1 - 0.13 * e})`;
          stage.style.opacity = String(1 - e * 0.35);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [chapters.length, handoff]);

  return (
    <section id={id} ref={sectionRef} data-tone="dark" data-rail={rail} className={cn('on-dark relative bg-ink text-light', className)}>
      {/* pinned stage */}
      <div className="sticky top-0 z-0 -mb-[100svh] h-[100svh] overflow-hidden">
        <div ref={stageRef} className="absolute inset-0 origin-top will-change-transform">
          <SceneGate Scene={Scene} poster={poster} frames={frames} progress={progress} pointer={pointer} />
          {/* Oxigen bottom-left vignette keeps text legible over the scene (phones use per-chapter gradients) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 max-md:hidden"
            style={{
              background:
                'radial-gradient(135% 100% at 6% 112%, rgb(var(--ink) / .86) 0%, rgb(var(--ink) / .5) 38%, rgb(var(--ink) / 0) 80%), linear-gradient(90deg, rgb(var(--ink) / .8) 0%, rgb(var(--ink) / .55) 34%, rgb(var(--ink) / 0) 60%)',
            }}
          />
          {/* mirrored scrim for right-aligned chapters (fades in only while one is active) */}
          <div
            aria-hidden
            className={cn('pointer-events-none absolute inset-0 transition-opacity duration-700 max-md:hidden', chapters[chapter]?.align === 'right' ? 'opacity-100' : 'opacity-0')}
            style={{ background: 'linear-gradient(270deg, rgb(var(--ink) / .82) 0%, rgb(var(--ink) / .5) 34%, rgb(var(--ink) / 0) 62%)' }}
          />
        </div>
        {/* scroll cue */}
        <div
          aria-hidden
          className={cn(
            'absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-500 md:flex',
            chapter > 0 && 'opacity-0',
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-light/60">Scroll</span>
          <span className="block h-10 w-px animate-scroll-cue bg-gradient-to-b from-light/80 to-light/0" />
        </div>
      </div>

      {chapters.map((c, i) => (
        <div
          key={c.key}
          data-rail={c.rail}
          className={cn(
            'relative z-10 flex px-[var(--gutter-hero)] md:min-h-[100svh] md:bg-transparent md:pb-[clamp(56px,11vh,120px)] md:pt-32',
            // phones: the frame sequence plays behind see-through chapters; each chapter darkens
            // only toward its text at the bottom, so the animation stays visible between them
            i === 0 ? 'min-h-[100svh] pb-16 pt-32' : 'min-h-[88svh] pb-16 pt-24 md:pt-32',
            'max-md:bg-gradient-to-b max-md:from-transparent max-md:from-[35%] max-md:via-ink/60 max-md:via-[62%] max-md:to-ink/90',
            c.align === 'right' ? 'items-end md:justify-end' : 'items-end',
          )}
        >
          <div ref={(el) => (textRefs.current[i] = el)} data-active={chapter === i} className="story-ch max-w-[620px] [text-shadow:0_1px_18px_rgb(0_0_0/0.55)]">
            {c.node}
          </div>
        </div>
      ))}
    </section>
  );
}

/** Static poster used before/without WebGL: a dotted point-cloud field in the palette. */
export function PointPoster({ image, alt = '' }: { image?: string; alt?: string }) {
  return (
    <div className="absolute inset-0 bg-ink">
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover object-[68%_center]" {...{ fetchpriority: "high" }} decoding="async" width={1600} height={1000} />
      ) : (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(rgb(var(--light) / .35) 0.8px, transparent 1px), radial-gradient(rgb(var(--light) / .14) 0.8px, transparent 1px)',
            backgroundSize: '22px 22px, 11px 11px',
            maskImage: 'radial-gradient(70% 60% at 60% 45%, #000 0%, transparent 75%)',
          }}
        />
      )}
    </div>
  );
}
