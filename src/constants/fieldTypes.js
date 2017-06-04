const Joi = require('joi');

const supportedFieldTypes = {
  boolean: Joi.boolean(),
  date: Joi.string().isoDate(),
  description: Joi.string().min(1),
  email: Joi.string().email(),
  number: Joi.number(),
  title: Joi.string().min(3).max(256),
  url: Joi.string().uri()
};

module.exports = supportedFieldTypes;
