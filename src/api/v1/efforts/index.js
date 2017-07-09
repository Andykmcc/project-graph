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

// example.com/api/v1/efforts/42a44a14-7ba1-48a1-82d7-5bd050784b20
router.get('/:id', (req, res) => {
  effortController.getEffort(req.params.id)
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
