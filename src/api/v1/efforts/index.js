const express = require('express');
const effortController = require('./effortsController');
const router  = express.Router();

// example.com/api/v1/efforts
router.get('/efforts', (req, res) => {
  effortController.getEfforts()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).send({error: err});
    });
});

// example.com/api/v1/efforts/1
router.post('/efforts', (req, res) => {
  console.log(req);
  effortController.createEffort(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).send('error', {error: err});
    });
});

module.exports = router;
