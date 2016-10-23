const express = require('express');
const router  = express.Router();
const efforts = require('./efforts');
const users = require('./users');

router.use(efforts);
router.use(users);

module.exports = router;
