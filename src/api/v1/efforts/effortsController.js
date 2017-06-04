const uuid = require('uuid/v4');
const R = require('ramda');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const effortsUtils = require('./effortsUtils');

function getEfforts () {
  return neo4jHelpers.query('MATCH (n:Effort) RETURN n LIMIT 25');
}

function createEffort (effortParams) {
  if (!effortParams || !effortParams.fields || !effortParams.effortType.id) {
    return Promise.reject('createEffort requires 1 argument');
  }

  const validateEffort = R.curry(effortsUtils.validateEffort)(effortParams);

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
  .then(validateEffort)
  .then(() => {
    const data = {props: Object.assign({}, {id: uuid()}, effortParams.fields)};

    return neo4jHelpers.query(`
      CREATE (e:Effort {props})
      SET e.created_at = timestamp()
      SET e.updated_at = timestamp()
      RETURN e
      `,
      data
    );
  });
}

module.exports = {
  getEfforts,
  createEffort
}
