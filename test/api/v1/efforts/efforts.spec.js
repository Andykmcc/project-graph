const proxyquire =  require('proxyquire').noCallThru();
const chai = require('chai');
// https://www.npmjs.com/package/chai-as-promised
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const driverStub = {
  session: () => {
    return {
      run: () => {
        return Promise.resolve({records: [{_fields: [0,1,2]}]});
      },
      close: () => {}
    }
  }
};

const effortsController = proxyquire('api/v1/efforts/effortsController', {'../../../db': driverStub});

describe('effortsController', () => {
  describe('#createEffort()', () => {
    it('should return a rejected promise if no params are passed', () => {
      const effortsPromise = effortsController.createEffort();

      return effortsPromise.should.be.rejected;
    });

    it('should return a rejected promise if an empty object is passed', () => {
      const effortsPromise = effortsController.createEffort({});

      return effortsPromise.should.be.rejected;
    });

    it('should return a rejected promise if non-whitelisted params are passed', () => {
      const effortsPromise = effortsController.createEffort({badkey:'bad value'});

      return effortsPromise.should.be.rejected;
    });

    describe('when passed a title and description', () => {
      const validOptions = {
        title: 'test title 1',
        description: 'test description 1'
      };

      it('should return a promise', () => {
        const effortsPromise = effortsController.createEffort(validOptions);

        return effortsPromise.should.be.fulfilled;
      });

      it('should return a promise with an collection of record\'s with their _fields', () => {
        const effortsPromise = effortsController.createEffort(validOptions);

        return effortsPromise.should.eventually.deep.equal([[0,1,2]]);
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
