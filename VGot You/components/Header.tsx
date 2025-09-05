import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD1i8v/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfoBhYXLQ2j43+EAAAIyUlEQVR42u3d249lVRUH8G96t1VQUqFtdGlrFcFbVAwhgoHgxYuJiQf/A35hiBdPREPRg4lHjDixGPEGxSOGhQejeLBgJEoU43FRsQh1pQsptKqttKXt7enw+fHhtLszu+fMOXfn3JOSz22eO3fmnLOzZ2d29t5zY2GJRQK0Ech+sREgE6vVdDweB7IQuh4MBv3+/v7l5eVlPZ732tnZ+fDw8MJqtT6wO03T+Xw+53B3dzeo12/48OFC5m3bVp1Op1fPz89Vp/O60d5bW1u/urpaVafzrtHeOzw8/Nra2oZbf1qtfufk5JRz2draus/n80X+vX6/r89z0Gq1yjn5+fmHh4cX3vL9/f3B/y7n8/l8Pj/o9/vBYNBPJBJxV//+oO+lUqmrq6urq6vNZvOLi4s3Nze/ubn5/Pz809PTj4+Pn5+f73Q6S5lOp71eV//1eDxOp3NJJBLNZvPLy8s7Ozvf3Ny8vr7+8fHx8fHxbrd7Y3/u7u5OJBJxtnJ/r8fn/X5fJBLh/N7f6XSKwHh3d3d5+fnRaPTU1NTk5OTU1NTk5OQEf/y9gYGBwcHB4eHhTU1Nzc3Nzc/Pb25uDgwMbG5ubmpqam5u7unp6cfHx3t7e4fDIY/HA8P5h3x3d3d3d7fRaLS3t3d2djYajZ6enp6bm5ufn5+fnx8IBAI43j8ajV6/vz8YDA4ODjYajY2NjcHBwclkcmNjY2NjY2tra/Pz852dnUFBQI/H0+l0gUBAR5M6nU4gENDpdIzT7Xabzaatra2trY2NjY1NTU1NTU1OTg4EAoFAIKDT6RwOh8vl8vl8JpNpNBpdXV3d3Nz0+/29vb2Dw8PhcFg/Pj4eDAbVavWOjo6urq5qtdrAwMDy8vLDw8OdnZ2dnZ0dHR2dnZ17e3tHR0cPDw+rq6v9/f29vb2Dg4MDgwO9vb1dXV0dHR2dnZ0NDAy8vLwMDQ3Nzc3t7u5mZGT09vZOTU2tra0tLy9vbW0tLS0tLS0NDAxMTExMTExMTExcXFzG0NXV1dXV1dLS0tDQwMDAwMDAQFNTU0dHR0dXV1dHR0dDQwMDAwMDAQFNTU0dHR0dHR0NDw8LCwsLCwsLCwsLCwtra2sLCwsLCwsLCwsLCwsvLy9ra2svLy8vLy8vLy9bW1svLy8vLy9bW1svLy9bW1vHx8cHBwcHBwcHBwcHBwcfHx8fHx8fHx8fHx8fHx8vLy6urq6urq8vLy8vLy8fHx8fHx8vLy6urq8vLy6urq6urq6urq6urq6urq8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8-B82J6s/AAAAASUVORK5CYII=';

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
            <NavLink to="/about-me" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        About Me
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
            <NavLink to="/web-design" className={linkBaseClass} onClick={onClick}>
                 {({isActive}) => (
                    <>
                        Web Design
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
            <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-6xl z-50 transition-all duration-300 ${headerBg} rounded-full p-2`}>
                <div className="flex justify-between items-center px-4">
                    <NavLink to="/" className={`text-2xl font-bold flex items-center gap-2 ${textColor}`}>
                         <img src={logo} alt="VGot You Logo" className={`h-8 w-8 object-contain transition-all duration-300`} />
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