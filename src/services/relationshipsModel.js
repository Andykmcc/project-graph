const Joi = require('joi');
const R = require('ramda');
const relationshipTypes = require('../constants/relationshipTypes');

const schema = Joi.object().keys({
  subjectId: Joi.string().guid({version: ['uuidv4']}).required(),
  verb: Joi.any().valid(relationshipTypes).required(),
  objectId: Joi.string().guid({version: ['uuidv4']}).required()
}).required();

const validate = R.curry(R.flip(Joi.validate))(schema);

module.exports = {
  schema,
  validate
};
