import FadeIn from './FadeIn';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="section-inner">
        <FadeIn>
          <div className="about-grid">
            <div>
              <p className="section-kicker">About</p>
              <h2 id="about-title" className="section-heading">
                A little about me
              </h2>
            </div>
            <div className="about-prose">
              <p>
                I’m Omesh Sidda, a first-year B.Tech student in Computer Science and
                Engineering at GPCET. Outside class, I build web apps and experiment
                with AI agents on remote Linux servers.
              </p>
              <p>
                This portfolio is one of the ways I learn web development. I tested
                the layout on my iPhone and learned how to connect my own domain to
                Firebase Hosting.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
