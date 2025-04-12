
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-24 pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero Text Content */}
          <AnimatedSection 
            className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0" 
            direction="up"
            delay={100}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
              Revolutionizing Airport Travel
            </div>
            <h1 className="heading-xl leading-tight mb-6">
              The Future of 
              <br />
              <span className="text-virtus-primary">Baggage Handling</span>
              <br />
              is Here
            </h1>
            <p className="subtitle mb-8 max-w-xl mx-auto lg:mx-0">
              Experience seamless travel with our autonomous porter robots. Designed to transform the way you navigate airports, our intelligent solution minimizes physical strain and maximizes efficiency.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button to="/product" size="lg">Learn More</Button>
              <Button to="/contact" variant="outline" size="lg">Request a Demo</Button>
            </div>
          </AnimatedSection>

          {/* Hero Image/Animation */}
          <AnimatedSection 
            className="w-full lg:w-1/2" 
            direction="right"
            delay={300}
          >
          <div className="relative flex justify-center">
          <div className="glass-card rounded-full overflow-hidden shadow-xl w-128 h-128 flex items-center justify-center">
            <img 
              src="/Porter.jpg" 
              alt="Porter Robot" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-virtus-primary/10 to-virtus-accent/10 relative">
                  {/* Placeholder for robot image or animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-56 h-56 bg-gradient-to-br from-virtus-primary to-virtus-accent rounded-full opacity-90 flex items-center justify-center text-white">
                        <div className="text-center p-6">
                          <div className="text-2xl font-bold mb-2">VirtusCo</div>
                          <div className="text-sm">Autonomous Porter Robot</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Cards */}
              <AnimatedSection 
                className="absolute -top-10 -right-6 glass-card p-4 rounded-lg shadow-lg" 
                delay={700}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-virtus-secondary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Efficiency</div>
                    <div className="text-sm font-bold">+95%</div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection 
                className="absolute bottom-10 -left-6 glass-card p-4 rounded-lg shadow-lg" 
                delay={900}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-virtus-accent flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                  <div className="text-xs text-gray-500">Time Saved</div>
                  <div className="text-sm font-bold">42 min avg</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
