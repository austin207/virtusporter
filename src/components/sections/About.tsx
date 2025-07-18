
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedSection from '../ui/AnimatedSection';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  slug: string;
}

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

  const team: TeamMember[] = [
    {
      name: 'A.Azeem Kouther',
      role: 'Founder',
      image: '/Azeem.jpg',
      bio: "Robotics engineer with extensive experience in mechanical systems and hardware.",
      slug: '/founders/azeem-kouther'
    },
    {
      name: 'Allen George Thomas',
      role: 'Founder',
      image: '/Allen.jpg',
      bio: "Product designer focused on creating intuitive user experiences and CAD models.",
      slug: '/founders/allen-george-thomas'
    },
    {
      name: 'Alwin George Thomas',
      role: 'Founder',
      image: '/Alwin.jpg',
      bio: "Financial strategist.",
      slug: '/founders/alwin-george-thomas'
    },
    {
      name: 'Antony Austin',
      role: 'Founder',
      image: '/Austin.jpeg',
      bio: "Robotics engineer with extensive experience in autonomous systems, embedded systems and AI.",
      slug: '/founders/antony-austin'
    },
    {
      name: 'Danush Krishna',
      role: 'Founder',
      image: '/Danush.jpg',
      bio: "Robotics engineer with expertise in hardware and embedded systems.",
      slug: '/founders/danush-krishna'
    },
  ];

  useEffect(() => {
    // Ensure team section is visible on mobile
    if (isMobile) {
      setIsInView(true);
    }
  }, [isMobile]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Mission & Vision */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20" delay={100}>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
            Our Story
          </div>
          <h2 className="heading-lg text-gray-900 mb-4">Democratizing <span className="text-virtus-red">Robotics</span></h2>
          <p className="subtitle text-gray-600 mb-6">
            <strong>Bridging the gap between those with resources and those without, 
            while building tailored robotic solutions for any industry.</strong> 
            We believe automation should be accessible to businesses of all sizes, not just large corporations.
          </p>
          <AnimatedSection className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-8 mb-8" delay={300}>
            <h3 className="text-xl font-semibold text-virtus-red mb-3">Our Vision</h3>
            <p className="text-gray-700">
              <strong>At VirtusCo, we're committed to democratizing robotics and making automation 
              accessible to businesses of all sizes.</strong> Our innovative solutions emerged from years of research, 
              with a focus on creating technology that's genuinely helpful and accessible to everyone.
            </p>
          </AnimatedSection>
          <Button to="/about" size="lg">Learn More About Us</Button>
        </AnimatedSection>

        {/* Team Section */}
        <div>
          <AnimatedSection className="text-center mb-16" delay={400}>
            <h3 className="heading-md text-gray-900 mb-4">Meet Our <span className="text-virtus-red">Founding Team</span></h3>
            <p className="subtitle text-gray-600 max-w-3xl mx-auto">
              The visionary minds behind VirtusCo, bringing together expertise in robotics, 
              design, operations, and strategic planning.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection 
                key={member.name}
                delay={200 + (index * 100)}
                className="h-full"
              >
                <Link 
                  to={member.slug}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 transform hover:shadow-lg card-animate h-full flex flex-col"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-virtus-primary/10 to-virtus-accent/10">
                      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                        <div className="text-2xl font-bold text-virtus-primary">
                          {member.name.split(' ').map(part => part[0]).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-sm text-virtus-red font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                    <div className="mt-4 inline-flex items-center text-virtus-red font-medium">
                      Read more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
