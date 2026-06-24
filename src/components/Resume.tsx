'use client';

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type ResumeItem = {
  role: string;
  company: string;
  period: string;
  description: string[];
};

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const ResumeSection = ({ title, items }: { title: string; items: ResumeItem[] }) => {
  return (
    <motion.div variants={itemVariants}>
      <div className="mb-5 flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.article
            key={index}
            variants={itemVariants}
            className="relative rounded-lg bg-gray-50 p-6 shadow-sm"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                  {item.company}
                </p>
                <h4 className="text-xl font-bold text-gray-900">{item.role}</h4>
              </div>
              <span className="w-fit shrink-0 whitespace-nowrap rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-700 sm:text-right">
                {item.period}
              </span>
            </div>
            <ul className="space-y-3 text-gray-700">
              {item.description.map((desc, i) => (
                <li key={i} className="flex gap-3 leading-7">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experience = [
    {
      role: 'Technology Summer Analyst',
      company: 'Accenture',
      period: 'June 2026 - Aug. 2026',
      description: [
        'Supporting technical delivery for a leading frontier AI hyperscaler client.',
        'Collaborating with cross-functional consulting and engineering teams in an Agile environment to build and ship solutions across the client platform.',
      ],
    },
    {
      role: 'Software Developer Intern',
      company: 'Nestingale',
      period: 'May 2025 - Aug. 2025',
      description: [
        'Developed and maintained internal full-stack tools used by 20+ team members to manage supplier data, reducing manual data configuration by ~40% and accelerating supplier onboarding workflows.',
        'Designed CMS pages and frontend features that improved data visibility and navigation, reducing workflow friction by ~30%.',
        'Delivered 1-2 feature enhancements per weekly sprint across Agile teams while incorporating stakeholder feedback.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Jag International Trim',
      period: 'June 2024 - Aug. 2024',
      description: [
        'Developed a visually dynamic website with interactive graphics and animations, improving user engagement and overall usability across key pages.',
        'Implemented an AWS-based email reception pipeline that automated inbound email handling, reducing manual processing by ~40-50%.',
      ],
    },
  ];

  const education = [
    {
      role: 'B.S. in Computer Science; B.S. in Applied Mathematics & Statistics',
      company: 'Stony Brook University',
      period: 'Aug. 2023 - May 2027',
      description: [
        'Double Major, GPA: 3.3/4.0',
        'Coursework: Object-Oriented Programming, Data Structures & Algorithms, Programming Abstractions, System Fundamentals, Data Analysis, Theory of Computation, Software Engineering Principles.',
      ],
    },
  ];

  return (
    <section id="resume" className="bg-white py-16 md:py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
                Resume
              </p>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                Experience, education, and the teams that shaped how I build.
              </h2>
            </div>
            <a
              href="/Jason Chen.pdf"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
              download
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Download CV
            </a>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <ResumeSection title="Experience" items={experience} />
            <ResumeSection title="Education" items={education} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
