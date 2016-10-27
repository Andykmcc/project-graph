const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const apiV1Router = require('./api/v1/index');

const app = express();

app.use(helmet());

app.use(bodyParser.json())

app.use('/api/v1', apiV1Router);

module.exports = app;
