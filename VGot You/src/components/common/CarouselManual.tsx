import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { projects } from '../../lib/data';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';

const m = motion as any;

const CarouselManual: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isDragging) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, isDragging]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startX) / 200;
        if (Math.abs(walk) > 0.5) {
            if (walk > 0) prevSlide();
            else nextSlide();
            setIsDragging(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="mb-8 md:mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[1px] bg-red-600"></div>
                    <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Selected Works</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-zinc-900 leading-none tracking-tighter uppercase">
                    Portfolio <span className="text-red-600">Showcase</span>
                </h2>
            </div>

            <div 
                ref={carouselRef}
                className="relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[10px] bg-zinc-100 group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setIsDragging(false)}
                onMouseEnter={() => setIsDragging(true)}
                onMouseLeave={() => setIsDragging(false)}
            >
                <AnimatePresence mode="wait">
                    <m.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img 
                            src={(isMobile && projects[currentIndex].mobileImageUrl) ? projects[currentIndex].mobileImageUrl : projects[currentIndex].imageUrl} 
                            alt={projects[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                            <div className="max-w-3xl">
                                <m.span 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4"
                                >
                                    {projects[currentIndex].category}
                                </m.span>
                                <m.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link 
                                        to={projects[currentIndex].liveUrl || '#'}
                                        className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs group/link"
                                    >
                                        View Case Study
                                        <div className="w-8 h-[1px] bg-red-600 transition-all group-hover/link:w-12"></div>
                                    </Link>
                                </m.div>
                            </div>
                        </div>
                    </m.div>
                </AnimatePresence>

                <div className="absolute top-8 right-8 flex gap-3 z-30">
                    {projects.map((_, i) => (
                        <div 
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative h-1 cursor-pointer transition-all duration-500 rounded-full overflow-hidden ${i === currentIndex ? 'w-12 bg-white/20' : 'w-2 bg-white/30'}`}
                        >
                            {i === currentIndex && (
                                <m.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="absolute inset-0 bg-red-600"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="hidden md:flex gap-3 absolute bottom-8 right-8 z-30">
                    <button onClick={prevSlide} className="p-4 rounded-[10px] bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-red-600 transition-all active:scale-95 group/btn">
                        <ChevronLeftIcon className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                    <button onClick={nextSlide} className="p-4 rounded-[10px] bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-red-600 transition-all active:scale-95 group/btn">
                        <ChevronRightIcon className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="flex justify-center gap-3 mt-6 md:hidden">
                <button onClick={prevSlide} className="p-3 rounded-[10px] border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all active:scale-95 group/btn">
                    <ChevronLeftIcon className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-[10px] border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all active:scale-95 group/btn">
                    <ChevronRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default CarouselManual;
