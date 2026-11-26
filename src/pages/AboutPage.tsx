import Icon from '../components/Icon';
import { Symbol } from '../components/Symbol';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { Link } from '../router';

export default function AboutPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="about-page-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <p className="online">
          <span />
          {site.person.location}
        </p>
        <h1 id="about-page-title" className="page-title">
          About {site.person.shortName} <em>{site.person.familyName}<span aria-hidden="true">.</span></em>
        </h1>
        <p className="page-lead">
          {site.person.bio}
        </p>
        <div className="page-actions">
          <Link className="button primary" href="/#projects">
            Explore projects <Icon name="down" />
          </Link>
          <a href="#contact" className="button-link">
            Get in touch <Icon name="diagonal" />
          </a>
        </div>
      </section>

      <section className="section section-columns about-detail" aria-labelledby="background-heading">
        <div className="prose-column">
          <h2 id="background-heading">
            Background<span className="period" aria-hidden="true">.</span>
          </h2>
          <p className="about-lead">
            My work tends to start with a question about how something works—from browser canvases to remote Linux hosts.
          </p>
          <p>
            I am Omesh Sidda (also known as Omesh), a first-year B.Tech Computer Science and Engineering student at{' '}
            {site.education.institution} ({site.education.shortInstitution}) in {site.education.location}.
          </p>
          <p>
            Outside coursework, I build web applications with Next.js, React, and TypeScript, test mobile layouts on my
            iPhone, and operate Hermes AI agents on headless Linux servers. Connecting this portfolio from local React
            prerendering to custom DNS and Firebase Hosting is part of the same habit of learning every layer end to end.
          </p>
        </div>

        <aside className="education">
          <div className="education-label">
            <Icon name="book" /> Education
          </div>
          <p className="degree">
            Computer Science
            <br />
            &amp; Engineering
          </p>
          <p>
            {site.education.year}, {site.education.degree} at {site.education.institution} ({site.education.shortInstitution}),{' '}
            {site.education.location}.
          </p>
          <a href={site.education.departmentUrl} target="_blank" rel="noreferrer">
            CSE department <Icon name="diagonal" />
          </a>
        </aside>
      </section>

      <section className="section about-capabilities" aria-labelledby="workbench-capabilities-heading">
        <div className="section-head">
          <h2 id="workbench-capabilities-heading">
            Workbench capabilities<span className="period" aria-hidden="true">.</span>
          </h2>
          <p className="section-sub">Core areas I work in across frontend software, Linux hosts, and data pipelines.</p>
        </div>
        <div className="capabilities-grid">
          {site.capabilities.map((item) => (
            <article className="capability-card" key={item.name}>
              <div className="capability-head">
                <Symbol name={item.icon} />
                <h3>{item.name}</h3>
              </div>
              <p className="capability-summary">{item.summary}</p>
              <p className="capability-detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-projects" aria-labelledby="case-studies-heading">
        <div className="section-head">
          <h2 id="case-studies-heading">
            Project case studies<span className="period" aria-hidden="true">.</span>
          </h2>
          <p className="section-sub">Detailed breakdowns of what I have built and shipped.</p>
        </div>
        <div className="case-study-links">
          {projects.map((project) => (
            <article className="case-link-card" key={project.slug}>
              <span className="proof-meta">{project.fig} · {project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link href={project.path} className="inline-action">
                Read case study <Icon name="diagonal" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
