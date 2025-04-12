
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { XIcon } from "@/components/icons/x-icon"

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
              src="/Austin.jpeg" 
              alt="Antony Austin" 
              className="rounded-xl shadow-lg w-full object-cover mb-4"
            />
            <div className="flex space-x-4">
              <a 
                 href="https://www.linkedin.com/in/antony-austin-b7287226a/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                className="text-gray-600 hover:text-virtus-primary transition-colors"
                >
                <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
              </a>

              <a href="https://x.com/AntonyAustin19" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <XIcon className="h-6 w-6" />
                <span className="sr-only">X (formerly Twitter)</span>
              </a>

              <a href="https://www.instagram.com/antonyavstin?igsh=Z3NpM3NuNjl4dmU0&utm_source=qr" target="_blank" className="text-gray-600 hover:text-virtus-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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
                Antony's strategic vision for democratizing cutting-edge technology drives VirtusCo's mission. His ability to seamlessly bridge multiple technical domains from circuit design to artificial intelligence positions the company at the forefront of innovation in autonomous robotics and intelligent systems.
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
