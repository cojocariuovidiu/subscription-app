'use strict';

var TrustedClient = require('./trusted-client.model');

exports.getActiveByApiKey = getActiveByApiKey;

function getActiveByApiKey(apiKey) {
  return TrustedClient.findOne({
      apiKey: apiKey,
      active: true
    }).exec();
}
