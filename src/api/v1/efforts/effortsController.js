// mock data for basic setup and tesing.
const exampleEfforts = require('./exampleEfforts.json');

function getEfforts () {
  return exampleEfforts;
}

function getEffort (effortId) {
  return exampleEfforts.find(item => {
    return parseInt(item.id, 10) === parseInt(effortId, 10);
  });
}

module.exports = {
  getEfforts,
  getEffort
}
