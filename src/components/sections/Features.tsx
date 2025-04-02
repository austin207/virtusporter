
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
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
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-gray-900 mb-4">Designed for Exceptional Experience</h2>
          <p className="subtitle text-gray-600">
            Our autonomous porter robots combine cutting-edge technology with thoughtful design to transform the airport experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Showcase */}
          <div className="order-2 lg:order-1">
            <div className={`transition-all duration-700 ease-out transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <ul className="space-y-8">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className={cn(
                      "flex p-6 rounded-xl transition-all duration-300 cursor-pointer",
                      activeFeature === index 
                        ? "bg-virtus-primary/5 border-l-4 border-virtus-primary" 
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={cn(
                      "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors",
                      activeFeature === index 
                        ? "bg-virtus-primary text-white" 
                        : "bg-gray-100 text-gray-600"
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-lg font-semibold mb-1 transition-colors",
                        activeFeature === index ? "text-virtus-primary" : "text-gray-900"
                      )}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="order-1 lg:order-2">
            <div className={`transition-all duration-700 delay-300 ease-out transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Circle background */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                    {/* Inner circle with gradient */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-virtus-primary/20 to-virtus-accent/20 flex items-center justify-center">
                      {/* Robot visualization - simplified for placeholder */}
                      <div className="w-3/5 h-4/5 bg-white rounded-2xl shadow-lg relative">
                        
                        {/* Robot screen */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4/5 h-1/3 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-white text-xs text-center">Interactive Display</div>
                        </div>
                        
                        {/* Robot body details */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-1/3 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="w-1/2 h-2/3 bg-virtus-primary/20 rounded-md mx-1"></div>
                          <div className="w-1/2 h-2/3 bg-virtus-accent/20 rounded-md mx-1"></div>
                        </div>
                        
                        {/* Robot wheels */}
                        <div className="absolute -bottom-3 left-6 w-8 h-8 bg-gray-800 rounded-full"></div>
                        <div className="absolute -bottom-3 right-6 w-8 h-8 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature highlights */}
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "absolute glass-card p-3 rounded-lg shadow-md transition-all duration-500",
                      activeFeature === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                    style={{
                      top: index === 0 ? '10%' : index === 1 ? '30%' : index === 2 ? '70%' : '90%',
                      left: index === 0 || index === 2 ? '-10%' : 'auto',
                      right: index === 1 || index === 3 ? '-10%' : 'auto',
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-virtus-primary flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <div className="text-sm font-medium">{feature.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
