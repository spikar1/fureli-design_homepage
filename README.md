# Fureli Design homepage

Portfolio site for Steffen Fureli, game designer & developer (Fureli Design): Next.js 15 (App Router), React 19, Tailwind 4, with embedded Unity WebGL builds.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # run before pushing; this is what Vercel runs
```

Images and videos (`*.png`, `*.jpg`, `*.mp4`) are stored with **Git LFS**. Run `git lfs install` once on a new machine before cloning.

## Project layout

- `src/app/`: pages (`/`, `/about`, `/contact`, `/projects/[id]`). All server components; project pages are statically generated.
- `src/app/globals.css`: design tokens (`@theme`: `ink`, `surface`, `surface-2`, `line`, `text`, `muted`, `accent`, `accent-soft`) and the CSS-only `.reveal` entrance animation. Use the tokens, not raw Tailwind colours.
- `src/app/layout.tsx`: fonts (Bricolage Grotesque for `font-display`, Inter for `font-sans`) and site metadata.
- `src/components/`
  - `Navigation.tsx`, `Footer.tsx`: on every page
  - `FeaturedProjectCard.tsx` (hover video preview), `ProjectCard.tsx` (archive grid), `ProjectMeta.tsx` (overline + chips), `Chip.tsx`, `ButtonLink.tsx`
  - `ProjectMosaic.tsx`: hero background
  - `VideoCarousel.tsx`, `PlayableBuild.tsx` + `UnityWebGL.tsx`: project page media
  - `SocialIcons.tsx`: icons shared by Footer and Contact
- `src/lib/site.ts`: email and social links
- `src/data/projects.ts`: project list (the source of truth for the portfolio), plus helpers `orderedProjects`, `featuredProjects`, `moreProjects`, `getAdjacentProjects`, `getLinkLabel`
- `public/projects/<id>/`: project media (`main.png`, `thumbnail.png`, optional `video.mp4` + `video-poster.jpg`)
- `public/unity-builds/<id>/`: Unity WebGL builds
- `scripts/`: helpers (`npm run setup-project`, `npm run setup-all-projects`)

## Adding a project

Add an entry to `projects` in `src/data/projects.ts`:

| Field | Notes |
|---|---|
| `id` | URL slug and folder name under `public/projects/` |
| `title`, `year`, `shortDescription`, `fullDescription` | `fullDescription`: separate paragraphs with a blank line |
| `context` | `'Commercial' \| 'Indie' \| 'Game jam' \| 'Competition' \| 'Student'`; shown as `year · context` |
| `engine`, `platforms` | optional; shown as chips |
| `role`, `team` | optional; shown in the project page details panel |
| `featured` | optional 1–4; position in the homepage featured section |
| `cover` | optional landscape image for the featured card (defaults to `main.png`) |
| `videos` | optional; when present, the video is the hero media on the project page |
| `unityBuild`, `unityVersion` | optional playable WebGL build |
| `link` | optional; the button label is derived from the domain (`getLinkLabel`) |
| `itchEmbed` | optional itch.io widget HTML |

## Deploy

Vercel's GitHub integration deploys automatically on every push to `master`. Nothing is deployed from the local machine.

- Production: https://fureli-design-homepage-lamp.vercel.app (Vercel project `fureli-design-homepage-lamp`, with Git LFS enabled)
- A second Vercel project, `fureli-design-homepage`, is connected to the same repo but has Git LFS **disabled**, so its images are broken. It is a duplicate and can be deleted.
- Any Vercel project for this repo needs **Settings → Git → Git Large File Storage** turned on, or images are served as LFS pointer files.

Optional: use the Vercel CLI (`vercel login`, then `vercel link`) to see deploy logs or make preview deploys.

## Notes

- Strip EXIF/GPS metadata from photos before adding them to `public/`. The repo and site are public.
