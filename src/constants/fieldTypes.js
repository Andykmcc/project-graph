const Joi = require('joi');

const supportedFieldTypes = {
  title: Joi.string().min(3).max(256),
  description: Joi.string().min(1),
  number: Joi.number(),
  email: Joi.string().email(),
  boolean: Joi.boolean()
};

module.exports = supportedFieldTypes;
