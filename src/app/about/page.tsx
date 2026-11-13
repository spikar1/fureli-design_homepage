import type { Metadata } from 'next';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ButtonLink from '@/components/ButtonLink';
import Chip from '@/components/Chip';

export const metadata: Metadata = {
  title: 'About',
  description: 'Steffen Fureli is a game designer and developer with a background in teaching.',
};

const ACHIEVEMENTS = [
  'Best Teacher Award',
  'Selected for ExpoTees at Teesside University',
  'Best Student at Noroff',
  'Top 3 in NM i Gameplay (twice)',
];

const EXPERTISE = ['Unity Development', 'Game Design', 'C# Programming', 'Next.js Development', 'Teaching & Public Speaking'];

function Card({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <section
      className="reveal rounded-2xl border border-line bg-surface p-6 md:p-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="font-display text-xl font-semibold tracking-tight text-text">{title}</h2>
      <div className="mt-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="reveal md:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">Steffen Fureli</h1>
            <p className="mt-2 text-xl text-muted md:text-2xl">Game designer &amp; developer</p>
            <p className="mt-8 text-lg leading-relaxed text-text/85">
              I&apos;m a passionate game designer and developer with a unique background in education. My journey
              has taken me from teaching to game development, where I combine my love for learning with my drive
              to create innovative gaming experiences. I&apos;m particularly drawn to projects that push the
              boundaries of technology and create unexpected, meaningful experiences.
            </p>
          </div>
          <div className="reveal md:col-span-5" style={{ animationDelay: '100ms' }}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface">
              <Image
                src="/SteffenMFureli.jpg"
                alt="Portrait of Steffen Fureli"
                fill
                priority
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2">
          <Card title="Vision" delay={150}>
            <p>
              My goal is to establish a game studio that creates unique, thought-provoking games that leave players
              in awe. I believe in pushing the boundaries of what&apos;s possible with technology while creating
              meaningful experiences that resonate with players.
            </p>
          </Card>
          <Card title="Beyond the screen" delay={200}>
            <p>
              When I&apos;m not coding or designing games, you can find me perfecting my golf swing or performing
              impressive tricks on the trampoline. These activities reflect my approach to game development:
              precision, creativity, and a willingness to take calculated risks.
            </p>
          </Card>
          <Card title="Achievements" delay={250}>
            <ul className="space-y-3">
              {ACHIEVEMENTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-text/85">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Expertise" delay={300}>
            <ul className="flex flex-wrap gap-2">
              {EXPERTISE.map((item) => (
                <li key={item}>
                  <Chip className="px-3 py-1 text-sm">{item}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/#projects">See my work</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
