
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
                A. Azeem Kouther serves as the Chief Mechanical Officer at VirtusCo, where he channels over four years of hands-on experience in robotics and AI into building intelligent, autonomous systems. His deep passion for innovation and equitable access has shaped the development of VirtusCo’s advanced baggage handling robots designed not just for efficiency, but to embody the company's mission of making cutting-edge technology accessible to all.
              </p>
              
              <p>
                Before joining VirtusCo, Antony led AI & Robotics research teams at prestigious institution Rajagiri School of Engineering & Technology, focusing on machine learning applications in robotics. His groundbreaking work in computer vision systems for autonomous navigation has earned him institutional recognition in the field.
              </p>
              
              <p>
                Antony Austin is an undergraduate in Applied Electronics & Instrumentation at Rajagiri, with a strong track record in machine learning and autonomous systems, developed through hands-on projects at leading academic institutions. His deep commitment to bridging the gap for underrepresented talent drives VirtusCo’s mission empowering skilled individuals who lack resources by building systems that create real opportunities for growth and innovation.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                The future of innovation isn’t just about advanced systems or smarter machines. It’s about making sure the brightest minds regardless of where they come from have a real shot at shaping that future. At VirtusCo, I’m building more than just technology; I’m building pathways for potential to rise, even when the odds are against it.
              </blockquote>

              
              <p>
                Under Antony's technical leadership, VirtusCo continues to push the boundaries of what's possible in autonomous robotics, with a focus on creating sustainable solutions that transform the passenger experience in airports worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderAzeem;
