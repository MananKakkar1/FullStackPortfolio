# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend (root)
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

There are no automated tests.

## Architecture

This is a full-stack personal portfolio deployed at **manankakkar.com** on Vercel.

### Frontend (`src/`)
React 19 + TypeScript SPA built with Vite. Routing via `react-router-dom`:

- `/Home` — landing page
- `/projects` — project gallery (project data lives in `src/pages/Projects.tsx` as `projectsList`)
- `/projects/:projectId` — project detail
- `/about` — about page
- `/resume` — LaTeX resume generator (generates a `.tex` file client-side from `projectsList` using `pdftex.js`)

**Component layout:**
- `src/App.tsx` — router, `ThemeProvider` wrapper
- `src/components/` — `Navbar`, `ThemeContext`, `ThemeSelector`, `Button`, CSS files
- `src/pages/` — one file per route; pages import CSS from `src/components/css_files/`

**Theming:** `ThemeContext` manages a CSS class on `<body>` (e.g. `theme-light`, `theme-dark`, `theme-starwars`). Theme classes are defined in `src/components/css_files/Themes.css`. Theme persists in `localStorage` within a session and is cleared on page unload.

### Backend
Two backend setups exist:

1. **`api/index.js`** — Vercel serverless function (ES module). Handles `POST /api/*` contact form submissions via Nodemailer (Gmail). This is what runs in production. Requires `EMAIL_USER` and `EMAIL_PASS` env vars.

2. **`contact-backend/`** — Express server (legacy/local dev alternative). Has its own `package.json` and dependencies; install separately with `npm install` inside that directory.

**`vercel.json`** rewrites all `/api/*` traffic to the serverless function and everything else to the SPA index.

### Content source of truth
Project data (titles, descriptions, tech stack, images) is defined as a `projectsList` array in `src/pages/Projects.tsx`. The `ResumeGenerator` imports this same list to build the LaTeX template, so changes to project data automatically propagate to the resume output.
