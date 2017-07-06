const Boom = require('boom');
const R = require('ramda');

function sendError (res, error) {
  const err = Boom.wrap(error);
  res.status(err.output.statusCode).json(err.output);
}

function joiToBoom(joiException) {
  return Boom.badRequest(joiException.message, joiException.details);
}

module.exports = {
  joiToBoom: joiToBoom,
  sendError: R.curry(sendError)
};
