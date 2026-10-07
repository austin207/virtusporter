// About page + FAQ content, carried over verbatim from the old site.

export const aboutHero = {
  eyebrow: 'About VirtusCo',
  title: 'Our Story and Mission',
  lede: 'VirtusCo was founded with a clear vision: to make robotics practical and affordable for businesses of every size, starting with real problems such as baggage handling at airports.',
};

export const democratizing = {
  eyebrow: 'Our mission',
  title: 'Democratizing Robotics',
  lede: 'Bridging the gap between those with resources and those without, while building tailored robotic solutions for any industry.',
};

export const story = {
  title: 'From Idea to Innovation',
  paragraphs: [
    'VirtusCo began when our founders experienced firsthand the challenges of navigating airports with heavy luggage. What started as a simple question, "Why isn\'t there a better way?", grew into a robotics company that combines engineering with thoughtful service design.',
    "That question became our first product concept, the autonomous porter robot, and taught us how to take a robot from idea to prototype. Today we bring the same process to clients as custom robotics engineering.",
    'VirtusCo works at the intersection of technical excellence and practical innovation: building tailored robots for businesses now, and developing the porter robot for airports.',
  ],
};

export const timeline = [
  { date: 'January 2025', iso: '2025-01', label: 'Initial Brainstorming and Market Research' },
  { date: 'February 2025', iso: '2025-02', label: 'Requirements Gathering and Concept Design' },
  { date: 'March 2025', iso: '2025-03', label: 'Early Proof of Concept and Design Validation' },
  { date: 'April 2025', iso: '2025-04', label: 'Initial stages of prototyping' },
];

export const valuesIntro = {
  title: 'What Drives Us',
  lede: 'Our core values guide everything we do, from product development to customer service.',
};

export const values = [
  {
    title: 'Innovation',
    description: 'We look for better ways to solve each problem, and test new ideas on real hardware before we commit to them.',
  },
  {
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in technology, design, and service delivery.',
  },
  {
    title: 'Sustainability',
    description: 'We design with the planet in mind, creating efficient solutions that minimize environmental impact.',
  },
  {
    title: 'Customer Focus',
    description: 'We prioritize solving real problems for the people who use our robots and creating value for the businesses that deploy them.',
  },
];

export const future = {
  title: 'Looking to the Future',
  paragraphs: [
    'At VirtusCo, we envision a future where robots take on the heavy, repetitive work and technology enhances the human experience rather than complicating it. Our engineering services and the autonomous porter robot are the beginning of that journey.',
    "We're committed to continuous innovation, expanding our solutions to address more challenges in travel, industry and beyond.",
  ],
  initiativesTitle: 'Future Initiatives',
  initiatives: [
    { title: 'Global Expansion', body: 'Bringing our engineering services and products to clients worldwide, adapting to regional needs.' },
    { title: 'Enhanced Capabilities', body: 'Developing next-generation robots with expanded features and services.' },
    { title: 'Beyond Airports', body: 'Exploring applications in other travel hubs, hotels, and urban environments.' },
    { title: 'Integrated Ecosystem', body: 'Creating connected robotics platforms that work across our clients’ operations.' },
  ],
};

export const aboutCta = {
  title: 'Build the future of robotics with us',
  body: "Whether you have a robotics problem to solve, you're an investor interested in our journey, or you want to join our team, we'd love to connect.",
};

export const investorCta = {
  title: 'Ready to join our investment journey?',
  body: 'Contact the founders to explore opportunities and receive our latest investor materials.',
  button: 'Talk to the founders',
};

export const contactHero = {
  eyebrow: 'Contact',
  title: 'Get in Touch',
  lede: "Have a robotics project in mind, a question about our services, or interest in the porter robot? Our team is here to help. Reach out and we'll respond as soon as possible.",
  servicesLede:
    'Have a robotics problem to solve, a project to scope, or interest in our porter robot? Reach out and we’ll respond as soon as possible.', // DRAFT
};

export const faqIntro = {
  title: 'Frequently Asked Questions',
  lede: 'Answers to common questions about our engineering services and the porter robot.',
  closing: 'Still have questions? Our team is ready to help.',
};

export interface Faq {
  q: string;
  a: string;
  topic: 'services' | 'porter';
}

export const faqs: Faq[] = [
  {
    topic: 'services',
    q: 'What does VirtusCo do?',
    a: 'VirtusCo is a robotics engineering company in Kochi, Kerala, India. We build custom robotics solutions (ROS development, end-to-end custom robots, system integration, and AI & machine learning) tailored to each client’s requirements and budget.',
  }, // DRAFT (added for answer engines)
  {
    topic: 'services',
    q: 'Can you work within a limited budget?',
    a: 'Yes. We offer focused solutions for smaller budgets (targeted ROS development for specific functionality), a balanced approach for medium budgets, and comprehensive end-to-end systems for larger budgets. Feature prioritization, phased implementation and technology selection keep every project within its constraints.',
  }, // DRAFT (derived from the budget section)
  {
    topic: 'porter',
    q: 'How do I request a demonstration?',
    a: 'Fill out our contact form and choose "Request a Demo" as the inquiry type. For engineering services we walk you through our work and process; for the porter robot, which is in development, we share prototype progress in a call or an on-site visit.',
  },
  {
    topic: 'porter',
    q: 'What is the deployment timeline for the porter robot?',
    a: 'The porter robot is in development, so there are no live deployments yet. Our planning target is 3 to 6 months per site once pilots begin, depending on scale and requirements, covering site assessment, customization, installation, staff training and initial operational support.',
  },
  {
    topic: 'porter',
    q: 'How does the revenue model work?',
    a: 'The planned model is B2B: direct sales to airports, with data and maintenance charges agreed per contract. Detailed financials are available on request.',
  },
  {
    topic: 'services',
    q: 'What maintenance and support do you provide?',
    a: 'Every engineering project can include an ongoing support agreement covering maintenance, software updates, fixes and optimisation, scoped to your needs. Support terms for the porter robot will be defined ahead of its pilots.',
  },
  {
    topic: 'porter',
    q: 'How do the autonomous porter robots navigate airports?',
    a: 'The porter robot is designed to combine LiDAR, computer vision and AI algorithms to map its environment and navigate autonomously: following its user, avoiding obstacles and adapting to changing conditions in real time.',
  },
  {
    topic: 'porter',
    q: 'Will training be provided for airport staff?',
    a: 'Yes. Training is planned as part of every porter robot deployment: hands-on sessions for operators, maintenance staff and customer service teams, so the robots fit smoothly into existing airport services.',
  },
];

export const inquiryTypes = [
  'General Inquiry',
  'Robotics Project / Consultation',
  'Request a Demo',
  'Partnership Opportunity',
  'Investor Relations',
  'Technical Support',
] as const;
