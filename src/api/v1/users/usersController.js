// mock data for basic setup and tesing.
const exampleUsers = require('./exampleUsers.json');

function getUsers () {
  return exampleUsers;
}

function getUser (userId) {
  return exampleUsers.find(item => {
    return parseInt(item.id, 10) === parseInt(userId, 10);
  });
}

module.exports = {
  getUsers,
  getUser
}
