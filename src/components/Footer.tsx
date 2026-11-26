import CopyEmail, { email } from './CopyEmail';
import Icon from './Icon';

export default function Footer() {
  return <footer id="contact" className="shell">
    <div className="contact">
      <h2>Get in touch<span className="period" aria-hidden="true">.</span></h2>
      <div className="contact-row">
        <a className="email" href={'mailto:' + email}>{email}<Icon name="diagonal" /></a>
        <div className="contact-links">
          <CopyEmail /><a href="https://github.com/omeshsidda-ui" target="_blank" rel="noreferrer">GitHub <Icon name="diagonal" /></a>
        </div>
      </div>
    </div>
    <div className="colophon"><span><Icon name="wave" /> Omesh Sidda</span><a href="#home">Back to top ↑</a></div>
  </footer>;
}
