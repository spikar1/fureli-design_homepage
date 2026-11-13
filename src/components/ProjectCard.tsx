import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { ProjectChips, ProjectOverline } from './ProjectMeta';

interface ProjectCardProps {
  project: Project;
}

/** Compact card for the "More projects" grid. */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2 hover:shadow-xl hover:shadow-black/40 motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <ProjectOverline project={project} />
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-text">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.shortDescription}</p>
        <ProjectChips project={project} className="mt-auto pt-4" />
      </div>
    </Link>
  );
}
