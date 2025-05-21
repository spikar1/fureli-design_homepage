'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import UnityWebGL from '@/components/UnityWebGL';
import { useState } from 'react';
import { use } from 'react';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = projects.find(p => p.id === resolvedParams.id);
  const [isUnityLoading, setIsUnityLoading] = useState(true);
  const [unityError, setUnityError] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                ← Back to Projects
              </Link>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-6"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {project.unityBuild && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-12"
            >
              <div className="relative">
                {isUnityLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-blue-400">Loading Unity WebGL...</p>
                    </div>
                  </div>
                )}
                {unityError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20">
                    <div className="text-center p-4">
                      <p className="text-red-400 mb-4">{unityError}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                <UnityWebGL
                  buildUrl={project.unityBuild}
                  onLoad={() => setIsUnityLoading(false)}
                  onError={(error) => {
                    setIsUnityLoading(false);
                    setUnityError('Failed to load Unity WebGL build. Please try again.');
                    console.error('Unity WebGL Error:', error);
                  }}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12 md:col-span-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
            <div className="space-y-4">
              {project.role && (
                <div>
                  <h3 className="text-gray-400 mb-1">Role</h3>
                  <p>{project.role}</p>
                </div>
              )}
              {project.teamSize && (
                <div>
                  <h3 className="text-gray-400 mb-1">Team Size</h3>
                  <p>{project.teamSize}</p>
                </div>
              )}
              {project.event && (
                <div>
                  <h3 className="text-gray-400 mb-1">Event</h3>
                  <p>{project.event}</p>
                </div>
              )}
              <div>
                <h3 className="text-gray-400 mb-1">Year</h3>
                <p>{project.year}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12 md:col-span-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </motion.div>

          {project.link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="col-span-12"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                View Project
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 