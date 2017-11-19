'use strict';

var throwjs = require('throw.js');
var HttpStatus = require('http-status-codes');

var subscriptionService = require('./subscription.service');
var ValidationError = require('../common/exceptions/validation-error');
var EntityDuplicateError = require('../common/exceptions/entity-duplicate-error');

exports.create = create;

function create(req, res, next) {
  subscriptionService.add(req.body)
    .then(function (subscription) {
      res.status(HttpStatus.CREATED).send({ _id: subscription._id });
    })
    .catch(ValidationError, function (err) {
      next(new throwjs.BadRequest(err.message));
    })
    .catch(EntityDuplicateError, function (err) {
      next(new throwjs.Conflict(err.message));
    })
    .catch(function (err) {
      next(err);
    });
}
