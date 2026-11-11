/* Widget registry (ES module).

   A widget lives in src/js/widgets/<name>.js and ends with
       register('<name>', function (el, opts) { ...render into el... });
   A lesson page just contains   <div data-widget="<name>"></div>
   mountAll() finds those divs, loads ONLY the needed widget file (code-splitting via
   import.meta.glob) and runs its function. Nothing to register by hand: add a file, use the name. */

const registry = {};

// Lazy loaders: { './widgets/sql-joins.js': () => import('./widgets/sql-joins.js'), ... }
const loaders = import.meta.glob('./widgets/*.js');
const loading = {};

const started = new WeakSet(); // elements we already handled
let io = null;

export function register(name, fn) {
  registry[name] = fn;
}

function readOpts(el) {
  const o = el.getAttribute('data-opts');
  if (!o) return {};
  try { return JSON.parse(o); } catch (e) { return {}; }
}

// Make sure the widget's file has been imported (it registers itself on import).
function ensure(name) {
  if (registry[name]) return Promise.resolve(true);
  const load = loaders['./widgets/' + name + '.js'];
  if (!load) return Promise.resolve(false);
  if (!loading[name]) loading[name] = load().then(() => !!registry[name]);
  return loading[name];
}

function mountNow(el) {
  if (started.has(el)) return Promise.resolve();
  started.add(el);
  const name = el.getAttribute('data-widget');
  return ensure(name).then((ok) => {
    if (!ok) {
      el.innerHTML = '<div class="w-err">Widget "' + name + '" nahi mila.</div>';
      return;
    }
    try {
      registry[name](el, readOpts(el));
      el.setAttribute('data-mounted', '1');
    } catch (err) {
      el.innerHTML = '<div class="w-err">Widget "' + name + '" load nahi hua: ' + String((err && err.message) || err) + '</div>';
      if (window.console) console.error('[Widgets]', name, err);
    }
  });
}

function observer() {
  if (io || !('IntersectionObserver' in window)) return io;
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { io.unobserve(e.target); mountNow(e.target); }
    });
  }, { rootMargin: '400px 0px' });
  return io;
}

export const Widgets = {
  register,
  has: (name) => !!registry[name] || !!loaders['./widgets/' + name + '.js'],
  names: () => Object.keys(loaders).map((k) => k.replace('./widgets/', '').replace('.js', '')),
  mount: mountNow,
  // eager: mount right now. Default: mount when the widget is near the viewport.
  mountAll(root, opts) {
    root = root || document;
    const eager = opts && opts.eager;
    root.querySelectorAll('[data-widget]').forEach((el) => {
      if (started.has(el)) return;
      const o = !eager && observer();
      if (o) o.observe(el); else mountNow(el);
    });
  },
};

// print: mount everything so the page prints completely
window.addEventListener('beforeprint', () => Widgets.mountAll(document, { eager: true }));

// handy for debugging in the browser console: Widgets.names()
window.Widgets = Widgets;
