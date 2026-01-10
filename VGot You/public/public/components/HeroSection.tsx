import React, { useState, useEffect } from 'react';
import { Globe } from './ui/globe';
import { SparklesCore } from './ui/sparkles';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon } from './Icons';

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
            const ease = 1 - Math.pow(1 - progress, 4); 
            
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
        <section className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-black transition-colors duration-300">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <SparklesCore
                    id="hero-sparkles"
                    minSize={0.4}
                    maxSize={1.4}
                    particleDensity={40} 
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Globe Adjusted for better mobile view */}
            <div className="absolute bottom-[-130%] md:bottom-[-100%] left-0 right-0 w-full h-[160%] z-0 scale-[1.6] md:scale-[1.5] transition-all duration-300 ease-out pointer-events-none will-change-transform">
                <Globe className="opacity-100" />
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-64 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Desktop Vertical Social Bar */}
            <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
                 <div className="flex flex-col gap-6">
                    <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-all hover:scale-125 duration-300">
                        <LinkedInIcon className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/chandru36james/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition-all hover:scale-125 duration-300">
                        <GitHubIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-all hover:scale-125 duration-300">
                        <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="https://share.google/dFoHWjrgvSH8htAoH" target="_blank" rel="noopener noreferrer" aria-label="Google" className="text-gray-400 hover:text-white transition-all hover:scale-125 duration-300">
                        <GoogleIcon className="w-5 h-5" />
                    </a>
                 </div>
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-16 md:pt-0 pointer-events-none md:items-center lg:items-start">
                <div className="pointer-events-auto lg:ml-32 xl:ml-48 transition-all duration-500 md:text-center lg:text-left">
                    <div className="overflow-hidden mb-3">
                        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-red-600 uppercase animate-fade-in-down">
                            Modern Websites That Help Your Business Grow Online
                        </h2>
                    </div>

                    <div className="text-[clamp(4.5rem,20vw,9rem)] md:text-[10vw] lg:text-[8vw] leading-[0.8] font-black font-sans text-white tracking-tighter mix-blend-difference mb-8 animate-fade-in-up">
                        VGOT<br/>YOU
                    </div>

                    <h1 className="max-w-[280px] sm:max-w-xs md:max-w-xl lg:max-w-md text-zinc-500 text-xs md:text-base leading-relaxed mb-10 animate-fade-in-up anim-delay-500 font-medium md:mx-auto lg:mx-0">
                        Crafting <span className="text-white">Web Design</span>, <span className="text-white">Hosting</span>, and <span className="text-white">SEO</span> solutions with <span className="text-red-600">Fast Delivery</span>.
                    </h1>

                    <div className="flex flex-col md:items-center lg:items-start gap-10 animate-fade-in-up anim-delay-1000">
                        <a href="#clients" className="group relative inline-flex items-center gap-4 overflow-hidden border border-white/20 px-8 py-4 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95">
                            <span className="relative z-10">Start Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </a>

                        {/* Mobile & Tablet Social Icons Row */}
                        <div className="flex lg:hidden items-center gap-8 px-1">
                            <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-all hover:scale-125 duration-300">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/chandru36james/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-white transition-all hover:scale-125 duration-300">
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-white transition-all hover:scale-125 duration-300">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href="https://share.google/dFoHWjrgvSH8htAoH" target="_blank" rel="noopener noreferrer" aria-label="Google" className="text-gray-500 hover:text-white transition-all hover:scale-125 duration-300">
                                <GoogleIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 z-20 animate-fade-in-up anim-delay-1500 pointer-events-none px-6">
                <div className="relative container mx-auto pointer-events-auto">
                    <div className="grid grid-cols-3 max-w-sm mx-auto gap-4 py-6 border-t border-white/5 backdrop-blur-sm">
                        <div className="group relative flex flex-col justify-center items-center text-center">
                            <span className="text-xl md:text-2xl font-black text-white font-mono block leading-none mb-1">
                                <CountUp end={2} />+
                            </span>
                            <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500">Years Exp.</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center">
                            <span className="text-xl md:text-2xl font-black text-white font-mono block leading-none mb-1">
                                <CountUp end={15} />+
                            </span>
                            <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500">Projects</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center">
                            <span className="text-xl md:text-2xl font-black text-white font-mono block leading-none mb-1">
                                <CountUp end={10} />+
                            </span>
                            <span className="text-[7px] md:text-[8px] font-bold tracking-widest uppercase text-gray-500">Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};