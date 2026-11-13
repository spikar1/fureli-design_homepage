interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

/** The one tag style used across the site (engine, platforms, expertise). */
export default function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}
