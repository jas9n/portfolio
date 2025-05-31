'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const TechIcon = ({ name, icon }: { name: string; icon: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center p-4"
      title={name}
    >
      <div className="relative w-12 h-12">
        <Image
          src={`/icons/${icon}`}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: 'react.png' },
        // { name: 'Next.js', icon: 'nextjs.svg' },
        { name: 'TypeScript', icon: 'typescript.png' },
        { name: 'Tailwind CSS', icon: 'tailwind.png' },
        { name: 'GSAP', icon: 'gsap.png' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: 'nodejs.png' },
        { name: 'Python', icon: 'python.svg' },
        { name: 'Django', icon: 'django.svg' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: 'git.svg' },
        { name: 'AWS', icon: 'aws.svg' },
        { name: 'Figma', icon: 'figma.svg' },
      ],
    },
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript', icon: 'javascript.png' },
        { name: 'Python', icon: 'python.svg' },
        { name: 'Java', icon: 'java.png' },
        { name: 'C', icon: 'c.png' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 min-h-screen flex items-center">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6"
      >
        <motion.h2 
          variants={categoryVariants}
          className="text-3xl font-bold text-center mb-12"
        >
          Tech Stack
        </motion.h2>
        
        <div className="space-y-12">
          {categories.map((category, index) => (
            <motion.div 
              key={category.title} 
              variants={categoryVariants}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                {category.skills.map((skill) => (
                  <TechIcon
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 