'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '@/styles/carousel.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imagePosition?: 'center' | 'top';
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: 'wandr',
    description: 'An iOS social travel platform for trip planning, photo and itinerary sharing, event discovery, and AI-powered local insights.',
    technologies: ['Swift', 'Go', 'LLMs', 'Geolocation'],
    image: '/wandr.png',
    imagePosition: 'top',
    liveUrl: '',
    githubUrl: ''
  },
  {
    title: 'Pomodoro Timer',
    description: 'A minimalist timer web app with customizable settings, tracked analytics, and login functionality.',
    technologies: ['React', 'Tailwind CSS', 'Django', 'PostgreSQL'],
    image: '/pomodoro.png',
    liveUrl: 'https://pomodoro-free-online.vercel.app',
    githubUrl: 'https://github.com/jas9n/pomodoro',
  },
  {
    title: 'Jag International Trim',
    description: 'A modern portfolio website for a clothing button company with dynamic animations.',
    technologies: ['Vue', 'JavaScript', 'Tailwind CSS', 'GSAP'],
    image: '/jagtrim.png',
    liveUrl: 'https://jagtrim.com',
    githubUrl: 'https://github.com/jas9n/jtinternational',
  },
  {
    title: 'Scroll Parallax',
    description: 'A simple scroll parallax example using GSAP.',
    technologies: ['JavaScript', 'GSAP'],
    image: '/parallax.png',
    liveUrl: 'https://icelandparallax.netlify.app/',
    githubUrl: 'https://github.com/jas9n/parallax-example',
  },
  {
    title: 'Staten Island Tech Course Catalog',
    description: 'An interactive course catalog helping students explore and learn about available courses.',
    technologies: ['Vue', 'JavaScript', 'Tailwind CSS'],
    image: '/catalog.png',
    liveUrl: 'https://siths-catalog.netlify.app',
    githubUrl: 'https://github.com/sitechtimes/course-catalog',
  },
  {
    title: 'Staten Island Tech Course Selection',
    description: 'A digital course selection platform streamlining the student scheduling process.',
    technologies: ['Vue', 'JavaScript', 'Tailwind CSS'],
    image: '/selection.png',
    liveUrl: 'https://courseselection.siths.dev',
    githubUrl: 'https://github.com/sitechtimes/course-selection-frontend-v2',
  },
  {
    title: 'Tic Tac Toe',
    description: 'A simple Tic Tac Toe game with a modern UI.',
    technologies: ['JavaScript', 'React'],
    image: '/tictactoe.png',
    liveUrl: 'https://tictactoe-vanilla.netlify.app/',
    githubUrl: 'https://github.com/jas9n/gsap',
  },
  {
    title: 'Clock Example',
    description: 'A simple clock example using vanilla JavaScript and CSS.',
    technologies: ['JavaScript', 'CSS'],
    image: '/clock.png',
    liveUrl: 'https://watch-clock-example.vercel.app/',
    githubUrl: 'https://github.com/jas9n/watch',
  },
];

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

const ProjectCard = ({ project }: { project: Project }) => {
  const hasActions = Boolean(project.liveUrl || project.githubUrl);
  const primaryTechnology = project.technologies[0] ?? 'Project';

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group mx-1 flex h-full min-h-[32rem] flex-col overflow-hidden rounded-lg bg-gray-50 shadow-sm"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
            project.imagePosition === 'top' ? 'object-top' : 'object-center'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
          {primaryTechnology}
        </p>
        <h3 className="mb-3 text-xl font-bold text-gray-900">
          {project.title}
        </h3>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-700">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700"
              >
                {technology}
              </span>
            ))}
          </div>

          {hasActions ? (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  View live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                >
                  View code
                </a>
              )}
            </div>
          ) : (
            <span className="inline-flex rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
              In progress
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="bg-white py-16 md:py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Projects
            </p>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Selected builds across product, frontend, automation, and full-stack engineering.
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {projects.map((project) => (
                    <div key={project.title} className="embla__slide flex">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <button
                className={`rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-colors ${
                  !prevBtnEnabled
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:border-emerald-200 hover:bg-emerald-50'
                }`}
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                aria-label="Previous projects"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>

              <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to project slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className={`rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-colors ${
                  !nextBtnEnabled
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:border-emerald-200 hover:bg-emerald-50'
                }`}
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                aria-label="Next projects"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
