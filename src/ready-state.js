var inited = false;
var loadingResolver = null;
var windowLoadResolver = null;
var interactiveResolver = null;
var completeResolver = null;

const windowLoadPromise = new Promise((resolve, reject) => {
  windowLoadResolver = resolve;
});

const loadingPromise = new Promise((resolve, reject) => {
  loadingResolver = resolve;
});

const interactivePromise = new Promise((resolve, reject) => {
  interactiveResolver = resolve;
});

const completePromise = new Promise((resolve, reject) => {
  completeResolver = resolve;
});


const onReadyStateChange = (e) => {
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
}


const onWindowLoad = (e) => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('load', onWindowLoad);
  }
  windowLoadResolver(e);
};


const init = () => {
  if (inited) {
    return;
  }
  if (typeof document !== 'undefined') {
    inited = true;
    document.addEventListener('readystatechange', onReadyStateChange, false);
    window.addEventListener('load', onWindowLoad, false);
  }
}

export const loading = () => {
  init();
  onReadyStateChange();
  return loadingPromise;
};

export const interactive = () => {
  init();
  onReadyStateChange();
  return interactivePromise;
};

export const complete = () => {
  init();
  onReadyStateChange();
  return completePromise;
};

export const windowLoad = () => {
  init();
  return windowLoadPromise;
};


const readyState = {
  loading,
  interactive,
  complete,
  windowLoad
};


export default readyState;
// module.exports =readyState;
