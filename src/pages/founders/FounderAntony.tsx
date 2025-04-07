
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
              src="/lovable-uploads/49c37b34-f743-40f7-b8d8-e19e1a02eece.png" 
              alt="Antony Austin" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Antony Austin</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Chief Technology Officer</p>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Antony Austin serves as the Chief Technology Officer at VirtusCo, bringing more than 15 years of experience in robotics engineering and AI development. His expertise has been instrumental in developing the autonomous systems that power VirtusCo's innovative baggage handling robots.
              </p>
              
              <p>
                Before joining VirtusCo, Antony led AI research teams at prestigious institutions including MIT and Stanford, focusing on machine learning applications in robotics. His groundbreaking work in computer vision systems for autonomous navigation has earned him international recognition in the field.
              </p>
              
              <p>
                Antony holds a Ph.D. in Robotics Engineering from MIT and has published numerous papers on machine learning and autonomous systems in leading academic journals. His vision for creating robots that enhance human capabilities rather than replace them has shaped VirtusCo's development philosophy.
              </p>
              
              <blockquote>
                "The future of travel isn't just about getting from point A to point B faster. It's about creating seamless experiences that give people back their time and reduce stress. Our technology aims to make the journey as enjoyable as the destination."
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

export default FounderAntony;
