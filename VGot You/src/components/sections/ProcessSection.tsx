import React from 'react';
import { motion } from 'motion/react';

const m = motion as any;

const steps = [
  {
    title: "Discovery",
    description: "We dive deep into your brand, goals, and audience to define a strategic direction.",
    icon: "01",
    color: "bg-red-600"
  },
  {
    title: "Strategy",
    description: "We craft a comprehensive plan to achieve your objectives and drive measurable results.",
    icon: "02",
    color: "bg-zinc-900"
  },
  {
    title: "Design",
    description: "We create immersive digital experiences that captivate and convert your audience.",
    icon: "03",
    color: "bg-zinc-800"
  },
  {
    title: "Launch",
    description: "We execute with precision and provide ongoing support to ensure your success.",
    icon: "04",
    color: "bg-red-500"
  }
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32 border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            HOW WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">WORK.</span>
          </h2>
          <p className="text-zinc-500 mt-6 max-w-2xl mx-auto text-sm md:text-lg font-light">
            We follow a proven process to deliver exceptional results for our clients. From discovery to launch, we are with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((s, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col gap-6">
                <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-600/10`}>
                  {s.icon}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{s.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">{s.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-[1px] bg-gradient-to-r from-zinc-800 to-transparent z-0" />
              )}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
