import Icon from './Icon';

export default function About() {
  return <section id="about" className="about section section-columns" aria-labelledby="about-title">
    <div><h2 id="about-title">A little about me<span className="period" aria-hidden="true">.</span></h2>
      <p className="about-lead">My work tends to start with a question about how something works.</p>
      <p>Outside class, I build web apps and run Hermes agents on headless Linux servers. This portfolio took me from testing layouts on my iPhone to connecting my own domain to Firebase Hosting.</p>
    </div>
    <aside id="education" className="education">
      <div className="education-label"><Icon name="book" /> Education</div>
      <p className="degree">Computer Science<br />&amp; Engineering</p>
      <p>First-year B.Tech student at G Pullaiah College of Engineering and Technology (GPCET), Kurnool.</p>
      <a href="https://www.gpcet.ac.in/cse_home/" target="_blank" rel="noreferrer">CSE department <Icon name="diagonal" /></a>
    </aside>
  </section>;
}
