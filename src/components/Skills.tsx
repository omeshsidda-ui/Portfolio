import { Symbol, type SymbolName } from './Symbol';
import Icon from './Icon';

const skills: [SymbolName, string, string][] = [
  ['code', 'Web development', 'I build browser interfaces and test how they feel on a phone.'],
  ['server', 'Headless Linux servers', 'I manage remote Linux machines from the command line and use them to run agents.'],
  ['spark', 'Hermes agents', 'I run Hermes agents on remote servers for day-to-day workflows.'],
  ['network', 'Networking', 'I configure networks and trace connectivity problems.'],
  ['search', 'Reverse engineering', 'I examine application behavior and structure to understand how software works.'],
  ['database', 'Web scraping', 'I extract information from web pages and turn it into structured data.'],
];

export default function Skills() {
  return <section id="skills" className="skills section section-columns" aria-labelledby="skills-heading">
    <h2 id="skills-heading">Capabilities<span className="period" aria-hidden="true">.</span></h2>
    <div className="skill-list">{skills.map(([icon, name, text]) =>
      <details key={name} name="capability"><summary><Symbol name={icon} />{name}<Icon name="plus" /></summary><p>{text}</p></details>
    )}</div>
  </section>;
}
