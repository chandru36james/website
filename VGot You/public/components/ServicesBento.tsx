
import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, EditIcon, DesktopIcon, BookIcon, RocketIcon } from './Icons';

export const ServicesBento: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                
                {/* Header with Background Text */}
                <div className="text-center mb-20 relative">
                     
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 tracking-tight">
                            Our <span className="text-red-600">Specialization</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                            Comprehensive digital solutions, from code to creative, designed to elevate your brand.
                        </p>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
                    
                    {/* 1. Web Development (Large - Spans 2 Cols) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative md:col-span-2 bg-zinc-950 rounded-[2rem] p-8 overflow-hidden border border-zinc-800 shadow-xl"
                    >
                        {/* Abstract Code Background */}
                        <div className="absolute right-0 top-0 w-3/5 h-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 font-mono text-xs md:text-sm text-green-500 overflow-hidden hidden sm:flex flex-col p-6 select-none leading-relaxed pointer-events-none">
                            {`const VGotYou = () => {
  return (
    <DigitalExperience>
      <Performance 
        score={100} 
        optimized={true} 
      />
      <Design 
        mode="responsive" 
        aesthetic="modern" 
      />
      <Scalability 
        level="infinite" 
      />
    </DigitalExperience>
  );
}`}
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-0"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-4 border border-zinc-800 group-hover:scale-110 group-hover:border-green-500/50 transition-all duration-300 shadow-lg">
                                <CodeBracketIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-3">Web Development</h3>
                                <p className="text-zinc-400 max-w-sm text-lg leading-relaxed">Robust, scalable, and high-performance websites built with modern technologies like React, Next.js, and TypeScript.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Logo Design (Square - 1 Col) */}
                    <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.1 }}
                         className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-8 overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                         {/* Technical Grid Pattern */}
                         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-100 group-hover:opacity-50 transition-opacity"></div>
                         
                         {/* Floating Shapes Decor */}
                         <div className="absolute top-1/2 right-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all duration-500"></div>

                         <div className="relative z-10 h-full flex flex-col justify-between">
                             <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <EditIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Logo Design</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Memorable identities tailored to define your brand.</p>
                            </div>
                         </div>
                    </motion.div>

                    {/* 3. Landing Pages (Square - 1 Col) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative bg-gradient-to-br from-red-600 to-red-800 rounded-[2rem] p-8 overflow-hidden text-white shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Rocket Icon Decor */}
                        <div className="absolute top-4 right-4 opacity-20 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:scale-110 transition-transform duration-500">
                             <RocketIcon className="w-32 h-32" />
                        </div>
                         
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 shadow-inner">
                                <DesktopIcon className="w-7 h-7" />
                            </div>
                             <div>
                                <h3 className="text-2xl font-bold mb-2">Landing Pages</h3>
                                <p className="text-red-100 leading-relaxed">High-converting designs engineered to turn visitors into customers.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Portfolio Sites (Large - Spans 2 Cols) */}
                    <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.3 }}
                         className="group relative md:col-span-2 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] p-8 overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg"
                    >
                         {/* Dynamic Image Collage Background */}
                        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-1/2 opacity-40 dark:opacity-30 group-hover:opacity-60 transition-opacity duration-500 hidden sm:grid grid-cols-2 gap-3 p-4 transform skew-x-[-10deg] translate-x-12 scale-110 group-hover:translate-x-4 transition-transform ease-out">
                             <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop" className="w-full h-32 object-cover rounded-lg shadow-md transform translate-y-4" alt="Portfolio 1" />
                             <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop" className="w-full h-40 object-cover rounded-lg shadow-md -translate-y-4" alt="Portfolio 2" />
                             <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" className="w-full h-40 object-cover rounded-lg shadow-md translate-y-2" alt="Portfolio 3" />
                             <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" className="w-full h-32 object-cover rounded-lg shadow-md -translate-y-8" alt="Portfolio 4" />
                        </div>
                        
                        {/* Gradient Fade for text readability */}
                         <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/95 to-transparent dark:from-zinc-900 dark:via-zinc-900/95 dark:to-transparent z-0 sm:w-2/3"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between max-w-md">
                             <div className="w-14 h-14 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-gray-900 dark:text-white mb-4 border border-gray-200 dark:border-zinc-700 shadow-sm group-hover:shadow-md transition-shadow">
                                <BookIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Portfolio Sites</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">Showcase your work with elegance. Clean layouts, smooth animations, and a laser focus on your content.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
