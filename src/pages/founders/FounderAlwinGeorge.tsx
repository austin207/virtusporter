
import FounderLayout from '@/components/founders/FounderLayout';

const FounderAlwin = () => {
  return (
    <FounderLayout
      name="Alwin George Thomas"
      role="Founder"
      image="/Alwin.jpg"
      paragraphs={[
        "Alwin George Thomas is a founding member of VirtusCo, bringing strategic vision and operational expertise to the team. His analytical approach to problem-solving and ability to synthesize complex technical considerations into coherent business strategies have been vital to VirtusCo's development.",
        "At Rajagiri School of Engineering & Technology, Alwin collaborated closely with his fellow founders, contributing his unique perspective to the interdisciplinary challenges of robotics innovation. His educational background, combined with natural leadership abilities, enables him to bridge the gap between technical development and practical implementation.",
        "Alwin's methodical approach to project planning and execution has helped establish robust operational frameworks within VirtusCo. His contributions to the team dynamics and organizational structure have created an environment where innovation can flourish while maintaining focus on the company's core mission of democratizing access to robotics technology.",
        "As VirtusCo continues to expand, Alwin's strategic oversight ensures that the company maintains its core values while adapting to new market opportunities. His collaborative leadership style fosters an environment of continuous improvement and collective problem-solving that is essential to VirtusCo's mission of making advanced robotics accessible to all.",
      ]}
      quote="Innovation requires more than just great ideas — it demands careful planning, strategic resource allocation, and unwavering commitment to the vision. At VirtusCo, we're building systems that will fundamentally transform how businesses interact with robotics, creating new possibilities for efficiency and growth across industries."
      socialLinks={[
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/alwin-george-thomas-776b57293/' },
        { platform: 'x', url: 'https://x.com/alwingts' },
        { platform: 'instagram', url: 'https://www.instagram.com/alwin.gt?igsh=MTMwb2JuMjNyMDFuZQ==' },
      ]}
    />
  );
};

export default FounderAlwin;
