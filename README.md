# Portfolio

A plain Astro site (no React). The screen is split in half. The left half holds the filter pills, a 3 by 3 tile grid and the tagline. It stays on screen while the right half changes from page to page, using Astro view transitions.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:4321. Use `npm run build` to make the finished site in the `dist/` folder.

## Add a case study

1. Make a folder in `src/content/case-studies/`, for example `src/content/case-studies/acme-rebrand/`. The folder name becomes the page address: `/work/acme-rebrand/`.
2. Put your images in that folder.
3. Add an `index.md` file. Copy the top section (the "front matter" between the `---` lines) from one of the samples and fill it in:
   - `title`, `client`, `year`, `summary`, `disciplines`
   - `category`: `interactions`, `studies` or `clients`. This decides which filter pill highlights it.
   - `coverImage` and `coverImageDescription`. The cover is used on the tile and at the top of the page.
   - `tileColor`: the tile's background colour while the image loads.
   - `sortOrder`: lower numbers come first in the grid.
   - `gallery`: a list of extra images, each with `image`, `description` and an optional `caption`.
   - `isDraft: true` hides it from the published site, but still shows it while you run it locally.
4. Write the story below the front matter, in Markdown.

Images are resized and converted to WebP automatically when the site is built.

## Where things live

| File | What it does |
| --- | --- |
| `src/layouts/Shell.astro` | The split-screen frame around every page, and the colour bars in the top right. |
| `src/components/LeftPanel.astro` | The left half: edge stripes, dotted name, pills, tiles and tagline. |
| `src/components/FilterPills.astro` | The Interactions, Studies and Clients buttons, and the code that fades tiles. |
| `src/components/CaseStudyTileGrid.astro` | The 3 by 3 tile grid, and the outline on the tile for the current page. |
| `src/components/DotMatrixText.astro` | Draws text out of dots. Change the name in `LeftPanel.astro`. |
| `src/pages/index.astro` | The home page with the pink glow. |
| `src/pages/about.astro` | The about page. |
| `src/pages/work/[caseStudyId].astro` | The template used for every case study page. |
| `src/content.config.ts` | The list of fields each case study must have. |
| `src/utilities/case-studies.ts` | Shared helpers for loading case studies in the right order. |
| `src/styles/global.css` | Colours, fonts and other site-wide styles. |
| `scripts/make-sample-images.mjs` | Made the placeholder images. Delete it once you add real work. |

Search for "Your Name", `hello@example.com` and `example.com` to swap in your own details.
