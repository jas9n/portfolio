'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'A brief description of your first project. What problems did it solve? What technologies did you use?',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/project1.jpg',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'Description of your second project. Highlight the key features and your role in development.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/project2.jpg',
  },
  // Add more projects as needed
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 dark:bg-gray-700">
          {/* Add proper image handling with next/image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{project.title}</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
} 