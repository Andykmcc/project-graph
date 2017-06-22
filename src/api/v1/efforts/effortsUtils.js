const R = require('ramda');
const Joi = require('joi');
const Boom = require('boom');
const fieldTypes = require('../../../constants/fieldTypes');
const exceptionHandler = require('../../../services/exceptionHandler');

function makeJoiSchema (fields, model) {
  return Joi.object(fields.reduce((memo, fieldName) => {
    const field = model.find(prop => prop.name === fieldName);
    if(field){
      memo[fieldName] = fieldTypes[field.type];
    }
    return memo;
  }, {}));
}

function transformEffortType (effortType) {
  const getProperties = R.map(R.prop('properties'));
  const getNamesTypes = R.map(R.pick(['name', 'type']));

  return R.compose(getNamesTypes, getProperties)(R.flatten(effortType));
}

function validateEffortFields (effortFields, effortTypeModel) {
  const diff = R.difference(Object.keys(effortFields), effortTypeModel.map(prop => prop.name));
  if (diff.length) {
    return Promise.reject(Boom.badRequest(`the following fields are not part of this effort type: ${diff.join(', ')}`));
  }

  const joiSchema = makeJoiSchema(Object.keys(effortFields), effortTypeModel);
  const validationError = Joi.validate(effortFields, joiSchema, {allowUnknown: false}).error;

  if (validationError) {
    return Promise.reject(exceptionHandler.joiToBoom(validationError));
  }
}

module.exports = {
  makeJoiSchema,
  transformEffortType,
  validateEffortFields
};
