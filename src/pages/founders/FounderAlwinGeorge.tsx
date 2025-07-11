
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { XIcon } from "@/components/icons/x-icon"
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
              className="rounded-xl shadow-lg w-full object-cover mb-4"
            />
            <div className="flex space-x-4">
              <a 
                 href="https://www.linkedin.com/in/alwin-george-thomas-776b57293/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                className="text-gray-600 hover:text-virtus-primary transition-colors"
                >
                <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
              </a>

              <a href="https://x.com/alwingts" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <XIcon className="h-6 w-6" />
                <span className="sr-only">X (formerly Twitter)</span>
              </a>

              <a href="https://www.instagram.com/alwin.gt?igsh=MTMwb2JuMjNyMDFuZQ==" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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
