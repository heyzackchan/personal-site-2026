# Portfolio

A portfolio built with [Astro](https://astro.build) and the [Lumos Framework](https://lumosframework.com/docs/) (no React).

The screen is split in half. The left half holds the filter pills, a 3 by 3 tile grid and the tagline. It stays on screen while the right half changes from page to page, using Astro view transitions.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:4321.

- `npm run build` makes the finished site in the `dist/` folder.
- `npm run check` looks for type errors.

## Add a case study

1. Make a folder in `src/content/case-studies/`, for example `src/content/case-studies/acme-rebrand/`. The folder name becomes the page address: `/work/acme-rebrand/`.
2. Put your images in that folder.
3. Add an `index.md` file. Copy the top section (the "front matter" between the `---` lines) from one of the samples and fill it in:
   - `title`, `client`, `year`, `summary`, `disciplines`
   - `category`: `interactions`, `studies` or `clients`. This decides which filter pill highlights it.
   - `coverImage` and `coverAlt`. The cover is used on the tile and at the top of the page.
   - `tileColor`: the tile's background colour while the image loads.
   - `order`: lower numbers come first in the grid.
   - `gallery`: a list of extra images, each with `image`, `alt` and an optional `caption`.
   - `draft: true` hides it from the published site, but still shows it while you run it locally.
4. Write the story below the front matter, in Markdown.

Images are resized and converted automatically when the site is built.

## How the styles work

The site uses Lumos's four style layers. Later layers win:

1. **base** (`src/styles/base.css`): colour swatches, type sizes, spacing and the theme. Our own colours are under "Portfolio swatches".
2. **patterns** (`src/styles/patterns.css`): shared building blocks like `.section` and `.container`.
3. **components**: each component's own styles, inside its file.
4. **utilities** (`src/styles/utilities.css`): single-job classes like `gap-4`, `radius-main` or `color-faded`.

Our own components use BEM class names, for example `tile-grid`, `tile-grid__tile` and `tile-grid__tile--link`.

## Where things live

| File | What it does |
| --- | --- |
| `src/layouts/SplitLayout.astro` | The split-screen frame around every page, and the colour bars in the top right. |
| `src/components/LeftPanel.astro` | The left half: edge stripes, dotted name, pills, tiles and tagline. |
| `src/components/FilterPills.astro` | The Interactions, Studies and Clients buttons. |
| `src/components/TileGrid.astro` | The 3 by 3 tile grid, and the outline on the tile for the current page. |
| `src/components/DotText.astro` | Draws text out of dots. Change the name in `LeftPanel.astro`. |
| `src/pages/index.astro` | The home page with the pink glow. |
| `src/pages/about.astro` | The about page. |
| `src/pages/work/[id].astro` | The template used for every case study page. |
| `src/content.config.ts` | The list of fields each case study must have. |
| `src/utilities/case-studies.ts` | Loads the case studies to show, in grid order. |
| `src/consts.ts` | Site name, description and web address. |
| `src/styles/` | Lumos styles and our colour tokens. |
| `src/components/` (subfolders) | Lumos's ready-made components. |
| `LUMOS.md` | Lumos's guide to building pages and components. |
| `scripts/make-sample-images.mjs` | Made the placeholder images. Delete it once you add real work. |

Search for "Your Name", `hello@example.com` and `example.com` to swap in your own details.

## Credits

Lumos Framework is MIT licensed (see `LICENSE-lumos`). Inter is by Rasmus Andersson, under the SIL Open Font License.
