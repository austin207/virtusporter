// The autonomous porter robot: a product in development. Copy is written in the planned/design
// tense on purpose (it is quoted verbatim in JSON-LD and llms.txt), so nothing reads as shipped.

export interface PorterFeature {
  title: string;
  description: string;
  part?: string; // label used by the exploded-view scene
}

export const porter = {
  status: 'Proposed product · In development',
  name: 'Autonomous Porter',
  title: 'Meet the Autonomous Porter Robot',
  lede: 'Our autonomous porter robot, now in development, combines robotics engineering with thoughtful design to transform the airport experience.',
  heroTeaser: {
    title: 'The Future of Baggage Handling',
    body: 'An autonomous porter robot designed to carry your luggage, so moving through an airport takes less effort.',
  },
  image: '/Porter.jpg',
  imageAlt: 'Concept render of the VirtusCo autonomous porter robot: a glass luggage cabinet on a mobile base with a touchscreen column',
  sectionsIntro: {
    title: 'Designed for Excellence',
    altTitle: 'Designed for Exceptional Experience',
    lede: 'The porter robot is being designed to combine robust engineering with thoughtful design, so the airport experience gets easier for travellers and staff.',
  },
  cta: {
    title: 'Follow the porter robot as it develops',
    body: 'Register your interest to hear about prototype progress and early pilot conversations.',
    note: 'The porter robot is in development, so specifications may change before launch.',
  },
  contactPitch: {
    title: 'Bring the porter robot to your airport',
    body: 'Talk to us about how an autonomous porter robot could improve the passenger experience and open new revenue streams for your airport.',
  },
};

export const porterFeatures: PorterFeature[] = [
  {
    title: 'High Payload Capacity',
    part: 'Chassis',
    description:
      'A robust chassis designed to carry heavy luggage, supporting multiple bags while staying stable and manoeuvrable throughout the airport.',
  },
  {
    title: 'Autonomous Navigation',
    part: 'Sensor mast',
    description:
      'Sensors and AI algorithms designed to navigate complex airport layouts autonomously, following the traveller in real time while avoiding obstacles and crowds.',
  },
  {
    title: 'Adjustable Lifting Mechanism',
    part: 'Lift',
    description:
      'A smart lifting system designed to adjust to different luggage sizes and weights, moving bags between the ground, the robot platform and check-in counters without physical strain.',
  },
  {
    title: 'Interactive Display',
    part: 'Display',
    description:
      'A touchscreen planned to show check-in, boarding gate, flight status and airport map information, turning the porter into a travel assistant.',
  },
];

export const porterTech: PorterFeature[] = [
  {
    title: 'Advanced AI Processing',
    description:
      'Planned onboard neural network processing for environmental analysis and real-time decisions, without relying on cloud connectivity.',
  },
  {
    title: 'Multi-sensor Fusion',
    description:
      'Designed to combine LiDAR, cameras, ultrasonic sensors and radar into an accurate 3D map of its surroundings for precise navigation.',
  },
  {
    title: 'Modular Hardware Architecture',
    description:
      "Field-replaceable components are part of the design, to make maintenance and upgrades fast and extend the robot's operational life.",
  },
  {
    title: 'Security by Design',
    description:
      'Security is a design requirement: encrypted communication, secure boot and regular updates are planned to protect passenger data and prevent unauthorised access.',
  },
];

export const porterSustainability: PorterFeature[] = [
  {
    title: 'Energy-Efficient Design',
    description:
      'Efficient motors and power management are design goals, to maximise operating time between charges and minimise energy use.',
  },
  {
    title: 'Renewable Charging',
    description:
      'We are exploring solar-powered docking stations and energy recovery to reduce dependence on grid electricity.',
  },
  {
    title: 'Circular Economy Model',
    description:
      'Modular components are intended for repair, refurbishment and recycling, extending the product lifecycle and reducing waste.',
  },
  {
    title: 'Eco-friendly Materials',
    description:
      'We aim to use recycled aluminium, bio-based plastics and responsibly sourced materials wherever they meet our engineering requirements.',
  },
];

export const porterGroups = [
  { id: 'features', label: 'Features', items: porterFeatures },
  { id: 'technology', label: 'Technology', items: porterTech },
  { id: 'sustainability', label: 'Sustainability', items: porterSustainability },
] as const;
