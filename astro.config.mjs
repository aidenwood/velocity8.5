import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true
  },
  integrations: [tailwind(), compress(), partytown()]
});