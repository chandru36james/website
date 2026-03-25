import React from 'react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CodeBracketIcon, EditIcon, DesktopIcon, RocketIcon, BookIcon } from '../common/Icons';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const ServicesSection: React.FC = () => {
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
