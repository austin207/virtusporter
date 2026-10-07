import { createElement, useEffect, useState, type ElementType, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useInViewOnce, useReducedMotion } from '@/hooks/useOx';

/* ---------------------------------------------------------------- Reveal */

interface RevealProps {
  as?: ElementType;
  delay?: number;
  threshold?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}

/** Oxigen's fade-up (translateY 26px, 1s ease-out). One observer per element; replaces all ad-hoc observers. */
export function Reveal({ as = 'div', delay = 0, threshold = 0.2, className, children, id }: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>(threshold);
  return createElement(
    as,
    { ref, id, className: cn('reveal', inView && 'is-in', className), style: delay ? { transitionDelay: `${delay}ms` } : undefined },
    children,
  );
}

/* ---------------------------------------------------------------- Text */

export function Eyebrow({ children, className, dot = false }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      {dot && <span aria-hidden className="inline-block h-[7px] w-[7px] bg-accent" />}
      {children}
    </p>
  );
}

/** Two-tone heading: first part in ink, second faded. `dark` flips colours for dark surfaces. */
export function TwoTone({
  ink,
  mut,
  as = 'h2',
  className,
  dark = false,
}: {
  ink: ReactNode;
  mut?: ReactNode;
  as?: ElementType;
  className?: string;
  dark?: boolean;
}) {
  return createElement(
    as,
    { className: cn('h-section', className) },
    <>
      <span className={dark ? 'text-light' : 'text-ink'}>{ink}</span>
      {mut && (
        <>
          {' '}
          <span className={dark ? 'text-quiet' : 'text-mut'}>{mut}</span>
        </>
      )}
    </>,
  );
}

/**
 * Typewriter heading with a block caret (Oxigen's .ox-caret). The full text is always in the DOM
 * (visually hidden copy + aria-label) so crawlers and screen readers get the whole heading.
 */
export function TypeHeading({
  text,
  mut,
  as = 'h2',
  className,
  speed = 42,
  start = true,
  startOnView = true,
  dark = false,
}: {
  text: string;
  mut?: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  start?: boolean;
  startOnView?: boolean;
  dark?: boolean;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>(0.35);
  const full = mut ? `${text} ${mut}` : text;
  const [n, setN] = useState<number | null>(null); // null = not hydrated → render full text (SSR)
  const go = start && (!startOnView || inView);

  useEffect(() => {
    if (reduced) {
      setN(full.length);
      return;
    }
    setN((v) => (v === null ? 0 : v));
  }, [reduced, full.length]);

  useEffect(() => {
    if (!go || reduced || n === null || n >= full.length) return;
    const t = setTimeout(() => setN((v) => (v ?? 0) + 1), speed);
    return () => clearTimeout(t);
  }, [go, n, full.length, speed, reduced]);

  const shown = n === null ? full.length : n;
  const done = shown >= full.length;
  const caret = n !== null && !reduced ? <span aria-hidden className={cn('ox-caret', done && 'blink')} /> : null;

  // The whole string is always laid out; the untyped tail is only visibility:hidden. Line breaks and
  // height are therefore final from the first paint, so typing never shifts layout (CLS).
  const part = (str: string, from: number, cls?: string) => {
    const typed = Math.max(0, Math.min(str.length, shown - from));
    return (
      <span aria-hidden className={cls}>
        {str.slice(0, typed)}
        {typed < str.length && typed > 0 && caret}
        {typed < str.length && <span className="invisible">{str.slice(typed)}</span>}
      </span>
    );
  };
  const mutStart = text.length + 1;

  return createElement(
    as,
    { ref, className: cn(className), 'aria-label': full },
    <>
      {part(text, 0, dark ? 'text-light' : undefined)}
      {shown <= text.length && shown === 0 && caret}
      {mut && (
        <>
          {' '}
          {part(mut, mutStart, dark ? 'text-quiet' : 'text-mut')}
        </>
      )}
      {(done || (shown === text.length && !mut)) && caret}
    </>,
  );
}

/* ---------------------------------------------------------------- Buttons */

type OxVariant = 'outline' | 'outline-dark' | 'solid' | 'accent' | 'cream' | 'ghost';

const oxBtn: Record<OxVariant, string> = {
  outline:
    'border border-light/30 text-light hover:bg-light hover:text-ink font-mono uppercase text-[12.5px] tracking-[0.08em] px-5 py-[13px]',
  'outline-dark':
    'border border-ink/25 text-ink hover:bg-ink hover:text-paper font-mono uppercase text-[12.5px] tracking-[0.08em] px-5 py-[13px]',
  solid: 'bg-ink text-cream hover:bg-ink-3 font-semibold text-[0.95rem] px-7 py-[1.05rem]',
  accent: 'bg-accent-hover text-accent-foreground hover:bg-accent-ink font-semibold text-[0.95rem] px-7 py-[1.05rem]',
  cream: 'bg-cream text-ink hover:bg-white font-semibold text-[0.95rem] px-7 py-[1.05rem]',
  ghost: 'text-light/75 hover:text-light font-mono uppercase text-[12.5px] tracking-[0.08em] py-[13px] underline-offset-[6px] hover:underline',
};

export function OxLink({
  to,
  href,
  variant = 'solid',
  children,
  className,
  arrow = true,
  onClick,
}: {
  to?: string;
  href?: string;
  variant?: OxVariant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const cls = cn('group inline-flex items-center gap-3 leading-none transition-colors duration-200', oxBtn[variant], className);
  const inner = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="arw">
          →
        </span>
      )}
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  return (
    <Link to={to ?? '/'} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

/* ---------------------------------------------------------------- Section */

export function Section({
  id,
  tone = 'paper',
  className,
  children,
  label,
}: {
  id?: string;
  tone?: 'paper' | 'paper-2' | 'ink' | 'card' | 'dots';
  className?: string;
  children: ReactNode;
  label?: string; // shown in the side rail
}) {
  const tones = {
    paper: 'bg-paper text-ink',
    'paper-2': 'bg-paper-2 text-ink',
    dots: 'bg-paper-2 text-ink dot-grid',
    card: 'bg-card text-ink',
    ink: 'bg-ink text-light on-dark',
  } as const;
  return (
    <section
      id={id}
      data-rail={label}
      data-tone={tone === 'ink' ? 'dark' : 'light'}
      className={cn('relative', tones[tone], className)}
    >
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- Misc */

export function Hairline({ className, dark }: { className?: string; dark?: boolean }) {
  return <hr className={cn('border-0 h-px', dark ? 'bg-light/15' : 'bg-ink/15', className)} />;
}

