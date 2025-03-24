
import { useRef, useState, useEffect } from 'react';
import Button from '../ui/Button';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const team: TeamMember[] = [
    {
      name: 'Antony Austin',
      role: 'CEO & Co-Founder',
      image: '/placeholder.svg',
      bio: "Robotics engineer with extensive experience in autonomous systems and AI.",
    },
    {
      name: 'Alwin George Thomas',
      role: 'CTO & Co-Founder',
      image: '/placeholder.svg',
      bio: "Technology leader with expertise in hardware and software integration.",
    },
    {
      name: 'A.Azeem Kouther',
      role: 'COO & Co-Founder',
      image: '/placeholder.svg',
      bio: "Operations expert with deep knowledge of logistics and process optimization.",
    },
    {
      name: 'Allen George Thomas',
      role: 'CDO & Co-Founder',
      image: '/placeholder.svg',
      bio: "Product designer focused on creating intuitive user experiences.",
    },
    {
      name: 'Danush Krishna',
      role: 'CFO & Co-Founder',
      image: '/placeholder.svg',
      bio: "Financial strategist with background in startup funding and revenue models.",
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Mission & Vision */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-6">
            Our Story
          </div>
          <h2 className="heading-lg text-gray-900 mb-4">Democratizing Robotics</h2>
          <p className="subtitle text-gray-600 mb-6">
            <strong>Bridging the gap between those with resources and those without, 
            while building tailored robotic solutions for any industry.</strong> 
            We believe automation should be accessible to businesses of all sizes, not just large corporations.
          </p>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-8 mb-8">
            <h3 className="text-xl font-semibold text-virtus-primary mb-3">Our Vision</h3>
            <p className="text-gray-700">
              <strong>At VirtusCo, we're committed to democratizing robotics and making automation 
              accessible to businesses of all sizes.</strong> Our innovative solutions emerged from years of research, 
              with a focus on creating technology that's genuinely helpful and accessible to everyone.
            </p>
          </div>
          <Button to="/about" size="lg">Learn More About Us</Button>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-16">
            <h3 className="heading-md text-gray-900 mb-4">Meet Our Founding Team</h3>
            <p className="subtitle text-gray-600 max-w-3xl mx-auto">
              The visionary minds behind VirtusCo, bringing together expertise in robotics, 
              design, operations, and strategic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${150 * index}ms` }}
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
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-sm text-virtus-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
