const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const organizations = proxyquire('api/v1/organizations', { './organizationsController': {} });

describe('organizations/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(organizations.name, 'router');
  });
});
