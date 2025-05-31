'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-lg text-center sm:text-xl md:text-2xl mb-6 sm:mb-8 font-bold">
            <span className='text-gray-400 mr-2'>I am a</span>
            <span className='text-blue-600 dark:text-blue-400'>Full Stack Developer</span>
            <span className='text-gray-400 mr-2'>, a</span>
            <span className='text-blue-600 dark:text-blue-400'>Problem Solver</span>
            <span className='text-gray-400 mr-2'>, and a</span>
            <span className='text-blue-600 dark:text-blue-400'>Lifelong Learner</span>
        </div>
        <div className="max-w-2xl mx-auto text-sm sm:text-md md:text-lg text-gray-700 dark:text-gray-300 space-y-4 text-center">
          <p>
            I'm an aspiring software engineer with a passion for building intuitive and impactful digital experiences. Whether I'm coding a new feature, debugging a tricky issue, or exploring the latest in web technologies, I enjoy solving problems and turning ideas into reality.
          </p>
          <p>
            Outside of the screen, I find creativity and balance through fashion, skateboarding, and volleyball. I try my best to bring that same energy into every project I work on.
          </p>
        </div>
      </motion.div>
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
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
    </section>
  );
};

export default About; 