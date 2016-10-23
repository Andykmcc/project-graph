const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.get('/', function (req, res) {
  res.send('ok');
})

module.exports = app;
