
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAlwinGeorge = () => {
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
              <div className="text-3xl font-bold text-virtus-primary">AGT</div>
            </div>
            <h1 className="heading-lg text-gray-900 mb-2">Alwin George Thomas</h1>
            <p className="text-xl text-virtus-primary font-medium mb-6">Founder</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Alwin George Thomas is the technical mastermind behind VirtusCo's innovative robotics solutions. As the Chief Technology Officer and Co-Founder, Alwin combines deep technical expertise with a practical understanding of business needs to drive the company's product development efforts.
            </p>
            
            <h2>Technical Background</h2>
            <p>
              With advanced degrees in robotics and computer engineering, Alwin has established himself as an authority in hardware-software integration for autonomous systems. His technical expertise spans multiple domains, including sensor fusion, machine learning, and embedded systems design.
            </p>
            
            <h2>Innovation Leadership</h2>
            <p>
              At VirtusCo, Alwin leads a talented team of engineers and developers, fostering a culture of innovation and technical excellence. Under his guidance, the company has developed proprietary technologies that have significantly improved the performance, reliability, and cost-effectiveness of robotics solutions.
            </p>
            <p>
              His approach to technology development is characterized by a commitment to elegant, efficient solutions that solve real-world problems. Rather than pursuing complexity for its own sake, Alwin focuses on creating systems that are both technically sophisticated and practical to implement.
            </p>
            
            <h2>Industry Contributions</h2>
            <p>
              Beyond his work at VirtusCo, Alwin is recognized as a thought leader in the robotics industry. He has contributed to several open-source projects and has published research on topics such as sensor fusion, real-time control systems, and robot operating systems (ROS).
            </p>
            
            <h2>Vision for the Future</h2>
            <p>
              Alwin is passionate about the potential of robotics to transform businesses and improve lives. He believes that the next generation of robotics systems will be characterized by greater autonomy, adaptability, and ease of integration with existing infrastructure.
            </p>
            <p>
              Looking ahead, his technical roadmap for VirtusCo focuses on advancing these capabilities while maintaining the company's commitment to accessibility and user-friendly design. Through continued innovation and technical excellence, Alwin aims to ensure that VirtusCo remains at the cutting edge of the robotics industry.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FounderAlwinGeorge;
