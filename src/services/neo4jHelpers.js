'use strict';
const R = require('ramda');
const Boom = require('boom');
const driver = require('../db');

function handleSuccess (session, results, returnKey/*: ?string*/) {
  session.close();
  const r = results.records.map(record => {
    const obj = record.toObject();
    return typeof returnKey === 'string' ? obj[returnKey] : obj;
  });
  return r;
}

function handleError (session, error/*: Error*/) {
  session.close();
  switch(error.code) {
    case 'ServiceUnavailable':
      throw Boom.serverUnavailable(error.message, error.stack);
      break;
    default:
      throw Boom.create(400, error.message, error.stack);
  }
}

function query(queryString/*: string*/
              , data/*: {[key: string]: mixed}*/
              , returnKey/*: ?string*/)/*: Promise<mixed>*/ {
  const session = driver.session();
  const processResults = function (results) {
    return handleSuccess(session, results, returnKey);
  };
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
