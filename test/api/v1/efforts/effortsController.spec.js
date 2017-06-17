const proxyquire =  require('proxyquire').noCallThru();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const neo4jHelpersStub = {
  query: () => Promise.resolve([
    [{
      properties: {
        name: 'description',
        type: 'description'
      }
    }],
    [{
      properties: {
        name: 'title',
        type: 'title'
      }
    }]
  ])
};
const relationshipsStub = {
  resolve: {
    createRelationship: () => Promise.resolve([])
  },
  reject: {
    createRelationship: () => Promise.reject(new Error('create relatipnship error'))
  }
};
const validEffort = {
  effortType: {
    id: '62dd1dbb-7bb6-40fb-8d80-0f26d3cc47a2'
  },
  fields: {
    title: 'title 1',
    description: 'description 1'
  },
  relationships: [{
    subjectId: '62dd1dbb-7bb6-40fb-8d80-0f26d3cc47a2',
    verb: 'DEPENDS_ON'
  }]
};

let effortsController;

describe('effortsController', () => {
  describe('#createEffort()', () => {
    describe('bad params', () => {
      before(() => {
        effortsController = proxyquire('api/v1/efforts/effortsController', {
          '../../../services/neo4jHelpers': neo4jHelpersStub,
          '../../../services/relationships': relationshipsStub.reject
        });
      });

      it('should return a rejected promise if no params are passed', () => {
        const effortsPromise = effortsController.createEffort();

        return effortsPromise.should.be.rejected;
      });

      it('should return a rejected promise if no fields are passed', () => {
        const effortsPromise = effortsController.createEffort({});

        return effortsPromise.should.be.rejected;
      });

      it('should return a rejected promise if non-whitelisted params are passed', () => {
        const effortsPromise = effortsController.createEffort({badkey:'bad value'});

        return effortsPromise.should.be.rejected;
      });
    });

    describe('bad relationships', () => {
      before(() => {
        effortsController = proxyquire('api/v1/efforts/effortsController', {
          '../../../services/neo4jHelpers': neo4jHelpersStub,
          '../../../services/relationships': relationshipsStub.reject
        });
      });

      it('should return a rejected promise if a bad relationship is passed', () => {
        const validEffortClone = JSON.parse(JSON.stringify(validEffort));
        const invalidEffort = validEffortClone.relationships[0]['verb'] = 'invalid';
        const effortsPromise = effortsController.createEffort(validEffortClone);

        return effortsPromise.should.be.rejected;
      });
    });

    describe('good params and relationships', () => {
      before(() => {
        effortsController = proxyquire('api/v1/efforts/effortsController', {
          '../../../services/neo4jHelpers': neo4jHelpersStub,
          '../../../services/relationships': relationshipsStub.resolve
        });
      });

      describe('when passed a title, description and relationships', () => {
        it('should return a resolved promise', () => {
          const effortsPromise = effortsController.createEffort(validEffort);

          return effortsPromise.should.be.fulfilled;
        });
      });
    });
  });

  describe('#getEfforts()', () => {
    before(() => {
      effortsController = proxyquire('api/v1/efforts/effortsController', {
        '../../../services/neo4jHelpers': neo4jHelpersStub,
        '../../../services/relationships': relationshipsStub.resolve
      });
    });

    it('should return a promise', () => {
      const effortsPromise = effortsController.getEfforts()

      return effortsPromise.should.be.fulfilled;
    });
  });
});
