const test = require('ava');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test.cb('all document states should pass', t => {
  JSDOM.fromFile('test.html', {
    pretendToBeVisual: true,
    contentType: 'text/html',
    userAgent: 'Mellblomenator/9000',
  }).then(dom => {
    global.window = dom.window;
    global.document = dom.window.document;

    const readyState = require('./dist/ready-state');

    Promise.all([
      readyState.loading.then(state => {
        // console.log('loading');
        t.is(state, 'loading');
      }),
      readyState.interactive.then(state => {
        // console.log('interactive');
        t.is(state, 'interactive');
        t.lof;
      }),
      readyState.load.then(state => {
        // console.log('load');
        t.is(state, 'load');
      }),
      readyState.window.then(state => {
        // console.log('load');
        t.is(state, 'load');
      }),
      readyState.complete.then(state => {
        // console.log('complete');
        t.is(state, 'complete');
      }),
      readyState.domready.then(state => {
        // console.log('domready');
        t.is(state, 'domready');
      }),
      readyState.dom.then(state => {
        // console.log('domready');
        t.is(state, 'domready');
      }),
    ]).then(() => {
      t.end();
    });
    // console.log(dom.serialize());
  });
});
