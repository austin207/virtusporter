
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderDanush = () => {
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
              alt="Danush Krishna" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Danush Krishna</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder & Sales Director</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                Danush Krishna serves as a Founder and Sales Director at VirtusCo, where he combines his technical knowledge of robotics with exceptional communication skills to bridge the gap between complex technology and practical business applications. His ability to translate technical capabilities into tangible business benefits has been crucial in VirtusCo's market penetration strategy.
              </p>
              
              <p>
                A graduate of Rajagiri School of Engineering & Technology alongside his fellow founders, Danush developed both technical expertise in robotics and a keen understanding of customer needs. This dual perspective allows him to identify the perfect intersection between technological possibility and market demand, guiding VirtusCo's product development to address real-world challenges.
              </p>
              
              <p>
                Danush's talent for building relationships with stakeholders across industries has opened doors for VirtusCo in competitive markets. His customer-centric approach ensures that the company's innovative solutions are always aligned with actual user needs, rather than pursuing technology for its own sake.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                "The most advanced robotics solution in the world is worthless if it doesn't solve a real problem for real people. My passion is finding those perfect matches—where our technology can transform operations, reduce costs, or create new opportunities for businesses that might otherwise be left behind in the automation revolution."
              </blockquote>
              
              <p>
                As VirtusCo continues to expand its market presence, Danush's insights into customer needs and market trends guide the company's strategic direction. His commitment to ensuring that advanced robotics technology becomes accessible to businesses of all sizes aligns perfectly with VirtusCo's core mission of democratizing automation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDanush;
