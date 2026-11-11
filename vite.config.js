import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

// Multi-page site: every *.html in the project root is its own page (index, lesson01..22, appendix, 404).
// Add a new lesson = drop a new lessonNN.html here (and list it in src/js/site-data.js).
const pages = Object.fromEntries(
  readdirSync(root)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [f.replace(/\.html$/, ''), resolve(root, f)]),
);

export default defineConfig({
  // './' = relative URLs in the build, so dist/ works on GitHub Pages sub-paths, Netlify, Vercel, any folder.
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: { input: pages },
    // src/data/search-index.js is ~1 MB but is loaded lazily (only when you open search), so the size warning is noise.
    chunkSizeWarningLimit: 1500,
  },
});
