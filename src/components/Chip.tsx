interface ChipProps {
  children: React.ReactNode;
  /** `accent` marks the project type (Game, Configurator, Editor). */
  tone?: 'default' | 'accent';
  className?: string;
}

const tones = {
  default: 'border-line bg-surface-2 text-muted',
  accent: 'border-accent/30 bg-accent-soft text-accent',
};

/** The one tag style used across the site (type, engine, platforms, expertise). */
export default function Chip({ children, tone = 'default', className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
