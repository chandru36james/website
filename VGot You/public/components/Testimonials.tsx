import React from 'react';
import FadeInSection from './FadeInSection';
import { StarIcon } from './Icons';

const avatar1 = "https://www.vgotyou.com/assets/venkat.png";
const avatar2 = "https://www.vgotyou.com/assets/santhosh.png";
const avatar3 = "https://www.vgotyou.com/assets/aravind.png";

const testimonials = [
    { 
        name: "Venkat Krishnan", 
        role: "Director of Rudhraa Exports", 
        text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled. The B2B platform they built for us has significantly improved our global operations.", 
        avatar: avatar1 
    },
    { 
        name: "Santhosh", 
        role: "Founder of Arctic Textiles", 
        text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments! Their team really understood our manufacturing roots while bringing a global appeal.", 
        avatar: avatar2 
    },
    { 
        name: "Aravind Kumar", 
        role: "Manager of Bloom Green Developers", 
        text: "An incredibly professional and efficient team. They delivered our complex project on time and exceeded expectations. The conversion rate on our landing page jumped 3x.", 
        avatar: avatar3 
    },
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0], index: number }> = ({ testimonial, index }) => (
    <div 
        className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:border-red-600/30 group"
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        {/* Quote Mark */}
        <svg className="w-8 h-8 text-zinc-800 mb-4 group-hover:text-red-900/40 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>

        {/* Testimonial Text */}
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 flex-grow italic">
            "{testimonial.text}"
        </p>

        {/* Client Info */}
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
            <div className="relative">
                <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-red-600/50 transition-all duration-500" 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center border-2 border-zinc-900">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="overflow-hidden">
                <p className="font-bold text-white text-sm md:text-base truncate group-hover:text-red-500 transition-colors">{testimonial.name}</p>
                <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mt-0.5 truncate">{testimonial.role}</p>
                {/* Rating Stars - Moved under the name and role */}
                <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5 text-red-600" />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <FadeInSection className="bg-black py-20 md:py-32 border-t border-zinc-900 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-red-600 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-4 block">Endorsements</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">Testimonials.</span>
                    </h2>
                    <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm md:text-lg">
                        We take pride in delivering results that matter. Here is what some of our valued partners have to say about working with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} index={i} />
                    ))}
                </div>

                {/* Bottom Trust Badge - Optimized for Mobile */}
                <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24 opacity-40 sm:opacity-30 grayscale hover:grayscale-0 transition-all duration-700 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-white">4.9/5</span>
                        <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 text-center sm:text-left">Average Rating</div>
                    </div>
                    <div className="hidden sm:block h-10 w-[1px] bg-zinc-800"></div>
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-white">100%</span>
                        <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 text-center sm:text-left">Project Delivery</div>
                    </div>
                    <div className="hidden sm:block h-10 w-[1px] bg-zinc-800"></div>
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="text-3xl md:text-4xl font-black text-white">24/7</span>
                        <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 text-center sm:text-left">Premium Support</div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default Testimonials;