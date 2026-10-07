import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { scrollToEl } from './SmoothScroll';

interface RailItem {
  label: string;
  el: HTMLElement;
}

/**
 * Oxigen's right-edge section rail. Lines that grow and reveal a mono label for the active section.
 * mix-blend-difference keeps it legible on both dark and light sections.
 * Built from any element on the page with data-rail="Label".
 */
const SideRail = () => {
  const { pathname } = useLocation();
  const [items, setItems] = useState<RailItem[]>([]);
  const [active, setActive] = useState(0);

  const [overFooter, setOverFooter] = useState(false);

  // Lazy route chunks mount after navigation, so collect [data-rail] whenever #main changes.
  useEffect(() => {
    const main = document.getElementById('main');
    const collect = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-rail]')).filter((el) => el.dataset.rail);
      setItems((prev) =>
        prev.length === els.length && prev.every((p, i) => p.el === els[i]) ? prev : els.map((el) => ({ label: el.dataset.rail as string, el })),
      );
    };
    collect();
    if (!main) return;
    const mo = new MutationObserver(collect);
    mo.observe(main, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [pathname]);

  // Get out of the way when the footer is on screen (it would overlap footer links).
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { rootMargin: '0px 0px -30% 0px' });
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mid = window.innerHeight * 0.45;
        let idx = 0;
        items.forEach((it, i) => {
          if (it.el.getBoundingClientRect().top <= mid) idx = i;
        });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Sections on this page"
      className={cn(
        'pointer-events-none fixed right-[clamp(14px,2vw,26px)] top-1/2 z-40 hidden -translate-y-1/2 text-white mix-blend-difference transition-opacity duration-300 sm:block',
        overFooter && 'invisible opacity-0',
      )}
      aria-hidden={overFooter || undefined}
    >
      <ul className="flex flex-col items-end gap-[14px]">
        {items.map((it, i) => (
          <li key={it.label + i}>
            <button
              type="button"
              onClick={() => scrollToEl(it.el)}
              className="group pointer-events-auto flex items-center gap-3 py-1"
              aria-current={i === active ? 'true' : undefined}
            >
              <span
                className={cn(
                  'font-mono text-[10.5px] uppercase tracking-[0.2em] transition-all duration-300',
                  'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                )}
              >
                {it.label}
              </span>
              <span
                className={cn(
                  'block h-px bg-white transition-all duration-300',
                  i === active ? 'w-[46px] opacity-100' : 'w-[22px] opacity-50 group-hover:w-[46px]',
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideRail;
