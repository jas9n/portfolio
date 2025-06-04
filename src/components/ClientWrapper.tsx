'use client';

import Hero from './Hero';
import GitHubActivity from './GitHubActivity';
import Skills from './Skills';
import Resume from './Resume';
import Projects from './Projects';

export default function ClientWrapper() {
  return (
    <>
      <Hero />
      <GitHubActivity />
      <Projects />
      <Skills />
      <Resume />
    </>
  );
} 