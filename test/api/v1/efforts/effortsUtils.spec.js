const assert = require('assert');
const effortsUtils = require('api/v1/efforts/effortsUtils');

const mockEffortTypeProps = [
  [{
    properties: {
      name: 'title',
      type: 'title'
    }
  }],
  [{
    properties: {
      name: 'description',
      type: 'description'
    }
  }]
];
const mockEffortTypePropsTransformed = [
  {name: 'title',type: 'title'},
  {name: 'description',type: 'description'}
];
const mockValidEffortFields = {
  title: "working my way through things",
  description: "kaljsdfkajsdlkfjalsd"
};

describe('effortsUtils', () => {
  describe('#transformEffortType', () => {
    const result = effortsUtils.transformEffortType(mockEffortTypeProps);

    it('should return a collection of property objects', () => {
      assert.deepEqual(result, mockEffortTypePropsTransformed);
    });
  });

  describe('#validateEffortFields', () => {
    it('should return "undefined" if all is well', () => {
      const result = effortsUtils.validateEffortFields(mockValidEffortFields, mockEffortTypePropsTransformed);
      assert.equal(result, undefined);
    });

    it('should return a rejected promise if params are not part of the effort type', (done) => {
      const rejected = effortsUtils.validateEffortFields({fields: {invalidKey: 'value'}}, mockEffortTypePropsTransformed);

      rejected.catch(() => done());
    });

    it('should reject a promise if validation fails', (done) => {
      const invalidParams = {
        title: false,
        description: "kaljsdfkajsdlkfjalsd"
      };
      const rejected = effortsUtils.validateEffortFields(invalidParams, mockEffortTypePropsTransformed);
      rejected.catch(() => done());
    });
  });

  describe('#makeJoiSchema', () => {
    it('should return a joi schema', () => {
      const keys = Object.keys(mockValidEffortFields);
      const result = effortsUtils.makeJoiSchema(keys, mockEffortTypePropsTransformed);
      assert(result.isJoi);
    });
  });
});
