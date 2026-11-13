import React, { useRef, useState } from 'react';
import HeroParticles from './HeroParticles';
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

  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateXNum = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateYMouse = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const flipSpring = useSpring(0, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(rotateXNum, (v) => `${v}deg`);
  const rotateY = useTransform([rotateYMouse, flipSpring], ([m, f]) => {
    const mVal = typeof m === 'number' ? m : 0;
    const fVal = typeof f === 'number' ? f : 0;
    return `${mVal + fVal}deg`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    flipSpring.set(next ? 180 : 0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={isFlipped ? 'Flip ID Card to Front' : 'Flip ID Card to System Profile'}
      aria-pressed={isFlipped}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? (isFlipped ? 180 : 0) : rotateY,
        willChange: 'transform',
      }}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative w-full h-full rounded-3xl cursor-pointer group bg-neutral-900 border border-neutral-800 p-1.5 shadow-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 10 : 20,
          }}
        >
          <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0a0a0a] border border-white/10">
            <div className="absolute inset-0 z-10 flex items-end justify-center group-hover:scale-[1.02] transition-transform duration-500">
              <div className="relative w-full h-full">
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-neutral-800 text-[clamp(5rem,16vh,10rem)] font-black tracking-tighter text-white/80">OS</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-40 p-6 flex flex-col justify-end pb-8 pointer-events-none">
              <div className="font-sans text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.05] drop-shadow-lg">
                <div className="font-mono text-white/85 text-[10px] md:text-[11px] tracking-[0.25em] mb-3 font-semibold uppercase">
                  STUDENT · PORTFOLIO
                </div>
                <div>OMESH</div>
                <div>SIDDA</div>
                <div className="mt-3 flex items-center gap-2 font-mono text-white/70 text-[10px] tracking-[0.2em] font-medium uppercase">
                  <span className="inline-block w-6 h-px bg-white/60" />
                  TAP TO FLIP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face — System Profile */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 20 : 10,
          }}
        >
          <div className="relative w-full h-full bg-[#050505] rounded-[20px] overflow-hidden border border-white/10 p-6 flex flex-col">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="flex justify-between items-center border-b border-white/10 pb-4 z-20">
              <span className="text-[10px] font-mono tracking-widest text-white/50">
                PROFILE
              </span>
              <div className="px-2 py-0.5 border border-white/20 text-[8px] font-mono tracking-widest text-white/70">
                TAP TO FLIP
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-5 z-20 flex-grow">
              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  IDENTITY
                </p>
                <p className="text-xs font-sans font-bold tracking-widest text-white uppercase">
                  OMESH SIDDA
                </p>
              </div>

              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">Interests</p>
                <p className="text-sm font-semibold text-white">Web apps, Linux servers, and AI agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="absolute top-0 z-20 w-full px-6 py-6 md:px-12 md:py-8">
        <nav aria-label="Main navigation" className="flex items-center justify-between gap-4">
          <a href="#home" className="text-sm font-bold tracking-widest uppercase sm:text-lg">Omesh Sidda</a>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="#about">About</a>
            <a href="mailto:omeshsidda@gmail.com" className="rounded-full bg-primary px-4 py-2 text-primary-foreground">Contact</a>
          </div>
        </nav>
      </header>
      <main>
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-[120px] pt-[80px]"
      >
        <HeroParticles />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0 py-24 md:py-0">
          <h1 className="text-[clamp(3rem,13vw,8rem)] md:text-[clamp(6rem,min(15vw,35vh),20rem)] font-black text-foreground/60 whitespace-nowrap tracking-tighter leading-[0.8] select-none motion-safe:animate-[pulse_3s_ease-in-out_infinite]">
            OMESH SIDDA
          </h1>
        </div>

        {/* Center Hanging 3D ID Card */}
        <div className="relative z-10 flex flex-col items-center mt-12">
          <div className="origin-top transition-all duration-500 ease-out flex justify-center">
            <div className="w-[85vw] max-w-[350px] aspect-[2/3] md:max-w-none md:w-auto md:h-[65vh] md:min-h-[450px] md:max-h-[800px] 2xl:h-[70vh]">
              <HeroIdCard />
            </div>
          </div>
        </div>

        <a href="#about" className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2 text-foreground font-mono">
          <span className="text-[10px] tracking-[0.3em] font-bold">SCROLL</span>
          <span aria-hidden="true" className="w-px h-8 md:h-12 bg-foreground" />
        </a>
      </section>



      <section id="about" className="relative pt-16 pb-32 md:py-32 px-4 md:px-6 overflow-hidden bg-background">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-type text-3xl md:text-5xl lg:text-7xl font-black text-primary tracking-tight leading-[1.05] mb-10 inline-block">
            <span className="text-type__content">
              I build web apps and work with Linux servers.
            </span>
            <span className="text-type__cursor">|</span>
          </h2>

          <p
            className="text-lg md:text-2xl lg:text-3xl font-medium text-foreground/90 leading-relaxed max-w-4xl mx-auto mb-12 md:mb-0"
          >
            I’m Omesh Sidda, a first-year B.Tech student in Computer Science and Engineering at GPCET.
            Outside class, I build web apps and experiment with AI agents on remote Linux servers.
          </p>
        </div>

          <a href="mailto:omeshsidda@gmail.com" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground">
            Get in touch <span aria-hidden="true" className="ml-2">↗</span>
          </a>
      </section>

      <section id="education" aria-labelledby="education-title" className="border-t border-white/10 bg-[#050505] px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 id="education-title" className="text-4xl font-black tracking-tight md:text-5xl">Education</h2>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-8">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-white/70">B.Tech · First year</p>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Computer Science and Engineering</h3>
            <p className="mt-3 text-white/70">G Pullaiah College of Engineering and Technology (GPCET), Kurnool</p>
            <a className="mt-5 inline-block font-semibold underline underline-offset-4" href="https://www.gpcet.ac.in/cse_home/">Visit the CSE department <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-title" className="border-t border-white/10 bg-[#050505] px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 id="skills-title" className="mb-8 text-4xl font-black tracking-tight md:text-5xl">Skills</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ title, description }) => (
              <li key={title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6">
                <h3 className="mb-2 text-xl font-bold tracking-tight">{title}</h3>
                <p className="leading-relaxed text-white/70">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </main>
      <footer className="flex justify-between border-t px-6 py-6 text-sm md:px-12">
        <a href="#home">Omesh Sidda</a>
        <a href="https://github.com/omeshsidda-ui">GitHub ↗</a>
      </footer>
    </div>
  );
}
