import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon } from '../common/Icons';
import { useTheme } from '../common/ThemeProvider';
import { SunIcon, MoonIcon } from 'lucide-react';

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const ThemeToggle: React.FC<{ forceDark?: boolean }> = ({ forceDark }) => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-[10px] transition-all active:scale-90 overflow-hidden border ${
                forceDark 
                    ? 'bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 border-zinc-200 dark:border-zinc-800'
            }`}
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                {theme === 'light' ? (
                    <m.div
                        key="mooon"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MoonIcon className="w-4 h-4" />
                    </m.div>
                ) : (
                    <m.div
                        key="sun"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SunIcon className="w-4 h-4" />
                    </m.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const underlineClassName = (isActive: boolean) => `absolute -bottom-1 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-center`;

const ServicesDropdown: React.FC<{ onClick?: () => void; forceDark?: boolean }> = ({ onClick, forceDark }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => setIsOpen(false), 200);
    };

    const services = [
        { label: 'Web Design', path: '/web-design' },
        { label: 'Logo Design', path: '/logo-showcase' },
        { label: 'SEO Excellence', path: '/seo-services' }, 
        { label: 'Digital Marketing', path: '/digital-marketing' },
        { label: 'About Us', path: '/about' }
    ];

    return (
        <div 
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={`flex items-center gap-1.5 transition-colors py-2 uppercase tracking-widest font-bold text-[11px] lg:text-[13px] ${forceDark ? 'hover:text-zinc-300' : 'hover:text-zinc-900 dark:hover:text-zinc-300'}`}>
                SERVICES
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-[10px] overflow-hidden z-50 p-2"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50"></div>
                        {services.map((service) => (
                            <Link
                                key={service.label}
                                to={service.path}
                                onClick={() => { setIsOpen(false); if(onClick) onClick(); }}
                                className="block px-4 py-3 text-xs uppercase tracking-widest font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all border-b border-zinc-50 dark:border-zinc-900/50 last:border-0"
                            >
                                <span className="text-red-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                                {service.label}
                            </Link>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NavLinks: React.FC<{className?: string; onClick?: () => void; forceDark?: boolean}> = ({ className, onClick, forceDark }) => {
    const linkBaseClass = `relative group ${className}`;
    
    return (
        <>
            <NavLink to="/" className={linkBaseClass} onClick={onClick} end>
                {({isActive}) => (
                    <>
                        Home
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
            <NavLink to="/portfolio" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Portfolio
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
            
            {/* Desktop Service Dropdown (Now includes Blog) */}
            <div className="hidden md:block">
                <ServicesDropdown onClick={onClick} forceDark={forceDark} />
            </div>

            <NavLink to="/blog" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Our Blog
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
        </>
    );
};

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const googleLink = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur&stick=H4sIAAAAAAAA_-NgU1I1qEhMMzVLMzNJtjS3NDY2MTK3MqhISjQ1TU6zMLGwME4xTjNKXsSqEeaeX6IQmV-q8KhhskJ4apKCS2pxZnqegnN-bkFiXqVCZp5CdmJRaREAmWh1LVQAAAA&hl=en&mat=CTYW_efeDqo4ElcBTVDHnjSrL1i_VTCa8_kuXYpK1iyu8maHPcIxMv-VA5S0wxGQN2FTkjTuTCQOIc3qOOv2BGOZtzpI4JPgrHCDZf5fjf6TpSzgZ-TLIOOTRC7snP24iCY&authuser=0";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            window.dispatchEvent(new CustomEvent('mobile-menu-change', { detail: true }));
        } else {
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('mobile-menu-change', { detail: false }));
            setMobileServicesOpen(false); // Reset mobile state on close
        }
        return () => {
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('mobile-menu-change', { detail: false }));
        };
    }, [isMenuOpen]);

    const isHeaderActive = isScrolled || !isHomePage;
    const headerBg = isHeaderActive 
        ? 'bg-white/80 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-100 dark:border-white/5 shadow-sm dark:shadow-none' 
        : 'bg-transparent';

    const menuVariants: any = {
        closed: { opacity: 0, x: '100%' },
        open: { 
            opacity: 1, 
            x: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.1 }
        }
    };

    const linkVariants: any = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    const forceDarkColors = isHomePage && !isScrolled;

    return (
        <>
            <header 
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] md:w-[90%] lg:w-[85%] xl:w-[65%] max-w-5xl z-50 transition-all duration-300 ${headerBg} rounded-[10px] p-2`}
            >
                <div className="flex justify-between items-center px-2 md:px-6">
                    <NavLink to="/" className={`text-2xl font-bold flex items-center gap-2 ${forceDarkColors ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                         <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You Logo" className={`h-7 w-7 md:h-8 md:w-8 object-contain transition-all duration-500 ${forceDarkColors ? 'invert-0' : 'invert dark:invert-0'}`} />
                         <span className="font-cambria text-lg md:text-xl shrink-0">VGot You</span>
                    </NavLink>
                    
                    <nav className={`hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10 font-medium text-[11px] lg:text-[13px] uppercase tracking-widest ${forceDarkColors ? 'text-white' : 'text-zinc-700 dark:text-white'}`}>
                        <NavLinks 
                            forceDark={forceDarkColors}
                            className={forceDarkColors ? "transition-colors hover:text-zinc-300" : "transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"} 
                        />
                    </nav>
 
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        <ThemeToggle forceDark={forceDarkColors} />
                        <Link
                          to="/contact"
                          className={`font-bold py-2 px-4 lg:py-2.5 lg:px-6 rounded-[10px] transition-all active:scale-95 text-[9px] lg:text-xs uppercase tracking-widest shrink-0 border ${
                            forceDarkColors
                              ? 'bg-white text-black hover:bg-red-600 hover:text-white border-transparent'
                              : 'bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white border-zinc-900 dark:border-transparent'
                          }`}
                        >
                          Contact
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className={`z-[60] p-2 active:scale-90 transition-transform ${forceDarkColors ? 'text-white' : 'text-zinc-900 dark:text-white'}`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <div className="space-y-1.5">
                                    <div className={`w-5 h-0.5 ${forceDarkColors ? 'bg-white' : 'bg-zinc-950 dark:bg-white'}`}></div>
                                    <div className="w-5 h-0.5 bg-red-600"></div>
                                    <div className={`w-3 h-0.5 ${forceDarkColors ? 'bg-white' : 'bg-zinc-950 dark:bg-white'} ml-auto`}></div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <m.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 w-full h-[100dvh] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white z-50 md:hidden flex flex-col justify-between select-none"
                    >
                        {/* Clean minimal top bar */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-900">
                            <span className="font-sans text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Navigation Menu</span>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Middle List (Simple navigation links) */}
                        <div className="px-8 py-8 flex-grow flex flex-col justify-center space-y-6">
                            <nav className="flex flex-col space-y-5 w-full">
                                <m.div variants={linkVariants}>
                                    <NavLink 
                                        to="/" 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className={({isActive}) => `text-xl font-bold tracking-tight block ${isActive ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        Home
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink 
                                        to="/portfolio" 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className={({isActive}) => `text-xl font-bold tracking-tight block ${isActive ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        Portfolio
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants} className="w-full">
                                    <button 
                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                        className={`flex items-center justify-between w-full text-xl font-bold tracking-tight ${mobileServicesOpen ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        <span>Services</span>
                                        <svg className={`w-4 h-4 transform transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {mobileServicesOpen && (
                                            <m.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 mt-2 space-y-2 border-l border-zinc-100 dark:border-zinc-900"
                                            >
                                                {[
                                                    { label: 'Web Design', path: '/web-design' },
                                                    { label: 'Logo & Brand', path: '/logo-showcase' },
                                                    { label: 'SEO Services', path: '/seo-services' },
                                                    { label: 'Digital Marketing', path: '/digital-marketing' },
                                                    { label: 'About Us', path: '/about' }
                                                ].map((s) => (
                                                    <Link 
                                                        key={s.label}
                                                        to={s.path} 
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-colors py-1"
                                                    >
                                                        {s.label}
                                                    </Link>
                                                ))}
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink 
                                        to="/blog" 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className={({isActive}) => `text-xl font-bold tracking-tight block ${isActive ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        Blog
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink 
                                        to="/contact" 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className={({isActive}) => `text-xl font-bold tracking-tight block ${isActive ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        Contact
                                    </NavLink>
                                </m.div>
                            </nav>
                        </div>

                        {/* Clean Bottom Strip with Adaptive Theme Switch and Social Icons */}
                        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 w-full flex justify-between items-center bg-zinc-50 dark:bg-zinc-950/40">
                            <ThemeToggle />
                            
                            <div className="flex gap-4">
                                {[
                                    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/vgotyou/" },
                                    { icon: GitHubIcon, href: "https://github.com/chandru36james/" },
                                    { icon: InstagramIcon, href: "https://www.instagram.com/vgot_you/" },
                                    { icon: GoogleIcon, href: googleLink }
                                ].map((social, i) => (
                                    <a 
                                        key={i} 
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-500 active:scale-90 transition-all p-1"
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>

                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">vgotyou.com</span>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
