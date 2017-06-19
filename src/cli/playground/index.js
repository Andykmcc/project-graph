'use strict';

const { resolve } = require('path');
const apiBase     = resolve(__dirname, '..', '..', 'api', 'v1');
const efforts     = require(resolve(apiBase, 'efforts', 'effortsController'));
const effortTypes = require(resolve(apiBase, 'effortTypes', 'effortTypesController'));
const users       = require(resolve(apiBase, 'users', 'usersController'));
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

