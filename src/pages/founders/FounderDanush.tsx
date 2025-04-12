
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { XIcon } from "@/components/icons/x-icon"

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
              src="/Danush.jpg" 
              alt="Danush Krishna" 
              className="rounded-xl shadow-lg w-full object-cover mb-4"
            />
            <div className="flex space-x-4">
              <a 
                 href="https://www.linkedin.com/in/danush-krishna-39b341292/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                className="text-gray-600 hover:text-virtus-primary transition-colors"
                >
                <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
              </a>

              <a href="https://x.com" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <XIcon className="h-6 w-6" />
                <span className="sr-only">X (formerly Twitter)</span>
              </a>

              <a href="https://www.instagram.com/danushkrishna?igsh=eWlqYzVxOWczN2Jz" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Danush Krishna</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                Danush Krishna serves as a Founder and Sales Director at VirtusCo, where he combines his technical knowledge of robotics with exceptional communication skills to bridge the gap between complex technology and practical business applications. His ability to translate technical capabilities into tangible business benefits has been crucial in VirtusCo's market penetration strategy.
              </p>
              
              <p>
                An undergraduate of Rajagiri School of Engineering & Technology alongside his fellow founders, Danush developed both technical expertise in robotics and a keen understanding of customer needs. This dual perspective allows him to identify the perfect intersection between technological possibility and market demand, guiding VirtusCo's product development to address real-world challenges.
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
