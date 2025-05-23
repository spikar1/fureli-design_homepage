'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import UnityWebGL from '@/components/UnityWebGL';
import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';

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
                ← Back to Front Page
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
            {project.image && (
            <div className="col-span-12 rounded-lg overflow-hidden flex justify-center bg-gray-800 drop-shadow-gray-950 drop-shadow-md mb-6">
              <Image 
                src={project.image} 
                alt={project.title} 
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain" 
                width={1000}
                height={1000}
              />
            </div>
          )}
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
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20 ">
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
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.shortDescription}
            </p>
          </motion.div>

                    <div className="col-span-12">
            <div className="mb-8">
                {//Image goes here
                }
            </div>
          </div>
          {project.itchEmbed && (
            <div className="col-span-12">
              <div dangerouslySetInnerHTML={{ __html: project.itchEmbed }} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 