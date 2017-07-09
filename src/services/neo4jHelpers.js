const R = require('ramda');
const Boom = require('boom');
const neo4j = require('neo4j-driver').v1;
const driver = require('../db');

function handleSuccess (session, results) {
  session.close();

  return results.records.map(record => {
    return recordTransformer(R.pickAll(['labels', 'properties', 'relationships'], Object.values(record.toObject())[0]));
  });
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

function convertNumbers (numberObject) {
  const neo4jNum = neo4j.int(numberObject);
  if (neo4j.integer.inSafeRange(neo4jNum)) {
    return neo4jNum.toNumber();
  } else {
    return neo4jNum.toString();
  }
}

function recordTransformer (record) {
  return R.evolve({
    properties: {
      created_at: convertNumbers,
      updated_at: convertNumbers
    }
  }, record);
}

module.exports = {
  convertNumbers,
  handleSuccess,
  handleError,
  query
};
