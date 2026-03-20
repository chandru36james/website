import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

import Home from './pages/Home';
import WebDesign from './pages/WebDesign';
import LogoShowcase from './pages/LogoShowcase';
import About from './pages/About';

import Chandru from './pages/chandru';
import Saranraj from './pages/Saranraj';

import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";

import WebDesignKarur from './pages/WebDesignKarur';
import WebDesignTN from './pages/webdesignTN';
import WebDesignIndia from './pages/WebDesignIndia';

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

import Blog from "./pages/Blog";
import BlogPostPage from './pages/BlogPostPage';
import SeoServices from './pages/SeoServices';
import DigitalMarketing from './pages/DigitalMarketing';
import Portfolio from './pages/Portfolio';
import DigitalStudio from './pages/DigitalStudio';
import TestimonialsPage from './pages/TestimonialsPage';



const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return null;
};


const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);


    // ✅ PRELOADER TIMER - Runs when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);


        return () => clearTimeout(timer);
    }, []);


    return (
        <BrowserRouter>
            <div className="bg-black text-gray-100 flex flex-col font-sans selection:bg-red-600/30 min-h-screen overflow-x-hidden">
                <Preloader isVisible={isLoading} />
                <ScrollToTop />
                <Header />


                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/web-design" element={<WebDesign />} />
                        <Route path="/logo-showcase" element={<LogoShowcase />} />
                        <Route path="/chandru" element={<Chandru />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/saran-raj" element={<Saranraj />} />
                        <Route path="/web-design-tamil-nadu" element={<WebDesignTN />} />
                        <Route path="/web-design-karur" element={<WebDesignKarur />} />
                        <Route path="/web-design-india" element={<WebDesignIndia />} />

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


                <FloatingWidgets />
                <Footer />
                
            </div>
        </BrowserRouter>
    );
};


export default App;
