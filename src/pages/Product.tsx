import { lazy } from 'react';
import Seo from '@/seo/Seo';
import { breadcrumbs, porterProduct } from '@/seo/schema';
import { porter, porterFeatures, porterGroups } from '@/content/porter';
import { faqs } from '@/content/about';
import { Eyebrow, OxLink, Reveal, Section, TwoTone } from '@/components/ox/primitives';
import { ScrollStory, PointPoster } from '@/components/ox/ScrollStory';
import { FeatureGrid } from '@/components/ox/Cards';
import { CtaBand, FaqList } from '@/components/ox/Blocks';

const PorterScene = lazy(() => import('@/scenes/PorterScene'));

const porterFaqs = faqs.filter((f) => f.topic === 'porter');

const groupCopy: Record<string, { ink: string; mut: string; tone: 'paper' | 'paper-2' | 'ink' }> = {
  features: { ink: 'Designed for', mut: 'exceptional experience.', tone: 'paper' },
  technology: { ink: 'Built on', mut: 'proven robotics technology.', tone: 'ink' },
  sustainability: { ink: 'Engineered for', mut: 'a lighter footprint.', tone: 'paper-2' },
};

const Product = () => {
  const chapters = [
    {
      key: 'hero',
      rail: 'Intro',
      node: (
        <>
          <Eyebrow dot className="mb-6 text-light/70">
            {porter.status}
          </Eyebrow>
          <h1 className="h-hero text-light">{porter.title}</h1>
          <p className="lede mt-6 text-soft">{porter.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <OxLink to="/contact?type=porter" variant="cream">
              Register interest
            </OxLink>
            <OxLink to="/product#faq" variant="ghost">
              Revenue model
            </OxLink>
          </div>
        </>
      ),
    },
    ...porterFeatures.map((f, i) => ({
      key: f.title,
      rail: i === 0 ? 'Anatomy' : undefined,
      node: (
        <>
          <p className="eyebrow mb-3 text-light/60">{f.part}</p>
          <p className="step-num mb-5">{String(i + 1).padStart(2, '0')}</p>
          <h2 className="h-chapter !text-[clamp(32px,4.4vw,58px)] text-light">{f.title}</h2>
          <p className="lede mt-5 text-soft">{f.description}</p>
        </>
      ),
    })),
  ];

  return (
    <>
      <Seo
        path="/product"
        ogType="product"
        title="Autonomous Airport Porter Robot (In Development)"
        description="The VirtusCo autonomous porter robot, in development: high payload capacity, LiDAR and AI navigation, a lifting mechanism and a touch display for airports."
        keywords={['autonomous porter robot', 'airport baggage robot', 'luggage carrying robot', 'airport robotics India', 'autonomous mobile robot']}
        schema={[porterProduct(), breadcrumbs([{ name: 'Porter', path: '/product' }])]}
      />

      <ScrollStory id="features" Scene={PorterScene} poster={<PointPoster image="/posters/product.webp" />} chapters={chapters} />

      {/* Status / photo */}
      <Section tone="paper" label="Status" className="sec wrap">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <figure className="relative bg-card">
              <img
                src={porter.image}
                alt={porter.imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
              <figcaption className="absolute left-0 top-0 bg-accent-hover px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white">
                {porter.status}
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Eyebrow className="mb-5">{porter.heroTeaser.title}</Eyebrow>
            <TwoTone ink={porter.contactPitch.title} />
            <p className="lede mt-6 text-body">{porter.contactPitch.body}</p>
            <p className="mt-4 max-w-[52ch] font-serif text-[0.98rem] leading-relaxed text-body">
              We are designing the porter robot to make airport baggage handling easier for travellers and airport staff.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <OxLink to="/contact?type=porter" variant="solid">
                Register interest
              </OxLink>
              <OxLink to="/service" variant="outline-dark">
                Our engineering services
              </OxLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Features / Technology / Sustainability: real anchored sections (were tabs) */}
      {porterGroups.filter((g) => g.id !== 'features').map((g) => {
        const copy = groupCopy[g.id];
        const dark = copy.tone === 'ink';
        return (
          <Section key={g.id} id={g.id} tone={copy.tone} label={g.label} className="sec wrap scroll-mt-0">
            <div className="mb-[clamp(36px,6vh,64px)] grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <Eyebrow className={dark ? 'mb-5 text-quiet' : 'mb-5'}>{g.label}</Eyebrow>
                <TwoTone dark={dark} ink={copy.ink} mut={copy.mut} />
              </div>
              {g.id === 'technology' && <p className="lede text-soft lg:ml-auto">{porter.sectionsIntro.lede}</p>}
            </div>
            <FeatureGrid items={[...g.items]} dark={dark} />
          </Section>
        );
      })}

      <Section id="faq" label="FAQ" className="sec wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="mb-5">FAQ</Eyebrow>
            <TwoTone ink="Porter" mut="questions, answered." />
          </div>
          <FaqList items={porterFaqs} />
        </div>
      </Section>

      <CtaBand
        eyebrow={porter.status}
        title={porter.cta.title}
        body={`${porter.cta.body} ${porter.cta.note}`}
        primary={{ label: 'Register interest', to: '/contact?type=porter' }}
        secondary={{ label: 'Request financials', to: '/contact?type=investor' }}
      />
    </>
  );
};

export default Product;
