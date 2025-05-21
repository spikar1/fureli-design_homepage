'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleProjectsClick = () => {
    if (pathname === '/') {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#projects');
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white font-bold text-xl">
            Fureli Design
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-white hover:text-gray-300 transition-colors ${pathname === '/' ? 'font-semibold' : ''}`}
            >
              Home
            </Link>
            <button 
              onClick={handleProjectsClick}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Projects
            </button>
            <Link 
              href="/about" 
              className={`text-white hover:text-gray-300 transition-colors ${pathname === '/about' ? 'font-semibold' : ''}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-white hover:text-gray-300 transition-colors ${pathname === '/contact' ? 'font-semibold' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-md text-white hover:bg-gray-700 ${pathname === '/' ? 'bg-gray-700' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => {
                  handleProjectsClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-gray-700"
              >
                Projects
              </button>
              <Link 
                href="/about" 
                className={`block px-3 py-2 rounded-md text-white hover:bg-gray-700 ${pathname === '/about' ? 'bg-gray-700' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`block px-3 py-2 rounded-md text-white hover:bg-gray-700 ${pathname === '/contact' ? 'bg-gray-700' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 