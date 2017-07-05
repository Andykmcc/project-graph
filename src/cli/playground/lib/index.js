'use strict';

const { inspect } = require('util');

// Given a function `f` that may return a Promise or a value, `reify` returns
// another function, such that upon being called, any Promise instance returned
// by `f` will be resolved and printed to the console and undefined will be
// returned. Any other value will be returned to the caller.
function reify(f/*: (...args: Array<mixed>) => mixed*/)/*: mixed*/ {
  return function () {
    const ret = f.apply(this, arguments);
    if (ret instanceof Promise) {
      ret.then(result => console.log(`[Fulfilled]\n`, inspect(result, { depth: null })))
         .catch(err => console.error(err));
      return undefined;
    }
    return ret;
  };
}

function methods(controller/*: Object*/, methods/*: Array<string>*/)/*: {[methodName: string]: Function}*/ {
  const loaded = { };
  for (const method of methods) {
    if (controller && typeof controller[method] === 'function') {
      loaded[method] = reify(controller[method]);
    }
  }
  return loaded;
}

module.exports = {
  reify,
  methods,
};
