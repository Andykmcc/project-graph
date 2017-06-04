const assert = require('assert');
const express = require('express');
const proxyquire = require('proxyquire').noCallThru();
const v1 = proxyquire('api/v1', {
  './efforts': express.Router(),
  './effortTypes': express.Router(),
  './users': express.Router()
});

describe('v1/index.js', () => {
  it('should export an express router', () => {
    assert.strictEqual(v1.name, 'router');
  });
});
