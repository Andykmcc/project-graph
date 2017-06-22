const express = require('express');
const R = require('ramda');
const exceptionHandler = require('../../../services/exceptionHandler');
const effortController = require('./effortsController');
const router = express.Router();

// example.com/api/v1/efforts/
router.get('/', (req, res) => {
  effortController.getEfforts()
    .then(results => res.json(results))
    .catch(exceptionHandler.sendError(res));
});

// example.com/api/v1/efforts/
router.post('/', (req, res) => {
  effortController.createEffort(req.body)
    .then(results => res.json(results))
    .catch(exceptionHandler.sendError(res));
});

module.exports = router;
