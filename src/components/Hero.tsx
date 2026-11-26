import CopyEmail from './CopyEmail';
import Icon from './Icon';
import IndiaTime from './IndiaTime';
import Instrument from './Instrument';

export default function Hero() {
  return <section id="home" aria-labelledby="hero-title">
    <div className="hero">
      <div className="hero-text">
        <p className="online"><span />Workbench online</p>
        <h1 id="hero-title">Omesh <em>Sidda<span aria-hidden="true">.</span></em></h1>
        <p className="intro">I build software for the web and the systems underneath it.</p>
        <div className="hero-actions"><a className="button primary" href="#projects">View projects <Icon name="down" /></a><CopyEmail /></div>
      </div>
      <Instrument />
    </div>
    <div className="location"><span><Icon name="pin" /> Kurnool, India</span><span><Icon name="clock" /> <IndiaTime /></span></div>
  </section>;
}
