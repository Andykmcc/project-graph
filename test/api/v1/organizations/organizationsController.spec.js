const assert = require('assert');
const proxyquire =  require('proxyquire').noCallThru();
const sinon = require('sinon');

let queryResolve;
let organizationsController;
let queryStub;

describe('organizationsController', () => {
  beforeEach(() => {
    queryResolve = {
      query: () => Promise.resolve()
    };

    queryStub = sinon.stub(queryResolve, 'query').returns(Promise.resolve());

    organizationsController = proxyquire('api/v1/organizations/organizationsController', {
      '../../../services/neo4jHelpers': queryResolve
    });
  });

  afterEach(() => {
    queryStub.restore();
  });

  describe('#deleteOrganization', () => {
    it('should return a rejected promise when called without a valid UUID', (done) => {
      organizationsController.deleteOrganization().catch(() => done());
    });

    it('should return a rejected promise when called without a valid UUID', (done) => {
      organizationsController.deleteOrganization('invalid-id').catch(() => done());
    });

    it('should pass the ID in the second argument to .query()', () => {
      const guid = '110ec58a-a0f2-4ac4-8393-c866d813b8d1';
      const queryPromise = organizationsController.deleteOrganization(guid);
      const secondArgPassedToQuery = queryResolve.query.getCall(0).args[1];

      assert.deepEqual(secondArgPassedToQuery, {id: guid});
    });
  });

  describe('#getOrganization', () => {
    it('should return a rejected promise when called without a valid UUID', (done) => {
      organizationsController.getOrganization().catch(() => done());
    });

    it('should return a rejected promise when called without a valid UUID', (done) => {
      organizationsController.getOrganization('invalid-id').catch(() => done());
    });

    it('should pass the ID in the second argument to .query()', () => {
      const guid = '110ec58a-a0f2-4ac4-8391-c866d813b8d1';
      const queryPromise = organizationsController.getOrganization(guid);
      const secondArgPassedToQuery = queryResolve.query.getCall(0).args[1];

      assert.deepEqual(secondArgPassedToQuery, {id: guid});
      queryStub.restore();
    });
  });

  // TODO: Not sure this should be organization... Maybe it should be organizations?
  describe('#getOrganizations', () => {
    it('should contained ":Organization" in the call to query', () => {
      const queryPromise = organizationsController.getOrganizations();
      const firstArgPassedToQuery = queryResolve.query.getCall(0).args[0];

      assert(firstArgPassedToQuery.includes(':Organization'));
    });
  });

  // TODO: Alter this to take into account the name and the description.
  describe('#createOrganization', () => {
    const validOrganization = {
      name: 'Derp Org',
      description: 'Organization meant to take over the world.'   
    };

    it('should return a rejected promise when called without a parameter', (done) => {
      organizationsController.createOrganization().catch(() => done());
    });

    it('should return a rejected promise when called without a "name" property', (done) => {
      organizationsController.createOrganization({description: 'test description'}).catch(() => done());
    });

    it('should return a rejected promise when called without a "description" property', (done) => {
      organizationsController.createOrganization({name: 'test name'}).catch(() => done());
    });

    it('should return a promise when called with a valid organization', (done) => {
      organizationsController.createOrganization(validOrganization).then(() => done());
    });

    it('should pass the the organization as the second argument to .query()', () => {
      const queryPromise = organizationsController.createOrganization(validOrganization);
      const secondArgPassedToQuery = queryResolve.query.getCall(0).args[1];

      assert.deepEqual(secondArgPassedToQuery, validOrganization);
    });
  });
});
