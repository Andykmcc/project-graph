const assert = require('assert');
const users = require('api/v1/users');

describe('users/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(users.name, 'router');
  });
});
