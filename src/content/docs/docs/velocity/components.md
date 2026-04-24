---
title: Component Library
description: Documentation for the reusable components included in the Velocity framework.
---

## Layout Components

### Header
The main site navigation component with responsive mobile menu, dark mode toggle, and logo.

```astro
---
import Header from '../components/layout/Header.astro';
---
<Header />
```

**Features:**
- Responsive hamburger menu on mobile
- Dark mode toggle button
- Sticky positioning with backdrop blur
- View Transition-compatible

### Footer
Site-wide footer with navigation links, social links, and copyright.

```astro
---
import Footer from '../components/layout/Footer.astro';
---
<Footer />
```

### Layout
The base page layout wrapping all pages with head metadata, header, footer, and global scripts.

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Page Title" description="Page description">
  <slot />
</Layout>
```

**Props:**
| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Page title for the `<title>` tag and meta |
| `description` | `string` | Yes | Meta description for SEO |
| `canonicalURL` | `URL \| string` | No | Override the canonical URL |

## Content Components

### Hero Sections
Multiple hero section variants for landing pages:

- **HeroGsapScroll** — Scroll-animated hero with GSAP timeline
- **Standard Hero** — Clean hero with heading, description, and CTA buttons

### Service Grids
Responsive grid layouts for displaying service offerings with icons, titles, and descriptions.

### Pricing Tables
Comparison tables with feature lists, pricing tiers, and CTA buttons.

### Testimonials
Client testimonial displays with attribution and optional company logos.

## Interactive Components

### Carousel
Flickity-powered carousels for image galleries and content sliders.

**Variants:**
- `fullscreen-carousel` — Full-width image carousel with autoplay
- `web-carousel` — Portfolio/work showcase carousel
- `market-carousel` — Marketing content carousel

**Configuration:**
```js
{
  cellAlign: 'left',
  contain: true,
  prevNextButtons: false,
  imagesLoaded: true,
  adaptiveHeight: true,
  groupCells: '85%',
  pageDots: false,
  autoPlay: 3200,
  wrapAround: true,
  lazyLoad: true,
}
```

### Dark Mode Toggle
Alpine.js-powered theme switcher that persists user preference.

## Utility Components

### SEO Metadata
Automatic Open Graph tags, Twitter cards, and canonical URL generation handled by the Layout component.

### Sitemap
Automatic XML sitemap generation via the `@astrojs/sitemap` integration.

---

This component library is actively maintained and expanded with each project. Components are designed to be composable and customisable through Tailwind utility classes.
