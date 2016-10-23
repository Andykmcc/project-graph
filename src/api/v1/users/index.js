const express = require('express');
const router  = express.Router();
// mock data for basic setup and tesing.
const mockUsers = require('./users.mock.json');

// example.com/api/v1/users
router.get('/users', function (req, res) {
  res.json(mockUsers);
});

// example.com/api/v1/users/1
router.get('/users/:userId', function (req, res) {
  const user = mockUsers.users.find(function (item) {
    return parseInt(item.id, 10) === parseInt(req.params.userId, 10);
  });
  res.json(user);
});

module.exports = router;
