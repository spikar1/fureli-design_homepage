'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Steffen Fureli</h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-12">Game Developer</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">
              I am a passionate game developer with a focus on creating engaging and innovative gaming experiences. 
              With expertise in both technical implementation and creative design, I strive to build games that 
              challenge and entertain players.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Experience</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Game Development</li>
              <li>Unity Development</li>
              <li>Level Design</li>
              <li>Technical Art</li>
              <li>Project Management</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Skills</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Unity</li>
              <li>C#</li>
              <li>Game Design</li>
              <li>Level Design</li>
              <li>Technical Art</li>
              <li>Project Leadership</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 