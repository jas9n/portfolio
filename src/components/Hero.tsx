'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      content: (
        <div className="h-8 sm:h-20 md:h-auto flex items-center">
          <span className="text-emerald-500 tracking-tight text-6xl sm:text-4xl md:text-5xl lg:text-6xl">Jason Chen</span>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="h-8 sm:h-20 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">a</span>
          <span className="text-emerald-500 tracking-tight">Software Engineer 🧑🏻‍💻</span>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="h-8 sm:h-20 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">from</span>
          <span className="text-emerald-500 tracking-tight">Brooklyn, NY</span>
          <span className="text-white tracking-tight">📍</span>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="h-8 sm:h-20 md:h-auto flex items-center">
          <div className="overflow-visible flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <span className="text-gray-900 tracking-tight whitespace-nowrap">listening to</span>
            <SpotifyNowPlaying isVisible={currentSlide === 3} />
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const content = slides.map((slide, index) => {
    if (slide.id === 4) {
      return (
        <div key={slide.id} className="h-8 sm:h-20 md:h-auto flex items-center">
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <span className="text-gray-900 tracking-tight whitespace-nowrap">listening to</span>
            <SpotifyNowPlaying isVisible={currentSlide === index} />
          </div>
        </div>
      );
    }
    return slide.content;
  });

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full px-10 py-8 lg:px-36">
        <div className="flex flex-col md:flex-row items-start md:items-baseline md:space-x-4">
          <div className="text-6xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0 whitespace-nowrap tracking-tight">
            Hello! I am
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="flex-1 min-w-0"
            >
              <div className={`font-bold ${currentSlide === 0 ? '' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'}`}>
                {content[currentSlide]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero; 