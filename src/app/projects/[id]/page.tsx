import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ButtonLink from '@/components/ButtonLink';
import VideoCarousel from '@/components/VideoCarousel';
import PlayableBuild from '@/components/PlayableBuild';
import { ProjectChips, ProjectOverline } from '@/components/ProjectMeta';
import { getAdjacentProjects, getLinkLabel, getProject, projects, type Project } from '@/data/projects';

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  const image = project.cover ?? project.image;
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: image, alt: project.title }],
    },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

/** Split the free-form description into paragraphs and drop source indentation. */
const toParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((para) =>
      para
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .trim(),
    )
    .filter(Boolean);

function Details({ project }: { project: Project }) {
  const rows: [string, string | undefined][] = [
    ['Type', project.type],
    ['Year', project.year],
    ['Context', project.context],
    ['Role', project.role],
    ['Team', project.team],
    ['Engine', project.engine],
    ['Platforms', project.platforms?.join(', ')],
  ];
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Project details</h2>
      <dl className="mt-4 divide-y divide-line">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 gap-4 py-3 text-sm">
              <dt className="text-muted">{label}</dt>
              <dd className="col-span-2 text-text">{value}</dd>
            </div>
          ))}
      </dl>
      {project.link && (
        <ButtonLink href={project.link} external className="mt-6 w-full">
          {getLinkLabel(project.link)} <span aria-hidden="true">↗</span>
        </ButtonLink>
      )}
    </div>
  );
}

function AdjacentCard({ project, direction }: { project: Project; direction: 'previous' | 'next' }) {
  const isNext = direction === 'next';
  return (
    <Link
      href={`/projects/${project.id}`}
      className={`group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-line-strong hover:bg-surface-2 ${
        isNext ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:w-36">
        <Image src={project.thumbnail} alt="" fill sizes="144px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {isNext ? 'Next project →' : '← Previous project'}
        </p>
        <p className="mt-1 truncate font-display text-lg font-semibold text-text group-hover:text-accent">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.id);
  const hasVideos = (project.videos?.length ?? 0) > 0;
  const paragraphs = toParagraphs(project.fullDescription || project.shortDescription);

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        {/* Header */}
        <header className="reveal max-w-3xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>
          <ProjectOverline project={project} className="mt-8" />
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-muted md:text-xl">{project.shortDescription}</p>
          <ProjectChips project={project} className="mt-6" />
        </header>

        {/* Hero media: video first, otherwise the main image */}
        <div className="reveal mt-10 md:mt-12" style={{ animationDelay: '120ms' }}>
          {hasVideos ? (
            <VideoCarousel videos={project.videos!} />
          ) : (
            <div className="flex justify-center overflow-hidden rounded-2xl border border-line bg-surface">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={1920}
                height={1080}
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Playable build */}
        {project.unityBuild && (
          <section className="mt-16" aria-labelledby="play-heading">
            <h2 id="play-heading" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Play in your browser
            </h2>
            <p className="mt-2 text-sm text-muted">Best on desktop with a keyboard. The build may take a moment to load.</p>
            <div className="mt-6">
              <PlayableBuild buildUrl={project.unityBuild} unityVersion={project.unityVersion} />
            </div>
          </section>
        )}

        {/* Description + details */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">About the project</h2>
            <div className="mt-6 max-w-prose space-y-5 text-base leading-relaxed text-text/85 md:text-lg">
              {paragraphs.map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
            {project.itchEmbed && (
              <div
                className="itch-embed mt-10 max-w-full overflow-hidden"
                dangerouslySetInnerHTML={{ __html: project.itchEmbed }}
              />
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Details project={project} />
            </div>
          </aside>
        </div>

        {/* Previous / next */}
        <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          <AdjacentCard project={previous} direction="previous" />
          <AdjacentCard project={next} direction="next" />
        </nav>
      </main>
      <Footer />
    </>
  );
}
