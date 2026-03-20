
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon } from './Icons';

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const underlineClassName = (isActive: boolean) => `absolute -bottom-1 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-center`;

const ServicesDropdown: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
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
            <button className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors py-2 uppercase tracking-widest font-bold text-[11px] lg:text-[13px]">
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
                        className="absolute top-full left-0 mt-2 w-56 bg-zinc-950 border border-zinc-800 shadow-2xl rounded-sm overflow-hidden z-50 p-2"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50"></div>
                        {services.map((service) => (
                            <Link
                                key={service.label}
                                to={service.path}
                                onClick={() => { setIsOpen(false); if(onClick) onClick(); }}
                                className="block px-4 py-3 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all border-b border-zinc-900/50 last:border-0"
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

const NavLinks: React.FC<{className?: string; onClick?: () => void;}> = ({ className, onClick }) => {
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
                <ServicesDropdown onClick={onClick} />
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
        } else {
            document.body.style.overflow = '';
            setMobileServicesOpen(false); // Reset mobile state on close
        }
    }, [isMenuOpen]);

    const isHeaderActive = isScrolled || !isHomePage;
    const headerBg = isHeaderActive ? 'bg-zinc-950/90 backdrop-blur-md border border-white/5' : 'bg-transparent';

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

    return (
        <>
            <header 
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] lg:w-[65%] max-w-5xl z-50 transition-all duration-300 ${headerBg} rounded-full p-2`}
            >
                <div className="flex justify-between items-center px-4 md:px-6">
                    <NavLink to="/" className="text-2xl font-bold flex items-center gap-2 text-white">
                         <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You Logo" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
                         <span className="font-cambria text-lg md:text-xl">VGot You</span>
                    </NavLink>
                    
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 text-white font-medium text-[11px] lg:text-[13px] uppercase tracking-widest">
                        <NavLinks className="transition-colors hover:text-zinc-300" />
                    </nav>

                    <Link
                      to="/contact"
                      className="hidden md:inline-block font-bold py-2 px-5 lg:py-2.5 lg:px-6 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-all active:scale-95 text-[10px] lg:text-xs uppercase tracking-widest"
                    >
                      Contact
                    </Link>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="md:hidden z-[60] text-white p-2 active:scale-90 transition-transform"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <div className="space-y-1.5">
                                <div className="w-5 h-0.5 bg-white"></div>
                                <div className="w-5 h-0.5 bg-red-600"></div>
                                <div className="w-3 h-0.5 bg-white ml-auto"></div>
                            </div>
                        )}
                    </button>
                </div>
            </header>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <m.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 w-full h-full bg-black z-50 md:hidden flex flex-col"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
                        
                        <m.div 
                            variants={linkVariants}
                            className="absolute top-8 right-8 z-[70]"
                        >
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-sm bg-black/50 active:scale-90 transition-transform group"
                            >
                                <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] group-hover:text-red-500">EXIT_NODE</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </m.div>

                        <div className="relative z-10 flex-grow flex flex-col items-start justify-center px-12 pt-20">
                            <span className="text-[10px] font-mono text-red-600 tracking-[0.4em] uppercase mb-8 opacity-50">System_Interface_Ready</span>
                            
                            <nav className="flex flex-col space-y-4 text-2xl sm:text-4xl font-black uppercase tracking-tighter w-full">
                                <m.div variants={linkVariants}>
                                    <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block transition-colors ${isActive ? 'text-red-600' : 'text-zinc-500 hover:text-white'}`}>
                                        <span className="text-xs font-mono mr-4 text-zinc-800">01</span>HOME
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block transition-colors ${isActive ? 'text-red-600' : 'text-zinc-500 hover:text-white'}`}>
                                        <span className="text-xs font-mono mr-4 text-zinc-800">02</span>PORTFOLIO
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants} className="w-full">
                                    <button 
                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                        className="flex items-center justify-between w-full transition-colors text-zinc-500 hover:text-white uppercase"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-xs font-mono mr-4 text-zinc-800">03</span>SERVICES
                                        </div>
                                        <svg className={`w-6 h-6 transform transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-red-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {mobileServicesOpen && (
                                            <m.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-8 mt-4 space-y-3"
                                            >
                                                {[
                                                    { label: 'Web Design', path: '/web-design' },
                                                    { label: 'Logo Design', path: '/logo-showcase' },
                                                    { label: 'SEO Excellence', path: '/seo-services' },
                                                    { label: 'Digital Marketing', path: '/digital-marketing' },
                                                    { label: 'About Us', path: '/about' }
                                                ].map((s) => (
                                                    <Link 
                                                        key={s.label}
                                                        to={s.path} 
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block text-sm font-mono text-zinc-600 hover:text-red-500 tracking-widest uppercase"
                                                    >
                                                        // {s.label}
                                                    </Link>
                                                ))}
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block transition-colors ${isActive ? 'text-red-600' : 'text-zinc-500 hover:text-white'}`}>
                                        <span className="text-xs font-mono mr-4 text-zinc-800">04</span>PORTFOLIO
                                    </NavLink>
                                </m.div>

                                <m.div variants={linkVariants}>
                                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block transition-colors ${isActive ? 'text-red-600' : 'text-zinc-500 hover:text-white'}`}>
                                        <span className="text-xs font-mono mr-4 text-zinc-800">05</span>CONTACT
                                    </NavLink>
                                </m.div>
                            </nav>
                        </div>

                        <div className="relative z-10 p-12 mt-auto border-t border-zinc-900 bg-zinc-950/50">
                            <div className="flex gap-6">
                                {[
                                    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/vgotyou/" },
                                    { icon: GitHubIcon, href: "https://github.com/chandru36james/" },
                                    { icon: InstagramIcon, href: "https://www.instagram.com/vgot_you/" },
                                    { icon: GoogleIcon, href: googleLink }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors">
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
