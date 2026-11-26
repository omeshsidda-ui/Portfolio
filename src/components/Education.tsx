import FadeIn from './FadeIn';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="section-inner">
        <FadeIn>
          <p className="section-kicker">Education</p>
          <h2 id="education-title" className="section-heading">
            Computer Science and Engineering
          </h2>
          <article className="education-entry">
            <p className="education-meta">
              B.Tech <span aria-hidden="true">·</span> First year
            </p>
            <h3 className="education-degree">Computer Science and Engineering</h3>
            <p className="education-school">
              G Pullaiah College of Engineering and Technology (GPCET), Kurnool
            </p>
            <a
              className="education-link"
              href="https://www.gpcet.ac.in/cse_home/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the CSE department <span aria-hidden="true">↗</span>
            </a>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
