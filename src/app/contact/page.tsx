'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-300">
                I&apos;m always interested in hearing about new projects and opportunities.
                Feel free to reach out through any of the following channels:
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="mailto:steffen.sureli@gmail.com" 
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-300">steffen.fureli@gmail.com</p>
              </a>

              <a 
                href="linkedin.com/in/steffen-m-fureli-491b182b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-300">linkedin.com/in/steffen-m-fureli-491b182b</p>
              </a>

              <a 
                href="https://github.com/spikar1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                <p className="text-gray-300">https://github.com/spikar1</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 