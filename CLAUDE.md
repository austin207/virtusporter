# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Vite on localhost:8080)
- **Build**: `npm run build` — client build → SSR build of `src/entry-server.tsx` → `scripts/prerender.ts` (static HTML per public route) → `scripts/seo-files.ts` (robots.txt, sitemap.xml, llms.txt, llms-full.txt, `.md` page twins)
- **Plain SPA build** (no prerender): `npm run build:spa`
- **Type-check**: `npm run typecheck` · **Lint**: `npm run lint` · **Preview**: `npm run preview` (note: vite preview falls back every route to index.html; Vercel serves the prerendered `dist/<route>/index.html`)
- **IndexNow ping after deploy**: `npm run indexnow`
- Package manager: npm (`package-lock.json`). No test framework is configured.

## Architecture

React 18 + Vite SPA for VirtusCo, a **robotics engineering services company** (custom robots, ROS, integration, AI) whose autonomous porter robot is presented as a product **in development** at `/product`. Design language is ported from oxigen.sa: dark scroll-driven 3D story heroes handing off to light "paper" editorial sections, square corners, hairlines, mono eyebrows, two-tone headings.

### Rendering & SEO
- Every public route is prerendered at build time (`renderToPipeableStream` + `onAllReady`) and hydrated in `src/main.tsx` (`hydrateRoot` when `#root` has children). Client-only routes (`/cart`, `/auth`, `/forgot-password`, `/virtue`) are served from `dist/_shell.html` via `vercel.json` rewrites.
- Keep render output deterministic (no `window`/`Date.now()`/random in render) or hydration breaks. Browser-only work goes in effects.
- Per-page head + JSON-LD: `<Seo>` (`src/seo/Seo.tsx`) with builders in `src/seo/schema.ts`. Public route list: `src/content/routes.ts` (drives prerender, sitemap, llms.txt).
- OG images (`public/og/*.png`), scene posters (`public/posters/*.webp`) and icons are generated assets — regenerate if titles/scenes change.

### Content
All copy lives in typed data files in `src/content/` (company, services, porter, team, about/FAQ, routes) — pages, JSON-LD and llms.txt all read from them. Edit copy there, not in JSX. Lines marked `DRAFT` are improvised copy awaiting review. Founder bios: `team.ts` (founder pages were the canonical source).

### Design system
- Tokens: `src/styles/theme.css` only (RGB channel CSS vars). Switch palette with `data-palette` on `<html>` in `index.html` (`graphite` = graphite + Virtus red, `oxigen-teal`). Fonts are `--font-sans/serif/mono` (Manrope / Newsreader / Roboto Mono via @fontsource) — swap there.
- Never hardcode colours; use token classes (`bg-ink`, `text-body`, `bg-accent`, `border-ink/15` …). Radius is 0.
- Primitives: `src/components/ox/` (Reveal, Eyebrow, TwoTone, TypeHeading, OxLink, Section, AccordionCards, ColorPanels, FeatureGrid, PixelIcon, DitherTile, ParticleWordmark, ScrollStory/SceneGate, PageHero, CtaBand, FaqList, LegalLayout). Global component classes (`.eyebrow`, `.h-section`, `.lede`, `.field`, `.wrap`, `.sec` …) in `src/index.css`.
- Every top-level section needs `data-tone="dark|light"` (the `Section` primitive sets it) — the fixed header flips colour from it; `data-rail="Label"` adds it to the right-edge section rail.
- Layout: `SiteLayout` (Header, SideRail, Footer) wraps all routes except `/auth`, `/forgot-password`, `/virtue`. App-level: Preloader (once per session), Lenis `SmoothScroll` (also handles scroll-to-top/hash), `PageWipe` route transition.

### 3D scenes (`src/scenes/`)
three.js via react-three-fiber v8 (React 18). Lazy-loaded behind `SceneGate`, which shows the poster on mobile, low-memory, reduced-motion or no-WebGL devices and during prerender. Scroll progress is passed as a ref (no re-renders). Home = LiDAR scan → voxel quadruped assembles; Service = SLAM mapping run; Product = exploded Porter schematic.
- **Gotcha:** the dev-only `lovable-tagger` adds `data-lov-*` props to JSX in `.tsx` files, which crashes r3f/postprocessing components. Keep postprocessing in `src/scenes/post.ts` (createElement, no JSX).

### Backend: Supabase
Client in `src/integrations/supabase/client.ts`; types auto-generated in `types.ts` (do not edit). Edge functions under `supabase/functions/` (`generate-with-gemini`, `auth-email`, `send-email`). Service layer in `src/services/`.
- **As of 2026-10-07 the project host `whtdnzigerjvdfmzbwgg.supabase.co` does not resolve (NXDOMAIN)** — auth, cart, marketplace, press kit, chat persistence and the contact form insert are down until a project is restored/recreated. The contact form falls back to a prefilled `mailto:`.
- Contact form → `feedback` table (extra fields folded into the message). Newsletter → `subscribers`. Password reset → `/forgot-password?reset=1` (add this URL to Supabase Auth redirect allow-list).

### State
Auth via `useAuth()` (`src/context/AuthContext.tsx`); TanStack Query (`retry: 1`, no refetch on focus); one toast system — `toast()` from `@/hooks/use-toast` is a shim over Sonner.

## Key conventions
- Path alias `@/` → `src/`.
- shadcn/ui: only the components in use are kept in `src/components/ui/`; add new ones via the shadcn CLI, then restyle onto tokens.
- Forms: React Hook Form + Zod.
- Routing: all routes in `App.tsx` (lazy pages). Add public routes inside the `SiteLayout` route above the `*` catch-all **and** to `src/content/routes.ts`.
- Founder pages: one template `src/pages/Founder.tsx` at `/founders/:slug`, data in `src/content/team.ts`.

<!-- gen-project-docs:start -->
## Regenerable artifacts

As of 2026-07-29, the build output in this project (`node_modules`, totalling 0.35 GB) was deleted to reclaim disk space. Source, manifests and lockfiles are untouched.

Restore with `npm ci` (bun.lockb was removed on 2026-10-07; npm is the package manager) - see `SETUP.md` in this folder for full detail.

<!-- gen-project-docs:end -->

