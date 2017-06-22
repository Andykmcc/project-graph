const uuid = require('uuid/v4');
const R = require('ramda');
const Joi = require('joi');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const effortTypesModel = require('./effortTypesModel');
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
  const validationError = effortTypesModel.validate(newEffortType).error
  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    CREATE (e:EffortType {
      created_at: TIMESTAMP(),
      id: '${uuid()}',
      name: {name}
    })
    WITH {fields} AS fields, e
    UNWIND fields AS field
    CREATE (e)-[:HAS_FIELD]->(f:Field {
      created_at: TIMESTAMP(),
      name: field.name,
      type: field.type
    })
    RETURN e, f
    `,
    newEffortType
  );
}

module.exports = {
  createEffortType,
  deleteEffortType,
  getEffortType,
  getEffortTypes
}
