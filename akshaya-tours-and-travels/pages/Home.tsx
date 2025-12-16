import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { ROUTES, PHONE_NUMBER, WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';
import { ArrowRight, ChevronDown, Phone, MessageCircle, FileText, Star, ShieldCheck, Clock, Users, Facebook, Instagram, Youtube } from 'lucide-react';

// Sections
import About from './About';
import Services from './Services';
import Contact from './Contact';
import PriceSection from '../components/PriceSection';
import GallerySection from '../components/GallerySection';
import DestinationsSection from '../components/DestinationsSection';
import FadeIn from '../components/FadeIn';
import CountUp from '../components/CountUp';

const Home: React.FC = () => {
  
  // Custom scroll handler for Home page buttons to ensure smooth scrolling with offset
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 60; // Adjusted for smaller header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash for history safely
      try {
        if(window.history.pushState) {
          window.history.pushState(null, '', id);
        }
      } catch (error) {
        // Ignore security errors in restricted environments
        console.debug("Could not push state to history:", error);
      }
    }
  };

  return (
    <Layout>
      <SEO 
        title="Best Travels in Tambaram | Luxury Mini Bus & Tempo Travels in Tambaram"
        description="Akshaya Tours and Travels is the Best Travels in Tambaram. We offer Luxury Travels, Mini Bus Travels, Domestic Travels in Tambaram, and outstation packages."
        keywords="travels in tambaram,travels in chennai, vehicle rentals in tambaram, bus travels in tambaram, domestic travels in tambaram, tambaram travels contact number, best travels in tambaram"
        canonical="https://akshayatoursandtravels.com"
      />

      {/* Modern Hero Section - Fit to Screen */}
      <section id="home" className="relative h-[calc(100dvh-60px)] md:h-[calc(100dvh-60px)] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920" 
            alt="Travels in Tambaram" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom object-[65%] md:object-center"
          />
           {/* Sophisticated Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/95 md:bg-gradient-to-r md:from-slate-900/95 md:via-slate-900/80 md:to-slate-900/40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative h-full">
          
          <div className="flex flex-col lg:grid lg:grid-cols-12 h-full items-center justify-center lg:gap-12">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 w-full text-center lg:text-left text-white flex flex-col items-center lg:items-start justify-center md:flex-auto py-2 md:py-0">
              
              <FadeIn delay={100}>
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-secondary/20 border border-secondary/50 text-white text-[10px] md:text-sm font-semibold tracking-wider mb-3 backdrop-blur-md shadow-lg">
                  <Star size={12} className="text-accent fill-accent" />
                  #1 BEST TRAVELS IN TAMBARAM
                </div>
              </FadeIn>

              {/* Title with Rolling Animation */}
              <FadeIn delay={200}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-2 md:mb-3 leading-[1.1] drop-shadow-2xl tracking-tight">
                  <div className="flex flex-col md:block">
                    {/* Desktop: One solid line for the slogan */}
                    <div className="flex flex-wrap justify-center lg:justify-start items-baseline gap-x-2 md:gap-x-3">
                      
                      {/* Word 1: Luxury/Comfort */}
                      <div className="relative h-[1.1em] overflow-hidden flex flex-col justify-start">
                        <div className="animate-text-roll text-left">
                          <span className="block text-white h-[1.1em]">Luxury</span>
                          <span className="block text-accent h-[1.1em]">Comfort</span>
                          <span className="block text-white h-[1.1em]">Luxury</span>
                        </div>
                      </div>

                      <span className="text-white">&</span>

                      {/* Word 2: Safe/Trust */}
                      <div className="relative h-[1.1em] overflow-hidden flex flex-col justify-start">
                        <div className="animate-text-roll text-left" style={{ animationDelay: '3s' }}>
                          <span className="block text-white h-[1.1em]">Safe</span>
                          <span className="block text-accent h-[1.1em]">Trust</span>
                          <span className="block text-white h-[1.1em]">Safe</span>
                        </div>
                      </div>

                      <span className="text-white">Travels in</span>
                    </div>

                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-blue-200 to-white block mt-1">
                      Tambaram
                    </span>
                  </div>
                </h1>
              </FadeIn>
              
              <FadeIn delay={400}>
                <p className="text-sm md:text-xl mb-6 md:mb-8 text-gray-200 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-95 px-1 md:px-0">
                  Looking for <strong>Domestic Travels in Tambaram</strong>? We provide luxury <strong>Tourist Vehicles in Tambaram</strong>, <strong>Bus Travels in Tambaram</strong> booking, and reliable <strong>Tour Packages</strong>.
                </p>
              </FadeIn>

              {/* Stats Row */}
              <FadeIn delay={500} className="w-full lg:w-auto">
                <div className="grid grid-cols-3 gap-2 w-full max-w-sm mx-auto lg:mx-0 mb-6 md:mb-8">
                   <div className="flex flex-col items-center justify-center bg-white/10 px-1 py-2 rounded-lg border border-white/10 backdrop-blur-md hover:bg-white/15 transition-colors">
                      <div className="flex items-center gap-1 text-secondary mb-0.5">
                        <Users size={14} className="md:w-4 md:h-4" />
                        <CountUp end={5} suffix="k+" duration={2000} className="font-bold text-white text-xs md:text-sm leading-none" />
                      </div>
                      <p className="text-[9px] md:text-[10px] text-gray-300 uppercase tracking-wide">Riders</p>
                   </div>
                   <div className="flex flex-col items-center justify-center bg-white/10 px-1 py-2 rounded-lg border border-white/10 backdrop-blur-md hover:bg-white/15 transition-colors">
                      <div className="flex items-center gap-1 text-blue-300 mb-0.5">
                        <ShieldCheck size={14} className="md:w-4 md:h-4" />
                        <CountUp end={100} suffix="%" duration={2000} className="font-bold text-white text-xs md:text-sm leading-none" />
                      </div>
                      <p className="text-[9px] md:text-[10px] text-gray-300 uppercase tracking-wide">Safe</p>
                   </div>
                   <div className="flex flex-col items-center justify-center bg-white/10 px-1 py-2 rounded-lg border border-white/10 backdrop-blur-md hover:bg-white/15 transition-colors">
                      <div className="flex items-center gap-1 text-accent mb-0.5">
                        <Clock size={14} className="md:w-4 md:h-4" />
                        <CountUp end={24} suffix="/7" duration={1500} className="font-bold text-white text-xs md:text-sm leading-none" />
                      </div>
                      <p className="text-[9px] md:text-[10px] text-gray-300 uppercase tracking-wide">Support</p>
                   </div>
                </div>
              </FadeIn>
              
              {/* Mobile Only CTA Button - Orange Accent */}
              <div className="md:hidden w-full max-w-xs mx-auto mb-6">
                 <FadeIn delay={600}>
                    <a 
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                      className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-orange-600/40 relative overflow-hidden ring-4 ring-orange-500/30 animate-pulse active:scale-95 duration-200"
                    >
                      <Phone size={18} className="fill-current" />
                      <span className="text-base tracking-wide">CALL NOW</span>
                      
                      {/* Button Ripple Animation */}
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </a>
                 </FadeIn>
              </div>

              {/* Social Media Icons - Moved below CTA for mobile */}
              <FadeIn delay={700}>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                  <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="group p-2.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg">
                    <Facebook size={20} className="text-white group-hover:text-[#1877F2] transition-colors" />
                  </a>
                  <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="group p-2.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg">
                     <Instagram size={20} className="text-white group-hover:text-[#E4405F] transition-colors" />
                  </a>
                  <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="group p-2.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg">
                    <Youtube size={20} className="text-white group-hover:text-[#FF0000] transition-colors" />
                  </a>
                </div>
              </FadeIn>

            </div>

            {/* Right Column: Desktop Quick Action Card */}
            <div className="hidden md:block lg:col-span-5 w-full">
              <FadeIn delay={800} direction="left">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-500/40 transition duration-700"></div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">Book Your Trip</h3>
                  <p className="text-blue-100 mb-6 text-sm">Best Travels in Tambaram for Vehicles & Buses.</p>

                  <div className="space-y-4">
                    <a 
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                      className="flex items-center justify-between w-full bg-accent hover:bg-accent-hover text-white p-4 rounded-xl font-bold transition shadow-lg shadow-orange-600/40 group/btn relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3 z-10">
                        <div className="bg-white/20 p-2 rounded-full"><Phone size={20} className="w-5 h-5" /></div>
                        <div className="text-left">
                          <span className="block text-xs text-white/90 font-normal">Need Travels Near Me?</span>
                          <span className="block text-lg leading-none tracking-wide">CALL NOW</span>
                        </div>
                      </div>
                      <ArrowRight size={20} className="transform group-hover/btn:translate-x-1 transition z-10" />
                      
                      <div className="absolute inset-0 bg-white/20 animate-pulse hidden group-hover/btn:block"></div>
                    </a>

                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%20want%20to%20book%20a%20vehicle.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition shadow-lg"
                      >
                        <MessageCircle size={24} />
                        <span>WhatsApp</span>
                      </a>
                      <a 
                        href={ROUTES.PRICING}
                        onClick={(e) => handleScroll(e, ROUTES.PRICING)}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-body py-4 rounded-xl font-bold transition shadow-lg cursor-pointer"
                      >
                        <FileText size={24} className="text-secondary" />
                        <span>Rates</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-300">
                      <span className="text-accent">★</span> 4.9/5 Rating - Top Travels in Tambaram
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center text-white/50 animate-bounce z-20 pointer-events-none">
          <a 
            href={ROUTES.ABOUT} 
            onClick={(e) => handleScroll(e, ROUTES.ABOUT)}
            aria-label="Scroll Down" 
            className="flex flex-col items-center gap-1 hover:text-white transition cursor-pointer pointer-events-auto"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium opacity-80">Scroll</span>
            <ChevronDown size={18} className="md:w-6 md:h-6" />
          </a>
        </div>
      </section>

      {/* Sections */}
      <div className="relative z-20 bg-white">
        <About id="about" />
        <Services id="services" />
        <DestinationsSection id="destinations" />
        <PriceSection id="pricing" />
        <GallerySection id="gallery" />
        <Contact id="contact" />
      </div>
      
    </Layout>
  );
};

export default Home;