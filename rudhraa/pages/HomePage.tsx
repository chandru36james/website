

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS, ICONS, SOCIAL_LINKS, CATEGORIES, STAT_ICONS } from '../constants';
import { Product, Testimonial } from '../types';
import useAnimateOnScroll from '../components/useAnimateOnScroll';
import { useSearch } from '../contexts/SearchContext';
import MetaTags from '../components/MetaTags';

const heroImages = [
    'https://rudhraaexportsandimports.com/images/p1.jpeg',
    'https://rudhraaexportsandimports.com/images/p2.jpeg',
    'https://rudhraaexportsandimports.com/images/p3.jpeg'
];

// Section: Hero
const HeroSection: React.FC = () => {
    const { openModal } = useSearch();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Typing animation logic
    const words = useMemo(() => ["Mangoes...", "Red Chilli...", "Basmati Rice..."], []);
    const [typedText, setTypedText] = useState('');
    const typingTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIdx];
            let speed = 150;

            if (isDeleting) {
                setTypedText(currentWord.substring(0, charIdx - 1));
                charIdx--;
                speed = 100;
            } else {
                setTypedText(currentWord.substring(0, charIdx + 1));
                charIdx++;
            }

            if (!isDeleting && charIdx === currentWord.length) {
                isDeleting = true;
                speed = 2000; // Pause at end of word
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = 500; // Pause before typing next word
            }
            
            typingTimeoutRef.current = window.setTimeout(type, speed);
        };

        typingTimeoutRef.current = window.setTimeout(type, 500); // Initial delay

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [words]);

    // Background image cycling effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="relative h-screen text-white overflow-hidden">
            {/* Background Images Container with Crossfade */}
            {heroImages.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 bg-cover bg-center animate-ken-burns transition-opacity duration-[1500ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url('${src}')` }}
                    aria-hidden="true"
                    role="presentation"
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-lora leading-tight mb-2 sm:mb-3 animate-fade-in-up text-fade-bottom" style={{ animationDelay: '200ms' }}>From Farm to the World</h1>
                <p className="text-base sm:text-lg lg:text-xl font-light mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>Freshness Delivered Globally.</p>
                
                {/* Search Component Wrapper */}
                <div className="w-full max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <div
                        onClick={openModal}
                        role="button"
                        tabIndex={0}
                        aria-label="Open search"
                        className="relative w-full cursor-pointer"
                    >
                        <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-alt pointer-events-none">
                            {ICONS.search}
                        </span>
                        <div className="w-full text-left pl-11 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-3.5 rounded-full bg-white text-text-alt text-sm sm:text-base shadow-lg">
                           <span>
                                {typedText}
                                <span className="blinking-cursor"></span>
                           </span>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                    <Link to={PRODUCTS.length > 0 ? `/category/vegetables` : '/'} className="px-6 py-2.5 sm:px-8 sm:py-3 bg-primary text-white font-semibold rounded-full hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200">
                        Explore Products
                    </Link>
                    <a href="mailto:info@rudhraaexportsandimports.com" className="px-6 py-2.5 sm:px-8 sm:py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200">
                        Get a Quote
                    </a>
                </div>
            </div>
             {/* Social Links */}
            <div className="absolute top-1/2 -translate-y-1/2 left-8 z-10 hidden lg:flex flex-col items-center space-y-6">
                <span className="text-white/70 font-light tracking-[0.2em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    SOCIAL
                </span>
                <div className="h-16 w-px bg-white/30"></div>
                <div className="flex flex-col items-center space-y-4">
                    {SOCIAL_LINKS.map(link => (
                        <a 
                            key={link.name} 
                            href={link.path} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`Follow on ${link.name}`} 
                            className="relative group text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                        >
                            <span className="block w-6 h-6">{link.icon}</span>
                            <span className="tooltip-arrow-left absolute left-full top-1/2 -translate-y-1/2 ml-4 w-max bg-primary text-white text-xs rounded py-1 px-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none">
                                {`Follow on ${link.name}`}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Section: About Preview (Restored)
const AboutPreview: React.FC = () => {
    const [ref, isVisible] = useAnimateOnScroll(0.2);
    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}>
                        <p className="text-sm font-semibold tracking-widest text-text-alt uppercase">Welcome To Rudhraa Exports</p>
                        <h2 className="mt-2 text-3xl font-bold font-lora text-primary sm:text-4xl">Your Trusted Partner in Global Trade</h2>
                        <p className="mt-6 text-text-alt leading-relaxed">
                            Based in Karur, Tamil Nadu, Rudhraa Exports is a premier Indian exporter and importer, dedicated to delivering the freshest, highest-quality vegetables, fruits, and agricultural products to the global market. Our direct-from-farm sourcing ensures unparalleled freshness and supports local farming communities.
                        </p>
                        <Link 
                            to="/about" 
                            className="inline-flex items-center gap-2 mt-8 font-semibold text-primary group"
                        >
                            <span>Learn More About Us</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <span className="w-5 h-5 block">{ICONS.arrowRight}</span>
                            </span>
                        </Link>
                    </div>
                    <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                        <img 
                            className="w-full rounded-lg shadow-lg object-cover" 
                            src="https://rudhraaexportsandimports.com/images/rudhraa.png" 
                            alt="A collage of fresh produce from Rudhraa Exports" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Section: Stats (Redesigned and Corrected)
const AnimatedStat: React.FC<{ end: number; suffix?: string; isVisible: boolean; duration?: number }> = ({ end, suffix = '', isVisible, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isVisible && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const endValue = end;
            const range = endValue - start;
            let startTime: number | null = null;

            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                let currentVal = start + progress * range;

                if (endValue % 1 !== 0) {
                    setCount(parseFloat(currentVal.toFixed(1)));
                } else {
                    setCount(Math.floor(currentVal));
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isVisible, end, duration]);

    return (
        <span className="text-5xl font-bold font-lora text-text-main">
            {count}{suffix}
        </span>
    );
};

const StatsSection: React.FC = () => {
    const stats = [
        { value: 15, label: "Experience", suffix: "+", icon: STAT_ICONS.experience },
        { value: 50, label: "Happy Clients", suffix: "+", icon: STAT_ICONS.clients },
        { value: 10, label: "Countries", suffix: "+", icon: STAT_ICONS.countries },
        { value: 50, label: "Products", suffix: "+", icon: STAT_ICONS.products }
    ];
    const [ref, isVisible] = useAnimateOnScroll(0.4);

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-main">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className={`inline-block bg-accent text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 scroll-animate ${isVisible ? 'is-visible' : ''}`}>Stats</span>
                    <h2 className={`text-3xl lg:text-4xl font-bold font-lora text-text-main max-w-3xl mx-auto scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
                        Tailored solutions for your business requirements
                    </h2>
                </div>

                {/* Mobile layout (2x2 grid) */}
                <div className="grid grid-cols-2 gap-y-16 lg:hidden">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className={`flex flex-col items-center text-center scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                            <div className="w-20 h-20 bg-highlight rounded-full flex items-center justify-center text-accent border border-accent shadow-md p-4">
                                <img src={stat.icon} alt={`${stat.label} icon`} className="w-full h-full object-contain" />
                            </div>
                            <div className="mt-6">
                                <AnimatedStat end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                                <p className="text-text-alt mt-2">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop layout with perfectly aligned lines */}
                <div className="hidden lg:block relative max-w-5xl mx-auto">
                    {/* Layer 1: Content (Numbers and Labels), with padding at the top to make space for lines/icons */}
                    <div className="grid grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className={`pt-[120px] text-center scroll-animate ${isVisible ? 'is-visible' : ''}`}
                                style={{ transitionDelay: `${200 + index * 100}ms` }}
                            >
                                <AnimatedStat end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                                <p className="text-text-alt mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Layer 2: Decorative elements (Lines and Icons), positioned absolutely over the padded area */}
                    <div className="absolute top-0 left-0 w-full h-[120px]">
                        <div className="relative h-full w-full">
                            {/* Horizontal Line */}
                            <div className="absolute top-10 left-[12.5%] w-[75%] h-px bg-highlight"></div>

                            {/* Icons and Vertical Lines */}
                            <div className="absolute top-0 w-full h-full grid grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.label + '-icon'} className="relative flex justify-center">
                                        {/* Vertical Line */}
                                        <div className="absolute top-0 h-10 w-px bg-highlight"></div>
                                        {/* Icon (positioned to sit exactly on top of the line intersection) */}
                                        <div className="absolute top-10 -translate-y-1/2 w-20 h-20 bg-highlight rounded-full flex items-center justify-center text-accent z-10 border border-accent shadow-md p-4">
                                            <img src={stat.icon} alt={`${stat.label} icon`} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// Section: Product Highlights (Redesigned with Tabs)
const ProductHighlights: React.FC = () => {
    // Dynamically create tabs from CATEGORIES constant
    const tabs = useMemo(() => CATEGORIES.map(c => c.name), []);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [ref, isVisible] = useAnimateOnScroll(0.1);
    
    // Find the active category object to get its path for the "View All" link
    const activeCategoryInfo = useMemo(() => CATEGORIES.find(c => c.name === activeTab), [activeTab]);

    // Filter products based on the active tab, showing the first 4 as highlights
    const displayedProducts = useMemo(() => {
        if (!activeCategoryInfo) return [];
        const categorySlug = activeCategoryInfo.path.split('/').pop();
        return PRODUCTS.filter(p => p.category === categorySlug).slice(0, 4);
    }, [activeTab, activeCategoryInfo]);
    
    const [animationKey, setAnimationKey] = useState(0);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setAnimationKey(prev => prev + 1); // Change key to re-trigger animation
    };

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold font-lora text-text-main scroll-animate ${isVisible ? 'is-visible' : ''}`}>
                        Featured Products
                    </h2>
                    <p className={`max-w-3xl mx-auto mt-4 text-lg text-text-alt scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
                        Explore a curated selection of our finest products, sorted by category. Quality and freshness are guaranteed in every shipment.
                    </p>
                </div>

                {/* Tabs */}
                <div className={`flex justify-center flex-wrap gap-2 sm:gap-4 mb-12 scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transform ${
                                activeTab === tab
                                    ? 'bg-accent text-white shadow-md'
                                    : 'bg-white text-text-alt hover:bg-highlight hover:text-primary hover:-translate-y-px'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div
                    key={animationKey}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up"
                    style={{ animationDuration: '0.5s' }}
                >
                    {displayedProducts.map((product, index) => (
                        <Link
                            key={product.name}
                            to={`/category/${product.category}`}
                            className={`group block bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 scroll-animate ${isVisible ? 'is-visible' : ''}`}
                            style={{ transitionDelay: `${100 + index * 75}ms` }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.imageUrl}
                                    alt={`Showcasing fresh ${product.name} from Rudhraa Exports`}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-lg font-bold font-lora text-text-main truncate">{product.name}</h3>
                                <span className="mt-2 inline-block text-accent font-semibold group-hover:text-accent-hover transition-colors">
                                    View Product &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                 <div className={`text-center mt-16 scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                    <Link to={activeCategoryInfo?.path || '/'} className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200">
                        View All {activeTab}
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Component for individual timeline items to manage their own animation state
const TimelineItem: React.FC<{ feature: { title: string; icon: React.ReactElement; description: string }; index: number }> = ({ feature, index }) => {
    const [ref, isVisible] = useAnimateOnScroll(0.3);

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`relative scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
            {/* Icon on the line */}
            <div className="absolute top-0 left-6 md:left-1/2 transform -translate-x-1/2 bg-accent w-12 h-12 rounded-full flex items-center justify-center text-white z-10 shadow-md ring-8 ring-bg-main">
                <span className="w-6 h-6 block">{feature.icon}</span>
            </div>

            {/* Content Card */}
            <div className={`
                pl-20 md:pl-0 
                md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                items-center
            `}>
                {/* Spacer on desktop */}
                <div className="md:w-1/2"></div>

                <div className="md:w-1/2">
                    <div className={`
                        p-8 bg-white rounded-lg shadow-xl border border-highlight
                        ${index % 2 === 0 ? 'md:ml-10' : 'md:mr-10'}
                    `}>
                        <span className="font-bold text-accent text-sm">STEP 0{index + 1}</span>
                        <h3 className="text-xl font-semibold font-lora text-text-main mt-1 mb-2">{feature.title}</h3>
                        <p className="text-text-alt">{feature.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Section: Why Choose Us (Timeline)
const WhyChooseUs: React.FC = () => {
    const features: { title: string; icon: React.ReactElement<{ className?: string }>; description: string }[] = [
        { title: 'Sustainable Farming', icon: ICONS.farming, description: 'We partner with farms that practice sustainable and eco-friendly agriculture.' },
        { title: 'Certified Quality', icon: ICONS.quality, description: 'Adhering to strict international standards for quality and safety control.' },
        { title: 'Expert Handling & Packaging', icon: ICONS.packaging, description: 'State-of-the-art packaging to preserve freshness from farm to destination.' },
        { title: 'Timely Global Delivery', icon: ICONS.deliveryTruck, description: 'Our robust logistics network ensures your shipment arrives on time, every time.' },
    ];
    const [sectionRef, isSectionVisible] = useAnimateOnScroll(0.1);

    return (
         <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-main bg-dot-pattern">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl font-bold font-lora text-text-main scroll-animate ${isSectionVisible ? 'is-visible' : ''}`}>Our Process of Excellence</h2>
                    <p className={`mt-4 text-lg text-text-alt scroll-animate ${isSectionVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>A step-by-step look at what sets us apart.</p>
                </div>

                <div className="relative max-w-2xl lg:max-w-4xl mx-auto">
                    {/* Vertical line with scale animation */}
                    <div className={`absolute top-0 h-full w-0.5 bg-highlight left-6 md:left-1/2 md:-translate-x-1/2 transition-transform duration-1000 ease-out ${isSectionVisible ? 'scale-y-100' : 'scale-y-0'}`} style={{ transformOrigin: 'top' }}></div>
                    
                    <div className="space-y-24">
                        {features.map((feature, index) => (
                           <TimelineItem key={feature.title} feature={feature} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Section: Partnership (Redesigned Call to Action)
const PartnershipSection: React.FC = () => {
    const [ref, isVisible] = useAnimateOnScroll(0.3);

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    
                    {/* Left side: Text Content */}
                    <div className="relative z-10">
                        <div className={`relative bg-white p-8 lg:p-12 border border-highlight shadow-lg lg:-mr-16 slide-in-left ${isVisible ? 'is-visible' : ''}`}>
                            {/* Decorative background text */}
                            <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
                                <span className="text-[100px] lg:text-[120px] font-extrabold text-gray-100 opacity-50 select-none">
                                    GLOBAL
                                </span>
                            </div>

                            <div className="relative">
                                <p className="text-sm font-semibold tracking-widest text-text-alt uppercase">Let's Work Together</p>
                                <h2 className="mt-2 text-3xl font-bold font-lora text-primary sm:text-4xl">Ready to Partner with a Global Leader?</h2>
                                <p className="mt-6 text-text-alt leading-relaxed">
                                    Contact us today for a competitive quote and discover the Rudhraa Exports difference. We are ready to meet your needs for high-quality Indian produce with reliability and excellence.
                                </p>
                                <Link 
                                    to="/contact" 
                                    className="inline-flex items-center gap-2 mt-8 font-semibold text-primary group"
                                >
                                    <span>CONTACT US NOW</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                      <span className="w-5 h-5 block">{ICONS.arrowRight}</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side: Image with decorative blocks */}
                    <div className="mt-10 lg:mt-0 relative" aria-hidden="true">
                        <div className={`relative slide-in-right ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                             {/* Decorative Gray Block */}
                            <div className="absolute -top-4 -right-4 w-full h-full bg-gray-200 rounded-lg transform lg:translate-x-4 lg:translate-y-4"></div>
                            
                            {/* Main Image */}
                            <div className="relative">
                                <img 
                                    className="w-full rounded-lg shadow-lg object-cover" 
                                    src="https://rudhraaexportsandimports.com/images/hands.jpg" 
                                    alt="Two hands clasped in a firm handshake, symbolizing a strong partnership with Rudhraa Exports" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Section: Certifications Marquee
const CertificatesMarquee: React.FC = () => {
    const certificates = [
        'https://rudhraaexportsandimports.com/images/Spices.png',
        'https://rudhraaexportsandimports.com/images/apeda.png',
        'https://rudhraaexportsandimports.com/images/coir.png',
        'https://rudhraaexportsandimports.com/images/fieo.png',
        'https://rudhraaexportsandimports.com/images/msme.png',
        'https://rudhraaexportsandimports.com/images/fssai.png',
        'https://rudhraaexportsandimports.com/images/coco.png'
    ];
    // Duplicate the array multiple times to ensure it's wider than the screen for a seamless loop
    const marqueeItems = [...certificates, ...certificates, ...certificates, ...certificates];
    const [ref, isVisible] = useAnimateOnScroll(0.1);

    const formatCertName = (url: string) => {
        const name = url.split('/').pop()?.split('.')[0] || 'certification';
        return name.toUpperCase().replace(/[-_]/g, ' ');
    };

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold font-lora text-text-main scroll-animate ${isVisible ? 'is-visible' : ''}`}>Our Certifications</h2>
                    <p className={`mt-4 text-lg text-text-alt scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
                        Recognized by leading authorities for quality and compliance.
                    </p>
                </div>
                <div className="relative w-full overflow-hidden group">
                    <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
                        {marqueeItems.map((cert, index) => (
                            <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center">
                                <img src={cert} alt={`${formatCertName(cert)} Certification Logo`} className="h-20 w-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// Section: Testimonials
const TestimonialsSection: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [ref, isVisible] = useAnimateOnScroll();

    const next = () => setCurrent(current === TESTIMONIALS.length - 1 ? 0 : current + 1);
    const prev = () => setCurrent(current === 0 ? TESTIMONIALS.length - 1 : current - 1);

    useEffect(() => {
        const slideInterval = setInterval(next, 5000);
        return () => clearInterval(slideInterval);
    }, [current]);

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-greek-key-pattern">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold font-lora text-text-main scroll-animate ${isVisible ? 'is-visible' : ''}`}>What Our Partners Say</h2>
                    <p className={`mt-4 text-lg text-text-alt scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>Building trust and long-lasting relationships across the globe.</p>
                </div>
                <div className={`relative max-w-3xl mx-auto scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                    <div className="absolute -top-8 -left-8 text-highlight/30 -z-10">
                         <span className="w-32 h-32 block">{ICONS.quote}</span>
                    </div>
                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                            {TESTIMONIALS.map((testimonial: Testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-full px-4">
                                    <div className="text-center">
                                        <p className="text-xl italic text-text-alt leading-relaxed">"{testimonial.quote}"</p>
                                        <div className="mt-6">
                                            <p className="font-bold text-text-main">{testimonial.author}</p>
                                            <p className="text-sm text-text-alt">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={prev} aria-label="Previous testimonial" className="absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-full bg-bg-alt hover:bg-highlight transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={next} aria-label="Next testimonial" className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full bg-bg-alt hover:bg-highlight transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
    return (
        <>
            <MetaTags 
                title="Rudhraa Exports | Exporter & Importer of Vegetables & Fruits | Karur, India"
                description="Rudhraa Exports, a premier exporter and importer from Karur, Tamil Nadu, India, specializes in high-quality fresh vegetables, fruits, spices, and grains for the global market."
                imageUrl="https://rudhraaexportsandimports.com/images/p1.jpeg"
            />
            <HeroSection />
            <AboutPreview />
            <StatsSection />
            <ProductHighlights />
            <WhyChooseUs />
            <PartnershipSection />
            <CertificatesMarquee />
            <TestimonialsSection />
        </>
    );
};

export default HomePage;