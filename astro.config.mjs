import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://aidxn.com',
  integrations: [
    starlight({
      title: 'Aidxn Design Docs',
      logo: {
        light: './src/assets/ax-logo-purp.svg',
        dark: './src/assets/ax-logo-white.svg',
        replacesTitle: false,
      },
      disable404Route: true,
      customCss: ['./src/styles/starlight-custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { slug: 'docs/getting-started' },
            { slug: 'docs/getting-started/process' },
          ],
        },
        {
          label: 'Services',
          items: [
            { slug: 'docs/services/web-design' },
            { slug: 'docs/services/branding' },
            { slug: 'docs/services/marketing' },
          ],
        },
        {
          label: 'Velocity',
          items: [
            { slug: 'docs/velocity' },
            { slug: 'docs/velocity/features' },
            { slug: 'docs/velocity/components' },
          ],
        },
        {
          label: 'For Clients',
          items: [
            { slug: 'docs/for-clients/dashboard' },
            { slug: 'docs/for-clients/reporting' },
            { slug: 'docs/for-clients/faq' },
          ],
        },
        {
          label: 'Tech Stack',
          link: '/docs/tech-stack/',
        },
      ],
    }),
    react(),
    tailwind(),
    compress(),
    partytown(),
    sitemap(),
  ],
});
