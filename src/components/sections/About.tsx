
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  slug: string;
}

const HomeTeamCardDeck = ({ team }: { team: TeamMember[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % team.length);
  }, [activeIndex, team.length, goTo]);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + team.length) % team.length);
  }, [activeIndex, team.length, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

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
      return { transform: 'translateX(40px) scale(0.93) rotateZ(2deg)', zIndex: 5, opacity: 0.7, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
    }
    if (wrappedDiff === -1 || wrappedDiff === team.length - 1) {
      return { transform: 'translateX(-40px) scale(0.93) rotateZ(-2deg)', zIndex: 5, opacity: 0.7, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
    }
    if (wrappedDiff === 2) {
      return { transform: 'translateX(70px) scale(0.86) rotateZ(4deg)', zIndex: 2, opacity: 0.4, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
    }
    if (wrappedDiff === -2) {
      return { transform: 'translateX(-70px) scale(0.86) rotateZ(-4deg)', zIndex: 2, opacity: 0.4, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
    }
    return { transform: 'translateX(0) scale(0.8)', zIndex: 0, opacity: 0, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-sm h-[380px] mb-8 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {team.map((m, index) => (
          <div key={m.name} className="absolute inset-0 will-change-transform" style={getCardStyle(index)}>
            <Link
              to={m.slug}
              className="block h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              onClick={(e) => { if (index !== activeIndex) { e.preventDefault(); goTo(index); } }}
              draggable={false}
            >
              <div className="h-40 bg-[#e8e8ed] flex items-center justify-center">
                <div className="w-18 h-18 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl font-semibold text-[#1d1d1f]">
                    {m.name.split(' ').map(part => part[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-0.5">{m.name}</h3>
                <p className="text-xs text-[#86868b] font-medium mb-3">{m.role}</p>
                <p className="text-[#86868b] text-sm line-clamp-3">{m.bio}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#1d1d1f]' : 'w-1.5 bg-[#d2d2d7] hover:bg-[#86868b]'}`}
              aria-label={`Go to ${team[i].name}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="mt-4 text-sm text-[#86868b]">
        {team[activeIndex].name} &middot; <Link to={team[activeIndex].slug} className="text-[#1d1d1f] hover:underline">View profile</Link>
      </p>
    </div>
  );
};

const About = () => {
  const team: TeamMember[] = [
    {
      name: 'Antony Austin',
      role: 'Founder',
      image: '/Austin.jpeg',
      bio: "Robotics engineer with extensive experience in autonomous systems, embedded systems and AI.",
      slug: '/founders/antony-austin'
    },
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
      bio: "Financial strategist with expertise in investment planning and revenue modeling.",
      slug: '/founders/alwin-george-thomas'
    },
    {
      name: 'Danush Krishna',
      role: 'Founder',
      image: '/Danush.jpg',
      bio: "Robotics engineer with expertise in hardware and embedded systems.",
      slug: '/founders/danush-krishna'
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Mission & Vision */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20" delay={100}>
          <h2 className="heading-lg text-[#1d1d1f] mb-4">Democratizing Robotics</h2>
          <p className="subtitle mx-auto mb-6">
            Bridging the gap between those with resources and those without,
            while building tailored robotic solutions for any industry.
          </p>
          <div className="p-8 bg-[#f5f5f7] rounded-2xl mt-8 mb-8">
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Our Vision</h3>
            <p className="text-[#86868b] text-sm leading-relaxed">
              At VirtusCo, we're committed to democratizing robotics and making automation
              accessible to businesses of all sizes. Our innovative solutions emerged from years of research,
              with a focus on creating technology that's genuinely helpful and accessible to everyone.
            </p>
          </div>
          <Button to="/about" size="lg">Learn More About Us</Button>
        </AnimatedSection>

        {/* Team Section */}
        <div>
          <AnimatedSection className="text-center mb-16" delay={400}>
            <h3 className="heading-md text-[#1d1d1f] mb-4">Meet Our Founding Team</h3>
            <p className="subtitle mx-auto">
              The visionary minds behind VirtusCo, bringing together expertise in robotics,
              design, operations, and strategic planning.
            </p>
          </AnimatedSection>

          <HomeTeamCardDeck team={team} />
        </div>
      </div>
    </section>
  );
};

export default About;
