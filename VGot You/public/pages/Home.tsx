import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import Clarity from '@microsoft/clarity';

import { useFadeIn } from '../hooks/useFadeIn';
import Preloader from '../components/Preloader';
import { Helmet } from "react-helmet";

import bgVideo from '@/assets/2.mp4';
import abt1 from '@/assets/abt1.png';
import abt2 from '@/assets/abt2.png';
import logo_design from '@/assets/logo-designer.png';
import web_design from '@/assets/web-designer.png';
import avatar1 from '@/assets/venkat.png';
import avatar2 from '@/assets/santhosh.png';
import avatar3 from '@/assets/aravind.png';
import bg from '@/assets/bg.png';

import Button from '../components/ui/Button';
import CarouselManual from '../components/CarouselManual';

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
        { name: "Venkat Krishnan, Director Of Rudhraa Exports", text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled.", avatar: avatar1 },
        { name: "Santhosh, Founder Of Arctic Textiles", text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments!", avatar: avatar2 },
        { name: "Aravind Kumar, Manager Of Bloom Green Developers", text: "An incredibly professional and efficient team. They delivered our complex B2B site on time and exceeded expectations.", avatar: avatar3 }
    ];

    return (
        <>
            <Preloader isVisible={showPreloader} />
            <div className="bg-brand-white text-brand-black">
                {/* Hero Section */}
                <section className="h-[100dvh] md:h-screen w-full relative flex items-center justify-center text-center text-white overflow-hidden">
  <style>
    {`
      @keyframes fade-in-down {
        0% { opacity: 0; transform: translateY(-40px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(40px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-in-down {
        animation: fade-in-down 1.2s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fade-in-up 1.2s ease-out forwards;
      }

      /* Custom staggered delays */
      .delay-1000 { animation-delay: 1s; }
      .delay-2000 { animation-delay: 2s; }
      .delay-3000 { animation-delay: 3s; }
      .delay-4000 { animation-delay: 4s; }
    `}
  </style>

  {/* ✅ Background video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={bgVideo} type="video/mp4" />
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 px-4">
    <h2 className="text-5xl md:text-7xl font-bold mb-4 font-cambria opacity-0 animate-fade-in-down delay-1000">
      VGot You
    </h2>
    <h1 className="text-3xl md:text-5xl font-light mb-2 opacity-0 animate-fade-in-up delay-2000">
      Crafting Code & Creative Identities
    </h1>
    <p className="text-xl md:text-2xl text-gray-300 mb-8 opacity-0 animate-fade-in-up delay-3000">
      Web Development • Logo Design
    </p>
    <ScrollLink
  to="manuall"  
  className="relative inline-block overflow-hidden rounded-full border border-brand-black 
             text-white font-semibold py-3 px-8 text-lg transition-all duration-300 
             opacity-0 animate-fade-in-up delay-4000 group"
>
  <span className="relative z-10">
    View our Work
  </span>

  {/* Gradient sliding background */}
  <span
    className="absolute inset-0 bg-gradient-to-r from-brand-black via-gray-800 to-brand-black 
               translate-x-[-100%] group-hover:translate-x-0 
               transition-transform duration-500 ease-out"
  />

  {/* Glow effect on hover */}
  <span
    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
               transition-opacity duration-500 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
  />
</ScrollLink>

  </div>
</section>


                



                {/* About Section */}
                <FadeInSection className="container mx-auto">
                    <div className="grid lg:grid-cols-5 gap-16 items-center">
                        <div className="lg:col-span-3 text-left">
                            <span className="text-zinc-500 font-semibold tracking-widest uppercase">Who Am I</span>
                            <h2 className="text-4xl font-bold my-4">Designing the Future, Today.</h2>
                            <p className="text-zinc-700 mb-6 text-lg">
                                I'm a passionate team of developers and designers dedicated to building exceptional digital experiences. I believe in the power of combining clean code with aesthetic design to create products that not only look good but also perform flawlessly. Your vision is our blueprint.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-brand-light-gray p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Pixel-Perfect Design</h3>
                                        <p className="text-zinc-600 text-sm">Creating visually stunning and intuitive interfaces that users love.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                <div className="bg-brand-light-gray p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Scalable Development</h3>
                                        <p className="text-zinc-600 text-sm">Building robust backends and clean code that grows with your business.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-start">
  <Link
    to="/chandru"
    className="bg-brand-black text-white font-semibold py-3 px-8 rounded-full hover:bg-zinc-700 transition-colors inline-block md:ml-80"
  >
    Learn More About Me
  </Link>
</div>

                        </div>
                        <div className="lg:col-span-2 hidden lg:grid grid-cols-2 gap-6 items-center h-[450px]">
                            <img src={abt1} alt="Web design brainstorming session" className="rounded-lg shadow-xl w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                            <img src={abt2} alt="Creative process 2" className="rounded-lg shadow-xl w-full h-full object-cover transition-transform hover:scale-105 duration-500 mt-20" />
                        </div>
                    </div>
                </FadeInSection>
                {/* Modern Angled Wave Divider Flipped */}
<div className="w-full overflow-hidden leading-none -rotate-180">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-16"
  >
    <path
      d="M0,320 L80,300 C160,280 320,240 480,250 C640,260 800,300 960,290 C1120,280 1280,220 1360,190 L1440,160 L1440,0 L0,0Z"
      fill="#f4f4f5"  // 👈 match this to next section bg
    />
  </svg>
</div>

               


                {/* Services Section */}
{/* Services Section */}
<FadeInSection id="services" className="bg-brand-light-gray py-8 md:py-12">
  <div className="container mx-auto text-center px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Our Services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">

      <motion.div
        className="bg-brand-white p-6 sm:p-8 rounded-lg border border-zinc-200 hover:border-brand-black hover:shadow-xl transition-all"
        variants={serviceVariants.left}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Web Development</h3>
        <p className="text-zinc-600 text-sm sm:text-base">Complex e-commerce platforms and B2B sites, built to perform and scale.</p>
      </motion.div>

      <motion.div
        className="bg-brand-white p-6 sm:p-8 rounded-lg border border-zinc-200 hover:border-brand-black hover:shadow-xl transition-all"
        variants={serviceVariants.right}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Logo Design</h3>
        <p className="text-zinc-600 text-sm sm:text-base">Unique and memorable logos that form the cornerstone of your brand identity.</p>
      </motion.div>

      <motion.div
        className="bg-brand-white p-6 sm:p-8 rounded-lg border border-zinc-200 hover:border-brand-black hover:shadow-xl transition-all"
        variants={serviceVariants.up}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Landing Pages</h3>
        <p className="text-zinc-600 text-sm sm:text-base">High-converting landing pages designed to capture leads and drive sales.</p>
      </motion.div>

      <motion.div
        className="bg-brand-white p-6 sm:p-8 rounded-lg border border-zinc-200 hover:border-brand-black hover:shadow-xl transition-all"
        variants={serviceVariants.scale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Portfolio Sites</h3>
        <p className="text-zinc-600 text-sm sm:text-base">Stunning, professional portfolios to showcase your creative work and skills.</p>
      </motion.div>

    </div>
  </div>
</FadeInSection>


                {/* Call to Action / Hero-like Section */}
<FadeInSection
id= "profile"
  className="relative h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden"
>
  {/* ✅ Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${bg})` }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl px-6 animate-fade-in-up">
    <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
      Let’s Build Something Amazing
    </h2>
    <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
      From stunning websites to unique brand identities, I transform your ideas into reality.
      Collaborate with us to craft digital experiences that truly inspire.
    </p>

    <Button to="/contact" />


  </div>

  {/* Sparkles */}
  <Sparkle className="top-[20%] left-[15%]" style={{ animationDelay: '0.3s' }} />
  <Sparkle className="bottom-[25%] right-[20%]" style={{ animationDelay: '0.8s' }} />
{/* 👇 Curved Divider flows into next section */}
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="block w-full h-40"
    >
      <path
        d="M0,224 C480,320 960,128 1440,224 L1440,320 L0,320Z"
        fill="#ffffff" // 👈 match your next section background
      />
    </svg>
  </div>
  
</FadeInSection>

                
                <FadeInSection>
  <motion.div
    className="container mx-auto text-center"
    variants={timelineVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <h2 className="text-4xl font-bold mb-16">Our Proven Process</h2>
    <div className="relative">
      <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-zinc-200 -translate-x-1/2"></div>

      {processSteps.map((step, index) => (
        <motion.div
          key={index}
          className="mb-8 flex justify-between items-center w-full"
          style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
          variants={stepVariants}
        >
          <div className="hidden md:block w-5/12"></div>
          <div className="z-20 flex items-center bg-brand-black text-white w-16 h-16 rounded-full shadow-lg justify-center">
            {step.icon}
          </div>
          <div className="bg-brand-light-gray border border-zinc-200 rounded-lg shadow-lg w-full md:w-5/12 px-6 py-4 text-left">
            <h3 className="font-bold text-xl mb-1">{index + 1}. {step.title}</h3>
            <p className="text-zinc-600 text-sm leading-snug">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</FadeInSection>
                
                 {/* Modern Angled Wave Divider Flipped */}
<div className="w-full overflow-hidden leading-none -rotate-180">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-16"
  >
    <path
      d="M0,320 L80,300 C160,280 320,240 480,250 C640,260 800,300 960,290 C1120,280 1280,220 1360,190 L1440,160 L1440,0 L0,0Z"
      fill="#f4f4f5"  // 👈 match this to next section bg
    />
  </svg>
</div>

          

                {/* Portfolio Preview */}
                <FadeInSection id="portfolio" className="bg-brand-light-gray py-8 md:py-8">{/* Reduced vertical padding */}
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-1">Featured Work</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link to="/web-design" className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                                <img src={web_design} alt="Web Design Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-all flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white">Web Design</h3>
                                </div>
                            </Link>
                            <Link to="/logo-showcase" className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                                <img src={logo_design} alt="Logo Design Showcase" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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


                {/* Testimonials */}
                <FadeInSection>
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-12">What Our Clients Say</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                            <TestimonialCard key={t.name} testimonial={t} index={i} />
                            ))}
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </>
    );
};

export default Home;