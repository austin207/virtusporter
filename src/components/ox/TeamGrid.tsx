import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { founders, type Founder } from '@/content/team';
import { Reveal } from './primitives';
import { portrait } from '@/content/photos';

export function FounderCard({ f, i = 0, showExpertise = false }: { f: Founder; i?: number; showExpertise?: boolean }) {
  return (
    <Reveal delay={i * 90}>
      <Link to={`/founders/${f.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-paper-3">
          <img
            {...portrait(f.image, '(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 46vw')}
            alt={`${f.name}, ${f.title.replace(' · ', ', ')} at VirtusCo`}
            loading="lazy"
            decoding="async"
            width={600}
            height={800}
            className="h-full w-full object-cover grayscale transition-all duration-700 ease-ox group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink">
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="pt-5">
          <h3 className="h-card text-ink">{f.name}</h3>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">{f.title}</p>
          <p className="mt-3 font-serif text-[0.95rem] leading-relaxed text-body">{f.summary}</p>
          {showExpertise && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {f.expertise.map((e) => (
                <li key={e} className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/70">
                  {e}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            View profile <span className="arw">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function TeamGrid({ showExpertise = false, exclude, className }: { showExpertise?: boolean; exclude?: string; className?: string }) {
  const list = founders.filter((f) => f.slug !== exclude);
  return (
    <div className={cn('grid grid-cols-2 gap-x-[14px] gap-y-12 md:grid-cols-3 xl:grid-cols-5', className)}>
      {list.map((f, i) => (
        <FounderCard key={f.slug} f={f} i={i} showExpertise={showExpertise} />
      ))}
    </div>
  );
}
