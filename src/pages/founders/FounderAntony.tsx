
import FounderLayout from '@/components/founders/FounderLayout';

const FounderAntony = () => {
  return (
    <FounderLayout
      name="Antony Austin"
      role="Founder"
      image="/Austin.jpeg"
      paragraphs={[
        "Antony Austin serves as a Founder at VirtusCo, where he channels his expertise in AI/ML, robotics, and full-stack development into creating intelligent, autonomous systems. His versatile technical background spans ROS (Robot Operating System), mobile app development, circuit design, and high-tech leadership, making him a driving force behind VirtusCo's innovative solutions.",
        "With technical mastery developed throughout his life's journey, Antony has cultivated a rare combination of skills spanning hardware architecture, AI implementation, and system integration. This self-driven expertise enables him to orchestrate complex technological ecosystems that solve real-world challenges with unprecedented efficiency.",
        "Antony's strategic vision for democratizing cutting-edge technology drives VirtusCo's mission. His ability to seamlessly bridge multiple technical domains from circuit design to artificial intelligence positions the company at the forefront of innovation in autonomous robotics and intelligent systems.",
        "Under Antony's technical leadership, VirtusCo continues to push the boundaries of what's possible in autonomous robotics, with a focus on creating sustainable solutions that transform the passenger experience in airports worldwide while making advanced technology accessible to businesses of all sizes.",
      ]}
      quote="The future of innovation isn't just about advanced systems or smarter machines. It's about making sure the brightest minds regardless of where they come from have a real shot at shaping that future. At VirtusCo, I'm building more than just technology; I'm building pathways for potential to rise, even when the odds are against it."
      socialLinks={[
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/antony-austin-b7287226a/' },
        { platform: 'x', url: 'https://x.com/AntonyAustin19' },
        { platform: 'instagram', url: 'https://www.instagram.com/antonyavstin?igsh=Z3NpM3NuNjl4dmU0&utm_source=qr' },
      ]}
    />
  );
};

export default FounderAntony;
