const express = require('express');
const router  = express.Router();
const efforts = require('./efforts');
const users = require('./users');

router.use('/efforts', efforts);
router.use('/users', users);

module.exports = router;
