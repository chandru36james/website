import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// UI Components
import { Globe } from '../components/ui/globe';
import { SparklesCore } from '../components/ui/sparkles';

// Data
import { projects } from '../lib/data';

// Icons
import { 
    LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon, MediumIcon,
    ChevronLeftIcon, ChevronRightIcon,
    CodeBracketIcon, EditIcon, DesktopIcon, BookIcon, RocketIcon,
    StarIcon, SparklesIcon
} from '../components/Icons';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const m = motion as any;

// --- Shared Components ---

const FadeInSection: React.FC<{ children: React.ReactNode, className?: string, id?: string, delay?: number }> = ({ children, className = '', id, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <section 
            id={id}
            ref={domRef} 
            style={{ transitionDelay: `${delay}s` }}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </section>
    );
};

// --- Hero Section Components ---

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
            if (progress < 1) animationFrameId = requestAnimationFrame(animate);
            else setCount(end);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, delay]);
    return <span className="tabular-nums">{count}</span>;
};

const HeroSection: React.FC = () => {
    const googleBusinessUrl = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur";
    return (
        <section className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-black transition-colors duration-300 transform-gpu">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <SparklesCore id="hero-sparkles" minSize={0.4} maxSize={1.2} particleDensity={25} className="w-full h-full" particleColor="#FFFFFF" />
            </div>
            <div className="absolute bottom-[-130%] md:bottom-[-100%] left-0 right-0 w-full h-[160%] z-0 scale-[1.6] md:scale-[1.5] transition-all duration-300 ease-out pointer-events-none will-change-transform transform-gpu">
                <Globe className="opacity-100" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-64 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
                 <div className="flex flex-col gap-6">
                    <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300"><LinkedInIcon className="w-5 h-5" /></a>
                    <a href="https://vgotyou.medium.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300"><MediumIcon className="w-5 h-5" /></a>
                    <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300"><InstagramIcon className="w-5 h-5" /></a>
                    <a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110 duration-300"><GoogleIcon className="w-5 h-5" /></a>
                 </div>
                 <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
            </div>
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-16 md:pt-0 pointer-events-none text-center">
                <div className="pointer-events-auto transition-all duration-500 max-w-4xl">
                    <div className="overflow-hidden mb-8 md:mb-16 lg:mb-20">
                        <p className="text-[9px] md:text-sm font-bold tracking-[0.4em] text-red-600 uppercase">Web Design & SEO Company in Tamil Nadu</p>
                    </div>
                   <h1 className="flex flex-col items-center">
                        <span className="sr-only">Web Design Company in Karur, Tamil Nadu</span>
                        <span className="text-[clamp(4.5rem,20vw,9rem)] md:text-[10vw] lg:text-[8vw] leading-[0.8] font-black tracking-tighter font-sans text-white mix-blend-difference mb-10 md:mb-16 h-[1.2em] flex items-center justify-center text-center">VGot<br/>You</span>
                        <span className="max-w-[280px] sm:max-w-xs md:max-w-2xl lg:max-w-lg text-zinc-500 text-[11px] md:text-base leading-relaxed mb-10 md:mb-14 font-medium mx-auto block text-center">
                            Crafting <span className="text-white font-semibold">Professional Web Design</span>, <span className="text-white font-semibold">Website Development</span>, <span className="text-white font-semibold">Hosting</span>, and <span className="text-white font-semibold"> SEO</span> solutions in <span className="text-red-600 font-bold"> Karur</span> with <span className="text-red-600 font-bold"> Fast Delivery</span>.
                        </span>
                    </h1>
                    <div className="flex flex-col items-center gap-8 md:gap-10">
                        <a href="#portfolio" className="group relative inline-flex items-center gap-3 md:gap-4 overflow-hidden border border-white/20 px-6 py-3.5 md:px-8 md:py-4 text-[9px] md:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95">
                            <span className="relative z-10">Start Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </a>
                        <div className="flex md:hidden items-center gap-6 md:gap-8 px-1">
                            <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
                            <a href="https://vgotyou.medium.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><MediumIcon className="w-5 h-5" /></a>
                            <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><InstagramIcon className="w-5 h-5" /></a>
                            <a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><GoogleIcon className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 pointer-events-none px-6">
                <div className="relative container mx-auto pointer-events-auto">
                    <div className="grid grid-cols-3 max-w-[240px] md:max-w-xs mx-auto gap-1 md:gap-2 py-2 md:py-4 border-t border-white/5 backdrop-blur-sm">
                        <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5"><CountUp end={2} />+</span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Years Exp.</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5"><CountUp end={15} />+</span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Projects</span>
                        </div>
                         <div className="group relative flex flex-col justify-center items-center text-center min-h-[32px] md:min-h-[48px]">
                            <span className="text-sm md:text-xl font-black text-white font-mono block leading-none mb-0.5"><CountUp end={10} />+</span>
                            <span className="text-[5px] md:text-[7px] font-bold tracking-widest uppercase text-zinc-500">Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    const abt1 = "https://vgotyou.com/assets/abt1.png";
    const abt2 = "https://www.vgotyou.com/assets/abt2.png";
    return (
        <FadeInSection className="container mx-auto py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-400 font-black tracking-[0.4em] uppercase text-[10px]">Who We Are</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[0.9] text-zinc-900 tracking-tighter uppercase">
                        Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Future</span>, Today.
                    </h2>
                    <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-none">
                        We are a professional web design and branding <Link to="/digital-studio-tamil-nadu" className="text-red-600 hover:text-red-500">studio</Link> based in Tamil Nadu, helping startups and businesses build high-performance websites, strong brand identities, and conversion-focused digital experiences.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 w-full mb-12 text-left">
                        <div className="flex flex-col gap-4 p-6 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:bg-white hover:shadow-2xl hover:border-red-600/10 group">
                            <div className="bg-white p-3 rounded-2xl shadow-sm text-red-600 w-fit group-hover:scale-110 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 tracking-tight">Logic-Driven UX</h3>
                                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">Interfaces calibrated for maximum human engagement and conversion.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-6 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:bg-white hover:shadow-2xl hover:border-red-600/10 group">
                            <div className="bg-white p-3 rounded-2xl shadow-sm text-red-600 w-fit group-hover:scale-110 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 tracking-tight">Core Vitals SEO</h3>
                                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">Search infrastructure built into the very foundation of your code.</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/chandru" className="group relative inline-flex items-center gap-4 bg-zinc-900 text-white font-bold py-4 px-10 rounded-full hover:bg-red-600 transition-all shadow-2xl active:scale-95">
                        <span className="text-xs uppercase tracking-[0.3em]">Meet the Founder</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                </div>
                <div className="hidden lg:flex relative h-[600px] w-full justify-center lg:justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-red-600/10 via-transparent to-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
                    <div className="relative w-full h-full flex items-center justify-end">
                        <div className="relative z-20 transform -translate-x-12 translate-y-12">
                            <img src={abt1} alt="Strategy" className="w-72 h-96 object-cover rounded-[2rem] shadow-2xl border-4 border-white transition-all duration-700 hover:scale-[1.02] hover:-rotate-2" />
                        </div>
                        <div className="relative z-10">
                            <img src={abt2} alt="Process" className="w-80 h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-white transition-all duration-700 hover:scale-[1.02] hover:rotate-2 opacity-80 hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

const CarouselManual: React.FC = () => {
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
        <div className="w-full max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Selected Works</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-zinc-900 leading-none tracking-tighter uppercase">
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
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <motion.img 
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
                                <motion.span 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-6"
                                >
                                    {projects[currentIndex].category}
                                </motion.span>
                                <motion.h3 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-6xl font-black text-white mb-4 leading-none tracking-tighter uppercase"
                                >
                                    {projects[currentIndex].title}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-zinc-400 text-sm md:text-lg max-w-xl mb-8 leading-relaxed"
                                >
                                    {projects[currentIndex].description}
                                </motion.p>
                                <motion.div
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
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute top-8 right-8 flex gap-3">
                    {projects.map((_, i) => (
                        <div 
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative h-1 cursor-pointer transition-all duration-500 rounded-full overflow-hidden ${i === currentIndex ? 'w-12 bg-white/20' : 'w-2 bg-white/30'}`}
                        >
                            {i === currentIndex && (
                                <motion.div 
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
    );
};

const BentoCard = ({ title, description, icon: Icon, className, link }: { title: string, description: string, icon: any, className?: string, link: string }) => (
    <Link to={link} className={cn("group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl border border-zinc-100 bg-white", className)}>
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon className="w-32 h-32" />
        </div>
        <div className="relative z-10 h-full flex flex-col">
            <div className="mb-6 inline-flex p-4 rounded-2xl bg-zinc-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-3 tracking-tighter uppercase">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">{description}</p>
            <div className="mt-auto flex items-center gap-2 text-xs font-black tracking-widest uppercase text-red-600 group-hover:gap-4 transition-all">
                Explore Service
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
        </div>
    </Link>
);

const ServicesBento: React.FC = () => {
    return (
        <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-50">
            <div className="container mx-auto">
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">What We Do</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-zinc-900 leading-none tracking-tighter uppercase mb-8">
                        Our <span className="text-red-600">Expertise</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-xl">
                        We combine technical precision with creative vision to deliver digital products that stand out.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <BentoCard 
                        link="/web-design"
                        className="md:col-span-4 md:row-span-2"
                        title="Web Design & Development"
                        description="High-performance, responsive websites built with modern frameworks. We focus on speed, accessibility, and conversion-driven user experiences."
                        icon={CodeBracketIcon}
                    />
                    <BentoCard 
                        link="/branding"
                        className="md:col-span-2"
                        title="Brand Identity"
                        description="Crafting unique visual languages that tell your story and resonate with your audience."
                        icon={EditIcon}
                    />
                    <BentoCard 
                        link="/ui-ux"
                        className="md:col-span-2"
                        title="UI/UX Design"
                        description="User-centric interfaces that are as beautiful as they are intuitive to use."
                        icon={DesktopIcon}
                    />
                    <BentoCard 
                        link="/seo"
                        className="md:col-span-3"
                        title="SEO & Marketing"
                        description="Strategic search engine optimization to put your brand in front of the right people at the right time."
                        icon={RocketIcon}
                    />
                    <BentoCard 
                        link="/hosting"
                        className="md:col-span-3"
                        title="Hosting & Maintenance"
                        description="Secure, lightning-fast hosting and ongoing support to keep your digital assets running smoothly."
                        icon={BookIcon}
                    />
                </div>
            </div>
        </section>
    );
};

const ProcessSection: React.FC = () => {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const steps = [
        { title: "Discovery", description: "We dive deep into your business goals, target audience, and market landscape to build a solid strategic foundation.", icon: "01" },
        { title: "Design", description: "Crafting a unique visual language and intuitive user experience that resonates with your brand identity.", icon: "02" },
        { title: "Development", description: "Transforming designs into high-performance, responsive code using the latest web technologies.", icon: "03" },
        { title: "Launch", description: "Rigorous testing and optimization followed by a seamless deployment to your production environment.", icon: "04" }
    ];
    return (
        <section id="process" className="py-24 md:py-32 px-6 md:px-12 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[1px] bg-red-600"></div>
                            <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Our Method</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-zinc-900 leading-none tracking-tighter uppercase">
                            The <span className="text-red-600">Process</span>
                        </h2>
                    </div>
                    <p className="text-zinc-500 text-lg max-w-sm">A systematic approach to delivering excellence, every single time.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-[2rem] overflow-hidden">
                    {steps.map((step, index) => (
                        <div 
                            key={index}
                            onMouseEnter={() => setHoveredStep(index)}
                            onMouseLeave={() => setHoveredStep(null)}
                            className="relative bg-white p-10 md:p-12 transition-all duration-500 group cursor-default h-[350px] md:h-[450px] flex flex-col"
                        >
                            <div className="text-6xl md:text-8xl font-black text-zinc-50 mb-8 transition-colors duration-500 group-hover:text-red-50/50">
                                {step.icon}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4 tracking-tighter uppercase group-hover:text-red-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {step.description}
                                </p>
                            </div>
                            <div className="mt-auto relative z-10">
                                <div className="w-12 h-1 bg-zinc-100 group-hover:w-full group-hover:bg-red-600 transition-all duration-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Pricing: React.FC = () => {
    const plans = [
        {
            name: "Starter",
            price: "₹14,999",
            description: "Perfect for small businesses and personal brands.",
            features: ["5 Pages Design", "Mobile Responsive", "Basic SEO", "1 Year Hosting", "SSL Certificate", "Contact Form"],
            buttonText: "Get Started",
            highlight: false
        },
        {
            name: "Professional",
            price: "₹29,999",
            description: "Ideal for growing startups and established companies.",
            features: ["10 Pages Design", "Custom UI/UX", "Advanced SEO", "High-Speed Hosting", "Business Emails", "Social Media Integration", "Priority Support"],
            buttonText: "Most Popular",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for complex digital requirements.",
            features: ["Unlimited Pages", "E-commerce Ready", "Full SEO Strategy", "Dedicated Server", "Custom Functionality", "24/7 Support", "Monthly Maintenance"],
            buttonText: "Contact Us",
            highlight: false
        }
    ];
    return (
        <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-50">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Investment</span>
                        <div className="w-8 h-[1px] bg-red-600"></div>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-zinc-900 leading-none tracking-tighter uppercase mb-8">
                        Simple <span className="text-red-600">Pricing</span>
                    </h2>
                    <p className="text-zinc-500 text-lg">Transparent packages designed to scale with your business needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={cn(
                                "relative p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col",
                                plan.highlight 
                                    ? "bg-zinc-900 text-white shadow-2xl scale-105 z-10" 
                                    : "bg-white text-zinc-900 border border-zinc-100 hover:shadow-xl"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                                    Recommended
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-black uppercase tracking-widest mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-sm opacity-50">/project</span>}
                                </div>
                            </div>
                            <p className={cn("text-sm mb-8 leading-relaxed", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                {plan.description}
                            </p>
                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", plan.highlight ? "bg-red-600" : "bg-red-600")}></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Link 
                                to="/contact"
                                className={cn(
                                    "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all active:scale-95",
                                    plan.highlight 
                                        ? "bg-red-600 text-white hover:bg-red-700" 
                                        : "bg-zinc-900 text-white hover:bg-zinc-800"
                                )}
                            >
                                {plan.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials: React.FC = () => {
    const reviews = [
        { name: "Alex Rivera", role: "CEO, TechFlow", content: "VGot You transformed our digital presence. Their attention to detail and strategic approach to design is unparalleled.", avatar: "AR" },
        { name: "Sarah Chen", role: "Founder, Bloom", content: "The SEO results we've seen since launching our new site have been incredible. Highly recommend their expertise.", avatar: "SC" },
        { name: "Marcus Thorne", role: "Director, Nexus", content: "Professional, fast, and creative. They didn't just build a website; they built a brand experience.", avatar: "MT" }
    ];
    return (
        <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[1px] bg-red-600"></div>
                            <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Client Stories</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-zinc-900 leading-none tracking-tighter uppercase">
                            Trusted by <span className="text-red-600">Leaders</span>
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-red-600" />)}
                            </div>
                            <p className="text-zinc-600 text-lg italic mb-8 leading-relaxed">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white font-black text-xs">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">{review.name}</h4>
                                    <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-1">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

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
            <path d="M50 0L61.226 38.774L100 50L61.226 61.226L50 100L38.774 61.226L0 50L38.774 38.774L50 0Z" className="fill-red-500" />
        </svg>
    </div>
);

const MarqueeColumn: React.FC<{ images: string[], reverse?: boolean, isHovered: boolean, className?: string }> = ({ images, reverse = false, isHovered, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(reverse ? -25 : 0);
    const speedRef = useRef(reverse ? 0.03 : -0.03);
    const isHoveredRef = useRef(isHovered);
    useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);
    useEffect(() => {
        let animationFrameId: number;
        const baseSpeed = 0.015;
        const hoverSpeed = 0.002;
        const smoothing = 0.08;
        const animate = () => {
            const targetSpeed = isHoveredRef.current ? (reverse ? hoverSpeed : -hoverSpeed) : (reverse ? baseSpeed : -baseSpeed);
            speedRef.current += (targetSpeed - speedRef.current) * smoothing;
            positionRef.current += speedRef.current;
            if (!reverse) { if (positionRef.current <= -25) positionRef.current = 0; }
            else { if (positionRef.current >= 0) positionRef.current = -25; }
            if (containerRef.current) containerRef.current.style.transform = `translate3d(0, ${positionRef.current}%, 0)`;
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [reverse]);
    return (
        <div className={`relative h-full overflow-hidden w-full select-none ${className}`}>
            <div ref={containerRef} className="flex flex-col gap-4 absolute top-0 left-0 w-full" style={{ willChange: 'transform' }}>
                {[...images, ...images, ...images, ...images].map((src, i) => (
                    <div key={i} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg opacity-60 transition-opacity duration-300 hover:opacity-100 bg-zinc-800">
                        <img src={src} alt="Project preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div>
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
        const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2500);
        return () => clearInterval(interval);
    }, []);
    return (
        <span className="inline-flex justify-center md:justify-start relative w-[180px] sm:w-[240px] md:w-[360px] lg:w-[420px] h-[1.2em]">
            <AnimatePresence mode="wait">
                <motion.span key={words[index]} initial={{ opacity: 0, rotateX: -90, y: 20 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: 90, y: -20 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`absolute top-0 left-0 w-full text-center md:text-left font-bold leading-none ${index % 2 === 0 ? 'text-white' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]'}`}>
                    {words[index]}
                </motion.span>
            </AnimatePresence>
            <span className="invisible font-bold leading-none">Limitless</span> 
        </span>
    );
};

const CtaSection: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const col1 = marqueeImages.slice(0, 3);
    const col2 = marqueeImages.slice(3, 6);
    const col3 = marqueeImages.slice(6, 9);
    return (
        <FadeInSection id="cta" className="relative mt-20 h-[100dvh] w-full overflow-hidden group bg-black transition-colors duration-300">
            <div className="w-full h-full flex items-center justify-center text-center text-white relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 overflow-hidden bg-black transition-colors duration-300">
                        <div className="absolute inset-0 w-[160%] h-[150%] -left-[30%] -top-[25%] transform rotate-[-10deg] skew-y-12 scale-110 flex justify-center items-center gap-2 md:gap-4 grayscale hover:grayscale-0 transition-all duration-1000 opacity-100">
                            <MarqueeColumn images={col1} isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col2} reverse isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col3} isHovered={isHovered} className="flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col1} reverse isHovered={isHovered} className="hidden md:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col2} isHovered={isHovered} className="hidden lg:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col3} reverse isHovered={isHovered} className="hidden xl:block flex-1 max-w-[200px] md:max-w-[250px]" />
                            <MarqueeColumn images={col1} isHovered={isHovered} className="hidden xl:block flex-1 max-w-[200px] md:max-w-[250px]" />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0 pointer-events-none transition-colors duration-300"></div>
                <div className="relative z-10 w-full max-w-[95vw] md:max-w-6xl px-4 flex flex-col items-center">
                    <motion.h2 initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl flex flex-col md:flex-row items-center md:items-baseline justify-center gap-x-3 gap-y-2 leading-tight">
                        <span className="whitespace-nowrap">Let’s Build Something</span>
                        <FlipWords />
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-gray-300 leading-relaxed max-w-lg md:max-w-3xl mx-auto">
                        From stunning websites to unique brand identities, I transform your ideas into reality. Collaborate with us to craft digital experiences that truly inspire.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4, type: "spring" }}>
                        <Link to="/contact" className="inline-block bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 text-sm sm:text-base rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer z-30">
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

const PortfolioCard = ({ to, image, title, subtitle }: { to: string, image: string, title: string, subtitle: string }) => {
    const divRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    return (
        <Link ref={divRef} to={to} onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)} className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white w-full aspect-video shadow-md">
            <div className="pointer-events-none absolute -inset-px transition duration-300 z-10" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.08), transparent 40%)` }} />
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
                <p className="text-gray-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">{subtitle}</p>
            </div>
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-gray-300 transition-colors z-30 pointer-events-none" />
        </Link>
    );
};

const Home: React.FC = () => {
    return (
        <div className="bg-white text-gray-900 transition-colors duration-300">
            <HeroSection />
            <AboutSection />
            
            {/* PROJECTS */}
            <section id="project" className="relative py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <CarouselManual />
                </div>
            </section>
            
            <ServicesBento />

            <ProcessSection />

            <FadeInSection id="portfolio" className="relative bg-white py-20 px-4 overflow-hidden flex flex-col items-center justify-center">
                <div className="container mx-auto text-center max-w-6xl relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">Featured Work</h2>
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        <PortfolioCard to="/web-design" image={"https://www.vgotyou.com/assets/web-designer.png"} title="Web Design" subtitle="Crafting immersive digital experiences." />
                        <PortfolioCard to="/logo-showcase" image={"https://www.vgotyou.com/assets/logo-designer.png"} title="Logo Showcase" subtitle="Building memorable brand identities." />
                    </div>
                </div>
            </FadeInSection>

            <Pricing />
            <Testimonials />
        </div>
    );
};

export default Home;
