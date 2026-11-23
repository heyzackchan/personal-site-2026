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
- `npm run format` tidies the code formatting with Prettier.

## Edit visually with Stacki

[Stacki](https://github.com/flowtricks/stacki) is a free visual editor for Astro. It edits these same files.

1. Install the desktop app (Mac, Windows or Linux) from stacki.build.
2. Open this project folder in it. It runs `npm run dev` for the live preview.
3. Lumos's ready-made components appear in its Components panel, and `.stacki/` holds the settings for them. The Lumos stylesheets are locked, so Stacki can't change them by accident.

Stacki edits a page visually only when the page is a layout wrapping a list of components. Pages with their own HTML, such as the home page, open in its code editor instead.

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

This follows the folder layout of a fresh `npm create astro@latest` project, plus the extra folders Lumos adds.

| File or folder | What it does |
| --- | --- |
| `src/pages/` | One file per page. `index.astro` is the home page, `about.astro` is /about, and `work/[id].astro` is the template for every case study. |
| `src/layouts/SplitLayout.astro` | The split-screen frame around every page, and the colour bars in the top right. |
| `src/components/global/` | Pieces that appear on every page. Ours are `LeftPanel`, `FilterPills`, `TileGrid` and `DotText`. Lumos's `Nav`, `Footer` and `SkipLink` live here too. |
| `src/components/` (other folders) | Lumos's ready-made components, such as `Section`, `Heading` and `Img`. |
| `src/content/case-studies/` | Your case studies, one folder each. |
| `src/content.config.ts` | The list of fields each case study must have. |
| `src/styles/` | Lumos styles and our colour tokens. |
| `src/utils/` | Small helpers. `case-studies.ts` loads the case studies in grid order. The others come with Lumos. |
| `src/assets/` | Fonts and icons that Astro optimises. |
| `src/consts.ts` | Site name, description and web address. |
| `public/` | Files served exactly as they are: the favicon and the image used when the site is shared. |
| `.stacki/` | Settings for the Stacki visual editor. |
| `.agents/skills/` | Lumos's helper guides for AI assistants, such as upgrading Lumos. `.claude/skills/` links to them. |
| `.vscode/` | Recommended VS Code extension and settings. |
| `LUMOS.md` | Lumos's guide to building pages and components. |
| `scripts/make-sample-images.mjs` | Made the placeholder images. Delete it once you add real work. |

Search for "Your Name", `hello@example.com` and `example.com` to swap in your own details.

## Credits

Lumos Framework is MIT licensed (see `LICENSE-lumos`). Inter is by Rasmus Andersson, under the SIL Open Font License.
