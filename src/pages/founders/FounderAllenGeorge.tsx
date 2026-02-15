
import FounderLayout from '@/components/founders/FounderLayout';

const FounderAllen = () => {
  return (
    <FounderLayout
      name="Allen George Thomas"
      role="Founder"
      image="/Allen.jpg"
      paragraphs={[
        "Allen George Thomas serves as a key Founder at VirtusCo, where he leverages his exceptional skills in financial strategy, fundraising, and business model development. With a natural talent for identifying revenue opportunities and creating sustainable business models, Allen has been instrumental in charting VirtusCo's growth trajectory.",
        "Allen excels in design thinking, marketing strategy, and sales development, bringing a holistic business perspective to VirtusCo's innovative robotics solutions. His ability to translate technical capabilities into compelling value propositions has been crucial in positioning the company's offerings in the competitive market. Allen's talent for cultivating investor relationships has been fundamental to securing the capital necessary for VirtusCo's ambitious projects.",
        "As an undergraduate at Rajagiri School of Engineering & Technology alongside his co-founders, Allen combines his formal education with practical business acumen. His collaborative approach to problem-solving and passion for creating sustainable business models complement the technical expertise of the founding team, creating a balanced leadership dynamic that drives VirtusCo forward.",
        "Under Allen's financial guidance, VirtusCo has developed innovative funding mechanisms and business structures that align with the company's core mission of making advanced robotics technology accessible to businesses of all sizes. His vision for inclusive growth continues to shape how VirtusCo approaches market expansion and capital allocation.",
      ]}
      quote="Financial strategy isn't just about numbers on a spreadsheet — it's about creating sustainable pathways for innovation to thrive. At VirtusCo, we're building business models that ensure our cutting-edge robotics can reach the markets that need them most, regardless of traditional barriers to entry."
      socialLinks={[
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/allenthms/' },
        { platform: 'x', url: 'https://x.com/thmsalln' },
        { platform: 'instagram', url: 'https://www.instagram.com/allenthvmas?igsh=Y3ZpZDgydmF2ZnQ=' },
      ]}
    />
  );
};

export default FounderAllen;
