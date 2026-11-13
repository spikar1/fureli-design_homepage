import Link from 'next/link';
import { EMAIL, SOCIAL_LINKS, type SocialKey } from '@/lib/site';
import { SOCIAL_ICONS } from './SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="font-display text-lg font-semibold text-text">
            Steffen Fureli
          </Link>
          <p className="mt-1 text-sm text-muted">Game designer &amp; developer · Fureli Design</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-block text-sm text-text underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex gap-2">
            {(Object.keys(SOCIAL_LINKS) as SocialKey[]).map((key) => {
              const Icon = SOCIAL_ICONS[key];
              const link = SOCIAL_LINKS[key];
              return (
                <li key={key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted">© {year} Steffen Fureli</p>
        </div>
      </div>
    </footer>
  );
}
