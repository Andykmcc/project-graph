const express = require('express');
const router  = express.Router();
// mock data for basic setup and tesing.
const mockEfforts = require('./efforts.mock.json');

// example.com/api/v1/efforts
router.get('/efforts', function (req, res) {
  res.json(mockEfforts);
});

// example.com/api/v1/efforts/1
router.get('/efforts/:effortId', function (req, res) {
  const effort = mockEfforts.efforts.find(function (item) {
    return parseInt(item.id, 10) === parseInt(req.params.effortId, 10);
  });
  res.json(effort);
});

module.exports = router;
