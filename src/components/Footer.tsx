'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className="py-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <span>Made with</span>
            <HeartIcon className="w-5 h-5 mx-1 text-red-500 animate-pulse" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 