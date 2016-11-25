'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var inited = false;
var loadingResolver = null;
var windowLoadResolver = null;
var interactiveResolver = null;
var completeResolver = null;

var windowLoadPromise = new Promise(function (resolve, reject) {
  windowLoadResolver = resolve;
});

var loadingPromise = new Promise(function (resolve, reject) {
  loadingResolver = resolve;
});

var interactivePromise = new Promise(function (resolve, reject) {
  interactiveResolver = resolve;
});

var completePromise = new Promise(function (resolve, reject) {
  completeResolver = resolve;
});

var onReadyStateChange = function onReadyStateChange(e) {
  if (typeof document !== 'undefined') {
    switch (document.readyState) {
      case 'loading':
        loadingResolver(document.readyState);
        break;
      case 'interactive':
        interactiveResolver(document.readyState);
        break;
      case 'complete':
        completeResolver(document.readyState);
        document.removeEventListener('readystatechange', onReadyStateChange);
        break;
      default:
        break;
    }
  }
};

var onWindowLoad = function onWindowLoad(e) {
  if (typeof window !== 'undefined') {
    window.removeEventListener('load', onWindowLoad);
  }
  windowLoadResolver(e);
};

var init = function init() {
  if (inited) {
    return;
  }
  if (typeof document !== 'undefined') {
    inited = true;
    document.addEventListener('readystatechange', onReadyStateChange, false);
    window.addEventListener('load', onWindowLoad, false);
  }
};

var loading = exports.loading = function loading() {
  init();
  onReadyStateChange();
  return loadingPromise;
};

var interactive = exports.interactive = function interactive() {
  init();
  onReadyStateChange();
  return interactivePromise;
};

var complete = exports.complete = function complete() {
  init();
  onReadyStateChange();
  return completePromise;
};

var windowLoad = exports.windowLoad = function windowLoad() {
  init();
  return windowLoadPromise;
};

var readyState = {
  loading: loading,
  interactive: interactive,
  complete: complete,
  windowLoad: windowLoad
};

exports.default = readyState;
// module.exports =readyState;