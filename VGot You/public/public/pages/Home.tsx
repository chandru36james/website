import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CarouselManual from '../components/CarouselManual';
import { ServicesBento } from '../components/ServicesBento';
import { HeroSection } from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import CtaSection from '../components/CtaSection';
import FadeInSection from '../components/FadeInSection';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

const PortfolioCard = ({ 
    to, 
    image, 
    title, 
    subtitle 
}: { 
    to: string, 
    image: string, 
    title: string, 
    subtitle: string 
}) => {
    const divRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <Link
            ref={divRef}
            to={to}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative block overflow-hidden rounded-xl border border-zinc-800 bg-black w-full aspect-video shadow-lg"
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {title}
                </h3>
                 <p className="text-neutral-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {subtitle}
                </p>
            </div>
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-800 group-hover:ring-neutral-700 transition-colors z-30 pointer-events-none" />
        </Link>
    );
};

const Home: React.FC = () => {
    const web_design = "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop";
    const logo_design = "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2070&auto=format&fit=crop";
    
    return (
        <div className="bg-black text-gray-100 transition-colors duration-300">
            <HeroSection />
            <AboutSection />

            <section id="clients" className="relative py-20 bg-black overflow-hidden transition-colors duration-300">
                <div className="container mx-auto px-4 relative z-10">
                    <CarouselManual />
                </div>
            </section>
            
            <ServicesBento />
            <ProcessSection />

            <FadeInSection id="portfolio" className="relative bg-black py-20 px-4 overflow-hidden flex flex-col items-center justify-center antialiased transition-colors duration-300">
                <div className="container mx-auto text-center max-w-6xl relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white drop-shadow-sm relative z-20">Featured Work</h2>
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        <PortfolioCard to="/web-design" image={"https://www.vgotyou.com/assets/web-designer.png"} title="Web Design" subtitle="Crafting immersive digital experiences." />
                         <PortfolioCard to="/Logo-Showcase" image={"https://www.vgotyou.com/assets/logo-designer.png"} title="Logo Showcase" subtitle="Building memorable brand identities." />
                    </div>
                </div>
            </FadeInSection>

            <Pricing />
            <CtaSection />
            <Testimonials />
        </div>
    );
};

export default Home;