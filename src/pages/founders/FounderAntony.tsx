
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAntony = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/about" className="inline-flex items-center text-virtus-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About
          </Link>
          
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto bg-virtus-primary/10 rounded-full flex items-center justify-center mb-6">
              <div className="text-3xl font-bold text-virtus-primary">AA</div>
            </div>
            <h1 className="heading-lg text-gray-900 mb-2">Antony Austin</h1>
            <p className="text-xl text-virtus-primary font-medium mb-6">Founder</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Antony Austin is a visionary leader in the field of robotics, with a deep passion for autonomous systems and artificial intelligence. As the CEO and Co-Founder of VirtusCo, Antony brings extensive experience in developing and deploying robotics solutions that address real-world challenges.
            </p>
            
            <h2>Background & Expertise</h2>
            <p>
              With a background in engineering and computer science, Antony has spent over a decade working on cutting-edge robotics projects. Prior to founding VirtusCo, he led research and development teams at leading technology companies, where he focused on creating autonomous systems for various applications.
            </p>
            
            <h2>Vision for VirtusCo</h2>
            <p>
              Antony's vision for VirtusCo stems from his belief that robotics technology should be accessible to businesses of all sizes. He recognized that many organizations face significant challenges in implementing automation solutions due to high costs and technical complexity.
            </p>
            <p>
              Under his leadership, VirtusCo has developed a range of innovative robotics solutions that are not only technologically advanced but also cost-effective and user-friendly. This approach has allowed the company to democratize access to robotics technology and help businesses across various industries improve their operations.
            </p>
            
            <h2>Innovation Philosophy</h2>
            <p>
              Antony is known for his pragmatic approach to innovation. Rather than pursuing technology for its own sake, he focuses on developing solutions that address specific customer needs and deliver measurable value. This customer-centric philosophy has been instrumental in VirtusCo's success and has helped the company build strong relationships with clients across different sectors.
            </p>
            
            <h2>Future Outlook</h2>
            <p>
              Looking ahead, Antony envisions a future where robotics technology plays an increasingly important role in enhancing productivity, safety, and quality of life. He is committed to ensuring that VirtusCo remains at the forefront of this transformation, continuing to develop innovative solutions that make automation accessible to all.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FounderAntony;
