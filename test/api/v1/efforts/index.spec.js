const assert = require('assert');
const efforts = require('api/v1/efforts');

describe('efforts/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(efforts.name, 'router');
  });
});
