
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Code, Settings, Cpu, GitBranch, Bot, BarChart, Server, ArrowUpToLine } from 'lucide-react';

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

  const services = [
    {
      title: "ROS Development",
      description: "Custom Robot Operating System (ROS) development tailored to your specific use case and hardware requirements.",
      icon: <Code className="h-6 w-6" />,
      features: [
        "ROS package development",
        "Navigation stack customization",
        "Sensor integration",
        "Custom algorithms",
        "Performance optimization"
      ]
    },
    {
      title: "Custom Robotics Solutions",
      description: "End-to-end development of specialized robotics systems from concept to deployment.",
      icon: <Bot className="h-6 w-6" />,
      features: [
        "Requirements analysis",
        "Hardware selection",
        "Mechanical design",
        "Electronics integration",
        "Testing and validation"
      ]
    },
    {
      title: "System Integration",
      description: "Seamless integration of robotics systems with existing infrastructure and workflows.",
      icon: <GitBranch className="h-6 w-6" />,
      features: [
        "API development",
        "Legacy system integration",
        "Cloud connectivity",
        "Database integration",
        "User management systems"
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent systems that learn and adapt to changing environments and requirements.",
      icon: <Cpu className="h-6 w-6" />,
      features: [
        "Computer vision systems",
        "Predictive maintenance",
        "Behavioral modeling",
        "Reinforcement learning",
        "Neural network design"
      ]
    }
  ];

  const processSteps = [
    {
      title: "Consultation",
      description: "We assess your unique challenges and operational environment to determine how robotics can best serve your business needs.",
      icon: <Settings className="h-6 w-6" />
    },
    {
      title: "Budget Alignment",
      description: "We work within your funding constraints, adjusting scope and approach to maximize value while meeting your core requirements.",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Development",
      description: "Our expert team designs and implements customized solutions, keeping you involved throughout the process.",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Deployment",
      description: "We ensure smooth integration with your existing systems and provide comprehensive training for your team.",
      icon: <Server className="h-6 w-6" />
    },
    {
      title: "Ongoing Support",
      description: "We offer continued maintenance, updates, and optimization to ensure your solution evolves with your business.",
      icon: <ArrowUpToLine className="h-6 w-6" />
    }
  ];

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
                  Custom <span className="text-virtus-primary">Robotics Solutions</span> for Your Business
                </h1>
                <p className="subtitle text-gray-600 mb-8">
                  VirtusCo specializes in creating tailored robotics solutions that address your unique business challenges. From ROS development to complete robotics systems, we adapt our approach to your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <Button to="/contact" size="lg">Get a Consultation</Button>
                  <Button to="/product" variant="outline" size="lg">Explore Our Products</Button>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-virtus-primary/10 to-virtus-accent/10 w-full h-full flex items-center justify-center p-8">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      {services.slice(0, 4).map((service, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-3">
                            {service.icon}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900">{service.title}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={sectionRef} id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Our Services</h2>
              <p className="subtitle text-gray-600">
                We offer a comprehensive range of robotics solutions, from specialized development to complete systems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-700 transform ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mr-4">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Our Approach</h2>
              <p className="subtitle text-gray-600">
                We adapt our process to your specific needs and budget constraints, ensuring maximum value for your investment.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:translate-x-0 translate-x-6"></div>
              
              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row items-start md:even:flex-row-reverse`}>
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-virtus-primary/20 absolute left-0 md:left-1/2 transform translate-x-0 md:-translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary">
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className={`pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16'}`}>
                      <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Tailored to Your Budget</h2>
              <p className="subtitle text-gray-600">
                We understand that every business has different financial constraints. Our approach ensures you get the most value within your budget.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-semibold text-virtus-primary mb-4">Flexible Scope</h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Whether you need a targeted ROS development project or a complete robotics solution, we tailor our services to match your requirements and budget constraints.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Feature prioritization</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Phased implementation</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Technology selection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Example: Budget-Based Approaches</h4>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-sm font-semibold text-virtus-primary mb-2">Focused Solution</div>
                            <div className="text-xs text-gray-600 mb-3">For smaller budgets</div>
                            <div className="text-xs text-gray-600">
                              Targeted ROS development for specific functionality, with potential for future expansion.
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-sm font-semibold text-virtus-primary mb-2">Balanced Approach</div>
                            <div className="text-xs text-gray-600 mb-3">For medium budgets</div>
                            <div className="text-xs text-gray-600">
                              Core robotics solution with essential features and reasonable customization options.
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-sm font-semibold text-virtus-primary mb-2">Comprehensive System</div>
                            <div className="text-xs text-gray-600 mb-3">For larger budgets</div>
                            <div className="text-xs text-gray-600">
                              Complete end-to-end solution with advanced features, integrations, and ongoing support.
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Every project is unique, and we'll work with you to find the right balance between your requirements, timeline, and budget. Our goal is to deliver maximum value regardless of project size.
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to discuss your project?</h2>
                  <p className="text-white/80 text-lg">
                    Contact us for a free consultation to explore how our robotics solutions can address your business challenges.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                  <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Contact Us
                  </Button>
                  <Button to="/product" variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                    Explore Products
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
