const assert = require('assert');
const sinon = require('sinon');
const effortsController = require('./effortsController');
const effortsUtils = require('./effortsUtils');
const effortsRawMock = require('./effortsRaw.mock.json');
const driver = require('../../../db');

describe('effortsController', () => {
  let session;
  beforeEach(() => {
    session = sinon.stub(driver, 'session', function () {
      return {
        run: function () {
          return Promise.resolve();
        },
        close: function () {}
      };
    });
  });

  afterEach(() => {
    driver.session.restore();
  });

  describe('#getEfforts()', () => {
    it('should create a new driver session', (done) => {
      const effortsPromise = effortsController.getEfforts();

      sinon.assert.calledOnce(driver.session);

      effortsPromise.then(() => done());
      effortsPromise.catch(() => done());
    });
  });

  describe('#createEffort()', () => {
    it('should create a new driver session', (done) => {
      const effortsPromise = effortsController.createEffort({})

      sinon.assert.calledOnce(driver.session);

      effortsPromise.then(() => done());
    });

    it('should return a rejected promise if no params are passed', (done) => {
      const effortsPromise = effortsController.createEffort();

      effortsPromise.catch((error) => {
        done();
      });
    });
  });
});

describe('effortsUtils', () => {
  describe('#handleSuccess()', () => {
    const session = {
      close: sinon.spy()
    };

    it('should call session.close()', () => {
      effortsUtils.handleSuccess(session, effortsRawMock);
      assert(session.close.called);
    });

    it('should return an empty array when no results are found', () => {
      assert.equal(true, Array.isArray(effortsUtils.handleSuccess(session, [])));
      assert.equal(0, effortsUtils.handleSuccess(session, []).length);
    });

    it('should return an array of collections when data found', () => {
      assert.equal(true, Array.isArray(effortsUtils.handleSuccess(session, effortsRawMock)));
    });

    it('should return an array of collections where each objects has a "labels" property', () => {
      assert(effortsUtils.handleSuccess(session, effortsRawMock)[0][0].labels);
    });

    it('should return an array of collections where each objects has a "properties" property', () => {
      assert(effortsUtils.handleSuccess(session, effortsRawMock)[0][0].properties);
    });
  });

  describe('#handleError()', () => {
    const session = {
      close: sinon.spy()
    };

    it('should call session.close()', () => {
      effortsUtils.handleError(session, {});
      assert(session.close.called);
    });

    it('should return the error passed in', () => {
      const err = {msg: 'unique error msg'};
      assert.deepEqual(err, effortsUtils.handleError(session, err));
    });
  });

  describe('#makeParamString()', () => {
    it('should not have a trailing comma (,)', () => {
      const result = effortsUtils.makeParamString(['key1', 'key2']);
      assert(result[result.length - 1] !== ',');
    });
    it('should contain each key twice', () => {
      const result = effortsUtils.makeParamString(['dog', 'cat']);
      assert((result.match(/cat/g)).length === 2);
      assert((result.match(/dog/g)).length === 2);
    });
  });
});
