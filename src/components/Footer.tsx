import { projects } from '../data/projects';
import { site } from '../data/site';
import { Link } from '../router';
import CopyEmail, { email } from './CopyEmail';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer id="contact" className="shell">
      <div className="contact">
        <h2>
          Get in touch<span className="period" aria-hidden="true">.</span>
        </h2>
        <div className="contact-row">
          <a className="email" href={'mailto:' + email}>
            {email}
            <Icon name="diagonal" />
          </a>
          <div className="contact-links">
            <CopyEmail />
            {site.socialProfiles.map((profile) => (
              <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer">
                {profile.label} <Icon name="diagonal" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="footer-nav" aria-label="Footer">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {projects.map((project) => (
          <Link key={project.slug} href={project.path}>
            {project.title}
          </Link>
        ))}
      </nav>

      <div className="colophon">
        <span>
          <Icon name="wave" /> {site.person.name}
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
