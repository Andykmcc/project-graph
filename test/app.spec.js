const assert = require('assert');
const app = require('app');

describe('app', () => {
  it('should export an instance of express', () => {
    assert(app.set);
  });
});
