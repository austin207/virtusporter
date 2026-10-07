import { useId } from 'react';
import { cn } from '@/lib/utils';

/*
 * VirtusCo mark, traced from the original public/favicon.ico (48 px master): twelve bars radiating
 * from a red core, each ending in an outlined dot, with six more dots along the vertical and
 * shallow-diagonal bars. Dots are cut out of the bars (mask) and outlined faintly, exactly how they
 * read in the original; bars take the current text colour, so the mark inverts cleanly on dark.
 * Geometry is shared with public/favicon.svg / logo.svg (keep them in sync).
 */
const C = { x: 24, y: 18 };
const OUTER: [number, number][] = [
  [24.3, 2.3], [13.7, 6.3], [34.5, 6.3], [3.6, 10.2], [44.6, 10.2], [3.4, 17.6],
  [44.9, 17.6], [3.6, 25.5], [44.6, 25.5], [13.9, 29.7], [34.4, 29.7], [24.1, 33.6],
];
const INNER: [number, number][] = [
  [24, 9.9], [13.8, 13.8], [34.2, 13.8], [13.8, 21.6], [34.2, 21.6], [24, 25.6],
];
const CORE_RED = 'rgb(243 39 1)';
const BAR = 3.9;

const bars = OUTER.map(([x, y]) => {
  const dx = x - C.x;
  const dy = y - C.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const start = Math.abs(ux) < 0.1 ? 2.6 : 6.4; // vertical bars reach the core, the rest stop short
  const sx = C.x + ux * start;
  const sy = C.y + uy * start;
  const nx = (-uy * BAR) / 2;
  const ny = (ux * BAR) / 2;
  return [
    [sx + nx, sy + ny],
    [x + nx, y + ny],
    [x - nx, y - ny],
    [sx - nx, sy - ny],
  ]
    .map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`)
    .join(' ');
});

export function LogoMark({ className }: { className?: string }) {
  const id = `vc-holes-${useId().replace(/:/g, '')}`;
  const dots = [...OUTER, ...INNER];
  return (
    <svg viewBox="0 0 48 36" className={cn('h-7 w-auto', className)} aria-hidden focusable="false">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="36">
          <rect width="48" height="36" fill="white" />
          {dots.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={2.75} fill="black" />
          ))}
        </mask>
      </defs>
      <g mask={`url(#${id})`} fill="currentColor">
        {bars.map((p) => (
          <polygon key={p} points={p} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={0.5} strokeOpacity={0.35}>
        {dots.map(([x, y]) => (
          <circle key={`r${x}-${y}`} cx={x} cy={y} r={2.5} />
        ))}
      </g>
      <rect x={21} y={15.8} width={6} height={4.4} rx={1.6} fill={CORE_RED} />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {wordmark && <span className="font-sans text-[19px] font-bold lowercase tracking-[-0.04em] leading-none">virtusco</span>}
    </span>
  );
}
