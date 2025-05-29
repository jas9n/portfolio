'use client';

import Header from './Header';
import Hero from './Hero';
import Timeline from './Timeline';
import Skills from './Skills';
import Resume from './Resume';

export default function ClientWrapper() {
  return (
    <>
      <Header />
      <Hero />
      <Timeline />
      <Skills />
      <Resume />
    </>
  );
} 