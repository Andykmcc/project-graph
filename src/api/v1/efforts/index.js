const express = require('express');
const R = require('ramda');
const effortController = require('./effortsController');
const router = express.Router();

// example.com/api/v1/efforts/1
router.get('/', (req, res) => {
  effortController.getEfforts()
    .then(results => res.json(results))
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        stack: err.stack
      });
    });
});

// example.com/api/v1/efforts/
router.post('/', (req, res) => {
  effortController.createEffort(req.body)
    .then(results => res.json(results))
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        stack: err.stack
      });
    });
});

module.exports = router;
