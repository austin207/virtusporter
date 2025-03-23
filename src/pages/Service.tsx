
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

const Service = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const revenueModels = [
    {
      title: 'Profit Sharing Model',
      description: 'A tiered profit share structure based on monthly net profit thresholds.',
      tiers: [
        { threshold: 'Up to ₹1,000,000', percentage: '15%' },
        { threshold: '₹1,000,000 - ₹2,000,000', percentage: '18%' },
        { threshold: '₹2,000,000 - ₹3,000,000', percentage: '20%' },
        { threshold: '₹3,000,000 - ₹4,000,000', percentage: '23%' },
        { threshold: 'Above ₹4,000,000', percentage: '25%' },
      ],
    },
    {
      title: 'Maintenance Fees',
      description: 'Fixed monthly fee per unit with annual automatic adjustments.',
      details: [
        { label: 'Monthly Fee per Unit', value: '₹4,000' },
        { label: 'Annual Adjustment', value: '6-7% (based on inflation index)' },
        { label: 'Includes', value: 'Regular maintenance, software updates, and technical support' },
      ],
    },
    {
      title: 'Additional Revenue Streams',
      description: 'Diversified income sources beyond core porter services.',
      streams: [
        { name: 'Digital Advertising', description: 'Targeted ads on interactive displays' },
        { name: 'Data Monetization', description: 'Anonymized insights on passenger flow and behavior' },
        { name: 'Premium Features', description: 'Enhanced services available for upsell' },
        { name: 'Value-Added Services', description: 'Integration with airport retail and dining' },
      ],
    },
  ];

  const projectionData = {
    monthly: [
      { label: 'Porter Service Revenue', value: '₹3,500,000' },
      { label: 'Advertising Revenue', value: '₹750,000' },
      { label: 'Data Services', value: '₹500,000' },
      { label: 'Premium Features', value: '₹350,000' },
      { label: 'Total Monthly Revenue', value: '₹5,100,000' },
    ],
    annual: [
      { label: 'Total Annual Revenue', value: '₹61,200,000' },
      { label: 'Maintenance Costs', value: '₹4,800,000' },
      { label: 'Net Profit Potential', value: '₹56,400,000' },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="heading-lg text-gray-900 mb-6">
                Our <span className="text-virtus-primary">Service & Revenue</span> Model
              </h1>
              <p className="subtitle text-gray-600 mb-8">
                VirtusCo offers a unique hybrid revenue model that creates value for both airports and travelers. Discover how our autonomous porter robots can enhance customer experience while generating substantial returns.
              </p>
              <Button to="/contact" size="lg">Request Detailed Pricing</Button>
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section ref={sectionRef} id="revenue-model" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Hybrid Revenue Model</h2>
              <p className="subtitle text-gray-600">
                Our innovative approach combines multiple revenue streams to maximize returns on investment for airport partners.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {revenueModels.map((model, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 transform ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{model.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{model.description}</p>
                    
                    {model.tiers && (
                      <div className="space-y-3">
                        {model.tiers.map((tier, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{tier.threshold}</span>
                            <span className="text-sm font-semibold text-virtus-primary">{tier.percentage}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {model.details && (
                      <div className="space-y-3">
                        {model.details.map((detail, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{detail.label}</span>
                            <span className="text-sm font-semibold text-virtus-primary">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {model.streams && (
                      <div className="space-y-3">
                        {model.streams.map((stream, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-900 mb-1">{stream.name}</div>
                            <div className="text-xs text-gray-600">{stream.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Projections */}
            <div 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 transform ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Revenue Projections (100-Unit Deployment)</h3>
                <p className="text-gray-600 mb-8">
                  Estimated revenue breakdown for a standard deployment of 100 autonomous porter robots at a major international airport.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Projection</h4>
                    <div className="space-y-3">
                      {projectionData.monthly.map((item, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            index === projectionData.monthly.length - 1 
                              ? 'bg-virtus-primary/10 font-semibold' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <span className={`text-sm ${
                            index === projectionData.monthly.length - 1 
                              ? 'font-bold text-virtus-primary' 
                              : 'font-medium text-gray-900'
                          }`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Annual Projection</h4>
                    <div className="space-y-3">
                      {projectionData.annual.map((item, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            index === projectionData.annual.length - 1 
                              ? 'bg-virtus-primary/10 font-semibold' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <span className={`text-sm ${
                            index === projectionData.annual.length - 1 
                              ? 'font-bold text-virtus-primary' 
                              : 'font-medium text-gray-900'
                          }`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Agreement Section */}
        <section id="partnerships" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                  Service Agreements
                </div>
                <h2 className="heading-md text-gray-900 mb-6">Long-term Partnerships Built on Trust</h2>
                <p className="text-gray-600 mb-6">
                  Our service agreements are designed to create lasting partnerships with airports, 
                  balancing business needs with technical excellence and innovation. We focus on transparent 
                  terms, flexible options, and dedicated support.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Protected Governance</h3>
                      <p className="text-sm text-gray-600">
                        Unique governance model that secures founder leadership while ensuring investor and partner satisfaction.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Flexible Terms</h3>
                      <p className="text-sm text-gray-600">
                        Customizable agreement lengths from 3 to 10 years with scalable deployment options.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Dedicated Support</h3>
                      <p className="text-sm text-gray-600">
                        24/7 technical support, regular maintenance, and continuous software updates.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button to="/contact" size="lg">Contact Our Team</Button>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Partnership Benefits</h3>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Revenue Optimization</h4>
                          <p className="text-sm text-gray-600">
                            Multiple revenue streams create sustainable, growing income from porter services and digital offerings.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Customer Experience</h4>
                          <p className="text-sm text-gray-600">
                            Enhanced passenger satisfaction with streamlined baggage handling and reduced physical strain.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Risk Mitigation</h4>
                          <p className="text-sm text-gray-600">
                            Comprehensive maintenance, insurance, and liability protection built into every agreement.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Innovation Pipeline</h4>
                          <p className="text-sm text-gray-600">
                            Priority access to VirtusCo's ongoing innovation in autonomous service robotics and related technologies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-virtus-primary to-virtus-accent rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-12 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to explore our service model?</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                  Contact our team to discuss how VirtusCo's autonomous porter robots can enhance your airport's customer experience and create new revenue streams.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Contact Us
                  </Button>
                  <Button to="/product" variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                    Explore the Product
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

export default Service;
