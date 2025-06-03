'use client';

import Hero from './Hero';
import GitHubActivity from './GitHubActivity';
import Skills from './Skills';
import Resume from './Resume';

export default function ClientWrapper() {
  return (
    <>
      <Hero />
      <GitHubActivity />
      <Skills />
      <Resume />
    </>
  );
} 