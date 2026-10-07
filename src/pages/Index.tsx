import { lazy } from 'react';
import Seo from '@/seo/Seo';
import { breadcrumbs, howTo, serviceNodes } from '@/seo/schema';
import { company } from '@/content/company';
import { approach, budget, homeChapters, homeHero, services, servicesIntro, serviceCta } from '@/content/services';
import { porter } from '@/content/porter';
import { democratizing } from '@/content/about';
import { investorCta } from '@/content/about';
import { teamIntro } from '@/content/team';
import { Eyebrow, OxLink, Reveal, Section, TwoTone, TypeHeading } from '@/components/ox/primitives';
import { AccordionCards, ColorPanels } from '@/components/ox/Cards';
import { ScrollStory, PointPoster } from '@/components/ox/ScrollStory';
import DitherTile from '@/components/ox/DitherTile';
import PixelIcon from '@/components/ox/PixelIcon';
import TeamGrid from '@/components/ox/TeamGrid';
import ContactForm from '@/components/forms/ContactForm';

const HomeScene = lazy(() => import('@/scenes/HomeScene'));

const heroSteps = approach.slice(0, 4);

const Index = () => {
  const chapters = [
    {
      key: 'hero',
      rail: 'Intro',
      node: (
        <>
          <Eyebrow dot className="mb-6 text-light/70">
            Robotics engineering · {company.address.city}, India
          </Eyebrow>
          <h1 className="h-hero text-light">{homeHero.title}</h1>
          <p className="lede mt-6 text-soft">{homeHero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <OxLink to="/contact?type=project" variant="cream">
              {homeHero.cta}
            </OxLink>
            <OxLink to="/service" variant="ghost" arrow={false}>
              Our services
            </OxLink>
          </div>
        </>
      ),
    },
    {
      key: 'problem',
      rail: 'Problem',
      node: (
        <>
          <Eyebrow className="mb-5 text-light/60">{homeChapters[0].eyebrow}</Eyebrow>
          <TypeHeading text={homeChapters[0].title} className="h-hero text-light" />
          {homeChapters[0].body.map((p) => (
            <p key={p} className="lede mt-5 text-soft">
              {p}
            </p>
          ))}
        </>
      ),
    },
    {
      key: 'mission',
      align: 'right' as const,
      rail: 'Mission',
      node: (
        <div className="max-w-[460px]">
          <Eyebrow className="mb-5 text-light/60">{democratizing.eyebrow}</Eyebrow>
          <h2 className="h-hero text-light">{democratizing.title}</h2>
          <p className="lede mt-5 text-soft">{democratizing.lede}</p>
        </div>
      ),
    },
    ...heroSteps.map((s, i) => ({
      key: s.n,
      rail: i === 0 ? 'Approach' : undefined,
      node: (
        <>
          <p className="eyebrow mb-3 text-light/60">How we work</p>
          <p className="step-num mb-5">{s.n}</p>
          <h2 className="h-chapter text-light" aria-label={`${s.n} ${s.title}`}>
            {s.short}
          </h2>
          <p className="lede mt-5 text-soft">
            <strong className="font-sans font-medium text-light">{s.title}. </strong>
            {s.description}
          </p>
        </>
      ),
    })),
  ];

  return (
    <>
      <Seo
        path="/"
        title="VirtusCo | Robotics Engineering Company in Kochi, India"
        description="VirtusCo builds custom robots in Kochi, India: ROS development, mechanical and electronics design, system integration and AI, scoped to your budget."
        keywords={['robotics engineering company', 'robotics company Kerala', 'ROS development services', 'custom robot design', 'robotics startup Kochi', 'autonomous porter robot']}
        schema={[...serviceNodes(), howTo(), breadcrumbs([])]}
      />

      <ScrollStory Scene={HomeScene} poster={<PointPoster image="/posters/home.webp" />} chapters={chapters} />

      {/* Services / capabilities */}
      <Section id="services" label="Services" className="sec wrap">
        <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow className="mb-5 text-ink">{servicesIntro.eyebrow}</Eyebrow>
            <TypeHeading text={servicesIntro.title[0]} mut={servicesIntro.title[1]} className="h-section" />
          </div>
          <Reveal>
            <p className="lede text-body lg:ml-auto">{servicesIntro.lede}</p>
          </Reveal>
        </div>
        <AccordionCards
          items={services.map((s) => ({
            tag: s.tag,
            title: s.title,
            body: s.description,
            art: s.pixel,
            list: s.features,
            to: `/service#${s.id}`,
          }))}
        />
      </Section>

      {/* Budget statement (Oxigen "startups" block) */}
      <Section tone="dots" label="Budget" className="sec-sm wrap">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow className="mb-5">{budget.eyebrow}</Eyebrow>
            <TwoTone ink={budget.title[0]} mut={budget.title[1]} />
            <p className="lede mt-6 text-body">{budget.lede}</p>
            <div className="mt-9">
              <OxLink to="/service#budget" variant="solid">
                See budget-based approaches
              </OxLink>
            </div>
          </div>
          <ol className="border-t border-ink/15">
            {budget.tiers.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 100} className="grid grid-cols-[48px_1fr] gap-4 border-b border-ink/15 py-6">
                <span className="step-num pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="h-card">{t.title}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">{t.fit}</span>
                  </div>
                  <p className="mt-2 font-serif text-[0.98rem] leading-relaxed text-body">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Porter teaser */}
      <Section tone="paper-2" label="Porter" className="sec-sm wrap overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow dot className="mb-5">
              {porter.status}
            </Eyebrow>
            <TwoTone as="h2" ink={porter.heroTeaser.title.split(' of ')[0]} mut={`of ${porter.heroTeaser.title.split(' of ')[1]}`} />
            <p className="lede mt-6 text-body">{porter.heroTeaser.body}</p>
            <p className="mt-4 max-w-[52ch] font-serif text-[0.98rem] leading-relaxed text-body">{porter.lede}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <OxLink to="/product" variant="solid">
                Meet the Porter
              </OxLink>
              <OxLink to="/contact?type=porter" variant="outline-dark">
                Register interest
              </OxLink>
            </div>
          </div>
          <div className="relative mx-auto grid w-full max-w-[560px] grid-cols-2 gap-6 py-6">
            <DitherTile src={porter.image} alt={porter.imageAlt} rotate={-5} className="col-span-2 mx-auto w-[78%]" />
            <div className="flex aspect-square rotate-[4deg] items-center justify-center bg-card">
              <PixelIcon art="porter" className="h-1/2 w-1/2" />
            </div>
            <div className="flex aspect-square -rotate-3 items-center justify-center bg-ink">
              <PixelIcon art="ai" invert className="h-1/2 w-1/2" />
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section id="team" label="Team" className="sec wrap">
        <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow className="mb-5">{teamIntro.eyebrow}</Eyebrow>
            <TwoTone ink={teamIntro.homeTitle} mut="from Kochi, Kerala." />
          </div>
          <p className="lede text-body lg:ml-auto">{teamIntro.homeLede}</p>
        </div>
        <TeamGrid />
      </Section>

      {/* Panels */}
      <section data-tone="dark" data-rail="More" aria-labelledby="more-heading">
        <h2 id="more-heading" className="sr-only">
          More from VirtusCo
        </h2>
        <ColorPanels
          items={[
            {
              title: 'Our Story and Mission',
              body: 'From a question asked in an airport queue to a robotics engineering company. Read how VirtusCo began and what drives us.',
              art: 'doc',
              to: '/about',
              cta: 'About VirtusCo',
            },
            {
              title: investorCta.title,
              body: investorCta.body,
              art: 'signal',
              to: '/contact?type=investor',
              cta: investorCta.button,
            },
            {
              title: 'Press Kit',
              body: 'Logos, product imagery and company information for media and partners.',
              art: 'team',
              to: '/press-kit',
              cta: 'Open press kit',
            },
          ]}
        />
      </section>

      {/* Contact */}
      <Section id="contact" label="Contact" className="sec wrap">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow className="mb-5">Contact</Eyebrow>
            <TwoTone ink={serviceCta.title} />
            <p className="lede mt-6 text-body">{serviceCta.body}</p>
            <dl className="mt-10 space-y-6 border-t border-ink/15 pt-8">
              <div>
                <dt className="eyebrow mb-2 text-quiet">Email us</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="ulink text-lg">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2 text-quiet">Call us</dt>
                <dd>
                  <a href={`tel:${company.phones[0].tel}`} className="ulink text-lg">
                    {company.phones[0].display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2 text-quiet">Visit us</dt>
                <dd className="text-lg">Tripunithura, Kochi, Kerala, India</dd>
              </div>
            </dl>
          </div>
          <div className="bg-card p-[clamp(22px,3vw,40px)]">
            <h3 className="h-card mb-7">Send us a message</h3>
            <ContactForm compact />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
