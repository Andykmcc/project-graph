const R = require('ramda');
const Joi = require('joi');
const fieldTypes = require('../../../constants/fieldTypes');

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

function validateEffort (effortParams, effortTypeModel) {
  const diff = R.difference(Object.keys(effortParams.fields), effortTypeModel.map(prop => prop.name));
  if (diff.length) {
    return Promise.reject(new Error(`the following fields are not part of this effort type: ${diff.join(', ')}`));
  }

  const joiSchema = makeJoiSchema(Object.keys(effortParams.fields), effortTypeModel);
  const validationError = Joi.validate(effortParams.fields, joiSchema, {allowUnknown: false}).error;

  if (validationError) {
    return Promise.reject(new Error(validationError));
  }
}

module.exports = {
  makeJoiSchema,
  transformEffortType,
  validateEffort
};
