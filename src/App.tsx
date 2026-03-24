import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import ErrorBoundary from './components/ErrorBoundary';
import Seo from './components/Seo';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <Seo />
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-bg min-h-screen text-ink font-sans selection:bg-ink selection:text-bg">
          <AnimatePresence>
            {loading && <Loader onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          <div className="w-full relative bg-bg flex flex-col min-h-screen">
            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[9999] mix-blend-overlay" 
                 style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            
            <Navbar />
            
            <main className="relative z-10 w-full flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
