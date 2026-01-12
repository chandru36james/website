import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, EditIcon, DesktopIcon, BookIcon, RocketIcon } from './Icons.tsx';

// --- Local Utils ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BentoCard = ({ 
    children, 
    className, 
    delay = 0 
}: { 
    children?: React.ReactNode, 
    className?: string, 
    delay?: number 
}) => (
    <m.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        className={cn(
            "group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-zinc-900 transition-all duration-500",
            className
        )}
    >
        {children}
    </m.div>
);

export const ServicesBento: React.FC = () => {
    return (
        <section className="py-16 md:py-32 bg-black text-white relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                
                <div className="text-center mb-12 md:mb-24">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-zinc-900 text-zinc-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-zinc-800">
                            Our Expertise
                        </span>
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 tracking-tight">
                            Digital <span className="text-red-600 italic">Excellence.</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed px-4">
                            We don't just build websites; we craft digital legacies through precise code and strategic design.
                        </p>
                    </m.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-6 auto-rows-min md:auto-rows-[350px]">
                    <BentoCard className="md:col-span-4 bg-zinc-950 border-zinc-800 shadow-2xl min-h-[240px] md:min-h-[350px]">
                        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-10 group-hover:opacity-30 transition-opacity duration-700 font-mono text-[8px] md:text-xs text-green-500 p-6 md:p-8 select-none leading-relaxed pointer-events-none overflow-hidden hidden sm:block">
                            {`const Innovation = ({ vision, tools }) => {
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const build = async () => {
      const site = await Architect.create({
        design: "pixel-perfect",
        performance: "optimized",
        seo: "grounded"
      });
      setSuccess(site.status === 200);
    };
    build();
  }, [vision]);

  return success ? <Launch /> : <Code />;
};`}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-0"></div>
                        <div className="relative z-10 h-full p-6 md:p-12 flex flex-col justify-between">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-4 border border-zinc-800 group-hover:scale-110 group-hover:border-green-500/50 transition-all duration-500 shadow-xl">
                                <CodeBracketIcon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Web Development</h3>
                                <p className="text-zinc-400 max-w-sm text-sm md:text-lg leading-relaxed">
                                    High-performance applications built with React, Next.js, and TypeScript. Optimized for speed and scalability.
                                </p>
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard className="md:col-span-2 bg-zinc-900 border-zinc-800 shadow-xl min-h-[220px] md:min-h-[350px]" delay={0.1}>
                         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:18px_18px] md:bg-[size:24px_24px] opacity-100 group-hover:opacity-50 transition-opacity"></div>
                         <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all duration-700"></div>
                         <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between">
                             <div className="w-12 h-12 md:w-16 md:h-16 bg-red-900/10 rounded-xl md:rounded-2xl flex items-center justify-center text-red-600 mb-4 md:mb-4 border border-red-900/20 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                                <EditIcon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">Brand Identity</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                                    Crafting visual systems that define your market presence.
                                </p>
                            </div>
                         </div>
                    </BentoCard>

                    <BentoCard className="md:col-span-2 bg-red-600 border-red-500 shadow-2xl text-white min-h-[220px] md:min-h-[350px]" delay={0.2}>
                        <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-110 rotate-12 group-hover:scale-125 group-hover:rotate-0 transition-transform duration-700">
                             <RocketIcon className="w-20 h-20 md:w-32 md:h-32" />
                        </div>
                        <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-4 border border-white/30 shadow-2xl group-hover:translate-y-[-5px] transition-transform">
                                <DesktopIcon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                             <div>
                                <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">Conversion Flow</h3>
                                <p className="text-red-50 leading-relaxed text-sm md:text-lg">
                                    Strategic landing pages engineered to maximize engagement.
                                </p>
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard className="md:col-span-4 bg-zinc-900 border-zinc-800 shadow-xl min-h-[240px] md:min-h-[350px]" delay={0.3}>
                        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-700 hidden sm:grid grid-cols-2 gap-4 p-6 transform md:skew-x-[-8deg] md:translate-x-12 md:scale-110 group-hover:translate-x-6">
                             <div className="flex flex-col gap-4">
                                <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl shadow-xl" alt="Showcase 1" loading="lazy" />
                                <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl shadow-xl" alt="Showcase 2" loading="lazy" />
                             </div>
                             <div className="flex flex-col gap-4 pt-12">
                                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl shadow-xl" alt="Showcase 3" loading="lazy" />
                                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" className="w-full h-48 object-cover rounded-2xl shadow-xl" alt="Showcase 4" loading="lazy" />
                             </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-transparent z-0 sm:w-2/3"></div>
                        <div className="relative z-10 h-full p-6 md:p-12 flex flex-col justify-between max-w-lg">
                             <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-4 border border-zinc-700 shadow-md group-hover:shadow-red-500/10 transition-shadow">
                                <BookIcon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Content Showcase</h3>
                                <p className="text-gray-400 text-sm md:text-xl leading-relaxed">
                                    Bespoke portfolio websites designed to tell your unique brand story with elegance.
                                </p>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};