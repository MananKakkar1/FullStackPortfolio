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

### Design system

- Tokens are CSS custom properties in `src/index.css` (`:root` and
  `:root[data-theme="dark"]`), surfaced to Tailwind via `@theme inline`.
  Use the semantic utilities: `bg-bg`, `bg-surface`, `text-ink`,
  `text-muted`, `text-faint`, `border-border`, `text-accent`, etc.
- Theme is a `data-theme` attribute on `<html>`, set pre-paint by an inline
  script in `index.html` and toggled via `src/lib/theme.ts`. A
  `@custom-variant dark` in `index.css` makes `dark:` utilities follow it.
- Type: `--font-serif` (Newsreader) for headings, `--font-sans` (system SF
  stack) for UI, `--font-mono` (JetBrains Mono) for meta / eyebrows.
- Motion: animate only `transform` / `opacity`. Use `var(--ease-out)`.
  Scroll reveals go through `components/Reveal.tsx` (IntersectionObserver,
  `data-reveal` styles in `index.css`). Everything no-ops under
  `prefers-reduced-motion` — keep it that way.

### 3D

`src/components/three/HeroScene.tsx` is the only 3D: a wireframe
icosahedron with pointer parallax, React Three Fiber + drei. It is
`React.lazy`-loaded, only mounted when `supportsWebGL()` passes, and
freezes under reduced motion. Keep 3D scoped to an accent — not a
centrepiece.

### Contact

`src/sections/Contact.tsx` uses `@emailjs/browser` with `VITE_EMAILJS_*`
env vars (see `.env.example`). If unset, it renders a mailto fallback.
