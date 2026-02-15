
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-16 pb-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="heading-xl leading-tight mb-6 text-[#1d1d1f] max-w-4xl">
            The Future of
            <br />
            Baggage Handling
          </h1>
          <p className="subtitle mb-10 max-w-2xl mx-auto text-center">
            Experience seamless travel with our autonomous porter robots. Designed to transform the way you navigate airports.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button to="/product" size="lg">Learn More</Button>
            <Button to="/contact" variant="outline" size="lg">Request a Demo</Button>
          </div>
        </div>

        {/* Product Image */}
        <div className={`mt-16 lg:mt-24 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl mx-auto">
            <img
              src="/Porter.jpg"
              alt="Porter Robot"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
