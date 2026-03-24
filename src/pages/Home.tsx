import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Services from '../components/Services';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <Process />
      <Services />
      <Contact />
    </>
  );
}
