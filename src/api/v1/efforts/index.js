const express = require('express');
const router  = express.Router();
const effortController = require('./effortsController');

// example.com/api/v1/efforts
router.get('/efforts', (req, res) => res.json(effortController.getEfforts()));

// example.com/api/v1/efforts/1
router.get('/efforts/:effortId', (req, res) => {
  res.json(effortController.getEffort(req.params.effortId));
});

module.exports = router;
