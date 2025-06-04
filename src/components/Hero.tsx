'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const TypewriterText = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
  // const writingText = "writing";
  const codeText = "<code/>";
  // const writingChars = writingText.split('');
  const codeChars = codeText.split('');
  
  return (
    <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
      {/* <div className="flex">
        {writingChars.map((char, index) => (
          <motion.span
            key={`writing-${index}`}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.1, delay: index * 0.1 }}
            className="text-gray-900 tracking-tight"
          >
            {char}
          </motion.span>
        ))}
      </div> */}
      <div className="flex">
        {codeChars.map((char, index) => (
          <motion.span
            key={`code-${index}`}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            // transition={{ duration: 0.1, delay: (writingChars.length + 2) * 0.1 + index * 0.1 }}
            transition={{ duration: 0.1, delay: 0.4 + index * 0.1 }}
            className="text-emerald-500 tracking-tight"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      content: (
        <div className="h-8 md:h-auto flex items-center">
          <span className="text-emerald-500 tracking-tight text-5xl lg:text-6xl">Jason Chen</span>
        </div>
      )
    },
  
    {
      id: 2,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">from</span>
          <span className="text-emerald-500 tracking-tight">Brooklyn, NY</span>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">a</span>
          <span className="text-emerald-500 tracking-tight">software engineer</span>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">writing</span>
          <TypewriterText text="<code/>" isVisible={currentSlide === 3} />
        </div>
      )
    },
    {
      id: 5,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">into</span>
          <span className="text-emerald-500 tracking-tight">fashion</span>
          <span className="text-gray-900 tracking-tight">&</span>
          <span className="text-emerald-500 tracking-tight">frontend</span>
        </div>
      )
    },
    {
      id: 6,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">turning</span>
          <span className="text-emerald-500 tracking-tight">ideas</span>
          <span className="text-gray-900 tracking-tight">into</span>
          <span className="text-emerald-500 tracking-tight">reality</span>
        </div>
      )
    },
    {
      id: 7,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-emerald-500 tracking-tight">learning</span>
          <span className="text-gray-900 tracking-tight">something</span>
          <span className="text-emerald-500 tracking-tight">new</span>
        </div>
      )
    },
    
    {
      id: 8,
      content: (
        <div className="h-8 md:h-auto flex items-center">
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <span className="text-gray-900 tracking-tight whitespace-nowrap">listening to</span>
            <SpotifyNowPlaying isVisible={currentSlide === 7} />
          </div>
        </div>
      )
    },
    {
      id: 9,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-gray-900 tracking-tight">a</span>
          <span className="text-emerald-500 tracking-tight">movie</span>
          <span className="text-emerald-500 tracking-tight">enthusiast</span>
        </div>
      )
    },
    {
      id: 10,
      content: (
        <div className="h-8 md:h-auto flex items-center space-x-2 md:space-x-3 lg:space-x-4">
          <span className="text-emerald-500 tracking-tight">debugging</span>
          <span className="text-gray-900 tracking-tight">my</span>
          <span className="text-emerald-500 tracking-tight">life</span>
        </div>
      )
    },
  
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    const header = document.querySelector('header');
    
    if (projectsSection) {
      // Add a small delay to ensure all content is properly laid out
      requestAnimationFrame(() => {
        const headerHeight = header?.offsetHeight || 0;
        const offset = -128; // Additional offset to ensure proper positioning
        const projectsPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
        
        window.scrollTo({
          top: projectsPosition,
          behavior: 'smooth'
        });
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-baseline md:space-x-4">
          <div className="text-6xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0 whitespace-nowrap tracking-tight">
            Hello! I am
          </div>
          <div className="text-3xl ml-0.5 md:ml-0 font-bold md:text-5xl lg:text-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {slides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-start items-center mt-8 ml-1"
        >
          <Link
            href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=jasonc3805@gmail.com"
            target="_blank"
            className="border border-emerald-500 text-emerald-500 w-auto px-6 py-3 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors text-center text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 