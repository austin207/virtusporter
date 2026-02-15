
import { useState, useEffect, useRef } from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'High Payload Capacity',
      description: 'Our porter robots feature a robust chassis designed to handle heavy luggage with ease, supporting multiple bags while maintaining stability and maneuverability throughout the airport.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: 'Autonomous Navigation',
      description: 'Advanced sensors and AI algorithms enable our robots to navigate complex airport layouts autonomously, tracking users in real-time while intelligently avoiding obstacles and crowds.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Adjustable Lifting Mechanism',
      description: 'The integrated smart lifting system adjusts to various luggage sizes and weights, providing seamless transfer between ground, robot platform, and check-in counters without physical strain.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Interactive Display',
      description: 'Our touchscreen interface provides real-time information on check-in, boarding gates, flight status, and interactive airport maps, transforming the porter into a comprehensive travel assistant.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f5f7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-[#1d1d1f] mb-4">Designed for Exceptional Experience</h2>
          <p className="subtitle mx-auto">
            Our autonomous porter robots combine cutting-edge technology with thoughtful design to transform the airport experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Featured card - wide horizontal */}
          <div
            className={`md:col-span-2 bg-white rounded-2xl p-10 flex flex-col md:flex-row items-start gap-6 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex-shrink-0">
              {features[0].icon}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">{features[0].title}</h3>
              <p className="text-[#86868b] text-base leading-relaxed">{features[0].description}</p>
            </div>
          </div>

          {/* Tall right card */}
          <div
            className={`bg-white rounded-2xl p-7 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center mb-4">
              {features[1].icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{features[1].title}</h3>
            <p className="text-[#86868b] text-sm leading-relaxed">{features[1].description}</p>
          </div>

          {/* Bottom left card */}
          <div
            className={`bg-white rounded-2xl p-7 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center mb-4">
              {features[2].icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{features[2].title}</h3>
            <p className="text-[#86868b] text-sm leading-relaxed">{features[2].description}</p>
          </div>

          {/* Bottom wide card - horizontal */}
          <div
            className={`md:col-span-2 bg-white rounded-2xl p-8 flex flex-col md:flex-row items-start gap-5 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex-shrink-0">
              {features[3].icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{features[3].title}</h3>
              <p className="text-[#86868b] text-sm leading-relaxed">{features[3].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
