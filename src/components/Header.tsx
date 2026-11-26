import { useEffect, useState } from 'react';
import { getProjectByPath } from '../data/projects';
import { Link, useRouter } from '../router';
import Icon from './Icon';

type Theme = 'light' | 'dark';
function savedTheme() {
  try { return localStorage.getItem('omesh-theme'); } catch { return null; }
}
function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const stored = savedTheme();
      const value = stored === 'light' || stored === 'dark' ? stored : media.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = value;
      setTheme(value);
    };
    sync();
    window.addEventListener('storage', sync);
    const systemChange = () => { if (!savedTheme()) sync(); };
    media.addEventListener('change', systemChange);
    return () => {
      window.removeEventListener('storage', sync);
      media.removeEventListener('change', systemChange);
    };
  }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('omesh-theme', next); } catch { /* Keep the session choice. */ }
  }
  return <button className="theme-switch" role="switch" aria-label="Dark theme" aria-checked={theme === 'dark'} onClick={toggle}>
    <span className="theme-track"><Icon name="sun" /><Icon name="moon" /></span>
  </button>;
}

export default function Header() {
  const { path } = useRouter();
  const isWorkActive = Boolean(getProjectByPath(path));
  const isAboutActive = path === '/about';

  return <header id="top" className="header shell">
    <Link className="brand" href="/"><Icon name="wave" /><strong>Omesh Sidda</strong><span>/</span><i>Workbench</i></Link>
    <nav className="section-nav" aria-label="Primary">
      <Link href="/#projects" className={isWorkActive ? 'active' : undefined}>Work</Link>
      <Link href="/about" aria-current={isAboutActive ? 'page' : undefined} className={isAboutActive ? 'active' : undefined}>About</Link>
      <a href="#contact">Contact</a>
    </nav>
    <ThemeSwitch />
  </header>;
}
