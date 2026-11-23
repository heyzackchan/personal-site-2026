/*
 * Content collections tell Astro what shape our content has.
 * If a case study is missing a field, or a field has the wrong type,
 * the site will refuse to build and tell you exactly what is wrong.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The three filter pills on the left side. Every case study belongs to one of these.
export const caseStudyCategories = ['interactions', 'studies', 'clients'] as const;

const caseStudiesFolder = './src/content/case-studies';

/*
 * Each case study lives in its own folder:
 *   src/content/case-studies/<folder-name>/index.md
 * Its images sit in the same folder and are referenced like ./cover.jpg
 * The folder name becomes the page address: /work/<folder-name>/
 */
const caseStudies = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: caseStudiesFolder,
    generateId: ({ entry: pathToMarkdownFile }) => {
      const folderName = pathToMarkdownFile.split('/')[0];
      return folderName;
    },
  }),

  // `image` is a helper from Astro. It checks the image file exists and prepares it for optimisation.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      year: z.number(),

      // One or two sentences shown under the title, and used as the page description for search engines.
      summary: z.string(),

      // The kinds of work done on the project, for example "Brand identity" or "Packaging".
      disciplines: z.array(z.string()),

      // Which filter pill this case study belongs to.
      category: z.enum(caseStudyCategories),

      // The cover image is shown on the tile and at the top of the case study page.
      coverImage: image(),
      coverImageDescription: z.string(),

      // Background colour of the tile while the cover image loads. Any CSS colour works.
      tileColor: z.string().default('#111111'),

      // Lower numbers appear first in the tile grid.
      sortOrder: z.number().default(100),

      // Extra images shown below the story.
      gallery: z
        .array(
          z.object({
            image: image(),
            description: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),

      // Drafts show up while you run the site locally, but are left out of the published site.
      isDraft: z.boolean().default(false),
    }),
});

export const collections = { caseStudies };
