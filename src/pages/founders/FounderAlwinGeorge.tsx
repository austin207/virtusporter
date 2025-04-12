
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAlwin = () => {
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
              src="/Alwin.jpg" 
              alt="Alwin George Thomas" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Alwin George Thomas</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                Alwin George Thomas is a founding member of VirtusCo, bringing strategic vision and operational expertise to the team. His analytical approach to problem-solving and ability to synthesize complex technical considerations into coherent business strategies have been vital to VirtusCo's development from concept to market-ready solutions.
              </p>
              
              <p>
                At Rajagiri School of Engineering & Technology, Alwin collaborated closely with his fellow founders, contributing his unique perspective to the interdisciplinary challenges of robotics innovation. His educational background, combined with natural leadership abilities, enables him to bridge the gap between technical development and practical implementation.
              </p>
              
              <p>
                Alwin's methodical approach to project planning and execution has helped establish robust operational frameworks within VirtusCo. His contributions to the team dynamics and organizational structure have created an environment where innovation can flourish while maintaining focus on the company's core mission of democratizing access to robotics technology.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                "Innovation requires more than just great ideas—it demands careful planning, strategic resource allocation, and unwavering commitment to the vision. At VirtusCo, we're building systems that will fundamentally transform how businesses interact with robotics, creating new possibilities for efficiency and growth across industries."
              </blockquote>
              
              <p>
                As VirtusCo continues to expand, Alwin's strategic oversight ensures that the company maintains its core values while adapting to new market opportunities. His collaborative leadership style fosters an environment of continuous improvement and collective problem-solving that is essential to VirtusCo's mission of making advanced robotics accessible to all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderAlwin;
