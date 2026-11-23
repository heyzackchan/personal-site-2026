# Portfolio

Plain Astro (no React). The screen is split in half. The left side holds filter pills, a 3x3 tile grid and the tagline, and it stays put while project pages change on the right, using Astro view transitions.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:4321. Use `npm run build` to make the static site in `dist/`.

## Add a case study

1. Make a folder in `src/content/work/`, for example `src/content/work/acme-rebrand/`.
2. Put your images in that folder.
3. Add an `index.md` with this front matter (copy one of the samples):
   - `title`, `client`, `year`, `summary`, `disciplines`
   - `category`: `interactions`, `studies` or `clients` (sets which pill highlights it)
   - `cover` and `coverAlt` (the cover is also the menu tile)
   - `accent` (tile background colour), `order` (lower comes first)
   - `gallery`: a list of `src`, `alt` and optional `caption`
   - `draft: true` hides it from the built site
4. Write the story below the front matter in Markdown.

Images are resized and converted to WebP automatically at build time.

## Where things live

- `src/layouts/Shell.astro` the 50/50 shell and the colour bars. `transition:persist` keeps the left side alive between pages.
- `src/components/Panel.astro` the pills, the tile grid (empty slots fill it to 9), the stripes and the tagline.
- `src/components/DotType.astro` the dot-matrix lettering on the left edge. Change the `text` in Panel.astro.
- `src/pages/index.astro` the right side home view with the pink glow.
- `src/pages/work/[id].astro` the case study template.
- `src/content.config.ts` the case study fields.
- `src/styles/global.css` colour tokens and fonts.
- `scripts/make-samples.mjs` made the placeholder images. Delete it once you add real work.

Search for "Your Name", `hello@example.com` and `example.com` to swap in your details.
