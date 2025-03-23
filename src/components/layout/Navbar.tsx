
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Service', path: '/service' },
    { name: 'About', path: '/about' },
    { name: 'Investor', path: '/investor' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'glass-nav py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="text-2xl font-bold text-virtus-primary tracking-tight flex items-center"
            >
              <span className="bg-virtus-primary text-white px-2 py-1 rounded mr-1">V</span>
              <span>VirtusCo</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              index === 0 ? null : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    relative text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-virtus-primary' 
                      : 'text-gray-700 hover:text-virtus-primary'
                    }
                    after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] 
                    after:w-full after:origin-bottom-right after:scale-x-0 
                    after:bg-virtus-primary after:transition-transform 
                    after:duration-300 hover:after:origin-bottom-left 
                    hover:after:scale-x-100
                    ${isActive ? 'after:scale-x-100' : ''}
                  `}
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex">
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 bg-virtus-primary text-white rounded-full font-medium transition-all hover:bg-opacity-90 btn-hover-effect"
            >
              Get Demo
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        } glass-nav mt-2`}
      >
        <div className="px-4 pt-3 pb-3 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                block py-2 px-3 rounded-lg text-base font-medium
                ${isActive 
                  ? 'text-white bg-virtus-primary' 
                  : 'text-gray-700 hover:bg-virtus-primary/10'
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="block w-full text-center py-2 px-3 bg-virtus-primary text-white rounded-lg font-medium transition-all hover:bg-opacity-90"
          >
            Get Demo
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
