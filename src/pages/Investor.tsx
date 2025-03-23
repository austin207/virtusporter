
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const Investor = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

  const investmentHighlights = [
    {
      title: 'Innovative Technology',
      description: 'Proprietary autonomous navigation and AI-powered systems with strong IP protection.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Diverse Revenue Streams',
      description: 'Multiple income sources including profit sharing, maintenance fees, advertising, and data services.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Expanding Market',
      description: 'Growing demand for autonomous solutions in airports and other travel hubs globally.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: 'Experienced Team',
      description: 'Founded by experts in robotics, AI, product design, operations, and finance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Governance Protections',
      description: 'Unique governance structure that balances founder control with investor interests.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Sustainability Focus',
      description: 'Eco-friendly design, renewable charging, and circular economy approach for long-term value.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const documents = [
    {
      title: 'Investor Pitch Deck',
      description: 'Comprehensive overview of VirtusCo, our technology, market opportunity, and business model.',
      format: 'PDF',
      size: '8.5 MB',
    },
    {
      title: 'Financial Projections',
      description: 'Detailed 5-year financial forecast including revenue streams, costs, and growth potential.',
      format: 'PDF/Excel',
      size: '4.2 MB',
    },
    {
      title: 'Technical Whitepaper',
      description: 'In-depth analysis of our autonomous porter technology, AI systems, and technical advantages.',
      format: 'PDF',
      size: '12.3 MB',
    },
    {
      title: 'Market Analysis',
      description: 'Comprehensive research on the airport automation market, competitive landscape, and growth trends.',
      format: 'PDF',
      size: '6.8 MB',
    },
  ];

  const pressReleases = [
    {
      title: 'VirtusCo Completes Successful Pilot at Bangalore International Airport',
      date: 'June 15, 2022',
      excerpt: 'Three-month trial demonstrates significant improvements in passenger experience and operational efficiency.',
    },
    {
      title: 'VirtusCo Secures $5M in Seed Funding to Revolutionize Airport Baggage Handling',
      date: 'March 8, 2022',
      excerpt: 'Investment will accelerate product development and expand pilot programs to additional airports.',
    },
    {
      title: 'VirtusCo Selected for Prestigious Airport Innovation Accelerator Program',
      date: 'November 22, 2021',
      excerpt: 'One of ten startups chosen from over 300 applications to participate in the global airport technology program.',
    },
    {
      title: 'VirtusCo Unveils Next-Generation Autonomous Porter Robot',
      date: 'September 5, 2021',
      excerpt: 'Revolutionary design combines AI navigation, enhanced payload capacity, and interactive user interface.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="heading-lg text-gray-900 mb-6">
                <span className="text-virtus-primary">Investor</span> Information
              </h1>
              <p className="subtitle text-gray-600 mb-8">
                Explore investment opportunities with VirtusCo and learn about our financial model, growth strategy, and vision for transforming airport experiences worldwide.
              </p>
              <Button to="/contact" size="lg">Contact Investor Relations</Button>
            </div>
          </div>
        </section>

        {/* Investment Highlights Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                Investment Case
              </div>
              <h2 className="heading-md text-gray-900 mb-4">Why Invest in VirtusCo</h2>
              <p className="subtitle text-gray-600">
                Discover the key factors that make VirtusCo an attractive investment opportunity with strong growth potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {investmentHighlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Resources Section */}
        <section ref={sectionRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                Resources
              </div>
              <h2 className="heading-md text-gray-900 mb-4">Investor Materials</h2>
              <p className="subtitle text-gray-600">
                Access important documents and information to help you understand our business, technology, and market opportunity.
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 bg-gray-100 rounded-full">
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'overview' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('overview')}
                >
                  Documents
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'press' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('press')}
                >
                  Press Releases
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'events' ? 'bg-white shadow-sm text-virtus-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('events')}
                >
                  Events
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              {/* Documents Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'overview' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {documents.map((document, index) => (
                    <div 
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{document.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {document.format}
                          </span>
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {document.size}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{document.description}</p>
                      <Button variant="outline" size="sm">
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Need additional investor materials or have specific questions?</p>
                  <Button to="/contact" variant="outline">Contact Investor Relations</Button>
                </div>
              </div>

              {/* Press Releases Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'press' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="space-y-6">
                  {pressReleases.map((press, index) => (
                    <div 
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{press.title}</h3>
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {press.date}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{press.excerpt}</p>
                      <Button variant="link" className="p-0">
                        Read Full Press Release
                        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">For press inquiries or media kit requests</p>
                  <Button to="/contact" variant="outline">Contact Media Relations</Button>
                </div>
              </div>

              {/* Events Tab */}
              <div className={`transition-opacity duration-500 ${activeTab === 'events' ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Investor & Industry Events</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-virtus-primary/10 rounded-lg flex flex-col items-center justify-center mr-4 text-virtus-primary">
                        <span className="text-sm font-bold">SEP</span>
                        <span className="text-xl font-bold">15</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">Q3 Investor Update Webinar</h4>
                        <p className="text-sm text-gray-600 mb-2">Virtual Event | 2:00 PM IST</p>
                        <Button variant="outline" size="sm">Register</Button>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-virtus-primary/10 rounded-lg flex flex-col items-center justify-center mr-4 text-virtus-primary">
                        <span className="text-sm font-bold">OCT</span>
                        <span className="text-xl font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">Airport Innovation Summit 2022</h4>
                        <p className="text-sm text-gray-600 mb-2">Singapore | October 5-7, 2022</p>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-virtus-primary/10 rounded-lg flex flex-col items-center justify-center mr-4 text-virtus-primary">
                        <span className="text-sm font-bold">NOV</span>
                        <span className="text-xl font-bold">18</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">Future of Transportation Conference</h4>
                        <p className="text-sm text-gray-600 mb-2">Dubai, UAE | November 18-20, 2022</p>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-virtus-primary/10 rounded-lg flex flex-col items-center justify-center mr-4 text-virtus-primary">
                        <span className="text-sm font-bold">DEC</span>
                        <span className="text-xl font-bold">10</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">Annual Shareholder Meeting</h4>
                        <p className="text-sm text-gray-600 mb-2">Bangalore, India | 10:00 AM IST</p>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                  Governance
                </div>
                <h2 className="heading-md text-gray-900 mb-6">Protected Governance Model</h2>
                <p className="text-gray-600 mb-6">
                  VirtusCo features a unique governance structure designed to secure our long-term vision while protecting investor interests. Our model ensures that the founding team maintains strategic control over key decisions, while providing robust oversight and transparency.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Founder Leadership</h3>
                      <p className="text-sm text-gray-600">
                        Dual-class share structure ensures founders maintain control of strategic direction and core technology decisions.
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
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Investor Protections</h3>
                      <p className="text-sm text-gray-600">
                        Clear rights on financial oversight, capital allocation, and M&A activities provide strong investor safeguards.
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
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Balanced Board</h3>
                      <p className="text-sm text-gray-600">
                        Board composition includes founder representatives, independent industry experts, and investor seats.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button to="/contact" size="lg">Request Governance Details</Button>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment Process</h3>
                    
                    <div className="space-y-8">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary flex items-center justify-center text-white font-bold mr-4">
                          1
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Initial Inquiry</h4>
                          <p className="text-sm text-gray-600">
                            Contact our investor relations team to express interest and discuss investment opportunities.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary flex items-center justify-center text-white font-bold mr-4">
                          2
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Information Exchange</h4>
                          <p className="text-sm text-gray-600">
                            After signing an NDA, receive detailed investor materials and financial projections.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary flex items-center justify-center text-white font-bold mr-4">
                          3
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Due Diligence</h4>
                          <p className="text-sm text-gray-600">
                            Conduct comprehensive review of business model, technology, team, and market opportunity.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary flex items-center justify-center text-white font-bold mr-4">
                          4
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Term Sheet & Closing</h4>
                          <p className="text-sm text-gray-600">
                            Negotiate investment terms and complete the transaction with our legal team.
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-virtus-primary to-virtus-accent rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex items-center justify-between">
                <div className="md:max-w-2xl mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to join our investment journey?</h2>
                  <p className="text-white/80 text-lg">
                    Contact our investor relations team to explore opportunities and receive our latest investor materials.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                  <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Contact Investor Relations
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

export default Investor;
