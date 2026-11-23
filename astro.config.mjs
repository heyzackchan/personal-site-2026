// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.ts';
import { isNoindexRoute } from './src/utils/seo.ts';

export default defineConfig({
  site: SITE_URL,
  prefetch: { prefetchAll: true },
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  // Lumos reads the font through the --font-inter variable.
  // Inter is stored in the project (a variable font, so every weight from 100 to 900 comes in one file).
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/inter-variable.woff2'],
          },
        ],
      },
    },
  ],
  vite: { build: { cssTarget: 'safari15.4' } },
});
