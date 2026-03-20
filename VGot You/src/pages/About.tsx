import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LinkedInIcon, GitHubIcon, InstagramIcon, GoogleIcon, MediumIcon, CheckCircleIcon, RocketLaunchIcon, LightBulbIcon, UserGroupIcon } from '../components/Icons';
import { Helmet } from "react-helmet";

const m = motion as any;

const About: React.FC = () => {
    const googleBusinessUrl = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur&stick=H4sIAAAAAAAA_-NgU1I1qEhMMzVLMzNJtjS3NDY2MTK3MqhISjQ1TU6zMLGwME4xTjNKXsSqEeaeX6IQmV-q8KhhskJ4apKCS2pxZnqegnN-bkFiXqVCZp5CdmJRaREAmWh1LVQAAAA&hl=en&mat=CTYW_efeDqo4ElcBTVDHnjSrL1i_VTCa8_kuXYpK1iyu8maHPcIxMv-VA5S0wxGQN2FTkjTuTCQOIc3qOOv2BGOZtzpI4JPgrHCDZf5fjf6TpSzgZ-TLIOOTRC7snP24iCY&authuser=0";

    const founders = [
        {
            name: "Chandru",
            title: "Founder & Lead Designer",
            description: "Expert in high-performance websites, UI/UX design, branding, and SEO with over 2 years of experience.",
            image: "https://www.vgotyou.com/assets/chandru.png",
            link: "/chandru",
            socials: {
                linkedin: "https://www.linkedin.com/in/chandru-m7339436153/",
                github: "https://github.com/chandru36james/"
            }
        },
        {
            name: "Saranraj",
            title: "Co-Founder & Tech Lead",
            description: "Specializes in scalable web development, cloud infrastructure, and digital growth strategies.",
            image: "https://www.vgotyou.com/assets/saran.png",
            link: "/saran-raj", // Placeholder link
            socials: {
                linkedin: "https://www.linkedin.com/in/saranraj-vasanthi-297ba625a/",
                github: "https://github.com/Saran830"
            }
        }
    ];

    const services = [
        "Website Design",
        "Web Development",
        "Responsive Website Design",
        "Business Website Development",
        "Web Hosting",
        "Branding & Logo Design",
        "SEO-friendly website development"
    ];

    const whyChooseUs = [
        {
            title: "Modern Design",
            description: "We create visually stunning websites that align with modern digital trends.",
            icon: <LightBulbIcon className="w-6 h-6" />
        },
        {
            title: "Responsive Development",
            description: "Your website will look and perform perfectly on all devices, from mobile to desktop.",
            icon: <RocketLaunchIcon className="w-6 h-6" />
        },
        {
            title: "SEO Optimized",
            description: "We build websites with SEO in mind to help you rank higher on search engines.",
            icon: <CheckCircleIcon className="w-6 h-6" />
        },
        {
            title: "Reliable Solutions",
            description: "From hosting to maintenance, we provide end-to-end digital solutions you can trust.",
            icon: <UserGroupIcon className="w-6 h-6" />
        }
    ];

    return (
        <div className="bg-white pt-16">
            

<Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>About VGot You | Web Design & Digital Solutions Company</title>

  <meta
    name="description"
    content="Learn about VGot You, a web design and digital solutions company founded by Chandru and Saranraj. We create high-performance websites, UI/UX design, branding, and SEO-driven digital experiences for businesses worldwide."
  />

  <meta
    name="keywords"
    content="VGot You, web design company, digital solutions company, UI UX design agency, branding agency, website development company, SEO services"
  />

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/about" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.vgotyou.com/about" />
  <meta property="og:title" content="About VGot You | Web Design & Digital Solutions Company" />
  <meta
    property="og:description"
    content="Discover the story behind VGot You, founded by Chandru and Saranraj to help businesses grow through web design, branding, and SEO-driven digital solutions."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About VGot You | Digital Solutions Company" />
  <meta
    name="twitter:description"
    content="Meet the founders and learn about the mission behind VGot You – building high-performance websites and digital experiences for businesses worldwide."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= ORGANIZATION SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.vgotyou.com/#organization",
      name: "VGot You",
      url: "https://www.vgotyou.com/",
      logo: "https://www.vgotyou.com/assets/vgotyou.png",
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          "@id": "https://www.vgotyou.com/chandru#person",
          name: "Chandru",
          jobTitle: "Founder & Lead Web Designer"
        },
        {
          "@type": "Person",
          "@id": "https://www.vgotyou.com/saranraj#person",
          name: "Saranraj Vasanthi",
          jobTitle: "Co-Founder & AI Engineer"
        }
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karur",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      },
      sameAs: [
          "https://www.linkedin.com/in/vgotyou/",
          "https://www.instagram.com/vgot_you/",
          "https://vgotyou.medium.com/",
          "https://vgotyou.sulekha.com",
          "https://clutch.co/profile/vgot-you",
          "https://www.peopleperhour.com/freelancer/vgot-you-web-developer-zxxamqjw",
          "https://www.justdial.com/Karur/VGot-You-Andankoil/9999P4324-4324-260118183447-U7H4_BZDET?via=scode"
      ]
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

  {/* ================= ABOUT PAGE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: "https://www.vgotyou.com/about",
      name: "About VGot You",
      description:
        "Learn about VGot You, a web design and digital solutions company founded by Chandru and Saranraj, helping businesses build powerful digital experiences."
    })}
  </script>
</Helmet>





            
            {/* Hero Section */}
            <section className="relative py-12 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-50/50 -z-10" />
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <m.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 flex justify-center"
                        >
                            <img 
                                src="https://www.vgotyou.com/assets/logo.png" 
                                alt="VGot You Logo" 
                                className="h-16 w-16 md:h-20 md:w-20 object-contain invert"
                                referrerPolicy="no-referrer"
                            />
                        </m.div>
                        <m.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-zinc-900 mb-8 leading-[1.1]"
                        >
                            About VGot You – Web Design & <span className="text-red-600 italic">Digital Solutions</span> Company
                        </m.h1>
                        <m.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light"
                        >
                            VGot You is a premier web design company dedicated to helping businesses build modern, responsive, and SEO-optimized websites. We combine creative design with technical excellence to deliver digital solutions that drive growth.
                        </m.p>
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-10 flex justify-center gap-6"
                        >
                            <a href="https://www.linkedin.com/in/vgotyou/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors p-2 border border-zinc-100 rounded-full hover:border-red-600/20">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/vgot_you/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors p-2 border border-zinc-100 rounded-full hover:border-red-600/20">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors p-2 border border-zinc-100 rounded-full hover:border-red-600/20">
                                <GoogleIcon className="w-5 h-5" />
                            </a>
                            <a href="https://medium.com/@vgotyou" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors p-2 border border-zinc-100 rounded-full hover:border-red-600/20">
                                <MediumIcon className="w-5 h-5" />
                            </a>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-6">Our Story – How VGot You Started</h2>
                            <div className="w-20 h-1 bg-red-600 mb-8" />
                            <div className="space-y-6 text-zinc-600 leading-relaxed font-light">
                                <p>
                                    VGot You was born out of a passion for digital excellence and a desire to bridge the gap between businesses and their online potential. Our founders recognized that many small to medium-sized enterprises struggled to establish a professional online presence that truly reflected their brand value.
                                </p>
                                <p>
                                    Starting as a small team of dedicated designers and developers, we set out to create a web design company that prioritizes client growth. We believe that a website should be more than just a digital business card; it should be a powerful tool for conversion, engagement, and business scalability.
                                </p>
                                <p>
                                    Today, VGot You has grown into a full-service digital solutions company, serving clients globally with cutting-edge website development services and strategic branding.
                                </p>
                            </div>
                        </m.div>
                        <m.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img 
                                src="https://picsum.photos/seed/vgotyoustory/800/600" 
                                alt="VGot You Team Working" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Meet the Founders Section */}
            <section className="py-24 bg-zinc-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-4">Meet the Founders</h2>
                        <p className="text-zinc-500 font-light max-w-2xl mx-auto">The visionary minds behind VGot You's digital excellence.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {founders.map((founder, idx) => (
                            <m.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-zinc-50 group-hover:border-red-600/20 transition-colors">
                                    <img 
                                        src={founder.image} 
                                        alt={founder.name} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-1">{founder.name}</h3>
                                    <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-4">{founder.title}</p>
                                    <p className="text-zinc-500 font-light text-sm mb-6 leading-relaxed">
                                        {founder.description}
                                    </p>
                                    <div className="flex justify-center gap-4 mb-8">
                                        {founder.socials.linkedin && (
                                            <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors">
                                                <LinkedInIcon className="w-4 h-4" />
                                            </a>
                                        )}
                                        {founder.socials.github && (
                                            <a href={founder.socials.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors">
                                                <GitHubIcon className="w-4 h-4" />
                                            </a>
                                        )}
                                        {founder.socials.instagram && (
                                            <a href={founder.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-600 transition-colors">
                                                <InstagramIcon className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                    <Link 
                                        to={founder.link}
                                        className="inline-block px-6 py-3 border border-zinc-900 text-zinc-900 font-bold rounded-full hover:bg-zinc-900 hover:text-white transition-all text-sm"
                                    >
                                        View Full Profile
                                    </Link>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <img 
                                src="https://picsum.photos/seed/whatwedo/800/800" 
                                alt="Digital Solutions" 
                                className="rounded-3xl shadow-xl"
                                referrerPolicy="no-referrer"
                            />
                        </m.div>
                        <m.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-8">What We Do</h2>
                            <p className="text-zinc-600 mb-8 font-light leading-relaxed">
                                As a comprehensive digital solutions company, we offer a wide range of services designed to elevate your business in the digital landscape.
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {services.map((service, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-zinc-700 font-medium text-sm">
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Why Choose VGot You Section */}
            <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 -skew-x-12 transform translate-x-1/2" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Businesses Choose VGot You</h2>
                        <p className="text-zinc-400 font-light max-w-2xl mx-auto">We deliver more than just websites; we deliver results.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, idx) => (
                            <m.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{item.description}</p>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-8">Our Vision</h2>
                        <p className="text-2xl md:text-3xl text-zinc-600 font-light italic leading-relaxed">
                            "To become a globally trusted digital solutions company that empowers businesses of all sizes to achieve sustainable growth through innovative web design and strategic digital solutions."
                        </p>
                    </m.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center backdrop-blur-sm">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-red-600 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Ready to scale?</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                                Let's build your <span className="text-red-600 italic">digital future</span> together.
                            </h2>
                            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Partner with VGot You for high-performance web design and strategic digital growth. Your success is our mission.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link 
                                    to="/contact" 
                                    className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
                                >
                                    Start Your Project
                                </Link>
                                <Link 
                                    to="/portfolio" 
                                    className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all active:scale-95"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
