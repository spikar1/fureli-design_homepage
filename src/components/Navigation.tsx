'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home', isActive: (path: string) => path === '/' },
  { href: '/#projects', label: 'Projects', isActive: (path: string) => path.startsWith('/projects') },
  { href: '/about', label: 'About', isActive: (path: string) => path === '/about' },
  { href: '/contact', label: 'Contact', isActive: (path: string) => path === '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-text">
            Steffen Fureli
          </Link>

          {/* Desktop */}
          <ul className="hidden gap-8 md:flex">
            {LINKS.map(({ href, label, isActive }) => {
              const active = isActive(pathname);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform ${
                      active
                        ? 'text-text after:scale-x-100'
                        : 'text-muted hover:text-text after:scale-x-0'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-text md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <ul id="mobile-menu" className="space-y-1 pb-4 md:hidden">
            {LINKS.map(({ href, label, isActive }) => {
              const active = isActive(pathname);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md border-l-2 px-3 py-2 text-base font-medium ${
                      active
                        ? 'border-accent bg-surface text-text'
                        : 'border-transparent text-muted hover:bg-surface hover:text-text'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
