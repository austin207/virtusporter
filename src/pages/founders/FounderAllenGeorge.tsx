
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderAllen = () => {
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
              alt="Allen George Thomas" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Allen George Thomas</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                Allen George Thomas serves as a key Founder at VirtusCo, where he leverages his exceptional skills in financial strategy, fundraising, and business model development. With a natural talent for identifying revenue opportunities and creating sustainable business models, Allen has been instrumental in charting VirtusCo's growth trajectory and establishing its financial foundation.
              </p>
              
              <p>
                Allen excels in design thinking, marketing strategy, and sales development, bringing a holistic business perspective to VirtusCo's innovative robotics solutions. His ability to translate technical capabilities into compelling value propositions has been crucial in positioning the company's offerings in the competitive market. Allen's talent for cultivating investor relationships has been fundamental to securing the capital necessary for VirtusCo's ambitious projects.
              </p>
              
              <p>
                As an undergraduate at Rajagiri School of Engineering & Technology alongside his co-founders, Allen combines his formal education with practical business acumen. His collaborative approach to problem-solving and passion for creating sustainable business models complement the technical expertise of the founding team, creating a balanced leadership dynamic that drives VirtusCo forward.
              </p>
              
              <blockquote className="text-lg italic border-l-4 border-gray-400 pl-4 text-gray-700 my-6">
                "Financial strategy isn't just about numbers on a spreadsheet—it's about creating sustainable pathways for innovation to thrive. At VirtusCo, we're building business models that ensure our cutting-edge robotics can reach the markets that need them most, regardless of traditional barriers to entry."
              </blockquote>
              
              <p>
                Under Allen's financial guidance, VirtusCo has developed innovative funding mechanisms and business structures that align with the company's core mission of making advanced robotics technology accessible to businesses of all sizes. His vision for inclusive growth continues to shape how VirtusCo approaches market expansion and capital allocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderAllen;
