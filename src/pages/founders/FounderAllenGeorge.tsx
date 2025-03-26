
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAllenGeorge = () => {
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
            <h1 className="heading-lg text-gray-900 mb-2">Allen George Thomas</h1>
            <p className="text-xl text-virtus-primary font-medium mb-6">CDO & Co-Founder</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Allen George Thomas is the creative force behind VirtusCo's product design and user experience. As the Chief Design Officer and Co-Founder, Allen combines aesthetic sensibility with functional design to create robotics solutions that are not only technically advanced but also intuitive and accessible.
            </p>
            
            <h2>Design Philosophy</h2>
            <p>
              With a background in industrial design and human-computer interaction, Allen approaches robotics design with a human-centered perspective. He believes that even the most advanced technology should be approachable and easy to use, particularly in professional environments where efficiency and reliability are paramount.
            </p>
            
            <h2>User Experience Innovation</h2>
            <p>
              At VirtusCo, Allen has pioneered innovative approaches to user interface design for robotics systems. His work has focused on simplifying complex controls and creating intuitive interaction models that reduce the learning curve for users at all technical levels.
            </p>
            <p>
              This focus on accessibility has been a key differentiator for VirtusCo in the marketplace, enabling the company to reach customers who might otherwise find robotics technology intimidating or overly complex.
            </p>
            
            <h2>Product Design Achievements</h2>
            <p>
              Allen has led the design of VirtusCo's flagship products, bringing together form and function in solutions that are both aesthetically pleasing and highly practical. His designs have been recognized for their elegance and usability, winning several industry awards for innovation.
            </p>
            <p>
              Beyond aesthetics, Allen's designs prioritize manufacturability and serviceability, ensuring that VirtusCo's products can be produced efficiently and maintained easily throughout their lifecycle.
            </p>
            
            <h2>Future Design Direction</h2>
            <p>
              Looking ahead, Allen is exploring new frontiers in robotics design, including adaptive interfaces that learn from user behavior and more natural interaction modalities such as voice and gesture control.
            </p>
            <p>
              He is particularly interested in the intersection of physical and digital design, creating cohesive experiences that bridge the gap between hardware, software, and services. Through continued innovation in this space, Allen aims to further enhance the accessibility and usability of VirtusCo's solutions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FounderAllenGeorge;
