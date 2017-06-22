const apiBase     = '../../api/v1/';
const efforts     = require(`${apiBase}efforts/effortsController`);
const effortTypes = require(`${apiBase}effortTypes/effortTypesController`);
const users       = require(`${apiBase}users/usersController`);
const { methods } = require('./lib');

module.exports = {
  efforts: methods(efforts, [
    'getEfforts',
    'createEffort'
  ]),
  effortTypes: methods(effortTypes, [
    'createEffortType',
    'deleteEffortType',
    'getEffortType',
    'getEffortTypes'
  ]),
  users: methods(users, [
    'getUsers',
    'getUser'
  ]),
};

