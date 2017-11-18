'use strict';

exports.isValidationError = isValidationError;
exports.isDuplicateKeyError = isDuplicateKeyError;

function isValidationError(err) {
  return err.name === 'ValidationError';
}

function isDuplicateKeyError(err) {
  return err.code === 11000;
}
