import { useEffect, useRef, useState } from 'react';
import { Symbol } from './Symbol';

const EMAIL = 'omeshsidda@gmail.com';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" aria-labelledby="hero-title" className="hero">
      <div className="hero-inner">
        <p className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          B.Tech CSE · GPCET · Kurnool
        </p>
        <h1 id="hero-title" className="hero-title">
          Building web apps,<br />
          Linux systems, and <em className="whitespace-nowrap">AI agents.</em>
        </h1>
        <p className="hero-body">
          First-year Computer Science and Engineering student at GPCET.
          I work with headless servers, Hermes agents, and web scraping tools.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View projects
          </a>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={copyEmail}
            aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${EMAIL}`}
          >
            <span className="copy-label-stack">
              <span className={copied ? 'invisible' : undefined} aria-hidden={copied || undefined}>
                {EMAIL}
              </span>
              <span
                className={copied ? 'copy-copied-label' : 'copy-copied-label invisible'}
                aria-hidden={!copied || undefined}
              >
                Copied
              </span>
            </span>
            <Symbol name={copied ? 'check' : 'copy'} className="h-4 w-4 shrink-0" />
          </button>
          <a
            href="https://github.com/omeshsidda-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-github-link"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
