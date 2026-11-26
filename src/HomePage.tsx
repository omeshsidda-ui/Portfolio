import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function HomePage() {
  return <>
    <a href="#main" className="skip">Skip to content</a>
    <Header />
    <main id="main" className="shell" tabIndex={-1}>
      <Hero /><Projects /><About /><Skills />
    </main>
    <Footer />
  </>;
}
