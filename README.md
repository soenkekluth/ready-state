# ready-state [![Build Status](https://travis-ci.org/soenkekluth/ready-state.svg?branch=master)](https://travis-ci.org/soenkekluth/ready-state)

> Get / Check the document readyState by Promise [`readystatechange`](https://developer.mozilla.org/de/docs/Web/Events/readystatechange)
> Check when the DOM is loaded like [`DOMContentLoaded`](https://developer.mozilla.org/en/docs/Web/Events/DOMContentLoaded)
> Check when the Window is loaded like [`onload`](https://developer.mozilla.org/de/docs/Web/API/GlobalEventHandlers/onload)

All checks also work even after the DOM was loaded.


## Install

```
$ npm i ready-state
```
```
$ yarn add ready-state
```


## Usage

```js
const readyState = require('ready-state');

readyState.loading.then(state => {
  console.log('readyState is loading');
}),

readyState.interactive.then(state => {
  console.log('readyState is interactive');
}),

readyState.load.then(state => {
  console.log('Window is loaded');
}),

readyState.window.then(state => {
  console.log('Window is loaded');
}),

readyState.complete.then(state => {
  console.log('readyState is complete');
}),

readyState.domready.then(state => {
  console.log('DOM is loaded');
}),

readyState.dom.then(state => {
  console.log('DOM is loaded');
}),

console.log(readyState.state);


console.log(readyState.ready ? 'I am ready' : 'still waiting');
```

## Related

- [element-ready](https://github.com/sindresorhus/element-ready) - Detect when an element is ready in the DOM


## License

MIT © [Sönke Kluth](https://soenkekluth.com)