import { useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Faq } from '@/content/about';
import { Eyebrow, OxLink, Reveal } from './primitives';

/** Dark closing band (replaces the four duplicated dark CTA sections of the old site). */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section data-tone="dark" data-rail="Next" className="on-dark sec wrap bg-ink-2 text-light">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Reveal>
          {eyebrow && <Eyebrow className="mb-5 text-quiet">{eyebrow}</Eyebrow>}
          <h2 className="h-serif max-w-[24ch] text-light">{title}</h2>
          <p className="lede mt-6 text-soft">{body}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3 lg:justify-end">
          <OxLink to={primary.to} variant="cream">
            {primary.label}
          </OxLink>
          {secondary && (
            <OxLink to={secondary.to} variant="outline">
              {secondary.label}
            </OxLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Question-style FAQ: every answer is plain visible text (answer engines quote these verbatim). */
export const faqId = (q: string) =>
  'faq-' + q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function FaqList({ items, className }: { items: Faq[]; className?: string }) {
  // open the item a link points at (e.g. /product#faq-how-does-the-revenue-model-work)
  useEffect(() => {
    const openTarget = () => {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    openTarget();
    window.addEventListener('hashchange', openTarget);
    return () => window.removeEventListener('hashchange', openTarget);
  }, []);
  return (
    <div className={cn('border-t border-ink/15', className)}>
      {items.map((f, i) => (
        <details key={f.q} id={faqId(f.q)} className="group scroll-mt-28 border-b border-ink/15" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="h-card text-ink">{f.q}</h3>
            <span aria-hidden className="mt-1 font-mono text-lg leading-none text-quiet transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[70ch] pb-7 font-serif text-[1.02rem] leading-relaxed text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Page hero for interior pages without a 3D scene: dark, text bottom-left, Oxigen proportions. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  aside,
  compact = false,
}: {
  compact?: boolean; // utility pages (contact, press kit): keep the content above the fold
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section data-tone="dark" data-rail="Intro" className="on-dark relative overflow-hidden bg-ink text-light">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--light) / .22) 0.7px, transparent 0.9px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(80% 90% at 85% 10%, #000 0%, transparent 70%)',
        }}
      />
      <div
        className={cn(
          'relative grid items-end gap-10 px-[var(--gutter-hero)] lg:grid-cols-[1.25fr_0.75fr]',
          compact ? 'min-h-[clamp(300px,42svh,460px)] pb-[clamp(36px,6vh,64px)] pt-32' : 'min-h-[clamp(520px,78svh,820px)] pb-[clamp(56px,10vh,110px)] pt-40',
        )}
      >
        <div>
          <Eyebrow dot className="mb-6 text-light/70">
            {eyebrow}
          </Eyebrow>
          <h1 className="h-page max-w-[18ch] text-light">{title}</h1>
          {lede && <p className="lede mt-6 text-soft">{lede}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="lg:justify-self-end">{aside}</div>}
      </div>
    </section>
  );
}
