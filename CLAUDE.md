# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # TypeScript project build + Vite production build
npm run lint       # ESLint
npm run preview    # Preview the production build locally
```

There are no automated tests.

## Architecture

Single-page portfolio (React 19 + TypeScript + Vite) deployed at
**manankakkar.com** on Vercel. `vercel.json` rewrites everything to the SPA
`index.html` — there is no backend.

### Routing (`src/App.tsx`)

- `/` — `pages/Home.tsx`, which stacks the sections in `src/sections/`
  (`Hero`, `About`, `Experience`, `Work`, `Contact`). Nav links are hash
  anchors; `pages/Home.tsx` handles scroll-to on load via `location.state`
  or `location.hash`.
- `/work/:id` — `pages/ProjectDetail.tsx`, looked up from `projects` in
  `src/constants/index.ts`.

### Content source of truth

`src/constants/index.ts` holds `profile`, `socials`, `navLinks`, `stats`,
`experience`, `skillGroups`, and `projects`. Edit content there. Project
images are imported from `src/assets/`.

### Layout

- `src/components/ui/` — **shadcn/ui only**. No custom components live in
  `src/components`; compose shadcn primitives directly in sections/pages.
- `src/sections/` (+ `sections/work/RobotShowcase.tsx`), `src/pages/`,
  `src/layout/` (Navbar, Footer), `src/three/` (R3F scenes), `src/lib/`
  (hooks, theme, smooth-scroll provider, reveal observer, icons).
- Scroll reveals: add `data-reveal` (and `style={revealDelay(ms)}`) to any
  element; each page calls `useRevealObserver()` from `src/lib/reveal.ts`.
- Project thumbnails in `src/assets/*.webp` are real screenshots of each
  project running locally; every project requires an `image`.

### Design system

- UI primitives are **shadcn/ui** (new-york style, `components.json`) in
  `src/components/ui/` — Button, Card, Badge, Input, Textarea, Label,
  Separator, Sheet, Sonner, AspectRatio. Add more with
  `npx shadcn@latest add <name>`, then fix the generated `cn` import to
  `@/lib/utils` and swap any `lucide-react` icons for `@/lib/icons`
  (Phosphor is the only icon family). Import via the `@/` alias.
- Tokens are CSS custom properties in `src/index.css` (`:root` and
  `:root[data-theme="dark"]`) following shadcn's contract, surfaced to
  Tailwind via `@theme inline`: `bg-background`, `text-foreground`,
  `bg-card`, `bg-muted`, `text-muted-foreground`, `border-border`,
  `bg-primary`, plus project extras `text-faint`, `border-border-strong`,
  `bg-brand` (the blue accent), `shadow-soft`. Keep values in hex — the 3D
  scene reads `--muted-foreground` via `getComputedStyle`.
- Theme is a `data-theme` attribute on `<html>`, set pre-paint by an inline
  script in `index.html` and toggled via `src/lib/theme.ts` (a `useSyncExternalStore` over the attribute, so the toggle and Sonner stay in sync). A
  `@custom-variant dark` in `index.css` makes `dark:` utilities follow it.
- Type: `--font-display` (Space Grotesk) for headings, `--font-sans` (system SF
  stack) for UI, `--font-mono` (JetBrains Mono) for meta / eyebrows.
- Motion: animate only `transform` / `opacity`. Use `var(--ease-out)`.
  Scroll reveals use `data-reveal` + `useRevealObserver()` (styles in `index.css`). Everything no-ops under
  `prefers-reduced-motion` — keep it that way.

### 3D

- `src/three/HeroScene.tsx`: wireframe icosahedron accent in the hero.
- `src/three/RobotArm.tsx`: the Work section's centrepiece — a procedural
  robot arm (primitives only, no model files) with closed-form IK. It picks
  project cards out of a fanned DOM pile and presents them. Targets are
  read from the DOM (`presentRef`, `[data-slot]` in `pileRef`) and ray-cast
  into the scene. Every phase is driven by `ArmMotion` (`boot`, `drop`,
  `from/to/travel`, `grip`, `hold`, `heldSlot`) tweened by GSAP in
  `sections/work/RobotShowcase.tsx` — the timeline is the trajectory. The
  first pick (boot) doubles as the loading animation. `SLOT_SCALE` must
  match `PILE_SCALE` in the showcase.
- Both are `React.lazy`-loaded and only mounted when `supportsWebGL()`
  (`src/lib/webgl.ts`) passes. The showcase is desktop-only (≥1024px); smaller
  screens get a grid of `ProjectCard`s. Under reduced motion the arm snaps
  instead of animating.

### Contact

`src/sections/Contact.tsx` uses `@emailjs/browser` with `VITE_EMAILJS_*`
env vars (see `.env.example`). If unset, it renders a mailto fallback.
