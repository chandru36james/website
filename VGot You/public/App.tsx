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
import Blog from "./pages/Blog";
import Contact from './pages/Contact';
import CookieConsent from './components/CookieConsent';
import NotFound from "./pages/NotFound";
import WebDesignTN from './pages/webdesignTN';
import WebDesignKarur from './pages/WebDesignKarur';
import BlogPostPage from './pages/BlogPostPage';
import WebDesignIndia from './pages/WebDesignIndia';
import SeoServices from './pages/SeoServices';
import DigitalMarketing from './pages/DigitalMarketing';
import Portfolio from './pages/Portfolio';
import DigitalStudio from './pages/DigitalStudio';
import TestimonialsPage from './pages/TestimonialsPage';


// ✅ ANALYTICS IMPORT
import { loadAnalytics } from './analytics/analyticsLoader';


const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return null;
};


const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);


    // ✅ ANALYTICS LOADER - Runs when component mounts
    useEffect(() => {
        const consent = localStorage.getItem('vgotyou-cookie-consent');


        if (consent === 'accepted') {
            loadAnalytics();
        }
    }, []);


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
                <CookieConsent />
            </div>
        </BrowserRouter>
    );
};


export default App;
