'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  features: string[];
  challenges: string[];
  liveUrl: string;
  githubUrl: string;
}

type Projects = {
  [key: string]: Project;
};

// This would typically come from a database or API
const projects: Projects = {
  'project-1': {
    title: 'Project One',
    description: 'A comprehensive description of your first project. Dive deep into the problems it solved, the technologies used, and your role in its development.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/project1.jpg',
    features: [
      'Feature 1: Description of what this feature does and how it benefits users',
      'Feature 2: Another key feature and its implementation details',
      'Feature 3: More specific details about project functionality',
    ],
    challenges: [
      'Challenge 1: How you overcame a specific technical challenge',
      'Challenge 2: Another obstacle and your solution',
    ],
    liveUrl: 'https://project1.com',
    githubUrl: 'https://github.com/yourusername/project1',
  },
  'project-2': {
    title: 'Project Two',
    description: 'Detailed description of your second project, including its purpose, scope, and impact.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/project2.jpg',
    features: [
      'Feature 1: Key functionality and technical implementation',
      'Feature 2: Another important feature and how it works',
      'Feature 3: Additional project capabilities',
    ],
    challenges: [
      'Challenge 1: Technical challenge and resolution',
      'Challenge 2: Project obstacle and how you solved it',
    ],
    liveUrl: 'https://project2.com',
    githubUrl: 'https://github.com/yourusername/project2',
  },
  // Add more projects as needed
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Project not found</h1>
          <Link href="/projects" className="text-blue-600 hover:underline text-sm sm:text-base">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{project.title}</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="relative h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 sm:mb-6">
              {/* Add proper image handling */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Overview</h2>
              <p className="text-sm sm:text-base mb-4 sm:mb-6">{project.description}</p>

              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Key Features</h2>
              <ul className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>

              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Challenges & Solutions</h2>
              <ul className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base">
                {project.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="mb-2">{challenge}</li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base text-center"
                >
                  View Live
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-gray-900 transition-colors text-sm sm:text-base text-center"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 