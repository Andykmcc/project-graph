const uuid = require('uuid/v4');
const R = require('ramda');
const Joi = require('joi');
const driver = require('../../../db');
const effortTypesUtils = require('./effortTypesUtils');
const effortTypesModel = require('./effortTypesModel');

function deleteEffortType (effortTypeID) {
  const validationError = Joi.validate(effortTypeID, Joi.string().guid({version: ['uuidv4']})).error;
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  const session = driver.session();
  const processResults = R.curry(effortTypesUtils.handleSuccess)(session);
  const processError = R.curry(effortTypesUtils.handleError)(session);

  return session.run(`
    MATCH (e:EffortType {
      id: {id}
    })-[:HAS_FIELD]->(f:Field)
    DETACH DELETE e, f
    `,
    {id: effortTypeID})
  .then(processResults)
  .catch(processError);
}

function getEffortType (effortTypeID) {
  const validationError = Joi.validate(effortTypeID, Joi.string().guid({version: ['uuidv4']})).error;
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  const session = driver.session();
  const processResults = R.curry(effortTypesUtils.handleSuccess)(session);
  const processError = R.curry(effortTypesUtils.handleError)(session);

  return session.run(`
    MATCH (e:EffortType {
      id: {id}
    })-[:HAS_FIELD]->(f:Field)
    RETURN e, f
    `,
    {id: effortTypeID})
  .then(processResults)
  .catch(processError);
}

function createEffortType (newEffortType) {
  const validationError = effortTypesModel.validate(newEffortType).error
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  const session = driver.session();
  const processResults = R.curry(effortTypesUtils.handleSuccess)(session);
  const processError = R.curry(effortTypesUtils.handleError)(session);

  return session.run(`
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
    newEffortType)
  .then(processResults)
  .catch(processError);
}

module.exports = {
  createEffortType,
  deleteEffortType,
  getEffortType
}
