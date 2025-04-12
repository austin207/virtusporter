
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { XIcon } from "@/components/icons/x-icon"

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
              src="/Allen.jpg" 
              alt="Allen George Thomas" 
              className="rounded-xl shadow-lg w-full object-cover mb-4"
            />
            <div className="flex space-x-4">
              <a 
                 href="https://www.linkedin.com/in/allenthms/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                className="text-gray-600 hover:text-virtus-primary transition-colors"
                >
                <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
              </a>

              <a href="https://x.com/thmsalln" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <XIcon className="h-6 w-6" />
                <span className="sr-only">X (formerly Twitter)</span>
              </a>

              <a href="https://www.instagram.com/allenthvmas?igsh=Y3ZpZDgydmF2ZnQ=" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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
