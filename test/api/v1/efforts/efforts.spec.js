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

const effortsController = proxyquire('api/v1/efforts/effortsController', {'../../../services/neo4jHelpers': neo4jHelpersStub});

describe('effortsController', () => {
  describe('#createEffort()', () => {
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

    describe('when passed a title and description', () => {
      const validOptions = {
        effortType: {
          id: '62dd1dbb-7bb6-40fb-8d80-0f26d3cc47a2'
        },
        fields: {
          title: 'title 1',
          description: 'description 1'
        }
      };

      it('should return a promise', () => {
        const effortsPromise = effortsController.createEffort(validOptions);

        return effortsPromise.should.be.fulfilled;
      });
    })
  });

  describe('#getEfforts()', () => {
    it('should return a promise', () => {
      const effortsPromise = effortsController.getEfforts()

      return effortsPromise.should.be.fulfilled;
    });
  });
});
