
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { XIcon } from "@/components/icons/x-icon";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';

interface SocialLink {
  platform: 'linkedin' | 'x' | 'instagram';
  url: string;
}

interface OtherFounder {
  name: string;
  role: string;
  slug: string;
}

interface FounderLayoutProps {
  name: string;
  role: string;
  image: string;
  paragraphs: string[];
  quote: string;
  socialLinks: SocialLink[];
}

const allFounders: OtherFounder[] = [
  { name: 'Antony Austin', role: 'Founder', slug: '/founders/antony-austin' },
  { name: 'A. Azeem Kouther', role: 'Founder', slug: '/founders/azeem-kouther' },
  { name: 'Allen George Thomas', role: 'Founder', slug: '/founders/allen-george-thomas' },
  { name: 'Alwin George Thomas', role: 'Founder', slug: '/founders/alwin-george-thomas' },
  { name: 'Danush Krishna', role: 'Founder', slug: '/founders/danush-krishna' },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const SocialIcon = ({ link }: { link: SocialLink }) => {
  if (link.platform === 'linkedin') {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 bg-[#f5f5f7] rounded-full text-[#86868b] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        <span className="text-xs font-medium">LinkedIn</span>
      </a>
    );
  }
  if (link.platform === 'x') {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 bg-[#f5f5f7] rounded-full text-[#86868b] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300">
        <XIcon className="h-4 w-4" />
        <span className="text-xs font-medium">X</span>
      </a>
    );
  }
  if (link.platform === 'instagram') {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 bg-[#f5f5f7] rounded-full text-[#86868b] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
        <span className="text-xs font-medium">Instagram</span>
      </a>
    );
  }
  return null;
};

const FounderLayout = ({ name, role, image, paragraphs, quote, socialLinks }: FounderLayoutProps) => {
  useScrollToTop();
  const otherFounders = allFounders.filter(f => f.name !== name);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-[#f5f5f7] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <Link to="/about" className="inline-flex items-center text-[#86868b] hover:text-[#1d1d1f] transition-colors mb-10 group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to About</span>
              </Link>
            </FadeIn>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <FadeIn delay={100} className="w-full lg:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/50 rounded-[2rem] blur-2xl" />
                  <img
                    src={image}
                    alt={name}
                    className="relative rounded-3xl w-full max-w-md mx-auto object-cover aspect-[3/4]"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={250} className="w-full lg:w-3/5 text-center lg:text-left">
                <p className="text-xs font-medium text-[#86868b] tracking-widest uppercase mb-3">{role}</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-6" style={{ letterSpacing: '-0.03em' }}>
                  {name}
                </h1>
                <p className="text-lg text-[#86868b] leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {paragraphs[0]}
                </p>

                <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
                  {socialLinks.map((link) => (
                    <SocialIcon key={link.platform} link={link} />
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {paragraphs.slice(1).map((para, index) => (
              <FadeIn key={index} delay={index * 120}>
                <p className="text-[#3c3c43] text-base leading-relaxed mb-8">{para}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 lg:py-28 bg-[#1d1d1f]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="relative">
                <div className="absolute -top-6 left-0 text-7xl text-[#424245] font-serif select-none">&ldquo;</div>
                <blockquote className="relative pt-8 pl-2">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                    {quote}
                  </p>
                  <footer className="mt-8">
                    <p className="text-[#86868b] text-sm">&mdash; {name}</p>
                  </footer>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Other Founders */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-10 text-center" style={{ letterSpacing: '-0.02em' }}>
                Meet the rest of the team
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherFounders.map((founder, index) => (
                <FadeIn key={founder.slug} delay={index * 80}>
                  <Link
                    to={founder.slug}
                    className="group flex items-center justify-between p-5 bg-[#f5f5f7] rounded-2xl hover:bg-[#e8e8ed] transition-all duration-300"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3">
                        <span className="text-sm font-semibold text-[#1d1d1f]">
                          {founder.name.split(' ').map(part => part[0]).join('')}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1d1d1f]">{founder.name}</h3>
                      <p className="text-xs text-[#86868b]">{founder.role}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-1 transition-all" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FounderLayout;
