import { Link, useLocation } from 'react-router-dom';
import { company, footerLinks, addressLine } from '@/content/company';
import { OxLink } from '@/components/ox/primitives';
import ParticleWordmark from '@/components/ox/ParticleWordmark';
import NewsletterSignup from '@/components/forms/NewsletterSignup';
import { Logo } from './Logo';

// Pages that already end with their own call to action (or a contact form) skip the footer CTA.
const OWN_CTA = ['/', '/service', '/product', '/about', '/contact'];

const Footer = () => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const showCta = !OWN_CTA.includes(pathname.replace(/\/$/, '') || '/');

  return (
    <footer id="footer" data-tone="dark" className="on-dark relative bg-ink text-soft">
      <div className="wrap pb-[clamp(32px,6vh,72px)] pt-[clamp(48px,11vh,140px)]">
        {/* CTA */}
        {showCta && (
        <>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="h-serif max-w-[22ch] text-light">
            The clearest way to see how we work is to put a real robotics problem in front of us.
          </p>
          <OxLink to="/contact" variant="cream" className="self-start md:self-auto">
            Start a conversation
          </OxLink>
        </div>

        <hr className="my-[clamp(32px,7vh,80px)] h-px border-0 bg-light/15" />
        </>
        )}

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-y-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" aria-label="VirtusCo home" className="text-light">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs font-serif text-[0.98rem] leading-relaxed text-soft">
              Robotics engineering company in {company.address.city}, {company.address.region}. Custom robots, ROS, integration and AI,
              plus the autonomous porter robot, in development.
            </p>
            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-5 text-quiet">{col.title}</p>
              <ul className="space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className="inline-block py-1.5 font-sans text-[0.92rem] text-soft transition-colors hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="my-[clamp(28px,6vh,64px)] h-px border-0 bg-light/15" />

        {/* Contact strip */}
        <address className="grid grid-cols-1 gap-6 not-italic sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-3 text-quiet">Email</p>
            <a href={`mailto:${company.email}`} className="ulink text-light">
              {company.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-quiet">Phone</p>
            <a href={`tel:${company.phones[0].tel}`} className="ulink text-light">
              {company.phones[0].display}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-quiet">Office</p>
            <p className="text-light">{addressLine}</p>
          </div>
        </address>
      </div>

      {/* Particle wordmark */}
      <div className="wrap">
        <ParticleWordmark className="block h-[clamp(90px,17vw,300px)] w-full" />
      </div>

      <div className="wrap flex flex-col items-center justify-between gap-4 border-t border-light/10 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-quiet sm:flex-row">
        <p>© {year} VirtusCo. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {company.socials.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer me" className="inline-block px-1 py-2 transition-colors hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
