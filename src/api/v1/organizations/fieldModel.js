const R = require('ramda');
const Joi = require('joi');
const fieldTypes = require('../../../constants/fieldTypes');

const validFieldTypes = Object.keys(fieldTypes);

// this is just a helper to wrap the schemas with so i can expose them
// as function that take one argument (the object to be tested)
const validator = R.curry(R.flip(Joi.validate));

// schema for a single field, label/input combo.
// e.g. name:string
// e.g. age:integer
const fieldSchema = Joi.object().keys({
  name: fieldTypes.title.required(),
  type: Joi.any().valid(validFieldTypes).required()
});

module.exports = {
  schema: fieldSchema,
  validate: validator(fieldSchema)
}
