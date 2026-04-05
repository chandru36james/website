import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection } from '../common/FadeInSection';

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

export const FeaturedWorkSection: React.FC = () => {
    return (
        <FadeInSection id="portfolio" className="relative bg-white py-20 px-4 overflow-hidden flex flex-col items-center justify-center">
            <div className="container mx-auto text-center max-w-6xl relative z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">Featured Work</h2>
                <div className="grid md:grid-cols-2 gap-8 w-full">
                    <PortfolioCard to="/web-design" image={"https://www.vgotyou.com/assets/web-designer.png"} title="Web Design" subtitle="Crafting immersive digital experiences." />
                    <PortfolioCard to="/logo-showcase" image={"https://www.vgotyou.com/assets/logo-designer.png"} title="Logo Showcase" subtitle="Building memorable brand identities." />
                </div>
            </div>
        </FadeInSection>
    );
};
