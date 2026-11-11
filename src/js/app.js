/* Site shell (ES module): sidebar, theme, progress, search, TOC, answer reveal, code copy, keyboard. */
import SITE from './site-data.js';
import { Widgets } from './widgets-core.js';

  var doc = document, root = doc.documentElement;
  var CUR = root.getAttribute('data-current');
  var KIND = root.getAttribute('data-kind');
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  /* ---------- safe storage ---------- */
  var mem = {};
  function sget(k) { try { var v = localStorage.getItem(k); return v === null ? (mem[k] || null) : v; } catch (e) { return mem[k] || null; } }
  function sset(k, v) { mem[k] = v; try { localStorage.setItem(k, v); } catch (e) {} }
  function sdel(k) { delete mem[k]; try { localStorage.removeItem(k); } catch (e) {} }

  /* ---------- theme ---------- */
  function sysDark() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches; }
  function isDark() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : sysDark(); }
  function setTheme(t) { root.setAttribute('data-theme', t); sset('gatedba.theme', t); updThemeBtn(); }
  function updThemeBtn() { var b = $('#themeBtn'); if (b) { b.textContent = isDark() ? '☀' : '☾'; b.title = isDark() ? 'Light mode' : 'Dark mode'; } }
  function toggleTheme() { setTheme(isDark() ? 'light' : 'dark'); }

  /* ---------- progress ---------- */
  var order = SITE.lessons.map(function (l) { return l.id; });
  var numbered = SITE.lessons.filter(function (l) { return l.n > 0; });
  function getDone() { try { var a = JSON.parse(sget('gatedba.done') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function setDone(a) { sset('gatedba.done', JSON.stringify(a)); }
  function isDoneId(id) { return getDone().indexOf(id) >= 0; }
  function toggleDone(id, on) {
    var a = getDone().filter(function (x) { return x !== id; });
    if (on) a.push(id);
    setDone(a); paint();
  }
  function paint() {
    var d = getDone();
    $$('#sidebar a[data-id], .mcard[data-id]').forEach(function (a) { a.classList.toggle('done', d.indexOf(a.getAttribute('data-id')) >= 0); });
    var n = numbered.filter(function (l) { return d.indexOf(l.id) >= 0; }).length, tot = numbered.length || 22;
    var pct = Math.round(100 * n / tot);
    var sb = $('#sbBar'); if (sb) sb.style.width = pct + '%';
    var st = $('#sbTxt'); if (st) st.textContent = n + ' / ' + tot + ' done';
    var hb = $('#homeBar'); if (hb) hb.style.width = pct + '%';
    var ht = $('#homeTxt'); if (ht) ht.textContent = n + ' / ' + tot + ' lessons done (' + pct + '%)';
    $$('.doneChk').forEach(function (c) { c.checked = d.indexOf(c.getAttribute('data-id')) >= 0; });
  }
  function lessonById(id) { return SITE.lessons.filter(function (l) { return l.id === id; })[0]; }

  /* ---------- sidebar / mobile menu ---------- */
  function menu(open) {
    doc.body.classList.toggle('menu-open', open);
    var b = $('#menuBtn'); if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  /* ---------- Q&A reveal ---------- */
  var allShown = false;
  function setupQA() {
    var qas = $$('.qa');
    if (!qas.length) return;
    qas.forEach(function (qa) {
      var a = $('.a', qa); if (!a) return;
      qa.classList.add('hide');
      var b = doc.createElement('button');
      b.type = 'button'; b.className = 'rv'; b.textContent = 'Answer dekho';
      b.addEventListener('click', function () {
        var hidden = qa.classList.toggle('hide');
        b.textContent = hidden ? 'Answer dekho' : 'Answer chhupao';
      });
      qa.insertBefore(b, a);
    });
    var ab = $('#ansBtn');
    if (ab) {
      ab.hidden = false; ab.setAttribute('aria-pressed', 'false');
      ab.addEventListener('click', toggleAnswers);
    }
  }
  function toggleAnswers() {
    var ab = $('#ansBtn'); if (!ab || ab.hidden) return;
    allShown = !allShown;
    $$('.qa').forEach(function (qa) {
      qa.classList.toggle('hide', !allShown);
      var b = $('.rv', qa); if (b) b.textContent = allShown ? 'Answer chhupao' : 'Answer dekho';
    });
    ab.textContent = allShown ? 'Hide all answers' : 'Show all answers';
    ab.setAttribute('aria-pressed', allShown ? 'true' : 'false');
  }

  /* ---------- code blocks: copy ---------- */
  function copyText(t, btn) {
    function ok() { if (btn) { var o = btn.textContent; btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = o; }, 1200); } }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).then(ok, fallback); } else fallback();
    function fallback() {
      var ta = doc.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;opacity:0;top:0';
      doc.body.appendChild(ta); ta.select();
      try { doc.execCommand('copy'); ok(); } catch (e) {}
      doc.body.removeChild(ta);
    }
  }
  function setupCode() {
    $$('.lesson pre').forEach(function (pre) {
      var b = doc.createElement('button'); b.type = 'button'; b.className = 'copybtn'; b.textContent = 'Copy';
      b.setAttribute('aria-label', 'Code copy karo');
      b.addEventListener('click', function (e) { e.preventDefault(); copyText(pre.innerText.replace(/\s*Copy$/, ''), b); });
      pre.appendChild(b);
    });
  }

  /* ---------- wide tables scroll ---------- */
  function setupTables() {
    $$('.lesson table').forEach(function (t) {
      if (t.closest('.tscroll') || t.parentNode.closest('table') || t.closest('.wbox')) return;
      var w = doc.createElement('div'); w.className = 'tscroll';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  /* ---------- mini TOC ---------- */
  function setupTOC() {
    var hs = $$('.lesson h2[id], .lesson h3[id]').filter(function (h) { return !h.closest('.wbox') && !h.closest('.cs'); });
    var side = $('#toc');
    if (!hs.length || KIND !== 'lesson') { if (side) side.style.display = 'none'; return; }
    function label(h) { var c = h.cloneNode(true); $$('small', c).forEach(function (s) { s.remove(); }); return c.textContent.trim(); }
    var html = '', inl = '';
    hs.forEach(function (h) {
      var l = h.tagName === 'H3' ? ' l3' : '';
      var a = '<a class="' + l.trim() + '" href="#' + h.id + '" data-h="' + h.id + '">' + esc(label(h)) + '</a>';
      html += a; inl += a;
    });
    if (side) side.innerHTML = '<div class="th">Is page par</div>' + html;
    var art = $('.lesson-wrap'), sec = $('.lesson');
    if (art && sec) {
      var d = doc.createElement('details'); d.className = 'toc-inline';
      d.innerHTML = '<summary>Is lesson ke sections (' + hs.length + ')</summary>' + inl;
      var head = $('.lessonhead, .ap-head', sec);
      if (head && head.nextSibling) head.parentNode.insertBefore(d, head.nextSibling); else sec.insertBefore(d, sec.firstChild);
      d.addEventListener('click', function (e) { if (e.target.tagName === 'A') d.open = false; });
    }
    var links = $$('#toc a'), map = {};
    links.forEach(function (a) { map[a.getAttribute('data-h')] = a; });
    function spy() {
      var cur = null, y = 90;
      for (var i = 0; i < hs.length; i++) { if (hs[i].getBoundingClientRect().top - y <= 0) cur = hs[i]; else break; }
      links.forEach(function (a) { a.classList.remove('on'); });
      if (cur && map[cur.id]) { map[cur.id].classList.add('on'); var t = $('#toc'); if (t && t.scrollHeight > t.clientHeight) { var a = map[cur.id]; if (a.offsetTop < t.scrollTop || a.offsetTop > t.scrollTop + t.clientHeight - 40) t.scrollTop = a.offsetTop - 60; } }
    }
    window.addEventListener('scroll', throttle(spy, 100), { passive: true }); spy();
  }

  /* ---------- reading progress + last position ---------- */
  function throttle(fn, ms) { var t = 0; return function () { var n = Date.now(); if (n - t > ms) { t = n; fn(); } }; }
  function setupRead() {
    var rb = $('#readBar');
    function f() {
      var h = doc.documentElement.scrollHeight - window.innerHeight;
      if (rb) rb.style.width = (h > 0 ? Math.min(100, 100 * window.scrollY / h) : 0) + '%';
    }
    window.addEventListener('scroll', throttle(f, 50), { passive: true }); f();
    if (KIND === 'lesson' && /^L\d\d$|^APP$/.test(CUR)) {
      sset('gatedba.last', CUR);
      var save = throttle(function () { sset('gatedba.pos.' + CUR, String(Math.round(window.scrollY))); }, 800);
      window.addEventListener('scroll', save, { passive: true });
      var p = parseInt(sget('gatedba.pos.' + CUR) || '0', 10);
      if (p > 200 && !location.hash) setTimeout(function () { window.scrollTo(0, p); }, 60);
    }
  }
  function setupHome() {
    if (KIND !== 'home') return;
    var last = sget('gatedba.last'), b = $('#continueBtn');
    var l = last && lessonById(last);
    if (b && l) { b.href = l.file; b.innerHTML = 'Wahin se shuru karo: ' + (l.n ? 'Lesson ' + l.n : 'Appendix') + ' &rarr;'; }
    var hs = $('#homeSearch'); if (hs) hs.addEventListener('click', openSearch);
  }

  /* ---------- search ---------- */
  var idxLoaded = false, idxLoading = false, sel = 0, results = [];
  var SEARCH_INDEX = null; // filled on first search (separate chunk, built by scripts/make-search-index.mjs)
  function loadIndex(cb) {
    if (SEARCH_INDEX) { idxLoaded = true; return cb(); }
    if (idxLoading) { return setTimeout(function () { loadIndex(cb); }, 80); }
    idxLoading = true;
    import('../data/search-index.js').then(function (m) {
      SEARCH_INDEX = m.default; idxLoaded = true; idxLoading = false; cb();
    }).catch(function () {
      idxLoading = false; $('#sRes').innerHTML = '<p>Search index load nahi hua.</p>';
    });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function re_esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function openSearch() {
    var m = $('#searchModal'); m.hidden = false; menu(false);
    var i = $('#sInput'); i.focus(); i.select();
    loadIndex(function () { if (i.value) runSearch(i.value); });
  }
  function closeSearch() { $('#searchModal').hidden = true; }
  function snippet(t, terms) {
    var low = t.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length; i++) { var p = low.indexOf(terms[i]); if (p >= 0 && (pos < 0 || p < pos)) pos = p; }
    if (pos < 0) pos = 0;
    var s = Math.max(0, pos - 60), e = Math.min(t.length, pos + 150);
    var out = (s > 0 ? '…' : '') + t.slice(s, e) + (e < t.length ? '…' : '');
    out = esc(out);
    var rx = new RegExp('(' + terms.map(function (x) { return re_esc(esc(x)); }).join('|') + ')', 'ig');
    return out.replace(rx, '<mark>$1</mark>');
  }
  function runSearch(q) {
    var box = $('#sRes'); q = q.trim().toLowerCase();
    if (!SEARCH_INDEX) return;
    if (q.length < 2) { box.innerHTML = '<p class="mut">Kam se kam 2 letters likho.</p>'; results = []; return; }
    var terms = q.split(/\s+/).filter(Boolean), res = [];
    SEARCH_INDEX.forEach(function (L) {
      L.s.forEach(function (S) {
        var tl = S.t.toLowerCase(), hl = S.h.toLowerCase(), sc = 0, ok = true;
        for (var i = 0; i < terms.length; i++) {
          var term = terms[i], c = 0, p = -1;
          while ((p = tl.indexOf(term, p + 1)) >= 0 && c < 20) c++;
          var ih = hl.indexOf(term) >= 0;
          if (!c && !ih) { ok = false; break; }
          sc += c + (ih ? 15 : 0);
        }
        if (ok) { if (tl.indexOf(q) >= 0) sc += 10; res.push({ L: L, S: S, sc: sc }); }
      });
    });
    res.sort(function (a, b) { return b.sc - a.sc; });
    results = res.slice(0, 40); sel = 0;
    if (!results.length) { box.innerHTML = '<p>Kuch nahi mila &ldquo;' + esc(q) + '&rdquo;. Doosra spelling try karo (e.g. &ldquo;bplus&rdquo; ki jagah &ldquo;b+&rdquo;).</p>'; return; }
    box.innerHTML = results.map(function (r, i) {
      var href = r.L.f + (r.S.a ? '#' + r.S.a : '') + '?q=' + encodeURIComponent(q);
      href = r.L.f + '?q=' + encodeURIComponent(q) + (r.S.a ? '#' + r.S.a : '');
      return '<a class="sr' + (i === 0 ? ' sel' : '') + '" href="' + href + '"><div class="rt">' + esc(r.L.title) + '</div><div class="rh">' + esc(r.S.h) + '</div><div class="rs">' + snippet(r.S.t, terms) + '</div></a>';
    }).join('') + (res.length > 40 ? '<p class="mut">Top 40 dikhaye (' + res.length + ' mile).</p>' : '');
  }
  function moveSel(d) {
    var els = $$('#sRes .sr'); if (!els.length) return;
    els[sel] && els[sel].classList.remove('sel');
    sel = (sel + d + els.length) % els.length;
    els[sel].classList.add('sel'); els[sel].scrollIntoView({ block: 'nearest' });
  }
  function setupSearch() {
    var sb = $('#searchBtn'); if (sb) sb.addEventListener('click', openSearch);
    var inp = $('#sInput');
    inp.addEventListener('input', function () { loadIndex(function () { runSearch(inp.value); }); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
      else if (e.key === 'Enter') { var a = $$('#sRes .sr')[sel]; if (a) { e.preventDefault(); location.href = a.href; } }
    });
    $('#sClose').addEventListener('click', closeSearch);
    $('#searchModal').addEventListener('mousedown', function (e) { if (e.target.id === 'searchModal') closeSearch(); });
    // highlight terms after arriving from search
    var m = /[?&]q=([^&#]+)/.exec(location.search);
    if (m && KIND === 'lesson') {
      var terms = decodeURIComponent(m[1]).toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
      highlight($('.lesson'), terms);
      var first = $('mark.hl');
      if (first && !location.hash) setTimeout(function () { first.scrollIntoView({ block: 'center' }); }, 80);
      else if (location.hash) setTimeout(function () { var t = doc.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }, 80);
    }
  }
  function highlight(rootEl, terms) {
    if (!rootEl || !terms.length) return;
    var rx = new RegExp('(' + terms.map(re_esc).join('|') + ')', 'ig');
    var w = doc.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode; if (!p) return NodeFilter.FILTER_REJECT;
        var t = p.nodeName; if (t === 'STYLE' || t === 'SCRIPT' || t === 'TEXTAREA' || p.closest('.wbox,svg')) return NodeFilter.FILTER_REJECT;
        return rx.test(n.nodeValue) ? (rx.lastIndex = 0, NodeFilter.FILTER_ACCEPT) : (rx.lastIndex = 0, NodeFilter.FILTER_REJECT);
      }
    });
    var nodes = [], n, count = 0; while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (n) {
      if (count > 150) return;
      var frag = doc.createDocumentFragment(), s = n.nodeValue, last = 0, m; rx.lastIndex = 0;
      while ((m = rx.exec(s))) {
        frag.appendChild(doc.createTextNode(s.slice(last, m.index)));
        var k = doc.createElement('mark'); k.className = 'hl'; k.textContent = m[0]; frag.appendChild(k); count++;
        last = m.index + m[0].length; if (m.index === rx.lastIndex) rx.lastIndex++;
      }
      frag.appendChild(doc.createTextNode(s.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
    // reveal answers that contain a hit
    $$('.qa.hide').forEach(function (qa) { if ($('mark.hl', qa)) { /* keep hidden, user decides */ } });
  }

  /* ---------- keyboard ---------- */
  function neighbour(d) {
    var i = order.indexOf(CUR); if (i < 0) return null;
    var l = SITE.lessons[i + d]; return l || null;
  }
  function typing(e) { var t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable); }
  function setupKeys() {
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (!$('#searchModal').hidden) closeSearch(); else menu(false); return; }
      if (e.metaKey || e.ctrlKey || e.altKey) { if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); } return; }
      if (typing(e) || !$('#searchModal').hidden) return;
      var k = e.key;
      if (k === '/') { e.preventDefault(); openSearch(); }
      else if (k === 't') toggleTheme();
      else if (k === 'a') toggleAnswers();
      else if (k === 'm') menu(!doc.body.classList.contains('menu-open'));
      else if (k === 'ArrowRight' || k === 'n' || k === 'j') { var n = neighbour(1); if (n) location.href = n.file; }
      else if (k === 'ArrowLeft' || k === 'p' || k === 'k') { var p = neighbour(-1); if (p) location.href = p.file; }
    });
  }

  /* ---------- init ---------- */
  function init() {
    updThemeBtn();
    var tb = $('#themeBtn'); if (tb) tb.addEventListener('click', toggleTheme);
    var mb = $('#menuBtn'); if (mb) mb.addEventListener('click', function () { menu(!doc.body.classList.contains('menu-open')); });
    var sc = $('#scrim'); if (sc) sc.addEventListener('click', function () { menu(false); });
    $$('#sidebar a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
    $$('.doneChk').forEach(function (c) { c.addEventListener('change', function () { toggleDone(c.getAttribute('data-id'), c.checked); }); });
    var rp = $('#resetProg'); if (rp) rp.addEventListener('click', function () { if (confirm('Saara progress (done ticks, last position) reset kar du?')) { sdel('gatedba.done'); sdel('gatedba.last'); order.forEach(function (i) { sdel('gatedba.pos.' + i); }); paint(); } });
    // keep sidebar current item visible
    var cur = $('#sidebar a.cur'); if (cur) { var sbx = $('#sidebar'); sbx.scrollTop = Math.max(0, cur.offsetTop - 140); }
    setupQA(); setupCode(); setupTables(); setupTOC(); setupRead(); setupHome(); setupSearch(); setupKeys();
    paint();
    Widgets.mountAll(doc, { eager: true });
    if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updThemeBtn); } catch (e) {} }
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
  window.__site = { runSearch: runSearch, toggleAnswers: toggleAnswers, getDone: getDone };
