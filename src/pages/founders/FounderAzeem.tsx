
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAzeem = () => {
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
              <div className="text-3xl font-bold text-virtus-primary">AK</div>
            </div>
            <h1 className="heading-lg text-gray-900 mb-2">A.Azeem Kouther</h1>
            <p className="text-xl text-virtus-primary font-medium mb-6">Founder</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              A.Azeem Kouther serves as the Chief Operations Officer and Co-Founder of VirtusCo, where he brings extensive expertise in logistics, supply chain management, and business operations. Azeem's strategic vision and operational excellence have been instrumental in scaling VirtusCo's solutions across different industries.
            </p>
            
            <h2>Operational Excellence</h2>
            <p>
              With a background in industrial engineering and business management, Azeem has developed a reputation for his ability to optimize complex operational processes. Before co-founding VirtusCo, he held leadership positions at several global companies, where he led initiatives to improve operational efficiency and supply chain resilience.
            </p>
            
            <h2>Implementation Strategy</h2>
            <p>
              At VirtusCo, Azeem has developed a unique implementation methodology that ensures smooth integration of robotics solutions into clients' existing operations. This approach combines technical deployment with change management practices, minimizing disruption while maximizing the value delivered by the company's technology.
            </p>
            <p>
              His deep understanding of various industry verticals has enabled VirtusCo to tailor its offerings to meet the specific requirements of different sectors, from manufacturing and logistics to retail and healthcare.
            </p>
            
            <h2>Customer Success Focus</h2>
            <p>
              Azeem is known for his unwavering commitment to customer success. He has established robust customer support frameworks at VirtusCo, ensuring that clients receive the assistance they need throughout their journey with the company's solutions.
            </p>
            <p>
              This customer-centric approach has contributed significantly to VirtusCo's high retention rates and strong reputation for service excellence.
            </p>
            
            <h2>Global Vision</h2>
            <p>
              Looking forward, Azeem is focused on expanding VirtusCo's global footprint and scaling its operations to serve a more diverse range of clients. He believes that the company's mission of democratizing robotics has universal relevance, and he is committed to making VirtusCo's solutions accessible to organizations around the world.
            </p>
            <p>
              Through strategic partnerships and targeted expansion initiatives, Azeem aims to establish VirtusCo as a global leader in accessible and effective robotics solutions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FounderAzeem;
