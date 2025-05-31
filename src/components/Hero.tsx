'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SpotifyNowPlaying from './SpotifyNowPlaying';

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <SpotifyNowPlaying />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <div className="text-sm text-gray-500 space-x-1">
              <span className=''>📍 Located in</span>
              <span className="text-blue-600 dark:text-blue-400">New York, NY 🗽</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 