'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  lastPlayed?: boolean;
  error?: string;
}

interface Commit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Now = () => {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [spotifyLoading, setSpotifyLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    const fetchSpotify = async () => {
      try {
        const response = await fetch(`/api/spotify?t=${Date.now()}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        setSpotify(data);
      } catch (error) {
        console.error('Spotify data fetch error:', error);
        setSpotify(null);
      } finally {
        setSpotifyLoading(false);
      }
    };

    const fetchGitHub = async () => {
      try {
        const response = await fetch('/api/github', { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch GitHub data');
        }

        setCommits(Array.isArray(data.commits) ? data.commits.slice(0, 3) : []);
      } catch (error) {
        console.error('GitHub data fetch error:', error);
        setCommits([]);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchSpotify();
    fetchGitHub();
  }, [inView]);

  const hasSpotifyTrack = spotify?.title && spotify.artist && spotify.songUrl;
  const latestCommit = commits[0];

  return (
    <section id="now" className="bg-gray-50 py-16 md:py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto px-6"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Now
            </p>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              A live snapshot of what I am listening to, learning, building, and working on.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Now listening to
                </p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Spotify
                </span>
              </div>

              {spotifyLoading ? (
                <div className="flex animate-pulse items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-gray-200" />
                  <div className="space-y-3">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                    <div className="h-3 w-28 rounded bg-gray-200" />
                  </div>
                </div>
              ) : hasSpotifyTrack ? (
                <a
                  href={spotify.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  {spotify.albumImageUrl && (
                    <Image
                      src={spotify.albumImageUrl}
                      alt={`${spotify.title} album art`}
                      width={64}
                      height={64}
                      className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold text-emerald-500">
                      {spotify.title}
                    </p>
                    <p className="truncate text-sm text-gray-600">
                      by {spotify.artist}
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500">
                      {spotify.isPlaying ? 'Playing now' : 'Recently played'}
                    </p>
                  </div>
                </a>
              ) : (
                <p className="text-gray-600">
                  Spotify is quiet right now.
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Now working on
              </p>
              <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                Automating AI workflows
              </h3>
              <p className="leading-7 text-gray-700">
                Supporting an Accenture client by helping turn repeatable AI delivery work into clearer, faster workflow systems.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Currently learning
              </p>
              <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                MCPs
              </h3>
              <p className="leading-7 text-gray-700">
                Exploring how Model Context Protocols connect agents, tools, data, and product workflows in a cleaner way.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Now building
                </p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  GitHub
                </span>
              </div>

              {githubLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              ) : latestCommit ? (
                <a
                  href={latestCommit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="mb-3 truncate text-2xl font-bold text-emerald-500">
                    {latestCommit.repo}
                  </h3>
                  <p className="line-clamp-2 leading-7 text-gray-700">
                    {latestCommit.message}
                  </p>
                  <p className="mt-4 text-sm font-medium text-gray-500">
                    Latest commit · {latestCommit.date}
                  </p>
                </a>
              ) : (
                <p className="leading-7 text-gray-700">
                  Recent GitHub activity will show here when the integration is available.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Now;
