import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

interface CtaSectionProps {
    setPage: (page: string) => void;
}

// --- Helper Data & Components ---

const marqueeImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1955&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
];

const Sparkle: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <div className={`absolute animate-pulse ${className}`} style={style}>
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.226 38.774L100 50L61.226 61.226L50 100L38.774 61.226L0 50L38.774 38.774L50 0Z" className="fill-red-500" /> {/* Removed dark:fill-white */}
        </svg>
    </div>
);

// JS-Driven Marquee Column for smooth speed control
const MarqueeColumn: React.FC<{ images: string[], reverse?: boolean, isHovered: boolean, className?: string }> = ({ 
    images, 
    reverse = false, 
    isHovered, 
    className = '' 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(reverse ? -25 : 0);
    const speedRef = useRef(reverse ? 0.03 : -0.03);
    
    // Use a ref for hover state to avoid restarting the effect loop
    const isHoveredRef = useRef(isHovered);
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    useEffect(() => {
        let animationFrameId: number;
        
        // Settings
        const baseSpeed = 0.015; // Slightly faster base speed for visibility
        const hoverSpeed = 0.002; // Very slow on hover
        const smoothing = 0.08; // Factor for smooth acceleration

        const animate = () => {
            const currentHoverState = isHoveredRef.current;

            // Determine target velocity
            const targetSpeed = currentHoverState 
                ? (reverse ? hoverSpeed : -hoverSpeed) 
                : (reverse ? baseSpeed : -baseSpeed);

            // Smoothly interpolate current speed towards target speed
            speedRef.current += (targetSpeed - speedRef.current) * smoothing;

            // Update position
            positionRef.current += speedRef.current;

            // Wrap logic for 4 duplicates (Total height 100%, 1 set = 25%)
            if (!reverse) {
                if (positionRef.current <= -25) positionRef.current = 0;
            } else {
                if (positionRef.current >= 0) positionRef.current = -25;
            }

            // Apply transform
            if (containerRef.current) {
                containerRef.current.style.transform = `translate3d(0, ${positionRef.current}%, 0)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [reverse]); // Removed isHovered from dependency to prevent restart

    return (
        <div className={`relative h-full overflow-hidden w-full select-none ${className}`}>
            <div 
                ref={containerRef}
                className="flex flex-col gap-4 absolute top-0 left-0 w-full"
                style={{ willChange: 'transform' }}
            >
                {/* Quadruple duplicate for infinite scroll loop */}
                {[...images, ...images, ...images, ...images].map((src, i) => (
                    <div key={i} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg opacity-60 transition-opacity duration-300 hover:opacity-100 bg-zinc-800"> {/* Removed dark:bg-zinc-800, now just bg-zinc-800 */}
                        <img src={src} alt="Project preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div> {/* Removed dark:bg-black/30, now just bg-black/30 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FlipWords = () => {
    const words = ["Amazing", "Iconic", "Timeless", "Limitless"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex justify-center md:justify-start relative w-[180px] sm:w-[240px] md:w-[360px] lg:w-[420px] h-[1.2em]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, rotateX: -90, y: 20 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 90, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`absolute top-0 left-0 w-full text-center md:text-left font-bold leading-none ${
                        index % 2 === 0 
                        ? 'text-white' // Changed from text-black dark:text-white
                        : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]' // Changed from text-red-600 dark:text-red-500 drop-shadow...
                    }`}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
            <span className="invisible font-bold leading-none">Limitless</span> 
        </span>
    );
};

const CtaSection: React.FC<CtaSectionProps> = ({ setPage }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Split images for columns
    const col1 = marqueeImages.slice(0, 3);
    const col2 = marqueeImages.slice(3, 6);
    const col3 = marqueeImages.slice(6, 9);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <FadeInSection id="cta" className="relative mt-20 h-[100dvh] w-full overflow-hidden group bg-black transition-colors duration-300"> {/* Changed bg-white dark:bg-black to bg-black */}
            {/* Unified Hover detection wrapper */}
            <div 
                className="w-full h-full flex items-center justify-center text-center text-white relative" // Changed text-gray-900 dark:text-white to text-white
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* 3D Marquee Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 overflow-hidden bg-black transition-colors duration-300"> {/* Changed bg-gray-50 dark:bg-black to bg-black */}
                        <div className="absolute inset-0 w-[160%] h-[150%] -left-[30%] -top-[25%] transform rotate-[-10deg] skew-y-12 scale-110 flex justify-center items-center gap-2 md:gap-4 grayscale hover:grayscale-0 transition-all duration-1000 opacity-100"> {/* Removed dark:opacity-100, now just opacity-100 */}
                            
                            {/* Columns 1-3 (Visible on all screens) */}
                            <MarqueeColumn images={col1} isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col2} reverse isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col3} isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            
                            {/* Columns 4-5 (Desktop) */}
                            <MarqueeColumn images={col1} reverse isHovered={isHovered} className="hidden md:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col2} isHovered={isHovered} className="hidden lg:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            
                            {/* Columns 6-7 (Large Desktop - Extra Density) */}
                            <MarqueeColumn images={col3} reverse isHovered={isHovered} className="hidden xl:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col1} isHovered={isHovered} className="hidden xl:block flex-1 max-w-[200px] md:max-w-[250px]" />
                        </div>
                    </div>
                </div>

                {/* Overlay - Adaptive for Light/Dark */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0 pointer-events-none transition-colors duration-300"></div> {/* Changed from-white/90 ... to-white/90 dark:from-black/80 ... to-black/80 */}

                {/* Content */}
                <div className="relative z-10 w-full max-w-[95vw] md:max-w-6xl px-4 flex flex-col items-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl flex flex-col md:flex-row items-center md:items-baseline justify-center gap-x-3 gap-y-2 leading-tight" // Removed dark:drop-shadow-2xl
                    >
                        <span className="whitespace-nowrap">Let’s Build Something</span>
                        <FlipWords />
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-gray-300 leading-relaxed max-w-lg md:max-w-3xl mx-auto" // Changed text-gray-600 dark:text-gray-300 to text-gray-300
                    >
                        From stunning websites to unique brand identities, I transform your ideas into reality.
                        Collaborate with us to craft digital experiences that truly inspire.
                    </motion.p>
                    <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
>
  <Link
    to="/contact"
    className="inline-block bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 text-sm sm:text-base rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer z-30" // Simplified classes
  >
    Get In Touch
  </Link>
</motion.div>

                </div>
                
                <Sparkle className="top-[20%] left-[15%]" style={{ animationDelay: '0.3s' }} />
                <Sparkle className="bottom-[25%] right-[20%]" style={{ animationDelay: '0.8s' }} />
                
                
            </div>
        </FadeInSection>
    );
};

export default CtaSection;