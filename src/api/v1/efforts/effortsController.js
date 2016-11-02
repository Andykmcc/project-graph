const R = require('ramda');
const effortsUtils = require('./effortsUtils');
const driver = require('../../../db');

function getEfforts () {
  const session = driver.session();
  const processResults = R.curry(effortsUtils.handleSuccess)(session);
  const processError = R.curry(effortsUtils.handleError)(session);

  return session.run('MATCH (n:Effort) RETURN n LIMIT 10')
    .then(processResults)
    .catch(processError);
}

function createEffort (params) {
  if (params === undefined) {
    return Promise.reject(new Error('createEffort requires parameters'));
  };

  const paramsWhiteList = ['title'];
  const session = driver.session();
  const processResults = R.curry(effortsUtils.handleSuccess)(session);
  const processError = R.curry(effortsUtils.handleError)(session);
  const paramString = effortsUtils.makeParamString(paramsWhiteList);

  return session.run(`
    CREATE (n:Effort {
      ${paramString}
    })
    RETURN n
    `,
    R.pick(paramsWhiteList, params))
    .then(processResults)
    .catch(processError);
}

module.exports = {
  getEfforts,
  createEffort
}
