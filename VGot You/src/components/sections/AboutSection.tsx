import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../common/Icons';

const m = motion as any;

export const AboutSection: React.FC = () => {
  const abt1 = "https://vgotyou.com/assets/abt1.png";
  const abt2 = "https://vgotyou.com/assets/abt2.png";

  return (
    <section className="bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl"
            >
              <img src={abt1} alt="About VGot You" className="w-full h-full object-cover" />
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -right-12 z-20 w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-8 border-black shadow-2xl hidden md:block"
            >
              <img src={abt2} alt="About VGot You" className="w-full h-full object-cover" />
            </m.div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-600/20 rounded-full blur-3xl z-0" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
              WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">VGOT YOU.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-8">
              VGot You is a premium digital agency specializing in high-performance web design, SEO, and strategic marketing. We don't just build websites; we create digital legacies that drive results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                { title: "Strategic Design", desc: "User-centric designs that convert visitors into loyal customers." },
                { title: "Data-Driven SEO", desc: "Proven strategies to dominate search results and drive growth." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-zinc-500 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="group inline-flex items-center text-white font-bold text-sm"
            >
              Discover Our Story
              <div className="ml-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
