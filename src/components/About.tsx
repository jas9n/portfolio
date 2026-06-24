'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const highlights = [
  {
    value: 'Accenture',
    label: 'enterprise workflow automation',
  },
  {
    value: 'Nestingale',
    label: 'AI product development',
  },
  {
    value: 'CS + AMS',
    label: 'Stony Brook double major',
  },
  {
    value: 'Full-stack',
    label: 'frontend, APIs, data, automation',
  },
];

const focusAreas = [
  'I like making ideas real',
  'I care about clean workflows',
  'I am always picking up new tools',
  'I collaborate comfortably across teams and users',
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              About
            </p>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              I build practical, polished software that turns messy workflows into products people can actually use.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-5 text-base leading-7 text-gray-700">
              <p>
                I am a software engineer and Computer Science plus Applied Mathematics & Statistics double major at Stony Brook University. My work sits between full-stack engineering, product thinking, and clean user experience, from internal tools that speed up operations to interactive web apps and mobile products.
              </p>
              <p>
                At Accenture, I am supporting technical delivery for a frontier AI hyperscaler client, collaborating across consulting and engineering teams to ship platform solutions in an Agile environment. At Nestingale, I built tools used by 20+ team members and reduced manual supplier setup by about 40%. Outside of work, I am continuing to build wandr, an iOS travel platform with trip planning, social sharing, geolocation, and LLM-powered local insights.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.label}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg bg-gray-50 p-5 shadow-sm"
                >
                  <div className="mb-2 text-2xl font-bold text-emerald-500 md:text-3xl">
                    {highlight.value}
                  </div>
                  <p className="text-sm font-medium leading-6 text-gray-700">
                    {highlight.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
