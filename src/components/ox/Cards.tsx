import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PixelIcon from './PixelIcon';

export interface CardItem {
  id?: string;
  tag?: string;
  title: string;
  body: string;
  art: string;
  list?: readonly string[];
  to?: string;
}

/**
 * Oxigen "Our Capabilities": white cards in a horizontal accordion: the hovered/focused card grows
 * (flex-grow 2.7) and its description slides open. Stacks with descriptions visible below 820px.
 * Text is always in the DOM (only visually collapsed) so it is indexable.
 */
export function AccordionCards({ items, headingLevel = 'h3' }: { items: CardItem[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <div className="flex flex-col gap-[14px] min-[820px]:flex-row">
      {items.map((it, i) => {
        const inner = (
          <>
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[11px] tracking-[0.2em] text-quiet">{String(i + 1).padStart(2, '0')}</span>
              {it.tag && <span className="mono-tag border border-ink/20 px-3 py-[7px] text-ink/80">{it.tag}</span>}
            </div>
            <div className="flex flex-1 items-center justify-start py-5 min-[820px]:justify-center min-[820px]:py-8">
              <PixelIcon art={it.art} className="h-12 w-12 min-[820px]:h-[clamp(64px,7vw,104px)] min-[820px]:w-[clamp(64px,7vw,104px)]" />
            </div>
            <div>
              <H className="h-card text-ink">{it.title}</H>
              <div className="ox-acc-body">
                <div className="overflow-hidden">
                  <p className="pt-4 font-serif text-[0.98rem] leading-relaxed text-body">{it.body}</p>
                  {it.list && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {it.list.map((l) => (
                        <li key={l} className="border border-ink/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/75">
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                  {it.to && (
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                      Learn more <span className="arw">→</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        );
        const cls =
          'ox-acc group relative flex flex-col bg-card p-6 text-left transition-[flex-grow] [transition-duration:550ms] ease-accordion min-[820px]:h-[clamp(440px,33vw,580px)] min-[820px]:flex-1 min-[820px]:p-7';
        return it.to ? (
          <Link key={it.title} id={it.id} to={it.to} className={cls}>
            {inner}
          </Link>
        ) : (
          <article key={it.title} id={it.id} tabIndex={0} className={cls}>
            {inner}
          </article>
        );
      })}
    </div>
  );
}

/** Oxigen "Research & Articles": full-bleed colour blocks with no gap. */
export function ColorPanels({
  items,
}: {
  items: { title: string; body: string; art: string; to: string; cta: string }[];
}) {
  const tones = ['bg-accent-hover text-white', 'bg-ink text-light', 'bg-paper-3 text-ink'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {items.map((it, i) => (
        <Link
          key={it.title}
          to={it.to}
          className={cn(
            'group relative flex min-h-[clamp(300px,34vw,460px)] flex-col justify-between p-[clamp(24px,3vw,40px)] transition-[filter] duration-300 hover:brightness-[1.06] md:last:pr-[clamp(64px,6vw,96px)]',
            tones[i % 3],
          )}
        >
          <div className="flex items-start justify-between">
            <PixelIcon
              art={it.art}
              invert={i === 1}
              className="h-14 w-14 transition-transform duration-500 group-hover:scale-[1.06] [&_.px-acc]:!fill-current"
            />
            <span className="font-mono text-[12px] tracking-[0.1em] transition-transform duration-500 group-hover:-translate-x-1.5">
              {String(i + 1).padStart(2, '0')}.
            </span>
          </div>
          <div className="transition-transform duration-500 ease-ox group-hover:-translate-y-2.5">
            <h3 className="h-card mb-3">{it.title}</h3>
            <p className="mb-6 max-w-[38ch] font-serif text-[0.98rem] leading-relaxed">{it.body}</p>
            <span className="inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-[11px] uppercase tracking-[0.18em]">
              {it.cta}
              <span className="arw group-hover:!translate-x-[7px]">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Simple hairline feature list (used for porter groups, values, initiatives). */
export function FeatureGrid({
  items,
  cols = 4,
  dark = false,
  numbered = true,
}: {
  items: { title: string; description?: string; body?: string; extra?: ReactNode }[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
  numbered?: boolean;
}) {
  const colCls = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 xl:grid-cols-4' }[cols];
  return (
    <div className={cn('grid grid-cols-1 border-t', colCls, dark ? 'border-light/15' : 'border-ink/15')}>
      {items.map((it, i) => (
        <div
          key={it.title}
          className={cn(
            'border-b py-8 pr-8 md:[&:not(:last-child)]:border-r md:px-7 md:first:pl-0',
            dark ? 'border-light/15' : 'border-ink/15',
          )}
        >
          {numbered && <p className="step-num mb-6">{String(i + 1).padStart(2, '0')}</p>}
          <h3 className={cn('h-card mb-3', dark ? 'text-light' : 'text-ink')}>{it.title}</h3>
          <p className={cn('font-serif text-[0.98rem] leading-relaxed', dark ? 'text-soft' : 'text-body')}>{it.description ?? it.body}</p>
          {it.extra}
        </div>
      ))}
    </div>
  );
}
