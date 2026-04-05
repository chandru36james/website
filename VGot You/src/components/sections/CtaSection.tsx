import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, WhatsAppIcon } from '../common/Icons';

const m = motion as any;

const WHATSAPP_NUMBER = "917871120415";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi VGot You! I'm interested in your web design services. Can we talk?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const CtaSection: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32 border-t border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10">
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-6 block">Ready to Scale?</span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
              LET'S BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">DIGITAL LEGACY.</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Partner with VGot You to create a high-performance digital presence that drives growth and defines your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact?message=Hi VGot You, I'm ready to build my digital legacy. Let's start a project together!"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-zinc-800 border border-zinc-700 rounded-full hover:bg-zinc-700 w-full sm:w-auto"
              >
                <WhatsAppIcon className="w-5 h-5 mr-3 text-green-500" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};
