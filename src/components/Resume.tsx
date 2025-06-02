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
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <h4 className="text-xl font-semibold mb-2">{item.role}</h4>
            <div className="flex justify-between items-center mb-4">
              <span className="text-emerald-500">{item.company}</span>
              <span className="text-gray-600">{item.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-900">
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
        'Built and updated web pages using the company’s CMS, ensuring consistency with brand guidelines and SEO best practices',
        'Enhanced website design and optimized user experience by improving layout, navigation, and accessibility across devices',
      ],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'JagTrim International',
      period: 'Summer 2024',
      description: [
        'Developed a visually dynamic website with interactive graphics and smooth animations to enhance user engagement',
        'Built a reliable and scalable email reception pipeline using Amazon AWS services, optimizing communication workflows',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'WebRising',
      period: '2021 - 2023',
      description: [
        'Co-founder of non-profit web development organization',
        'A volunteer-based organization that creates fullstack websites for local businesses at no cost, helping them maintain an online presence and adapt during the COVID-19 pandemic',
        'Focused on supporting community growth through accessible digital solutions',
      ],
    },
  ];

  const education = [
    {
      role: 'Bachelor of Science',
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
        'GPA: 97.8/100',
      ],
    },
  ];

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Resume</h2>
          <a
            href="/Resume.pdf"
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
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