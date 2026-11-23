import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each case study lives in its own folder: src/content/work/<slug>/index.md
// Put its images in the same folder and reference them with ./file.jpg
const work = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/work', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      year: z.number(),
      summary: z.string(),
      disciplines: z.array(z.string()),
      // Which filter pill shows this project in the tile grid.
      category: z.enum(['interactions', 'studies', 'clients']),
      cover: image(),
      coverAlt: z.string(),
      // Tile colour in the menu. Any CSS colour.
      accent: z.string().default('#111111'),
      order: z.number().default(100),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
