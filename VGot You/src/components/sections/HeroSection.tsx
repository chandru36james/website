import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Globe } from '../ui/globe';
import { SparklesCore } from '../ui/sparkles';
import { WhatsAppIcon, ArrowRightIcon } from '../common/Icons';

const WHATSAPP_NUMBER = "917871120415";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi VGot You! I'm interested in your web design services. Can we talk?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const m = motion as any;

const CountUp = ({ end, duration = 2000, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let id: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      if (elapsed < delay) { id = requestAnimationFrame(animate); return; }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) id = requestAnimationFrame(animate);
      else setCount(end);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [end, duration, delay]);
  return <span className="tabular-nums">{count}</span>;
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-black flex items-center">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#ef4444"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Available for new projects</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">DIGITAL</span> <br />
              LEGACIES.
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              High-performance websites and digital experiences crafted for brands that refuse to be ordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact?message=Hi VGot You, I'm interested in starting a new project with you. Let's discuss the details!"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none"
              >
                Start Your Project
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 text-green-500" />
                WhatsApp Us
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">
              {[
                { label: "Projects", val: 150, suffix: "+" },
                { label: "Retention", val: 98, suffix: "%" },
                { label: "Awards", val: 12, suffix: "" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-black text-white">
                    <CountUp end={stat.val} delay={500} />{stat.suffix}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-full blur-3xl" />
            <div className="h-[600px] w-full relative">
              <Globe className="scale-125" />
            </div>
          </m.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent" />
      </div>
    </section>
  );
};
