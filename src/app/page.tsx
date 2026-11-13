import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ButtonLink from '@/components/ButtonLink';
import ProjectCard from '@/components/ProjectCard';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';
import { ProjectMosaic } from '@/components/ProjectMosaic';
import { featuredProjects, moreProjects } from '@/data/projects';
import { EMAIL, SOCIAL_LINKS } from '@/lib/site';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero: the screenshot mosaic sits behind a dark gradient */}
        <section className="relative flex min-h-svh items-center justify-center bg-gradient-to-b from-ink/95 to-surface-2/80 px-4 pt-16 text-center">
          <ProjectMosaic />
          <div className="max-w-3xl">
            <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Game designer &amp; developer
            </p>
            <h1
              className="reveal mt-4 font-display text-5xl font-bold tracking-tight text-text sm:text-6xl md:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              Steffen Fureli
            </h1>
            <p
              className="reveal mx-auto mt-6 max-w-2xl text-lg text-text/85 md:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              I design and build games in Unity, shipped on Steam, iOS and Android, plus a decade of
              game jams and experiments.
            </p>
            <div
              className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: '240ms' }}
            >
              <ButtonLink href="#projects">See my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary" className="bg-ink/40 backdrop-blur-sm">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section id="projects" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-32">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Selected work</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Featured projects</h2>
          </header>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
            {featuredProjects.map((project, i) => (
              <li key={project.id}>
                <FeaturedProjectCard project={project} priority={i < 2} />
              </li>
            ))}
          </ul>
        </section>

        {/* Archive */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-32">
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
