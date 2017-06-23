const uuid = require('uuid/v4');
const R = require('ramda');
const Joi = require('joi');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const organizationsModel = require('./organizationsModel');

function deleteOrganization (organizationID) {
  const validationError = Joi.validate(organizationID, Joi.string().guid({version: ['uuidv4']}).required()).error;
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (o:Organization {
      id: {id}
    })
    DETACH DELETE o 
    `,
    {id: organizationID}
  );
}

function getOrganization (organizationID) {
  const validationError = Joi.validate(organizationID, Joi.string().guid({version: ['uuidv4']}).required()).error;
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (o:Organization{
      id: {id}
    })
    RETURN o
    LIMIT 1
    `,
    {id: organizationID}
  );
}

function getOrganizations () {
  return neo4jHelpers.query(`
    MATCH (o:Organization)
    RETURN o
    LIMIT 25
    `
  );
}

function createOrganization (organization) {
  const validationError = organizationsModel.validate(organization).error
  if (validationError) {
    return Promise.reject(new Error(validationError));
  }

  return neo4jHelpers.query(`
    CREATE (o:Organization {
      created_at: TIMESTAMP(),
      id: '${uuid()}',
      name: {name},
      description: {description} 
    })
    RETURN o
    `,
    organization 
  );
}

module.exports = {
  createOrganization, 
  deleteOrganization, 
  getOrganization, 
  getOrganizations
}
