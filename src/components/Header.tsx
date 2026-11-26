export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#home" className="header-name">
          Omesh Sidda
        </a>
        <nav aria-label="Page sections" className="header-nav">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#skills" className="hidden sm:inline-flex">
            Skills
          </a>
          <a href="mailto:omeshsidda@gmail.com">Contact</a>
        </nav>
      </div>
    </header>
  );
}
