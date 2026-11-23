/*
 * Content collections tell Astro what shape our content has.
 * If a case study is missing a field, or a field has the wrong type,
 * the site refuses to build and says exactly what is wrong.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** The three filter pills on the left. Every case study belongs to one of these. */
export const categories = ["interactions", "studies", "clients"] as const;

/*
 * Each case study lives in its own folder:
 *   src/content/case-studies/<folder-name>/index.md
 * Its images sit in the same folder and are referenced like ./cover.jpg
 * The folder name becomes the page address: /work/<folder-name>/
 */
const caseStudies = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/case-studies",
    // Use the folder name, not the file name, as each case study's id.
    generateId: ({ entry }) => entry.split("/")[0],
  }),

  // `image` checks the image file exists and prepares it for optimisation.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      year: z.number(),

      // One or two sentences under the title. Also used as the page description for search engines.
      summary: z.string(),

      // The kinds of work on the project, for example "Brand identity" or "Packaging".
      disciplines: z.array(z.string()),

      // Which filter pill this case study belongs to.
      category: z.enum(categories),

      // Shown on the tile and at the top of the case study page.
      coverImage: image(),
      coverAlt: z.string(),

      // The tile's background colour while the cover image loads. Any CSS colour works.
      tileColor: z.string().default("#111111"),

      // Lower numbers come first in the tile grid.
      order: z.number().default(100),

      // Extra images shown below the story.
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),

      // Drafts show while you run the site locally, but are left out of the published site.
      draft: z.boolean().default(false),
    }),
});

export const collections = { caseStudies };
