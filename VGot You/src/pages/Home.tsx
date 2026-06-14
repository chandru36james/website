import React, { useState, useEffect, useRef, lazy, Suspense, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Compass, Layers, Palette, Code, Rocket, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cn } from '../lib/utils';
import { useTheme } from '../components/common/ThemeProvider';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon, MediumIcon } from '../components/common/Icons';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCarousel from '../components/common/CarouselManual';

// ─── LAZY HEAVY COMPONENTS (if needed elsewhere) ─────────────────────────────
const Globe = lazy(() => import('../components/ui/globe').then(m => ({ default: m.Globe })));
const SparklesCore = lazy(() => import('../components/ui/sparkles').then(m => ({ default: m.SparklesCore })));

// ─── ICONS (memoized) ────────────────────────────────────────────────────────
const WhatsAppIcon = memo(({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
));

const StarIcon = memo(({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
));

const ArrowRightIcon = memo(({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
));

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "917871120415";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi VGot You! I'm interested in your web design services. Can we talk?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const PHONE_NUMBER = "+91 78711 20415";

// ─── SCHEMA (unchanged, kept as is) ──────────────────────────────────────────
const SCHEMA_ORGANIZATION = JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "@id": "https://www.vgotyou.com/#organization", "name": "VGot You", "url": "https://www.vgotyou.com/", "logo": { "@type": "ImageObject", "url": "https://www.vgotyou.com/assets/vgotyou.png", "width": 512, "height": 512 }, "description": "VGot You is a web design, branding, and SEO company based in Karur, Tamil Nadu, India, serving startups and businesses across India and the UK.", "foundingDate": "2022", "founder": { "@type": "Person", "name": "Chandru" }, "address": { "@type": "PostalAddress", "addressLocality": "Karur", "addressRegion": "Tamil Nadu", "addressCountry": "IN" }, "contactPoint": [ { "@type": "ContactPoint", "telephone": "+917871120415", "contactType": "customer service", "areaServed": "IN", "availableLanguage": ["English", "Tamil"] }, { "@type": "ContactPoint", "telephone": "+447351736645", "contactType": "customer service", "areaServed": "GB", "availableLanguage": "English" } ], "sameAs": ["https://www.linkedin.com/in/vgotyou/", "https://www.instagram.com/vgot_you/", "https://vgotyou.medium.com/", "https://vgotyou.sulekha.com", "https://clutch.co/profile/vgot-you", "https://www.goodfirms.co/company/vgot-you", "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode"] });
const SCHEMA_LOCAL_BUSINESS = JSON.stringify({ "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], "@id": "https://www.vgotyou.com/#localbusiness", "name": "VGot You", "url": "https://www.vgotyou.com/", "logo": "https://www.vgotyou.com/assets/vgotyou.png", "image": "https://www.vgotyou.com/assets/vgotyou.png", "description": "Web design, branding, and SEO company in Karur, Tamil Nadu, India, serving clients across India and the UK.", "telephone": "+917871120415", "priceRange": "₹₹", "openingHours": "Mo-Su 00:00-23:59", "address": { "@type": "PostalAddress", "addressLocality": "Karur", "addressRegion": "Tamil Nadu", "addressCountry": "IN" }, "hasMap": "https://maps.app.goo.gl/HrAa7aTpHxVDQbi17", "geo": { "@type": "GeoCoordinates", "latitude": "10.9602", "longitude": "78.0766" }, "areaServed": [{ "@type": "Country", "name": "India" }, { "@type": "Country", "name": "United Kingdom" }], "founder": { "@type": "Person", "name": "Chandru" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "18", "bestRating": "5", "worstRating": "1" }, "sameAs": ["https://www.linkedin.com/in/vgotyou/", "https://www.instagram.com/vgot_you/", "https://vgotyou.sulekha.com", "https://clutch.co/profile/vgot-you", "https://www.goodfirms.co/company/vgot-you", "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode","https://fiverr.com/s/akDE7p8","https://dribbble.com/vgot_you","https://www.behance.net/vgotyou"] });
const SCHEMA_WEBSITE = JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "@id": "https://www.vgotyou.com/#website", "url": "https://www.vgotyou.com/", "name": "VGot You", "description": "Web design, branding & SEO company in Karur, Tamil Nadu — serving India and the UK.", "inLanguage": ["en-IN", "en-GB"], "publisher": { "@id": "https://www.vgotyou.com/#organization" }, "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://www.vgotyou.com/?s={search_term_string}" }, "query-input": "required name=search_term_string" } });
const SCHEMA_SERVICES = JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "@id": "https://www.vgotyou.com/#services", "name": "Web Design, Branding & SEO Services", "provider": { "@id": "https://www.vgotyou.com/#localbusiness" }, "areaServed": [{ "@type": "Country", "name": "India" }, { "@type": "Country", "name": "United Kingdom" }], "serviceType": ["Web Design", "Website Development", "UI UX Design", "SEO Services", "Local SEO", "Branding", "Logo Design", "Digital Marketing", "E-commerce Website Design"], "offers": { "@type": "Offer", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "INR", "description": "Custom pricing based on project scope" } } });
const SCHEMA_BREADCRUMB = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" }] });
const SCHEMA_FAQ = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "Are you a web design company in Karur?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, VGot You is a trusted web design company in Karur, Tamil Nadu, offering website design, website development, branding, and SEO services for local and global businesses." } }, { "@type": "Question", "name": "Do you provide web design services across Tamil Nadu?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, VGot You provides professional web design and SEO services across Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, Erode, Vellore, Thanjavur, Tirunelveli, and all major cities." } }, { "@type": "Question", "name": "Do you offer SEO services in Tamil Nadu?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide professional SEO and local SEO services in Karur and across Tamil Nadu to help businesses rank higher on Google and generate quality leads." } }, { "@type": "Question", "name": "Do you build e-commerce websites?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, VGot You designs and develops SEO-friendly e-commerce websites for businesses across Tamil Nadu with secure payment integration and high-performance UI/UX." } }, { "@type": "Question", "name": "Can you redesign an existing website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer website redesign services including modern UI/UX, speed optimization, mobile responsiveness, and SEO improvements for businesses in Karur and across Tamil Nadu." } }, { "@type": "Question", "name": "Do you provide web design services in the UK?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, VGot You provides professional web design, branding, and SEO services for businesses across the UK including London, Manchester, Birmingham, Leeds, Glasgow, Liverpool, Bristol, Sheffield, Edinburgh, and more." } } ] });

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

// ─── COUNT UP (starts when element enters viewport) ──────────────────────────
const CountUp = memo(({ end, duration = 2000, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
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
  }, [started, end, duration, delay]);

  return <span ref={ref} className="tabular-nums">{count}</span>;
});

// ─── HERO SECTION (with video background, animated) ──────────────────────────
const STAR_AVATARS = ["/assets/venkat.png", "/assets/santhosh.png", "/assets/aravind.png"];

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.0;
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black transition-colors duration-500 pt-28 pb-20">
      <Helmet>
        <title>VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu</title>
        <meta name="description" content="Professional website design and development for businesses in India, UK and worldwide. VGot You builds modern, fast and high-converting websites at affordable pricing." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-uk" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu" />
        <meta property="og:description" content="Award-winning web design, branding & SEO company in Karur, Tamil Nadu. We build fast, SEO-ready websites for businesses across India & the UK. Get a free quote today." />
        <meta property="og:url" content="https://www.vgotyou.com/" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VGot You – Web Design & SEO Company in Karur, Tamil Nadu" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu" />
        <meta name="twitter:description" content="Award-winning web design, branding & SEO company in Karur, Tamil Nadu. Fast, SEO-ready websites for businesses across India & the UK." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />
        <script type="application/ld+json">{SCHEMA_ORGANIZATION}</script>
        <script type="application/ld+json">{SCHEMA_LOCAL_BUSINESS}</script>
        <script type="application/ld+json">{SCHEMA_WEBSITE}</script>
        <script type="application/ld+json">{SCHEMA_SERVICES}</script>
        <script type="application/ld+json">{SCHEMA_BREADCRUMB}</script>
        <script type="application/ld+json">{SCHEMA_FAQ}</script>
      </Helmet>

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 dark:opacity-60 pointer-events-none"
      >
        <source src="/assets/hero.webm" type="video/webm" />
      </video>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.05] dark:opacity-[0.08] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 rounded-[10px] bg-zinc-900/60 dark:bg-zinc-950/80 border border-zinc-800 text-[10px] font-bold tracking-[0.2em] text-red-500 dark:text-red-400 uppercase">
              Web Design & SEO Company
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-6"
          >
            VGot You
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We build <span className="text-white font-semibold">high-converting websites</span>, 
            powerful branding and result-driven SEO for businesses worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] sm:w-[195px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Get a Free Quote
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
              <Link to="/portfolio"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-[11px] sm:text-xs uppercase tracking-wider w-full"
              >
                View Our Work
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-4 text-zinc-400 text-xs"
        >
          <div className="flex -space-x-2">
            {STAR_AVATARS.map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                <img src={src} alt="Client avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3 h-3 text-yellow-400" />)}
            </div>
            <span className="text-zinc-300 text-center sm:text-left">Trusted by startups and businesses across India & UK</span>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-300"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </motion.div>
    </section>
  );
};

// ─── SERVICES BENTO (Desktop Grid + Mobile Horizontal Scroll) ────────────────
const SERVICES_DATA = [
  {
    id: "01",
    title: "Web Development",
    node: "Core_Architecture",
    desc: "High-performance applications built with React, Next.js, and TypeScript. Optimized for speed and scalability.",
    tech: ["React", "Next.js", "Tailwind", "Headless CMS"],
    link: "/web-design",
    color: "green",
    span: "md:col-span-4",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    codeText: `const build = async () => {\n  const site = await Architect.create({\n    design: "pixel-perfect",\n    performance: "optimized",\n    seo: "grounded"\n  });\n  return site;\n};`
  },
  {
    id: "02",
    title: "Brand Identity",
    node: "Identity",
    desc: "Crafting visual systems that define your market presence.",
    link: "/logo-showcase",
    color: "red",
    span: "md:col-span-2",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
      </svg>
    )
  },
  {
    id: "03",
    title: "SEO Excellence",
    node: "Visibility",
    desc: "Strategic search engineering to maximize organic growth.",
    link: "/seo-services",
    color: "red-bg",
    span: "md:col-span-2",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    )
  },
  {
    id: "04",
    title: "Digital Marketing",
    node: "Scale_Factor",
    desc: "High-conversion ad campaigns and data-driven growth strategies that deliver measurable impact.",
    link: "/digital-marketing",
    color: "zinc",
    span: "md:col-span-4",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    )
  }
];

const ServiceCard: React.FC<{ service: typeof SERVICES_DATA[0]; isMobile?: boolean }> = ({ service, isMobile }) => (
  <div className={`h-full min-h-[400px] md:min-h-0 rounded-[10px] overflow-hidden relative group border transition-all duration-700 
    ${service.color === 'red-bg' ? 'bg-red-600 border-red-500 shadow-[0_20px_50px_rgba(220,38,38,0.3)]' : 'bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 shadow-xl dark:shadow-2xl'}`}>
    <Link to={service.link} className="absolute inset-0 z-20" aria-label={service.title} />
    
    {service.codeText && (
      <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-5 dark:opacity-10 group-hover:opacity-10 md:group-hover:opacity-30 transition-opacity duration-700 font-mono text-[8px] text-zinc-900 dark:text-green-500 p-6 md:p-8 pointer-events-none whitespace-pre overflow-hidden">
        {service.codeText}
      </div>
    )}

    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none ${service.color === 'red-bg' ? 'bg-white/10' : 'bg-red-600/5'}`} />

    <div className="relative h-full p-6 md:p-10 flex flex-col justify-between z-10">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[10px] flex items-center justify-center border transition-all duration-500 
        ${service.color === 'red-bg' ? 'bg-white/20 border-white/30 text-white shadow-xl' : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 group-hover:border-red-500/50 text-zinc-900 dark:text-white'}`}>
        <motion.div whileHover={{ rotate: 12, scale: 1.1 }}>
          {service.icon}
        </motion.div>
      </div>
      
      <div>
        <div className={`text-[9px] md:text-[10px] font-mono mb-2 tracking-[0.3em] uppercase 
          ${service.color === 'red-bg' ? 'text-white/60' : (service.color === 'green' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500')}`}>
          Node_{service.id} // {service.node}
        </div>
        <h3 className={`font-bold mb-3 ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} tracking-tight ${service.color === 'red-bg' ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{service.title}</h3>
        <p className={`text-sm md:text-base leading-relaxed max-w-sm ${service.color === 'red-bg' ? 'text-red-50' : 'text-zinc-500 dark:text-zinc-400 font-light'}`}>
          {service.desc}
        </p>
        
        {service.tech && (
          <div className="flex flex-wrap gap-2 mt-4">
            {service.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-[10px] bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[9px] md:text-[10px] text-zinc-600 dark:text-zinc-300 font-medium tracking-wide">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className={`mt-6 flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${service.color === 'red-bg' ? 'text-white/50 group-hover:text-white' : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>
          <span>Explore Service</span>
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const MobileHorizontalServices: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.min(4, Math.max(1, Math.round(latest * 3) + 1));
    if (rawIndex !== currentIndex) setCurrentIndex(rawIndex);
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <div ref={targetRef} className="relative h-[500vh] md:hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="px-6 mb-10 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-[10px] bg-zinc-900 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 text-[9px] font-bold tracking-[0.25em] uppercase border border-zinc-800 dark:border-zinc-900">Expertise</span>
            <h2 className="text-3xl font-bold font-serif tracking-tight leading-tight text-zinc-900 dark:text-white">
              Digital <br />
              <span className="text-red-600 italic underline decoration-red-600/10 underline-offset-[8px]">Excellence.</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div style={{ x }} className="flex gap-5 px-6 items-stretch will-change-transform w-max">
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className="min-w-[85vw] flex h-full flex-shrink-0">
                <ServiceCard service={service} isMobile />
              </div>
            ))}
            <div className="min-w-[40vw] flex-shrink-0 h-10" />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-0 w-full px-6 z-30">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center h-5">
              <div className="font-mono text-[9px] text-zinc-400 tracking-[0.1em] font-medium">SCROLL TO NAVIGATE</div>
              <div className="font-mono text-[11px] text-red-600 font-bold flex items-center gap-1.5 tabular-nums">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentIndex}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                  >
                    0{currentIndex}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-200 font-light">/</span>
                <span className="text-zinc-400">04</span>
              </div>
            </div>
            <div className="w-full h-px bg-zinc-100 relative rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]" 
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesBento: React.FC = () => (
  <section id="services" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative transition-colors duration-500">
    <MobileHorizontalServices />

    <div className="hidden md:block py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase border border-zinc-200 dark:border-zinc-800">Our Expertise</span>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-6 tracking-tight text-zinc-900 dark:text-white">
              Digital <span className="text-red-600 italic">Excellence.</span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              We don't just build websites; we craft digital legacies through precise code and strategic design.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:auto-rows-[350px]">
          {SERVICES_DATA.map((service) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
              className={cn(
                "h-full",
                service.span,
                "md:col-span-1 lg:col-span-2",
                service.id === "01" || service.id === "04" ? "lg:col-span-4" : ""
              )}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
const ABOUT_FEATURES = [
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />, title: "Logic-Driven UX", desc: "Interfaces calibrated for maximum human engagement and conversion." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, title: "Core Vitals SEO", desc: "Search infrastructure built into the very foundation of your code." },
];

const AboutSection: React.FC = () => (
  <section className="container mx-auto py-20 md:py-32 px-4 sm:px-6 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-500">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-red-600" />
          <span className="text-zinc-400 dark:text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Who We Are</span>
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-zinc-900 dark:text-white tracking-tighter uppercase">
          Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Future</span>, Today.
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-none">
          We are a professional web design and branding{' '}
          <Link to="/digital-studio-tamil-nadu" className="text-red-600 dark:text-red-500 hover:text-red-500 font-medium">studio</Link>{' '}
          based in Tamil Nadu, helping startups and businesses build high-performance websites, strong brand identities, and conversion-focused digital experiences.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 w-full mb-10 text-left">
          {ABOUT_FEATURES.map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 p-5 rounded-[10px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all group"
            >
              <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-[10px] shadow-sm text-red-600 w-fit group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">{icon}</svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">{title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/about" className="group inline-flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3.5 px-8 rounded-[10px] hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all shadow-md active:scale-95 border border-zinc-900 dark:border-transparent">
            <span className="text-[10px] uppercase tracking-[0.3em]">Explore our story</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="hidden lg:flex relative h-[500px] w-full justify-end items-center">
        <div className="relative z-20 transform -translate-x-8 translate-y-8">
          <img
            src="/assets/abt1.png"
            alt="Strategy discussion at VGot You"
            width={288}
            height={384}
            loading="lazy"
            className="w-64 h-80 object-cover rounded-[10px] shadow-2xl border-4 border-white dark:border-zinc-800 hover:scale-[1.02] hover:-rotate-1 transition-all duration-700"
          />
        </div>
        <div className="relative z-10">
          <img
            src="/assets/abt2.png"
            alt="Development process"
            width={320}
            height={500}
            loading="lazy"
            className="w-72 h-[420px] object-cover rounded-[10px] shadow-2xl border-4 border-white dark:border-zinc-800 hover:scale-[1.02] hover:rotate-1 transition-all duration-700 opacity-80 dark:opacity-60 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  </section>
);

// ─── PROCESS SECTION (Premium Redesign) ───────────────────────────────────────
interface ProcessStepData {
  title: string;
  description: string;
  detail: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  metric: string;
}

const PROCESS_STEPS: ProcessStepData[] = [
  {
    title: 'Discovery',
    description: 'Deconstructing user goals and market metrics.',
    detail: 'We dive deep into your business model, core audience, and market landscape. This phase sets a concrete, metrics-driven foundation for all design and development iterations.',
    image: '/assets/process_discovery.avif',
    icon: Compass,
    deliverables: ['Competitor Benchmarking', 'Ideal Customer Personas', 'Brand Strategy Blueprint', 'High-Level Feature Mapping'],
    metric: 'Strategic Blueprint alignment'
  },
  {
    title: 'Planning',
    description: 'Engineering layout flows and functional schemas.',
    detail: 'We translate raw discovery data into functional architecture. We align technical integrations and content structures to map out frictionless navigation paths.',
    image: '/assets/process_planning.avif',
    icon: Layers,
    deliverables: ['Sitemap Architecture', 'Technical Stack Alignment', 'UI/UX Low-Fi Blueprints', 'Functional Specifications'],
    metric: 'System architecture readiness'
  },
  {
    title: 'Design',
    description: 'Defining high-fidelity aesthetic universes.',
    detail: 'Our design system combines aesthetic brilliance with behavioral psychology. We create responsive interfaces that establish extreme credibility and amplify user conversions.',
    image: '/assets/process_design.avif',
    icon: Palette,
    deliverables: ['Premium High-Fidelity UI', 'Comprehensive Design Tokens', 'Fluid Layout Animations', 'Interactive Prototypes'],
    metric: '98%+ client approval rating'
  },
  {
    title: 'Development',
    description: 'Writing pixel-perfect, hyper-optimized code.',
    detail: 'Our engineers construct responsive full-stack pipelines with immaculate cleanliness. We optimize for extreme rendering speed and bulletproof security.',
    image: '/assets/process_development.avif',
    icon: Code,
    deliverables: ['Next-Gen Framework Setup', 'Perfect Google Lighthouse Scores', 'W3C Standard Compliance', 'Secure API Microstructures'],
    metric: 'A-grade page performance scores'
  },
  {
    title: 'Launch & Expansion',
    description: 'Deploying robust digital assets at scale.',
    detail: 'We configure modern server ingress, run exhaustive pre-launch checks, and deliver extensive guides, moving your product into active market scaling.',
    image: '/assets/process_launch.avif',
    icon: Rocket,
    deliverables: ['Comprehensive SEO Audits', 'CMS Operational Guides', 'Responsive Browser Audits', 'Ongoing Scaling Roadmap'],
    metric: '100% cloud deployment success'
  },
];

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 60) {
      nextStep();
    } else if (diff < -60) {
      prevStep();
    }
  };

  return (
    <section id="process" className="relative py-8 md:py-12 bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-500 border-y border-zinc-100 dark:border-zinc-900/40">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 dark:bg-red-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-1.5 rounded-[10px] bg-zinc-200/50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase border border-zinc-300/30 dark:border-zinc-800">
              Our Method
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-zinc-900 dark:text-white leading-tight">
              The <span className="text-red-600 italic">Workflow.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-xs md:text-sm mt-1 leading-relaxed font-light">
              We translate abstract user goals and business strategy into pristine interactive realities through an elite 5-phase delivery model.
            </p>
          </motion.div>
        </div>

        {/* MOBILE STEP TIMELINE STEPPER (lg:hidden) */}
        <div className="lg:hidden flex items-center justify-between relative max-w-sm mx-auto w-full px-2 mb-3">
          {/* Connecting Line */}
          <div className="absolute left-8 right-8 top-[18px] -translate-y-1/2 h-[1px] bg-zinc-200 dark:bg-zinc-800/80 z-0" />
          
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="flex flex-col items-center gap-1 focus:outline-none z-10 relative cursor-pointer group"
                aria-label={`Select phase ${idx + 1}`}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-[10px] flex items-center justify-center border transition-all duration-300",
                    isActive
                      ? "bg-red-600 border-red-600 text-white shadow-[0_4px_10px_rgba(220,38,38,0.25)] scale-105"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
                  )}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className={cn(
                  "font-mono text-[8px] font-black uppercase transition-colors tracking-wider",
                  isActive ? "text-red-600 dark:text-red-500" : "text-zinc-400 dark:text-zinc-500"
                )}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Panel Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-stretch max-w-6xl mx-auto">
          {/* LEFT SELECTOR LIST */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-1.5 relative">
            {/* Elegant, refined fading line center-aligned behind icons (exactly left-[40px] corresponding to md:p-5 base padding) */}
            <div className="absolute left-[35px] top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-transparent via-zinc-200 to-transparent dark:via-zinc-800 hidden lg:block" />
            
            {PROCESS_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "w-full text-left p-2 md:p-2.5 rounded-[10px] flex items-start gap-3 transition-all duration-300 relative border z-10 focus:outline-none focus:ring-1 focus:ring-red-600/30 cursor-pointer",
                    isActive
                      ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                      : "bg-transparent border-transparent hover:bg-zinc-100/30 dark:hover:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {/* Glowing vertical connector strip for active tab on desktop */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVerticalIndicator"
                      className="absolute left-[-1px] top-2 top-2 w-[2px] bg-red-600 rounded-full hidden lg:block"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon wrapper */}
                  <div
                    className={cn(
                      "p-1.5 rounded-[8px] border transition-all duration-300 mt-0.5 flex-shrink-0 z-10",
                      isActive
                        ? "bg-red-600/10 border-red-200 dark:border-red-900/40 text-red-600 shadow-sm"
                        : "bg-zinc-200/50 dark:bg-zinc-900 border-zinc-300/30 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  {/* Step information info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-mono text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 font-bold uppercase">
                        Phase 0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                      )}
                    </div>
                    <h3
                      className={cn(
                        "font-bold text-sm tracking-tight transition-colors duration-300",
                        isActive ? "text-zinc-900 dark:text-white" : "text-zinc-800 dark:text-zinc-300"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mt-0.5 font-light line-clamp-1">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT SHOWCASE PRESENTATION BENTO BOX */}
          <div className="lg:col-span-7 flex">
            <div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full bg-white dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 rounded-[12px] p-3 sm:p-4 lg:p-4.5 shadow-sm flex flex-col justify-between relative overflow-hidden select-none"
            >
              
              {/* Highlight Background Flare */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/[0.02] dark:bg-red-600/[0.04] blur-3xl rounded-full pointer-events-none" />
              
              {/* Floating Action Header Controller (Only displayed on Desktop desktop to keep layout clean) */}
              <div className="hidden lg:flex justify-between items-center pb-2 mb-2.5 border-b border-zinc-100 dark:border-zinc-900/60 relative z-20">
                <span className="font-mono text-[9px] tracking-wider text-red-600 dark:text-red-500 font-bold uppercase bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-[5px]">
                  0{activeStep + 1} of 05 // Active Milestone
                </span>
                
                {/* Micro pagination control loops */}
                <div className="flex gap-1">
                  <button
                    onClick={prevStep}
                    className="p-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800 transition-colors focus:ring-1 focus:ring-red-600/20 cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="p-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800 transition-colors focus:ring-1 focus:ring-red-600/20 cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Animating presentation sheet */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex-grow flex flex-col relative z-10"
                >
                  {/* High Quality visual context window image mockup - Renders FIRST on mobile (order-1), SECOND on desktop (lg:order-2 lg:mt-8) */}
                  <div className="order-1 lg:order-2 mb-2 lg:mb-0 lg:mt-2 relative aspect-[2.6/1] sm:aspect-[21/9] lg:aspect-[2/1] w-full rounded-[8px] overflow-hidden border border-zinc-200/40 dark:border-zinc-800 group shadow-md">
                    <img
                      src={PROCESS_STEPS[activeStep].image}
                      alt={PROCESS_STEPS[activeStep].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                    
                    {/* Floating phase watermark pill */}
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-[4px] bg-black/60 backdrop-blur-md border border-white/10 text-[7px] font-mono tracking-widest text-zinc-200 font-bold uppercase select-none">
                      Asset_Workspace_0{activeStep + 1}
                    </div>

                    {/* Floating subtle gesture visual tip on mobile */}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-[4px] bg-red-600/85 backdrop-blur-md text-[7px] font-mono tracking-wider text-white font-bold uppercase select-none flex items-center gap-1 sm:hidden">
                      <span>Swipe</span>
                      <ChevronRight className="w-2.5 h-2.5 animate-pulse flex-shrink-0" />
                    </div>
                  </div>

                  {/* Text, metric, and deliverables list - Renders SECOND on mobile (order-2), FIRST on desktop (lg:order-1) */}
                  <div className="order-2 lg:order-1 space-y-1.5 lg:space-y-2 text-left">
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-serif">
                        {PROCESS_STEPS[activeStep].title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed mt-0.5 lg:mt-1 font-light">
                        {PROCESS_STEPS[activeStep].detail}
                      </p>
                    </div>

                    {/* Metric pill indicator highlights */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-800/80">
                      <span className="text-[8px] font-mono tracking-wider font-bold text-red-600 dark:text-red-400 uppercase">
                        Core Objective:
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold">
                        {PROCESS_STEPS[activeStep].metric}
                      </span>
                    </div>

                    {/* Deliverables lists with bullet checkboxes */}
                    <div className="pt-0.5 lg:pt-1">
                      <h4 className="font-mono text-[8px] tracking-wider text-zinc-400 dark:text-zinc-500 font-bold uppercase mb-0.5 lg:mb-1">
                        Production Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
                        {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 p-1 sm:p-1.2 rounded-[5px] bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/20 dark:border-zinc-900/50"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span className="text-[11px] text-zinc-700 dark:text-zinc-400 font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Atlast: Mobile Bottom Actions - Renders THIRD on mobile (order-3), hidden on desktop */}
                  <div className="order-3 lg:hidden flex justify-between items-center mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900/60 w-full relative z-20">
                    <span className="font-mono text-[8px] tracking-wider text-red-600 dark:text-red-500 font-bold uppercase bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-[4px]">
                      0{activeStep + 1} of 05 // Milestone
                    </span>
                    
                    {/* Pagination buttons */}
                    <div className="flex gap-1">
                      <button
                        onClick={prevStep}
                        className="p-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800 transition-colors focus:ring-1 focus:ring-red-600/20 cursor-pointer"
                        aria-label="Previous step"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={nextStep}
                        className="p-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800 transition-colors focus:ring-1 focus:ring-red-600/20 cursor-pointer"
                        aria-label="Next step"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Venkat Krishnan", role: "Director of Rudhraa Exports", text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled. The B2B platform they built has significantly improved our global operations.", avatar: "/assets/venkat.png" },
  { name: "Santhosh", role: "Founder of Arctic Textiles", text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments! Their team really understood our manufacturing roots while bringing a global appeal.", avatar: "/assets/santhosh.png" },
  { name: "Aravind Kumar", role: "Manager of Bloom Green Developers", text: "An incredibly professional and efficient team. They delivered our complex project on time and exceeded expectations. The conversion rate on our landing page jumped 3x.", avatar: "/assets/aravind.png" },
];

const TRUST_STATS = [
  { val: "4.9/5", label: "Average Rating" },
  { val: "100%", label: "Project Delivery" },
  { val: "24/7", label: "Premium Support" },
];

const TestimonialCard: React.FC<{ testimonial: typeof TESTIMONIALS[0]; index: number }> = ({ testimonial, index }) => (
  <motion.div 
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 rounded-[10px] flex flex-col h-full hover:shadow-md transition-all duration-300 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-3.5 h-3.5 text-red-600" />)}
      </div>
      <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed mb-6 flex-grow font-serif italic">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-50 dark:border-zinc-900">
        <div className="relative">
          <img src={testimonial.avatar} alt={testimonial.name} width={44} height={44} className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </div>
        </div>
        <div>
          <p className="font-bold text-zinc-900 dark:text-white text-sm tracking-tight">{testimonial.name}</p>
          <p className="text-[8px] md:text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] font-bold mt-0.5">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPos = target.scrollLeft;
    const width = target.clientWidth;
    const newIdx = Math.round(scrollPos / width);
    if (newIdx !== activeIdx) setActiveIdx(newIdx);
  };

  return (
    <section id="testimonials" style={{ paddingBottom: "50px" }} className="bg-white dark:bg-zinc-950 py-16 md:py-28 border-t border-zinc-50 dark:border-zinc-900 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold tracking-[0.25em] uppercase border border-zinc-200 dark:border-zinc-800">Success Stories</span>
            <h2 className="text-3xl md:text-6xl font-bold font-serif tracking-tight text-zinc-900 dark:text-white">
              Trusted by <span className="text-red-600 italic">Visionaries.</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory gap-4 scroll-smooth pb-6 no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="min-w-[85vw] snap-center">
                <TestimonialCard testimonial={t} index={i} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${activeIdx === i ? 'w-6 bg-red-600' : 'w-1.5 bg-zinc-200 dark:bg-zinc-800'}`} />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </motion.div>

        <div style={{ marginTop: "20px" }} className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto border-t border-zinc-50 dark:border-zinc-900 pt-10">
          {TRUST_STATS.map(({ val, label }, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 p-3 rounded-[10px] bg-zinc-50/50 dark:bg-zinc-900/50 md:bg-transparent border border-zinc-100 dark:border-zinc-800 md:border-none ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
              <span className="text-xl md:text-3xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter">{val}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-500 text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA BANNER (redesigned) ─────────────────────────────────────────────────
const CTABanner: React.FC = () => (
  <section className="bg-zinc-50 dark:bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500">
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 dark:bg-red-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true"
      style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    
    <div className="container mx-auto max-w-4xl text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 rounded-[10px] bg-red-600/10 border border-red-600/20 text-red-600 dark:text-red-400 text-[10px] font-bold tracking-[0.3em] uppercase">
          Ignite Your Growth
        </span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter leading-tight">
          Ready to scale your <br className="hidden sm:block" />
          <span className="text-red-600 italic">Digital Impact?</span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          We combine cutting-edge technology with strategic design to help you dominate your market. 
          Your transformation begins here.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-red-700 hover:shadow-lg text-[11px] sm:text-xs uppercase tracking-wider w-[180px] sm:w-[195px]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Start Project Now
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider w-[160px] sm:w-[175px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
            </svg>
            Schedule a Call
          </motion.a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase">Available Now</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-700 hidden sm:block">•</span>
          <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase">Free Strategy Consultation</span>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── MAIN HOME COMPONENT ─────────────────────────────────────────────────────
const Home: React.FC = () => (
  <>
    <Header />
    <HeroSection />
    <ServicesBento />
    <AboutSection />
    <ProcessSection />
    {/* ===== CAROUSEL ===== */}
        <div className="border-y border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black py-16">
          <ProjectCarousel />
        </div>
    <Testimonials />
    <CTABanner />
    <Footer />
  </>
);

export default Home;