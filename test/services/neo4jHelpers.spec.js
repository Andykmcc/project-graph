const neo4j = require('neo4j-driver').v1
const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const R = require('ramda');
const proxyquire =  require('proxyquire').noCallThru();
const effortsRawMock = require('../mocks/effortsRaw.mock.json');

const Record = neo4j.types.Record;
const results = {
  records: effortsRawMock.records.map(rec => new Record(rec.keys, rec._fields, rec._fieldLookup))
};

chai.use(chaiAsPromised);
chai.should();

describe('neo4jHelpers', () => {
  describe('#handleSuccess()', () => {
    let session;
    let neo4jHelpers;

    before(() => {
      session = {
        close: sinon.spy()
      };
      const driverMock = () => { session };
      neo4jHelpers = proxyquire('services/neo4jHelpers', {'../db': driverMock});
    });

    it('should call session.close()', () => {
      neo4jHelpers.handleSuccess(session, results);
      assert(session.close.called);
    });

    it('should return an empty array when no results are found', () => {
      assert.equal(0, neo4jHelpers.handleSuccess(session, {records: []}).length);
    });

    it('should return an array when data found', () => {
      assert(Array.isArray(neo4jHelpers.handleSuccess(session, results)));
    });

    it('should return a collection of records containing only labels, properties, relationships', () => {
      const keyWhitelist = ['labels', 'properties', 'relationships'].sort();
      const result = neo4jHelpers.handleSuccess(session, results);
      const keys = R.uniq(R.flatten(result.map((r) => Object.keys(r)))).sort();
      assert.deepStrictEqual(keyWhitelist, keys);
    });

    it('should convert updated_at and created_at to numbers', () => {
      const result = neo4jHelpers.handleSuccess(session, results);
      const timestamps = R.flatten(result.map((r) => {
        return R.props(['updated_at', 'created_at'], r.properties);
      }));

      assert.strictEqual(typeof timestamps[0], 'number');
    });
  });

  describe('#handleError()', () => {
    let session;
    let neo4jHelpers;

    before(() => {
      session = {
        close: sinon.spy()
      };

      const driverMock = () => { session };

      neo4jHelpers = proxyquire('services/neo4jHelpers', {'../db': driverMock});
    })

    it('should call session.close()', () => {
      assert.throws(() => { neo4jHelpers.handleError(session, {}) }, session.close.called);
    });
  });

  describe('#query', () => {
    const queryString = 'MATCH (n:Effort) RETURN n LIMIT 10';
    const data = {name: 'name'};
    let driverMock;
    let runMock;

    before(() => {
      runMock = sinon.spy(() => Promise.resolve({records: []}));

      driverMock = {
        session: sinon.spy(() => {
          return {
            run: runMock,
            close: () => {}
          }
        })
      };

      const neo4jHelpers = proxyquire('services/neo4jHelpers', {'../db': driverMock});
      neo4jHelpers.query(queryString, data);
    });

    it('should create a new DB driver session', () => {
      assert(driverMock.session.called);
    });

    it('should call run with the queryString and data', () => {
      assert(runMock.calledWith(queryString, data));
    });
  });

  describe('#convertNumbers', () => {
    let neo4jHelpers;
    const num32Bit = {
      'low': 2082678994,
      'high': 348
    };
    const num64Bit = {
      'low': 2082678994,
      'high': 9082678994
    };

    before(() => {
      neo4jHelpers = proxyquire('services/neo4jHelpers', {'../db': {}});
    });

    it('should return a number versin of the value passed in', () => {
      assert.strictEqual(neo4jHelpers.convertNumbers(num32Bit), 1496731298002);
    });

    it('should return a string version of the value passed in', () => {
      assert.strictEqual(neo4jHelpers.convertNumbers(num64Bit), '2116321093959755986');
    });
  });
});
