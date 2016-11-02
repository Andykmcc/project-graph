const R = require('ramda');

function handleSuccess (session, results) {
  session.close();
  if (results.records && results.records.length) {
    return results.records.map(record => {
      // ref. 'private' member of data to make this method easily testable.
      return record._fields;
      /** Below is the approach suggested by the docs but it is hard to test
      /*  since it relies on data being an instance of a class from neo4j-driver
      /*  that is difficult to mock.
      /*
      /*  return record.keys.reduce((memo, key) => memo[key] = record.get(key), {});
       */
    });
  }
  return [];
}

function handleError (session, error) {
  session.close();
  return error;
}

function makeParamString (params) {
  return R.reduce((memo, item) => {
    return `${memo} ${item}: {${item}},`
  }, '', params)
  .replace(/\,$/, "")
  .trim();
}

module.exports = {
  handleSuccess,
  handleError,
  makeParamString
}
