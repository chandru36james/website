
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import Home from './pages/Home';
import WebDesign from './pages/WebDesign';
import LogoShowcase from './pages/LogoShowcase';
import AboutMe from './pages/chandru';
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";
import NewsletterPopup from './components/Newsletter';

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
                    <Route path="/contact" element={<Contact />} />
                        {/* Catch-all 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <FloatingWidgets />
            <Footer />
               <NewsletterPopup />
        </BrowserRouter>
    );
};

export default App;