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
const mockValidEffortParams = {
  fields: {
    title: "working my way through things",
    description: "kaljsdfkajsdlkfjalsd"
  }
};

describe('effortsUtils', () => {
  describe('#transformEffortType', () => {
    const result = effortsUtils.transformEffortType(mockEffortTypeProps);

    it('should return a collection of property objects', () => {
      assert.deepEqual(result, mockEffortTypePropsTransformed);
    });
  });

  describe('#validateEffort', () => {
    it('should return "undefined" if all is well', () => {
      const result = effortsUtils.validateEffort(mockValidEffortParams, mockEffortTypePropsTransformed);
      assert.equal(result, undefined);
    });

    it('should return a rejected promise if params are not part of the effort type', (done) => {
      const rejected = effortsUtils.validateEffort({fields: {invalidKey: 'value'}}, mockEffortTypePropsTransformed);

      rejected.catch(() => done());
    });

    it('should reject a promise if validation fails', (done) => {
      const invalidParams = {
        fields: {
          title: false,
          description: "kaljsdfkajsdlkfjalsd"
        }
      };
      const rejected = effortsUtils.validateEffort(invalidParams, mockEffortTypePropsTransformed);
      rejected.catch(() => done());
    });
  });

  describe('#makeJoiSchema', () => {
    it('should return a joi schema', () => {
      const keys = Object.keys(mockValidEffortParams.fields);
      const result = effortsUtils.makeJoiSchema(keys, mockEffortTypePropsTransformed);
      assert(result.isJoi);
    });
  });
});
