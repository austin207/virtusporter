import { Link, useParams } from 'react-router-dom';
import Seo from '@/seo/Seo';
import { breadcrumbs, person } from '@/seo/schema';
import { getFounder } from '@/content/team';
import { Eyebrow, Reveal, Section } from '@/components/ox/primitives';
import TeamGrid from '@/components/ox/TeamGrid';
import NotFound from './NotFound';
import { portrait } from '@/content/photos';

const socialLabel = { linkedin: 'LinkedIn', x: 'X', instagram: 'Instagram' } as const;

/** One template for all founder profiles (/founders/:slug); data lives in src/content/team.ts. */
const Founder = () => {
  const { slug = '' } = useParams();
  const f = getFounder(slug);
  if (!f) return <NotFound />;
  const [first, ...rest] = f.paragraphs;

  return (
    <>
      <Seo
        path={`/founders/${f.slug}`}
        type="ProfilePage"
        ogType="profile"
        title={`${f.name} | ${f.title.split(' · ')[1] ?? f.role}, VirtusCo`}
        description={first.length > 158 ? `${first.slice(0, 155).replace(/\s+\S*$/, '')}…` : first}
        schema={[person(f), breadcrumbs([{ name: 'About', path: '/about' }, { name: f.name, path: `/founders/${f.slug}` }])]}
      />

      {/* Hero */}
      <section data-tone="dark" data-rail="Profile" className="on-dark bg-ink text-light">
        <div className="grid gap-10 px-[var(--gutter-hero)] pb-[clamp(48px,9vh,100px)] pt-36 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal className="relative mx-auto w-full max-w-[460px] lg:mx-0">
            <img
              {...portrait(f.image, '(min-width: 1024px) 460px, 90vw')}
              alt={`Portrait of ${f.name}, ${f.title.replace(' · ', ', ')} at VirtusCo`}
              width={600}
              height={800}
              {...{ fetchpriority: "high" }}
              className="aspect-[3/4] w-full object-cover grayscale"
            />
            <span aria-hidden className="absolute -bottom-3 -right-3 h-6 w-6 bg-accent" />
          </Reveal>
          <div>
            <Link to="/about#team" className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-light/60 hover:text-light">
              <span aria-hidden>←</span> Back to About
            </Link>
            <Eyebrow dot className="mb-5 text-light/70">
              {f.title}
            </Eyebrow>
            <h1 className="h-page text-light">{f.name}</h1>
            <p className="lede mt-6 !max-w-[60ch] text-soft">{first}</p>
            {f.socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {f.socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-light/30 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-light hover:text-ink"
                    >
                      {socialLabel[s.platform]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Bio */}
      <Section label="Bio" className="sec wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="mb-5">Profile</Eyebrow>
            <ul className="flex flex-wrap gap-1.5">
              {f.expertise.map((e) => (
                <li key={e} className="border border-ink/15 px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink/75">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            {rest.map((p) => (
              <Reveal as="p" key={p.slice(0, 24)} className="copy max-w-[64ch] text-[1.12rem] text-body">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Quote */}
      <section data-tone="dark" data-rail="Quote" className="on-dark sec wrap bg-ink text-light">
        <Reveal as="figure" className="mx-auto max-w-[920px]">
          <span aria-hidden className="mb-6 block font-serif text-6xl leading-none text-accent-ink">
            “
          </span>
          <blockquote className="h-serif text-light">{f.quote}</blockquote>
          <figcaption className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.18em] text-quiet">{f.name}</figcaption>
        </Reveal>
      </section>

      {/* Rest of team */}
      <Section label="Team" className="sec wrap">
        <Eyebrow className="mb-5">The team</Eyebrow>
        <h2 className="h-section">Meet the rest of the team</h2>
        <TeamGrid exclude={f.slug} className="!grid-cols-2 md:!grid-cols-4 xl:!grid-cols-4 mt-10" />
      </Section>
    </>
  );
};

export default Founder;
