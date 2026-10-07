import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export function scrollToEl(el: HTMLElement | string, offset = -10) {
  const target = typeof el === 'string' ? document.querySelector<HTMLElement>(el) : el;
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.2 });
  else target.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Lenis smooth scroll (Oxigen: lerp .09, smoothWheel) + route scroll handling:
 * jump to top on navigation, or to the #hash target if present.
 * Disabled for reduced-motion users and touch devices (native scroll there).
 */
const SmoothScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (hash) {
      // wait for the new route to render its sections
      const t = setTimeout(() => scrollToEl(decodeURIComponent(hash), -20), 80);
      return () => clearTimeout(t);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default SmoothScroll;
