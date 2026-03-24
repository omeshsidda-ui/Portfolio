/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import ErrorBoundary from './components/ErrorBoundary';
import Seo from './components/Seo';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Process from './components/Process';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
      <div className="bg-bg min-h-screen text-ink font-sans selection:bg-ink selection:text-bg">
        <AnimatePresence>
          {loading && <Loader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <div className="w-full relative bg-bg">
          {/* Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[9999] mix-blend-overlay" 
               style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          <Navbar />
          <Hero />
          <Marquee />
          <Projects />
          <Process />
          <Services />
          <Contact />
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
}
