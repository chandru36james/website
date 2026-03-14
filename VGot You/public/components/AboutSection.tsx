import React from 'react';
import FadeInSection from './FadeInSection';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM as any;

const AboutSection: React.FC = () => {
    const abt1 = "https://vgotyou.com/assets/abt1.png";
    const abt2 = "https://www.vgotyou.com/assets/abt2.png";

    return (
        <FadeInSection className="container mx-auto py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                {/* Text Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-400 font-black tracking-[0.4em] uppercase text-[10px]">Who We Are</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[0.9] text-zinc-900 tracking-tighter uppercase">
                        Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Future</span>, Today.
                    </h2>
                    <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-none">
                        We are a professional web design and branding{" "}
                        <Link to="/digital-studio-tamil-nadu" className="text-red-600 hover:text-red-500">
                            studio
                        </Link>{" "}
                        based in Tamil Nadu, helping startups and businesses build high-performance websites, strong brand identities, and conversion-focused digital experiences.
                    </p>

                    {/* Features Grid */}
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

                    <Link
                        to="/chandru"
                        className="group relative inline-flex items-center gap-4 bg-zinc-900 text-white font-bold py-4 px-10 rounded-full hover:bg-red-600 transition-all shadow-2xl active:scale-95"
                    >
                        <span className="text-xs uppercase tracking-[0.3em]">Meet the Founder</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                {/* Image Composition */}
                <div className="hidden lg:flex relative h-[600px] w-full justify-center lg:justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-red-600/10 via-transparent to-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

                    <div className="relative w-full h-full flex items-center justify-end">
                        <div className="relative z-20 transform -translate-x-12 translate-y-12">
                            <img 
                                src={abt1} 
                                alt="Strategy discussion at VGot You" 
                                className="w-72 h-96 object-cover rounded-[2rem] shadow-2xl border-4 border-white transition-all duration-700 hover:scale-[1.02] hover:-rotate-2" 
                            />
                        </div>
                        <div className="relative z-10">
                            <img 
                                src={abt2} 
                                alt="Development process" 
                                className="w-80 h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-white transition-all duration-700 hover:scale-[1.02] hover:rotate-2 opacity-80 hover:opacity-100" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default AboutSection;
