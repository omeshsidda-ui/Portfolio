import FadeIn from './FadeIn';
import { Symbol, type SymbolName } from './Symbol';

interface Skill {
  title: string;
  desc: string;
  icon: SymbolName;
}

const skills: Skill[] = [
  {
    title: 'Web development',
    desc: 'I build web apps and turn ideas into interfaces people can use.',
    icon: 'code',
  },
  {
    title: 'Headless Linux servers',
    desc: 'Managing remote Linux machines and routine workflows with AI agents.',
    icon: 'server',
  },
  {
    title: 'Hermes agents',
    desc: 'Running autonomous Hermes agents in production day-to-day.',
    icon: 'spark',
  },
  {
    title: 'Networking',
    desc: 'I work with network configuration and troubleshoot connectivity.',
    icon: 'network',
  },
  {
    title: 'Reverse engineering',
    desc: 'I study how apps work by examining their behavior and structure.',
    icon: 'search',
  },
  {
    title: 'Web scraping',
    desc: 'I extract information from web pages and turn it into structured data.',
    icon: 'database',
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="section-inner">
        <FadeIn>
          <p className="section-kicker">Capabilities</p>
          <h2 id="skills-title" className="section-heading">
            Skills
          </h2>
          <ul className="skills-grid">
            {skills.map(({ title, desc, icon }) => (
              <li key={title} className="skill-cell">
                <Symbol name={icon} className="skill-icon" />
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
