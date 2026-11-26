import FadeIn from './FadeIn';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  github: string;
}

const projects: Project[] = [
  {
    title: 'MindGraph',
    description:
      'Turns topics, pasted notes, or captioned YouTube videos into interactive 3-level mind maps with PNG and Markdown export.',
    image: '/projects/mindgraph.png',
    tech: ['Next.js', 'React Flow', 'AI'],
    live: 'https://mind-graph-nine.vercel.app',
    github: 'https://github.com/omeshsidda-ui/MindGraph',
  },
  {
    title: 'pam.io',
    description:
      'Browser snake arena with five bot personalities, a King Cobra boss hunt, 12 unlockable skins, and mobile joystick controls.',
    image: '/projects/pam-io.png',
    tech: ['TypeScript', 'Canvas', 'Game'],
    live: 'https://pam-io.vercel.app',
    github: 'https://github.com/omeshsidda-ui/pam.io',
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="section-inner">
        <FadeIn>
          <p className="section-kicker">Selected work</p>
          <h2 id="projects-title" className="section-heading">
            Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-image-frame">
                  <img
                    src={project.image}
                    alt={`${project.title} application screenshot`}
                    loading="lazy"
                  />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <ul className="project-tech" aria-label={`${project.title} technologies`}>
                    {project.tech.map((item) => (
                      <li key={item} className="tech-pill">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live App <span aria-hidden="true">↗</span>
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
