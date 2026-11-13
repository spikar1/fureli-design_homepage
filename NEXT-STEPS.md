# Next steps

Follows the redesign in `REDESIGN-PLAN.md` (implemented 2026-11-13).

## Next up: project interview with Steffen

Then rewrite every project page from one template so they all feel like one site.

**Template**

1. One-line pitch (`shortDescription`)
2. Overview: 2–3 sentences
3. My role & contribution: bullets
4. Highlights / what I'm proud of
5. Outcome: release, awards, players, funding
6. Credits / team

**Missing data per project** (fields in `src/data/projects.ts`: `role`, `team`, `engine`, `platforms`; duration is new)

| Project | Missing |
|---|---|
| Fruitbus | role, team, duration |
| Bukkene Bruse til Bjørneparken | role, team, duration |
| Nordpeis Configurator | role, team, duration |
| Gårdsdetektivene | role, team, platforms, duration |
| Odyssey | context (confirm Indie), role, team, engine, platforms, duration |
| Odd Odyssey | context (confirm Indie), role, team, engine, platforms, duration |
| Steffen Fureli's Pattern Puzzle | role, team, duration |
| Forest Spirits | engine, duration |
| Gas Control Repair | engine, platforms |
| Knightball | engine, platforms |
| Cybility | engine, platforms |
| Rocket Billies | engine, platforms |
| Cascade | – |
| That Pariah Game | role, engine, platforms |
| Landscape Generator/Editor | role |
| Ibrahim Sands | – |
| The Refinery | – |

**To confirm**

- Odyssey vs Odd Odyssey: context and images. Odyssey's main image says "ODD ODYSSEY", and Odyssey's itch.io embed links to Odd Odyssey.
- Knightball: NM i Gameplay or Global Game Jam 2020? The text says NM i Gameplay, the link points to GGJ. Same question for Rocket Billies (text says NM i Gameplay 2018, link is GGJ 2018).
- Replace the generic copy on Odyssey and Odd Odyssey.
- About: years and context for each achievement; consider a CV/PDF download.
- Odyssey video 2: a cleaner recording without the FPS counter, if one exists.

## Later: hero gameplay reel

A 20–30 s muted loop cut from the Fruitbus, Knightball, Bukkene Bruse, Pattern Puzzle and Odyssey clips (all in `public/projects/*/video.mp4`) to replace or sit over the mosaic. Keep it under ~6 MB, H.264, with a poster frame and a reduced-motion fallback.

## Small follow-ups found during the redesign

- `@headlessui/react` and `@heroicons/react` are no longer imported anywhere; they can be removed from `package.json`.
- `framer-motion` is now only used by `UnityWebGL.tsx` (container resize animation).
- Bukkene Bruse's `main.png` and video are portrait; the featured card uses `thumbnail.png` via the `cover` field. A landscape key art image would look better.
- Fruitbus `thumbnail.png` is only 460×215.
- `main.png` files are JPEG data with a `.png` extension. Works, but a rename/re-encode would be cleaner.
