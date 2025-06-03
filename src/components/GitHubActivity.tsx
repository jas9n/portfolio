'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Commit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

interface ContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
    }[];
  }[];
}

const GitHubActivity = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepo[]>([]);
  const [contributionSvg, setContributionSvg] = useState<string>('');
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/github');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch GitHub data');
        }

        setCommits(data.commits);
        setPinnedRepos(data.pinnedRepos);
        setContributionSvg(data.contributionSvg);
        setContributionData(data.contributionData);
        setLoading(false);
      } catch (err: any) {
        console.error('GitHub data fetch error:', err);
        setError(err.message || 'Failed to fetch GitHub data');
        setLoading(false);
      }
    };

    if (inView) {
      fetchGitHubData();
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600">
            {error === 'GitHub token is not configured' 
              ? 'GitHub integration is currently unavailable. Please check back later.'
              : error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activity" className="py-20 bg-gray-50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold mb-12"
        >
          Activity
        </motion.h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Contribution Graph */}
          <motion.div variants={itemVariants} className="w-full overflow-x-auto shadow-md">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg shadow-md" />
              </div>
            ) : contributionSvg ? (
              <div 
                className="w-full min-w-[800px] bg-white rounded-lg p-4 shadow-md"
                dangerouslySetInnerHTML={{ __html: contributionSvg }} 
              />
            ) : contributionData ? (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-2xl font-semibold text-emerald-500">
                  {contributionData.totalContributions}
                </p>
                <p className="text-gray-600">
                  contributions in the last year
                </p>
              </div>
            ) : (
              <div className="text-gray-600 text-center py-8 bg-white rounded-lg shadow-md">
                No contribution data available
              </div>
            )}
          </motion.div>

          {/* Pinned Repositories */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedRepos.map((repo) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="block"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                      <h4 className="font-medium text-emerald-500 mb-2">
                        {repo.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {repo.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          {repo.language && (
                            <span>{repo.language}</span>
                          )}
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                            </svg>
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                            </svg>
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Commits */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 w-full bg-gray-200 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {commits.length > 0 ? (
                  commits.map((commit) => (
                    <motion.a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="block"
                    >
                      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-emerald-500 truncate flex-1">
                            {commit.repo}
                          </h4>
                          <span className="text-sm text-gray-600 ml-4">
                            {commit.date}
                          </span>
                        </div>
                        <p className="text-gray-600 break-words">
                          {commit.message}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                          {commit.sha.substring(0, 7)}
                        </div>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="text-gray-600 text-center py-8 bg-white rounded-lg shadow-md">
                    No recent commits available
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default GitHubActivity; 