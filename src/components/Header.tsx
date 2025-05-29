'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            jas9n
          </Link>
          <ul className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header; 