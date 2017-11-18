'use strict';

var throwjs = require('throw.js');

module.exports = function(app) {
  app.use(_errorHandler);
}

function _errorHandler(err, req, res, next) {
  var env = req.app.get('env');

  if (env !== 'development' && env !== 'test' && err.stack) {
    delete err.stack;
  } else {
    console.log('error:', JSON.stringify(err))
    console.log('');
    console.log(err.stack)
  }

  if (!err.statusCode && !err.status) {
    err = new throwjs.InternalServerError('Something unexpected happened');
  }

  res.status(err.statusCode || err.status).json(err);
}
