
import FounderLayout from '@/components/founders/FounderLayout';

const FounderAzeem = () => {
  return (
    <FounderLayout
      name="A. Azeem Kouther"
      role="Founder"
      image="/Azeem.jpg"
      paragraphs={[
        "A. Azeem Kouther serves as the Chief Mechanical Officer at VirtusCo, where he applies his extensive expertise in mechanical engineering to design and implement robust hardware solutions for the company's innovative robotics systems.",
        "As an undergraduate of Rajagiri School of Engineering & Technology alongside his co-founders, Azeem developed a deep understanding of mechanical systems and structural design principles. His engineering insights have been instrumental in translating theoretical concepts into functional prototypes and production-ready hardware that meets the rigorous demands of industrial applications.",
        "Azeem's contributions to VirtusCo extend beyond pure engineering; his practical understanding of manufacturing constraints and material science informs the company's approach to scalable production. By designing with both performance and manufacturability in mind, he ensures that VirtusCo's solutions can be produced efficiently without compromising on quality or functionality.",
        "Under Azeem's technical leadership, VirtusCo continues to push the boundaries of mechanical design in robotics, developing systems that combine durability, precision, and cost-effectiveness. His commitment to engineering excellence ensures that the company's hardware platforms provide the solid foundation necessary for advanced automation solutions across various industries.",
      ]}
      quote="Mechanical engineering is where theory meets reality. The most elegant algorithm means nothing if the physical system can't execute it reliably. At VirtusCo, we're creating robotics hardware that doesn't just work in the lab but thrives in the unpredictable environments of the real world."
      socialLinks={[
        { platform: 'linkedin', url: 'https://www.linkedin.com' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'instagram', url: 'https://www.instagram.com' },
      ]}
    />
  );
};

export default FounderAzeem;
