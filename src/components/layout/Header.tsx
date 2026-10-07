import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { nav } from '@/content/company';
import { Logo } from './Logo';
import { getLenis } from './SmoothScroll';
import AuthButtons from './AuthButtons';
import CartButton from '../CartButton';

/**
 * Fixed transparent header (Oxigen). Its colour follows whatever section is underneath:
 * any ancestor with data-tone="dark" → light text, otherwise ink.
 */
const Header = () => {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let raf = 0;
    const probe = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const els = document.elementsFromPoint(window.innerWidth / 2, 34);
      const toned = els.find((el) => el instanceof HTMLElement && el.closest('[data-tone]') && !el.closest('header'));
      const tone = toned?.closest('[data-tone]')?.getAttribute('data-tone');
      setDark(tone !== 'light');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(probe);
    };
    probe();
    const t = setTimeout(probe, 120); // after route content mounts
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    // move focus into the menu for keyboard / screen-reader users
    panelRef.current?.querySelector<HTMLElement>('#mobile-menu a')?.focus();
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const toggle = panelRef.current?.querySelector<HTMLElement>('button[aria-controls="mobile-menu"]');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      // keep keyboard focus inside the open menu (toggle button + menu links)
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button[aria-controls="mobile-menu"], #mobile-menu a, #mobile-menu button'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // lock page scroll behind the open menu
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        dark ? 'text-light' : 'text-ink',
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-accent focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div
        className={cn(
          'relative flex items-center justify-between border-b px-[var(--gutter-hero)] transition-[padding,background-color,border-color] duration-300',
          scrolled ? 'py-3.5 backdrop-blur-md' : 'border-transparent py-[clamp(18px,2.3vw,30px)]',
          // once scrolled, a solid bar keeps the header off body copy
          scrolled && (dark ? 'border-light/10 bg-ink/90' : 'border-ink/10 bg-paper/90'),
        )}
      >
        <Link to="/" aria-label="VirtusCo home" className="relative z-10">
          <Logo tone={dark ? 'dark' : 'light'} />
        </Link>

        {/* centred on the bar itself (not between logo and actions, which are different widths) */}
        <nav aria-label="Primary" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'font-mono text-[11.5px] uppercase tracking-[0.16em] transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3" ref={panelRef}>
          <div className="hidden items-center gap-3 md:flex">
            <CartButton />
            <AuthButtons />
          </div>
          <Link
            to="/contact"
            className={cn(
              'hidden border px-5 py-[11px] font-mono text-[12px] uppercase tracking-[0.08em] transition-colors sm:inline-flex',
              dark ? 'border-light/30 hover:bg-light hover:text-ink' : 'border-ink/25 hover:bg-ink hover:text-paper',
            )}
          >
            Contact us
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'flex h-9 w-[42px] flex-col items-center justify-center gap-[5px] border lg:hidden',
              dark ? 'border-light/30' : 'border-ink/25',
            )}
          >
            <span className={cn('block h-[1.5px] w-4 bg-current transition-transform', open && 'translate-y-[6.5px] rotate-45')} />
            <span className={cn('block h-[1.5px] w-4 bg-current transition-opacity', open && 'opacity-0')} />
            <span className={cn('block h-[1.5px] w-4 bg-current transition-transform', open && '-translate-y-[6.5px] -rotate-45')} />
          </button>

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={cn(
              'absolute right-[var(--gutter-hero)] top-full z-10 min-w-[220px] border p-5 transition-[opacity,transform,visibility] duration-300 lg:hidden',
              dark ? 'border-light/20 bg-ink text-light' : 'border-ink/15 bg-paper text-ink',
              open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2.5 opacity-0',
            )}
          >
            <ul className="space-y-0.5">
              <li>
                <NavLink to="/" end className="block py-2.5 font-mono text-[12px] uppercase tracking-[0.16em]">
                  Home
                </NavLink>
              </li>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="block py-2.5 font-mono text-[12px] uppercase tracking-[0.16em]">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className={cn('mt-5 flex items-center gap-3 border-t pt-4 md:hidden', dark ? 'border-light/15' : 'border-ink/15')}>
              <CartButton />
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
