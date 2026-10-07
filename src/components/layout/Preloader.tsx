import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Oxigen-style intro: the logo fills left→right while fonts load, then the overlay opens
 * through a circular mask centred on the red core of the mark.
 * Home page only, once per session (index.html adds html.seen when the flag exists), capped at ~0.7s
 * so it never holds content hostage. Not shown to reduced-motion users or without JS.
 */
const Preloader = () => {
  const { pathname } = useLocation();
  // Home only: on interior pages it would just delay content (and become the LCP element).
  const [phase, setPhase] = useState<'fill' | 'open' | 'done'>(pathname === '/' ? 'fill' : 'done');

  useEffect(() => {
    if (pathname !== '/') return;
    const root = document.documentElement;
    if (root.classList.contains('seen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return;
    }
    try {
      sessionStorage.setItem('vc-seen', '1');
    } catch {
      /* storage blocked: just show it */
    }
    const minTime = new Promise((r) => setTimeout(r, 450));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise((r) => setTimeout(r, 700));
    let t: number;
    Promise.race([Promise.all([minTime, fonts]), cap]).then(() => {
      setPhase('open');
      t = window.setTimeout(() => setPhase('done'), 650);
    });
    return () => clearTimeout(t);
    // run once for the landing route only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden
      className={cn('vc-preloader fixed inset-0 z-[200] flex items-center justify-center bg-ink text-light', phase === 'open' && 'is-open')}
    >
      {/* the official logo: a dimmed copy, with a full-brightness copy revealed left to right */}
      <div className="vc-preloader__mark relative">
        <img src="/brand/virtusco-logo-dark.png" alt="" width={172} height={243} className="h-[clamp(120px,18vw,180px)] w-auto opacity-20" />
        <img src="/brand/virtusco-logo-dark.png" alt="" width={172} height={243} className="vc-preloader__fill absolute inset-0 h-full w-auto" />
      </div>
    </div>
  );
};

export default Preloader;
