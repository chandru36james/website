import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import FloatingWidgets from './components/layout/FloatingWidgets';
import Preloader from './components/layout/Preloader';
import Home from './pages/Home';
import WebDesign from './pages/WebDesign';
import LogoShowcase from './pages/LogoShowcase';
import AboutMe from './pages/chandru';
import Saranraj from './pages/Saranraj';
import About from './pages/About';
import Blog from "./pages/Blog";
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";
import BlogPostPage from './pages/BlogPostPage';
import SeoServices from './pages/SeoServices';
import DigitalMarketing from './pages/DigitalMarketing';
import Portfolio from './pages/Portfolio';
import DigitalStudio from './pages/DigitalStudio';
import TestimonialsPage from './pages/TestimonialsPage';
import InquiryForm from './pages/InquiryForm';
import { HelmetProvider } from 'react-helmet-async';

// UK Location Pages
import UKWebDesign from './pages/UK/UKWebDesign';
import UKDigitalMarketing from './pages/UK/UKDigitalMarketing';
import UKSeoServices from './pages/UK/UKSeoServices';
import LondonWebPage from './pages/UK/LondonWebPage';
import ManchesterWebPage from './pages/UK/ManchesterWebPage';
import BirminghamWebPage from './pages/UK/BirminghamWebPage';
import LeedsWebPage from './pages/UK/LeedsWebPage';
import GlasgowWebPage from './pages/UK/GlasgowWebPage';
import LiverpoolWebPage from './pages/UK/LiverpoolWebPage';
import BristolWebPage from './pages/UK/BristolWebPage';
import SheffieldWebPage from './pages/UK/SheffieldWebPage';
import EdinburghWebPage from './pages/UK/EdinburghWebPage';
import LeicesterWebPage from './pages/UK/LeicesterWebPage';
import CardiffWebPage from './pages/UK/CardiffWebPage';
import BelfastWebPage from './pages/UK/BelfastWebPage';

// India Location Pages
import IndiaWebDesign from './pages/India/IndiaWebPage';
import TNWebDesign from './pages/India/TNWebPage';
import KarurWebDesign from './pages/India/KarurWebPage';
import CoimbatoreWebDesign from './pages/India/CoimbatoreWebPage';
import ChennaiWebDesign from './pages/India/ChennaiWebPage';
import MumbaiWebDesign from './pages/India/MumbaiWebPage';
import BangaloreWebDesign from './pages/India/BangaloreWebPage';

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const consent = localStorage.getItem('vgotyou-cookie-consent');
    if (consent === 'accepted' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'personalization_storage': 'granted'
      });
    }
  }, []);

  return (
    <HelmetProvider>
        <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-red-600/10 min-h-screen transition-colors duration-300">
          <Preloader isVisible={isLoading} />
          
          {!isLoading && (
            <>
              <FloatingWidgets />
              <main className="flex-grow pt-0">
                <Routes>
                  {/* Existing Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/web-design" element={<WebDesign />} />
                  <Route path="/logo-showcase" element={<LogoShowcase />} />
                  <Route path="/chandru" element={<AboutMe />} />
                  <Route path="/saran-raj" element={<Saranraj />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/seo-services" element={<SeoServices />} />
                  <Route path="/digital-marketing" element={<DigitalMarketing />} />
                  <Route path="/digital-studio-tamil-nadu" element={<DigitalStudio />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/project-inquiry" element={<InquiryForm />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* UK Location Routes */}
                  <Route path="/web-design-uk" element={<UKWebDesign />} />
                  <Route path="/digital-marketing-uk" element={<UKDigitalMarketing />} />
                  <Route path="/seo-services-uk" element={<UKSeoServices />} />
                  <Route path="/web-design-london" element={<LondonWebPage />} />
                  <Route path="/web-design-manchester" element={<ManchesterWebPage />} />
                  <Route path="/web-design-birmingham" element={<BirminghamWebPage />} />
                  <Route path="/web-design-leeds" element={<LeedsWebPage />} />
                  <Route path="/web-design-glasgow" element={<GlasgowWebPage />} />
                  <Route path="/web-design-liverpool" element={<LiverpoolWebPage />} />
                  <Route path="/web-design-bristol" element={<BristolWebPage />} />
                  <Route path="/web-design-sheffield" element={<SheffieldWebPage />} />
                  <Route path="/web-design-edinburgh" element={<EdinburghWebPage />} />
                  <Route path="/web-design-leicester" element={<LeicesterWebPage />} />
                  <Route path="/web-design-cardiff" element={<CardiffWebPage />} />
                  <Route path="/web-design-belfast" element={<BelfastWebPage />} />

                  {/* India Location Routes */}
                  <Route path="/web-design-india" element={<IndiaWebDesign />} />
                  <Route path="/web-design-tamil-nadu" element={<TNWebDesign />} />
                  <Route path="/web-design-karur" element={<KarurWebDesign />} />
                  <Route path="/web-design-coimbatore" element={<CoimbatoreWebDesign />} />
                  <Route path="/web-design-chennai" element={<ChennaiWebDesign />} />
                  <Route path="/web-design-mumbai" element={<MumbaiWebDesign />} />
                  <Route path="/web-design-bangalore" element={<BangaloreWebDesign />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </>
          )}
        </div>
    </HelmetProvider>
  );
}
