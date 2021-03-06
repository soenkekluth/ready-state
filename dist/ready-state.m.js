var e = { capture: !0, once: !0, passive: !0 },
  n = function(e) {
    return (
      ('interactive' === document.readyState ||
        'complete' === document.readyState) &&
      (e(), !0)
    );
  },
  t = function() {
    return init(), onReadyStateChange(), loadingPromise;
  },
  o = function() {
    return new Promise(function(t) {
      n(t) ||
        document.addEventListener(
          'readystatechange',
          function() {
            'interactive' === document.readyState && t();
          },
          e,
        );
    });
  },
  i = function() {
    return new Promise(function(t) {
      n(t) ||
        document.addEventListener(
          'readystatechange',
          function() {
            'complete' === document.readyState && t();
          },
          e,
        );
    });
  },
  r = function() {
    return new Promise(function(t) {
      n(t) ||
        document.addEventListener(
          'DOMContentLoaded',
          function() {
            t();
          },
          e,
        );
    });
  },
  a = function() {
    return new Promise(function(t) {
      n(t) ||
        window.addEventListener(
          'load',
          function() {
            t();
          },
          e,
        );
    });
  };
export default {
  loading: t,
  interactive: o,
  complete: i,
  load: a,
  domready: r,
};
export {
  t as loading,
  o as interactive,
  i as complete,
  r as domready,
  a as load,
};
//# sourceMappingURL=ready-state.m.js.map
