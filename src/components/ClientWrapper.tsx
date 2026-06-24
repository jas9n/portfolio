'use client';

import Hero from './Hero';
import About from './About';
import Now from './Now';
import Skills from './Skills';
import Resume from './Resume';
import Projects from './Projects';

export default function ClientWrapper() {
  return (
    <>
      <Hero />
      <About />
      <Now />
      <Projects />
      <Skills />
      <Resume />
    </>
  );
} 
