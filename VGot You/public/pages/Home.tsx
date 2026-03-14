import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CarouselManual from '../components/CarouselManual';
import { ServicesBento } from '../components/ServicesBento';
import { HeroSection } from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import CtaSection from '../components/CtaSection';
import FadeInSection from '../components/FadeInSection';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import { Helmet } from "react-helmet";

const PortfolioCard = ({ 
    to, 
    image, 
    title, 
    subtitle 
}: { 
    to: string, 
    image: string, 
    title: string, 
    subtitle: string 
}) => {
    const divRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <Link
            ref={divRef}
            to={to}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white w-full aspect-video shadow-md"
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.08), transparent 40%)`,
                }}
            />

            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {title}
                </h3>
                 <p className="text-gray-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {subtitle}
                </p>
            </div>

            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-gray-300 transition-colors z-30 pointer-events-none" />
        </Link>
    );
};

const Home: React.FC = () => {
    return (
        <div className="bg-white text-gray-900 transition-colors duration-300">

            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>VGot You – Web Design, Branding & SEO Company in Karur, Tamil Nadu</title>

  <meta
    name="description"
    content="VGot You is a leading web design, branding, and SEO company in Karur, India, delivering high-performance websites, logo design, and digital growth solutions for businesses worldwide."
  />

  <meta
    name="keywords"
    content="web design company in Karur, branding agency India, logo design services, SEO company, UI UX design studio, website development, digital marketing agency, web design Tamil Nadu, global web design services"
  />

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="VGot You – Web Design, Branding & SEO Company in India" />
  <meta
    property="og:description"
    content="Professional web design, branding, and SEO services by VGot You. Based in Karur, Tamil Nadu, serving clients across India and worldwide."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta property="og:url" content="https://www.vgotyou.com/" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="VGot You – Web Design, Branding & SEO Company" />
  <meta
    name="twitter:description"
    content="High-conversion websites, branding, and SEO services for business growth by VGot You."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />

  {/* ================= ORGANIZATION SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.vgotyou.com/#organization",
      name: "VGot You",
      url: "https://www.vgotyou.com/",
      logo: "https://www.vgotyou.com/assets/logo.png",
      sameAs: [
        "https://www.linkedin.com/in/vgotyou/",
  "https://www.instagram.com/vgot_you/",
  "https://vgotyou.medium.com/",
  "https://vgotyou.sulekha.com",
  "https://clutch.co/profile/vgot-you",
  "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode"
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karur",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      },
      description:
        "VGot You is a web design, branding, and SEO company in Karur, India, serving startups and businesses worldwide."
    })}
  </script>

  {/* ================= WEBSITE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.vgotyou.com/#website",
      url: "https://www.vgotyou.com/",
      name: "VGot You",
      publisher: {
        "@id": "https://www.vgotyou.com/#organization"
      }
    })}
  </script>
</Helmet>


            <HeroSection />
            <AboutSection />

            {/* PROJECTS */}
            <section id="project" className="relative py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <CarouselManual />
                </div>
            </section>
            
            <ServicesBento />
            <ProcessSection />

            {/* FEATURED WORK */}
            <FadeInSection
                id="portfolio"
                className="relative bg-white py-20 px-4 overflow-hidden flex flex-col items-center justify-center"
            >
                <div className="container mx-auto text-center max-w-6xl relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">
                        Featured Work
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        <PortfolioCard 
                            to="/web-design" 
                            image={"https://www.vgotyou.com/assets/web-designer.png"} 
                            title="Web Design" 
                            subtitle="Crafting immersive digital experiences." 
                        />

                        <PortfolioCard 
                            to="/logo-showcase" 
                            image={"https://www.vgotyou.com/assets/logo-designer.png"} 
                            title="Logo Showcase" 
                            subtitle="Building memorable brand identities." 
                        />
                    </div>
                </div>
            </FadeInSection>

            <Pricing />
            <Testimonials />

        </div>
    );
};

export default Home;
