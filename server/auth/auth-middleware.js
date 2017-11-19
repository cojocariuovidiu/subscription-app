'use strict';

var throwjs = require('throw.js');
var crypto = require('crypto');
var _ = require('lodash');

var nonceService = require('./nonce/nonce.service');
var trustedClientService = require('./trusted-client/trusted-client.service');

var TS_HEADER = 'subs-ts';
var NONCE_HEADER = 'subs-nonce';
var APIKEY_HEADER = 'subs-apikey';
var AUTHORIZATION_HEADER = 'subs-authorization';

module.exports = middleware;

function middleware(req, res, next) {
  if (!areHeadersValid(req.headers)) {
    return next(new throwjs.Unauthorized('Invalid headers'));
  }

  var headersData = getHeadersData(req.headers);

  if (!isTimestampWithin24Hours(headersData.ts)) {
    return next(new throwjs.Unauthorized('Request expired.'));
  }

  trustedClientService.getActiveByApiKey(headersData.apiKey)
    .then(function (trustedClient) {
      if (!hasValue(trustedClient)) {
        return next(new throwjs.Unauthorized('Invalid API Key.'));
      }

      if (!isValidSignature(trustedClient.apiSecret, headersData)) {
        return next(new throwjs.Unauthorized('Invalid signature.'));
      }

      return nonceService.getByKey(generateNonceKey(headersData))
    })
    .then(function (nonce) {
      if (hasValue(nonce)) {
        return next(new throwjs.Unauthorized('Invalid request.'));
      }
      return nonceService.store(generateNonceKey(headersData));
    })
    .then(function () {
      next();
    })
    .catch(function () {
      next(new throwjs.InternalServerError('Could not complete authentication'));
    });
}

////

function areHeadersValid(headers) {
  return !_.isNaN(parseInt(headers[TS_HEADER]))
    && hasValue(headers[NONCE_HEADER])
    && hasValue(headers[APIKEY_HEADER])
    && hasValue(headers[AUTHORIZATION_HEADER]);
}

function getHeadersData(headers) {
  return {
    ts: headers[TS_HEADER],
    nonce: headers[NONCE_HEADER],
    apiKey: headers[APIKEY_HEADER],
    authorization: headers[AUTHORIZATION_HEADER]
  };
}

function isTimestampWithin24Hours(ts) {
  var tsAge = Date.now() - ts;
  return _.isNumber(tsAge) && tsAge >= -86400000 && tsAge <= 86400000;
}

function hasValue(value) {
  return !_.isNull(value) && !_.isUndefined(value);
}

function isValidSignature(apiSecret, headersData) {
  var signature = generateSignature(apiSecret, generateKeyString(headersData));
  return signature === headersData.authorization;
}

function generateKeyString(headersData) {
  return headersData.nonce.concat('#')
    .concat(headersData.ts)
    .concat('#')
    .concat(headersData.apiKey)
    .concat('##');
}

function generateSignature(apiSecret, keyString) {
  return crypto.createHmac('sha1', apiSecret).update(keyString).digest('hex');
}

function generateNonceKey(headersData) {
  return headersData.nonce.concat(':').concat(headersData.ts);
}
