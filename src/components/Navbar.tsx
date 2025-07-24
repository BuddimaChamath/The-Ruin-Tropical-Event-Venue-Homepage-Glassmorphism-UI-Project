import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({
  activeSection
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuAnimating, setMobileMenuAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set sticky state
      setIsSticky(currentScrollY > 50);
      
      // Handle navbar visibility
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
        // Close mobile menu if it's open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuAnimating(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setMobileMenuAnimating(false);
      }, 300);
    } else {
      setMobileMenuOpen(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isSticky 
        ? 'bg-black/20 backdrop-blur-lg shadow-lg py-3' 
        : 'bg-black/10 backdrop-blur-md py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center" onClick={e => {
          e.preventDefault();
          scrollToSection('hero');
        }}>
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
            <img 
              src="/ruin.png" 
              alt="The Ruin Logo" 
              className="h-10 md:h-12 transition-transform duration-300 hover:scale-105 drop-shadow-lg" 
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {[{
            id: 'about',
            label: 'About'
          }, {
            id: 'booking',
            label: 'Book Now'
          }, {
            id: 'services',
            label: 'Services'
          }].map(item => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)} 
              className={`text-base font-medium transition-all duration-300 relative px-4 py-2 rounded-full ${
                activeSection === item.id 
                  ? 'text-[#D4AF37] bg-white/20 backdrop-blur-sm shadow-lg [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]' 
                  : 'text-white hover:text-[#D4AF37] hover:bg-white/10 backdrop-blur-sm [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]'
              } focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-opacity-50`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-opacity-50 rounded-full p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300" 
          onClick={toggleMobileMenu} 
          aria-expanded={mobileMenuOpen} 
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <XIcon className="text-white drop-shadow-lg" />
          ) : (
            <MenuIcon className="text-white drop-shadow-lg" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {(mobileMenuOpen || mobileMenuAnimating) && (
        <div className={`md:hidden bg-black/30 backdrop-blur-lg shadow-xl absolute top-full left-0 w-full transition-all duration-300 transform z-40 ${
          mobileMenuAnimating && !mobileMenuOpen 
            ? 'opacity-0 -translate-y-4' 
            : 'opacity-100 translate-y-0'
        }`}>
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {[{
                id: 'about',
                label: 'About'
              }, {
                id: 'services',
                label: 'Services'
              }, {
                id: 'booking',
                label: 'Book Now'
              }].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)} 
                  className={`text-base font-medium py-3 px-4 rounded-lg transition-all duration-300 relative ${
                    activeSection === item.id 
                      ? 'text-[#D4AF37] bg-white/20 backdrop-blur-sm shadow-lg [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]' 
                      : 'text-white hover:text-[#D4AF37] hover:bg-white/10 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]'
                  } focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-opacity-50`}
                >
                  {item.label}
                  <span className={`absolute left-0 top-0 h-full w-1 bg-[#D4AF37] rounded-r-full transform transition-opacity duration-300 ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-0'
                  }`}></span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;