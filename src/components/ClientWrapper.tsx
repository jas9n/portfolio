'use client';

import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Resume from './Resume';

export default function ClientWrapper() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Resume />
    </>
  );
} 