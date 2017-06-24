const assert = require('assert');
const organizationsModel = require('api/v1/organizations/organizationsModel');

// We are not currently using this. Could consider refactoring so that we are.
// const organizationsMocks = require('../../../mocks/organizations.mock.json');

describe('organizationValidator', () => {
  it('should pass when given a valid name and description property', () => {
    const validOrganizationArgument = {
      name: 'valid name',
      description: 'valid description'
    };
    const result = organizationsModel.validate(validOrganizationArgument);
    assert.equal(result.error, null);
  });

  it('should fail validation when given an object without a name property', () => {
    const invalidOrganizationArgument = {
      description: 'valid description' 
    };
    const result = organizationsModel.validate(invalidOrganizationArgument);
    assert.notEqual(result.error, null);
  });

  it('should fail validation when given an object without a description property', () => {
     const invalidOrganizationArgument = {
      name: 'valid name' 
    };
    const result = organizationsModel.validate(invalidOrganizationArgument);
    assert.notEqual(result.error, null);
  });

});
