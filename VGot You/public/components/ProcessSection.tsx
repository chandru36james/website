
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProcessSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const processSteps = [
        {
            title: 'Discovery',
            description: 'We start by understanding your vision, goals, and audience.',
            detailedDescription: 'We dive deep into your business model, market positioning, and user needs to gather all requirements. This phase sets the foundation for a successful project tailored to your specific objectives.',
            imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
            iconUrl: 'https://www.vgotyou.com/assets/discovery.png'
        },
        {
            title: 'Planning',
            description: 'A comprehensive strategy and project roadmap are crafted.',
            detailedDescription: 'We define the technical architecture, sitemap, and user flows. Milestones are set to ensure the project stays on track, and we select the best technologies for scalability and performance.',
            imageUrl: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop',
            iconUrl: 'https://www.vgotyou.com/assets/plan.png'
        },
        {
            title: 'Design',
            description: 'We create intuitive UI/UX designs and high-fidelity mockups.',
            detailedDescription: 'Our design team translates wireframes into stunning visuals. We focus on user experience (UX) to ensure the interface is intuitive, accessible, and aligned with your brand identity.',
            imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
            iconUrl: 'https://www.vgotyou.com/assets/design.png'
        },
        {
            title: 'Development',
            description: 'Turning designs into a functional, scalable product.',
            detailedDescription: 'We write clean, efficient code using modern frameworks. Whether it’s frontend interactivity or backend logic, we ensure everything is robust, secure, and optimized for speed.',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
            iconUrl: 'https://www.vgotyou.com/assets/development.png'
        },
        {
            title: 'Delivery',
            description: 'Deployment, testing, and final handover.',
            detailedDescription: 'After rigorous QA testing across devices and browsers, we deploy your site. We provide training on how to manage it and hand over all assets, ensuring a smooth and successful launch.',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
            iconUrl: 'https://www.vgotyou.com/assets/delivery.png'
        }
    ];

    return (
        <section className="relative py-20 px-4 bg-black overflow-hidden">
             {/* Radar Pattern Background - Scanning Animation */}
             <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                {/* Static Rings */}
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: 'repeating-radial-gradient(circle at 100% 50%, transparent 0, transparent 40px, #ef4444 40px, #ef4444 41px)',
                        maskImage: 'radial-gradient(circle at 100% 50%, black, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle at 100% 50%, black, transparent 70%)'
                    }}
                ></div>

                {/* Scanning Beam Animation */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'conic-gradient(from 0deg at 100% 50%, transparent 0deg, transparent 280deg, rgba(239, 68, 68, 0.4) 360deg)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                ></motion.div>
             </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 container mx-auto text-center"
            >
                <h2 className="text-4xl font-bold mb-16 text-white">Our Proven Process</h2>
            </motion.div>
            
            <div className="relative max-w-5xl mx-auto z-10">
                {/* Vertical Line */}
                <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-zinc-800 -translate-x-1/2"></div>

                {processSteps.map((step, index) => (
                    <motion.div 
                        key={index} 
                        layout 
                        className={`mb-8 flex flex-col md:flex-row justify-between items-center w-full ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} group`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="hidden md:block w-5/12 pointer-events-none"></div>
                        
                        {/* Icon Circle */}
                        <motion.div 
                            layout 
                            className={`z-20 flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 mb-4 md:mb-0 flex-shrink-0 transition-all duration-500 overflow-hidden p-3
                                ${hoveredIndex === index ? 'bg-red-600 border-red-600 scale-110' : 'bg-black border-red-600'}
                            `}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 }}
                        >
                            <img 
                                src={step.iconUrl} 
                                alt={step.title} 
                                // Always invert to white (brightness-0 makes it black, invert makes it white)
                                className="w-full h-full object-contain filter brightness-0 invert" 
                            />
                        </motion.div>
                        
                        {/* Content Card */}
                        <motion.div 
                            layout 
                            className={`w-full md:w-5/12 perspective-1000`}
                        >
                            <motion.div 
                                layout 
                                className={`bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 text-left relative overflow-hidden ${hoveredIndex === index ? 'shadow-2xl border-red-900/50' : ''}`}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.h3 layout="position" className="font-bold text-xl mb-2 flex items-center gap-2 text-white">
                                    <span className="text-zinc-500 text-sm font-normal">0{index + 1}.</span>
                                    {step.title}
                                </motion.h3>
                                <motion.p layout="position" className="text-gray-400 text-sm leading-snug">{step.description}</motion.p>
                                
                                {/* Expandable Content */}
                                <AnimatePresence mode="wait">
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <div className="pt-4 border-t border-zinc-800 mt-4">
                                                <img 
                                                    src={step.imageUrl} 
                                                    alt={step.title} 
                                                    className="w-full h-32 object-cover rounded-lg mb-4" 
                                                />
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {step.detailedDescription}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProcessSection;
