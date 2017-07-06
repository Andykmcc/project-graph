const R = require('ramda');
const Boom = require('boom');
const driver = require('../db');

function handleSuccess (session, results) {
  session.close();
  return results.records.map(record => record.toObject().n);
}

function handleError (session, error) {
  session.close();
  switch(error.code) {
    case 'ServiceUnavailable':
      throw Boom.serverUnavailable(error.message, error.stack);
      break;
    default:
      throw Boom.create(400, error.message, error.stack);
  }
}

function query (queryString, data) {
  const session = driver.session();
  const processResults = R.curry(handleSuccess)(session);
  const processError = R.curry(handleError)(session);

  return session.run(queryString, data)
    .then(processResults)
    .catch(processError);
}

module.exports = {
  handleSuccess,
  handleError,
  query
};
