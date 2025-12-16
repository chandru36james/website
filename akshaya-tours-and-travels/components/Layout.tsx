import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin, Facebook, Instagram, ChevronRight, Youtube } from 'lucide-react';
import { BUSINESS_NAME, PHONE_NUMBER, PHONE_NUMBER_SECONDARY, WHATSAPP_NUMBER, ADDRESS, ROUTES, SOCIAL_LINKS } from '../constants';
import { LayoutProps } from '../types';
import AnimatedTraffic from './AnimatedTraffic';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const NavLink: React.FC<NavItemProps> = ({ href, children, isActive, onClick, className = "" }) => (
  <a 
    href={href} 
    className={`text-sm font-medium transition-all duration-300 relative group py-2 px-1 tracking-wide cursor-pointer ${
      isActive ? 'text-primary' : 'text-body hover:text-primary'
    } ${className}`}
    onClick={onClick}
  >
    {children}
    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`}></span>
  </a>
);

const MobileNavLink: React.FC<NavItemProps> = ({ href, children, isActive, onClick }) => (
  <a 
    href={href} 
    className={`block px-6 py-3 text-base font-medium border-l-4 transition-all duration-200 cursor-pointer select-none ${
      isActive 
        ? 'border-primary text-primary bg-blue-50' 
        : 'border-transparent text-body hover:bg-gray-50 hover:text-primary hover:border-gray-200'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between pointer-events-none">
      {children}
      {isActive && <ChevronRight size={16} className="text-primary" />}
    </div>
  </a>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (newState) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = ''; // Unlock scroll
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Robust Navigation Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    const scrollToElement = () => {
      if (element) {
        // Offset for the sticky header (60px approx)
        const headerOffset = 65; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        try {
          if(window.history.pushState) {
              window.history.pushState(null, '', href);
          }
        } catch (error) {
          console.debug("Could not push state to history:", error);
        }
        setActiveSection(targetId);
      } else if (href === ROUTES.HOME) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      }
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  // Handle Scroll Effects and Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }

      const heroHeightThreshold = window.innerHeight * 0.7;
      setShowMobileCTA(window.scrollY > heroHeightThreshold);

      const sections = Object.values(ROUTES).map(route => route.replace('#', ''));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      
      if (current) setActiveSection(current);
    };

    // Intersection Observer for Footer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, [scrolled]); 

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-body overflow-x-hidden">
      
      {/* Modern Fixed Header - Height Stabilized */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors transition-shadow duration-300 w-full border-b py-2 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-gray-100' 
            : 'bg-white shadow-sm border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center relative">
          {/* Logo Lockup - Realigned & Stacked */}
          <a 
            href={ROUTES.HOME} 
            className="flex items-center gap-3 group relative z-[70] cursor-pointer" 
            onClick={(e) => handleNavClick(e, ROUTES.HOME)}
          >
            <img 
              src="https://akshayatoursandtravels.com/assets/logo.png" 
              alt="Akshaya Tours Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-brand font-bold text-black tracking-tight leading-none group-hover:text-accent transition-colors">
                AKSHAYA
              </h1>
              <span className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase leading-tight mt-0.5">
                Tours & Travels
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-5 lg:gap-8 items-center">
            <NavLink href={ROUTES.HOME} isActive={activeSection === 'home'} onClick={(e) => handleNavClick(e, ROUTES.HOME)}>Home</NavLink>
            <NavLink href={ROUTES.ABOUT} isActive={activeSection === 'about'} onClick={(e) => handleNavClick(e, ROUTES.ABOUT)}>About</NavLink>
            <NavLink href={ROUTES.SERVICES} isActive={activeSection === 'services'} onClick={(e) => handleNavClick(e, ROUTES.SERVICES)}>Services</NavLink>
            <NavLink href={ROUTES.DESTINATIONS} isActive={activeSection === 'destinations'} onClick={(e) => handleNavClick(e, ROUTES.DESTINATIONS)}>Packages</NavLink>
            <NavLink href={ROUTES.PRICING} isActive={activeSection === 'pricing'} onClick={(e) => handleNavClick(e, ROUTES.PRICING)}>Tariff</NavLink>
            <NavLink href={ROUTES.GALLERY} isActive={activeSection === 'gallery'} onClick={(e) => handleNavClick(e, ROUTES.GALLERY)}>Gallery</NavLink>
            <NavLink href={ROUTES.CONTACT} isActive={activeSection === 'contact'} onClick={(e) => handleNavClick(e, ROUTES.CONTACT)}>Contact</NavLink>
            
            <a 
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
              className="ml-2 bg-accent text-white px-5 py-2 rounded-full font-heading font-semibold text-sm hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Phone size={16} /> Book Vehicle
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-primary transition bg-gray-50 rounded-lg active:scale-95 z-[110] cursor-pointer relative" 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
             {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[100] w-[320px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header - Consistent Lockup */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
           <div className="flex items-center gap-3">
              <img src="https://akshayatoursandtravels.com/assets/logo.png" alt="Logo" className="h-10 w-auto" />
              <div className="flex flex-col justify-center">
                <span className="text-lg font-brand font-bold text-black tracking-tight leading-none">
                  AKSHAYA
                </span>
                 <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gray-500 uppercase leading-tight mt-0.5">
                  Tours & Travels
                </span>
              </div>
           </div>
           <button 
             onClick={closeMenu}
             className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
             aria-label="Close Menu"
           >
             <X size={24} />
           </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto py-2 bg-white">
            <MobileNavLink href={ROUTES.HOME} isActive={activeSection === 'home'} onClick={(e) => handleNavClick(e, ROUTES.HOME)}>Home</MobileNavLink>
            <MobileNavLink href={ROUTES.ABOUT} isActive={activeSection === 'about'} onClick={(e) => handleNavClick(e, ROUTES.ABOUT)}>About Us</MobileNavLink>
            <MobileNavLink href={ROUTES.SERVICES} isActive={activeSection === 'services'} onClick={(e) => handleNavClick(e, ROUTES.SERVICES)}>Our Services</MobileNavLink>
            <MobileNavLink href={ROUTES.DESTINATIONS} isActive={activeSection === 'destinations'} onClick={(e) => handleNavClick(e, ROUTES.DESTINATIONS)}>Tour Packages</MobileNavLink>
            <MobileNavLink href={ROUTES.PRICING} isActive={activeSection === 'pricing'} onClick={(e) => handleNavClick(e, ROUTES.PRICING)}>Tariff Plans</MobileNavLink>
            <MobileNavLink href={ROUTES.GALLERY} isActive={activeSection === 'gallery'} onClick={(e) => handleNavClick(e, ROUTES.GALLERY)}>Photo Gallery</MobileNavLink>
            <MobileNavLink href={ROUTES.CONTACT} isActive={activeSection === 'contact'} onClick={(e) => handleNavClick(e, ROUTES.CONTACT)}>Contact Us</MobileNavLink>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a 
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
              className="col-span-1 bg-white border border-gray-200 text-body py-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 shadow-sm active:scale-95 transition hover:border-accent hover:text-accent cursor-pointer"
            >
              <Phone size={18} className="text-accent" /> Call Now
            </a>
              <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              className="col-span-1 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 shadow-md active:scale-95 transition hover:bg-[#20bd5a] cursor-pointer"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
          
          <div className="flex justify-center gap-8 text-gray-400">
             <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition p-1"><Facebook size={22} /></a>
             <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition p-1"><Instagram size={22} /></a>
             <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition p-1"><Youtube size={22} /></a>
          </div>
        </div>
      </div>

      {/* Main Content with Top Padding for Fixed Header */}
      <main className="flex-grow pt-[60px]">
        {children}
        <AnimatedTraffic />
      </main>

      {/* Enhanced Footer */}
      <footer ref={footerRef} className="bg-primary text-blue-100 pt-16 pb-8 relative overflow-hidden">
        {/* Background Decorative Orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Info */}
            <div className="lg:col-span-1">
              <a 
                href={ROUTES.HOME} 
                onClick={(e) => handleNavClick(e, ROUTES.HOME)}
                className="flex items-center gap-3 mb-6 group cursor-pointer"
              >
                 <img src="https://akshayatoursandtravels.com/assets/logo.png" alt="Akshaya Tours" className="h-12 w-auto" />
                 <h3 className="text-2xl font-brand font-bold text-white tracking-wide group-hover:text-accent transition-colors">{BUSINESS_NAME}</h3>
              </a>
              <p className="mb-6 text-blue-200 text-sm leading-relaxed max-w-sm">
                Trusted travel partner in Tambaram, Chennai. We specialize in local rentals, outstation packages, and airport transfers with premium vehicles.
              </p>
              <div className="flex gap-3">
                 <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition duration-300 backdrop-blur-sm">
                   <Facebook size={18} />
                 </a>
                 <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition duration-300 backdrop-blur-sm">
                   <Instagram size={18} />
                 </a>
                 <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition duration-300 backdrop-blur-sm">
                   <Youtube size={18} />
                 </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <li><a href={ROUTES.ABOUT} onClick={(e) => handleNavClick(e, ROUTES.ABOUT)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> About Us</a></li>
                <li><a href={ROUTES.SERVICES} onClick={(e) => handleNavClick(e, ROUTES.SERVICES)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> Services</a></li>
                <li><a href={ROUTES.DESTINATIONS} onClick={(e) => handleNavClick(e, ROUTES.DESTINATIONS)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> Packages</a></li>
                <li><a href={ROUTES.PRICING} onClick={(e) => handleNavClick(e, ROUTES.PRICING)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> Tariff</a></li>
                <li><a href={ROUTES.GALLERY} onClick={(e) => handleNavClick(e, ROUTES.GALLERY)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> Gallery</a></li>
                <li><a href={ROUTES.CONTACT} onClick={(e) => handleNavClick(e, ROUTES.CONTACT)} className="hover:text-accent transition flex items-center gap-2 cursor-pointer group"><ChevronRight size={14} className="text-secondary group-hover:text-accent" /> Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-6 relative inline-block">
                Contact Info
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h4>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 text-accent flex-shrink-0" size={18} />
                    <span className="text-blue-100">{ADDRESS}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-1 text-accent flex-shrink-0" size={18} />
                    <div className="flex flex-col">
                      <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-white transition font-bold">{PHONE_NUMBER}</a>
                      <a href={`tel:${PHONE_NUMBER_SECONDARY.replace(/\s/g, '')}`} className="hover:text-white transition">{PHONE_NUMBER_SECONDARY}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.</p>
            </div>
            
            <a 
              href="https://vgotyou.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-xs font-medium text-white backdrop-blur-sm border border-white/10"
            >
              <span>Designed by</span>
              <span className="font-bold text-accent">VGotYou</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTAs - Visible only when Footer is NOT visible */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[80] flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${
          showMobileCTA && !isFooterVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a 
          href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
          className="flex-1 bg-white text-body py-3.5 flex items-center justify-center gap-2 font-bold hover:bg-gray-50 border-t border-gray-200 cursor-pointer"
        >
          <Phone size={20} className="text-accent" /> <span className="text-sm">Call Now</span>
        </a>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%20want%20to%20book%20a%20vehicle.`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white py-3.5 flex items-center justify-center gap-2 font-bold hover:bg-[#20bd5a] cursor-pointer"
        >
          <MessageCircle size={20} /> <span className="text-sm">WhatsApp</span>
        </a>
      </div>

      {/* Floating WhatsApp for Desktop - Hides when footer is visible */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%20want%20to%20book%20a%20vehicle.`}
        target="_blank" 
        rel="noopener noreferrer"
        className={`hidden md:flex fixed bottom-8 right-8 bg-[#25D366] text-white w-14 h-14 rounded-full items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 z-40 animate-bounce-slow cursor-pointer ${
          isFooterVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

export default Layout;