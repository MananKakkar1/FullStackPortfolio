# Manan Kakkar — Portfolio

Personal portfolio deployed at **manankakkar.com**.

## Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`) — design tokens live in `src/index.css` under `@theme`
- **React Three Fiber + drei + three** — one restrained wireframe accent in the hero (`src/components/three/HeroScene.tsx`), lazy-loaded and gated on WebGL support
- **GSAP + @gsap/react** — hero entrance; scroll reveals use `IntersectionObserver` (`src/components/Reveal.tsx`)
- **@emailjs/browser** — contact form (client-side, no backend)

## Design language

Editorial minimalism with light/dark parity. One accent colour, editorial
serif (Newsreader) for display type, system SF stack for UI, JetBrains Mono
for meta. Motion is limited to `transform` / `opacity`, uses a single custom
ease-out curve, and fully no-ops under `prefers-reduced-motion`.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # preview the production build
```

## Contact form

Copy `.env.example` to `.env` and fill in EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

The template should expose `from_name`, `reply_to`, and `message`. Without
these, the contact section falls back to a mailto link.

## Content

All copy, projects, experience, and skills live in `src/constants/index.ts`.
Projects there also drive the `/work/:id` detail route.
