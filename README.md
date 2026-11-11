# GATE DA 2027: DBMS & Data Warehousing notes

22 lessons + appendix in simple Hinglish, with 17 interactive animations (B+ tree, joins, FD closure, ...).
Built with **Vite** (multi-page, plain HTML + vanilla JS ES modules, no framework).

## Quick start

```bash
npm install        # once
npm run dev        # http://localhost:5173  (live reload)
npm run build      # production build -> dist/
npm run preview    # serve dist/ at http://localhost:4173 to test the real build
```

Needs Node 20.19+ (or 22.12+). Open the site through these servers, not by double-clicking an `.html`
file: browsers block ES modules on `file://`.

## What is where

```
index.html, lesson01.html ... lesson22.html, appendix.html, 404.html   <- the pages (one Vite entry each)
src/
  main.js                  entry used by every page (imports js/app.js)
  css/app.css              all styling (light + dark theme, print styles)
  js/
    app.js                 sidebar, theme, progress ticks, search box, "Answer dekho" buttons, keyboard keys
    site-data.js           list of lessons/parts (sidebar + home + prev/next). Edit when adding a lesson
    widgets-core.js        widget loader: finds <div data-widget="..."> and loads only that widget's file
    widgets/*.js           the 17 animations, one file each (see below)
  data/search-index.js     GENERATED search text (do not edit by hand)
scripts/make-search-index.mjs   generates src/data/search-index.js from the lesson HTML
vite.config.js             multi-page config: every *.html in the root becomes a page
.github/workflows/deploy.yml    build + publish to GitHub Pages
```

## How it works (the parts that are not obvious)

**Lessons are plain HTML.** Each `lessonNN.html` has the sidebar/top bar markup plus the lesson inside
`<section class="lesson" id="LNN">`. The lesson's own `<style>` is scoped to that id so lessons cannot
affect each other. There is no generator any more: edit the HTML directly.

**Widgets.** A lesson contains `<div data-widget="sql-joins"></div>`. On load, `widgets-core.js` looks up
`src/js/widgets/sql-joins.js` (via `import.meta.glob`), loads it, and calls the function it registered.
Vite turns every widget file into its own small chunk, so a page only downloads the widgets it uses.

**Search.** The search box needs text of all lessons. `scripts/make-search-index.mjs` reads the lesson HTML
and writes `src/data/search-index.js` (split at every `<h2>`). The file is loaded only when you first open
search. `npm run dev` and `npm run build` regenerate it automatically; run `npm run index` yourself if you
edit lesson text while `npm run dev` is already running. If you use a new HTML entity (like `&beta;`) the
script stops and tells you to add it to its `NAMED` table.

**Progress / theme** are saved in the browser's `localStorage` (keys start with `gatedba.`).

## Common tasks

- **Fix text in a lesson:** edit `lessonNN.html`. Keep the section structure (`<h2 id="LNN-hX">`) as is.
- **Add an animation:** create `src/js/widgets/my-widget.js`:
  ```js
  import { register } from '../widgets-core.js';
  register('my-widget', function (el, opts) { el.innerHTML = 'hello'; });
  ```
  then put `<div data-widget="my-widget"></div>` in a lesson. Nothing else to register.
- **Add a lesson:** copy an existing `lessonNN.html`, add its entry to `src/js/site-data.js`, rebuild.
- **Change colours/layout:** `src/css/app.css` (CSS variables at the top for the palette and dark mode).

## Deploy

Output is the static folder `dist/` with relative URLs (`base: './'`), so it works from any path.

- **GitHub Pages:** repo Settings -> Pages -> Source: *GitHub Actions*, then push to `master`
  (the workflow in `.github/workflows/deploy.yml` builds and publishes).
- **Netlify / Vercel / Cloudflare Pages:** build command `npm run build`, output directory `dist`.

## Content notes

- Scope: GATE DA Section 5 syllabus + GO Classes DBMS topics only.
- PYQ answers are *derived* (worked out): the paper PDFs contain no official answer key. Marks/type come
  from the paper sections.
