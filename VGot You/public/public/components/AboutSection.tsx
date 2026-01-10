import React from 'react';
import FadeInSection from './FadeInSection';
import { Link } from "react-router-dom";

const AboutSection: React.FC = () => {
    const abt1 = "https://vgotyou.com/assets/abt1.png";
    const abt2 = "https://www.vgotyou.com/assets/abt2.png";

    return (
        <FadeInSection className="container mx-auto py-16 md:py-24 px-6 md:px-12 bg-black">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <span className="text-zinc-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Who We Are</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                        Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Future</span>, Today.
                    </h2>
                    <p className="text-zinc-400 mb-10 text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-none">
                        I'm a passionate team of developers and designers dedicated to building exceptional digital experiences. I believe in the power of combining clean code with aesthetic design to create products that not only look good but also perform flawlessly. Your vision is our blueprint.
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6 w-full mb-10 text-left">
                        <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:shadow-md hover:border-red-500/20">
                            <div className="bg-black p-2.5 rounded-xl shadow-sm text-red-600 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-base md:text-lg text-white">Pixel-Perfect Design</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-snug">Visually stunning interfaces that users love.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:shadow-md hover:border-red-500/20">
                            <div className="bg-black p-2.5 rounded-xl shadow-sm text-red-600 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-base md:text-lg text-white">Scalable Dev</h3>
                                <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-snug">Robust code that grows with your business.</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-2 bg-white text-black font-bold py-3.5 px-8 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl shadow-white/10"
                        aria-label="Learn more about us"
                    >
                        <span>Learn More About Me</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                {/* Image Composition */}
                <div className="hidden lg:flex relative h-[300px] sm:h-[400px] lg:h-[500px] w-full justify-center lg:justify-end mt-8 lg:mt-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-red-900/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative w-full h-full grid grid-cols-2 gap-3 sm:gap-6">
                        <img 
                            src={abt1} 
                            alt="Web design brainstorming" 
                            className="w-full h-[85%] object-cover rounded-xl sm:rounded-2xl shadow-xl self-end transform transition-transform hover:-translate-y-2 duration-500 border-[3px] sm:border-4 border-zinc-900" 
                        />
                        <img 
                            src={abt2} 
                            alt="Creative process" 
                            className="w-full h-[85%] object-cover rounded-xl sm:rounded-2xl shadow-xl self-start mt-6 sm:mt-12 transform transition-transform hover:-translate-y-2 duration-500 border-[3px] sm:border-4 border-zinc-900" 
                        />
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default AboutSection;