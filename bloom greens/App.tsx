import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DotNav from './components/DotNav';
import SocialLinks from './components/SocialLinks';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set([0])); // Track visible sections for animations
  const [isLoaded, setIsLoaded] = useState(false);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile ? 'auto' : 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobile]);

  const sections = useMemo(() => [
    { component: <Hero scrollToSection={() => {}} />, name: 'Home' },
    { component: <About />, name: 'About Us' },
    { component: <Services scrollToSection={() => {}} />, name: 'Services' },
    { component: <Portfolio />, name: 'Portfolio' },
    { component: <Testimonials />, name: 'Testimonials' },
    { component: <Blog />, name: 'Blog' },
    { component: <Contact />, name: 'Contact Us' },
    { component: <Footer scrollToSection={() => {}} />, name: 'Footer' },
  ], []);

  const numSections = sections.length;

  const handleParallaxNavigation = useCallback((targetIndex: number) => {
    if (isAnimatingRef.current || targetIndex < 0 || targetIndex >= numSections || targetIndex === activeIndexRef.current) {
      return;
    }
    isAnimatingRef.current = true;
    setActiveIndex(targetIndex);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => { isAnimatingRef.current = false; }, 1500);
  }, [numSections]);

  const handleMobileScroll = (index: number) => {
    const sectionId = sections[index].name.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
           top: index === 0 ? 0 : offsetPosition,
           behavior: "smooth"
      });
    }
  };
  
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
              const index = sectionRefs.current.findIndex(ref => ref === entry.target);
              if (index === -1) return;

              if (entry.isIntersecting) {
                  // For scroll-spy
                  setActiveIndex(index);
                  // For animations
                  setVisibleSections(prev => new Set(prev).add(index));
              }
            });
        },
        { rootMargin: '-40% 0px -60% 0px' }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
        if (ref) observer.observe(ref);
    });

    return () => {
        currentRefs.forEach((ref) => {
            if (ref) observer.unobserve(ref);
        });
    };
  }, [isMobile, sections.length]);


  useEffect(() => {
    if (isMobile) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      const nextIndex = direction === 'down' ? activeIndexRef.current + 1 : activeIndexRef.current - 1;
      handleParallaxNavigation(nextIndex);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      let targetIndex: number | null = null;
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
          case 'ArrowDown': case 'PageDown': targetIndex = activeIndexRef.current + 1; break;
          case 'ArrowUp': case 'PageUp': targetIndex = activeIndexRef.current - 1; break;
          case 'Home': targetIndex = 0; break;
          case 'End': targetIndex = numSections - 1; break;
        }
        if (targetIndex !== null) handleParallaxNavigation(targetIndex);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 'down' : 'up';
        const nextIndex = direction === 'down' ? activeIndexRef.current + 1 : activeIndexRef.current - 1;
        handleParallaxNavigation(nextIndex);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile, handleParallaxNavigation, numSections]);


  if (isMobile) {
    return (
      <div className="bg-white font-roboto text-gray-700 w-full">
        <Header activeIndex={activeIndex} scrollToSection={handleMobileScroll} isLoaded={isLoaded} />
        <main>
          {sections.map(({ component, name }, index) => {
            const props = {
              isActive: true, // All sections are active in flow
              isVisible: visibleSections.has(index), // For animations
              isMobile: true,
              scrollToSection: (target?: number) => {
                if(name === 'Home') {
                  handleMobileScroll(3);
                } else if (target !== undefined) {
                  handleMobileScroll(target);
                }
              },
            };
            return (
              <section 
                id={name.toLowerCase().replace(/\s+/g, '-')} 
                key={name}
                ref={el => { sectionRefs.current[index] = el; }}
              >
                {React.cloneElement(component, props)}
              </section>
            );
          })}
        </main>
      </div>
    )
  }

  const hasDarkBgForDots = [0, 2, 4, 7].includes(activeIndex);

  return (
    <div className="bg-white font-roboto text-gray-700 h-screen w-full relative overflow-hidden">
      <Header activeIndex={activeIndex} scrollToSection={handleParallaxNavigation} isLoaded={isLoaded} />
      
      {sections.map(({ component }, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        
        let transform = 'scale(1.1)';
        if (isActive) transform = 'scale(1)';
        else if (isPast) transform = 'scale(0.9)';

        const style: React.CSSProperties = {
          transform,
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 10 : 1,
          pointerEvents: isActive ? 'auto' : 'none',
        };

        const props = {
          isActive,
          isMobile: false,
          isVisible: isActive, // On desktop, visibility equals active state
          scrollToSection: handleParallaxNavigation
        };

        return (
          <div
            key={index}
            className="w-full h-full absolute top-0 left-0 transition-all duration-1000 ease-in-out"
            style={style}
          >
            {React.cloneElement(component, props)}
          </div>
        );
      })}

      <DotNav
        count={sections.length - 1}
        activeIndex={activeIndex}
        scrollToSection={handleParallaxNavigation}
        hasDarkBg={hasDarkBgForDots}
      />
      <SocialLinks activeIndex={activeIndex} isLoaded={isLoaded} />
    </div>
  );
};

export default App;