'use strict';

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
      options
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
      options
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
      options
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
      options
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
      options
    );
  });

var readyState = {};

Object.defineProperty(readyState, 'state', {
  get: function() {
    return document.readyState;
  },
});

Object.defineProperty(readyState, 'loading', {
  get: function() {
    return loading();
  },
});

Object.defineProperty(readyState, 'interactive', {
  get: function() {
    return interactive();
  },
});

Object.defineProperty(readyState, 'complete', {
  get: function() {
    return complete();
  },
});
Object.defineProperty(readyState, 'window', {
  get: function() {
    return load();
  },
});

Object.defineProperty(readyState, 'load', {
  get: function() {
    return load();
  },
});

Object.defineProperty(readyState, 'domready', {
  get: function() {
    return domready();
  },
});

Object.defineProperty(readyState, 'dom', {
  get: function() {
    return domready();
  },
});

Object.defineProperty(readyState, 'ready', {
  get: function() {
    return isReady();
  },
});


export default readyState;
