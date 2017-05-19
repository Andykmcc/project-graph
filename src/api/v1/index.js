const express = require('express');
const efforts = require('./efforts');
const effortTypes = require('./effortTypes');
const users = require('./users');

const router  = express.Router();

router.use('/efforts', efforts);
router.use('/efforttypes', effortTypes);
router.use('/users', users);

module.exports = router;
