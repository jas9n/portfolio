'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-gray-300 text-sm">
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