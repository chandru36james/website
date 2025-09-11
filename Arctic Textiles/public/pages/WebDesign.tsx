import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';
import { Helmet } from "react-helmet";   // ✅ for seo
import banner from '@/assets/web-banner.png'
import Data_trust from '@/assets/data.png'
import Arctic from '@/assets/arctic_home.png'
import BloomGreen from '@/assets/bloomgreen_home.png'

import Gallery from '@/components/slider';
import ProjectCarousel from '@/components/Carousel';


const FadeInSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useFadeIn();
    return <div ref={ref} className={`fade-in ${className}`}>{children}</div>;
};

const StatHighlight: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-brand-light-gray p-6 rounded-lg border border-zinc-200 text-center transition-all hover:shadow-lg hover:scale-105">
        <p className="text-4xl lg:text-5xl font-bold text-brand-black">{value}</p>
        <p className="text-zinc-600 mt-2">{label}</p>
    </div>
);

const AnimatedBarChart: React.FC<{data: {label: string, value: number, color: string}[]}> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const maxValue = Math.max(...data.map(d => d.value));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target!);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
    
    return (
        <div ref={ref} className={`fade-in ${isVisible ? 'visible' : ''} bg-brand-light-gray p-6 rounded-lg border border-zinc-200 w-full h-80 flex justify-around items-end gap-4`}>
            {data.map(item => (
                 <div key={item.label} className="h-full flex-1 flex flex-col justify-end items-center gap-2">
                    <Helmet>
  <title>Web Design Services | Custom Websites by VGot You</title>
  <meta 
    name="description" 
    content="VGot You provides responsive, SEO-friendly, and custom web design services to help businesses build their online presence." 
  />
  <meta 
    name="keywords" 
    content="web design, responsive websites, custom web development, UI UX design, SEO-friendly sites, VGot You" 
  />
  <link rel="canonical" href="https://www.vgotyou.com/web-design" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Web Design Services | VGot You" />
  <meta property="og:description" content="Modern and responsive web design services to grow your brand." />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.jpg" />
  <meta property="og:url" content="https://www.vgotyou.com/web-design" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design Services | VGot You" />
  <meta name="twitter:description" content="Custom websites designed for performance, SEO, and user experience." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.jpg" />

  {/* Schema.org */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Design",
      "provider": {
        "@type": "Person",
        "name": "VGot You"
      },
      "url": "https://www.vgotyou.com/web-design",
      "description": "Custom and responsive web design services by VGot You."
    }
    `}
  </script>
</Helmet>

                    <div 
                        className="w-full rounded-t-md transition-all duration-1000 ease-out"
                        style={{ height: isVisible ? `${(item.value / maxValue) * 100}%` : '0%', backgroundColor: item.color }}
                    ></div>
                    <p className="text-xs text-zinc-600 text-center font-medium">{item.label}</p>
                </div>
            ))}
        </div>
    );
};

const WebDesign: React.FC = () => {
    const techStack = ["React", "TypeScript", "Next.js", "Figma" , "HTML", "CSS", "Shopify"];
    const chartData = [
        { label: "Old Site Conversion", value: 1.5, color: '#d4d4d8' }, // zinc-300
        { label: "New Site Conversion", value: 2.4, color: '#18181b' }, // brand-black
        { label: "Old Site Page Speed", value: 1.2, color: '#d4d4d8' },
        { label: "New Site Page Speed", value: 4.1, color: '#18181b' }
    ];

    return (
        <div className="bg-brand-white text-brand-black">
            {/* Hero Section */}
            <section className="h-[60vh] w-full relative flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${banner})`  }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Data-Driven Web Design</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">From sleek landing pages to complex enterprise platforms, we build digital experiences that drive measurable results.</p>
                </div>
            </section>
            
            <div className="container mx-auto py-20 px-6">
                
                {/* E-commerce Section */}
                <FadeInSection className="max-w-6xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <span className="text-zinc-500 font-semibold tracking-widest uppercase">E-commerce Platforms</span>
                        <h2 className="text-4xl font-bold my-2">Turn Clicks into Customers.</h2>
                        <p className="text-zinc-700 text-lg max-w-3xl mx-auto">
                            A slow, clunky site doesn't just frustrate users; it actively costs you sales. We build lightning-fast, intuitive e-commerce experiences that guide users seamlessly from browsing to buying, drastically reducing cart abandonment and boosting your bottom line.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <StatHighlight value="+60%" label="Increase in Conversion Rate" />
                        <StatHighlight value="2.5x" label="Faster Page Load Times" />
                        <StatHighlight value="-45%" label="Reduction in Cart Abandonment" />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                         <div>
                            <h3 className="text-2xl font-bold mb-4">The Results Speak for Themselves</h3>
                            <p className="text-zinc-600 mb-6">By overhauling our clients' platforms with modern, performance-focused technology, we achieve significant uplifts in key e-commerce metrics. The chart illustrates a typical client's improvement in conversion rate and page load speed (in seconds) after our intervention.</p>
                             <ul className="space-y-3 text-zinc-700">
                                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Optimized, multi-step checkout flows.</li>
                                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Seamless integration with payment gateways.</li>
                                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Mobile-first design for shopping on the go.</li>
                             </ul>
                         </div>
                        <AnimatedBarChart data={chartData} />
                    </div>
                </FadeInSection>

                {/* B2B Section */}
                <FadeInSection className="max-w-6xl mx-auto mb-24 bg-brand-light-gray py-20 px-6 rounded-lg">
                     <div className="text-center mb-12">
                        <span className="text-zinc-500 font-semibold tracking-widest uppercase">B2B Corporate Sites</span>
                        <h2 className="text-4xl font-bold my-2">Your Digital Headquarters.</h2>
                        <p className="text-zinc-700 text-lg max-w-3xl mx-auto">
                            In the B2B world, your website is your primary tool for building credibility and generating leads. We create professional, polished, and information-rich websites that establish you as an industry authority and function as a powerful, 24/7 lead generation engine.
                        </p>
                    </div>
                     <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <StatHighlight value="+150%" label="Increase in Qualified Leads" />
                        <StatHighlight value="-50%" label="Lower Bounce Rate" />
                        <StatHighlight value="+75%" label="Increase in Session Duration" />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="group rounded-lg overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-shadow">
                            <img src={Data_trust} alt="B2B Website UI" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Engineered for Trust and Growth</h3>
                            <p className="text-zinc-600 mb-6">These impressive results are not accidental; they are the direct outcome of a meticulous development process focused on tangible business outcomes. We engineer trust and drive growth by focusing on:</p>
                             <ul className="space-y-4 text-zinc-700">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <div>
                                        <strong className="block">Clear Value Propositions:</strong>
                                        We ensure your unique selling points are communicated with absolute clarity on every page. This immediately builds credibility, answers visitor questions, and significantly reduces bounce rates.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <div>
                                        <strong className="block">Targeted SEO Optimization:</strong>
                                        From site architecture to content strategy, we build a robust SEO foundation. This attracts high-quality organic traffic, resulting in a dramatic, measurable increase in qualified business leads.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <div>
                                        <strong className="block">Resource Center Integration:</strong>
                                        By building an integrated knowledge hub with case studies, white papers, and articles, we increase user session duration, position you as an industry thought leader, and nurture leads through the sales funnel.
                                    </div>
                                </li>
                             </ul>
                         </div>
                    </div>
                </FadeInSection>
                
                {/* Landing Pages & Portfolios Section */}
                <FadeInSection className="text-center mb-24">
                     <h2 className="text-4xl font-bold mb-12">Focused & Creative Pages</h2>
                     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-lg border border-zinc-200 text-left hover:shadow-2xl transition-shadow">
                            <h3 className="text-2xl font-bold mb-2">High-Converting Landing Pages</h3>
                            <p className="text-zinc-600 mb-4">We design laser-focused landing pages with a single objective: to convert visitors into leads or customers. Ideal for marketing campaigns and product launches, our pages have achieved up to a <span className="font-bold text-brand-black">300% increase in lead capture</span> for our clients.</p>
                            <img src={BloomGreen} alt="Landing Page" className="rounded-md shadow-md" />
                        </div>
                         <div className="bg-white p-8 rounded-lg border border-zinc-200 text-left hover:shadow-2xl transition-shadow">
                            <h3 className="text-2xl font-bold mb-2">Stunning Portfolio Sites</h3>
                            <p className="text-zinc-600 mb-4">Your work deserves a beautiful stage. We build visually-driven, elegant portfolio sites that tell your story and let your talent shine. Our clients report a <span className="font-bold text-brand-black">significant increase in freelance inquiries</span> after launching their new portfolio.</p>
                             <img src={Arctic} alt="Portfolio Site" className="rounded-md shadow-md" />
                        </div>
                     </div>
                </FadeInSection>
    

 {/* Project Showcase Carousel */}
        <ProjectCarousel />


                <FadeInSection className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Our Technology Stack</h2>
                    <p className="text-zinc-600 text-center max-w-2xl mx-auto mb-8">We use a modern, robust technology stack to ensure your website is fast, secure, and scalable.</p>
                    <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
                        {techStack.map(tech => (
                            <span key={tech} className="bg-brand-light-gray border border-zinc-200 text-zinc-700 py-2 px-4 rounded-full">{tech}</span>
                        ))}
                    </div>
                </FadeInSection>
                
                <div className="text-center mt-20">
                    <Link to="/contact" className="bg-brand-black text-white font-semibold py-3 px-12 rounded-full text-lg hover:bg-zinc-700 transition-all transform hover:scale-105">
                        Start Your Web Project
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WebDesign;