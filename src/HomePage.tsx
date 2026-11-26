import { useEffect } from 'react';
import type Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function HomePage() {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let cancelled = false;
    let rafId = 0;
    let lenis: Lenis | null = null;

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!hash || hash.length <= 1 || !lenis) return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target);
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
      }
      if (hash === '#main') {
        target.focus({ preventScroll: true });
      }
    };

    const cleanup = () => {
      document.removeEventListener('click', handleAnchorClick);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lenis?.destroy();
      lenis = null;
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cancelled = true;
        cleanup();
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled || motionQuery.matches) return;

      lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true });
      document.addEventListener('click', handleAnchorClick);

      const raf = (time: number) => {
        if (cancelled || !lenis) return;
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      motionQuery.removeEventListener('change', handleMotionChange);
      cleanup();
    };
  }, []);

  return (
    <div className="page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Education />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
