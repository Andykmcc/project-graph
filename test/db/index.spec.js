process.env.HOST = 'PRECEDENCETEST';
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

let db;
let neo4jDriverStub;

describe('db', () => {
  before(() => {
    neo4jDriverStub = {
      v1: {
        auth: {
          basic: sinon.stub()
        },
        driver: sinon.stub().returns({close: () => {}})
      }
    }
    db = proxyquire('db/index', {'neo4j-driver': neo4jDriverStub});
  });

  it('should get values from the correct env. config file', () => {
    const username = neo4jDriverStub.v1.auth.basic.getCall(0).args[0];
    const password = neo4jDriverStub.v1.auth.basic.getCall(0).args[1];

    assert.equal(username, 'testingConfigUser');
    assert.equal(password, 'testingConfigPassword');
  });

  it('should let env. variables overwrite config file values', () => {
    const host = neo4jDriverStub.v1.driver.getCall(0).args[0];
    assert.equal(host, 'PRECEDENCETEST');
  });
});
