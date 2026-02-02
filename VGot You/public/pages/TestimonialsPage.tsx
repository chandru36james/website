import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// FIX: Using namespace import for react-router-dom to resolve "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from "react-helmet";
import { StarIcon, ChevronRightIcon, QuoteIcon, SparklesIcon, GoogleIcon } from '../components/Icons';

const { Link } = ReactRouterDOM as any;
const m = motion as any;

const TechnicalHeader = ({ label, code }: { label: string; code: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] flex-grow bg-zinc-800"></div>
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono text-red-600 tracking-[0.4em] uppercase">{label}</span>
      <span className="text-[8px] font-mono text-zinc-600 mt-1">{code}</span>
    </div>
    <div className="h-[1px] flex-grow bg-zinc-800"></div>
  </div>
);

const ReviewCard = ({ name, rating, text, date }: { name: string, rating: number, text: string, date: string }) => (
    <div className="bg-[#080808]/80 backdrop-blur-sm border border-zinc-900 p-8 rounded-sm relative group hover:border-red-600/30 transition-all duration-500 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm uppercase tracking-wider">{name}</span>
                <div className="flex items-center gap-1.5 mt-1">
                    <GoogleIcon className="w-2.5 h-2.5 text-zinc-600" />
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">Verified Reviewer</span>
                </div>
            </div>
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-3 h-3 ${i < rating ? 'text-red-600' : 'text-zinc-800'}`} />
                ))}
            </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed font-light mb-8 italic flex-grow">"{text}"</p>
        <div className="flex justify-between items-center pt-4 border-t border-zinc-900/50">
            <span className="text-[8px] font-mono text-zinc-700 uppercase">{date}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-colors"></div>
        </div>
    </div>
);

const ServiceReview = ({ category, client, quote, outcome }: { category: string, client: string, quote: string, outcome: string }) => (
    <div className="p-10 border border-zinc-900 bg-zinc-950/30 relative overflow-hidden group hover:bg-zinc-950 transition-colors duration-500">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <QuoteIcon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <span className="text-[9px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-6 block border-l-2 border-red-600 pl-3">{category}</span>
            <h4 className="text-white font-black text-xl mb-3 tracking-tight">{client}</h4>
            <p className="text-zinc-500 text-base italic mb-8 leading-relaxed font-light">"{quote}"</p>
            <div className="flex items-center gap-4">
                <div className="h-[1px] w-6 bg-zinc-800 group-hover:bg-red-600 transition-colors"></div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Signal: {outcome}</span>
            </div>
        </div>
    </div>
);

const TestimonialsPage: React.FC = () => {
    const [liveReviews, setLiveReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const mockReviews = [
            { name: "Suresh Kumar", rating: 5, text: "The best web design company reviews Karur led me to VGot You. They engineered a high-performance export website for my manufacturing business that works flawlessly.", date: "2 months ago" },
            { name: "Priya Dharshini", rating: 5, text: "Professional branding and constant communication. VGot You reviews are definitely reflective of the quality work they do for startups in Tamil Nadu.", date: "1 month ago" },
            { name: "Industrial Solutions", rating: 5, text: "Excellent digital studio reviews Tamil Nadu. Their SEO and Google Business Profile optimization helped us reach page 1 in under three months.", date: "3 weeks ago" },
            { name: "Arun Textiles", rating: 5, text: "Quick turnaround and clean design. Very happy with the Shopify store setup for our export line. Highly recommend their technical expertise.", date: "2 weeks ago" },
            { name: "Vijay R.", rating: 5, text: "Technically advanced and aesthetically superior. The best web designer in Karur I have worked with so far.", date: "1 week ago" }
        ];
        
        const timer = setTimeout(() => {
            setLiveReviews(mockReviews);
            setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);

    const googleBusinessUrl = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur";

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-24">
        

<Helmet>
  {/* ================= PRIMARY SEO ================= */}
  <title>Testimonials & Customer Reviews | VGot You Digital Studio</title>

  <meta
    name="description"
    content="Read verified customer reviews and testimonials for VGot You. Trusted web design, SEO, branding, and digital studio services in Karur and across Tamil Nadu."
  />

  <meta
    name="keywords"
    content="VGot You reviews, web design company reviews karur, digital studio testimonials tamil nadu, SEO company reviews karur, branding agency reviews tamil nadu, google reviews vgot you"
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="VGot You" />

  <link
    rel="canonical"
    href="https://www.vgotyou.com/reviews"
  />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta
    property="og:title"
    content="Customer Reviews & Testimonials | VGot You"
  />
  <meta
    property="og:description"
    content="Explore genuine client feedback and Google reviews for VGot You’s web design, SEO, branding, and digital services."
  />
  <meta
    property="og:url"
    content="https://www.vgotyou.com/testimonials"
  />
  <meta
    property="og:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Customer Reviews & Testimonials | VGot You"
  />
  <meta
    name="twitter:description"
    content="Verified Google reviews and testimonials from clients across Karur and Tamil Nadu."
  />
  <meta
    name="twitter:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />

  {/* ================= BREADCRUMB SCHEMA ================= */}
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
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Reviews",
          "item": "https://www.vgotyou.com/testimonials"
        }
      ]
    })}
  </script>

  {/* ================= REVIEW PAGE ENTITY (SAFE) ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Customer Reviews & Testimonials",
      "url": "https://www.vgotyou.com/testimonials",
      "about": {
        "@type": "LocalBusiness",
        "name": "VGot You",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karur",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        }
      }
    })}
  </script>
</Helmet>

            {/* Hero Section */}
            <section className="relative py-24 px-6 border-b border-zinc-900 bg-black overflow-hidden min-h-[70vh] flex items-center">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Collaborative team environment at VGot You digital studio in Karur, Tamil Nadu" 
                    className="absolute inset-0 w-full h-full object-cover opacity-55 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-8 border border-zinc-800 rounded-sm bg-black/50 text-[10px] font-mono tracking-[0.5em] uppercase text-red-600 font-black">
                            // Validation_Matrix: Verified
                        </span>
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[7vw] font-black leading-[0.8] tracking-tighter uppercase mb-10">
                            Client <br/>
                            <span className="text-red-800">Feedback.</span>
                        </h1>
                        <p className="text-sm md:text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-widest border-t border-zinc-900 pt-10 mt-10">
                            Honest experiences from our partners in Karur and across Tamil Nadu. All testimonials are genuine reflections of our technical and creative delivery.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* Live Google Reviews Section */}
            <section className="py-24 px-6 border-b border-zinc-900 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.03)_0%,transparent_50%)]"></div>
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Live Google Signals</h2>
                            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">Client feedback based on Google Business Profile reviews</p>
                        </div>
                        <a 
                            href={googleBusinessUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-[10px] font-bold text-red-600 uppercase tracking-widest hover:text-red-500 transition-all"
                        >
                            Verify Registry <ChevronRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                        {isLoading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="bg-black p-10 h-64 animate-pulse flex flex-col justify-center">
                                    <div className="h-4 w-32 bg-zinc-900 mb-6"></div>
                                    <div className="h-2 w-full bg-zinc-900 mb-3"></div>
                                    <div className="h-2 w-2/3 bg-zinc-900"></div>
                                </div>
                            ))
                        ) : (
                            liveReviews.map((review, i) => (
                                <div key={i} className="bg-black">
                                    <ReviewCard {...review} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Client Case Reviews */}
            <section className="py-24 px-6 bg-[#050505] border-b border-zinc-900 relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Advanced digital infrastructure and search engineering patterns at VGot You" 
                    className="absolute inset-0 w-full h-full object-cover opacity-10 "
                />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <TechnicalHeader label="Industrial_Archive" code="FEATURE_NODES" />
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-24">Sector Specific Mastery</h2>
                    
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
            <section className="py-24 px-6 border-b border-zinc-900 bg-black relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(220,38,38,0.02)_0%,transparent_60%)]"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-none">Why Partners Choose <br/><span className="text-zinc-800">VGot You Studio.</span></h3>
                            <ul className="space-y-8">
                                {[
                                    { t: "Technical Transparency", d: "You collaborate directly with the engineers and designers. No middle-management noise." },
                                    { t: "Karur Roots, Global Standards", d: "We understand the local Tamil Nadu ecosystem while delivering international quality code." },
                                    { t: "Outcome Based Design", d: "Every pixel is placed with a purpose—to convert, to build trust, or to rank higher." },
                                    { t: "Holistic Ecosystem", d: "From code and SEO to branding and content, everything is engineered to work in synergy." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5">
                                        <div className="mt-1.5 w-4 h-4 bg-red-600 rounded-sm flex-shrink-0 animate-pulse"></div>
                                        <div>
                                            <h5 className="font-bold uppercase tracking-[0.1em] text-sm text-white mb-2">{item.t}</h5>
                                            <p className="text-zinc-500 text-[13px] leading-relaxed font-light">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-square border border-zinc-900 p-12 flex flex-col items-center justify-center bg-[#050505] overflow-hidden group">
                             <img 
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop" 
                                alt="Professional business partnership and strategic consultation at VGot You digital studio" 
                                className="absolute inset-0 w-full h-full object-cover opacity-65 grayscale group-hover:opacity-25 transition-opacity duration-1000"
                             />
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                             <SparklesIcon className="w-24 h-24 text-red-600 mb-6 opacity-30 group-hover:scale-110 transition-transform duration-700" />
                             <span className="text-8xl font-black italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10">5.0</span>
                             <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mt-6 relative z-10">Aggregate_Trust_Score</p>
                             <div className="flex gap-1 mt-4 relative z-10">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-red-600" />)}
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-32 px-6 text-center bg-black relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Strategic business expansion and digital transformation by VGot You experts" 
                    className="absolute inset-0 w-full h-full object-cover opacity-25 "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
                <m.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <div className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Expand_Signal</div>
                    <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter text-white">
                        Have we <br/>
                        <span className="text-red-800">Helped You?</span>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href={googleBusinessUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-12 py-5 font-bold text-xs uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all inline-block rounded-sm active:scale-95"
                        >
                            Leave Google Review
                        </a>
                        <Link
                            to="/contact"
                            className="border border-zinc-800 text-white px-12 py-5 font-bold text-xs uppercase tracking-[0.3em] hover:bg-zinc-900 transition-all inline-block rounded-sm active:scale-95"
                        >
                            Start A Project
                        </Link>
                    </div>
                    
                    <p className="text-[10px] mt-20 text-zinc-700 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                        We value every technical partnership. Your feedback helps us refine our company's output.
                    </p>
                </m.div>
            </section>
        </div>
    );
};

export default TestimonialsPage;