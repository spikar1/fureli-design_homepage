import type { Project } from '@/data/projects';
import { getProjectChips } from '@/data/projects';
import Chip from './Chip';

/** `2024 · Commercial` */
export function ProjectOverline({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-accent ${className}`}>
      {project.year} · {project.context}
    </p>
  );
}

/** Engine + platform chips. Renders nothing when the project has neither. */
export function ProjectChips({ project, className = '' }: { project: Project; className?: string }) {
  const chips = getProjectChips(project);
  if (chips.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {chips.map((chip) => (
        <li key={chip}>
          <Chip>{chip}</Chip>
        </li>
      ))}
    </ul>
  );
}
