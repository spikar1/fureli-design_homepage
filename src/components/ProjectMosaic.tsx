'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

export const ProjectMosaic = () => {
  const [mounted, setMounted] = useState(false);
  const [shuffledProjects] = useState(() => {
    const allProjects = [...projects];
    // Shuffle the array
    for (let i = allProjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allProjects[i], allProjects[j]] = [allProjects[j], allProjects[i]];
    }
    
    // Create pairs of main and thumbnail images
    const imagePairs = allProjects.flatMap(project => [
      { project, type: 'main' },
      { project, type: 'thumbnail' }
    ]);
    
    // Shuffle the pairs
    for (let i = imagePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
    }
    
    // Take first 18 images or repeat if less than 18
    return Array(18).fill(null).map((_, i) => imagePairs[i % imagePairs.length]);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-6 p-1 -z-10 w-full h-full absolute">
      {shuffledProjects.map(({ project, type }, index) => (
        <Link
          key={`${project.id}-${type}-${index}`}
          href={`/projects/${project.id}`}
          className="relative w-full h-full overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={`/projects/${project.id}/${type}.png`}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 16vw"
          />
        </Link>
      ))}
    </div>
  );
};
     