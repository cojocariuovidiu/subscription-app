'use strict';

var Subscription = require('./subscription.model');
var mongooseUtils = require('../common/utils/mongoose-error-utils');
var ValidationError = require('../common/exceptions/validation-error');
var EntityDuplicateError = require('../common/exceptions/entity-duplicate-error');

exports.create = create;

function create(subscription) {
  return new Subscription(subscription).save()
    .catch(_handleCreateError);
}

function _handleCreateError(err) {
  if (mongooseUtils.isValidationError(err)) {
    throw new ValidationError(err.message)
  }

  if (mongooseUtils.isDuplicateKeyError(err)) {
    throw new EntityDuplicateError('Subscription already exists')
  }

  throw err;
}
