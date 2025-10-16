import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, NavLink as RouterNavLink, useLocation, useMatch } from 'react-router-dom';
import { NAV_LINKS, CATEGORIES, ICONS, SOCIAL_LINKS } from '../constants';
import { NavLink } from '../types';
import { useSearch } from '../contexts/SearchContext';

const Dropdown: React.FC<{
  title: string;
  links: NavLink[];
  close: () => void;
  isScrolled: boolean;
  isActive: boolean;
}> = ({ title, links, close, isScrolled, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`group px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
            isActive
            ? (isScrolled ? 'bg-gray-100 text-primary' : 'bg-white text-primary shadow-sm')
            : (isScrolled ? 'text-text-alt hover:text-accent' : 'text-white hover:bg-white/20')
        }`}
      >
        {title}
        <svg className={`w-3 h-3 transition-all duration-300 group-hover:scale-125 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <div
        className={`absolute top-full mt-3 w-48 bg-white rounded-lg shadow-xl py-1 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        {links.map((link) => (
          <RouterNavLink
            key={link.path}
            to={link.path}
            end
            onClick={() => { close(); setIsOpen(false); }}
            className={({ isActive }) => `block px-4 py-2 text-sm transition-colors ${
              isActive ? 'font-semibold text-accent bg-accent/10' : 'text-text-alt hover:bg-highlight'
            }`}
          >
            {link.name}
          </RouterNavLink>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useSearch();
  const location = useLocation();
  const categoryMatch = useMatch('/category/:categoryName');
  
  // More robust logic for deriving active category state
  const activeCategory = useMemo(() => {
    if (!categoryMatch) return null;
    return CATEGORIES.find(cat => cat.path === categoryMatch.pathname);
  }, [categoryMatch]);

  const isProductSectionActive = !!activeCategory;
  const productsLinkTitle = activeCategory ? activeCategory.name : 'Products';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeAll = () => {
    setIsMenuOpen(false);
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? (isScrolled ? 'bg-gray-100 text-primary' : 'bg-white text-primary shadow-sm')
        : (isScrolled ? 'text-text-alt hover:text-accent' : 'text-white hover:bg-white/20')
    }`;

  const isSearchIconVisible = location.pathname !== '/' || isScrolled;


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : ''}`}>
        <div className="px-4 sm:px-6 lg:px-8">
            <nav className={`flex items-center justify-between mx-auto transition-all duration-500 ease-in-out ${isScrolled ? 'max-w-full py-3' : 'max-w-6xl py-4'}`}>
                {/* Left Side: Logo */}
                <div className="flex justify-start lg:flex-1">
                    <Link to="/" onClick={closeAll} className="flex-shrink-0">
                    <img className="h-10 w-auto" src="https://rudhraaexportsandimports.com/images/logo.webp" alt="Rudhraa Exports Logo" />
                    </Link>
                </div>

                {/* Center: Desktop Menu */}
                <div className="hidden lg:flex justify-center">
                    <div className={`flex items-center gap-1 p-1 rounded-full transition-all duration-300 ${isScrolled ? 'bg-transparent' : 'bg-white/20 backdrop-blur-lg'}`}>
                        {NAV_LINKS.map(link => (
                            <RouterNavLink key={link.path} to={link.path} className={navLinkClasses} end>
                                {link.name}
                            </RouterNavLink>
                        ))}
                        <Dropdown
                            title={productsLinkTitle}
                            links={CATEGORIES}
                            close={closeAll}
                            isScrolled={isScrolled}
                            isActive={isProductSectionActive}
                        />
                    </div>
                </div>
                
                {/* Right Side: CTA & Mobile Button */}
                <div className="flex items-center justify-end lg:flex-1 gap-2">
                    {/* Search Icon */}
                     <button
                        onClick={openModal}
                        aria-label="Open search"
                        className={`group p-2.5 rounded-full transition-all duration-300 ease-out transform ${isScrolled ? 'bg-highlight text-text-main hover:bg-gray-200' : 'bg-white/20 text-white hover:bg-white/30'} ${isSearchIconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                    >
                        <span className="w-5 h-5 block transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">{ICONS.search}</span>
                    </button>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center">
                        <Link to="/contact" onClick={closeAll} className="group px-5 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-hover flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200">
                        Get Started
                        <span className="w-4 h-4 block transition-transform duration-300 group-hover:translate-x-1">{ICONS.arrowRight}</span>
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(true)} aria-label="Open Menu" className="p-1 transition-transform duration-200 hover:scale-110">
                            <svg className={`w-6 h-6 ${isScrolled ? 'text-primary' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
      </header>
      
      {/* Mobile Menu Panel */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        closeMenu={closeAll}
        productPageTitle={productsLinkTitle}
        isProductPageActive={isProductSectionActive}
      />
    </>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<{ 
    isOpen: boolean; 
    closeMenu: () => void;
    productPageTitle: string;
    isProductPageActive: boolean;
}> = ({ isOpen, closeMenu, productPageTitle, isProductPageActive }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (name: string) => {
        setOpenAccordion(openAccordion === name ? null : name);
    };

    const handleClose = () => {
        setOpenAccordion(null);
        closeMenu();
    };

    return (
        <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="mobile-menu-title"
            className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
            <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white/90 backdrop-blur-xl shadow-lg p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 id="mobile-menu-title" className="sr-only">Main Menu</h2>
                <div className="flex justify-between items-center mb-10">
                    <Link to="/" onClick={handleClose}>
                        <img className="h-12 w-auto" src="https://rudhraaexportsandimports.com/images/logo.webp" alt="Rudhraa Exports Logo" />
                    </Link>
                    <button onClick={handleClose} aria-label="Close Menu" className="p-1 transition-transform duration-300 hover:rotate-90 hover:scale-125">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <nav className="flex flex-col space-y-2">
                    {NAV_LINKS.map((link, index) => (
                        <RouterNavLink key={link.name} to={link.path} onClick={handleClose} end className={({ isActive }) => `block py-3 text-lg transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'} ${isActive ? 'font-bold text-accent' : 'text-primary'}`} style={{ transitionDelay: `${100 + index * 50}ms` }}>{link.name}</RouterNavLink>
                    ))}
                    {/* Accordions */}
                    <MobileAccordion 
                        title={productPageTitle} 
                        links={CATEGORIES} 
                        isOpen={openAccordion === 'products'} 
                        toggle={() => toggleAccordion('products')} 
                        closeMenu={handleClose} 
                        delay={250} 
                        isPanelOpen={isOpen}
                        isActive={isProductPageActive}
                    />
                </nav>
                <div className={`mt-auto pt-6 border-t border-highlight transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: '400ms' }}>
                    <div className="flex justify-center items-center space-x-6">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-alt hover:text-accent transform hover:scale-110 transition-all duration-200"
                                aria-label={`Follow us on ${link.name}`}
                            >
                                <span className="sr-only">{link.name}</span>
                                <span className="block w-6 h-6">{link.icon}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MobileAccordion: React.FC<{ 
    title: string; 
    links: NavLink[]; 
    isOpen: boolean; 
    toggle: () => void; 
    closeMenu: () => void; 
    delay: number;
    isPanelOpen: boolean;
    isActive: boolean;
}> = ({ title, links, isOpen, toggle, closeMenu, delay, isPanelOpen, isActive }) => (
    <div className={`transition-all duration-300 ${isPanelOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{ transitionDelay: `${delay}ms`}}>
        <button onClick={toggle} aria-expanded={isOpen} className={`w-full flex justify-between items-center py-3 text-lg ${isActive ? 'font-bold text-accent' : 'text-primary'}`}>
            <span>{title}</span>
            <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="pl-4 border-l-2 border-highlight flex flex-col">
                {links.map(link => (
                     <RouterNavLink 
                        key={link.path} 
                        to={link.path} 
                        onClick={closeMenu} 
                        end
                        className={({ isActive }) => `block py-2 transition-colors ${
                            isActive ? 'text-accent font-semibold' : 'text-text-alt hover:text-accent'
                        }`}
                    >
                        {link.name}
                    </RouterNavLink>
                ))}
            </div>
        </div>
    </div>
);

export default Header;