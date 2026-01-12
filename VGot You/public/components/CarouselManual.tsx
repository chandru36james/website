
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { projects } from '../lib/data';
import { motion } from 'framer-motion';

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const CarouselManual: React.FC = () => {
  const items = projects.filter(p => p.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use refs for touch coordinates to avoid re-renders during swipe
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
       nextSlide(); 
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (items.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Our Projects</h2>
        <p className="text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto">
          Explore our portfolio of digital experiences.
        </p>
      </div>

      {/* Carousel Container - Full width mobile utilization */}
      <div 
        className="relative w-full md:w-11/12 max-w-6xl mx-auto group select-none" 
        aria-roledescription="carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides Frame - Increased height with aspect-[3/4] on mobile, and rounded-[50px] */}
        <div className="overflow-hidden relative rounded-[20px] shadow-2xl bg-zinc-950 aspect-[3/4] md:aspect-[16/9]">
          
          <div
            className="flex h-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="min-w-full w-full h-full relative flex-shrink-0" aria-roledescription="slide">
                {/* Responsive Image Switching with optimized sizes */}
                <picture className="w-full h-full block">
                    <source media="(max-width: 640px)" srcSet={item.mobileImageUrl || item.imageUrl} />
                    <img 
                        src={item.imageUrl} 
                        alt={`${item.title} website design and branding project by VGot You in Karur Tamil Nadu`} 
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                        draggable={false}
                    />
                </picture>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-100" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-12 text-white flex flex-col items-start justify-end h-full pointer-events-none">
                  <div className="pointer-events-auto transform transition-all duration-500 translate-y-0">
                      <span className="inline-block px-3 py-1 mb-3 text-[9px] md:text-xs font-bold bg-red-600 rounded-full uppercase tracking-[0.2em] shadow-lg">
                        {item.category}Website
                      </span>
                      <h3 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold mb-3 leading-tight drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-lg text-zinc-300 line-clamp-3 mb-6 max-w-lg md:max-w-2xl leading-relaxed opacity-95 font-light">
                        {item.description}
                      </p>
                      
                      {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs md:text-base font-bold text-white border-b-2 border-red-600 pb-1 hover:text-red-500 hover:border-red-500 transition-colors"
                          >
                            View Project 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-black/30 hover:bg-black/70 backdrop-blur-md text-white border border-white/10 rounded-full p-3 transition-all z-20 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-black/30 hover:bg-black/70 backdrop-blur-md text-white border border-white/10 rounded-full p-3 transition-all z-20 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0 duration-300"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Pagination Indicators - Positioned bottom for better tap access */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center md:justify-end md:right-10 gap-1 z-20 items-center">
          {items.map((_, slideIndex) => (
            <m.button
              key={slideIndex}
              layout
              onClick={() => goToSlide(slideIndex)}
              className="group p-2 flex items-center justify-center focus:outline-none"
              aria-label={`Go to slide ${slideIndex + 1}`}
            >
               <div className={`h-1 rounded-full overflow-hidden transition-all duration-300 relative ${
                 currentIndex === slideIndex 
                   ? 'w-8 md:w-12 bg-white/20' 
                   : 'w-2 bg-white/40 group-hover:bg-white/80'
               }`}>
                  {currentIndex === slideIndex && (
                    <m.div 
                      className="absolute inset-0 bg-red-600 h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
               </div>
            </m.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselManual;
