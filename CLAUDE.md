# Working on this site

A designer's portfolio built on the Lumos Framework for Astro (no React). The owner reads this code to learn from it.

## Code style

- **Plain, real-word names.** Short is fine (`active`, `project`, `dots`). Abbreviations and single letters are not (`d`, `g`, `cs`, `F`). Not bloated either: `selectedCategoryFilterValue` is too much.
- One idea per line. No clever one-liners or chained ternaries in our own code.
- Comments explain why something is there, in plain English.
- When a name is a judgment call, ask the owner.

## Lumos

- Use Lumos whenever possible: its components (`Section`, `Heading`, `Paragraph`, `RichText`, `Img`, ...), tokens in `src/styles/base.css`, patterns and utility classes. Docs: https://lumosframework.com/docs/
- Read `LUMOS.md` before adding pages, components or styles. Its rules apply, with the exceptions below.
- Our own site-wide components live in `src/components/global/` (LeftPanel, FilterPills, TileGrid, DotText). Helpers live in `src/utils/`.
- Files that came from Lumos (`src/components/{form,interactive,item,media,typography,utility,wrapper}`, `global/Nav`, `global/Footer`, `global/NavLink`, `global/SkipLink`, `Button.astro`, `src/utils`, `src/styles/base.css` apart from our tokens, `patterns.css`, `utilities.css`) are library code. Leave them alone unless a change is needed.

## Our own components

- **BEM class names:** `block`, `block__element`, `block__element--modifier`. This replaces Lumos's `_wrap` / single-underscore naming for our components.
- Mix BEM classes with Lumos utility classes in markup.
- Styles live in the component's `<style is:global>` inside `@layer components`, and use `rem`, `em` or `cqw`, never `px`.
- Motion is CSS transitions and animations, using `--hover-duration` and `--hover-ease`. Use JavaScript for motion only when the owner asks. Small scripts that only track state (like which filter pill is on) are fine.
- Comments are welcome. This overrides Lumos's "no comments" rule.

## Stacki

The owner edits visually with Stacki. Keep `.stacki/` in the repo, and keep pages simple enough for Stacki to model where possible: a layout wrapping a list of components with props.

## Where things live

See README.md.
