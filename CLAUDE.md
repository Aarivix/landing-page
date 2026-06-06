# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing landing page for **Aarivix** — a drone/LiDAR site-survey product ("Reality, Measured."). Next.js 15 App Router + React 19, plain JavaScript (no TypeScript), deployed to Vercel.

## Commands

```bash
npm install
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm start        # next start (after build)
```

No lint, no tests, no `next.config.*`. Vercel builds via `vercel.json` (`@vercel/next`).

## Architecture — read this before editing

**The entire live site is one file: [app/page.js](app/page.js)** (~1000 lines, `'use client'`). It defines every component inline (`Nav`, `Hero`, `ProductShot`, `HowItWorks`, `MetricBand`, `FAQ`, `CTABand`, `Footer`) and exports `Home` as the default. Styling is **inline `style={{}}` objects** referencing CSS custom properties — no Tailwind, no CSS modules, no component imports.

- [app/globals.css](app/globals.css) — the design system. All colors, type, radii, shadows live here as CSS vars (`--petrol-*`, `--mint-*`, `--paper-*`, `--signal-*`, `--fg1/2/3`, `--surface`, `--line`, `--r-sm/md/lg`, `--shadow-*`). **Change design tokens here, not in page.js.**
- [app/layout.js](app/layout.js) — minimal root layout, imports globals, sets `<html lang="en">`.
- [app/not-found.js](app/not-found.js) — 404.

**Theme:** light/dark toggled by `Home` via state → `document.documentElement.setAttribute('data-theme', ...)`. Dark overrides are the `[data-theme='dark']` block in globals.css. `theme` is threaded down as a prop to components that need it (`Nav`, `Hero`, `ProductShot`). Icons are inline SVG paths in the `ICONS` map at the top of page.js (no icon library).

## Legacy / reference — NOT part of the build, do not edit to change the site

Original static design export, kept for reference only. Editing these does nothing to the live page:

- `src/*.jsx` (`HeroFrame`, `Sections`, `Sections2`, `ui`) — older split-component version relying on a global `React` and `window.lucide`; **not imported anywhere**.
- `public/*.html`, `Aarivix Landing Page.html`, `colors_and_type.css`, `tweaks-panel.jsx` — original HTML/CSS export. `vercel.json` redirects the public `.html` URLs to `/`.
- `scraps/`, `uploads/` — screenshots and reference images.

When asked to change the site, edit `app/page.js` and `app/globals.css`. Ignore `src/` and the root `.html`/scrap files unless explicitly told otherwise.

## Brand

Palette: petrol (deep teal `#09324A`), mint, paper (warm off-white), signal yellow (`#FFFB08`) accent. Real product images live in `public/assets/` (`aarivix-mark.png`, `hero-product-light.png`, `hero-product-dark.png`) — use these, not placeholders.
