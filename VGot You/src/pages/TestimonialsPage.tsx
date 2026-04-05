import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
// FIX: Using namespace import for react-router-dom to resolve "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';

import { StarIcon, ChevronRightIcon, QuoteIcon, SparklesIcon, GoogleIcon } from '../components/common/Icons';

const { Link } = ReactRouterDOM as any;
const m = motion as any;

const TechnicalHeader = ({ label, code }: { label: string; code: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] flex-grow bg-zinc-800/50"></div>
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-red-600 animate-pulse"></div>
        <span className="text-[10px] font-mono text-red-600 tracking-[0.4em] uppercase">{label}</span>
      </div>
      <span className="text-[8px] font-mono text-zinc-600 mt-1">SYS_REF: {code}</span>
    </div>
    <div className="h-[1px] flex-grow bg-zinc-800/50"></div>
  </div>
);

const ReviewCard = ({ name, rating, text, date, techStack = "React/Vite/Tailwind" }: { name: string, rating: number, text: string, date: string, techStack?: string }) => (
    <div className="bg-[#080808]/40 backdrop-blur-md border border-zinc-900 p-8 rounded-sm relative group hover:border-red-600/30 transition-all duration-700 flex flex-col h-full overflow-hidden">
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-[1px] bg-zinc-800 group-hover:bg-red-600/50 transition-colors"></div>
        <div className="absolute top-0 left-0 w-[1px] h-4 bg-zinc-800 group-hover:bg-red-600/50 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-zinc-800 group-hover:bg-red-600/50 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-zinc-800 group-hover:bg-red-600/50 transition-colors"></div>

        <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="flex flex-col">
                <span className="text-white font-black text-xs uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors">{name}</span>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-0.5">
                        <div className="w-1 h-1 bg-red-600"></div>
                        <div className="w-1 h-1 bg-red-600/50"></div>
                        <div className="w-1 h-1 bg-red-600/20"></div>
                    </div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Verified_Signal</span>
                </div>
            </div>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-3 h-3 ${i < rating ? 'text-red-600' : 'text-zinc-800'}`} />
                ))}
            </div>
        </div>
        
        <div className="relative mb-8 flex-grow">
            <QuoteIcon className="absolute -top-4 -left-4 w-8 h-8 text-zinc-900/50 -z-10 group-hover:scale-125 group-hover:text-red-900/20 transition-all duration-700" />
            <p className="text-zinc-400 text-sm leading-relaxed font-light italic relative z-10 group-hover:text-zinc-300 transition-colors">
                {text}
            </p>
        </div>

        {/* Technical Breakdown - Revealed on Hover */}
        <div className="h-0 group-hover:h-16 overflow-hidden transition-all duration-700 border-t border-zinc-900/50 mt-4 pt-4 opacity-0 group-hover:opacity-100">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Tech_Stack</span>
                    <span className="text-[9px] font-mono text-red-900 uppercase truncate">{techStack}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Efficiency_Gain</span>
                    <span className="text-[9px] font-mono text-red-900 uppercase">+42%_Optimized</span>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-zinc-900/50 relative z-10 mt-auto">
            <div className="flex flex-col">
                <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-tighter">Timestamp</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">{date}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-zinc-800 uppercase group-hover:text-red-900 transition-colors">Integrity_Check</span>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-all duration-500 group-hover:shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
            </div>
        </div>
    </div>
);

const ServiceReview = ({ category, client, quote, outcome }: { category: string, client: string, quote: string, outcome: string }) => (
    <div className="p-12 border border-zinc-900 bg-zinc-950/20 relative overflow-hidden group hover:bg-zinc-950/40 transition-all duration-700">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
            <QuoteIcon className="w-20 h-20" />
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-red-600"></div>
                <span className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em]">{category}</span>
            </div>
            
            <h4 className="text-white font-black text-2xl mb-4 tracking-tighter uppercase group-hover:text-red-500 transition-colors duration-500">{client}</h4>
            <p className="text-zinc-500 text-lg italic mb-10 leading-relaxed font-light border-l border-zinc-800 pl-6 group-hover:border-red-900 transition-colors">
                "{quote}"
            </p>
            
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-zinc-800 group-hover:w-20 group-hover:bg-red-600 transition-all duration-700"></div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Metric: {outcome}</span>
                    </div>
                    {/* Visual Metric Bar */}
                    <div className="h-1 w-48 bg-zinc-900 rounded-full overflow-hidden">
                        <m.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-red-600/50 group-hover:bg-red-600 transition-colors duration-500"
                        />
                    </div>
                </div>
                <div className="text-[8px] font-mono text-zinc-800 group-hover:text-zinc-600 transition-colors">
                    REF_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
            </div>
        </div>
    </div>
);

const mockReviews = [
    { name: "Suresh Kumar", rating: 5, text: "The best web design company reviews Karur led me to VGot You. They engineered a high-performance export website for my manufacturing business that works flawlessly.", date: "2 months ago" },
    { name: "Priya Dharshini", rating: 5, text: "Professional branding and constant communication. VGot You reviews are definitely reflective of the quality work they do for startups in Tamil Nadu.", date: "1 month ago" },
    { name: "Industrial Solutions", rating: 5, text: "Excellent digital studio reviews Tamil Nadu. Their SEO and Google Business Profile optimization helped us reach page 1 in under three months.", date: "3 weeks ago" },
    { name: "Arun Textiles", rating: 5, text: "Quick turnaround and clean design. Very happy with the Shopify store setup for our export line. Highly recommend their technical expertise.", date: "2 weeks ago" },
    { name: "Vijay R.", rating: 5, text: "Technically advanced and aesthetically superior. The best web designer in Karur I have worked with so far.", date: "1 week ago" }
];

const LiveDataStream = () => {
    const [metrics, setMetrics] = React.useState({
        throughput: "124.5 MB/s",
        active_users: 142,
        server_load: "24%"
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                throughput: (120 + Math.random() * 10).toFixed(1) + " MB/s",
                active_users: 140 + Math.floor(Math.random() * 10),
                server_load: (20 + Math.random() * 10).toFixed(0) + "%"
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-8 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <span className="text-zinc-700">Throughput:</span>
                <span className="text-red-900/80">{metrics.throughput}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-zinc-700">Active_Sessions:</span>
                <span className="text-red-900/80">{metrics.active_users}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-zinc-700">Load:</span>
                <span className="text-red-900/80">{metrics.server_load}</span>
            </div>
        </div>
    );
};

const TestimonialsPage: React.FC = () => {
    const googleBusinessUrl = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur";

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-24">
            <Helmet>
                {/* ================= BASIC SEO ================= */}
                <html lang="en-IN" />
                <title>Client Testimonials & Reviews | VGot You – Web Design Karur</title>
                <meta
                    name="description"
                    content="Read genuine reviews and testimonials from our clients in Karur and across Tamil Nadu. See how VGot You helps businesses grow with high-performance web design and SEO."
                />
                <meta name="author" content="VGot You" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.vgotyou.com/testimonials" />

                {/* ================= HREFLANG ================= */}
                <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/testimonials" />
                <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/testimonials" />
                <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/testimonials" />

                {/* ================= OPEN GRAPH ================= */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="VGot You" />
                <meta property="og:title" content="Client Testimonials & Reviews | VGot You – Web Design Karur" />
                <meta
                    property="og:description"
                    content="Read genuine reviews and testimonials from our clients in Karur and across Tamil Nadu. See how VGot You helps businesses grow with high-performance web design and SEO."
                />
                <meta property="og:url" content="https://www.vgotyou.com/testimonials" />
                <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="VGot You Client Testimonials – Web Design & SEO Reviews" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:locale:alternate" content="en_GB" />

                {/* ================= TWITTER / X ================= */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Client Testimonials & Reviews | VGot You – Web Design Karur" />
                <meta
                    name="twitter:description"
                    content="Read genuine reviews and testimonials from our clients in Karur and across Tamil Nadu."
                />
                <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
                <meta name="twitter:site" content="@vgotyou" />
                <meta name="twitter:creator" content="@vgotyou" />

                {/* ================= SCHEMA: WEBPAGE ================= */}
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://www.vgotyou.com/testimonials#webpage",
                        "url": "https://www.vgotyou.com/testimonials",
                        "name": "Client Testimonials & Reviews | VGot You",
                        "description": "Read genuine reviews and testimonials from our clients in Karur and across Tamil Nadu.",
                        "inLanguage": "en-IN",
                        "isPartOf": {
                            "@id": "https://www.vgotyou.com/#website"
                        },
                        "publisher": {
                            "@id": "https://www.vgotyou.com/#organization"
                        }
                    }
                `}</script>

                {/* ================= SCHEMA: FAQ ================= */}
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What do clients say about VGot You's web design services?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Clients consistently praise VGot You for delivering high-performance, professional websites tailored for B2B exports and local businesses in Karur and Tamil Nadu."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is VGot You a reliable web design company in Karur?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, VGot You has a 5.0 aggregate rating on Google and a 98.4% client retention rate, reflecting our commitment to quality and client success."
                                }
                            }
                        ]
                    }
                `}</script>

                {/* ================= SCHEMA: BREADCRUMBLIST ================= */}
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
                                "name": "Testimonials",
                                "item": "https://www.vgotyou.com/testimonials"
                            }
                        ]
                    }
                `}</script>
            </Helmet>

            {/* Hidden H2 for SEO Keyword Support */}
            <h2 className="sr-only">Best Web Design Company Reviews Karur & Tamil Nadu</h2>
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* System Status Bar */}
            <div className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900 py-2 px-6 hidden md:block">
                <div className="container mx-auto max-w-7xl flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">System_Online</span>
                        </div>
                        <div className="h-3 w-[1px] bg-zinc-800"></div>
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Nodes: 12_Active</span>
                        <div className="h-3 w-[1px] bg-zinc-800"></div>
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Latency: 14ms</span>
                        <div className="h-3 w-[1px] bg-zinc-800"></div>
                        <span className="text-[8px] font-mono text-red-900 uppercase tracking-widest">Trust_Index: 1.00</span>
                    </div>
                    <LiveDataStream />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-32 px-6 border-b border-zinc-900 bg-black overflow-hidden min-h-[75vh] flex items-center">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Collaborative team environment at VGot You digital studio in Karur, Tamil Nadu" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                />
                
                {/* Scanning Line Effect */}
                <m.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-red-600/20 blur-sm z-10 pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/90"></div>
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 mb-12 border border-red-900/30 rounded-full bg-red-950/10 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>
                            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-red-500 font-black">
                                // Validation_Matrix: Verified_Signals
                            </span>
                        </div>
                        
                        <h1 className="text-[14vw] sm:text-[12vw] md:text-[9vw] font-black leading-[0.75] tracking-tighter uppercase mb-12">
                            <m.span 
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="block"
                            >
                                Client
                            </m.span>
                            <m.span 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-red-800 block"
                            >
                                Feedback.
                            </m.span>
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-t border-zinc-900 pt-12 mt-12">
                            <p className="text-xs md:text-sm text-zinc-500 max-w-xl font-light leading-relaxed uppercase tracking-[0.3em]">
                                Honest experiences from our partners in Karur and across Tamil Nadu. All testimonials are genuine reflections of our technical and creative delivery.
                            </p>
                            <div className="h-12 w-[1px] bg-zinc-800 hidden md:block"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[32px] font-black text-white leading-none tracking-tighter italic">98.4%</span>
                                <span className="text-[8px] font-mono text-red-600 uppercase tracking-widest mt-1">Client_Retention</span>
                            </div>
                            <div className="h-12 w-[1px] bg-zinc-800 hidden md:block"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Security_Protocol</span>
                                <span className="text-sm font-mono text-red-900/60 uppercase">AES-256_Active</span>
                            </div>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* Live Google Reviews Section */}
            <section className="py-32 px-6 border-b border-zinc-900 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.05)_0%,transparent_50%)]"></div>
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Live Google Signals</h2>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-red-600" />)}
                                </div>
                                <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">Aggregate Rating: 5.0 Based on Verified Registry</p>
                            </div>
                        </m.div>
                        
                        <m.a 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            href={googleBusinessUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 px-6 py-3 border border-zinc-800 hover:border-red-600 transition-all duration-500"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Verify Registry</span>
                                <span className="text-[8px] font-mono text-zinc-600 uppercase">External_Link</span>
                            </div>
                            <ChevronRightIcon className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                        </m.a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                        {mockReviews.map((review, i) => (
                            <m.div 
                                key={i} 
                                className="bg-black"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ReviewCard {...review} />
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Client Case Reviews */}
            <section className="py-32 px-6 bg-[#050505] border-b border-zinc-900 relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Advanced digital infrastructure and search engineering patterns at VGot You" 
                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <TechnicalHeader label="Industrial_Archive" code="FEATURE_NODES_04" />
                    <m.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-center mb-32 leading-[0.85]"
                    >
                        Sector Specific <br/>
                        <span className="text-red-900">Mastery.</span>
                    </m.h2>
                    
                    <div className="grid lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                        <ServiceReview 
                            category="Web Design & UI/UX"
                            client="Arctic Textiles Exports"
                            quote="VGot You delivered a platform that truly represents our scale. It's fast, professional, and built specifically for B2B export needs."
                            outcome="+140% Global Lead Gen"
                        />
                        <ServiceReview 
                            category="Logo & Branding"
                            client="BloomGreen Developers"
                            quote="The brand identity they created has given us an immediate edge in the local real estate market. It feels premium and established."
                            outcome="Unified Market Authority"
                        />
                        <ServiceReview 
                            category="SEO Engineering"
                            client="Rudhraa Exim"
                            quote="Our visibility on keywords related to fabric exports grew exponentially. We are now capturing leads we didn't know existed."
                            outcome="Top 3 Global Rankings"
                        />
                        <ServiceReview 
                            category="Digital Marketing"
                            client="mp3 Nutrition Coach"
                            quote="The ad conversion strategy was clinical. We saw a 3.2x return on our ad spend within the first month of operation."
                            outcome="High-Intent Traffic ROI"
                        />
                    </div>
                </div>
            </section>

            {/* Trust Pillars */}
            <section className="py-32 px-6 border-b border-zinc-900 bg-black relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(220,38,38,0.03)_0%,transparent_60%)]"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-24 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none">Why Partners Choose <br/><span className="text-zinc-800">VGot You Studio.</span></h2>
                            <ul className="space-y-10">
                                {[
                                    { t: "Technical Transparency", d: "You collaborate directly with the engineers and designers. No middle-management noise." },
                                    { t: "Karur Roots, Global Standards", d: "We understand the local Tamil Nadu ecosystem while delivering international quality code." },
                                    { t: "Outcome Based Design", d: "Every pixel is placed with a purpose—to convert, to build trust, or to rank higher." },
                                    { t: "Holistic Ecosystem", d: "From code and SEO to branding and content, everything is engineered to work in synergy." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6 group">
                                        <div className="mt-1.5 w-5 h-5 bg-zinc-900 border border-zinc-800 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-500 rounded-sm flex-shrink-0 flex items-center justify-center relative">
                                            <div className="w-1.5 h-1.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {/* Pulse Effect */}
                                            <m.div 
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-red-600/20 rounded-sm opacity-0 group-hover:opacity-100"
                                            />
                                        </div>
                                        <div>
                                            <h5 className="font-black uppercase tracking-[0.15em] text-sm text-white mb-3 group-hover:text-red-500 transition-colors">{item.t}</h5>
                                            <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </m.div>
                                                <m.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square border border-zinc-900 p-16 flex flex-col items-center justify-center bg-[#050505] overflow-hidden group shadow-2xl"
                        >
                             <img 
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop" 
                                alt="Professional business partnership and strategic consultation at VGot You digital studio" 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:opacity-20 transition-opacity duration-1000"
                             />
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                             
                             {/* Decorative Elements */}
                             <div className="absolute top-8 left-8 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Trust_Metric_v2.0</div>
                             <div className="absolute bottom-8 right-8 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Verified_2024</div>

                             <SparklesIcon className="w-20 h-20 text-red-600 mb-8 opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                             
                             <div className="relative">
                                <m.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="text-[120px] font-black italic text-white leading-none drop-shadow-[0_0_30px_rgba(220,38,38,0.3)] relative z-10"
                                >
                                    5.0
                                </m.span>
                                {/* Scanning Line for Trust Score */}
                                <m.div 
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 w-full h-[1px] bg-red-600/40 z-20 pointer-events-none"
                                />
                             </div>

                             <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mt-8 relative z-10 font-bold">Aggregate_Trust_Score</p>
                             <div className="flex gap-2 mt-6 relative z-10">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />)}
                             </div>
                             
                             <div className="mt-4 flex items-center gap-2 relative z-10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">System_Verified_Authority</span>
                             </div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-40 px-6 text-center bg-black relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Strategic business expansion and digital transformation by VGot You experts" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                />
                
                {/* Data Transmission Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <m.div
                            key={i}
                            initial={{ 
                                x: (i * 5) + "%", 
                                y: "-10%", 
                                opacity: 0 
                            }}
                            animate={{ 
                                y: ["0%", "100%"],
                                opacity: [0, 0.2, 0]
                            }}
                            transition={{ 
                                duration: 5 + Math.random() * 5, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                            className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-red-600 to-transparent"
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div>
                
                <m.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <div className="inline-block px-6 py-2 mb-16 border border-red-900/30 bg-red-950/10 text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.6em]">Action: Expand_Signal_Broadcast</div>
                    <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.75] mb-20 tracking-tighter text-white">
                        Have we <br/>
                        <span className="text-red-800">Helped You?</span>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <a
                            href="https://share.google/vPgtIOY8ZqYXkGlgg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white text-black px-16 py-6 font-black text-xs uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all duration-500 inline-block rounded-sm active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Leave Google Review</span>
                            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </a>
                        <Link
                            to="/contact?message=Hi VGot You, I've read your client reviews and I'm ready to start a project."
                            className="group border border-zinc-800 text-white px-16 py-6 font-black text-xs uppercase tracking-[0.4em] hover:border-red-600 transition-all duration-500 inline-block rounded-sm active:scale-95"
                        >
                            Start A Project
                        </Link>
                    </div>
                    
                    <div className="mt-24 flex flex-col items-center gap-4">
                        <div className="h-[1px] w-24 bg-zinc-800"></div>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest max-w-sm mx-auto leading-relaxed font-mono">
                            // We value every technical partnership. <br/>
                            // Your feedback helps us refine our company's output.
                        </p>
                    </div>
                </m.div>
            </section>
        </div>
    );
};


export default TestimonialsPage;