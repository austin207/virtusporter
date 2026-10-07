import Seo from '@/seo/Seo';
import { breadcrumbs, faqPage } from '@/seo/schema';
import { company, addressLine } from '@/content/company';
import { contactHero, faqIntro, faqs } from '@/content/about';
import { Eyebrow, Section, TwoTone } from '@/components/ox/primitives';
import { FaqList, PageHero } from '@/components/ox/Blocks';
import PixelIcon from '@/components/ox/PixelIcon';
import ContactForm from '@/components/forms/ContactForm';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`VirtusCo, ${addressLine}`)}`;

const Contact = () => (
  <>
    <Seo
      path="/contact"
      type="ContactPage"
      title="Contact VirtusCo: Start a Robotics Project"
      description="Talk to VirtusCo about a custom robotics project, ROS development, partnerships, investment or the porter robot. Based in Tripunithura, Kochi."
      schema={[faqPage(faqs), breadcrumbs([{ name: 'Contact', path: '/contact' }])]}
    />

    <PageHero
        compact
      eyebrow={contactHero.eyebrow}
      title={
        <>
          Get in <span className="text-accent-ink">Touch</span>
        </>
      }
      lede={contactHero.servicesLede}
      aside={<PixelIcon art="signal" invert className="hidden h-40 w-40 lg:block" />}
    />

    <Section label="Write to us" className="sec wrap">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Details (after the form on phones, beside it on desktop) */}
        <div className="order-2 lg:order-1">
          <Eyebrow className="mb-5">Contact Information</Eyebrow>
          <address className="not-italic">
            <dl className="divide-y divide-ink/15 border-y border-ink/15">
              <div className="grid grid-cols-[130px_1fr] gap-4 py-5">
                <dt className="eyebrow pt-1 text-quiet">Email</dt>
                <dd>
                  <p className="mb-1 font-serif text-sm text-body">General Inquiries:</p>
                  <a href={`mailto:${company.email}`} className="ulink text-[1.05rem]">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 py-5">
                <dt className="eyebrow pt-1 text-quiet">Phone</dt>
                <dd className="space-y-3">
                  {company.phones.map((p) => (
                    <div key={p.tel}>
                      <p className="mb-1 font-serif text-sm text-body">{p.label}:</p>
                      <a href={`tel:${p.tel}`} className="ulink text-[1.05rem]">
                        {p.display}
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 py-5">
                <dt className="eyebrow pt-1 text-quiet">Address</dt>
                <dd className="text-[1.05rem] leading-relaxed">
                  {company.address.name}
                  <br />
                  {company.address.locality}
                  <br />
                  {company.address.city}, {company.address.region} {company.address.postalCode}
                  <br />
                  {company.address.country}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                    Open in Google Maps <span className="arw">→</span>
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 py-5">
                <dt className="eyebrow pt-1 text-quiet">Connect With Us</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {company.socials.map((s) => (
                      <li key={s.id}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="inline-block border border-ink/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </address>
        </div>

        {/* Form */}
        <div className="order-1 bg-card p-[clamp(22px,3vw,44px)] lg:order-2">
          <h2 className="h-section mb-8">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </Section>

    <Section id="faq" tone="paper-2" label="FAQ" className="sec wrap scroll-mt-0">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow className="mb-5">FAQ</Eyebrow>
          <TwoTone ink={faqIntro.title} />
          <p className="lede mt-6 text-body">{faqIntro.lede}</p>
          <p className="mt-8 font-serif text-body">{faqIntro.closing}</p>
          <a href={`mailto:${company.email}`} className="ulink mt-2 inline-block">
            {company.email}
          </a>
        </div>
        <FaqList items={faqs} />
      </div>
    </Section>
  </>
);

export default Contact;
