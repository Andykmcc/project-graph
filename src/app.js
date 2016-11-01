const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

/************************************************
 * START IMPORT ENDPOINTS
 */
const apiV1Router = require('./api/v1/index');
/*
 * END IMPORT ENDPOINTS
 */

/************************************************
 * START APP CONFIG
 */
const app = express();

app.use(helmet());

app.use(bodyParser.json())

app.use('/api/v1', apiV1Router);
/*
 * END APP CONFIG
 */

/************************************************
 * APP EXPORT
 */
module.exports = app;
