const uuid = require('uuid/v4');
const R = require('ramda');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const relationshipsService = require('../../../services/relationships');
const effortsUtils = require('./effortsUtils');

function getEfforts () {
  return neo4jHelpers.query('MATCH (n:Effort) RETURN n LIMIT 25');
}

function createEffort (effortParams) {
  if (!effortParams ||
      !effortParams.fields ||
      !effortParams.effortType ||
      !effortParams.effortType.id ||
      !effortParams.relationships ||
      R.isEmpty(effortParams.relationships)) {
    return Promise.reject(new Error('createEffort requires "fields", "effortType.id", "relationships"'));
  }

  const validateEffortFields = R.curry(effortsUtils.validateEffortFields)(effortParams.fields);

  return neo4jHelpers.query(`
    MATCH (et:EffortType {
      id: {id}
    })-[:HAS_FIELD]->(f:Field)
    RETURN f
  `,
  {
    id: effortParams.effortType.id
  })
  .then(effortsUtils.transformEffortType)
  .then(validateEffortFields)
  .then(() => {
    const data = {
      props: Object.assign(
        {},
        {id: uuid()},
        effortParams.fields
      )
    };

    return neo4jHelpers.query(`
      CREATE (e:Effort {props})
      SET e.created_at = timestamp()
      SET e.updated_at = timestamp()
      RETURN e
      `,
      data
    );
  })
  .then((effort) => {
    const newEffortId = effort[0][0]['properties']['id'];
    const setObjectId = R.set(R.lensProp('objectId'), newEffortId);
    const createRelsPromises = effortParams.relationships
      .map(setObjectId)
      .map(relationshipsService.createRelationship);

    return Promise.all(createRelsPromises);
  });
}

module.exports = {
  getEfforts,
  createEffort
}
