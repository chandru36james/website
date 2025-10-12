import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';

interface HeaderProps {
  activeIndex: number;
  scrollToSection: (index: number) => void;
  isLoaded?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeIndex, scrollToSection, isLoaded }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections with dark backgrounds where light text is needed
  // For mobile, we check scrolled state first
  const hasDarkBg = !isScrolled && [0, 2, 4, 7].includes(activeIndex);

  const navLinks = [
    { name: 'Home', index: 0 },
    { name: 'About Us', index: 1 },
    { name: 'Services', index: 2 },
    { name: 'Portfolio', index: 3 },
    { name: 'Testimonials', index: 4 },
    { name: 'Blog', index: 5 },
    { name: 'Contact Us', index: 6 },
  ];
  
  const handleLinkClick = (index: number) => {
    scrollToSection(index);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <button 
                onClick={() => handleLinkClick(0)} 
                aria-label="Go to homepage" 
                className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              >
                <img 
                  src="https://bloomgreen.netlify.app/assets/logo.png" 
                  alt="Bloom Green Logo" 
                  className="h-10 w-auto transition-all duration-300"
                />
              </button>
            </div>
            <nav className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.index)}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 ease-out 
                      ${!hasDarkBg ? 'text-gray-700 hover:text-brand-gold' : 'text-gray-100 hover:text-white'} 
                      ${activeIndex === link.index && (!hasDarkBg ? 'text-brand-gold' : 'text-white font-semibold')}
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`
                    }
                    style={{ transitionDelay: `${100 + index * 75}ms` }}
                  >
                    {link.name}
                    {activeIndex === link.index && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${hasDarkBg ? 'bg-white' : 'bg-brand-gold'}`}></span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
            <div className="hidden lg:block">
              <button
                onClick={() => handleLinkClick(6)}
                className={`btn-slide-hover ${hasDarkBg ? 'slide-white border-white text-white' : 'slide-gold border-brand-gold text-brand-gold'} ml-4 px-6 py-2 border rounded-full text-sm font-medium transition-all duration-500 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`
              }
                style={{ transitionDelay: `${100 + navLinks.length * 75}ms` }}
              >
                <span>Get a Quote</span>
              </button>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className={`${!hasDarkBg ? 'text-brand-dark' : 'text-white'} transform transition-transform duration-300 hover:scale-110`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-brand-dark bg-opacity-95 z-[60] flex flex-col items-center justify-center transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2">
            <CloseIcon className="w-8 h-8" />
          </button>
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => handleLinkClick(link.index)} className={`text-2xl font-playfair transition-colors ${activeIndex === link.index ? 'text-brand-gold' : 'text-white hover:text-brand-gold'}`}>
                {link.name}
              </button>
            ))}
          </nav>
          <button onClick={() => handleLinkClick(6)} className="btn-slide-hover slide-gold mt-8 px-6 py-3 border border-brand-gold text-brand-gold rounded-full text-lg font-medium transition-all duration-300">
            <span>Get a Quote</span>
          </button>
        </div>
    </>
  );
};

export default Header;