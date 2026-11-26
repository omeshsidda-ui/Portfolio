import Icon from '../components/Icon';
import { projects, type ProjectData } from '../data/projects';
import { Link } from '../router';

export default function ProjectPage({ project }: { project: ProjectData }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <>
      <section className="page-hero" aria-labelledby="project-page-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <p className="online">
          <span />
          {project.fig} · {project.category}
        </p>

        <h1 id="project-page-title" className="page-title">
          {project.title}
          <span className="period" aria-hidden="true">.</span>
        </h1>
        <p className="page-lead">{project.lead}</p>

        <div className="page-actions">
          <a className="button primary" href={project.live} target="_blank" rel="noreferrer">
            Live app <Icon name="diagonal" />
          </a>
          <a className="button-link" href={project.github} target="_blank" rel="noreferrer">
            GitHub repository <Icon name="diagonal" />
          </a>
          <Link className="button-link" href="/#projects">
            All projects
          </Link>
        </div>
      </section>

      <section className={'case-showcase ' + project.tone} aria-label={`${project.title} screenshot`}>
        <figure className="proof">
          <figcaption className="proof-label">
            <span>{project.fig}</span>
            <span>{project.category}</span>
          </figcaption>
          <div className="project-screen">
            <img
              loading="eager"
              src={project.image}
              width={1280}
              height={800}
              alt={project.alt}
            />
          </div>
        </figure>
      </section>

      <section className="section case-study-grid" aria-labelledby="overview-heading">
        <div className="case-study-main">
          <div className="case-block">
            <h2 id="overview-heading">
              Overview<span className="period" aria-hidden="true">.</span>
            </h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="case-block">
            <h2>
              {project.architectureTitle}
              <span className="period" aria-hidden="true">.</span>
            </h2>
            <ul className="case-list">
              {project.architecture.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="spec-card" aria-label="Technical specifications">
          <div className="education-label">Technical profile</div>
          <dl className="spec-list">
            {project.specs.map((spec) => (
              <div className="spec-row" key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <div className="spec-tags">
            <span className="education-label">Stack</span>
            <ul className="tags" aria-label="Technologies">
              {project.tech.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <nav className="project-pager" aria-label="More projects">
        {previous ? (
          <Link href={previous.path} className="pager-link">
            <span className="pager-dir">Previous · {previous.fig}</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <Link href="/#projects" className="pager-link">
            <span className="pager-dir">Index</span>
            <strong>All selected work</strong>
          </Link>
        )}

        {next ? (
          <Link href={next.path} className="pager-link pager-next">
            <span className="pager-dir">Next · {next.fig}</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link href="/about" className="pager-link pager-next">
            <span className="pager-dir">Profile</span>
            <strong>About Omesh Sidda</strong>
          </Link>
        )}
      </nav>
    </>
  );
}
