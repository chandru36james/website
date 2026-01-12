
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
            const ease = 1 - Math.pow(1 - progress, 3); 
            
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

    return <span className="tabular-nums">{count}</span>;
};

export const HeroSection: React.FC = () => {
    return (
        <section className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-black transition-colors duration-300 transform-gpu">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <SparklesCore
                    id="hero-sparkles"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={25} 
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Globe */}
            <div className="absolute bottom-[-130%] md:bottom-[-100%] left-0 right-0 w-full h-[160%] z-0 scale-[1.6] md:scale-[1.5] transition-all duration-300 ease-out pointer-events-none will-change-transform transform-gpu">
                <Globe className="opacity-100" />
            </div>
            
            <div className="absolute inset-x-0 bottom-0 h-64 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Desktop & Tablet Vertical Social Bar */}
            <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
                 <div className="flex flex-col gap-6">
                    <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300">
                        <LinkedInIcon className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/chandru36james/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300">
                        <GitHubIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300">
                        <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="https://share.google/dFoHWjrgvSH8htAoH" target="_blank" rel="noopener noreferrer" aria-label="Google Shared Portfolio" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300">
                        <GoogleIcon className="w-5 h-5" />
                    </a>
                 </div>
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-16 md:pt-0 pointer-events-none text-center">
                <div className="pointer-events-auto transition-all duration-500 max-w-4xl">
                    <div className="overflow-hidden mb-8 md:mb-16 lg:mb-20">
                        <p className="text-[9px] md:text-sm font-bold tracking-[0.4em] text-red-600 uppercase">
                            Web Design & SEO Company in Tamil Nadu
                        </p>
                    </div>

                    <h1 className="flex flex-col items-center">
                        <span className="sr-only">Web Design Company in Karur, Tamil Nadu</span>
                        <span className="text-[clamp(4.5rem,20vw,9rem)] md:text-[10vw] lg:text-[8vw] leading-[0.8] font-black font-sans text-white tracking-tighter mix-blend-difference mb-10 md:mb-16 h-[1.2em] flex items-center justify-center text-center">
                            VGOT<br/>YOU
                        </span>
                        <span className="max-w-[280px] sm:max-w-xs md:max-w-2xl lg:max-w-lg text-zinc-500 text-[11px] md:text-base leading-relaxed mb-10 md:mb-14 font-medium mx-auto block text-center">
                            Crafting <span className="text-white font-semibold">Professional Web Design</span>, <span className="text-white font-semibold">Website Development</span>, <span className="text-white font-semibold">Hosting</span>, and <span className="text-white font-semibold">SEO</span> solutions in <span className="text-red-600 font-bold">Karur</span> with <span className="text-red-600 font-bold">Fast Delivery</span>.
                        </span>
                    </h1>

                    <div className="flex flex-col items-center gap-8 md:gap-10">
                        <a href="#project" className="group relative inline-flex items-center gap-3 md:gap-4 overflow-hidden border border-white/20 px-6 py-3.5 md:px-8 md:py-4 text-[9px] md:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95">
                            <span className="relative z-10">Start Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </a>

                        {/* Mobile Only Social Bar */}
                        <div className="flex md:hidden items-center gap-6 md:gap-8 px-1">
                            <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-500 hover:text-white transition-colors">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/chandru36james/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-500 hover:text-white transition-colors">
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-gray-500 hover:text-white transition-colors">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href="https://share.google/dFoHWjrgvSH8htAoH" target="_blank" rel="noopener noreferrer" aria-label="Google Shared Portfolio" className="text-gray-500 hover:text-white transition-colors">
                                <GoogleIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Trust Microcopy - Size reduced */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 pointer-events-none px-6">
                <div className="relative container mx-auto pointer-events-auto">
                    <div className="grid grid-cols-3 max-w-[240px] md:max-w-xs mx-auto gap-1 md:gap-2 py-2 md:py-4 border-t border-white/5 backdrop-blur-sm">
                        <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5">
                                <CountUp end={2} />+
                            </span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Years Exp.</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5">
                                <CountUp end={15} />+
                            </span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Projects</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5">
                                <CountUp end={10} />+
                            </span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
