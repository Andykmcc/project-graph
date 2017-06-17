const assert = require('assert');
const relationshipsModel = require('services/relationshipsModel');

const validMockRelationships = [
  {
    subjectId: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    verb: 'DEPENDS_ON'
  },
  {
    subjectId: '110ec58a-a0f2-4ac4-1393-c866d813b8d1',
    verb: 'RELATES_TO'
  }
]

describe('relationshipsModel', () => {
  it('should export a schema' , () => {
    assert(relationshipsModel.schema);
  });

  it('should export a validate method' , () => {
    assert(relationshipsModel.validate);
  });

  describe('#validate', () => {
    it('should only allow white listed relationship types', () => {
      const invalidMockRelationships = validMockRelationships.slice(0)[0]['verb'] = 'invalid';
      const validationError = relationshipsModel.validate(invalidMockRelationships).error;

      assert(validationError !== null);
    });
    it('should only allow valid V4 UUID as an effortID', () => {
      const invalidMockRelationships = validMockRelationships.slice(0)[0]['subjectId'] = '6c84fb90-12c4-11e1-840d-7b25c5ee775a';
      const validationError = relationshipsModel.validate(invalidMockRelationships).error;

      assert(validationError !== null);
    });
  });
});
