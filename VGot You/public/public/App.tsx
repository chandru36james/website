
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import Home from './pages/Home';
import WebDesign from './pages/WebDesign';
import LogoShowcase from './pages/LogoShowcase';
import AboutMe from './pages/chandru';
import Blog from "./pages/Blog";
import ArcticTextilesPost from './pages/ArcticTextilesPost';
import VesaHomesPost from './pages/VesaHomesPost';
import BrandingPost from './pages/BrandingPost';
import Contact from './pages/Contact';
import CookieConsent from './components/CookieConsent';
import NotFound from "./pages/NotFound";

import BlogPostPage from './pages/BlogPostPage';


const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
        
            <ScrollToTop />
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/web-design" element={<WebDesign />} />
                    <Route path="/logo-showcase" element={<LogoShowcase />} />
                    <Route path="/chandru" element={<AboutMe />} />
                    <Route path="/Blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/contact" element={<Contact />} />
                        {/* Catch-all 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <FloatingWidgets />
            <Footer />
            <CookieConsent />
        </BrowserRouter>
    );
};

export default App;