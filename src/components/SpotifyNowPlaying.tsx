'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  lastPlayed?: boolean;
}

const SpotifyNowPlaying = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/spotify', {
        // Prevent caching to ensure fresh data
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for subsequent fetches
    const interval = setInterval(fetchData, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array since fetchData is defined inside component

  // Bouncing beats animation variants
  const beatsVariants = {
    playing: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const beatVariants = {
    playing: {
      height: [6, 18, 6],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg className="h-4 w-4" viewBox="0 0 168 168">
            <path
              fill="currentColor"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <span>Currently listening to</span>
        </div>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!data || (!data.isPlaying && !data.lastPlayed)) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg className="h-4 w-4" viewBox="0 0 168 168">
            <path
              fill="currentColor"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <span>Currently listening to</span>
        </div>
        <div className="text-sm text-gray-500">Not playing</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <svg className="h-4 w-4" viewBox="0 0 168 168">
          <path
            fill="currentColor"
            d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
        <span>{data.isPlaying ? 'Currently listening to' : 'Last played'}</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center space-x-4"
      >
        <div className="relative h-12 w-12 flex-shrink-0">
          <motion.div
            className="absolute inset-0"
          >
            <Image
              src={data.albumImageUrl}
              alt={`${data.title} album art`}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="flex flex-col">
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
          >
            {data.title}
          </a>
          <span className="text-gray-500 text-sm">{data.artist}</span>
        </div>
        {data.isPlaying && (
          <motion.div
            variants={beatsVariants}
            animate="playing"
            className="flex items-center space-x-1 h-12"
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                variants={beatVariants}
                className="w-1 bg-blue-400 rounded-full"
                style={{ height: 4 }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SpotifyNowPlaying; 