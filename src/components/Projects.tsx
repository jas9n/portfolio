'use client';

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import '@/styles/carousel.css';

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
    title: 'Pomodoro Timer',
    description: 'A minimalist timer web app with customizable settings, tracked analytics, and login functionality.',
    technologies: ['React', 'Tailwind CSS', 'Django', 'PostgreSQL'],
    image: '/pomodoro.png',
    liveUrl: 'https://pomodoro-free-online.vercel.app',
    githubUrl: 'https://github.com/jas9n/pomodoro',
  },
  {
    title: 'JagTrim International',
    description: 'A modern portfolio website for a clothing button manufacturer with dynamic animations.',
    technologies: ['Vue', 'JavaScript', 'Tailwind CSS', 'GSAP'],
    image: '/jagtrim.png',
    liveUrl: 'https://jagtrim.com',
    githubUrl: 'https://github.com/jas9n/jtinternational',
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
  // Add more projects as needed
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full mx-2 group flex flex-col">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>
      
      {/* Content container */}
      <div className="p-6 bg-gray-100 h-[10rem] flex flex-col relative">
        {/* Title always visible */}
        <h3 className="text-base font-semibold text-gray-900 mb-2">{project.title}</h3>
        
        {/* Description that hides on hover */}
        <p className="text-gray-900 text-base line-clamp-3 group-hover:opacity-0 transition-all duration-300">
          {project.description}
        </p>
        
        {/* Buttons that show on hover */}
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 absolute left-6 right-6 top-[45%] transition-all duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium text-center"
          >
            View Live
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium text-center"
          >
            View Code
          </a>
        </div>
      </div>
    </div>
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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
        <div className="relative">
          {/* Carousel */}
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {projects.map((project) => (
                  <div key={project.title} className="embla__slide">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-2">
            {/* Previous button */}
            <button
              className={`bg-white p-2 rounded-full shadow-lg transition-opacity ${
                !prevBtnEnabled ? 'opacity-50' : 'hover:bg-gray-100'
              }`}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              className={`bg-white p-2 rounded-full shadow-lg transition-opacity ${
                !nextBtnEnabled ? 'opacity-50' : 'hover:bg-gray-100'
              }`}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 