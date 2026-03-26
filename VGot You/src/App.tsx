import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWidgets from './components/layout/FloatingWidgets';
import Preloader from './components/layout/Preloader';
import CookieConsent from './components/layout/CookieConsent';

import Home from './pages/Home';
import WebDesign from './pages/WebDesign';
import LogoShowcase from './pages/LogoShowcase';
import AboutMe from './pages/chandru';
import Saranraj from './pages/Saranraj';
import About from './pages/About';
import Blog from "./pages/Blog";
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";

import TNWebPage from './pages/India/TNWebPage';
import KarurWebPage from './pages/India/KarurWebPage';
import IndiaWebPage from './pages/India/IndiaWebPage';
import ChennaiWebPage from './pages/India/ChennaiWebPage';
import CoimbatoreWebPage from './pages/India/CoimbatoreWebPage';
import BangaloreWebPage from './pages/India/BangaloreWebPage';
import MumbaiWebPage from './pages/India/MumbaiWebPage';

import SeoServices from './pages/SeoServices';
import DigitalMarketing from './pages/DigitalMarketing';
import Portfolio from './pages/Portfolio';
import DigitalStudio from './pages/DigitalStudio';
import TestimonialsPage from './pages/TestimonialsPage';

import UKWebDesign from './pages/UK/UKWebDesign';
import LondonWebPage from './pages/UK/LondonWebPage';
import BirminghamWebPage from './pages/UK/BirminghamWebPage';
import ManchesterWebPage from './pages/UK/ManchesterWebPage';
import LeedsWebPage from './pages/UK/LeedsWebPage';
import GlasgowWebPage from './pages/UK/GlasgowWebPage';
import LiverpoolWebPage from './pages/UK/LiverpoolWebPage';
import BristolWebPage from './pages/UK/BristolWebPage';
import SheffieldWebPage from './pages/UK/SheffieldWebPage';
import EdinburghWebPage from './pages/UK/EdinburghWebPage';
import LeicesterWebPage from './pages/UK/LeicesterWebPage';
import CardiffWebPage from './pages/UK/CardiffWebPage';
import BelfastWebPage from './pages/UK/BelfastWebPage';

import UKSeoServices from './pages/UK/UKSeoServices';
import UKDigitalMarketing from './pages/UK/UKDigitalMarketing';

import BlogPostPage from './pages/BlogPostPage';


declare global {  
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Cookie consent + analytics
  useEffect(() => {
    const consent = localStorage.getItem('vgotyou-cookie-consent');
    if (consent === 'accepted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        personalization_storage: 'granted'
      });
    }
  }, []);

  return (
    <div className="bg-white text-zinc-900 flex flex-col font-sans selection:bg-red-600/10 min-h-screen overflow-x-hidden">
      <Preloader isVisible={isLoading} />

      {!isLoading && (
        <>
          <Header />
          
          <main className="grow pt-0">
            <Routes>
            
              <Route path="/" element={<Home />} />
              <Route path="/web-design" element={<WebDesign />} />
              <Route path="/logo-showcase" element={<LogoShowcase />} />
              <Route path="/chandru" element={<AboutMe />} />
              <Route path="/saran-raj" element={<Saranraj />} />
              <Route path="/about" element={<About />} />

              <Route path="/web-design-tamil-nadu" element={<TNWebPage />} />
              <Route path="/web-design-karur" element={<KarurWebPage />} />
              <Route path="/web-design-india" element={<IndiaWebPage />} />
              <Route path="/web-design-chennai" element={<ChennaiWebPage />} />
              <Route path="/web-design-coimbatore" element={<CoimbatoreWebPage />} />
              <Route path="/web-design-bangalore" element={<BangaloreWebPage />} />
              <Route path="/web-design-mumbai" element={<MumbaiWebPage />} />

              <Route path="/web-design-uk" element={<UKWebDesign />} />
              <Route path="/web-design-london" element={<LondonWebPage />} />
              <Route path="/web-design-birmingham" element={<BirminghamWebPage />} />
              <Route path="/web-design-manchester" element={<ManchesterWebPage />} />
              <Route path="/web-design-leeds" element={<LeedsWebPage />} />
              <Route path="/web-design-glasgow" element={<GlasgowWebPage />} />
              <Route path="/web-design-liverpool" element={<LiverpoolWebPage />} />
              <Route path="/web-design-bristol" element={<BristolWebPage />} />
              <Route path="/web-design-sheffield" element={<SheffieldWebPage />} />
              <Route path="/web-design-edinburgh" element={<EdinburghWebPage />} />
              <Route path="/web-design-leicester" element={<LeicesterWebPage />} />
              <Route path="/web-design-cardiff" element={<CardiffWebPage />} />
              <Route path="/web-design-belfast" element={<BelfastWebPage />} />

              <Route path="/seo-services-uk" element={<UKSeoServices />} />
              <Route path="/digital-marketing-uk" element={<UKDigitalMarketing />} />

              <Route path="/seo-services" element={<SeoServices />} />
              <Route path="/digital-marketing" element={<DigitalMarketing />} />

              <Route path="/digital-studio-tamil-nadu" element={<DigitalStudio />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          
          <CookieConsent />
          <FloatingWidgets />
        </>
      )}
    </div>
  );
}