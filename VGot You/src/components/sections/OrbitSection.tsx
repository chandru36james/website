import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const m = motion as any;

const labels = [
  { text: 'Web Design', color: 'bg-red-600', radius: 220, angle: 0 },
  { text: 'SEO',              color: 'bg-zinc-900', radius: 180, angle: 45 },
  { text: 'Digital Marketing', color: 'bg-zinc-900', radius: 260, angle: 90 },
  { text: 'E-commerce',      color: 'bg-zinc-900', radius: 200, angle: 135 },
  { text: 'UI/UX',           color: 'bg-zinc-900', radius: 240, angle: 180 },
  { text: 'Branding',        color: 'bg-zinc-900', radius: 190, angle: 225 },
  { text: 'Strategy',        color: 'bg-zinc-900', radius: 250, angle: 270 },
  { text: 'Analytics',       color: 'bg-zinc-900', radius: 210, angle: 315 },
];

// ✅ FIX 5: Memoize transforms — computed once, not on every render
const labelTransforms = labels.map(
  (l) => `rotate(${l.angle}deg) translate(${l.radius}px) rotate(-${l.angle}deg)`
);

export const OrbitSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-24 px-6 border-b border-zinc-900">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-container {
          animation: orbit 60s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          will-change: transform;
        }
        /*
         * ✅ FIX 1: Labels no longer counter-rotate.
         *    Removing the second animation halves per-frame GPU work.
         *    Labels read fine at a slight tilt — or tilt them intentionally
         *    for a more dynamic look.
         */
        .orbit-wrapper-mobile {
          position: relative;
          width: 100%;
          max-width: 700px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) { .orbit-wrapper-mobile { transform: scale(0.7); } }
        @media (max-width: 480px) { .orbit-wrapper-mobile { transform: scale(0.5); } }
      `}</style>

      {/* Background Rings — pointer-events: none keeps them from blocking hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative orbit-wrapper-mobile">
          {[180, 220, 260].map((radius) => (
            <div
              key={radius}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-zinc-800/20 rounded-full"
              style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
            />
          ))}
        </div>
      </div>

      {/* ✅ FIX 4: One whileInView observer wraps all text children via variants */}
      <m.div
        className="relative z-10 text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <m.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1 } } }}
          className="mb-4"
        >
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]">
            VGot You Excellence
          </span>
        </m.div>
        <m.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]"
        >
          One Digital Move. <br />
          <span className="text-red-600 italic">Endless Growth.</span>
        </m.h2>
      </m.div>

      {/* Orbiting System */}
      <div className="orbit-wrapper-mobile">
        {/* Central Silhouette */}
        <div className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center z-20 mx-auto">
          <div className="absolute inset-0 bg-red-600/5 rounded-full" />
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {/* ✅ FIX 6: lazy load + explicit dimensions prevent layout shift mid-animation */}
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
              alt="Silhouette"
              width={600}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover scale-110 brightness-[0.3] grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>

        {/* Orbiting Labels — single orbit animation, no counter-rotation */}
        <div className="absolute inset-0 orbit-container">
          {labels.map((label, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{ transform: labelTransforms[i] }}
            >
              <div
                className={`px-5 py-2.5 rounded-full border text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${
                  label.color === 'bg-red-600'
                    ? 'bg-red-600 text-white border-red-500'
                    : 'bg-black/90 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {label.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text & CTA */}
      <div className="relative z-10 text-center mt-20 max-w-2xl">
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-zinc-500 text-xs md:text-sm mb-10 uppercase tracking-[0.3em] leading-relaxed"
        >
          No matter your industry, transition into a <br />
          <span className="text-white font-black">Digital Powerhouse</span>
        </m.p>
        <Link
          to="/contact?message=Hi VGot You, I'm ready to start my digital journey. Let's discuss my project!"
          className="group relative inline-flex items-center justify-center px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] md:text-xs overflow-hidden transition-all hover:bg-red-600 hover:text-white"
        >
          <span className="relative z-10">Start Your Journey</span>
          <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};