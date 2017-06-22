const assert = require('assert');
const sinon = require('sinon');
const lib = require('cli/playground/lib');

describe('playground/lib', () => {
  describe('#reify', () => {
    it('should return a function that returns undefined when passed a function that returns a promise', () => {
      const func = lib.reify(() => new Promise ((resolve) => resolve(1)));

      assert.strictEqual(func(), undefined);
    });

    it('should, when passed a function that returns anything other than a promise return that value', () => {
      const func = lib.reify(() => 1);

      assert.strictEqual(func(), 1);
    });
  });

  describe('methods', () => {
    const mockController = {
      func1: () => new Promise ((resolve) => resolve(1)),
      prop1: 5
    };
    const mockMethods = ['func1'];
    let reifySpy;

    beforeEach(() => {
      reifySpy = sinon.spy(lib, 'reify');
    });
    afterEach(() => {
      lib.reify.restore();
    });

    it('should return an object with keys matching those listed in the array', () => {
      const methodsMap = lib.methods(mockController, mockMethods);

      assert(methodsMap.hasOwnProperty('func1'));
      assert.strictEqual(typeof methodsMap.func1, 'function');
    });

    it('should filter properties from the controller that are not listed', () => {
      const methodsMap = lib.methods(mockController, mockMethods);

      assert.strictEqual(methodsMap.prop1, undefined);
    });
  });
});
