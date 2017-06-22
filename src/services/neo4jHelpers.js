const R = require('ramda');
const Boom = require('boom');
const driver = require('../db');

function handleSuccess (session, results) {
  session.close();
  if (results.records && results.records.length) {
    return results.records.map(record => {
      // ref. 'private' member of data to make this method easily testable.
      return record._fields;
      /** Below is the approach suggested by the docs but it is hard to test
      /*  since it relies on data being an instance of a class from neo4j-driver
      /*  that is difficult to mock.
       */
      // return record.keys.reduce((memo, key) => memo[key] = record.get(key), {});
    });
  }
  return [];
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
