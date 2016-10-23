const assert = require('assert');
const usersController = require('./usersController');

describe('Users', () => {

  describe('#getUsers()', () => {
    // simple test just to be sure mocha is working
    it('should return an Array', () => {
      assert.equal(true, Array.isArray(usersController.getUsers()));
    });
  });

  describe('#getUser()', () => {
    // simple test just to be sure mocha is working
    it('should return an object with an ID matching the argument', () => {
      assert.equal(1, usersController.getUser(1).id);
    });
  });

});
