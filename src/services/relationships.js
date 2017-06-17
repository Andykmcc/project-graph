const Joi = require('joi');
const R = require('ramda');
const neo4jHelpers = require('./neo4jHelpers');
const relationshipsModel = require('./relationshipsModel');

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
  const error = relationshipsModel.validate(relationship).error;

  if (error) {
    return Promise.reject(new Error(error));
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
