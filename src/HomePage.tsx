import { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';

const skills = [
  { title: 'Web development', description: 'I build web apps and turn ideas into interfaces people can use.', icon: 'code' },
  { title: 'Headless Linux servers', description: 'I manage remote Linux servers and use AI agents to help with routine administration.', icon: 'server' },
  { title: 'Hermes agents', description: 'I run Hermes agents on remote servers and use them in my day-to-day workflows.', icon: 'spark' },
  { title: 'Networking', description: 'I work with network configuration and troubleshoot connectivity.', icon: 'network' },
  { title: 'Reverse engineering', description: 'I study how apps work by examining their behavior and structure.', icon: 'search' },
  { title: 'Web scraping', description: 'I extract information from web pages and turn it into structured data.', icon: 'database' },
];

function CloudIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 16.2A4.5 4.5 0 0 0 18.6 7.4a6 6 0 0 0-11.5 1.4A4 4 0 0 0 7 17h12.5" />
    </svg>
  );
}

function Symbol({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  switch (name) {
    case 'home': return <svg {...common}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>;
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /></svg>;
    case 'education': return <svg {...common}><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" /></svg>;
    case 'code': return <svg {...common}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>;
    case 'server': return <svg {...common}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" /></svg>;
    case 'spark': return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" /></svg>;
    case 'network': return <svg {...common}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="m10.8 7.2-4.5 9.6m6.9-9.6 4.5 9.6M7.5 19h9" /></svg>;
    case 'search': return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
    case 'database': return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

function IndiaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return <span className="time-display" aria-label={time ? `India time ${time}` : 'India time'}>{time || 'IST'}</span>;
}

const dockItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'education', label: 'Education', icon: 'education' },
    { id: 'skills', label: 'Skills', icon: 'code' },
];

function FloatingDock() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = dockItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.32;
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      if (atPageEnd && sections.length) setActiveSection(sections[sections.length - 1].id);
      else if (current) setActiveSection(current.id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <nav aria-label="Page sections" className="floating-dock">
      {dockItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          aria-current={activeSection === item.id ? 'location' : undefined}
          title={item.label}
          onClick={() => setActiveSection(item.id)}
          className={`dock-icon${activeSection === item.id ? ' dock-icon-active' : ''}`}
        >
          <Symbol name={item.icon} />
          <span className="dock-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <a href="#main" className="skip-link">Skip to content</a>
      <div aria-hidden="true" className="cloud-field">
        <CloudIcon className="cloud cloud-a" />
        <CloudIcon className="cloud cloud-b" />
        <CloudIcon className="cloud cloud-c" />
        <CloudIcon className="cloud cloud-d" />
        <CloudIcon className="cloud cloud-e" />
      </div>
      <CustomCursor />

      <div className="flex justify-center w-full pt-6 px-4 sm:px-0 relative z-10">
        <div className="w-full sm:w-[80%] border border-black rounded-lg bg-white/60 backdrop-blur-sm">
          <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
            <a href="#home" className="site-wordmark text-xl sm:text-2xl font-black uppercase mb-2 sm:mb-0">Omesh Sidda</a>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hidden sm:inline header-study">B.Tech · CSE · GPCET</span>
              <span className="header-divider" aria-hidden="true" />
              <IndiaTime />
              <CloudIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
            </div>
          </header>
        </div>
      </div>

      <main id="main" tabIndex={-1} className="relative z-10">
        <section id="home" aria-labelledby="hero-title" className="grid grid-cols-1 md:grid-cols-5 items-center px-6 sm:px-12 md:px-24 lg:px-32 min-h-[80vh] relative pt-10 sm:pt-0">
          <div className="md:col-span-3">
            <h1 id="hero-title" className="hero-title text-5xl sm:text-7xl md:text-8xl leading-[0.9] mb-4 sm:mb-6">OMESH<br />SIDDA</h1>
            <p className="hero-statement text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">I build web apps and work with Linux servers.</p>
            <p className="hero-support text-lg sm:text-xl mb-8 sm:mb-10">Web apps, Linux servers, and AI agents.</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="#education" className="rounded-button hero-button px-6 sm:px-8 md:px-10 py-2.5 sm:py-3">Education</a>
              <a href="mailto:omeshsidda@gmail.com" className="rounded-button hero-button px-6 sm:px-8 md:px-10 py-2.5 sm:py-3">Get in touch</a>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center items-center mt-12 md:mt-0">
            <div className="music-player-container profile-record">
              <div className="vinyl-record" aria-hidden="true">
                <div className="vinyl-label"><span className="vinyl-monogram">OS</span></div>
              </div>
              <div className="record-copy">
                <p className="track-name">Omesh Sidda</p>
                <p>Web apps · Linux servers · AI agents</p>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute top-2 right-6 sm:top-12 sm:right-8 md:top-24 md:right-24 bg-white rounded-full p-0.5 sm:p-1 border border-black">
            <div className="rounded-full bg-black text-white p-1.5 sm:p-2 flex items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] text-sm sm:text-base md:text-lg">★</div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className="portfolio-section px-6 sm:px-12 md:px-24 lg:px-32 py-16 md:py-24">
          <div className="section-intro">
            <p className="section-kicker">About</p>
            <h2 id="about-title" className="section-title">A little about me</h2>
          </div>
          <div className="about-card">
            <div className="section-icon"><Symbol name="user" className="h-8 w-8" /></div>
            <p>I’m Omesh Sidda, a first-year B.Tech student in Computer Science and Engineering at GPCET. Outside class, I build web apps and experiment with AI agents on remote Linux servers.
              <br />
              <br />
              This portfolio is one of the ways I learn web development. I tested the layout on my iPhone and learned how to connect my own domain to Firebase Hosting.
            </p>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title" className="portfolio-section px-6 sm:px-12 md:px-24 lg:px-32 py-16 md:py-24">
          <div className="section-intro">
            <p className="section-kicker">Education</p>
            <h2 id="education-title" className="section-title">Computer Science and Engineering</h2>
          </div>
          <article className="education-card">
            <div className="section-icon"><Symbol name="education" className="h-8 w-8" /></div>
            <div>
              <p className="education-level">B.Tech <span>·</span> First year</p>
              <h3>Computer Science and Engineering</h3>
              <p className="education-school">G Pullaiah College of Engineering and Technology (GPCET), Kurnool</p>
              <a className="department-link" href="https://www.gpcet.ac.in/cse_home/">Visit the CSE department <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="portfolio-section px-6 sm:px-12 md:px-24 lg:px-32 py-16 md:py-24">
          <div className="section-intro">
            <p className="section-kicker">Toolbox</p>
            <h2 id="skills-title" className="section-title">Skills</h2>
          </div>
          <ul className="skills-grid">
            {skills.map(({ title, description, icon }) => (
              <li className="skill-card" key={title}>
                <span className="skill-icon"><Symbol name={icon} className="h-6 w-6" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer px-6 sm:px-12 md:px-24 lg:px-32 py-6">
        <a href="#home" className="site-wordmark">Omesh Sidda</a>
        <a href="https://github.com/omeshsidda-ui">GitHub <span aria-hidden="true">↗</span></a>
      </footer>
      <FloatingDock />
    </div>
  );
}


