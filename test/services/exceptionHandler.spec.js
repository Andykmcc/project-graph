const assert = require('assert');
const sinon = require('sinon');
const exceptionHandler = require('services/exceptionHandler');

function mockRes () {
  const self = this;

  this.status = sinon.spy(() => self);
  this.json = sinon.spy(() => self);

  return self;
}

describe('exceptionHandler', () => {
  describe('sendError', () => {
    let resObj;
    beforeEach(() => {
      resObj = new mockRes();
    });

    it('should set the http status to that which is passed in through the error object', () => {
      exceptionHandler.sendError(resObj, new Error('test'));

      assert(resObj.status.calledWithExactly(500));
    });

    it('should res.json', () => {
      exceptionHandler.sendError(resObj, new Error('test'));

      assert(resObj.json.called);
    });
  });
});
