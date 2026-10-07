// Services-first content. Copy is carried over verbatim from the old /service page;
// lines marked DRAFT are improvised for the services-first repositioning and need review.

export interface Service {
  id: string;
  tag: string; // mono tag shown on capability cards
  title: string;
  description: string;
  features: string[];
  pixel: 'ros' | 'custom' | 'integration' | 'ai';
}

export const services: Service[] = [
  {
    id: 'ros-development',
    tag: 'Software',
    title: 'ROS Development',
    description:
      'ROS packages, navigation stacks and sensor drivers built for your hardware and use case, delivered as documented code your team owns.',
    features: [
      'ROS package development',
      'Navigation stack customization',
      'Sensor integration',
      'Custom algorithms',
      'Performance optimization',
    ],
    pixel: 'ros',
  },
  {
    id: 'custom-robotics-solutions',
    tag: 'End-to-end',
    title: 'Custom Robotics Solutions',
    description: 'A robot designed for your task: requirements, hardware selection, mechanical and electronics design, then a tested system ready to deploy.',
    features: [
      'Requirements analysis',
      'Hardware selection',
      'Mechanical design',
      'Electronics integration',
      'Testing and validation',
    ],
    pixel: 'custom',
  },
  {
    id: 'system-integration',
    tag: 'Integration',
    title: 'System Integration',
    description: 'Your robots connected to the systems you already run: APIs, legacy software, cloud services, databases and user management.',
    features: [
      'API development',
      'Legacy system integration',
      'Cloud connectivity',
      'Database integration',
      'User management systems',
    ],
    pixel: 'integration',
  },
  {
    id: 'ai-machine-learning',
    tag: 'Intelligence',
    title: 'AI & Machine Learning',
    description: 'Perception and decision-making for your robots, from computer vision to predictive maintenance and learning-based control.',
    features: [
      'Computer vision systems',
      'Predictive maintenance',
      'Behavioral modeling',
      'Reinforcement learning',
      'Neural network design',
    ],
    pixel: 'ai',
  },
];

export const servicesIntro = {
  eyebrow: 'Our Services',
  title: ['Robotics systems,', 'engineered to fit.'] as [string, string], // DRAFT two-tone title
  lede: 'From a single ROS package to a complete robot: choose the scope you need, and we engineer it.',
};

export interface ApproachStep {
  n: string;
  title: string;
  short: string; // single word used in hero chapters
  description: string;
}

export const approachIntro = {
  eyebrow: 'Our Approach',
  lede: 'We adapt our process to your specific needs and budget constraints, ensuring maximum value for your investment.',
};

export const approach: ApproachStep[] = [
  {
    n: '01',
    title: 'Consultation',
    short: 'Consult.',
    description:
      'We assess your unique challenges and operational environment to determine how robotics can best serve your business needs.',
  },
  {
    n: '02',
    title: 'Budget Alignment',
    short: 'Align.',
    description:
      'We work within your funding constraints, adjusting scope and approach to maximize value while meeting your core requirements.',
  },
  {
    n: '03',
    title: 'Development',
    short: 'Build.',
    description:
      'We design and build your solution in reviewed milestones, so you see working results throughout the process.',
  },
  {
    n: '04',
    title: 'Deployment',
    short: 'Deploy.',
    description:
      'We integrate the solution with your existing systems and train your team to run it.',
  },
  {
    n: '05',
    title: 'Ongoing Support',
    short: 'Support.',
    description:
      'We offer continued maintenance, updates, and optimization to ensure your solution evolves with your business.',
  },
];

export const budget = {
  eyebrow: 'Tailored to Your Budget',
  title: ['Every budget,', 'engineered for maximum value.'] as [string, string], // DRAFT
  lede: 'Your budget sets the scope, not the other way round: we start from the problem and choose the smallest build that solves it.',
  flexible: {
    title: 'Flexible Scope',
    body: 'Whether you need a targeted ROS development project or a complete robotics solution, we tailor our services to match your requirements and budget constraints.',
    points: ['Feature prioritization', 'Phased implementation', 'Technology selection'],
  },
  tiersTitle: 'Budget-Based Approaches',
  tiers: [
    {
      title: 'Focused Solution',
      fit: 'For smaller budgets',
      body: 'Targeted ROS development for specific functionality, with potential for future expansion.',
    },
    {
      title: 'Balanced Approach',
      fit: 'For medium budgets',
      body: 'A core robotics system with the essential features, customised where your use case needs it.',
    },
    {
      title: 'Comprehensive System',
      fit: 'For larger budgets',
      body: 'Complete end-to-end solution with advanced features, integrations, and ongoing support.',
    },
  ],
  closing:
    "Every project is unique, and we'll work with you to find the right balance between your requirements, timeline, and budget. Our goal is to deliver maximum value regardless of project size.",
};

export const serviceHero = {
  eyebrow: 'Robotics engineering services',
  title: 'Custom Robotics Solutions for Your Business',
  lede: 'VirtusCo specializes in creating tailored robotics solutions that address your unique business challenges. From ROS development to complete robotics systems, we adapt our approach to your needs and budget.',
};

export const serviceCta = {
  title: 'Ready to discuss your project?',
  body: 'Contact us for a free consultation to explore how our robotics solutions can address your business challenges.',
};

// Home hero (DRAFT), improvised from "Custom Robotics Solutions for Your Business" + "Democratizing Robotics".
export const homeHero = {
  title: 'Robotics, engineered for the businesses that need it most.',
  lede: 'VirtusCo designs and builds custom robots, from ROS software to mechanical and electronics hardware, scoped to your problem and your budget. Democratizing robotics, from Kerala to the world.',
  cta: 'Start with a consultation',
};

export const homeChapters = [
  {
    eyebrow: 'The problem',
    title: 'Robotics has been built for the few.',
    body: [
      'Automation transforms operations, but bespoke robotics has stayed out of reach for most businesses: too expensive, too rigid, too far from the problem it was meant to solve.',
    ],
  },
] as const; // DRAFT
