
import React, { useState, useEffect } from 'react';

interface DotNavProps {
  count: number;
  activeIndex: number;
  scrollToSection: (index: number) => void;
  hasDarkBg: boolean;
}

const DotNav: React.FC<DotNavProps> = ({ count, activeIndex, scrollToSection, hasDarkBg }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after a short delay to allow initial styles to apply for the animation
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
            activeIndex === index
              ? 'bg-brand-gold'
              : hasDarkBg
                ? 'bg-white/50 hover:bg-white'
                : 'bg-brand-dark/50 hover:bg-brand-dark'
          } ${
            isMounted 
              ? `opacity-100 ${activeIndex === index ? 'scale-125' : 'scale-100'}`
              : 'opacity-0 scale-75'
          }`}
          style={{ transitionDelay: `${index * 75}ms` }}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default DotNav;