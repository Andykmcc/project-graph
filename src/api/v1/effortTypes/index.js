const express = require('express');
const effortTypesController = require('./effortTypesController');
const router  = express.Router();

// example.com/api/v1/efforttypes/87sd987dfs78fd768fds678
router.delete('/:id', (req, res) => {
  effortTypesController.deleteEffortType(req.params.id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

// example.com/api/v1/efforttypes/87sd987dfs78fd768fds678
router.get('/:id', (req, res) => {
  effortTypesController.getEffortType(req.params.id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

// example.com/api/v1/efforttypes
router.post('/', (req, res) => {
  effortTypesController.createEffortType(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        code: err.code,
        message: err.message
      });
    });
});

module.exports = router;
