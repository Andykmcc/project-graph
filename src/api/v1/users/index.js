const express = require('express');
const router  = express.Router();
const usersController = require('./usersController');

// example.com/api/v1/users
router.get('/users', (req, res) => res.json(usersController.getUsers()));

// example.com/api/v1/users/1
router.get('/users/:userId', (req, res) => {
  res.json(usersController.getUser(req.params.userId));
});

module.exports = router;
