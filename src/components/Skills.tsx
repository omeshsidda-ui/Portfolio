import { site } from '../data/site';
import Icon from './Icon';
import { Symbol } from './Symbol';

export default function Skills() {
  return (
    <section id="skills" className="skills section section-columns" aria-labelledby="skills-heading">
      <h2 id="skills-heading">
        Capabilities<span className="period" aria-hidden="true">.</span>
      </h2>
      <div className="skill-list">
        {site.capabilities.map((skill) => (
          <details key={skill.name} name="capability">
            <summary>
              <Symbol name={skill.icon} />
              {skill.name}
              <Icon name="plus" />
            </summary>
            <p>{skill.summary}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
