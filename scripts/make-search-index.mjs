// Builds src/data/search-index.js from the lesson HTML files (lesson01.html ... appendix.html).
//
//   npm run index        (also runs automatically before `npm run dev` and `npm run build`)
//
// Why: the search box (src/js/app.js) searches this file. It is GENERATED, so after you edit
// any lesson's text, run the command again (dev/build do it for you). Do not edit the output by hand.
//
// Output shape:  [{ id, f, title, s: [{ a: '<heading id>', h: '<heading text>', t: '<plain text>' }] }]
// A "section" = one <h2> block of a lesson (the lesson header block comes first with a: '').

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import SITE from '../src/js/site-data.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'src/data/search-index.js');

// Named HTML entities used in the lessons. Unknown ones throw, so a new entity can't silently break search text.
const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rarr: '→', larr: '←', harr: '↔', rArr: '⇒', hArr: '⇔', mdash: '—', ndash: '–', middot: '·', hellip: '…',
  ldquo: '“', rdquo: '”', times: '×', minus: '−', divide: '÷', le: '≤', ge: '≥', ne: '≠', asymp: '≈', equiv: '≡',
  Sigma: 'Σ', sigma: 'σ', Pi: 'Π', pi: 'π', mu: 'μ', prod: '∏', radic: '√', sup2: '²', sup3: '³', deg: '°',
  cup: '∪', cap: '∩', sub: '⊂', sube: '⊆', sup: '⊃', supe: '⊇', isin: '∈', empty: '∅', exist: '∃', forall: '∀',
  and: '∧', or: '∨', not: '¬', prime: '′', bull: '•', check: '✓', cross: '✗', bowtie: '⋈',
  lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋',
  frac12: '½',
  supseteq: '⊇', nsupe: '⊉', notin: '∉',
};

function decode(s) {
  return s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[A-Za-z][A-Za-z0-9]*);/g, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    if (!(e in NAMED)) throw new Error('Unknown HTML entity &' + e + '; — add it to NAMED in scripts/make-search-index.mjs');
    return NAMED[e];
  });
}

const stripTags = (s) => s.replace(/<[^>]+>/g, ' ');
const squash = (s) => s.replace(/\s+/g, ' ').trim();

function indexLesson(l) {
  const html = readFileSync(resolve(ROOT, l.file), 'utf8');
  const m = /<section class="lesson" id="([^"]+)">/.exec(html);
  if (!m) throw new Error(l.file + ': no <section class="lesson"> found');
  const body = html.slice(m.index + m[0].length);
  const title = l.n > 0 ? 'L' + l.n + ' · ' + l.title : l.title;
  const sections = [];
  for (const part of body.split(/(?=<h2[ >])/)) {
    let a = '', h;
    const hm = /^<h2([^>]*)>([\s\S]*?)<\/h2>/.exec(part);
    if (hm) {
      const idm = /id="([^"]+)"/.exec(hm[1]);
      a = idm ? idm[1] : '';
      h = squash(decode(stripTags(hm[2])));
    } else {
      const hm2 = /class="n">([\s\S]*?)<\/div>/.exec(part);
      h = hm2 ? squash(decode(stripTags(hm2[1]))) : title;
    }
    const text = squash(decode(stripTags(part.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' '))));
    if (text) sections.push({ a, h, t: text });
  }
  return { id: l.id, f: l.file, title, s: sections };
}

const index = SITE.lessons.map(indexLesson);
const out = 'export default ' + JSON.stringify(index) + ';\n';

// Only write when something changed (keeps the dev server from reloading for nothing).
if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== out) {
  writeFileSync(OUT, out);
  console.log('search index written:', index.length, 'pages,', index.reduce((n, x) => n + x.s.length, 0), 'sections');
} else {
  console.log('search index up to date');
}
