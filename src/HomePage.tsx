import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

const skills = [
  { title: 'Web development', description: 'I build web apps and turn ideas into interfaces people can use.' },
  { title: 'Headless Linux servers', description: 'I manage remote Linux servers and use AI agents to help with routine administration.' },
  { title: 'Hermes agents', description: 'I run Hermes agents on remote servers and use them in my day-to-day workflows.' },
  { title: 'Networking', description: 'I work with network configuration and troubleshoot connectivity.' },
  { title: 'Reverse engineering', description: 'I study how apps work by examining their behavior and structure.' },
  { title: 'Web scraping', description: 'I extract information from web pages and turn it into structured data.' },
];

function HeroIdCard() {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 24, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateYMouse = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const flipSpring = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useTransform([rotateYMouse, flipSpring], ([m, f]) => `${(typeof m === 'number' ? m : 0) + (typeof f === 'number' ? f : 0)}deg`);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((event.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const flip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    flipSpring.set(next ? 180 : 0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={flip}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      aria-label={isFlipped ? 'Flip ID Card to Front' : 'Flip ID Card to System Profile'}
      aria-pressed={isFlipped}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px', rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? (isFlipped ? 180 : 0) : rotateY }}
      whileHover={reducedMotion ? undefined : { scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="identity-card group relative h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-300"
    >
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}>
        <div className="identity-face identity-face--front" style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', zIndex: isFlipped ? 0 : 1 }}>
          <span className="identity-kicker">STUDENT · PORTFOLIO</span>
          <span aria-hidden="true" className="identity-monogram">OS</span>
          <span className="identity-name">OMESH SIDDA</span>
          <span className="identity-flip">TAP TO FLIP</span>
        </div>
        <div className="identity-face identity-face--back" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', zIndex: isFlipped ? 1 : 0 }}>
          <span className="identity-kicker">PROFILE</span>
          <div className="identity-profile-row"><span>IDENTITY</span><strong>OMESH SIDDA</strong></div>
          <div className="identity-profile-row"><span>INTERESTS</span><strong>Web apps, Linux servers, and AI agents</strong></div>
          <span className="identity-flip">TAP TO FLIP</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function HomePage() {
  return (
    <div className="portfolio-page min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="portfolio-header">
        <nav aria-label="Main navigation" className="portfolio-nav">
          <a href="#home" className="portfolio-brand">Omesh Sidda</a>
          <div className="portfolio-nav-links">
            <a href="#about">About</a>
            <a href="mailto:omeshsidda@gmail.com" className="contact-link">Contact <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>
      <main>
        <section id="home" aria-label="Introduction" className="hero-section">
          <div className="hero-content">
            <h1 className="hero-name">OMESH<br />SIDDA</h1>
            <div className="hero-card-wrap"><HeroIdCard /></div>
          </div>
          <a href="#about" className="scroll-cue"><span>SCROLL</span><span aria-hidden="true" className="scroll-arrow">↓</span></a>
        </section>

        <section id="about" aria-labelledby="about-title" className="about-section">
          <div className="section-inner about-layout">
            <h2 id="about-title" className="about-title">I build web apps and work with Linux servers.</h2>
            <div className="about-copy">
              <p>I’m Omesh Sidda, a first-year B.Tech student in Computer Science and Engineering at GPCET. Outside class, I build web apps and experiment with AI agents on remote Linux servers.</p>
              <a href="mailto:omeshsidda@gmail.com" className="lime-link">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title" className="education-section">
          <div className="section-inner">
            <h2 id="education-title" className="section-title">Education</h2>
            <div className="education-record">
              <p className="education-level">B.Tech · First year</p>
              <div className="education-details">
                <h3>Computer Science and Engineering</h3>
                <p>G Pullaiah College of Engineering and Technology (GPCET), Kurnool</p>
                <a href="https://www.gpcet.ac.in/cse_home/">Visit the CSE department <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="skills-section">
          <div className="section-inner">
            <h2 id="skills-title" className="section-title">Skills</h2>
            <ul className="skills-list">
              {skills.map(({ title, description }) => (
                <li key={title} className="skill-item">
                  <span aria-hidden="true" className="skill-mark">//</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="portfolio-footer">
        <a href="#home">Omesh Sidda</a>
        <a href="https://github.com/omeshsidda-ui">GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}
