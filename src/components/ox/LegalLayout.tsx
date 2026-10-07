import { useEffect, useRef, type ReactNode } from 'react';
import { Eyebrow } from './primitives';

/** Oxigen article layout: dark title block, 700px serif column, 3px accent reading-progress bar. */
export default function LegalLayout({ title, updated, updatedIso, intro, children }: { title: string; updated: string; updatedIso: string; intro: string; children: ReactNode }) {
  const barRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = articleRef.current;
      const bar = barRef.current;
      if (a && bar) {
        const r = a.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        bar.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
      <section data-tone="dark" className="on-dark bg-ink text-light">
        <div className="mx-auto max-w-[840px] px-6 pb-[clamp(48px,8vh,90px)] pt-40">
          <Eyebrow dot className="mb-6 text-light/70">
            Legal
          </Eyebrow>
          <h1 className="h-page text-light">{title}</h1>
          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.18em] text-quiet">
            Last updated: <time dateTime={updatedIso}>{updated}</time>
          </p>
        </div>
      </section>
      <section data-tone="light" className="bg-paper">
        <article ref={articleRef} className="article mx-auto max-w-[700px] px-6 py-[clamp(56px,10vh,110px)]">
          <p className="!font-serif !text-[1.3rem] !leading-[1.6] !text-ink">{intro}</p>
          {children}
        </article>
      </section>
    </>
  );
}

export function LegalContact({ email }: { email: string }) {
  return (
    <div className="mt-6 border-l-2 border-accent bg-card p-6">
      <p className="!text-ink font-sans font-semibold">VirtusCo, Ltd.</p>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className="mt-2">
        VirtusCo Headquarters
        <br />
        100 Tripunithara
        <br />
        Kochi, Kerala 682301
        <br />
        India
      </p>
    </div>
  );
}
