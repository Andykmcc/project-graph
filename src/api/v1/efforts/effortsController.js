const uuid = require('uuid/v4');
const R = require('ramda');
const Boom = require('boom');
const Joi = require('joi');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const relationshipsService = require('../../../services/relationships');
const exceptionHandler = require('../../../services/exceptionHandler');
const effortsUtils = require('./effortsUtils');

function getEfforts () {
  return neo4jHelpers.query('MATCH (n:Effort) RETURN n LIMIT 25');
}

function getEffort (effortId) {
  const validationError = Joi.validate(effortId, Joi.string().guid({version: ['uuidv4']}).required()).error;
  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (e:Effort {
      id: {id}
    })
    RETURN e
    LIMIT 1
    `,
    {id: effortId}
  );
}

function createEffort (effortParams) {
  if (!effortParams ||
      !effortParams.fields ||
      !effortParams.effortType ||
      !effortParams.effortType.id ||
      !effortParams.relationships ||
      R.isEmpty(effortParams.relationships)) {
    return Promise.reject(Boom.badRequest('createEffort requires "fields", "effortType.id", "relationships"'));
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
  getEffort,
  getEfforts,
  createEffort
}
