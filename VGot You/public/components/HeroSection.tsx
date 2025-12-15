
import React, { useState, useEffect } from 'react';
import { Globe } from './ui/globe';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon } from './Icons';

// --- Helper Components ---

// Simple CountUp Component
const CountUp = ({ end, duration = 2000, delay = 0 }: { end: number, duration?: number, delay?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const timeElapsed = timestamp - startTime;

            if (timeElapsed < delay) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min((timeElapsed - delay) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // Ease out quart
            
            setCount(Math.floor(ease * end));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, delay]);

    return <span>{count}</span>;
};

export const HeroSection: React.FC = () => {
    return (
        <>
            {/* Embedded Styles for Animations */}
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 1s ease-out forwards;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
                
                /* Renamed to avoid conflict with Tailwind's transition-delay classes */
                .anim-delay-500 { animation-delay: 500ms; }
                .anim-delay-1000 { animation-delay: 1000ms; }
                .anim-delay-1500 { animation-delay: 1500ms; }
            `}</style>

            <section 
                className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-white dark:bg-black transition-colors duration-300"
            >
                {/* 3D Globe Horizon Background */}
                <div 
                    className="absolute bottom-[-100%] md:bottom-[-90%] left-0 right-0 w-full h-[150%] z-0 transition-transform duration-100 ease-out"
                    style={{
                        transform: `scale(1.5)`
                    }}
                >
                    <Globe className="opacity-100" />
                </div>
                
                {/* Gradient Overlay to blend globe into background at the very bottom */}
                <div className="absolute inset-x-0 bottom-0 h-64 md:h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10 pointer-events-none"></div>

                {/* Vertical Social Icons (Desktop Only) */}
                <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
                     <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-zinc-700"></div>
                     <div className="flex flex-col gap-6">
                        <a href="https://www.linkedin.com/in/vgotyou/" aria-label="LinkedIn" className="text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-125 duration-300">
                            <LinkedInIcon className="w-5 h-5" />
                        </a>
                        <a href="https://github.com/chandru36james/" aria-label="GitHub" className="text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-125 duration-300">
                            <GitHubIcon className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/vgot_you/" aria-label="Instagram" className="text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-125 duration-300">
                            <InstagramIcon className="w-5 h-5" />
                        </a>
                        <a href="https://share.google/dFoHWjrgvSH8htAoH" aria-label="Google" className="text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-125 duration-300">
                            <GoogleIcon className="w-5 h-5" />
                        </a>
                     </div>
                     <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-zinc-700"></div>
                </div>

                {/* Main Content Area */}
                {/* Mobile: Bottom-Left | Tablet: Center-Center | Desktop: Center-Left (Shifted Right) */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-end md:justify-center h-full pb-24 md:pb-0 pointer-events-none md:items-center lg:items-start">
                    
                    {/* Content wrapper to re-enable pointer events for text/buttons */}
                    <div className="pointer-events-auto lg:ml-32 xl:ml-48 transition-all duration-500 md:text-center lg:text-left">
                        {/* Mission Subtitle */}
                        <div className="overflow-hidden mb-2">
                            <p className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase animate-fade-in-down">
                                Mission: Web Design & Branding
                            </p>
                        </div>

                        {/* Massive Title */}
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] md:leading-[0.85] font-black font-sans text-black dark:text-white tracking-tighter mix-blend-difference mb-6 md:mb-8 animate-fade-in-up">
                            VGOT<br/>YOU
                        </h1>

                        {/* Description Paragraph */}
                        <p className="max-w-xs md:max-w-xl lg:max-w-md text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 md:mb-10 animate-fade-in-up anim-delay-500 font-medium md:mx-auto lg:mx-0">
                            Expert <strong>Web Design</strong>, <strong>Web Hosting</strong>, and <strong>SEO Services</strong>. We provide <strong>Logo Design</strong>, <strong>Ad Running</strong>, and <strong>Product Shoots</strong> to build <strong>Fully Responsive</strong>, <strong>Mobile-Friendly</strong> websites with <strong>Fast Delivery</strong>.
                        </p>

                        {/* Call to Action Button */}
                        <a
                            href="#manuall"
                            className="group relative inline-flex items-center gap-3 md:gap-4 overflow-hidden border border-black/20 dark:border-white/20 px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest text-black dark:text-white transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black animate-fade-in-up anim-delay-1000"
                        >
                            <span className="relative z-10">Start Mission</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 transform transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            {/* Button Glow Effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </a>
                    </div>
                </div>

                {/* Redesigned Stats Grid - Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 animate-fade-in-up anim-delay-1500 pointer-events-none">
                    {/* Glass gradient background for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent dark:from-black/95 dark:via-black/50 dark:to-transparent backdrop-blur-[1px]"></div>
                    
                    <div className="relative container mx-auto px-6 md:px-12 pointer-events-auto">
                        <div className="grid grid-cols-3 max-w-lg mx-auto">
                            
                            {/* Stat Item 1 */}
                            <div className="group relative p-2 flex flex-col justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default items-center text-center">
                                <span className="text-base md:text-lg font-black text-black dark:text-white font-mono block leading-none mb-1">
                                    <CountUp end={2} />+
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Years Exp.</span>
                                    <div className="w-1 h-1 bg-red-600 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>

                             {/* Stat Item 2 */}
                             <div className="group relative p-2 flex flex-col justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default items-center text-center">
                                <span className="text-base md:text-lg font-black text-black dark:text-white font-mono block leading-none mb-1">
                                    <CountUp end={15} />+
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Projects Done</span>
                                    <div className="w-1 h-1 bg-red-600 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>

                             {/* Stat Item 3 */}
                             <div className="group relative p-2 flex flex-col justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default items-center text-center">
                                <span className="text-base md:text-lg font-black text-black dark:text-white font-mono block leading-none mb-1">
                                    <CountUp end={10} />+
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Clients</span>
                                    <div className="w-1 h-1 bg-red-600 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
