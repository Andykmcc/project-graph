const R = require('ramda');
const Joi = require('joi');
const fieldTypes = require('../../../constants/fieldTypes');

const validFieldTypes = Object.keys(fieldTypes);

// this is just a helper to wrap the schemas with so i can expose them
// as function that take one argument (the object to be tested)
const validator = R.curry(R.flip(Joi.validate));

// The schema for the main Organization node.
const organizationSchema = Joi.object().keys({
  name: fieldTypes.title.required(),
  description: fieldTypes.description.required()
}).required();

module.exports = {
  schema: organizationSchema,
  validate: validator(organizationSchema)
}
