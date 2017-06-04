const assert = require('assert');
const express = require('express');
const proxyquire =  require('proxyquire').noCallThru();
const api = proxyquire('api/index', {'./v1': express.Router()});

describe('api/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(api.name, 'router');
  });
});
