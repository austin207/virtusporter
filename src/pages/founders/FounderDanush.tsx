
import FounderLayout from '@/components/founders/FounderLayout';

const FounderDanush = () => {
  return (
    <FounderLayout
      name="Danush Krishna"
      role="Founder"
      image="/Danush.jpg"
      paragraphs={[
        "Danush Krishna serves as a Founder and Sales Director at VirtusCo, where he combines his technical knowledge of robotics with exceptional communication skills to bridge the gap between complex technology and practical business applications.",
        "An undergraduate of Rajagiri School of Engineering & Technology alongside his fellow founders, Danush developed both technical expertise in robotics and a keen understanding of customer needs. This dual perspective allows him to identify the perfect intersection between technological possibility and market demand, guiding VirtusCo's product development to address real-world challenges.",
        "Danush's talent for building relationships with stakeholders across industries has opened doors for VirtusCo in competitive markets. His customer-centric approach ensures that the company's innovative solutions are always aligned with actual user needs, rather than pursuing technology for its own sake.",
        "As VirtusCo continues to expand its market presence, Danush's insights into customer needs and market trends guide the company's strategic direction. His commitment to ensuring that advanced robotics technology becomes accessible to businesses of all sizes aligns perfectly with VirtusCo's core mission of democratizing automation.",
      ]}
      quote="The most advanced robotics solution in the world is worthless if it doesn't solve a real problem for real people. My passion is finding those perfect matches — where our technology can transform operations, reduce costs, or create new opportunities for businesses that might otherwise be left behind in the automation revolution."
      socialLinks={[
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/danush-krishna-39b341292/' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'instagram', url: 'https://www.instagram.com/danushkrishna?igsh=eWlqYzVxOWczN2Jz' },
      ]}
    />
  );
};

export default FounderDanush;
