import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import WhatsAppStickyButton from './components/WhatsAppStickyButton';
import BackToTopButton from './components/BackToTopButton';
import { SearchProvider } from './contexts/SearchContext';
import SearchModal from './components/SearchModal';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPage from './pages/BlogPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <SearchProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans bg-bg-main text-text-main">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:slug" element={<BlogPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppStickyButton />
          <BackToTopButton />
          <SearchModal />
        </div>
      </SearchProvider>
    </HashRouter>
  );
};

export default App;