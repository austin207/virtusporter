import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  slug: string;
}

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const team: TeamMember[] = [
    {
      name: 'Antony Austin',
      role: 'Founder',
      image: '/placeholder.svg',
      bio: "Pioneer with a background in robotics engineering, embedded systems and AI systems development.",
      expertise: ['Robotics Engineering', 'AI Systems', 'Strategic Planning', 'R&D Management'],
      slug: '/founders/antony-austin'
    },
    {
      name: 'Alwin George Thomas',
      role: 'Founder',
      image: '/placeholder.svg',
      bio: "Financial strategist.",
      expertise: ['Financial Strategy', 'Investment Planning', 'Revenue Modeling', 'Strategic Planning'],
      slug: '/founders/alwin-george-thomas'
    },
    {
      name: 'A.Azeem Kouther',
      role: 'Founder',
      image: '/placeholder.svg',
      bio: "Visionary with a background in robotics engineering and mechanical systems development.",
      expertise: ['Mechanical systems', 'Hardware modeling', 'Build Optimization', 'Strategic Planning'],
      slug: '/founders/azeem-kouther'
    },
    {
      name: 'Allen George Thomas',
      role: 'Founder',
      image: '/placeholder.svg',
      bio: "Product designer with a passion for human-centered solutions.",
      expertise: ['Product Design', 'User Experience', 'Interaction Design', 'Strategic Planning'],
      slug: '/founders/allen-george-thomas'
    },
    {
      name: 'Danush Krishna',
      role: 'Founder',
      image: '/placeholder.svg',
      bio: "Technology innovator with deep experience in hardware and embedded systems development.",
      expertise: ['Hardware Integration', 'Embedded Architecture', 'Optimization techniques', 'Strategic Planning'],
      slug: '/founders/danush-krishna'
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: "We constantly push the boundaries of what's possible in autonomous robotics and service technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards in technology, design, and service delivery.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Sustainability',
      description: 'We design with the planet in mind, creating efficient solutions that minimize environmental impact.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Customer Focus',
      description: 'We prioritize solving real problems for travelers and creating value for our airport partners.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
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
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="heading-lg text-gray-900 mb-6">
                <span className="text-virtus-primary">Our Story</span> and Mission
              </h1>
              <p className="subtitle text-gray-600 mb-8">
                VirtusCo was founded with a clear vision: to transform the airport experience through innovation that addresses real challenges faced by travelers and creates value for airports.
              </p>
              <div className="flex space-x-4">
                <Button to="#team" size="lg">Meet Our Team</Button>
                <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                  Our Journey
                </div>
                <h2 className="heading-md text-gray-900 mb-6">From Idea to Innovation</h2>
                <p className="text-gray-600 mb-6">
                  VirtusCo began when our founders experienced firsthand the challenges of navigating airports with heavy luggage. What started as a simple question – "Why isn't there a better way?" – evolved into a comprehensive solution that combines cutting-edge robotics with thoughtful service design.
                </p>
                <p className="text-gray-600 mb-6">
                  Our autonomous porter robots emerged from years of research and development, with a focus on creating technology that's not just advanced, but genuinely helpful. We've built a solution that addresses real pain points for travelers while offering airports a new avenue for service enhancement and revenue generation.
                </p>
                <p className="text-gray-600">
                  Today, VirtusCo stands at the intersection of technical excellence and practical innovation, ready to transform the airport experience for millions of travelers worldwide.
                </p>
              </div>
              
              <div>
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-virtus-primary/10 to-virtus-accent/10 p-8">
                    <div className="relative w-full h-full">
                      {/* Timeline visualization */}
                      <div className="absolute top-0 bottom-0 left-8 w-1 bg-white/50"></div>
                      
                      <div className="relative pl-16 pb-8">
                        <div className="absolute left-[29px] top-0 w-4 h-4 rounded-full bg-virtus-primary border-2 border-white"></div>
                        <div className="glass-card p-4 rounded-lg shadow-sm">
                          <div className="text-sm font-semibold text-gray-900 mb-1">January 2025</div>
                          <div className="text-xs text-gray-600">Concept development and initial research</div>
                        </div>
                      </div>
                      
                      <div className="relative pl-16 pb-8">
                        <div className="absolute left-[29px] top-0 w-4 h-4 rounded-full bg-virtus-primary border-2 border-white"></div>
                        <div className="glass-card p-4 rounded-lg shadow-sm">
                          <div className="text-sm font-semibold text-gray-900 mb-1">February 2025</div>
                          <div className="text-xs text-gray-600">Prototype development and technical validation</div>
                        </div>
                      </div>
                      
                      <div className="relative pl-16 pb-8">
                        <div className="absolute left-[29px] top-0 w-4 h-4 rounded-full bg-virtus-primary border-2 border-white"></div>
                        <div className="glass-card p-4 rounded-lg shadow-sm">
                          <div className="text-sm font-semibold text-gray-900 mb-1">March 2025</div>
                          <div className="text-xs text-gray-600">First airport pilot programs and user testing</div>
                        </div>
                      </div>
                      
                      <div className="relative pl-16">
                        <div className="absolute left-[29px] top-0 w-4 h-4 rounded-full bg-virtus-primary border-2 border-white"></div>
                        <div className="glass-card p-4 rounded-lg shadow-sm">
                          <div className="text-sm font-semibold text-gray-900 mb-1">April 2025</div>
                          <div className="text-xs text-gray-600">Commercial launch and expansion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                Our Values
              </div>
              <h2 className="heading-md text-gray-900 mb-4">What Drives Us</h2>
              <p className="subtitle text-gray-600">
                Our core values guide everything we do, from product development to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                Our Team
              </div>
              <h2 className="heading-md text-gray-900 mb-4">The Minds Behind VirtusCo</h2>
              <p className="subtitle text-gray-600">
                Our founding team brings together diverse expertise in robotics, design, operations, and business strategy.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-virtus-primary/10 to-virtus-accent/10">
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                        <div className="text-2xl font-bold text-virtus-primary">
                          {member.name.split(' ').map(part => part[0]).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-virtus-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    
                    
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-virtus-primary/10 text-virtus-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button to={member.slug} variant="link" className="text-virtus-red">
                        Read more
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        

        {/* Vision Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
                  Our Vision
                </div>
                <h2 className="heading-md text-gray-900 mb-6">Looking to the Future</h2>
                <p className="text-gray-600 mb-6">
                  At VirtusCo, we envision a future where travel is truly seamless, where technology enhances the human experience rather than complicating it. Our autonomous porter robots are just the beginning of this journey.
                </p>
                <p className="text-gray-600 mb-8">
                  We're committed to continuous innovation, expanding our solutions to address more challenges in the travel ecosystem and beyond. By combining cutting-edge technology with thoughtful design and sustainable practices, we aim to create meaningful change for travelers, airports, and the planet.
                </p>
                <Button to="/contact" size="lg">Join Our Journey</Button>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Future Initiatives</h3>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Global Expansion</h4>
                          <p className="text-sm text-gray-600">
                            Bringing our solutions to airports worldwide, adapting to regional needs and challenges.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Enhanced Capabilities</h4>
                          <p className="text-sm text-gray-600">
                            Developing next-generation robots with expanded features and services.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Beyond Airports</h4>
                          <p className="text-sm text-gray-600">
                            Exploring applications in other travel hubs, hotels, and urban environments.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-1">Integrated Ecosystem</h4>
                          <p className="text-sm text-gray-600">
                            Creating a connected network of services that enhance every aspect of travel.
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join us in transforming travel</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                  Whether you're an airport looking to enhance customer experience, an investor interested in our journey, or a talent wanting to join our team, we'd love to connect.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Contact Us
                  </Button>
                  <Button to="/product" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Explore Our Product
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

export default About;
