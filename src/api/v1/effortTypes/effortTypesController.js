const uuid = require('uuid/v4');
const R = require('ramda');
const Joi = require('joi');
const Boom = require('boom');
const fieldTypes = require('../../../constants/fieldTypes');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const exceptionHandler = require('../../../services/exceptionHandler');

function deleteEffortType (effortTypeID) {
  const validationError = Joi.validate(effortTypeID, Joi.string().guid({version: ['uuidv4']}).required()).error;
  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (e:EffortType {
      id: {id}
    })-[:HAS_FIELD]->(f:Field)
    DETACH DELETE e, f
    `,
    {id: effortTypeID}
  );
}

function getEffortType (effortTypeID) {
  const validationError = Joi.validate(effortTypeID, Joi.string().guid({version: ['uuidv4']}).required()).error;
  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (e:EffortType {
      id: {id}
    })-[:HAS_FIELD]->(f:Field)
    RETURN e, f
    LIMIT 1
    `,
    {id: effortTypeID}
  );
}

function getEffortTypes () {
  return neo4jHelpers.query(`
    MATCH (e:EffortType)-[:HAS_FIELD]->(:Field)
    RETURN e
    LIMIT 25
    `
  );
}

function createEffortType (newEffortType) {
  let schema;
  try {
    schema = Joi.object().keys(getEffortTypeSchema(newEffortType)).required();
  } catch (err) {
    return Promise.reject(err);
  }

  const validationError = Joi.validate(newEffortType, schema).error;
  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    CREATE (e:EffortType {data})
    SET e.created_at = TIMESTAMP()
    RETURN e
    `,
    {data: Object.assign({id: uuid()}, newEffortType)}
  );
}

function getEffortTypeSchema (effort) {
  const baseEffortType = { name: fieldTypes.title.required() };
  const schema = Object.entries(R.omit(Object.keys(baseEffortType), effort))
    .reduce((memo, [key, value]) => {
      memo[key] = fieldTypes[value]
      return memo;
    }, Object.assign({}, baseEffortType));

  if(!Object.keys(R.omit(Object.keys(baseEffortType), effort)).length) {
    throw Boom.badRequest('getEffortTypeSchema require an effort object');
  } else if (!R.all(R.compose(R.not, R.isNil))(Object.values(schema))) {
    const invalidEntries = R.pickAll(Object.keys(R.filter(R.isNil, schema)), effort);
    throw Boom.badRequest('the following entries have invalid effortType fields', invalidEntries);
  } else {
    return schema;
  }
}

module.exports = {
  createEffortType,
  deleteEffortType,
  getEffortType,
  getEffortTypes,
  getEffortTypeSchema
}
