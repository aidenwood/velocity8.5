---
title: Velocity Features
description: A complete list of features included in the Velocity framework by Aidxn Design.
---

## Performance

- **Static-first rendering** — Pages are pre-rendered at build time for instant loading
- **Island architecture** — Interactive components hydrate independently, keeping the page fast
- **Image optimisation** — Automatic format conversion, lazy loading, and responsive srcsets
- **Asset compression** — HTML, CSS, and JS are minified and compressed at build time
- **Font optimisation** — Self-hosted fonts with preload hints and font-display swap

## Design System

- **Tailwind CSS integration** — Utility-first styling with a consistent design token system
- **Custom colour palette** — Violet-based primary colours with full light/dark mode support
- **Responsive breakpoints** — Six breakpoints from 442px to 1986px for precise control
- **Typography scale** — Seven font sizes from xs to 7xl with optimised line heights
- **Inter font family** — Clean, modern sans-serif as the default typeface

## Interactivity

- **Alpine.js** — Lightweight reactivity for dropdowns, modals, and toggles
- **GSAP animations** — Scroll-triggered animations and timeline-based sequences
- **View Transitions** — Smooth page-to-page transitions with Astro's built-in API
- **Flickity carousels** — Touch-friendly, auto-playing image and content carousels

## Dark Mode

- **System preference detection** — Automatically matches the user's OS setting
- **Manual toggle** — Users can override with a theme switcher
- **Persistent preference** — Choice is saved to localStorage across sessions
- **Class-based implementation** — Uses Tailwind's `dark:` variant with Alpine.js state

## SEO & Analytics

- **Sitemap generation** — Automatic XML sitemap via `@astrojs/sitemap`
- **Canonical URLs** — Configured per-page to prevent duplicate content issues
- **Open Graph tags** — Social sharing metadata on every page
- **Google Analytics** — Partytown-powered analytics that does not block rendering
- **Structured data ready** — Semantic HTML that search engines understand

## Developer Experience

- **Component-driven** — Small, composable Astro and React components
- **TypeScript support** — Type-safe props and interfaces
- **Hot module replacement** — Instant feedback during development
- **Prettier integration** — Consistent code formatting with Astro and Tailwind plugins
