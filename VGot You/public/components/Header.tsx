import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';


const underlineClassName = (isActive: boolean) => `absolute -bottom-1 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-center`;

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
            <NavLink to="/chandru" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        About Me
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
            <NavLink to="/web-design" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Web Design
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
            <NavLink to="/logo-showcase" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Logo Design
                        <span className={underlineClassName(isActive)}></span>
                    </>
                )}
            </NavLink>
             <NavLink to="/Blog" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Blog
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
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Header changes on scroll or on non-home pages.
    const isHeaderActive = isScrolled || !isHomePage;
    
    const headerBg = isHeaderActive ? 'bg-brand-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent';
    const textColor = 'text-white';
    const textHover = 'hover:text-zinc-300';
    const buttonClasses = isHeaderActive 
        ? 'bg-white text-brand-black hover:bg-zinc-200'
        : 'bg-brand-black text-white hover:bg-zinc-700';

    return (
        <>
            <header 
  className={`fixed top-4 left-1/2 -translate-x-1/2 w-11/12 md:w-11/12 lg:w-7/12 max-w-6xl z-50 transition-all duration-300 ${headerBg} rounded-full p-2`}
>

                <div className="flex justify-between items-center px-4">
                    <NavLink to="/" className={`text-2xl font-bold flex items-center gap-2 ${textColor}`}>
                         <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You Logo" className={`h-8 w-8 object-contain transition-all duration-300`} />
                         <span className="font-cambria">VGot You</span>
                    </NavLink>
                    <nav className={`hidden md:flex items-center space-x-6 lg:space-x-8 ${textColor}`}>
                        <NavLinks className={`transition-colors ${textHover}`} />
                    </nav>
                    <Link
                      to="/contact"
                      className={`hidden md:inline-block font-semibold py-2 px-5 rounded-full transition-colors ${buttonClasses}`}
                    >
                      Contact
                    </Link>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden z-50 ${textColor}`}>
                        {isMenuOpen ? (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        )}
                    </button>
                </div>
            </header>
            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                   <NavLinks className="text-brand-black hover:text-zinc-600 transition-colors" onClick={() => setIsMenuOpen(false)} />
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-brand-black text-white font-semibold py-3 px-8 rounded-full hover:bg-zinc-700 transition-colors mt-4">
                        Contact
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;