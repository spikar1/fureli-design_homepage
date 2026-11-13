'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { ProjectChips, ProjectOverline } from './ProjectMeta';

interface FeaturedProjectCardProps {
  project: Project;
  priority?: boolean;
}

/** Can this visitor get a hover video preview? Desktop pointer and no reduced-motion preference. */
const canPreview = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;

/** Large card for the featured section. Loads a muted looping video preview on hover/focus. */
export default function FeaturedProjectCard({ project, priority = false }: FeaturedProjectCardProps) {
  const [previewing, setPreviewing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = project.videos?.[0];

  const start = () => {
    if (video && canPreview()) setPreviewing(true);
  };
  const stop = () => {
    setPreviewing(false);
    setPlaying(false);
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-line-strong hover:bg-surface-2 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <Image
          src={project.cover ?? project.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 640px) 540px, 86vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        {previewing && video && (
          <video
            src={video.src}
            muted
            loop
            autoPlay
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full bg-black object-contain transition-opacity duration-500 ${
              playing ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {video && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-text backdrop-blur-sm">
            ▶ Video
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ProjectOverline project={project} />
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-muted">{project.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
          <ProjectChips project={project} />
          <span className="text-sm font-semibold text-accent">
            View project{' '}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
