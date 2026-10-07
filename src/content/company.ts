// Single source of truth for company facts. Used by pages, JSON-LD, llms.txt and the sitemap.
// TODO(confirm): the old site listed three different phone numbers; all are kept here, labelled.

export const SITE_URL = 'https://www.virtusco.in';

export const company = {
  name: 'VirtusCo',
  legalName: 'VirtusCo',
  tagline: 'Robotics engineering, built in Kerala.',
  shortDescription:
    'VirtusCo is a robotics engineering company in Kochi, Kerala, India. We design and build custom robotics systems, covering ROS development, mechanical and electronics design, system integration and AI, tailored to each client’s needs and budget.',
  mission:
    'Democratizing robotics: bridging the gap between those with resources and those without, while building tailored robotic solutions for any industry.',
  vision:
    "At VirtusCo, we're committed to democratizing robotics and making automation accessible to businesses of all sizes. Our work grows out of hands-on research and engineering, with a focus on creating technology that's genuinely helpful and accessible to everyone.",
  foundingDate: '2025-01',
  email: 'virtusco.tech@gmail.com',
  phones: [
    { label: 'General', display: '+91 73568 44578', tel: '+917356844578' },
    { label: 'Sales & Support', display: '+91 90617 54652', tel: '+919061754652' },
    { label: 'Corporate Office', display: '+91 99473 32462', tel: '+919947332462' },
  ],
  privacyEmail: 'privacy@virtusco.in',
  legalEmail: 'legal@virtusco.in',
  address: {
    name: 'VirtusCo Headquarters',
    locality: 'Tripunithura',
    city: 'Kochi',
    region: 'Kerala',
    postalCode: '682301',
    country: 'India',
    countryCode: 'IN',
  },
  socials: [
    { id: 'x', label: 'X', url: 'https://x.com/VirtuscoTech' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/virtusco/' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/virtuscotech/' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/VirtusCo' },
  ],
  twitterHandle: '@VirtuscoTech',
} as const;

export const addressLine = `${company.address.locality}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}, ${company.address.country}`;

/** Feature switches. Turn virtueAI back on once the Supabase/Gemini chat backend is restored. */
export const features = {
  virtueAI: false,
} as const;

const allNav = [
  { label: 'Services', to: '/service' },
  { label: 'Porter', to: '/product' },
  { label: 'About', to: '/about' },
  { label: 'Virtue AI', to: '/virtue' },
  { label: 'Contact', to: '/contact' },
] as const;

export const nav = allNav.filter((i) => i.to !== '/virtue' || features.virtueAI);

export const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'ROS Development', path: '/service#ros-development' },
      { name: 'Custom Robotics', path: '/service#custom-robotics-solutions' },
      { name: 'System Integration', path: '/service#system-integration' },
      { name: 'AI & Machine Learning', path: '/service#ai-machine-learning' },
      { name: 'Our Approach', path: '/service#approach' },
    ],
  },
  {
    title: 'Porter',
    links: [
      { name: 'Features', path: '/product#features' },
      { name: 'Technology', path: '/product#technology' },
      { name: 'Sustainability', path: '/product#sustainability' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about#team' },
      { name: 'Investor Info', path: '/contact?type=investor' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Press Kit', path: '/press-kit' },
      { name: 'Employee Products', path: '/employee-products' },
      { name: 'FAQ', path: '/contact#faq' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' },
    ],
  },
] as const;
