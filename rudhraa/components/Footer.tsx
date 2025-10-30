import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, CATEGORIES, ICONS, SOCIAL_LINKS } from '../constants';
import useAnimateOnScroll from './useAnimateOnScroll';

const Footer: React.FC = () => {
  const [ref, isVisible] = useAnimateOnScroll(0.1);

  return (
    <footer ref={ref as React.RefObject<HTMLDivElement>} className="bg-white text-text-alt border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Details */}
          <div className={`space-y-4 scroll-animate flex flex-col items-center text-center md:items-start md:text-left ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0ms' }}>
            <Link to="/">
              <img className="h-28 w-28 rounded-full object-cover" src="https://rudhraaexportsandimports.com/images/rudhraa.png" alt="Rudhraa Exports Logo" />
            </Link>
            <p className="text-sm">
              Your trusted exporter and importer based in Karur, Tamil Nadu, for sourcing the freshest vegetables, fruits, and produce from India. Committed to quality and reliability.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.path} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-alt hover:text-accent transform hover:scale-110 transition-all duration-200"
                >
                  <span className="sr-only">{link.name}</span>
                  <span className="w-6 h-6 block">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <h3 className="text-lg font-semibold font-lora text-text-main mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <NavLink to={link.path} className={({ isActive }) => `text-sm transition-colors ${isActive ? 'text-accent font-semibold' : 'text-text-alt hover:text-primary'}`}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
               <li>
                 <NavLink to="/contact" className={({ isActive }) => `text-sm transition-colors ${isActive ? 'text-accent font-semibold' : 'text-text-alt hover:text-primary'}`}>
                   Contact Us
                 </NavLink>
               </li>
            </ul>
          </div>

          {/* Categories */}
          <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-lg font-semibold font-lora text-text-main mb-4">Product Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat.path}>
                  <NavLink to={cat.path} className={({ isActive }) => `text-sm transition-colors ${isActive ? 'text-accent font-semibold' : 'text-text-alt hover:text-primary'}`}>
                    {cat.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
            <h3 className="text-lg font-semibold font-lora text-text-main mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="mt-1 mr-3 text-accent w-5 h-5 flex-shrink-0">{ICONS.location}</span> <span>609 B, S. Vellalapatty South Industrial Estate, S. Vellalapatty Post, Karur - 639004, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-accent w-5 h-5 flex-shrink-0">{ICONS.email}</span> <a href="mailto:info@rudhraaexportsandimports.com" className="hover:text-primary">info@rudhraaexportsandimports.com</a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-accent w-5 h-5 flex-shrink-0">{ICONS.phone}</span> <a href="tel:+917373745695" className="hover:text-primary">+91 73737 45695</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-4 pt-4 border-t border-gray-200 text-center scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-sm">&copy; 2025 Rudhraa Exports. All Rights Reserved.</p>
          <p className="text-sm mt-2">
            Designed by <a href="https://www.vgotyou.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" style={{ fontFamily: 'Cambria, serif' }}>VGot You</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;