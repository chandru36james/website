import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../../lib/data';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';

const m = motion as any;

export const ProjectsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

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
        <section id="project" className="relative py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-[1px] bg-red-600"></div>
                                <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Selected Works</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-zinc-200 leading-none tracking-tighter uppercase">
                                Portfolio <span className="text-red-600">Showcase</span>
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevSlide} className="p-4 rounded-full border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all active:scale-90">
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <button onClick={nextSlide} className="p-4 rounded-full border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all active:scale-90">
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div 
                        ref={carouselRef}
                        className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-zinc-100 group"
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
                                <m.img 
                                    key={`img-${currentIndex}`}
                                    src={projects[currentIndex].imageUrl} 
                                    alt={projects[currentIndex].title}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                                    <div className="max-w-3xl">
                                        <m.span 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-6"
                                        >
                                            {projects[currentIndex].category}
                                        </m.span>
                                        <m.h3 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-3xl md:text-6xl font-black text-white mb-4 leading-none tracking-tighter uppercase"
                                        >
                                            {projects[currentIndex].title}
                                        </m.h3>
                                        <m.p 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-zinc-400 text-sm md:text-lg max-w-xl mb-8 leading-relaxed"
                                        >
                                            {projects[currentIndex].description}
                                        </m.p>
                                        <m.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
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

                        <div className="absolute top-8 right-8 flex gap-3">
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
                    </div>
                </div>
            </div>
        </section>
    );
};
