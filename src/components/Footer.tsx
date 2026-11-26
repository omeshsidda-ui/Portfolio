import IndiaTime from './IndiaTime';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-info">
          Omesh Sidda · Kurnool, India · <IndiaTime />
        </p>
        <div className="footer-links">
          <a href="mailto:omeshsidda@gmail.com">omeshsidda@gmail.com</a>
          <a
            href="https://github.com/omeshsidda-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
