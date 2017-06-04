const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire =  require('proxyquire').noCallThru();
const effortsRawMock = require('../mocks/effortsRaw.mock.json');

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
      neo4jHelpers.handleSuccess(session, effortsRawMock);
      assert(session.close.called);
    });

    it('should return an empty array when no results are found', () => {
      assert.equal(true, Array.isArray(neo4jHelpers.handleSuccess(session, [])));
      assert.equal(0, neo4jHelpers.handleSuccess(session, []).length);
    });

    it('should return an array of collections when data found', () => {
      assert.equal(true, Array.isArray(neo4jHelpers.handleSuccess(session, effortsRawMock)));
    });

    it('should return an array of collections where each objects has a "labels" property', () => {
      assert(neo4jHelpers.handleSuccess(session, effortsRawMock)[0][0].labels);
    });

    it('should return an array of collections where each objects has a "properties" property', () => {
      assert(neo4jHelpers.handleSuccess(session, effortsRawMock)[0][0].properties);
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
      neo4jHelpers.query(queryString, data).catch((err)=>{
        console.log(err);
      });
    });

    it('should create a new DB driver session', () => {
      assert(driverMock.session.called);
    });

    it('should call run with the queryString and data', () => {
      assert(runMock.calledWith(queryString, data));
    });
  });
});
