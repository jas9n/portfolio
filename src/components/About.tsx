'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const AUTO_ROTATE_MS = 4500;
const CAROUSEL_THUMBNAIL_MARGIN_TOP = 12;
const CAROUSEL_THUMBNAIL_GRID_GAP = 8;
const CAROUSEL_MIN_IMAGE_SIZE = 260;

const highlights = [
  {
    value: 'Accenture',
    label: 'enterprise workflow automation',
  },
  {
    value: 'Nestingale',
    label: 'AI product development',
  },
  {
    value: 'CS + AMS',
    label: 'Stony Brook double major',
  },
  {
    value: 'Full-stack',
    label: 'frontend, APIs, data, automation',
  },
];

const galleryPhotos = [
  {
    src: '/about/jason-festus.jpg',
    title: 'Warriors event',
    alt: 'Jason at a Golden State Warriors event with the championship trophy',
    width: 4284,
    height: 4284,
  },
  {
    src: '/about/jason-work.jpg',
    title: 'Accenture visit',
    alt: 'Jason pointing at the Accenture sign at Salesforce Tower',
    width: 2160,
    height: 2160,
  },
  {
    src: '/about/jason-bridge.jpg',
    title: 'Golden Gate afternoon',
    alt: 'Jason sitting between trees with the Golden Gate Bridge in the background',
    width: 1536,
    height: 1536,
  },
  {
    src: '/about/jason-rocks.jpg',
    title: 'Small details',
    alt: 'Jason pointing at a small stacked-rock sculpture',
    width: 3024,
    height: 3024,
  },
  {
    src: '/about/jason-beach.jpg',
    title: 'Low tide walk',
    alt: 'Jason standing in shallow water at sunset',
    width: 2821,
    height: 2821,
  },
  {
    src: '/about/jason-trail.jpg',
    title: 'Trail steps',
    alt: 'Jason walking down outdoor wooden stairs surrounded by trees',
    width: 3024,
    height: 3024,
  },
];

const About = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [carouselImageSize, setCarouselImageSize] = useState<number | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const contentColumnRef = useRef<HTMLDivElement>(null);
  const carouselShellRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!inView || isCarouselPaused || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActivePhotoIndex((index) => (index + 1) % galleryPhotos.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [inView, isCarouselPaused]);

  useEffect(() => {
    const updateCarouselImageSize = () => {
      if (!contentColumnRef.current || !carouselShellRef.current || window.innerWidth < 1024) {
        setCarouselImageSize(null);
        return;
      }

      const contentHeight = contentColumnRef.current.getBoundingClientRect().height;
      const availableWidth = carouselShellRef.current.getBoundingClientRect().width;

      if (availableWidth <= 0) {
        setCarouselImageSize(null);
        return;
      }

      const maxImageSizeFromHeight = (
        (contentHeight * 6)
        - (CAROUSEL_THUMBNAIL_MARGIN_TOP * 6)
        + (CAROUSEL_THUMBNAIL_GRID_GAP * 5)
      ) / 7;
      const nextImageSize = Math.min(
        availableWidth,
        Math.max(CAROUSEL_MIN_IMAGE_SIZE, Math.floor(maxImageSizeFromHeight)),
      );

      setCarouselImageSize((currentSize) => (
        currentSize === nextImageSize ? currentSize : nextImageSize
      ));
    };

    updateCarouselImageSize();

    const resizeObserver = new ResizeObserver(updateCarouselImageSize);

    if (contentColumnRef.current) {
      resizeObserver.observe(contentColumnRef.current);
    }

    if (carouselShellRef.current) {
      resizeObserver.observe(carouselShellRef.current);
    }

    window.addEventListener('resize', updateCarouselImageSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCarouselImageSize);
    };
  }, []);

  const activePhoto = galleryPhotos[activePhotoIndex];
  const showPreviousPhoto = () => {
    setActivePhotoIndex((index) => (index - 1 + galleryPhotos.length) % galleryPhotos.length);
  };
  const showNextPhoto = () => {
    setActivePhotoIndex((index) => (index + 1) % galleryPhotos.length);
  };

  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              About
            </p>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              I build practical, polished software that turns messy workflows into products people can actually use.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div ref={contentColumnRef} className="space-y-5 text-base leading-7 text-gray-700">
              <p>
                I am a software engineer and Computer Science plus Applied Mathematics & Statistics double major at Stony Brook University. My work sits between full-stack engineering, product thinking, and clean user experience, from internal tools that speed up operations to interactive web apps and mobile products.
              </p>
              <p>
                At Accenture, I am supporting technical delivery for a frontier AI hyperscaler client, collaborating across consulting and engineering teams to ship platform solutions in an Agile environment. At Nestingale, I built tools used by 20+ team members and reduced manual supplier setup by about 40%. Outside of work, I love being outside and exploring nature, experimenting with fashion, playing volleyball, and cruising around on my longboard.
              </p>

              <div className="grid gap-4 pt-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <motion.div
                    key={highlight.label}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg bg-gray-50 p-5 shadow-sm"
                  >
                    <div className="mb-2 text-2xl font-bold text-emerald-500 md:text-3xl">
                      {highlight.value}
                    </div>
                    <p className="text-sm font-medium leading-6 text-gray-700">
                      {highlight.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              ref={carouselShellRef}
              className="w-full"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocus={() => setIsCarouselPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsCarouselPaused(false);
                }
              }}
            >
              <div
                className="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-lg"
                style={carouselImageSize
                  ? {
                      aspectRatio: '1 / 1',
                      maxWidth: `${carouselImageSize}px`,
                    }
                  : { aspectRatio: '1 / 1' }}
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activePhoto.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      fill
                      priority={activePhotoIndex === 0}
                      sizes="(min-width: 1024px) 48vw, (min-width: 640px) 90vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  aria-label="Show previous photo"
                  onClick={showPreviousPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 opacity-70 drop-shadow-[0_1px_7px_rgba(0,0,0,0.65)] transition-opacity hover:opacity-100"
                >
                  <ChevronLeftIcon className="h-8 w-8 text-white" />
                </button>
                <button
                  type="button"
                  aria-label="Show next photo"
                  onClick={showNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-70 drop-shadow-[0_1px_7px_rgba(0,0,0,0.65)] transition-opacity hover:opacity-100"
                >
                  <ChevronRightIcon className="h-8 w-8 text-white" />
                </button>
              </div>

              <div
                className="mx-auto mt-3 grid grid-cols-6 gap-2"
                style={carouselImageSize
                  ? { maxWidth: `${carouselImageSize}px` }
                  : undefined}
              >
                {galleryPhotos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    aria-label={`Show ${photo.title}`}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-md bg-gray-200 transition ${
                      index === activePhotoIndex
                        ? 'border border-gray-300 opacity-100 shadow-md'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
