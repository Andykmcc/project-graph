const R = require('ramda');
const Joi = require('joi');
const fieldModel = require('./fieldModel');
const fieldTypes = require('../../../constants/fieldTypes');

const validFieldTypes = Object.keys(fieldTypes);

// this is just a helper to wrap the schemas with so i can expose them
// as function that take one argument (the object to be tested)
const validator = R.curry(R.flip(Joi.validate));

// schema for an effort type. In agile epic, story and task would each
// be their own effortType.
const effortTypeSchema = Joi.object().keys({
  name: fieldTypes.title.required(),
  fields: Joi.array().items(fieldModel.schema).required()
});

module.exports = {
  schema: effortTypeSchema,
  validate: validator(effortTypeSchema)
}
