// Founding team. Canonical source is the individual founder pages (user decision, 2026-10-07).
// Titles and expertise are derived from those pages; the conflicting About/home bios were retired.
// TODO(confirm): Azeem has no social profile URLs, and Danush has no X profile (the old pages linked to bare domains).

export interface SocialLink {
  platform: 'linkedin' | 'x' | 'instagram';
  url: string;
}

export interface Founder {
  slug: string;
  name: string;
  role: string;
  title: string;
  image: string;
  initials: string;
  summary: string; // first sentence of the canonical bio, used on cards
  expertise: string[];
  paragraphs: string[];
  quote: string;
  socials: SocialLink[];
}

export const founders: Founder[] = [
  {
    slug: 'antony-austin',
    name: 'Antony Austin',
    role: 'Founder',
    title: 'Founder · Technology',
    image: '/Austin.jpeg',
    initials: 'AA',
    summary:
      'Channels his expertise in AI/ML, robotics, and full-stack development into creating intelligent, autonomous systems.',
    expertise: ['AI / ML', 'Robotics & ROS', 'Circuit Design', 'Full-stack Development'],
    paragraphs: [
      "Antony Austin serves as a Founder at VirtusCo, where he channels his expertise in AI/ML, robotics, and full-stack development into creating intelligent, autonomous systems. His versatile technical background spans ROS (Robot Operating System), mobile app development, circuit design, and high-tech leadership, making him a driving force behind VirtusCo's innovative solutions.",
      "Antony's skills span hardware architecture, AI implementation, and system integration. This self-driven expertise lets him design complete systems, from electronics to software, that solve real-world problems efficiently.",
      "Antony's vision for democratizing advanced technology drives VirtusCo's mission. His ability to bridge technical domains, from circuit design to artificial intelligence, lets the company take on complete robotics projects within one team.",
      "Under Antony's technical leadership, VirtusCo continues to develop autonomous robotics, with a focus on sustainable solutions, from custom robots for businesses of all sizes to the porter robot designed to improve the passenger experience at airports.",
    ],
    quote:
      "The future of innovation isn't just about advanced systems or smarter machines. It's about making sure the brightest minds regardless of where they come from have a real shot at shaping that future. At VirtusCo, I'm building more than just technology; I'm building pathways for potential to rise, even when the odds are against it.",
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/antony-austin-b7287226a/' },
      { platform: 'x', url: 'https://x.com/AntonyAustin19' },
      { platform: 'instagram', url: 'https://www.instagram.com/antonyavstin?igsh=Z3NpM3NuNjl4dmU0&utm_source=qr' },
    ],
  },
  {
    slug: 'azeem-kouther',
    name: 'A. Azeem Kouther',
    role: 'Founder',
    title: 'Founder · Chief Mechanical Officer',
    image: '/Azeem.jpg',
    initials: 'AK',
    summary:
      'Applies extensive mechanical engineering expertise to design and implement robust hardware for VirtusCo’s robotics systems.',
    expertise: ['Mechanical Engineering', 'Structural Design', 'Manufacturability', 'Material Science'],
    paragraphs: [
      "A. Azeem Kouther serves as the Chief Mechanical Officer at VirtusCo, where he applies his mechanical engineering expertise to design and implement robust hardware solutions for the company's innovative robotics systems.",
      'As an undergraduate of Rajagiri School of Engineering & Technology alongside his co-founders, Azeem developed a deep understanding of mechanical systems and structural design principles. His engineering work focuses on translating theoretical concepts into functional prototypes and production-ready hardware that meets the rigorous demands of industrial applications.',
      "Azeem's contributions to VirtusCo extend beyond pure engineering; his practical understanding of manufacturing constraints and material science informs the company's approach to scalable production. By designing with both performance and manufacturability in mind, he ensures that VirtusCo's solutions can be produced efficiently without compromising on quality or functionality.",
      "Under Azeem's technical leadership, VirtusCo continues to develop its mechanical designs, developing systems that combine durability, precision, and cost-effectiveness. His commitment to engineering excellence ensures that the company's hardware platforms provide the solid foundation necessary for advanced automation solutions across various industries.",
    ],
    quote:
      "Mechanical engineering is where theory meets reality. The most elegant algorithm means nothing if the physical system can't execute it reliably. At VirtusCo, we're creating robotics hardware that doesn't just work in the lab but thrives in the unpredictable environments of the real world.",
    socials: [],
  },
  {
    slug: 'allen-george-thomas',
    name: 'Allen George Thomas',
    role: 'Founder',
    title: 'Founder · Finance & Strategy',
    image: '/Allen.jpg',
    initials: 'AG',
    summary:
      'Leverages exceptional skills in financial strategy, fundraising, and business model development to chart VirtusCo’s growth.',
    expertise: ['Financial Strategy', 'Fundraising', 'Business Models', 'Design Thinking'],
    paragraphs: [
      "Allen George Thomas serves as a key Founder at VirtusCo, where he leads financial strategy, fundraising, and business model development. With a focus on revenue opportunities and sustainable business models, Allen shapes VirtusCo's growth plans.",
      "Allen also works across design thinking, marketing strategy, and sales development, bringing a holistic business perspective to VirtusCo's innovative robotics solutions. He translates technical capabilities into clear value propositions for customers, and leads VirtusCo's conversations with investors.",
      'As an undergraduate at Rajagiri School of Engineering & Technology alongside his co-founders, Allen combines his formal education with practical business acumen. His collaborative approach to problem-solving and passion for creating sustainable business models complement the technical expertise of the founding team, creating a balanced leadership dynamic that drives VirtusCo forward.',
      "Under Allen's financial guidance, VirtusCo is developing funding approaches and business structures that align with the company's core mission of making advanced robotics technology accessible to businesses of all sizes. His vision for inclusive growth continues to shape how VirtusCo approaches market expansion and capital allocation.",
    ],
    quote:
      "Financial strategy isn't just about numbers on a spreadsheet. It's about creating sustainable pathways for innovation to thrive. At VirtusCo, we're building business models that ensure our robotics can reach the markets that need them most, regardless of traditional barriers to entry.",
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/allenthms/' },
      { platform: 'x', url: 'https://x.com/thmsalln' },
      { platform: 'instagram', url: 'https://www.instagram.com/allenthvmas?igsh=Y3ZpZDgydmF2ZnQ=' },
    ],
  },
  {
    slug: 'alwin-george-thomas',
    name: 'Alwin George Thomas',
    role: 'Founder',
    title: 'Founder · Strategy & Operations',
    image: '/Alwin.jpg',
    initials: 'AT',
    summary: 'Brings strategic vision and operational expertise, turning complex technical considerations into coherent business strategy.',
    expertise: ['Strategy', 'Operations', 'Project Planning', 'Leadership'],
    paragraphs: [
      "Alwin George Thomas is a founding member of VirtusCo, bringing strategic vision and operational expertise to the team. His analytical approach to problem-solving and ability to synthesize complex technical considerations into coherent business strategies have been vital to VirtusCo's development.",
      'At Rajagiri School of Engineering & Technology, Alwin collaborated closely with his fellow founders, contributing his unique perspective to the interdisciplinary challenges of robotics innovation. His education and leadership help him to bridge the gap between technical development and practical implementation.',
      "Alwin's methodical approach to project planning and execution is shaping VirtusCo's operational processes. His contributions to the team dynamics and organizational structure have created an environment where innovation can flourish while maintaining focus on the company's core mission of democratizing access to robotics technology.",
      "As VirtusCo continues to expand, Alwin's strategic oversight ensures that the company maintains its core values while adapting to new market opportunities. His collaborative leadership style fosters an environment of continuous improvement and collective problem-solving that is essential to VirtusCo's mission of making advanced robotics accessible to all.",
    ],
    quote:
      "Innovation requires more than just great ideas. It demands careful planning, strategic resource allocation, and unwavering commitment to the vision. At VirtusCo, we're building systems that will fundamentally transform how businesses interact with robotics, creating new possibilities for efficiency and growth across industries.",
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/alwin-george-thomas-776b57293/' },
      { platform: 'x', url: 'https://x.com/alwingts' },
      { platform: 'instagram', url: 'https://www.instagram.com/alwin.gt?igsh=MTMwb2JuMjNyMDFuZQ==' },
    ],
  },
  {
    slug: 'danush-krishna',
    name: 'Danush Krishna',
    role: 'Founder',
    title: 'Founder · Sales Director',
    image: '/Danush.jpg',
    initials: 'DK',
    summary:
      'Combines technical knowledge of robotics with exceptional communication skills to bridge complex technology and practical business needs.',
    expertise: ['Sales & Partnerships', 'Robotics', 'Customer Discovery', 'Market Strategy'],
    paragraphs: [
      'Danush Krishna serves as a Founder and Sales Director at VirtusCo, where he combines his technical knowledge of robotics with strong communication skills to bridge the gap between complex technology and practical business applications.',
      "An undergraduate of Rajagiri School of Engineering & Technology alongside his fellow founders, Danush developed both technical expertise in robotics and a keen understanding of customer needs. This dual perspective helps him find where technological possibility meets real market demand, guiding VirtusCo's product development to address real-world challenges.",
      "Danush builds relationships with stakeholders across industries on VirtusCo's behalf. His customer-centric approach ensures that the company's innovative solutions are always aligned with actual user needs, rather than pursuing technology for its own sake.",
      "As VirtusCo continues to expand its market presence, Danush's insights into customer needs and market trends guide the company's strategic direction. His commitment to ensuring that advanced robotics technology becomes accessible to businesses of all sizes aligns perfectly with VirtusCo's core mission of democratizing automation.",
    ],
    quote:
      "The most advanced robotics solution in the world is worthless if it doesn't solve a real problem for real people. My passion is finding those perfect matches, where our technology can transform operations, reduce costs, or create new opportunities for businesses that might otherwise be left behind in the automation revolution.",
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/danush-krishna-39b341292/' },
      { platform: 'instagram', url: 'https://www.instagram.com/danushkrishna?igsh=eWlqYzVxOWczN2Jz' },
    ],
  },
];

export const teamIntro = {
  eyebrow: 'The team',
  title: 'The Minds Behind VirtusCo',
  homeTitle: 'Meet Our Founding Team',
  lede: 'Our founding team brings together diverse expertise in robotics, design, operations, and business strategy.',
  homeLede:
    'The five founders behind VirtusCo, bringing together expertise in robotics, design, operations, and strategic planning.',
};

export const getFounder = (slug: string) => founders.find((f) => f.slug === slug);
