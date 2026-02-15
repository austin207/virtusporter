import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  slug: string;
}

const TeamCardDeck = ({ team }: { team: TeamMember[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    setDirection(dir);
    setActiveIndex(index);
    setTimeout(() => setDirection(null), 400);
  }, []);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % team.length, 'left');
  }, [activeIndex, team.length, goTo]);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + team.length) % team.length, 'right');
  }, [activeIndex, team.length, goTo]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  // Touch/mouse drag
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    setDragX(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragX(clientX - dragStartX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -60) next();
    else if (dragX > 60) prev();
    setDragX(0);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const wrappedDiff = diff > team.length / 2 ? diff - team.length
      : diff < -team.length / 2 ? diff + team.length
      : diff;

    if (wrappedDiff === 0) {
      return {
        transform: `translateX(${isDragging ? dragX : 0}px) scale(1) rotateZ(${isDragging ? dragX * 0.03 : 0}deg)`,
        zIndex: 10,
        opacity: 1,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    if (wrappedDiff === 1 || wrappedDiff === -team.length + 1) {
      return {
        transform: 'translateX(40px) scale(0.93) rotateZ(2deg)',
        zIndex: 5,
        opacity: 0.7,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    if (wrappedDiff === -1 || wrappedDiff === team.length - 1) {
      return {
        transform: 'translateX(-40px) scale(0.93) rotateZ(-2deg)',
        zIndex: 5,
        opacity: 0.7,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    if (wrappedDiff === 2) {
      return {
        transform: 'translateX(70px) scale(0.86) rotateZ(4deg)',
        zIndex: 2,
        opacity: 0.4,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    if (wrappedDiff === -2) {
      return {
        transform: 'translateX(-70px) scale(0.86) rotateZ(-4deg)',
        zIndex: 2,
        opacity: 0.4,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    return {
      transform: 'translateX(0) scale(0.8)',
      zIndex: 0,
      opacity: 0,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  const member = team[activeIndex];

  return (
    <section id="team" className="py-24 lg:py-32 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-md text-[#1d1d1f] mb-4">The Minds Behind VirtusCo</h2>
          <p className="subtitle mx-auto">
            Our founding team brings together diverse expertise in robotics, design, operations, and business strategy.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Card stack */}
          <div
            ref={containerRef}
            className="relative w-full max-w-sm h-[420px] mb-8 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {team.map((m, index) => (
              <div
                key={m.name}
                className="absolute inset-0 will-change-transform"
                style={getCardStyle(index)}
              >
                <Link
                  to={m.slug}
                  className="block h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  onClick={(e) => { if (index !== activeIndex) { e.preventDefault(); goTo(index, index > activeIndex ? 'left' : 'right'); } }}
                  draggable={false}
                >
                  <div className="h-44 bg-[#e8e8ed] flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-semibold text-[#1d1d1f]">
                        {m.name.split(' ').map(part => part[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1d1d1f] mb-0.5">{m.name}</h3>
                    <p className="text-xs text-[#86868b] font-medium mb-3">{m.role}</p>
                    <p className="text-[#86868b] text-sm mb-4 line-clamp-2">{m.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.expertise.map((skill, si) => (
                        <span key={si} className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#f5f5f7] text-[#3c3c43]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-[#d2d2d7] flex items-center justify-center text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {team.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIndex ? 'left' : 'right')}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-[#1d1d1f]' : 'w-1.5 bg-[#d2d2d7] hover:bg-[#86868b]'
                  }`}
                  aria-label={`Go to ${team[i].name}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-[#d2d2d7] flex items-center justify-center text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Active member name label */}
          <p className="mt-4 text-sm text-[#86868b]">
            {member.name} &middot; <Link to={member.slug} className="text-[#1d1d1f] hover:underline">View profile</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const team: TeamMember[] = [
    {
      name: 'Antony Austin',
      role: 'Founder',
      image: '/Austin.jpeg',
      bio: "Pioneer with a background in robotics engineering, embedded systems and AI systems development.",
      expertise: ['Robotics Engineering', 'AI Systems', 'Strategic Planning', 'R&D Management'],
      slug: '/founders/antony-austin'
    },
    {
      name: 'Alwin George Thomas',
      role: 'Founder',
      image: '/Alwin.jpg',
      bio: "Financial strategist.",
      expertise: ['Financial Strategy', 'Investment Planning', 'Revenue Modeling', 'Strategic Planning'],
      slug: '/founders/alwin-george-thomas'
    },
    {
      name: 'A.Azeem Kouther',
      role: 'Founder',
      image: '/Azeem.jpg',
      bio: "Visionary with a background in robotics engineering and mechanical systems development.",
      expertise: ['Mechanical systems', 'Hardware modeling', 'Build Optimization', 'Strategic Planning'],
      slug: '/founders/azeem-kouther'
    },
    {
      name: 'Allen George Thomas',
      role: 'Founder',
      image: '/Allen.jpg',
      bio: "Product designer with a passion for human-centered solutions.",
      expertise: ['Product Design', 'User Experience', 'Interaction Design', 'Strategic Planning'],
      slug: '/founders/allen-george-thomas'
    },
    {
      name: 'Danush Krishna',
      role: 'Founder',
      image: '/Danush.jpg',
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
        <section className="relative py-24 lg:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-lg text-[#1d1d1f] mb-6">
              Our Story and Mission
            </h1>
            <p className="subtitle mx-auto mb-10">
              VirtusCo was founded with a clear vision: to transform the airport experience through innovation that addresses real challenges faced by travelers and creates value for airports.
            </p>
            <div className="flex space-x-4 justify-center">
              <Button to="#team" size="lg">Meet Our Team</Button>
              <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 lg:py-32 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="heading-md text-[#1d1d1f] mb-6">From Idea to Innovation</h2>
                <p className="text-[#86868b] mb-6 text-sm leading-relaxed">
                  VirtusCo began when our founders experienced firsthand the challenges of navigating airports with heavy luggage. What started as a simple question - "Why isn't there a better way?" - evolved into a comprehensive solution that combines cutting-edge robotics with thoughtful service design.
                </p>
                <p className="text-[#86868b] mb-6 text-sm leading-relaxed">
                  Our autonomous porter robots emerged from years of research and development, with a focus on creating technology that's not just advanced, but genuinely helpful.
                </p>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  Today, VirtusCo stands at the intersection of technical excellence and practical innovation, ready to transform the airport experience for millions of travelers worldwide.
                </p>
              </div>

              <div>
                <div className="bg-white rounded-2xl overflow-hidden p-8">
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-3 w-[2px] bg-[#d2d2d7]"></div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-[5px] top-1 w-3 h-3 rounded-full bg-[#1d1d1f]"></div>
                      <div className="text-sm font-semibold text-[#1d1d1f] mb-1">January 2025</div>
                      <div className="text-xs text-[#86868b]">Initial Brainstorming and Market Research</div>
                    </div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-[5px] top-1 w-3 h-3 rounded-full bg-[#1d1d1f]"></div>
                      <div className="text-sm font-semibold text-[#1d1d1f] mb-1">February 2025</div>
                      <div className="text-xs text-[#86868b]">Requirements Gathering and Concept Design</div>
                    </div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-[5px] top-1 w-3 h-3 rounded-full bg-[#1d1d1f]"></div>
                      <div className="text-sm font-semibold text-[#1d1d1f] mb-1">March 2025</div>
                      <div className="text-xs text-[#86868b]">Early Proof of Concept and Design Validation</div>
                    </div>

                    <div className="relative pl-10">
                      <div className="absolute left-[5px] top-1 w-3 h-3 rounded-full bg-[#1d1d1f]"></div>
                      <div className="text-sm font-semibold text-[#1d1d1f] mb-1">April 2025</div>
                      <div className="text-xs text-[#86868b]">Initial stages of prototyping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-md text-[#1d1d1f] mb-4">What Drives Us</h2>
              <p className="subtitle mx-auto">
                Our core values guide everything we do, from product development to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`bg-[#f5f5f7] rounded-2xl transition-all duration-300 ${
                    index === 0
                      ? 'md:col-span-2 p-8 flex flex-col md:flex-row items-start gap-5'
                      : index === 3
                        ? 'md:col-span-2 p-8 flex flex-col md:flex-row items-start gap-5'
                        : 'p-6'
                  }`}
                >
                  <div className={`flex items-center justify-center bg-white text-[#1d1d1f] flex-shrink-0 ${
                    index === 0 || index === 3 ? 'w-14 h-14 rounded-2xl' : 'w-11 h-11 rounded-xl mb-4'
                  }`}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-[#1d1d1f] mb-2 ${index === 0 || index === 3 ? 'text-xl' : 'text-lg'}`}>{value.title}</h3>
                    <p className="text-[#86868b] text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Card Deck */}
        <TeamCardDeck team={team} />

        {/* Vision Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="heading-md text-[#1d1d1f] mb-6">Looking to the Future</h2>
                <p className="text-[#86868b] mb-6 text-sm leading-relaxed">
                  At VirtusCo, we envision a future where travel is truly seamless, where technology enhances the human experience rather than complicating it. Our autonomous porter robots are just the beginning of this journey.
                </p>
                <p className="text-[#86868b] mb-8 text-sm leading-relaxed">
                  We're committed to continuous innovation, expanding our solutions to address more challenges in the travel ecosystem and beyond.
                </p>
                <Button to="/contact" size="lg">Join Our Journey</Button>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-[#f5f5f7] rounded-2xl overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-[#1d1d1f] mb-6">Future Initiatives</h3>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-[#1d1d1f] mb-1">Global Expansion</h4>
                          <p className="text-sm text-[#86868b]">
                            Bringing our solutions to airports worldwide, adapting to regional needs.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-[#1d1d1f] mb-1">Enhanced Capabilities</h4>
                          <p className="text-sm text-[#86868b]">
                            Developing next-generation robots with expanded features and services.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-[#1d1d1f] mb-1">Beyond Airports</h4>
                          <p className="text-sm text-[#86868b]">
                            Exploring applications in other travel hubs, hotels, and urban environments.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-[#1d1d1f] mb-1">Integrated Ecosystem</h4>
                          <p className="text-sm text-[#86868b]">
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
        <section className="py-24 lg:py-32 bg-[#1d1d1f]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
              Join us in transforming travel
            </h2>
            <p className="text-[#86868b] text-lg max-w-2xl mx-auto mb-10">
              Whether you're an airport looking to enhance customer experience, an investor interested in our journey, or a talent wanting to join our team, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button to="/contact" className="bg-white text-[#1d1d1f] hover:bg-[#f5f5f7]" size="lg">
                Contact Us
              </Button>
              <Button to="/product" className="bg-transparent text-white border border-white hover:bg-white hover:text-[#1d1d1f]" size="lg">
                Explore Our Product
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
