import Seo from '@/seo/Seo';
import { breadcrumbs, person } from '@/seo/schema';
import { company } from '@/content/company';
import { aboutCta, aboutHero, democratizing, future, story, timeline, values, valuesIntro } from '@/content/about';
import { founders, teamIntro } from '@/content/team';
import { keyFacts } from '@/content/facts';
import { Eyebrow, OxLink, Reveal, Section, TwoTone } from '@/components/ox/primitives';
import { CtaBand, PageHero } from '@/components/ox/Blocks';
import { FeatureGrid } from '@/components/ox/Cards';
import PixelIcon from '@/components/ox/PixelIcon';
import TeamGrid from '@/components/ox/TeamGrid';

const About = () => (
  <>
    <Seo
      path="/about"
      type="AboutPage"
      title="About VirtusCo: Our Story, Mission and Founding Team"
      description="VirtusCo is a robotics company founded in 2025 by five Rajagiri engineers in Kochi, India, on a mission to democratize robotics for every industry."
      schema={[...founders.map(person), breadcrumbs([{ name: 'About', path: '/about' }])]}
    />

    <PageHero
      eyebrow={aboutHero.eyebrow}
      title={aboutHero.title}
      lede={aboutHero.lede}
      aside={<PixelIcon art="team" invert className="hidden h-40 w-40 opacity-90 lg:block" />}
    >
      <OxLink to="/about#team" variant="cream">
        Meet Our Team
      </OxLink>
      <OxLink to="/contact" variant="ghost" arrow={false}>
        Contact Us
      </OxLink>
    </PageHero>

    {/* Mission */}
    <Section tone="dots" label="Mission" className="sec-sm wrap">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <Eyebrow className="mb-5">{democratizing.eyebrow}</Eyebrow>
          <TwoTone ink={`${democratizing.title}.`} mut={democratizing.lede} className="!text-[clamp(1.7rem,3vw,2.8rem)]" />
        </div>
        <Reveal className="bg-card p-[clamp(22px,3vw,36px)]">
          <h3 className="h-card mb-3">Our Vision</h3>
          <p className="font-serif text-[1rem] leading-relaxed text-body">{company.vision}</p>
        </Reveal>
      </div>
    </Section>

    {/* At a glance: plain, quotable facts (for people skimming and for AI answer engines) */}
    <Section id="facts" label="Facts" className="sec-sm wrap">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow className="mb-5">At a glance</Eyebrow>
          <h2 className="h-section">VirtusCo in brief</h2>
        </div>
        <dl className="border-t border-ink/15">
          {keyFacts.map((f) => (
            <div key={f.label} className="grid grid-cols-1 gap-1.5 border-b border-ink/15 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="eyebrow pt-1 text-quiet">{f.label}</dt>
              <dd className="font-serif text-[1.02rem] leading-relaxed text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>

    {/* Story + timeline */}
    <Section id="story" label="Story" className="sec wrap">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow className="mb-5">Our story</Eyebrow>
          <h2 className="h-section mb-8">{story.title}</h2>
          <div className="space-y-5">
            {story.paragraphs.map((p) => (
              <Reveal as="p" key={p} className="copy max-w-[58ch] text-body">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow className="mb-8 text-quiet">Timeline</Eyebrow>
          <ol className="relative border-l border-ink/15">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.iso} delay={i * 110} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] bg-accent" />
                <time dateTime={t.iso} className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-quiet">
                  {t.date}
                </time>
                <p className="mt-2 font-sans text-[1.1rem] font-medium text-ink">{t.label}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>

    {/* Values */}
    <Section tone="ink" label="Values" className="sec wrap">
      <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <Eyebrow className="mb-5 text-quiet">Values</Eyebrow>
          <TwoTone dark ink={valuesIntro.title} />
        </div>
        <p className="lede text-soft lg:ml-auto">{valuesIntro.lede}</p>
      </div>
      <FeatureGrid items={values} dark />
    </Section>

    {/* Team */}
    <Section id="team" label="Team" className="sec wrap scroll-mt-0">
      <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <Eyebrow className="mb-5">{teamIntro.eyebrow}</Eyebrow>
          <TwoTone ink={teamIntro.title} />
        </div>
        <p className="lede text-body lg:ml-auto">{teamIntro.lede}</p>
      </div>
      <TeamGrid showExpertise />
    </Section>

    {/* Future */}
    <Section tone="paper-2" label="Future" className="sec wrap">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow className="mb-5">What's next</Eyebrow>
          <h2 className="h-section mb-8">{future.title}</h2>
          {future.paragraphs.map((p) => (
            <p key={p} className="copy mb-5 max-w-[58ch] text-body">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <OxLink to="/contact" variant="solid">
              Join Our Journey
            </OxLink>
          </div>
        </div>
        <div className="bg-card p-[clamp(22px,3vw,40px)]">
          <h3 className="h-card mb-6">{future.initiativesTitle}</h3>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {future.initiatives.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 80} className="grid grid-cols-[40px_1fr] gap-3 py-5">
                <span className="step-num pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="font-sans text-[1.05rem] font-medium">{it.title}</h4>
                  <p className="mt-1 font-serif text-[0.97rem] leading-relaxed text-body">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    <CtaBand
      title={aboutCta.title}
      body={aboutCta.body}
      primary={{ label: 'Contact Us', to: '/contact' }}
      secondary={{ label: 'Explore Our Product', to: '/product' }}
    />
  </>
);

export default About;
