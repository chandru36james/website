import React from 'react';
import { StarIcon } from '../common/Icons';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    text: "VGot You transformed our online presence. Their strategic approach to web design and SEO delivered measurable results beyond our expectations.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Founder, Bloom Digital",
    text: "The team at VGot You is exceptional. Their attention to detail and commitment to excellence is evident in every project they undertake.",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Emily Davis",
    role: "Marketing Director, Luxe Brands",
    text: "Working with VGot You was a game-changer for our brand. Their innovative designs and data-driven strategies helped us scale our business significantly.",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32 border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Endorsements</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">TESTIMONIALS.</span>
          </h2>
          <p className="text-zinc-500 mt-6 max-w-2xl mx-auto text-sm md:text-lg font-light">
            We take pride in delivering results that matter. Here is what some of our valued partners have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-3xl flex flex-col h-full hover:shadow-2xl hover:border-red-600/20 transition-all duration-500 group shadow-sm">
              <svg className="w-10 h-10 text-zinc-800 mb-6 group-hover:text-red-600/20 transition-colors" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 flex-grow italic font-light">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto pt-8 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-red-600/20 transition-all duration-500" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border-2 border-black">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-white text-base group-hover:text-red-500 transition-colors">{t.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">{t.role}</p>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-3.5 h-3.5 text-red-600" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 opacity-60 max-w-4xl mx-auto">
          {[{ val: "4.9/5", label: "Average Rating" }, { val: "100%", label: "Project Delivery" }, { val: "24/7", label: "Premium Support" }].map(({ val, label }, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block h-12 w-[1px] bg-zinc-800" />}
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-4xl md:text-5xl font-black text-white">{val}</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500">{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
