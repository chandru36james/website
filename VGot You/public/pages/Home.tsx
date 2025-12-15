import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import Clarity from '@microsoft/clarity';

import { useFadeIn } from '../hooks/useFadeIn';
import Preloader from '../components/Preloader';
import { Helmet } from "react-helmet";

import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesBento } from '../components/ServicesBento';
import Pricing from '../components/Pricing';
import CtaSection from '../components/CtaSection';
import ProcessSection from '../components/ProcessSection';
import CarouselManual from '../components/CarouselManual';
import Testimonials from '../components/Testimonials';

const serviceVariants = {
  left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
};

const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // delay between each child
    },
  },
};

// Make sure to add your actual project id instead of "yourProjectId".
const projectId = "tiybrh7g7z"

Clarity.init(projectId);
Clarity.identify("custom-id", "custom-session-id", "custom-page-id", "friendly-name"); // only custom-id is required
Clarity.setTag("key", "value");
Clarity.event("custom-event");
Clarity.consent(); // default value is set to true
Clarity.consent(false);
Clarity.upgrade("reason");

const stepVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};


const FadeInSection: React.FC<{children: React.ReactNode, className?: string, id?: string}> = ({ children, className, id }) => {
    const ref = useFadeIn();
    return <section id={id} ref={ref} className={`fade-in py-20 px-6 ${className}`}>{children}</section>;
};

const TestimonialCard: React.FC<{testimonial: { name: string; text: string; avatar: string; }, index: number}> = ({ testimonial, index }) => {
    const ref = useFadeIn();
    return (
        <div 
            ref={ref}
            className="fade-in bg-brand-light-gray p-8 rounded-lg border border-zinc-200 text-left flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <Helmet>{/* Basic SEO */}
  <title>VGot You | Web & Logo Design Studio</title>
  <meta name="description" content="VGot You is a global creative studio specializing in web design, website development, logo design, branding, and UI/UX solutions. We craft modern, responsive, and SEO-friendly digital experiences that help businesses worldwide grow and stand out online." />

 <meta name="keywords" content="VGot You, professional web design, creative website development, responsive websites, custom web solutions, e-commerce website design, logo design services,freelance web designer,web designer near me,web designer skills,seo studio tools,seo services,seo optimizer,logo designer near me,seo free audit, brand identity design, UI UX design agency, user experience design, digital branding solutions, portfolio showcase, creative studio, modern website design, startup branding, business website development, SEO-friendly websites, mobile-first web design, creative graphic design, Chandru designer, VSB College Karur alumni, Karur web designer, Tamil Nadu branding expert, India web development company, best web design in Karur, affordable website design Tamil Nadu" />

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.vgotyou.com/" />
  <meta property="og:title" content="VGot You | Web & Logo Design Studio" />
  <meta property="og:description" content="We help brands build a strong digital presence through creative website design and professional logo design services." />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.jpg" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.vgotyou.com/" />
  <meta name="twitter:title" content="VGot You | Web & Logo Design Studio" />
  <meta name="twitter:description" content="Creative web design and logo design services to elevate your brand." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.jpg" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://www.vgotyou.com/" />

  {/* Favicon */}
  <link rel="icon" href="/assets/VGotYou.png" type="image/png" />
  
  </Helmet>
  
            <svg className="w-10 h-10 text-zinc-300 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <p className="text-zinc-700 italic mb-6 flex-grow">
                 "{testimonial.text.startsWith('VGotYou') ? 
                    <><span className="font-cambria not-italic">VGot You</span>{testimonial.text.substring(7)}</> : 
                    testimonial.text
                }"
            </p>
            <div className="flex items-center mt-auto pt-4 border-t border-zinc-200">
                <img src={testimonial.avatar} alt={testimonial.name.split(',')[0]} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                    <p className="font-bold text-brand-black">{testimonial.name.split(',')[0]}</p>
                    <p className="text-sm text-zinc-500">{testimonial.name.split(',')[1]}</p>
                </div>
            </div>
        </div>
    );
};

const Sparkle: React.FC<{className: string, style?: React.CSSProperties}> = ({className, style}) => (
    <div className={`absolute sparkle ${className}`} style={style}>
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.226 38.774L100 50L61.226 61.226L50 100L38.774 61.226L0 50L38.774 38.774L50 0Z" fill="white"/>
        </svg>
    </div>
);

const Home: React.FC = () => {
    const [showPreloader, setShowPreloader] = useState(true);
    const [page, setPage] = useState('WebDesign.tsx');

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisitedHome');
        if (hasVisited) {
            setShowPreloader(false);
            return;
        }

        sessionStorage.setItem('hasVisitedHome', 'true');
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 2000); // Preloader duration

        return () => clearTimeout(timer);
    }, []);

    const processSteps = [
        {
            title: 'Discovery',
            description: 'We start by understanding your vision, goals, and audience to lay a solid foundation for the project.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        },
        {
            title: 'Planning',
            description: 'A comprehensive strategy and project roadmap are crafted, defining milestones and technical specifications.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-" /></svg>
        },
        {
            title: 'Design',
            description: 'We create intuitive UI/UX designs and high-fidelity mockups that bring your brand identity to life visually.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
        },
        {
            title: 'Development',
            description: 'Our team writes clean, efficient, and scalable code, turning the approved designs into a functional product.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        },
        {
            title: 'Delivery',
            description: 'After rigorous testing, we deploy the project and hand over all assets, ensuring a smooth launch.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        }
    ];

     const testimonials = [
        { name: "Venkat Krishnan, Director Of Rudhraa Exports", text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled.", avatar: "https://www.vgotyou.com/assets/venkat.png"  },
        { name: "Santhosh, Founder Of Arctic Textiles", text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments!", avatar:"https://vgotyou.com/assets/santhosh.png"},
        { name: "Aravind Kumar, Manager Of Bloom Green Developers", text: "An incredibly professional and efficient team. They delivered our complex B2B site on time and exceeded expectations.", avatar: "https://www.vgotyou.com/assets/aravind.png" },
        { name: "Sathish Kumar, Travel Coordinator at Akshaya Tours and Travels",text: "Our new website by Vgotyou has improved our enquiries and credibility. A highly professional team that understands business needs.",avatar: "https://www.vgotyou.com/assets/default-profile.png"}

    ];

    return (
        <>
            <Preloader isVisible={showPreloader} />
            <div className="bg-brand-black text-brand-black">
              {/* Hero Section */}
            <HeroSection />

              {/* About Section - Optimized for Mobile/Tablet */}
            <AboutSection setPage={setPage} />

           
               {/* Services Section (Using ServicesBento as requested) */}
            <ServicesBento />
                

 {/* Process Section */}
            <ProcessSection />
                
                
               
                
                
          

                {/* Portfolio Preview */}
                <FadeInSection id="portfolio" className="bg-brand-light-gray py-8 md:py-8">{/* Reduced vertical padding */}
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-1">Featured Work</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link to="/web-design" className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                                <img src="https://www.vgotyou.com/assets/web-designer.png" alt="Web Design Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-all flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white">Web Design</h3>
                                </div>
                            </Link>
                            <Link to="/logo-showcase" className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                                <img src="https://www.vgotyou.com/assets/logo-designer.png" alt="Logo Design Showcase" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-all flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white">Logo Showcase</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </FadeInSection>
                {/* Modern Angled Wave Divider */}
<div className="w-full overflow-hidden leading-none">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-16"
  >
    <path
      d="M0,320 L80,300 C160,280 320,240 480,250 C640,260 800,300 960,290 C1120,280 1280,220 1360,190 L1440,160 L1440,0 L0,0Z"
      fill="#f4f4f5"  // 👈 Match the background of your next section
    />
  </svg>
</div>


          <section id="manuall">
  <div className="mt-12">
    <CarouselManual />
  </div>
</section>

                {/* Pricing Section */}
            <Pricing />
                {/* CTA / Hero-like Section */}
            <CtaSection setPage={setPage}/>

                 {/* Testimonials */}
            <Testimonials />
            </div>
        </>
    );
};

export default Home;