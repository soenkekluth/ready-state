const options = {
  capture: true,
  once: true,
  passive: true,
};

const isReady = () =>
  document.readyState === 'interactive' || document.readyState === 'complete';

const isCurrentState = state => document.readyState === state;

const resolveState = (state, fn) => {
  if (isCurrentState(state) || isReady()) {
    fn(state);
    return true;
  }
  return false;
};

export const loading = () =>
  new Promise(resolve => {
    if (resolveState('loading', resolve)) return;
    document.addEventListener(
      'readystatechange',
      () => {
        document.readyState === 'loading' && resolve('loading');
      },
      options,
    );
  });

export const interactive = () =>
  new Promise(resolve => {
    if (resolveState('interactive', resolve)) return;
    document.addEventListener(
      'readystatechange',
      () => {
        document.readyState === 'interactive' && resolve('interactive');
      },
      options,
    );
  });

export const complete = () =>
  new Promise(resolve => {
    if (resolveState('complete', resolve)) return;
    document.addEventListener(
      'readystatechange',
      () => {
        document.readyState === 'complete' && resolve('complete');
      },
      options,
    );
  });

export const domready = () =>
  new Promise(resolve => {
    if (resolveState('domready', resolve)) return;

    document.addEventListener(
      'DOMContentLoaded',
      () => {
        resolve('domready');
      },
      options,
    );
  });

export const load = () =>
  new Promise(resolve => {
    if (resolveState('load', resolve)) return;
    window.addEventListener(
      'load',
      () => {
        resolve('load');
      },
      options,
    );
  });

const readyState = {};

Object.defineProperties(readyState, {
  state: {
    get: function() {
      return document.readyState;
    },
  },

  loading: {
    get: function() {
      return loading();
    },
  },
  interactive: {
    get: function() {
      return interactive();
    },
  },
  complete: {
    get: function() {
      return complete();
    },
  },
  window: {
    get: function() {
      return load();
    },
  },
  load: {
    get: function() {
      return load();
    },
  },
  domready: {
    get: function() {
      return domready();
    },
  },
  dom: {
    get: function() {
      return domready();
    },
  },
  ready: {
    get: function() {
      return isReady();
    },
  },
});

export default readyState;
