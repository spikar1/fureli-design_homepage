# Fureli Design homepage

Portfolio site for Fureli Design: Next.js 15 (App Router), React 19, Tailwind 4, with embedded Unity WebGL builds.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # run before pushing; this is what Vercel runs
```

Images and videos (`*.png`, `*.jpg`, `*.mp4`) are stored with **Git LFS**. Run `git lfs install` once on a new machine before cloning.

## Project layout

- `src/app/`: pages (`/`, `/about`, `/contact`, `/projects/[id]`)
- `src/components/`: UI components, including `UnityWebGL.tsx`
- `src/data/projects.ts`: project list (the source of truth for the portfolio)
- `public/projects/<id>/`: project images (`main.png`, `thumbnail.png`)
- `public/unity-builds/<id>/`: Unity WebGL builds
- `scripts/`: helpers (`npm run setup-project`, `npm run setup-all-projects`)

## Deploy

Vercel's GitHub integration deploys automatically on every push to `master`. Nothing is deployed from the local machine.

- Production: https://fureli-design-homepage-lamp.vercel.app (Vercel project `fureli-design-homepage-lamp`, with Git LFS enabled)
- A second Vercel project, `fureli-design-homepage`, is connected to the same repo but has Git LFS **disabled**, so its images are broken. It is a duplicate and can be deleted.
- Any Vercel project for this repo needs **Settings → Git → Git Large File Storage** turned on, or images are served as LFS pointer files.

Optional: use the Vercel CLI (`vercel login`, then `vercel link`) to see deploy logs or make preview deploys.

## Notes

- Strip EXIF/GPS metadata from photos before adding them to `public/`. The repo and site are public.
