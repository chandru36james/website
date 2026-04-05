import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../common/Icons';

const m = motion as any;

const services = [
  {
    title: "Web Design",
    description: "Immersive digital experiences that captivate and convert.",
    link: "/web-design",
    color: "bg-red-600",
    size: "lg:col-span-2 lg:row-span-2",
    img: "https://vgotyou.com/assets/service1.png"
  },
  {
    title: "SEO",
    description: "Dominate search results and drive organic growth.",
    link: "/seo",
    color: "bg-zinc-900",
    size: "lg:col-span-1 lg:row-span-1",
    img: "https://vgotyou.com/assets/service2.png"
  },
  {
    title: "Branding",
    description: "Identity systems that define your brand's essence.",
    link: "/branding",
    color: "bg-zinc-800",
    size: "lg:col-span-1 lg:row-span-1",
    img: "https://vgotyou.com/assets/service3.png"
  },
  {
    title: "Marketing",
    description: "Strategic campaigns that scale your business.",
    link: "/marketing",
    color: "bg-red-500",
    size: "lg:col-span-2 lg:row-span-1",
    img: "https://vgotyou.com/assets/service4.png"
  }
];

export const ServicesBento: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              SERVICES <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">BENTO.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-sm md:text-base font-light">
            We offer a comprehensive suite of digital services designed to elevate your brand and drive measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl ${s.size} min-h-[300px] md:min-h-[400px] bg-zinc-900 border border-zinc-800 hover:border-red-600/50 transition-all duration-500`}
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{s.title}</h3>
                <p className="text-zinc-400 text-sm md:text-base font-light mb-6 max-w-xs">{s.description}</p>
                <Link
                  to={s.link}
                  className="inline-flex items-center text-white font-bold text-sm group/btn"
                >
                  Learn More
                  <div className="ml-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-red-600 transition-all duration-300">
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
