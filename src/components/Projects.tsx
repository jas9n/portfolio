'use client';

import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'A brief description of your first project. What problems did it solve? What technologies did you use?',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/project1.jpg',
    liveUrl: 'https://project1.com',
    githubUrl: 'https://github.com/jas9n/project1',
  },
  {
    title: 'Project Two',
    description: 'Description of your second project. Highlight the key features and your role in development.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/project2.jpg',
    liveUrl: 'https://project2.com',
    githubUrl: 'https://github.com/jas9n/project2',
  },
  // Add more projects as needed
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200">
        {/* Add proper image handling with next/image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center text-sm sm:text-base"
          >
            View Live
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-center text-sm sm:text-base"
          >
            View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects">
      <div className="container mx-auto px-10 lg:px-36">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 