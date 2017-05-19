const assert = require('assert');
const sinon = require('sinon');
const effortsUtils = require('api/v1/efforts/effortsUtils');
const effortsRawMock = require('./effortsRaw.mock.json');

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
      assert.throws(()=>{effortsUtils.handleError(session, {})}, session.close.called);
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
