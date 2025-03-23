
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Product = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

  const techFeatures = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Advanced AI Processing',
      description: 'Onboard neural network processors handle complex environmental analysis and decision-making in real-time, without relying on cloud connectivity.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
      title: 'Multi-sensor Fusion',
      description: 'Combines data from LiDAR, cameras, ultrasonic sensors, and radar to create an accurate 3D map of surroundings for precise navigation.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: 'Modular Hardware Architecture',
      description: "Field-replaceable components allow for rapid maintenance and upgrades, extending the robot's operational life and reducing downtime.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Enterprise-grade Security',
      description: 'End-to-end encryption, secure boot processes, and continuous security updates protect passenger data and prevent unauthorized access.',
    },
  ];

  const sustainabilityFeatures = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Energy-Efficient Design',
      description: 'Ultra-efficient motors and power management systems maximize operational time between charges while minimizing energy consumption.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Renewable Charging',
      description: 'Solar-powered docking stations and kinetic energy harvesting systems reduce dependence on grid electricity and lower carbon footprint.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Circular Economy Model',
      description: 'Modular components designed for repair, refurbishment, and recyclability, extending product lifecycle and reducing waste.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      ),
      title: 'Eco-friendly Materials',
      description: 'Constructed using recycled aluminum, bio-based plastics, and responsibly sourced materials to minimize environmental impact.',
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
              <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0 text-center lg:text-left">
                <h1 className="heading-lg text-gray-900 mb-6">
                  Meet the <span className="text-virtus-primary">Autonomous Porter</span> Robot
                </h1>
                <p className="subtitle text-gray-600 mb-8">
                  Our state-of-the-art autonomous porter robot combines cutting-edge technology with thoughtful design to transform the airport experience for travelers and create new revenue opportunities for airports.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <Button to="/contact" size="lg">Request a Demo</Button>
                  <Button to="/service" variant="outline" size="lg">Revenue Model</Button>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-virtus-primary/10 to-virtus-accent/10 w-full h-full flex items-center justify-center p-8">
                    <div className="relative w-full max-w-md">
                      <div className="w-full h-64 bg-gray-100 rounded-xl shadow-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-virtus-primary mb-2">Autonomous Porter</div>
                          <div className="text-gray-600 text-sm">Interactive 3D Model Coming Soon</div>
                        </div>
                      </div>
                      
                      {/* Feature callouts */}
                      <div className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-virtus-primary flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                          </div>
                          <div className="text-xs font-medium">Smart Navigation</div>
                        </div>
                      </div>
                      
                      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-lg shadow-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-virtus-secondary flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="text-xs font-medium">High Capacity</div>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-4 right-1/3 bg-white p-2 rounded-lg shadow-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-virtus-accent flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="text-xs font-medium">Smart Display</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section ref={sectionRef} id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Designed for Excellence</h2>
              <p className="subtitle text-gray-600">
                Our autonomous porter robots combine cutting-edge technology with thoughtful design to transform the airport experience.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 bg-gray-100 rounded-full">
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'features' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('features')}
                >
                  Features
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'technology' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('technology')}
                >
                  Technology
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'sustainability' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('sustainability')}
                >
                  Sustainability
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              {/* Features Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'features' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-virtus-primary/10 text-virtus-primary mr-4">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'technology' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {techFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-virtus-accent/10 text-virtus-accent mr-4">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainability Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'sustainability' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {sustainabilityFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-virtus-secondary/10 text-virtus-secondary mr-4">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-virtus-primary to-virtus-accent rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex items-center justify-between">
                <div className="md:max-w-2xl mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your airport experience?</h2>
                  <p className="text-white/80 text-lg">
                    Schedule a demo to see our autonomous porter robots in action.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                  <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Request a Demo
                  </Button>
                  <Button to="/service" variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                    Learn About Pricing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
