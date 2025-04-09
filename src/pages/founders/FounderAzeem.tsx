
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAzeem = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/about" className="inline-flex items-center text-virtus-primary hover:text-virtus-primary-dark mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to About
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3">
            <img 
              src="/placeholder.svg" 
              alt="A. Azeem Kouther" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">A. Azeem Kouther</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Chief Mechanical Officer & Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                A. Azeem Kouther serves as the Chief Mechanical Officer at VirtusCo, where he applies his extensive expertise in mechanical engineering to design and implement robust hardware solutions for the company's innovative robotics systems. His meticulous approach to mechanical design ensures that VirtusCo's robots deliver reliable performance in real-world conditions.
              </p>
              
              <p>
                As a graduate of Rajagiri School of Engineering & Technology alongside his co-founders, Azeem developed a deep understanding of mechanical systems and structural design principles. His engineering insights have been instrumental in translating theoretical concepts into functional prototypes and production-ready hardware that meets the rigorous demands of industrial applications.
              </p>
              
              <p>
                Azeem's contributions to VirtusCo extend beyond pure engineering; his practical understanding of manufacturing constraints and material science informs the company's approach to scalable production. By designing with both performance and manufacturability in mind, he ensures that VirtusCo's solutions can be produced efficiently without compromising on quality or functionality.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                "Mechanical engineering is where theory meets reality. The most elegant algorithm means nothing if the physical system can't execute it reliably. At VirtusCo, we're creating robotics hardware that doesn't just work in the lab but thrives in the unpredictable environments of the real world."
              </blockquote>
              
              <p>
                Under Azeem's technical leadership, VirtusCo continues to push the boundaries of mechanical design in robotics, developing systems that combine durability, precision, and cost-effectiveness. His commitment to engineering excellence ensures that the company's hardware platforms provide the solid foundation necessary for advanced automation solutions across various industries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderAzeem;
