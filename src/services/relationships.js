const Joi = require('joi');
const R = require('ramda');
const neo4jHelpers = require('./neo4jHelpers');
const relationshipsModel = require('./relationshipsModel');
const exceptionHandler = require('./exceptionHandler');

/**
 * @param  {Object} This is the mapping of the relationship
 * {
 *  subjectId: UUID,
 *  verb: relationshipType,
 *  objectId: UUID
 * }
 * @return {Object} Promise
 */
function createRelationship (relationship) {
  const validationError = relationshipsModel.validate(relationship).error;

  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }

  return neo4jHelpers.query(`
    MATCH (s {id: {subjectId}}), (o {id: {objectId}})
    CREATE (s)-[v:${relationship.verb}]->(o)
    RETURN s, o
  `, relationship);
}

module.exports = {
  createRelationship
};
