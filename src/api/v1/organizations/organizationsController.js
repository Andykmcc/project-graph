const uuid = require('uuid/v4');
const R = require('ramda');
const Joi = require('joi');
const neo4jHelpers = require('../../../services/neo4jHelpers');
const organizationsModel = require('./organizationsModel');

// TODO: Test
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

// TODO: Test
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

// TODO: Test
function getOrganizations () {
  return neo4jHelpers.query(`
    MATCH (o:Organization)
    RETURN o
    LIMIT 25
    `
  );
}

// TODO: Test
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
    organiaztion 
  );
}

module.exports = {
  createOrganization, 
  deleteOrganization, 
  getOrganization, 
  getorganizations
}
