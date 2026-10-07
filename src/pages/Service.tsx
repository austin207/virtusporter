import { lazy } from 'react';
import Seo from '@/seo/Seo';
import { breadcrumbs, howTo, serviceNodes } from '@/seo/schema';
import { approach, approachIntro, budget, serviceCta, serviceHero, services, servicesIntro } from '@/content/services';
import { faqs } from '@/content/about';
import { Eyebrow, OxLink, Reveal, Section, TwoTone } from '@/components/ox/primitives';
import { ScrollStory, PointPoster } from '@/components/ox/ScrollStory';
import { CtaBand, FaqList } from '@/components/ox/Blocks';
import PixelIcon from '@/components/ox/PixelIcon';

const ServiceScene = lazy(() => import('@/scenes/ServiceScene'));

const serviceFaqs = faqs.filter((f) => f.topic === 'services');

const Service = () => {
  const chapters = [
    {
      key: 'hero',
      rail: 'Intro',
      node: (
        <>
          <Eyebrow dot className="mb-6 text-light/70">
            {serviceHero.eyebrow}
          </Eyebrow>
          <h1 className="h-hero text-light">{serviceHero.title}</h1>
          <p className="lede mt-6 text-soft">{serviceHero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <OxLink to="/contact?type=project" variant="cream">
              Get a Consultation
            </OxLink>
            <OxLink to="/product" variant="ghost" arrow={false}>
              Explore Our Products
            </OxLink>
          </div>
        </>
      ),
    },
    ...services.map((s, i) => ({
      key: s.id,
      rail: i === 0 ? 'Services' : undefined,
      node: (
        <>
          <p className="eyebrow mb-3 text-light/60">{s.tag}</p>
          <p className="step-num mb-5">{String(i + 1).padStart(2, '0')}</p>
          <h2 className="h-chapter text-light">{s.title}</h2>
          <p className="lede mt-5 text-soft">{s.description}</p>
        </>
      ),
    })),
  ];

  return (
    <>
      <Seo
        path="/service"
        title="ROS and Custom Robotics Engineering Services"
        description="Custom robotics for your business: ROS development, end-to-end custom robots, system integration and AI, scoped to your needs and budget. VirtusCo, Kochi."
        keywords={['ROS development company India', 'custom robotics solutions', 'robot system integration', 'robotics AI machine learning', 'robotics consultancy Kerala']}
        schema={[...serviceNodes(), howTo(), breadcrumbs([{ name: 'Services', path: '/service' }])]}
      />

      <ScrollStory Scene={ServiceScene} poster={<PointPoster image="/posters/service.webp" />} chapters={chapters} />

      {/* Service detail */}
      <Section id="services" label="Detail" className="sec wrap">
        <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow className="mb-5">{servicesIntro.eyebrow}</Eyebrow>
            <TwoTone ink={servicesIntro.title[0]} mut={servicesIntro.title[1]} />
          </div>
          <p className="lede text-body lg:ml-auto">{servicesIntro.lede}</p>
        </div>
        <div className="border-t border-ink/15">
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.id}
              id={s.id}
              className="group grid scroll-mt-28 gap-6 border-b border-ink/15 py-[clamp(28px,5vh,52px)] md:grid-cols-[80px_1fr_1fr] md:gap-10"
            >
              <div className="flex items-start gap-4 md:flex-col">
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <PixelIcon art={s.pixel} className="h-12 w-12" />
              </div>
              <div>
                <p className="mono-tag mb-3 text-quiet">{s.tag}</p>
                <h3 className="h-section !text-[clamp(1.4rem,2.2vw,2rem)]">{s.title}</h3>
                <p className="mt-4 max-w-[46ch] font-serif text-[1.02rem] leading-relaxed text-body">{s.description}</p>
              </div>
              <ul className="grid content-start grid-cols-1 gap-px self-start bg-ink/10 sm:grid-cols-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 bg-paper px-4 py-3.5 font-sans text-[0.93rem] text-ink sm:[&:last-child:nth-child(odd)]:col-span-2">
                    <span aria-hidden className="h-[5px] w-[5px] shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" tone="ink" label="Approach" className="sec wrap">
        <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow className="mb-5 text-quiet">{approachIntro.eyebrow}</Eyebrow>
            <TwoTone dark ink="From first conversation" mut="to ongoing support." />
          </div>
          <p className="lede text-soft lg:ml-auto">{approachIntro.lede}</p>
        </div>
        <ol className="grid grid-cols-1 border-t border-light/15 md:grid-cols-5">
          {approach.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 90}
              className="border-b border-light/15 py-8 md:border-b-0 md:px-6 md:first:pl-0 md:[&:not(:last-child)]:border-r"
            >
              <p className="step-num mb-8">{s.n}</p>
              <h3 className="h-card mb-3 text-light">{s.title}</h3>
              <p className="font-serif text-[0.98rem] leading-relaxed text-soft">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Budget */}
      <Section id="budget" tone="dots" label="Budget" className="sec wrap">
        <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow className="mb-5">{budget.eyebrow}</Eyebrow>
            <TwoTone ink={budget.title[0]} mut={budget.title[1]} />
          </div>
          <p className="lede text-body lg:ml-auto">{budget.lede}</p>
        </div>
        <div className="grid gap-[14px] lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="bg-card p-[clamp(24px,3vw,40px)]">
            <h3 className="h-card mb-4">{budget.flexible.title}</h3>
            <p className="font-serif text-[1rem] leading-relaxed text-body">{budget.flexible.body}</p>
            <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6">
              {budget.flexible.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-sans text-[0.95rem]">
                  <span aria-hidden className="font-mono text-accent-ink">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="on-dark bg-ink p-[clamp(24px,3vw,40px)] text-light">
            <h3 className="h-card mb-6 text-light">{budget.tiersTitle}</h3>
            <div className="grid gap-px bg-light/15 sm:grid-cols-3">
              {budget.tiers.map((t) => (
                <div key={t.title} className="bg-ink p-5 sm:first:pl-0">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-ink">{t.fit}</p>
                  <h4 className="mt-3 font-sans text-[1.05rem] font-medium text-light">{t.title}</h4>
                  <p className="mt-2 font-serif text-[0.95rem] leading-relaxed text-soft">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-light/15 pt-6 font-serif text-[1rem] leading-relaxed text-soft">{budget.closing}</p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" label="FAQ" className="sec wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="mb-5">FAQ</Eyebrow>
            <TwoTone ink="Questions about" mut="working with us." />
          </div>
          <FaqList items={serviceFaqs} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Start a project"
        title={serviceCta.title}
        body={serviceCta.body}
        primary={{ label: 'Contact Us', to: '/contact?type=project' }}
        secondary={{ label: 'Explore Products', to: '/product' }}
      />
    </>
  );
};

export default Service;
