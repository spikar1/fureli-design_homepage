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
    // Take first 18 projects or repeat if less than 18
    return Array(18).fill(null).map((_, i) => allProjects[i % allProjects.length]);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-6 p-1 -z-10 w-full h-full absolute">
      {shuffledProjects.map((project, index) => (
        <Link
          key={`${project.id}-${index}`}
          href={`/projects/${project.id}`}
          className="relative w-full h-full overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={`/projects/${project.id}/thumbnail.png`}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 16vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/projects/${project.id}/thumbnail.jpg`;
            }}
          />
        </Link>
      ))}
    </div>
  );
};
     