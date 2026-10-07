import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { scrollToEl } from './SmoothScroll';

type Phase = 'idle' | 'cover' | 'covered' | 'reveal';

/**
 * Oxigen's two-panel page transition: an accent panel then an ink panel slide up over the page
 * (cubic-bezier(.76,0,.24,1), 520ms, 90ms stagger), the route changes underneath, then both
 * panels continue upward and off. Intercepts same-origin <a> clicks globally.
 */
const PageWipe = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [phase, setPhase] = useState<Phase>('idle');
  const busy = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.detail === 0) return; // keyboard activation: navigate instantly, no wipe
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.noWipe !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.(txt|xml|md|pdf|png|jpe?g|webp|svg)$/i.test(url.pathname)) return;
      if (url.pathname === window.location.pathname) {
        // same page: the router handles a new hash, but re-clicking the current hash is a no-op there
        if (url.hash && url.hash === window.location.hash && url.search === window.location.search) {
          e.preventDefault();
          scrollToEl(decodeURIComponent(url.hash), -20);
        }
        return;
      }
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      window.setTimeout(() => (busy.current = false), 2500); // safety net: never block navigation
      setPhase('cover');
      window.setTimeout(() => {
        setPhase('covered');
        navigate(url.pathname + url.search + url.hash);
      }, 340);
    };
    document.addEventListener('click', onClick, true); // capture: run before <Link> navigates
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  // Each phase schedules only its own next step: if one effect scheduled both, the phase change
  // to 'reveal' would run its cleanup, cancel the final reset and leave navigation locked.
  useEffect(() => {
    if (phase !== 'covered') return;
    // pathname dependency ensures we reveal after the new route rendered
    const t = window.setTimeout(() => setPhase('reveal'), 60);
    return () => clearTimeout(t);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = window.setTimeout(() => {
      setPhase('idle');
      busy.current = false;
    }, 560);
    return () => clearTimeout(t);
  }, [phase]);

  const pos = (delay: number) =>
    cn(
      'fixed inset-0 z-[100] pointer-events-none will-change-transform',
      'transition-transform ease-wipe',
      phase === 'idle' ? 'translate-y-full [transition-duration:0ms]' : '[transition-duration:420ms]',
      (phase === 'cover' || phase === 'covered') && 'translate-y-0',
      phase === 'reveal' && '-translate-y-full',
      delay && '[transition-delay:60ms]',
    );

  return (
    <div aria-hidden>
      <div className={cn(pos(0), 'bg-accent')} />
      <div className={cn(pos(90), 'bg-ink')} />
    </div>
  );
};

export default PageWipe;
