const express = require('express');
const Controller = require('./organizationsController');
const router  = express.Router();

// example.com/api/v1/organizations/87sd987dfs78fd768fds678
router.delete('/:id', (req, res) => {
  organizationsController.deleteOrganization(req.params.id)
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

// example.com/api/v1/organizations/87sd987dfs78fd768fds678
router.get('/:id', (req, res) => {
  organizationsController.getOrganization(req.params.id)
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

// example.com/api/v1/organizations
router.post('/', (req, res) => {
  organizationsController.createOrganization(req.body)
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

// example.com/api/v1/organizations
router.get('/', (req, res) => {
  organizationsController.getorganizations()
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

module.exports = router;
