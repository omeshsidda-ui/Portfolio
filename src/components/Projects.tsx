import { projects } from '../data/projects';
import { Link } from '../router';
import Icon from './Icon';

export default function Projects() {
  return (
    <section id="projects" className="work section" aria-labelledby="projects-heading">
      <h2 id="projects-heading">
        Selected work<span className="period" aria-hidden="true">.</span>
      </h2>
      <div className="projects section-columns">
        {projects.map((project) => (
          <article
            className={'project ' + project.tone + (project.featured ? ' project-featured' : '')}
            key={project.slug}
          >
            <figure className="proof">
              <figcaption className="proof-label">
                <span>{project.fig}</span>
                <span>{project.category}</span>
              </figcaption>
              <div className="project-screen">
                <img
                  loading="lazy"
                  src={project.image}
                  width={1280}
                  height={800}
                  alt={project.alt}
                />
              </div>
            </figure>
            <div className="project-info">
              <h3>{project.title}</h3>
              <ul className="tags" aria-label="Technologies">
                {project.cardTech.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>{project.description}</p>
              <details className="notes">
                <summary>
                  Build notes <Icon name="plus" />
                </summary>
                <p>{project.notes}</p>
              </details>
              <div className="project-links">
                <Link href={project.path}>Case study</Link>
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live app <Icon name="diagonal" />
                </a>
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub <Icon name="diagonal" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
