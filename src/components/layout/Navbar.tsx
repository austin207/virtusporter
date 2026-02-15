
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import CartButton from '../CartButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // When mobile menu is open, prevent body scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Service', path: '/service' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Virtue', path: '/virtue'},
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3'
          : 'bg-transparent py-4'
      }`}
      style={{ position: 'fixed', width: '100%' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center space-x-2"
            >
              <img src="/favicon.ico" alt="VirtusCo" className="w-7 h-10" />
              <span className="text-xl font-semibold text-[#1d1d1f] tracking-tight">VirtusCo</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  text-xs font-normal transition-colors
                  ${isActive
                    ? 'text-[#1d1d1f]'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Contact Button and Auth */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 bg-[#1d1d1f] text-white rounded-full text-xs font-medium transition-all hover:bg-[#424245]"
            >
              Get Demo
            </NavLink>
            <CartButton />
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1d1d1f] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[56px] left-0 right-0 bottom-0 transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } bg-white`}
        style={{ maxHeight: 'calc(100vh - 56px)' }}
      >
        <div className="px-4 pt-3 pb-3 space-y-1 max-h-full overflow-y-scroll">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                block py-3 px-3 rounded-lg text-sm font-normal
                ${isActive
                  ? 'text-[#1d1d1f] font-medium'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center py-3 px-3 bg-[#1d1d1f] text-white rounded-full text-sm font-medium transition-all hover:bg-[#424245] mt-4"
          >
            Get Demo
          </NavLink>
          <div className="mt-2">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
