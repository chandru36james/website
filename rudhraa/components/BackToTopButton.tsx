import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 lg:bottom-28 lg:right-8 z-40 bg-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-accent-hover hover:scale-110 transition-all duration-300 ease-in-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Go to top"
    >
      {React.cloneElement(ICONS.arrowUp, { className: 'w-6 h-6' })}
    </button>
  );
};

export default BackToTopButton;