
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { XIcon } from "@/components/icons/x-icon"

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
              src="/Azeem.jpg" 
              alt="A. Azeem Kouther" 
              className="rounded-xl shadow-lg w-full object-cover mb-4"
            />
            <div className="flex space-x-4">
              <a 
                 href="https://www.linkedin.com" 
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

              <a href="https://www.instagram.com" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">A. Azeem Kouther</h1>
            <p className="text-xl text-virtus-red font-medium mb-6">Founder</p>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p>
                A. Azeem Kouther serves as the Chief Mechanical Officer at VirtusCo, where he applies his extensive expertise in mechanical engineering to design and implement robust hardware solutions for the company's innovative robotics systems. His meticulous approach to mechanical design ensures that VirtusCo's robots deliver reliable performance in real-world conditions.
              </p>
              
              <p>
                As an undergraduate of Rajagiri School of Engineering & Technology alongside his co-founders, Azeem developed a deep understanding of mechanical systems and structural design principles. His engineering insights have been instrumental in translating theoretical concepts into functional prototypes and production-ready hardware that meets the rigorous demands of industrial applications.
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
