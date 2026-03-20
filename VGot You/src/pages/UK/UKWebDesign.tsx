import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    CheckCircleIcon, 
    RocketLaunchIcon, 
    UserGroupIcon, 
    SparklesIcon, 
    CodeBracketIcon,
    ChevronRightIcon,
    StarIcon,
    PlusIcon,
    MinusIcon
} from '@/components/Icons';
import { Helmet } from "react-helmet";

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

const FAQItem: React.FC<{ faq: { q: string, a: string }, isOpen: boolean, toggle: () => void }> = ({ faq, isOpen, toggle }) => (
    <div className="border-b border-zinc-900 overflow-hidden">
        <button 
            onClick={toggle}
            className="w-full py-6 flex items-center justify-between text-left group transition-colors"
        >
            <h4 className={`text-sm sm:text-base font-bold uppercase tracking-widest transition-colors ${isOpen ? 'text-red-600' : 'text-white group-hover:text-red-500'}`}>
                {faq.q}
            </h4>
            <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                {isOpen ? (
                    <MinusIcon className="w-5 h-5 text-red-600" />
                ) : (
                    <PlusIcon className="w-5 h-5 text-zinc-600 group-hover:text-red-500" />
                )}
            </div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="pb-8 pr-12">
                        <p className="text-zinc-500 text-sm leading-relaxed font-light">
                            {faq.a}
                        </p>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    </div>
);

const UKWebDesign: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const services = [
        {
            title: "Custom Website Design",
            description: "Bespoke UI/UX design tailored to your brand identity. We create unique digital experiences that resonate with your UK audience and drive engagement.",
            icon: <SparklesIcon className="w-6 h-6" />
        },
        {
            title: "Business Website Development",
            description: "High-performance corporate websites built for reliability and scale. We focus on professional aesthetics and seamless functionality for UK enterprises.",
            icon: <UserGroupIcon className="w-6 h-6" />
        },
        {
            title: "Ecommerce Development UK",
            description: "Conversion-focused online stores built on robust platforms. We optimise your checkout flow to reduce cart abandonment and increase UK sales.",
            icon: <RocketLaunchIcon className="w-6 h-6" />
        },
        {
            title: "Landing Page Design",
            description: "High-conversion landing pages designed for specific marketing campaigns. Perfect for UK businesses looking to maximise their PPC and social ROI.",
            icon: <CheckCircleIcon className="w-6 h-6" />
        },
        {
            title: "SEO-Optimised Development",
            description: "Websites built with search engines in mind. We ensure your site is technically sound, fast-loading, and ready to rank on Google UK.",
            icon: <CodeBracketIcon className="w-6 h-6" />
        }
    ];

    const faqs = [
        {
            q: "How much does web design cost in the UK?",
            a: "Web design costs in the UK vary depending on complexity. A standard business website typically starts from £1,500, while bespoke e-commerce platforms or enterprise solutions can range from £5,000 to £20,000+. We provide transparent, fixed-price quotes based on your specific requirements."
        },
        {
            q: "How long does it take to build a website?",
            a: "A typical project takes between 4 to 8 weeks from discovery to launch. Simple landing pages can be delivered in 2 weeks, while complex custom developments may take 12 weeks or more. We follow a strict timeline to ensure your UK business goes live on schedule."
        },
        {
            q: "Do you offer SEO with web design?",
            a: "Yes, every website we build includes foundational SEO-optimised development. This includes clean code, mobile responsiveness, fast loading speeds, and meta-tag structure. We also offer advanced SEO services UK to help you dominate search results for your target keywords."
        },
        {
            q: "Do you work with small businesses in the UK?",
            a: "Absolutely. We provide affordable web design UK solutions tailored for startups and small businesses. Our goal is to provide high-quality digital experiences that help smaller British companies compete with larger established brands."
        },
        {
            q: "Will my website be mobile-friendly?",
            a: "Yes, we follow a mobile-first development approach. Given that over 60% of UK web traffic comes from mobile devices, we ensure your website looks and functions perfectly on all screen sizes, from smartphones to desktops."
        }
    ];

    return (
        <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden">
           import { Helmet } from "react-helmet";

<Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Web Design UK | Professional Website Design Services | VGot You</title>

  <meta
    name="description"
    content="Premium web design services across the UK. We build fast, SEO-optimized websites for businesses in London, Manchester, Birmingham, Leeds and more."
  />

  <meta
    name="keywords"
    content="web design UK, UK website design, London web design, Manchester web design, Birmingham web development"
  />

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href="https://www.vgotyou.com/web-design-uk" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-uk" />
  <meta property="og:title" content="Web Design UK | VGot You" />
  <meta
    property="og:description"
    content="High-performance web design for UK businesses. SEO-focused, fast and conversion-driven websites."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design UK | VGot You" />
  <meta
    name="twitter:description"
    content="Professional web design services tailored for UK businesses. Fast, SEO-ready and conversion-focused."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Web Design Services",
      provider: {
        "@type": "Organization",
        name: "VGot You",
        url: "https://www.vgotyou.com"
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom"
      },
      description:
        "Professional web design services for UK businesses including SEO optimization, responsive design and branding."
    })}
  </script>

  {/* ================= WEBSITE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "VGot You",
      url: "https://www.vgotyou.com"
    })}
  </script>

  {/* ================= BREADCRUMB ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.vgotyou.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Web Design",
          item: "https://www.vgotyou.com/web-design"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Web Design UK",
          item: "https://www.vgotyou.com/web-design-uk"
        }
      ]
    })}
  </script>
</Helmet>
            

            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                .scanline-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 2px;
                    background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.1), transparent);
                    z-index: 100; pointer-events: none;
                    animation: scanline 10s linear infinite;
                }
            `}</style>
            
            <div className="scanline-overlay"></div>

            {/* Breadcrumbs */}
            <div className="absolute top-24 left-6 z-20 hidden md:block">
                <nav className="flex text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/web-design" className="hover:text-red-600 transition-colors">Web Design</Link>
                    <span className="mx-2">/</span>
                    <span className="text-zinc-400">UK Authority</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[80dvh] pt-24 md:pt-32 w-full flex items-center justify-center overflow-hidden border-b border-zinc-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                
                <div className="relative z-10 px-6 max-w-7xl mx-auto text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
                            Region: United_Kingdom / Authority_Node
                        </span>
                        <h1 className="text-5xl sm:text-7xl md:text-[8vw] font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                            Strategic <br/>
                            <span className="text-red-600">Web Design UK.</span>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-12">
                            VGot You is a premier <strong className="text-white">UK web design agency</strong> delivering high-conversion, <strong className="text-white">SEO-optimised websites</strong> for forward-thinking British businesses. We also specialise in <Link to="/seo-services-uk" className="text-red-600 hover:underline">SEO services UK</Link> and <Link to="/digital-marketing-uk" className="text-red-600 hover:underline">digital marketing UK</Link> to ensure your brand dominates the search results.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/contact?message=I'm interested in a Free Consultation for my UK business." className="px-10 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                Request Quote
                            </Link>
                            <Link to="/portfolio" className="px-10 py-5 border border-zinc-800 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                                View Portfolio
                            </Link>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* Trust & Authority */}
            <section className="py-20 border-b border-zinc-950 bg-zinc-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Projects Completed", value: "250+" },
                            { label: "UK Clients", value: "100+" },
                            { label: "Industries Served", value: "25+" },
                            { label: "Success Rate", value: "99%" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 sm:py-32 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="Core Offerings" code="UK_SERVICE_MODULE" />
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Expert Web Solutions</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">We provide a full suite of digital services designed to help UK businesses thrive in an increasingly competitive online market.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <div key={i} className="p-8 bg-[#080808] border border-zinc-900 rounded-sm hover:border-red-600/30 transition-all group">
                                <div className="w-12 h-12 bg-zinc-900 rounded-sm flex items-center justify-center mb-8 text-red-600 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-white">{service.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                                <Link to={`/contact?message=I'd like to enquire about ${service.title} for my business.`} className="inline-flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase tracking-widest hover:gap-4 transition-all">
                                    Enquire Now <ChevronRightIcon className="w-3 h-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 sm:py-32 px-6 bg-[#050505] border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Why Choose <br/><span className="text-red-600">VGot You UK?</span></h2>
                            <div className="space-y-8">
                                {[
                                    { t: "Conversion-Focused Design", d: "We don't just build pretty sites; we build sales machines calibrated for the UK market." },
                                    { t: "Fast-Loading Websites", d: "Speed is a ranking factor. Our sites are engineered for sub-second load times." },
                                    { t: "SEO-First Approach", d: "We integrate search strategy into the foundation of your site architecture." },
                                    { t: "Mobile-First Development", d: "Perfect experiences across all devices, ensuring you never miss a UK mobile lead." },
                                    { t: "Affordable Solutions", d: "Premium agency quality at prices that make sense for UK small businesses and startups." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="text-red-600 font-mono text-sm font-bold">0{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest mb-2">{item.t}</h4>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden relative group">
                                <img src="https://picsum.photos/seed/ukweb/800/800" alt="UK Web Design Excellence" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                <div className="absolute bottom-10 left-10">
                                    <div className="text-5xl font-black text-white mb-2">UK-WIDE</div>
                                    <div className="text-xs font-mono text-red-600 uppercase tracking-[0.4em]">Digital Authority</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 sm:py-32 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="The Workflow" code="VGY_PROCESS_V4" />
                    <div className="grid md:grid-cols-5 gap-8">
                        {[
                            { step: "01", title: "Discovery", desc: "Understanding your UK business goals and target audience." },
                            { step: "02", title: "UI/UX Design", desc: "Crafting visual prototypes focused on user experience." },
                            { step: "03", title: "Development", desc: "Building your site with clean, SEO-optimised code." },
                            { step: "04", title: "Testing", desc: "Rigorous quality assurance across all devices and browsers." },
                            { step: "05", title: "Launch", desc: "Deployment and ongoing support for your UK brand." }
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <div className="text-6xl font-black text-zinc-900 mb-6">{item.step}</div>
                                <h4 className="text-white font-bold uppercase tracking-widest mb-4">{item.title}</h4>
                                <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                                {i < 4 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-[1px] bg-zinc-800"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Packages */}
            <section className="py-24 sm:py-32 px-6 bg-[#050505] border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="Investment" code="UK_PRICING_TABLE" />
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Transparent Pricing</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">Premium web design solutions for every stage of your UK business growth.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Startup",
                                price: "£1,499",
                                features: ["5 Custom Pages", "Mobile Responsive", "Basic SEO", "Contact Form", "1 Month Support"]
                            },
                            {
                                name: "Business",
                                price: "£2,999",
                                features: ["10 Custom Pages", "Advanced SEO", "CMS Integration", "Speed Optimisation", "3 Months Support"],
                                popular: true
                            },
                            {
                                name: "Enterprise",
                                price: "Custom",
                                features: ["Unlimited Pages", "Full E-commerce", "Custom API Integration", "Dedicated Server", "Priority Support"]
                            }
                        ].map((pkg, i) => (
                            <div key={i} className={`p-10 border ${pkg.popular ? 'border-red-600 bg-red-600/5' : 'border-zinc-900 bg-black'} rounded-sm relative group`}>
                                {pkg.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-widest">Most Popular</div>}
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{pkg.name}</h3>
                                <div className="text-4xl font-black text-white mb-8">{pkg.price}</div>
                                <ul className="space-y-4 mb-10">
                                    {pkg.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-zinc-400">
                                            <CheckCircleIcon className="w-4 h-4 text-red-600" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to={`/contact?message=I'm interested in the ${pkg.name} pricing plan for my UK business.`} className={`block w-full py-4 text-center font-bold uppercase tracking-widest text-xs transition-all ${pkg.popular ? 'bg-red-600 text-white hover:bg-red-700' : 'border border-zinc-800 text-white hover:bg-white hover:text-black'}`}>
                                    Select Plan
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-24 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl text-center">
                    <TechnicalHeader label="The Stack" code="VGY_CORE_TECH" />
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">Our Technology</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Shopify", "Figma"].map((tech, i) => (
                            <div key={i} className="px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-sm font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-red-600 hover:border-red-600/30 transition-all">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section className="py-24 bg-zinc-950 border-b border-zinc-900">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Our UK Portfolio</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto mb-12">Explore our past work and see how we've helped British businesses transform their digital presence.</p>
                    <Link to="/portfolio" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">
                        Explore Past Work <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 sm:py-32 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Client Feedback</h2>
                        <Link to="/testimonials" className="text-red-600 font-bold uppercase tracking-widest text-xs hover:underline">Read All Reviews</Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { name: "James Wilson", role: "CEO, London Tech", text: "VGot You transformed our online presence. Their SEO-optimised development helped us double our organic traffic in just 3 months." },
                            { name: "Sarah Thompson", role: "Founder, Manchester Retail", text: "The ecommerce website development UK team at VGot You is top-notch. Our sales have increased significantly since the new launch." }
                        ].map((t, i) => (
                            <div key={i} className="p-10 bg-[#080808] border border-zinc-900 rounded-sm">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-red-600" />)}
                                </div>
                                <p className="text-zinc-400 italic mb-8">"{t.text}"</p>
                                <div>
                                    <div className="text-white font-bold uppercase tracking-widest text-sm">{t.name}</div>
                                    <div className="text-zinc-600 text-[10px] uppercase tracking-widest mt-1">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Relevance */}
            <section className="py-24 bg-[#050505] border-b border-zinc-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Serving the UK Market</h2>
                        <p className="text-zinc-500 max-w-3xl mx-auto mb-12">From the bustling streets of London to the industrial hubs of Manchester, we provide localized digital strategies for every major UK city.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Bristol", "Sheffield", "Edinburgh", "Leicester", "Cardiff", "Belfast"].map(city => (
                                <Link key={city} to={`/web-design-${city.toLowerCase()}`} className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-red-600 transition-all">
                                     {city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 sm:py-32 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <FAQItem 
                                key={i} 
                                faq={faq} 
                                isOpen={openFaqIndex === i} 
                                toggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 sm:py-48 px-6 text-center bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-black uppercase leading-[0.8] mb-8 md:mb-12 tracking-tighter">
                        Ready to <br/>
                        <span className="text-red-600">Connect?</span>
                    </h2>
                    <p className="text-zinc-500 mb-16 text-lg md:text-xl max-w-2xl mx-auto">
                        Stop losing customers to competitors with better websites. Let's build your premium UK digital presence today.
                    </p>
                    <Link to="/contact?message=I'm ready to connect and discuss my UK web design project." className="px-16 py-6 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all inline-block">
                        Get Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default UKWebDesign;
