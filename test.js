const test = require('ava');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test.cb('all document states should pass', t => {
  JSDOM.fromFile('test.html', {
    pretendToBeVisual: true,
    contentType: 'text/html',
    userAgent: 'readystate/9000',
  }).then(dom => {
    global.window = dom.window;
    global.document = dom.window.document;

    const readyState = require('./dist/ready-state');

    Promise.all([
      readyState.loading.then(state => {
        t.log('readyState.loading');
        t.is(state, 'loading');
      }),
      readyState.interactive.then(state => {
        t.log('readyState.interactive');
        t.is(state, 'interactive');
        t.lof;
      }),
      readyState.load.then(state => {
        t.log('readyState.load');
        t.is(state, 'load');
      }),
      readyState.window.then(state => {
        t.log('readyState.window (readyState.load)');
        t.is(state, 'load');
      }),
      readyState.complete.then(state => {
        t.log('readyState.complete');
        t.is(state, 'complete');
      }),
      readyState.domready.then(state => {
        t.log('readyState.domready');
        t.is(state, 'domready');
      }),
      readyState.dom.then(state => {
        t.log('readyState.dom (readyState.domready)');
        t.is(state, 'domready');
      }),
    ]).then(() => {
      t.end();
    });
  });
});
