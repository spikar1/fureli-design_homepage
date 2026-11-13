'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

const TILE_COUNT = 18;

/**
 * Decorative background of shuffled project screenshots behind the hero.
 * Rendered after mount (the shuffle is random, so it can't match the server HTML)
 * and faded in once every tile has loaded. It never blocks the page.
 */
export const ProjectMosaic = () => {
  const [mounted, setMounted] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
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
    return Array(TILE_COUNT).fill(null).map((_, i) => imagePairs[i % imagePairs.length]);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allLoaded = loadedCount >= shuffledProjects.length;
  const countTile = () => setLoadedCount((n) => n + 1);

  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-6 -z-10 w-full h-full absolute inset-0 ${allLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
    >
      {shuffledProjects.map(({ project, type }, index) => (
        <Link
          key={`${project.id}-${type}-${index}`}
          href={`/projects/${project.id}`}
          tabIndex={-1}
          className="relative w-full h-full overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={`/projects/${project.id}/${type}.png`}
            alt=""
            fill
            className="object-cover pointer-events-auto"
            sizes="(max-width: 768px) 33vw, 16vw"
            onLoad={countTile}
            onError={countTile}
          />
        </Link>
      ))}
    </div>
  );
};
