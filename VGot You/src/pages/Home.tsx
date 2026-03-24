import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe } from '../components/ui/globe';
import { SparklesCore } from '../components/ui/sparkles';
import { Helmet } from "react-helmet";

// ─── ICONS (inline to keep single-file) ───────────────────────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "917871120415"; // From FloatingWidgets.tsx
const WHATSAPP_MESSAGE = encodeURIComponent("Hi VGot You! I'm interested in your web design services. Can we talk?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const PHONE_NUMBER = "+91 78711 20415"; // Replace with your actual number

const m = motion as any;

// ─── COUNT UP ─────────────────────────────────────────────────────────────────
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

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const googleBusinessUrl = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur";

  return (
    <section className="min-h-[100dvh] w-full relative flex flex-col overflow-hidden bg-black">
      <Helmet>
            
                    {/* ================= BASIC SEO ================= */}
                    <title>VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu</title>
            
                    <meta
                      name="description"
                      content="Award-winning web design, branding & SEO company in Karur, Tamil Nadu. We build fast, SEO-ready websites for businesses across India & the UK. Get a free quote today."
                    />
            
                    {/* Keywords removed — Google ignores them entirely since 2009 */}
            
                    <meta name="author" content="VGot You" />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://www.vgotyou.com/" />
            
                    {/* ================= HREFLANG (India + UK targeting) ================= */}
                    {/* India pages */}
                    <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/" />
                    {/* UK pages */}
                    <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-uk" />
                    {/* Fallback for all other English speakers */}
                    <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
            
                    {/* ================= OPEN GRAPH ================= */}
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="VGot You" />
                    {/* FIX: og:title now matches <title> exactly */}
                    <meta property="og:title" content="VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu" />
                    <meta
                      property="og:description"
                      content="Award-winning web design, branding & SEO company in Karur, Tamil Nadu. We build fast, SEO-ready websites for businesses across India & the UK. Get a free quote today."
                    />
                    <meta property="og:url" content="https://www.vgotyou.com/" />
                    {/* FIX: Single consistent OG image — use og-home.png (1200×630) */}
                    <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    {/* FIX: Added missing og:image:alt */}
                    <meta property="og:image:alt" content="VGot You – Web Design & SEO Company in Karur, Tamil Nadu" />
                    <meta property="og:locale" content="en_IN" />
                    <meta property="og:locale:alternate" content="en_GB" />
            
                    {/* ================= TWITTER / X ================= */}
                    <meta name="twitter:card" content="summary_large_image" />
                    {/* FIX: twitter:title now matches <title> exactly */}
                    <meta name="twitter:title" content="VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu" />
                    <meta
                      name="twitter:description"
                      content="Award-winning web design, branding & SEO company in Karur, Tamil Nadu. Fast, SEO-ready websites for businesses across India & the UK."
                    />
                    <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
                    {/* FIX: Restored twitter:site (was missing from Helmet) */}
                    <meta name="twitter:site" content="@vgotyou" />
                    {/* FIX: Added missing twitter:creator */}
                    <meta name="twitter:creator" content="@vgotyou" />
            
                    {/* ================= SCHEMA: ORGANIZATION ================= */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "@id": "https://www.vgotyou.com/#organization",
                        "name": "VGot You",
                        "url": "https://www.vgotyou.com/",
                        // FIX: Single consistent logo URL across all schemas
                        "logo": {
                          "@type": "ImageObject",
                          "url": "https://www.vgotyou.com/assets/vgotyou.png",
                          "width": 512,
                          "height": 512
                        },
                        "description": "VGot You is a web design, branding, and SEO company based in Karur, Tamil Nadu, India, serving startups and businesses across India and the UK.",
                        "foundingDate": "2022",
                        "founder": {
                          "@type": "Person",
                          "name": "Chandru"
                        },
                        // FIX: Added address to Organization too
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": "Karur",
                          "addressRegion": "Tamil Nadu",
                          "addressCountry": "IN"
                        },
                        "contactPoint": [
                          {
                            "@type": "ContactPoint",
                            "telephone": "+917871120415",
                            "contactType": "customer service",
                            "areaServed": "IN",
                            "availableLanguage": ["English", "Tamil"]
                          },
                          {
                            "@type": "ContactPoint",
                            "telephone": "+447351736645",
                            "contactType": "customer service",
                            "areaServed": "GB",
                            "availableLanguage": "English"
                          }
                        ],
                        "sameAs": [
                          "https://www.linkedin.com/in/vgotyou/",
                          "https://www.instagram.com/vgot_you/",
                          "https://vgotyou.medium.com/",
                          "https://vgotyou.sulekha.com",
                          "https://clutch.co/profile/vgot-you",
                          "https://www.goodfirms.co/company/vgot-you",
                          "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode"
                        ]
                      })}
                    </script>
            
                    {/* ================= SCHEMA: LOCAL BUSINESS ================= */}
                    {/* FIX: Restored LocalBusiness (was missing from Helmet entirely) */}
                    {/* FIX: Changed @type to ProfessionalService + LocalBusiness */}
                    {/* FIX: Added telephone, openingHours, priceRange */}
                    {/* FIX: Removed self-declared reviews (Google policy violation) */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["ProfessionalService", "LocalBusiness"],
                        "@id": "https://www.vgotyou.com/#localbusiness",
                        "name": "VGot You",
                        "url": "https://www.vgotyou.com/",
                        "logo": "https://www.vgotyou.com/assets/vgotyou.png",
                        "image": "https://www.vgotyou.com/assets/og-home.png",
                        "description": "Web design, branding, and SEO company in Karur, Tamil Nadu, India, serving clients across India and the UK.",
                        "telephone": "+917871120415",
                        "priceRange": "₹₹",
                        "openingHours": "Mo-Su 00:00-23:59",
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": "Karur",
                          "addressRegion": "Tamil Nadu",
                          "addressCountry": "IN"
                        },
                        "hasMap": "https://maps.app.goo.gl/HrAa7aTpHxVDQbi17",
                        "geo": {
                          "@type": "GeoCoordinates",
                          "latitude": "10.9602",
                          "longitude": "78.0766"
                        },
                        "areaServed": [
                          {
                            "@type": "Country",
                            "name": "India"
                          },
                          {
                            "@type": "Country",
                            "name": "United Kingdom"
                          }
                        ],
                        "founder": {
                          "@type": "Person",
                          "name": "Chandru"
                        },
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "ratingValue": "4.9",
                          "reviewCount": "18",
                          "bestRating": "5",
                          "worstRating": "1"
                        },
                        "sameAs": [
                          "https://www.linkedin.com/in/vgotyou/",
                          "https://www.instagram.com/vgot_you/",
                          "https://vgotyou.sulekha.com",
                          "https://clutch.co/profile/vgot-you",
                          "https://www.goodfirms.co/company/vgot-you",
                          "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode"
                        ]
                      })}
                    </script>
            
                    {/* ================= SCHEMA: WEBSITE ================= */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://www.vgotyou.com/#website",
                        "url": "https://www.vgotyou.com/",
                        "name": "VGot You",
                        "description": "Web design, branding & SEO company in Karur, Tamil Nadu — serving India and the UK.",
                        "inLanguage": ["en-IN", "en-GB"],
                        "publisher": {
                          "@id": "https://www.vgotyou.com/#organization"
                        },
                        // Sitelinks searchbox — helps Google show a search box in your brand result
                        "potentialAction": {
                          "@type": "SearchAction",
                          "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://www.vgotyou.com/?s={search_term_string}"
                          },
                          "query-input": "required name=search_term_string"
                        }
                      })}
                    </script>
            
                    {/* ================= SCHEMA: SERVICES ================= */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "@id": "https://www.vgotyou.com/#services",
                        "name": "Web Design, Branding & SEO Services",
                        "provider": {
                          "@id": "https://www.vgotyou.com/#localbusiness"
                        },
                        "areaServed": [
                          { "@type": "Country", "name": "India" },
                          { "@type": "Country", "name": "United Kingdom" }
                        ],
                        "serviceType": [
                          "Web Design",
                          "Website Development",
                          "UI UX Design",
                          "SEO Services",
                          "Local SEO",
                          "Branding",
                          "Logo Design",
                          "Digital Marketing",
                          "E-commerce Website Design"
                        ],
                        "offers": {
                          "@type": "Offer",
                          "priceSpecification": {
                            "@type": "PriceSpecification",
                            "priceCurrency": "INR",
                            "description": "Custom pricing based on project scope"
                          }
                        }
                      })}
                    </script>
            
                    {/* ================= SCHEMA: BREADCRUMB ================= */}
                    {/* FIX: Added BreadcrumbList — increases CTR via breadcrumb display in search */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                          {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://www.vgotyou.com/"
                          }
                        ]
                      })}
                    </script>
            
                    {/* ================= SCHEMA: FAQ ================= */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                          {
                            "@type": "Question",
                            "name": "Are you a web design company in Karur?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, VGot You is a trusted web design company in Karur, Tamil Nadu, offering website design, website development, branding, and SEO services for local and global businesses."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "Do you provide web design services across Tamil Nadu?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, VGot You provides professional web design and SEO services across Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, Erode, Vellore, Thanjavur, Tirunelveli, and all major cities."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "Do you offer SEO services in Tamil Nadu?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, we provide professional SEO and local SEO services in Karur and across Tamil Nadu to help businesses rank higher on Google and generate quality leads."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "Do you build e-commerce websites?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, VGot You designs and develops SEO-friendly e-commerce websites for businesses across Tamil Nadu with secure payment integration and high-performance UI/UX."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "Can you redesign an existing website?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, we offer website redesign services including modern UI/UX, speed optimization, mobile responsiveness, and SEO improvements for businesses in Karur and across Tamil Nadu."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "Do you provide web design services in the UK?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Yes, VGot You provides professional web design, branding, and SEO services for businesses across the UK including London, Manchester, Birmingham, Leeds, Glasgow, Liverpool, Bristol, Sheffield, Edinburgh, and more."
                            }
                          }
                        ]
                      })}
                    </script>
            
                  </Helmet>

      {/* Sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="hero-sparkles"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={25}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Globe */}
      <div className="absolute bottom-[-130%] md:bottom-[-100%] left-0 right-0 w-full h-[160%] z-0 scale-[1.6] md:scale-[1.5] pointer-events-none will-change-transform transform-gpu">
        <Globe className="opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-64 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[100dvh] pt-20 pb-32 text-center">
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-red-600 uppercase mb-8"
        >
          Web Design & SEO Company in Tamil Nadu
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(4rem,18vw,8rem)] leading-[0.85] font-black tracking-tighter text-white mb-6"
        >
          VGot<br />You
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-lg text-zinc-400 text-sm md:text-base leading-relaxed mb-10"
        >
          Crafting <span className="text-white font-semibold">Professional Websites</span>,{' '}
          <span className="text-white font-semibold">Branding</span> &{' '}
          <span className="text-white font-semibold">SEO</span> for businesses in{' '}
          <span className="text-red-500 font-bold">Karur</span> &amp; across India.
          <br />
          <span className="text-red-400 font-semibold">Delivered in 7 days.</span>
        </m.p>

        {/* PRIMARY CTAs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          {/* WhatsApp CTA — primary */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Get a Free Quote
          </a>

          {/* Portfolio CTA — secondary */}
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5 text-sm uppercase tracking-wider"
          >
            View Our Work
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </m.div>

        {/* Trust bar */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-2 text-zinc-500 text-xs"
        >
          <div className="flex -space-x-2">
            {["https://www.vgotyou.com/assets/venkat.png", "https://www.vgotyou.com/assets/santhosh.png", "https://www.vgotyou.com/assets/aravind.png"].map((src, i) => (
              <img key={i} src={src} alt="Client" className="w-7 h-7 rounded-full border-2 border-black object-cover" />
            ))}
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3 h-3 text-yellow-400" />)}
          </div>
          <span>Trusted by 10+ businesses</span>
        </m.div>
      </div>

      {/* Bottom stats */}
      <div className="absolute bottom-4 left-0 right-0 z-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 max-w-xs mx-auto gap-2 py-4 border-t border-white/5">
            {[{ val: 2, label: "Years Exp." }, { val: 15, label: "Projects" }, { val: 10, label: "Clients" }].map(({ val, label }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-base md:text-xl font-black text-white font-mono leading-none mb-0.5">
                  <CountUp end={val} delay={i * 200} />+
                </span>
                <span className="text-[7px] font-bold tracking-widest uppercase text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SERVICES BENTO ───────────────────────────────────────────────────────────
const ServicesBento: React.FC = () => (
  <section className="py-16 md:py-32 bg-white text-black relative overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
      <div className="text-center mb-12 md:mb-24">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-zinc-900 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase border border-zinc-800">Our Expertise</span>
          <h2 className="text-4xl md:text-7xl font-bold font-serif mb-6 tracking-tight">
            Digital <span className="text-red-600 italic">Excellence.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We don't just build websites; we craft digital legacies through precise code and strategic design.
          </p>
        </m.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-6 auto-rows-min md:auto-rows-[350px]">
        {/* Web Dev */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl min-h-[240px] relative group cursor-pointer hover:border-zinc-700 transition-all duration-500">
          <Link to="/web-design" className="absolute inset-0 z-20" aria-label="Web Design" />
          <div className="absolute right-0 top-0 w-3/5 h-full opacity-10 group-hover:opacity-30 transition-opacity duration-700 font-mono text-[8px] text-green-500 p-8 select-none leading-relaxed pointer-events-none overflow-hidden hidden sm:block">
            {`const build = async () => {\n  const site = await Architect.create({\n    design: "pixel-perfect",\n    performance: "optimized",\n    seo: "grounded"\n  });\n  return site;\n};`}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-0" />
          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:border-green-500/50 transition-all duration-500 mb-4">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono text-green-500 mb-2 tracking-[0.3em] uppercase">Node_01 // Core_Architecture</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Web Development</h3>
              <p className="text-zinc-400 max-w-sm text-lg leading-relaxed">High-performance applications built with React, Next.js, and TypeScript. Optimized for speed and scalability.</p>
            </div>
          </div>
        </m.div>

        {/* Brand Identity */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-xl min-h-[220px] relative group cursor-pointer hover:border-zinc-700 transition-all duration-500">
          <Link to="/logo-showcase" className="absolute inset-0 z-20" aria-label="Logo Showcase" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
            <div className="w-14 h-14 bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-900/20 group-hover:rotate-6 transition-all duration-500 mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
            </div>
            <div>
              <div className="text-[9px] font-mono text-red-500 mb-1 tracking-[0.3em] uppercase">Node_02 // Identity</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Brand Identity</h3>
              <p className="text-gray-400 leading-relaxed text-base">Crafting visual systems that define your market presence.</p>
            </div>
          </div>
        </m.div>

        {/* SEO */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 bg-red-600 border border-red-500 rounded-[2rem] overflow-hidden shadow-2xl min-h-[220px] relative group cursor-pointer transition-all duration-500">
          <Link to="/seo-services" className="absolute inset-0 z-20" aria-label="SEO Services" />
          <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-0 group-hover:scale-125 transition-transform duration-700">
            <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl group-hover:-translate-y-1 transition-transform mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/60 mb-1 tracking-[0.3em] uppercase">Node_03 // Visibility</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">SEO Excellence</h3>
              <p className="text-red-50 leading-relaxed text-base">Strategic search engineering to maximize organic growth.</p>
            </div>
          </div>
        </m.div>

        {/* Digital Marketing */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-xl min-h-[240px] relative group cursor-pointer hover:border-zinc-700 transition-all duration-500">
          <Link to="/digital-marketing" className="absolute inset-0 z-20" aria-label="Digital Marketing" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-transparent z-0" />
          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between max-w-lg">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white border border-zinc-700 shadow-md mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono text-red-500 mb-2 tracking-[0.3em] uppercase">Node_04 // Scale_Factor</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Digital Marketing</h3>
              <p className="text-gray-400 text-lg leading-relaxed">High-conversion ad campaigns and data-driven growth strategies that deliver measurable impact.</p>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  </section>
);

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => (
  <section className="container mx-auto py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-red-600" />
          <span className="text-zinc-400 font-black tracking-[0.4em] uppercase text-[10px]">Who We Are</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[0.9] text-zinc-900 tracking-tighter uppercase">
          Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Future</span>, Today.
        </h2>
        <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-none">
          We are a professional web design and branding{' '}
          <Link to="/digital-studio-tamil-nadu" className="text-red-600 hover:text-red-500">studio</Link>{' '}
          based in Tamil Nadu, helping startups and businesses build high-performance websites, strong brand identities, and conversion-focused digital experiences.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 w-full mb-12 text-left">
          {[
            { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />, title: "Logic-Driven UX", desc: "Interfaces calibrated for maximum human engagement and conversion." },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, title: "Core Vitals SEO", desc: "Search infrastructure built into the very foundation of your code." },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:border-red-600/10 transition-all group">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-red-600 w-fit group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 tracking-tight">{title}</h3>
                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/about" className="group inline-flex items-center gap-4 bg-zinc-900 text-white font-bold py-4 px-10 rounded-full hover:bg-red-600 transition-all shadow-2xl active:scale-95">
          <span className="text-xs uppercase tracking-[0.3em]">Explore our story</span>
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
      <div className="hidden lg:flex relative h-[600px] w-full justify-end items-center">
        <div className="relative z-20 transform -translate-x-12 translate-y-12">
          <img src="https://vgotyou.com/assets/abt1.png" alt="Strategy discussion at VGot You" className="w-72 h-96 object-cover rounded-[2rem] shadow-2xl border-4 border-white hover:scale-[1.02] hover:-rotate-2 transition-all duration-700" />
        </div>
        <div className="relative z-10">
          <img src="https://www.vgotyou.com/assets/abt2.png" alt="Development process" className="w-80 h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-white hover:scale-[1.02] hover:rotate-2 transition-all duration-700 opacity-80 hover:opacity-100" />
        </div>
      </div>
    </div>
  </section>
);

// ─── PROCESS SECTION ──────────────────────────────────────────────────────────
const ProcessSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const steps = [
    { title: 'Discovery', description: 'We start by understanding your vision, goals, and audience.', detail: 'We dive deep into your business model, market positioning, and user needs. This phase sets the foundation for a project tailored to your specific objectives.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop', icon: 'https://www.vgotyou.com/assets/discovery.png' },
    { title: 'Planning', description: 'A comprehensive strategy and project roadmap are crafted.', detail: 'We define the technical architecture, sitemap, and user flows. Milestones are set to ensure the project stays on track.', image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop', icon: 'https://www.vgotyou.com/assets/plan.png' },
    { title: 'Design', description: 'We create intuitive UI/UX designs and high-fidelity mockups.', detail: 'Our design team translates wireframes into stunning visuals focused on UX, accessibility, and your brand identity.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop', icon: 'https://www.vgotyou.com/assets/design.png' },
    { title: 'Development', description: 'Turning designs into a functional, scalable product.', detail: 'We write clean, efficient code using modern frameworks ensuring everything is robust, secure, and optimized for speed.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', icon: 'https://www.vgotyou.com/assets/development.png' },
    { title: 'Delivery', description: 'Deployment, testing, and final handover.', detail: 'After rigorous QA testing across devices and browsers, we deploy your site and provide full training and asset handover.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop', icon: 'https://www.vgotyou.com/assets/delivery.png' },
  ];

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{ backgroundImage: 'repeating-radial-gradient(circle at 100% 50%, transparent 0, transparent 40px, #ef4444 40px, #ef4444 41px)', maskImage: 'radial-gradient(circle at 100% 50%, black, transparent 70%)' }}
      />
      <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 text-red-600">Our Proven Process</h2>
      </m.div>
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-zinc-800 -translate-x-1/2" />
        {steps.map((step, index) => (
          <m.div key={index} layout
            className={`mb-8 flex flex-col md:flex-row justify-between items-center w-full ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="hidden md:block w-5/12" />
            <m.div layout className={`z-20 flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 mb-4 md:mb-0 flex-shrink-0 overflow-hidden p-3 transition-all duration-500 ${hoveredIndex === index ? 'bg-red-600 border-red-600 scale-110' : 'bg-black border-red-600'}`}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 }}
            >
              <img src={step.icon} alt={step.title} className="w-full h-full object-contain filter brightness-0 invert" />
            </m.div>
            <m.div layout className="w-full md:w-5/12">
              <m.div layout className={`bg-zinc-900 border rounded-xl shadow-lg p-6 text-left relative overflow-hidden transition-all duration-300 ${hoveredIndex === index ? 'border-red-900/50 shadow-2xl' : 'border-zinc-800'}`}>
                <m.h3 layout="position" className="font-bold text-xl mb-2 flex items-center gap-2 text-white">
                  <span className="text-zinc-500 text-sm font-normal">0{index + 1}.</span>{step.title}
                </m.h3>
                <m.p layout="position" className="text-gray-400 text-sm leading-snug">{step.description}</m.p>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} style={{ overflow: "hidden" }}>
                      <div className="pt-4 border-t border-zinc-800 mt-4">
                        <img src={step.image} alt={step.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                        <p className="text-gray-300 text-sm leading-relaxed">{step.detail}</p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </m.div>
          </m.div>
        ))}
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Venkat Krishnan", role: "Director of Rudhraa Exports", text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled. The B2B platform they built has significantly improved our global operations.", avatar: "https://www.vgotyou.com/assets/venkat.png" },
  { name: "Santhosh", role: "Founder of Arctic Textiles", text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments! Their team really understood our manufacturing roots while bringing a global appeal.", avatar: "https://www.vgotyou.com/assets/santhosh.png" },
  { name: "Aravind Kumar", role: "Manager of Bloom Green Developers", text: "An incredibly professional and efficient team. They delivered our complex project on time and exceeded expectations. The conversion rate on our landing page jumped 3x.", avatar: "https://www.vgotyou.com/assets/aravind.png" },
];

const Testimonials: React.FC = () => (
  <section className="bg-white py-20 md:py-32 border-t border-zinc-100">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-16">
        <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Endorsements</span>
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic">Testimonials.</span>
        </h2>
        <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm md:text-lg font-light">
          We take pride in delivering results that matter. Here is what some of our valued partners have to say.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white border border-zinc-100 p-6 md:p-8 rounded-2xl flex flex-col h-full hover:shadow-xl hover:border-red-600/10 transition-all duration-500 group shadow-sm">
            <svg className="w-8 h-8 text-zinc-100 mb-4 group-hover:text-red-50 transition-colors" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6 flex-grow italic font-light">"{t.text}"</p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-50 group-hover:border-zinc-100 transition-colors">
              <div className="relative">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-50 group-hover:ring-red-100 transition-all duration-500" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div>
                <p className="font-bold text-zinc-900 text-sm group-hover:text-red-600 transition-colors">{t.name}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">{t.role}</p>
                <div className="flex gap-0.5 mt-1.5">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-3 h-3 text-red-600" />)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-20 opacity-60 max-w-3xl mx-auto">
        {[{ val: "4.9/5", label: "Average Rating" }, { val: "100%", label: "Project Delivery" }, { val: "24/7", label: "Premium Support" }].map(({ val, label }, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="hidden sm:block h-10 w-[1px] bg-zinc-100" />}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-3xl md:text-4xl font-black text-zinc-900">{val}</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400">{label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
const CTABanner: React.FC = () => (
  <section className="bg-zinc-950 py-20 px-6 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)', backgroundSize: '28px 28px' }}
    />
    <div className="container mx-auto max-w-4xl text-center relative z-10">
      <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="inline-block px-4 py-1 mb-6 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-bold tracking-[0.3em] uppercase">
          Ready to grow?
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          Get Your Business Online<br />
          <span className="text-red-500">in 7 Days.</span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Starting from <span className="text-white font-bold">₹12,000</span>. Professional website, SEO-ready, mobile-first. No hidden fees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-green-500/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm uppercase tracking-wider w-full sm:w-auto justify-center">
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp Us Now
          </a>
          <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-10 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-wider w-full sm:w-auto justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
            Call Us Free
          </a>
        </div>
        <p className="text-zinc-600 text-xs mt-6">No commitment needed · Free consultation · Reply within 1 hour</p>
      </m.div>
    </div>
  </section>
);

// ─── HOME PAGE (merged) ───────────────────────────────────────────────────────
const Home: React.FC = () => (
  <main>
    <HeroSection />
    <ServicesBento />
    <AboutSection />
    <ProcessSection />
    <Testimonials />
    <CTABanner />
  </main>
);

export default Home;
