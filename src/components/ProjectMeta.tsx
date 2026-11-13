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

/** Type chip (Game, Configurator, Editor), then engine + platform chips. */
export function ProjectChips({ project, className = '' }: { project: Project; className?: string }) {
  const chips = getProjectChips(project);
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      <li>
        <Chip tone="accent">{project.type}</Chip>
      </li>
      {chips.map((chip) => (
        <li key={chip}>
          <Chip>{chip}</Chip>
        </li>
      ))}
    </ul>
  );
}
