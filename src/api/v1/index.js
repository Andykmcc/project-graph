const express = require('express');
const efforts = require('./efforts');
const effortTypes = require('./effortTypes');
const organizations = require('./organizations');
const users = require('./users');

const router  = express.Router();

router.use('/efforts', efforts);
router.use('/efforttypes', effortTypes);
router.use('/users', users);
router.use('/organizations', organizations);

module.exports = router;
