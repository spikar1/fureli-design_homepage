import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ButtonLink from '@/components/ButtonLink';
import ProjectCard from '@/components/ProjectCard';
import FeaturedSlider from '@/components/FeaturedSlider';
import { ProjectMosaic } from '@/components/ProjectMosaic';
import { featuredProjects, moreProjects } from '@/data/projects';
import { EMAIL, SOCIAL_LINKS } from '@/lib/site';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero: compact, so the featured slider is visible on the first screen */}
        <section className="relative flex overflow-hidden items-center justify-center bg-gradient-to-b from-ink/95 to-surface-2/80 px-4 pb-8 pt-24 text-center md:pb-10 md:pt-28">
          <ProjectMosaic />
          <div className="relative isolate max-w-3xl">
            {/*
              Legibility layer: blurs and dims the mosaic behind the text. Full height of
              the hero (clipped by the section), fully on in the middle half, which covers
              the title, and fading out sideways so the tiles at the edges stay as they are.
            */}
            <div
              aria-hidden="true"
              className="hero-focus pointer-events-none absolute -inset-x-28 -inset-y-96 -z-10 bg-ink/60 backdrop-blur-[4px]"
            />
            <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Game designer &amp; developer
            </p>
            <h1
              className="reveal mt-3 font-display text-5xl font-bold tracking-tight text-text sm:text-6xl md:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              Steffen Fureli
            </h1>
            <p
              className="reveal mx-auto mt-4 max-w-2xl text-lg text-text/85 md:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              I design and build games in Unity, shipped on Steam, iOS and Android, plus a decade of
              game jams and experiments.
            </p>
          </div>
        </section>

        {/* Featured work: Steam-style slider */}
        <section id="projects" aria-label="Featured projects" className="overflow-x-clip pt-8">
          <div className="reveal" style={{ animationDelay: '240ms' }}>
            <FeaturedSlider projects={featuredProjects} />
          </div>
        </section>

        {/* Archive */}
        <section id="all-projects" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 md:pt-24">
          <header className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">More projects</h2>
            <p className="mt-2 text-muted">Client work, indie releases, game jams and student projects.</p>
          </header>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {moreProjects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>

        {/* Contact strip */}
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Have a project or a role in mind?
              </h2>
              <p className="mt-2 text-muted">I&apos;d love to hear about it.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${EMAIL}`}>Email me</ButtonLink>
              <ButtonLink href={SOCIAL_LINKS.linkedin.href} variant="secondary" external>
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
