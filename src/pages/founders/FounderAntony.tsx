
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAntony = () => {
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
              alt="Antony Austin" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Antony Austin</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                Antony Austin serves as a Founder at VirtusCo, where he channels his expertise in AI/ML, robotics, and full-stack development into creating intelligent, autonomous systems. His versatile technical background spans ROS (Robot Operating System), mobile app development, circuit design, and high-tech leadership, making him a driving force behind VirtusCo's innovative solutions.
              </p>
              
              <p>
                With technical mastery developed throughout his life's journey, Antony has cultivated a rare combination of skills spanning hardware architecture, AI implementation, and system integration. This self-driven expertise enables him to orchestrate complex technological ecosystems that solve real-world challenges with unprecedented efficiency.
              </p>
              
              <p>
                Antony's strategic vision for democratizing cutting-edge technology drives VirtusCo's mission. His ability to seamlessly bridge multiple technical domains—from circuit design to artificial intelligence—positions the company at the forefront of innovation in autonomous robotics and intelligent systems.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                The future of innovation isn't just about advanced systems or smarter machines. It's about making sure the brightest minds regardless of where they come from have a real shot at shaping that future. At VirtusCo, I'm building more than just technology; I'm building pathways for potential to rise, even when the odds are against it.
              </blockquote>

              <p>
                Under Antony's technical leadership, VirtusCo continues to push the boundaries of what's possible in autonomous robotics, with a focus on creating sustainable solutions that transform the passenger experience in airports worldwide while making advanced technology accessible to businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderAntony;
