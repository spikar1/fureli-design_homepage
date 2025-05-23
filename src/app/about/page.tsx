'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Steffen Fureli</h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">Game Designer & Developer</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-6">
                  I&apos;m a passionate game designer and developer with a unique background in education. 
                  My journey has taken me from teaching to game development, where I combine my love for 
                  learning with my drive to create innovative gaming experiences. I&apos;m particularly drawn 
                  to projects that push the boundaries of technology and create unexpected, meaningful 
                  experiences.
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400">
                <Image
                  src="/SteffenMFureli.jpg"
                  alt="Steffen Fureli"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4">Vision</h3>
              <p className="text-lg mb-6">
                My goal is to establish a game studio that creates unique, thought-provoking games 
                that leave players in awe. I believe in pushing the boundaries of what&apos;s possible 
                with technology while creating meaningful experiences that resonate with players.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Beyond the Screen</h3>
              <p className="text-lg mb-6">
                When I&apos;m not coding or designing games, you can find me perfecting my golf swing 
                or performing impressive tricks on the trampoline. These activities reflect my 
                approach to game development: precision, creativity, and a willingness to take 
                calculated risks.
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Best Teacher Award</li>
                <li>Selected for ExpoTees at Teesside University</li>
                <li>Best Student at Noroff</li>
                <li>Top 3 in NM i Gameplay (twice)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Expertise</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Unity Development</li>
                <li>Game Design</li>
                <li>Teaching & Public Speaking</li>
                <li>Next.js Development</li>
                <li>C# Programming</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 