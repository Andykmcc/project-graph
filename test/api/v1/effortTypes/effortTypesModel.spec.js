const assert = require('assert');
const effortTypesModel = require('api/v1/effortTypes/effortTypesModel');
const effortTypesMocks = require('./effortTypes.mock');

describe('effortTypeValidator', () => {
  it('should pass when given a valid name and field property', () => {
    const validTypeArgument = {
      name: 'valid name',
      fields: [effortTypesMocks.validField, {name: 'valid name', type: 'boolean'}]
    };
    const result = effortTypesModel.validate(validTypeArgument);
    assert.equal(result.error, null);
  });

  it('should fail validation when given an object without a name property', () => {
    const invalidTypeArgument = {
      fields: [effortTypesMocks.validField, {name: 'valid name', type: 'boolean'}]
    };
    const result = effortTypesModel.validate(invalidTypeArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail validation when given an object containing invalid fields property', () => {
    const invalidTypeArgument = {
      name: 'valid name',
      fields: [effortTypesMocks.validField, {name: 'valid name', type: 'invalid'}]
    };
    const result = effortTypesModel.validate(invalidTypeArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail validation when given an object without a fields property', () => {
    const invalidTypeArgument = {
      name: 'valid name'
    };
    const result = effortTypesModel.validate(invalidTypeArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail when given an object missing a name property', () => {
    const invalidFieldArgument = {
      type: 'string'
    };
    const result = effortTypesModel.validate(invalidFieldArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail when given an object missing a type', () => {
    const invalidFieldArgument = {
      name: 'valid name'
    };
    const result = effortTypesModel.validate(invalidFieldArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail when given an object with an invalid type', () => {
    const invalidFieldArgument = {
      name: 'valid name',
      type: 'invalid type'
    };
    const result = effortTypesModel.validate(invalidFieldArgument);
    assert.notEqual(result.error, null);
  });
});
