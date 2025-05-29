'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Hello, I'm <span className="text-blue-600 dark:text-blue-400">Jason Chen</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            Full Stack Developer | Problem Solver | Lifelong Learner
          </h2>
          <div className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-md md:text-lg text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 flex flex-col space-y-3 sm:space-y-4">
            <span>I'm an aspiring software engineer with a passion for building intuitive and impactful digital experiences. Whether I'm coding a new feature, debugging a tricky issue, or exploring the latest in web technologies, I enjoy solving problems and turning ideas into reality.</span>
            <span>Outside of the screen, I find creativity and balance through skateboarding, volleyball, and fashion. I try my best to bring that same energy into every project I work on.</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Get in Touch
            </a>
            <Link
              href="/projects"
              className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm sm:text-base"
            >
              View My Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 