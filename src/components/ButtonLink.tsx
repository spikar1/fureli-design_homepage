import Link from 'next/link';

type Variant = 'primary' | 'secondary';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent-hover',
  secondary: 'border border-line-strong text-text hover:border-text hover:bg-white/5',
};

/** A link styled as a button. Plain anchor, no JS needed. */
export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
