'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

type Skill = {
  name: string;
  icon?: string;
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

const categories = [
  {
    title: 'Languages & Data',
    description: 'The core languages and analysis tools I reach for when modeling, scripting, and building.',
    skills: [
      { name: 'Python', icon: 'python.svg' },
      { name: 'Jupyter Notebook', icon: 'jupyter.png' },
      { name: 'pandas', icon: 'pandas.png' },
      { name: 'Matplotlib', icon: 'matplotlib.png' },
      { name: 'scikit-learn', icon: 'scikit-learn.png' },
      { name: 'Java', icon: 'java.png' },
      { name: 'JavaScript', icon: 'javascript.png' },
      { name: 'C', icon: 'c.png' },
      { name: 'OCaml', icon: 'ocaml.png' },
      { name: 'R', icon: 'r.png' },
    ],
  },
  {
    title: 'Frontend',
    description: 'Polished interfaces, responsive layouts, motion, and product-facing web experiences.',
    skills: [
      { name: 'React', icon: 'react.png' },
      { name: 'Next.js', icon: 'nextjs.svg' },
      { name: 'Vue.js', icon: 'vue.png' },
      { name: 'TypeScript', icon: 'typescript.png' },
      { name: 'Tailwind CSS', icon: 'tailwind.png' },
      { name: 'SCSS', icon: 'sass.png' },
    ],
  },
  {
    title: 'Backend & Systems',
    description: 'APIs, databases, services, and workflow logic that make applications useful behind the scenes.',
    skills: [
      { name: 'Node.js', icon: 'nodejs.png' },
      { name: 'Express.js', icon: 'express.png' },
      { name: 'Django', icon: 'django.svg' },
      { name: 'PostgreSQL', icon: 'postgres.png' },
      { name: 'MongoDB', icon: 'mongodb.png' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'The collaboration, design, cloud, and AI tooling I use to move from idea to shipped work.',
    skills: [
      { name: 'Git', icon: 'git.svg' },
      { name: 'GitHub', icon: 'github.png' },
      { name: 'npm', icon: 'npm.png' },
      { name: 'AWS', icon: 'aws.svg' },
      { name: 'Figma', icon: 'figma.svg' },
      { name: 'Cursor', icon: 'cursor.png' },
      { name: 'Claude Code', icon: 'claude-code.png' },
      { name: 'Agile (Scrum, CI/CD)', icon: 'agile.png' },
    ],
  },
];

const SkillBadge = ({ name, icon }: Skill) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 shadow-sm"
      title={name}
    >
      {icon && (
        <div className="relative h-6 w-6 shrink-0">
          <Image
            src={`/icons/${icon}`}
            alt=""
            fill
            sizes="24px"
            className="object-contain"
          />
        </div>
      )}
      <span className="text-sm font-medium text-gray-900">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="bg-gray-50 py-16 md:py-20">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Stack
            </p>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Tools I use to build across interfaces, data, systems, and AI-assisted workflows.
            </h2>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category) => (
              <motion.div 
                key={category.title} 
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                    >
                      <SkillBadge name={skill.name} icon={skill.icon} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
