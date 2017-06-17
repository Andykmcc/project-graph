const assert = require('assert');
const proxyquire =  require('proxyquire').noCallThru();

const neo4jHelpersStub = {
  query: () => Promise.resolve()
};

const relationshipMocks = {
  valid: {
    subjectId: '62dd1dbb-7bb6-40fb-8d80-0f26d3cc47a2',
    verb: 'DEPENDS_ON',
    objectId: '62dd1dbb-7bb6-40fb-8d80-0f26d3cc47a2'
  }
}

let relationships;

describe('relationships', () => {
  before(() => {
    relationships = proxyquire('services/relationships', {
      './neo4jHelpers': neo4jHelpersStub
    });
  });

  it('should reject a promise if no relationship is passed', (done) => {
    relationships.createRelationship()
    .catch(() => done());
  });

  it('should reject a promise if an invalid relationship is passed', (done) => {
    relationships.createRelationship({})
    .catch(() => done());
  });

  it('should resolve a promise if an valid relationship is passed', (done) => {
    relationships.createRelationship(relationshipMocks.valid)
    .then(() => done());
  });
});
