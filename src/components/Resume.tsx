'use client';

import { motion } from 'framer-motion';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const ResumeSection = ({ title, items }: { title: string; items: Array<{ role: string; company: string; period: string; description: string[] }> }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h4 className="text-xl font-semibold mb-2">{item.role}</h4>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">{item.company}</span>
              <span className="text-gray-600 dark:text-gray-400">{item.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Resume = () => {
  const experience = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Nestingale',
      period: 'Summer 2025',
      description: [
        'Worked with company\'s CMS to create pages for the website',
        'Made improvements to the website\'s design and user experience',
        'Optimized product ingestion workflows by validating data, mapping attributes, and ensuring accurate product listings through MongoDB and automated n8n pipelines.'
      ],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'JagTrim International',
      period: 'Summer 2024',
      description: [
        'Led the creative direction of the company\'s website',
        'Designed and built a website featuring engaging graphics',
        'Implemented a streamlined email reception system using AWS',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'WebRising',
      period: '2021-2023',
      description: [
        'Co-founder of non-profit web development organization',
        'Developed full-stack websites for local businesses free of charge',
      ],
    },
  ];

  const education = [
    {
      role: 'Bachelor of Computer Science',
      company: 'Stony Brook University',
      period: '2023 - 2027',
      description: [
        'Double Major in Computer Science and Applied Mathematics & Statistics',
        'GPA: 3.5/4.0',
      ],
    },
    {
      role: 'High School',
      company: 'Staten Island Technical High School',
      period: '2019 - 2023',
      description: [
        'AP Computer Science A',
        'AP Computer Science Principles',
        'AP Calculus BC',
        'GPA: 97.5/100',
      ],
    },
  ];

  return (
    <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Resume</h2>
          <a
            href="/path-to-your-cv.pdf"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            download
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Download CV
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <ResumeSection title="Experience" items={experience} />
          <ResumeSection title="Education" items={education} />
        </div>
      </div>
    </section>
  );
};

export default Resume; 