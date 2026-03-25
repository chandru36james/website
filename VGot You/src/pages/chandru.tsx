
import React from 'react';
import { motion } from 'motion/react';
import { LinkedInIcon, GitHubIcon, InstagramIcon, CodeBracketIcon, PenToolIcon, BulbIcon } from '../components/common/Icons';
import { Helmet } from "react-helmet-async";   // ✅ SEO
const m = motion as any;

const AboutMe: React.FC = () => {
    // Skills Data
    const skillSets = [
        {
            category: "Development",
            icon: <img src="https://www.vgotyou.com/assets/development.png" alt="Development" className="w-8 h-8 object-contain " />,
            description: "Building fast, SEO-optimized, scalable web applications."
,
            skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind", "SQL"]
        },
        {
            category: "Design",
            icon: <PenToolIcon className="w-8 h-8" />,
            description: "Designing conversion-focused UI/UX and brand interfaces."
,
            skills: ["UI/UX", "Figma", "Adobe Suite", "Prototyping", "Motion"]
        },
        {
             category: "Strategy",
            icon: <img src="https://www.vgotyou.com/assets/strategy.png" alt="Strategy" className="w-8 h-8 object-contain dark:invert" />,
            description: "Driving business growth through SEO, branding, and digital strategy."
,
            skills: ["SEO", "Branding", "Analytics", "Content Strategy"]
        }
    ];

    const stats = [
        { number: "02+", label: "Years Exp." },
        { number: "15+", label: "Projects" },
        { number: "10+", label: "Happy Clients" }
    ];

    return (
        // KEY FIX: overflow-hidden on the root container restricts everything inside.
        <div className="relative w-full min-h-screen bg-white dark:bg-black overflow-hidden transition-colors duration-300">
             <Helmet>

        {/* ================= BASIC SEO ================= */}
        <html lang="en-IN" />

        <title>Chandru | Founder & Lead Web Designer at VGot You | Karur, India</title>

        <meta
          name="description"
          content="Meet Chandru, Founder and Lead Web Designer at VGot You, Karur. Specialising in high-conversion websites, UI/UX design, branding, and SEO for businesses across India and the UK."
        />

        {/* FIXED: Removed meta keywords — no SEO value */}

        <meta name="author" content="Chandru, VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/chandru" />

        {/* ================= HREFLANG ================= */}
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/chandru" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/chandru" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/chandru" />

        {/* ================= OPEN GRAPH ================= */}
        {/* FIXED: og:type = "profile" with required profile: tags */}
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="profile:first_name" content="Chandru" />
        <meta property="profile:last_name" content="" />
        <meta property="profile:username" content="chandru" />
        {/* FIXED: og:title matches <title> exactly */}
        <meta property="og:title" content="Chandru | Founder & Lead Web Designer at VGot You | Karur, India" />
        <meta
          property="og:description"
          content="Meet Chandru, Founder and Lead Web Designer at VGot You, Karur. Specialising in high-conversion websites, UI/UX design, branding, and SEO for businesses across India and the UK."
        />
        <meta property="og:url" content="https://www.vgotyou.com/chandru" />
        {/* Chandru page uses his own photo — correct, personal page should use personal image */}
        <meta property="og:image" content="https://www.vgotyou.com/assets/chandru.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* FIXED: og:image:alt was missing */}
        <meta property="og:image:alt" content="Chandru – Founder & Lead Web Designer at VGot You, Karur" />
        {/* FIXED: og:locale was missing */}
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />

        {/* ================= TWITTER / X ================= */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* FIXED: twitter:title matches <title> exactly */}
        <meta name="twitter:title" content="Chandru | Founder & Lead Web Designer at VGot You | Karur, India" />
        <meta
          name="twitter:description"
          content="Meet Chandru, Founder and Lead Web Designer at VGot You, Karur. Specialising in high-conversion websites, UI/UX design, branding, and SEO for businesses across India and the UK."
        />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/chandru.png" />
        {/* FIXED: twitter:site and twitter:creator were missing */}
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />

        {/* ================= SCHEMA: PERSON ================= */}

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://www.vgotyou.com/chandru#person",
            "name": "Chandru",
            "url": "https://www.vgotyou.com/chandru",
            "image": "https://www.vgotyou.com/assets/chandru.png",
            "jobTitle": "Founder & Lead Web Designer",
            "description": "Chandru is the Founder and Lead Web Designer at VGot You, based in Karur, Tamil Nadu. He specialises in high-conversion websites, UI/UX design, branding, and SEO for businesses across India and the UK.",
            "worksFor": {
              "@id": "https://www.vgotyou.com/#organization"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Karur",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "knowsAbout": [
              "Web Design",
              "UI UX Design",
              "Branding",
              "Logo Design",
              "Search Engine Optimization",
              "Frontend Development",
              "Conversion Optimization"
            ],
            "mainEntityOfPage": {
              "@type": "ProfilePage",
              "@id": "https://www.vgotyou.com/chandru#webpage"
            },
            "sameAs": [
              "https://www.linkedin.com/in/chandru-m7339436153/",
              "https://www.instagram.com/chandru_m_._/"
            ]
          }
        `}</script>

        {/* ================= SCHEMA: PROFILE PAGE ================= */}
    
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://www.vgotyou.com/chandru#webpage",
            "url": "https://www.vgotyou.com/chandru",
            "name": "Chandru | Founder & Lead Web Designer at VGot You | Karur, India",
            "description": "Meet Chandru, Founder and Lead Web Designer at VGot You, Karur. Specialising in high-conversion websites, UI/UX design, branding, and SEO.",
            "inLanguage": "en-IN",
            "isPartOf": {
              "@id": "https://www.vgotyou.com/#website"
            },
            "about": {
              "@id": "https://www.vgotyou.com/chandru#person"
            },
            "publisher": {
              "@id": "https://www.vgotyou.com/#organization"
            }
          }
        `}</script>

        {/* ================= SCHEMA: BREADCRUMB ================= */}
      
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.vgotyou.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Chandru",
                "item": "https://www.vgotyou.com/chandru"
              }
            ]
          }
        `}</script>
      </Helmet>


            
            {/* Background Decor - Contained within the overflow-hidden parent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-7xl mt-10 md:mt-0">
                
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24 lg:mb-32">
                    
                    {/* Text Content */}
                    <m.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold tracking-[0.2em] uppercase">
                             Founder & Lead Web Designer
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-black dark:text-white mb-6 leading-[1.1]">
                            Crafting Digital <br/>
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 pr-2">Masterpieces.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
                           I am the Founder and Lead Web Designer at VGot You, specializing in high-performance websites, UI/UX design, branding, and SEO. My mission is to build conversion-focused digital experiences that help businesses establish authority and grow online.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a 
  href="https://wa.me/917871120415?text=Hi%20chandru,%20I%20found%20VGot%20You%20and%20I%E2%80%99m%20interested%20in%20discussing%20a%20project."
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg"
>
  Work With Me
</a>
                            <div className="flex gap-2">
                                {[
                                    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/chandru-m7339436153/", label: "LinkedIn" },
                                    { icon: GitHubIcon, href: "https://github.com/chandru36james/", label: "GitHub" },
                                    { icon: InstagramIcon, href: "https://www.instagram.com/chandru_m_._/", label: "Instagram" }
                                ].map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-all duration-300"
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </m.div>

                    {/* Image Content */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-sm lg:max-w-md relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800">
                             <img 
                                src="https://www.vgotyou.com/assets/chandru.png" 
                                alt="Chandru – Founder and Lead Web Designer of VGot You in Karur, Tamil Nadu"
                                className="w-full h-full object-cover"
                                fetchPriority="high"
                            />
                            {/* Stats Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-transparent backdrop-blur border-t border-white/10 p-0.5">
                                <div className="grid grid-cols-3 divide-x divide-gray-300/50 dark:divide-gray-700/50">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center px-1">
                                            <div className="text-[8px] md:text-2xl font-bold text-red-600 dark:text-red-500 mb-0.5">{stat.number}</div>
                                            <div className="text-[8px] md:text-xs font-medium text-black  uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element behind image */}
                        <div className="absolute -z-10 top-8 right-8 w-full h-full border-2 border-gray-200 dark:border-zinc-800 rounded-[2rem] hidden md:block"></div>
                    </m.div>
                </div>

                {/* Skills Section */}
                <div id="skills" className="mb-24 scroll-mt-32">
                    <m.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white mb-6">Technical Arsenal</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
                    </m.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {skillSets.map((set, idx) => (
                            <m.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center mb-8 text-red-600 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-zinc-800">
                                    {set.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">{set.category}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">{set.description}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {set.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-white dark:bg-black text-xs font-bold text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-zinc-800">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>

                {/* Philosophy Section - Full Width Card */}
                <m.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black text-white py-20 px-6 md:px-20 text-center"
                >
                    {/* Abstract Background */}
                    <div className="absolute inset-0 opacity-20">
                         <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#gradient)" />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#DC2626" />
                                    <stop offset="100%" stopColor="#000000" />
                                </linearGradient>
                            </defs>
                         </svg>
                    </div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <img src="https://vgotyou.com/assets/bulb.png" alt="Philosophy" className="w-16 h-16 mx-auto mb-8 animate-pulse object-contain" />
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">"Simplicity is the ultimate sophistication."</h2>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            I believe great design is invisible. When UI, UX, branding, and performance work in harmony, users instantly build trust and take action without friction.

                        </p>
                    </div>
                </m.div>

            </div>
        </div>
    );
};

export default AboutMe;
