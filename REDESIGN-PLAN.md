# Redesign plan: personal, professional game-dev portfolio

Status: **approved scope, not started.** Written 2026-11-13 after a design review of the live site.
Goal: the site should read as *Steffen Fureli, game designer & developer*, not a generic agency template.

Scope agreed with Steffen (numbers match the review):

1. Personal hero, **keep the screenshot mosaic background as is.** Reel = later (note only).
2. Featured projects + "More projects" archive. One consistent tag system.
3. Copy rewrite = **later, via an interview** (note only). Only fix obvious typos now.
4. Video first on project pages where it makes sense, plus previous/next project navigation.
5. Professional visual polish: type, colour, footer, About, Contact.
6. Content must not depend on scroll animations or a loading overlay to become visible.

Out of scope now: rewriting project descriptions, new media, the hero reel.

---

## 0. Ground rules

- Stack: Next 15 App Router, React 19, Tailwind 4 (`@theme` in `src/app/globals.css`), framer-motion, next/font.
- Dark-only site. Define colours **once** as tokens; no raw `gray-*`/`blue-*` classes left in pages.
- Don't invent facts. Fields we don't know stay empty and go on the interview list (section 8).
- Verify with `npx tsc --noEmit`, `npm run lint`, `npm run build`, then screenshots (desktop 1440, mobile 390) of `/`, `/about`, `/contact`, `/projects/fruitbus`, `/projects/pattern-puzzle`, `/projects/odyssey`, `/projects/cascade`.
- Commit and deploy only when Steffen says so (deploy = push to `master`, Vercel auto-deploys).

## 1. Design system (globals.css + layout.tsx)

- **Fonts:** `Bricolage_Grotesque` (headings, `--font-display`) + `Inter` (body, `--font-sans`) via next/font CSS variables. Remove the stray `font-family: Arial` and the light/dark `:root` vars from globals.css.
- **Tokens** in `@theme`:
  - `ink` #0B0E14 (page bg), `surface` #131824 (cards), `surface-2` #1A2030 (hover/raised), `line` rgb(255 255 255 / 0.08)
  - `text` #E8EAF0, `muted` #9AA3B5
  - `accent` #FF6B4A (warm coral, complements the purple/blue game art), `accent-soft` = accent at ~15% for chips/hover
  - Check contrast: accent buttons use dark ink text; muted text ≥ 4.5:1 on ink.
- `html { scroll-behavior: smooth; scroll-padding-top: 5rem }` for the fixed nav.
- CSS-only entrance animation `.reveal` (fade-up, `animation-fill-mode: both`), wrapped in `prefers-reduced-motion: no-preference`. Runs without JS, so content is never stuck invisible.
- **Metadata:** title template `%s · Steffen Fureli`, default `Steffen Fureli · Game Designer & Developer`. Description: personal ("Game designer and developer working in Unity…"), not "studio". Add Open Graph title/description/image (Fruitbus main.png).

## 2. Shared components

- **`Navigation.tsx`:** wordmark "Steffen Fureli". Links Home / Projects (`/#projects`, plain link) / About / Contact. Active state = accent underline. Mobile button gets `aria-label` + `aria-expanded`. Token colours.
- **`Footer.tsx` (new):** name + "Fureli Design", email, social icons (LinkedIn, GitHub, itch.io, Discord), © year. Used on every page.
- **`SocialIcons.tsx` (new):** move the SVG icons out of `contact/page.tsx` so Footer and Contact share them.
- **`Chip.tsx` (new, tiny):** one chip style for tags.

## 3. Data model (`src/data/projects.ts`)

Replace free-form `tags` with structured fields. New optional fields:

```ts
context: 'Commercial' | 'Indie' | 'Game jam' | 'Competition' | 'Student';
engine?: string;          // 'Unity', 'Unity + Needle Engine', 'Unity + Houdini Engine', 'UDK'
platforms?: string[];     // 'Steam', 'iOS', 'Android', 'Web', 'PC'
role?: string;            // shown on the project page, not as a chip
team?: string;            // e.g. 'Team of 6', 'Solo'
featured?: number;        // 1–4 = order in the featured section
```

Card chips = `engine` + `platforms`. Overline = `year · context`. Role/team only on the project page.

Values we can fill **from existing data** (everything else stays empty → interview):

| Project | context | engine | platforms | role / team |
|---|---|---|---|---|
| Fruitbus | Commercial | Unity | Steam | – |
| Bukkene Bruse | Commercial | Unity | iOS, Android | – |
| Nordpeis Configurator | Commercial | Unity + Needle Engine | Web | – |
| Gårdsdetektivene | Commercial | Unity | – | – |
| Odyssey | Indie (confirm) | – | – (itch.io) | – |
| Odd Odyssey | Indie (confirm) | – | – | – |
| Pattern Puzzle | Indie | Unity | Web (playable build) | – |
| Forest Spirits | Indie | – | Android | Developer & publisher / team of 4 |
| Gas Control Repair | Game jam | – | – | Project lead & primary programmer / team of 6 |
| Knightball | Competition | – | – | Project lead & lead designer, all graphics implementation / team of 6 |
| Cybility | Game jam | – | – | Game designer & technical artist / team of 4 |
| Rocket Billies | Competition | – | – | Gameplay programmer, graphics implementation / team of 7 |
| Cascade | Game jam | Unity | Web (playable build) | Gameplay design & programming, visuals / team of 5 |
| That Pariah Game | Student | – | – | team of 2 |
| Landscape Generator | Student | Unity + Houdini Engine | – | Solo (final-year project) |
| Ibrahim Sands | Student | UDK | – | Level designer / solo |
| The Refinery | Student | UDK | – | Level designer / solo |

**Featured (order):** 1 Fruitbus, 2 Bukkene Bruse, 3 Pattern Puzzle, 4 Knightball (all have video).
Export a helper `orderedProjects` = featured by order, then the rest by year desc (existing order inside a year). Used by home and by prev/next.

**Link labels:** `getLinkLabel(url)` derives a label from the domain: itch.io → "Play on itch.io", play.google.com → "Get it on Google Play", globalgamejam.org → "Global Game Jam page", wordpress.com → "Read the blog", otherwise "Official website".

**Typo fixes only** (no rewrites; content comes from the interview):
- Title "Steffen Furelis Pattern Puzzle" → "Steffen Fureli's Pattern Puzzle"
- Title "The Rafinery" → "The Refinery" (keep id `the-rafinery`, it is the asset folder)
- "money prices" → "prize money" (Knightball, Rocket Billies)
- Spelling: decieded, ofcourse, alot, out first meeting, backround, fulle fledged, assignement, gamelevel, "the game do look", "you opponents"

## 4. Homepage (`src/app/page.tsx`, becomes a server component)

1. **Hero** (mosaic stays): eyebrow "Game designer & developer"; H1 "Steffen Fureli"; one-line pitch, e.g. "I design and build games in Unity, shipped on Steam, iOS and Android, plus a decade of game jams and experiments." Buttons: primary accent "See my work" (`#projects`), secondary outline "Get in touch" (`/contact`). Plain links, no JS scroll handler.
2. **Featured work** (`id="projects"`): 2×2 grid of large `FeaturedProjectCard`s: 16:9 image; on hover/focus (desktop, no reduced-motion) a muted looping video preview loads (`preload="none"`, only mounted on hover); overline, display-font title, short description, chips, "View project →".
3. **More projects:** the existing grid (user likes it), restyled `ProjectCard`: equal heights (flex column, `line-clamp-2` description), overline, chips. No `whileInView` hiding; hover lift in CSS.
4. **Contact strip:** "Have a project or a role in mind?" + email button + LinkedIn.
5. Footer.

**`ProjectMosaic.tsx`:** keep look and layout. Remove the full-screen fixed "Loading…" overlay (it blocks the whole page until 18 images load). Fade the mosaic in instead; count loads with `onLoad` (replace deprecated `onLoadingComplete`). Mosaic links get `tabIndex={-1}` + `aria-hidden` so keyboard users don't tab through 18 background tiles.

## 5. Project page (`src/app/projects/[id]/`)

Split: `page.tsx` = server (`generateStaticParams`, `generateMetadata` with the project title/description/OG image) → renders `ProjectView.tsx` (client, holds the Unity loading state).

Layout:
1. Back link, overline (`year · context`), H1, short description as lede, chips.
2. **Media, video first:**
   - Has `videos` → `VideoCarousel` is the hero media; the main image is **not** shown (the poster frame covers it).
   - No videos → main image.
   - Has `unityBuild` → separate "Play in your browser" section *after* the hero media (Pattern Puzzle: video, then playable; Cascade: image, then playable).
3. Two columns (stack on mobile): description (8 cols) | sticky details panel (4 cols): Year, Context, Role, Team, Engine, Platforms (only rows with data), primary link button with the derived label.
4. itch.io embed under the description.
5. **Previous / Next project:** two cards with thumbnail + title, using `orderedProjects`, wrapping around.
6. Footer.

`VideoCarousel.tsx` and `UnityWebGL.tsx`: restyle to tokens only, no behaviour changes (the Unity quit fix must stay).

## 6. About and Contact

- **About:** photo as rounded rectangle (no blue ring), name + "Game designer & developer" + intro. Sections as cards: Vision, Beyond the screen, Achievements (same text, years come later from the interview), Expertise as chips. End with CTA buttons "See my work" / "Get in touch". Server component + `.reveal`.
- **Contact:** same five channels, token-styled rows (smaller icons, arrow on the right), shared `SocialIcons`. Server component.

## 7. Clean-up

- Delete `ProjectImage.tsx` if unused after the card rewrite (it only existed for a png→jpg fallback; all assets are png).
- Remove unused public files `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` if nothing references them.
- Next/Image `priority` on above-the-fold images (project hero image, About photo); fixes the LCP warning.
- Update `README.md` (project layout: new components, data fields).

## 8. Create `NEXT-STEPS.md` (part of this job)

**Next up: project interview with Steffen.** Then rewrite every project page from one template so they all feel like one site:
- Template: one-line pitch · Overview (2–3 sentences) · My role & contribution (bullets) · Highlights / what I'm proud of · Outcome (release, awards, players, funding) · Credits/team.
- Fill missing data per project (section 3 table): role, team size, engine, platforms, duration.
- Confirm: Odyssey vs Odd Odyssey context and images (Odyssey's main image says "ODD ODYSSEY"); Knightball was NM i Gameplay vs Global Game Jam 2020 (link points to GGJ).
- Replace generic copy on Odyssey and Odd Odyssey.
- About: years/context for each achievement; consider a CV/PDF download.
- Odyssey video 2: cleaner recording without the FPS counter, if one exists.

**Later: hero gameplay reel.** A 20–30 s muted loop cut from the Fruitbus, Knightball, Bukkene Bruse, Pattern Puzzle and Odyssey clips (all in `public/projects/*/video.mp4`) to replace or sit over the mosaic. Keep it under ~6 MB, H.264, with a poster frame and a reduced-motion fallback.

## 9. Order of work

1. Tokens, fonts, metadata → 2. Data model + `orderedProjects` + typo fixes → 3. Nav, Footer, SocialIcons, Chip → 4. Homepage + Mosaic → 5. Project page split + layout + prev/next → 6. About, Contact → 7. Clean-up, NEXT-STEPS.md, README → 8. tsc/lint/build + screenshots, review against this plan → 9. Show Steffen, deploy on approval.
