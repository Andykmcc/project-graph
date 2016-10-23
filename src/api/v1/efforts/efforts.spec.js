const assert = require('assert');
const effortsController = require('./effortsController');

describe('Efforts', () => {

  describe('#getEfforts()', () => {
    // simple test just to be sure mocha is working
    it('should return an Array', () => {
      assert.equal(true, Array.isArray(effortsController.getEfforts()));
    });
  });

  describe('#getEffort()', () => {
    // simple test just to be sure mocha is working
    it('should return an object with an ID matching the argument', () => {
      assert.equal(1, effortsController.getEffort(1).id);
    });
  });

});
