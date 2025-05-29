'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ skill, level }: { skill: string; level: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{skill}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const skillsList = [
    { name: 'Frontend Development', level: 90 },
    { name: 'Backend Development', level: 70 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Database Design', level: 60 },
    { name: 'UI/UX Design', level: 90 },
  ];

  const categories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Python', 'Django', 'REST APIs'],
    },
    {
      title: 'Tools & Others',
      skills: ['Git', 'AWS', 'Figma'],
    },
    {
      title: 'Languages',
      skills: ['Python', 'Javascript', 'Java', 'C'],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-semibold mb-6">Technical Proficiency</h3>
            {skillsList.map((skill) => (
              <SkillBar
                key={skill.name}
                skill={skill.name}
                level={skill.level}
              />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Technology Stack</h3>
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-lg font-medium mb-2">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 