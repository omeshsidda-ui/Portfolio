import Icon from './Icon';

const projects = [
  {
    title: 'MindGraph', category: 'Knowledge tool', tone: 'sage', image: '/projects/mindgraph.png',
    alt: 'MindGraph showing three levels of branches around How the Internet Works',
    description: 'Turn a topic, pasted notes, or a captioned YouTube video into an interactive three-level mind map.',
    tech: ['Next.js', 'React Flow', 'AI'],
    notes: 'Explore the connections on the canvas, export the map as a PNG, or take its outline with you as Markdown.',
    live: 'https://mind-graph-nine.vercel.app', github: 'https://github.com/omeshsidda-ui/MindGraph',
  },
  {
    title: 'pam.io', category: 'Browser game', tone: 'apricot', image: '/projects/pam-io.png',
    alt: 'pam.io snake arena start screen with the Viper skin selected',
    description: 'A browser snake arena with five bot personalities and a King Cobra boss to hunt.',
    tech: ['TypeScript', 'Canvas', 'Game'],
    notes: 'Steer with the mobile joystick, hunt the boss, and unlock up to 12 skins as you play.',
    live: 'https://pam-io.vercel.app', github: 'https://github.com/omeshsidda-ui/pam.io',
  },
];

export default function Projects() {
  return <section id="projects" className="work section" aria-labelledby="projects-heading">
    <h2 id="projects-heading">Selected work<span className="period" aria-hidden="true">.</span></h2>
    <div className="projects section-columns">{projects.map((project, i) =>
      <article className={'project ' + project.tone} key={project.title}>
        <figure className="proof">
          <figcaption className="proof-label"><span>Fig. 0{i + 1}</span><span>{project.category}</span></figcaption>
          <div className="project-screen"><img loading="lazy" src={project.image} width="1280" height="800" alt={project.alt} /></div>
        </figure>
        <div className="project-info"><h3>{project.title}</h3>
          <ul className="tags" aria-label="Technologies">{project.tech.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <p>{project.description}</p>
          <details className="notes"><summary>Build notes <Icon name="plus" /></summary><p>{project.notes}</p></details>
          <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer">Live app <Icon name="diagonal" /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <Icon name="diagonal" /></a></div>
        </div>
      </article>
    )}</div>
  </section>;
}
