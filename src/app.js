const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

/************************************************
 * START IMPORT ENDPOINTS
 */
const apiRouter = require('./api');
/*
 * END IMPORT ENDPOINTS
 */

/************************************************
 * START APP CONFIG
 */
const app = express();

app.use(helmet());

app.use(bodyParser.json())

app.use('/api', apiRouter);
/*
 * END APP CONFIG
 */

/************************************************
 * APP EXPORT
 */
module.exports = app;
