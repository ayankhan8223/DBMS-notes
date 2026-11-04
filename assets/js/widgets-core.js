/* window.Widgets: registry for interactive widgets.
   Widget file:  window.Widgets.register("name", function(el, opts){ ... render into el ... });
   Host:         Widgets.mountAll(root)  -> finds [data-widget] and mounts them (lazily, when near viewport). */
(function () {
  if (window.Widgets && window.Widgets.__core) return;
  var registry = {};
  var mounted = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  var pending = [];
  var io = null;

  function isMounted(el) { return mounted ? mounted.has(el) : el.__wmounted; }
  function mark(el) { if (mounted) mounted.add(el); else el.__wmounted = true; }

  function readOpts(el) {
    var o = el.getAttribute('data-opts');
    if (!o) return {};
    try { return JSON.parse(o); } catch (e) { return {}; }
  }

  function mountNow(el) {
    if (isMounted(el)) return true;
    var name = el.getAttribute('data-widget');
    var fn = registry[name];
    if (!fn) return false;
    mark(el);
    try {
      fn(el, readOpts(el));
      el.setAttribute('data-mounted', '1');
    } catch (err) {
      el.innerHTML = '<div class="w-err">Widget "' + name + '" load nahi hua: ' + String(err && err.message || err) + '</div>';
      if (window.console) console.error('[Widgets]', name, err);
    }
    return true;
  }

  function observer() {
    if (io || !('IntersectionObserver' in window)) return io;
    io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); mountNow(e.target); }
      });
    }, { rootMargin: '400px 0px' });
    return io;
  }

  var Widgets = {
    __core: true,
    register: function (name, fn) {
      registry[name] = fn;
      // elements already waiting for this widget
      pending = pending.filter(function (el) {
        if (el.getAttribute('data-widget') === name) { schedule(el); return false; }
        return true;
      });
    },
    has: function (name) { return !!registry[name]; },
    names: function () { return Object.keys(registry); },
    mount: function (el) { return mountNow(el); },
    mountAll: function (root, opts) {
      root = root || document;
      var eager = opts && opts.eager;
      var els = root.querySelectorAll('[data-widget]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (isMounted(el)) continue;
        if (!registry[el.getAttribute('data-widget')]) { if (pending.indexOf(el) < 0) pending.push(el); continue; }
        if (eager) mountNow(el); else schedule(el);
      }
    }
  };

  function schedule(el) {
    var o = observer();
    if (o) o.observe(el); else mountNow(el);
  }

  window.Widgets = Widgets;

  function boot() { Widgets.mountAll(document, {eager:true}); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // print: mount everything so the page prints completely
  window.addEventListener('beforeprint', function () { Widgets.mountAll(document, { eager: true }); });
})();
