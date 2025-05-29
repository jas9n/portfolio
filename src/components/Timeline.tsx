'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ year, title, description, index, total }: {
  year: string;
  title: string;
  description: string;
  index: number;
  total: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative"
    >
      {/* Mobile Layout (Vertical) */}
      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {year}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        </div>
        <div className="pl-16 pb-8">
          <div className="p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        {index !== total - 1 && (
          <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-300" />
        )}
      </div>

      {/* Desktop Layout (Horizontal) */}
      <div className="hidden md:block">
        <div className="relative flex flex-col items-center">
          {/* Content */}
          <div className={`w-64 lg:w-80 absolute ${index % 2 === 0 ? '-top-32' : 'top-12'}`}>
            <div className="p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          
          {/* Timeline point */}
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
            {year}
          </div>
          
          {/* Connecting line */}
          {index < total - 1 && (
            <div className="w-full h-0.5 bg-gray-300 absolute top-4 left-1/2 transform -translate-y-1/2" style={{ width: 'calc(100% + 2rem)' }} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const experiences = [
    {
      year: '2023',
      title: 'Senior Developer',
      description: 'Led development of multiple high-impact projects, focusing on scalable architecture and team mentorship.',
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      description: 'Worked on various web applications using modern technologies like React, Node.js, and cloud services.',
    },
    {
      year: '2019',
      title: 'Junior Developer',
      description: 'Started my journey in software development, learning fundamentals and contributing to team projects.',
    },
    // Add more experiences as needed
  ];

  return (
    <section id="timeline" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
          My Journey
        </h2>
        
        {/* Mobile Timeline (Vertical) */}
        <div className="md:hidden space-y-4">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.year}
              year={exp.year}
              title={exp.title}
              description={exp.description}
              index={index}
              total={experiences.length}
            />
          ))}
        </div>

        {/* Desktop Timeline (Horizontal) */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.year}
                year={exp.year}
                title={exp.title}
                description={exp.description}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 