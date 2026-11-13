const skills = [
  { title: 'Web development', description: 'I build web apps and turn ideas into interfaces people can use.' },
  { title: 'Headless Linux servers', description: 'I manage remote Linux servers and use AI agents to help with routine administration.' },
  { title: 'Hermes agents', description: 'I run Hermes agents on remote servers and use them in my day-to-day workflows.' },
  { title: 'Networking', description: 'I work with network configuration and troubleshoot connectivity.' },
  { title: 'Reverse engineering', description: 'I study how apps work by examining their behavior and structure.' },
  { title: 'Web scraping', description: 'I extract information from web pages and turn it into structured data.' },
];

export default function HomePage() {
  return (
    <div className="portfolio-page">
      <header className="site-header">
        <nav aria-label="Main navigation" className="site-nav">
          <a href="#home" className="brand-link" aria-label="Omesh Sidda, home"><span className="brand-mark">OS</span><span className="brand-name">Omesh Sidda</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="mailto:omeshsidda@gmail.com" className="nav-contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" aria-labelledby="hero-title" className="hero-section">
          <div className="hero-inner">
            <h1 id="hero-title" className="hero-name">OMESH<br />SIDDA</h1>
            <p className="hero-intro">I build web apps and work with Linux servers.</p>
            <a href="mailto:omeshsidda@gmail.com" className="hero-contact">Contact</a>
          </div>
          <a href="#about" className="hero-scroll">Scroll <span aria-hidden="true">↓</span></a>
        </section>

        <section id="about" aria-labelledby="about-title" className="about-section section-shell">
          <h2 id="about-title" className="section-heading">About</h2>
          <p className="about-copy">I’m Omesh Sidda, a first-year B.Tech student in Computer Science and Engineering at GPCET. Outside class, I build web apps and experiment with AI agents on remote Linux servers.</p>
        </section>

        <section id="education" aria-labelledby="education-title" className="education-section section-shell">
          <div className="section-heading-row"><h2 id="education-title" className="section-heading">Education</h2><span className="section-rule" aria-hidden="true" /></div>
          <div className="education-record">
            <p className="education-level">B.Tech <span>·</span> First year</p>
            <div className="education-details">
              <h3>Computer Science and Engineering</h3>
              <p>G Pullaiah College of Engineering and Technology (GPCET), Kurnool</p>
              <a href="https://www.gpcet.ac.in/cse_home/">Visit the CSE department <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="skills-section section-shell">
          <div className="section-heading-row"><h2 id="skills-title" className="section-heading">Skills</h2><span className="section-rule" aria-hidden="true" /></div>
          <ul className="skills-list">
            {skills.map(({ title, description }) => (
              <li className="skill-row" key={title}>
                <span aria-hidden="true" className="skill-bullet" />
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="footer-brand"><span className="brand-mark">OS</span>Omesh Sidda</a>
        <a href="https://github.com/omeshsidda-ui">GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}
