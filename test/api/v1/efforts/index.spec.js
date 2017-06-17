const assert = require('assert');
const proxyquire =  require('proxyquire').noCallThru();

let efforts

describe('efforts/index.js', () => {
  before(() => {
    efforts = proxyquire('api/v1/efforts', {
      './effortsController': {}
    });
  });
  it('should export an express router', () => {
    assert.strictEqual(efforts.name, 'router');
  });
});
