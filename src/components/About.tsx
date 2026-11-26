import { site } from '../data/site';
import { Link } from '../router';
import Icon from './Icon';

export default function About() {
  return (
    <section id="about" className="about section section-columns" aria-labelledby="about-title">
      <div>
        <h2 id="about-title">
          A little about me<span className="period" aria-hidden="true">.</span>
        </h2>
        <p className="about-lead">
          My work tends to start with a question about how something works.
        </p>
        <p>
          I&apos;m {site.person.name} ({site.person.shortName}), a first-year B.Tech Computer Science and Engineering student at{' '}
          {site.education.shortInstitution} in {site.person.location}. Outside class, I build web apps and run Hermes agents on headless Linux servers—and this portfolio took me from testing layouts on my iPhone to connecting my own domain to Firebase Hosting.
        </p>
        <Link href="/about" className="inline-action">
          More about Omesh &amp; my workbench <Icon name="diagonal" />
        </Link>
      </div>
      <aside id="education" className="education">
        <div className="education-label">
          <Icon name="book" /> Education
        </div>
        <p className="degree">
          Computer Science
          <br />
          &amp; Engineering
        </p>
        <p>
          {site.education.year} at {site.education.institution} ({site.education.shortInstitution}), {site.education.location}.
        </p>
        <a href={site.education.departmentUrl} target="_blank" rel="noreferrer">
          CSE department <Icon name="diagonal" />
        </a>
      </aside>
    </section>
  );
}
