const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const effortTypes = proxyquire('api/v1/effortTypes', { './effortTypesController': {} });

describe('effortTypes/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(effortTypes.name, 'router');
  });
});
