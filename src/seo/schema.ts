// JSON-LD builders. Everything derives from src/content so structured data never drifts from the page.
import { SITE_URL, company } from '@/content/company';
import { services, approach } from '@/content/services';
import { porter, porterFeatures } from '@/content/porter';
import { founders, type Founder } from '@/content/team';
import { faqs, type Faq } from '@/content/about';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${p}`);

export const organization = () => ({
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: company.name,
  legalName: company.legalName,
  alternateName: ['Virtus Co', 'VirtusCo Robotics', 'virtusco.in'],
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: abs('/brand/virtusco-logo-white.png'), width: 232, height: 303 },
  image: abs('/og/home.png'),
  description: company.shortDescription,
  slogan: company.tagline,
  foundingDate: company.foundingDate,
  foundingLocation: { '@type': 'Place', name: `${company.address.city}, ${company.address.region}, India` },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5 },
  email: company.email,
  telephone: company.phones[0].tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.locality,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
  knowsAbout: [
    'Robotics engineering',
    'Robot Operating System (ROS)',
    'Autonomous navigation',
    'Mechanical design',
    'Embedded electronics',
    'System integration',
    'Computer vision',
    'Machine learning',
    'Autonomous mobile robots',
    'Airport baggage robots',
  ],
  contactPoint: company.phones.map((p) => ({
    '@type': 'ContactPoint',
    telephone: p.tel,
    contactType: p.label === 'Sales & Support' ? 'sales' : p.label === 'Corporate Office' ? 'customer support' : 'customer service',
    email: company.email,
    areaServed: 'IN',
    availableLanguage: ['English', 'Malayalam', 'Hindi'],
  })),
  founder: founders.map((f) => ({ '@id': `${SITE_URL}/founders/${f.slug}#person` })),
  sameAs: company.socials.map((s) => s.url),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Robotics engineering services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/service#${s.id}` } })),
  },
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: company.name,
  description: company.shortDescription,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
});

export const webPage = (opts: { path: string; title: string; description: string; type?: string }) => ({
  '@type': opts.type ?? 'WebPage',
  '@id': `${abs(opts.path)}#webpage`,
  url: abs(opts.path),
  name: opts.title,
  description: opts.description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en',
  primaryImageOfPage: abs(`/og/${ogKey(opts.path)}.png`),
  dateModified: typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : undefined,
  // Voice assistants / answer engines: the headline and lead paragraph are the quotable summary
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.lede'] },
});

export const serviceNodes = () =>
  services.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/service#${s.id}`,
    name: s.title,
    serviceType: s.title,
    description: s.description,
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/service#${s.id}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.title} capabilities`,
      itemListElement: s.features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: f } })),
    },
  }));

export const howTo = () => ({
  '@type': 'HowTo',
  name: 'How VirtusCo delivers a custom robotics project',
  description: 'Our approach adapts to your specific needs and budget constraints.',
  step: approach.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description })),
});

export const porterProduct = () => ({
  '@type': 'Product',
  '@id': `${SITE_URL}/product#porter`,
  name: `VirtusCo ${porter.name}`,
  description: porter.lede,
  category: 'Autonomous mobile robot',
  brand: { '@type': 'Brand', name: company.name },
  manufacturer: { '@id': ORG_ID },
  image: abs(porter.image),
  additionalProperty: porterFeatures.map((f) => ({ '@type': 'PropertyValue', name: f.title, value: f.description })),
  // Not yet for sale: no Offer/price is published while the product is in development.
  isRelatedTo: { '@id': ORG_ID },
});

export const person = (f: Founder) => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/founders/${f.slug}#person`,
  name: f.name,
  jobTitle: f.title.replace('Founder · ', 'Founder, '),
  description: f.paragraphs[0],
  image: abs(f.image),
  url: `${SITE_URL}/founders/${f.slug}`,
  worksFor: { '@id': ORG_ID },
  alumniOf: f.paragraphs.some((p) => p.includes('Rajagiri'))
    ? { '@type': 'CollegeOrUniversity', name: 'Rajagiri School of Engineering & Technology' }
    : undefined,
  knowsAbout: f.expertise,
  sameAs: f.socials.map((s) => s.url),
});

export const faqPage = (items: Faq[] = faqs) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': [organization(), website(), ...nodes],
});

export function ogKey(path: string) {
  if (path === '/' || path === '') return 'home';
  return path.replace(/^\//, '').replace(/\//g, '-');
}
