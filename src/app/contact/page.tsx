import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MailIcon, SOCIAL_ICONS } from '@/components/SocialIcons';
import { EMAIL, SOCIAL_LINKS, type SocialKey } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Steffen Fureli about projects, roles and collaborations.',
};

const CHANNELS = [
  { key: 'email', label: 'Email', href: `mailto:${EMAIL}`, display: EMAIL, Icon: MailIcon, external: false },
  ...(Object.keys(SOCIAL_LINKS) as SocialKey[]).map((key) => ({
    key,
    label: SOCIAL_LINKS[key].label,
    href: SOCIAL_LINKS[key].href,
    display: SOCIAL_LINKS[key].display,
    Icon: SOCIAL_ICONS[key],
    external: true,
  })),
];

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">Get in touch</h1>
          <p className="mt-5 text-lg text-muted">
            I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out
            through any of the following channels.
          </p>
        </div>

        <ul className="reveal mt-10 space-y-3" style={{ animationDelay: '100ms' }}>
          {CHANNELS.map(({ key, label, href, display, Icon, external }) => (
            <li key={key}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-2 md:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-text">{label}</span>
                  <span className="block truncate text-sm text-muted">{display}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                >
                  {external ? '↗' : '→'}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
