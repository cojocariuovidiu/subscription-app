'use strict';

var TrustedClient = require('./trusted-client.model');

exports.getActiveByApiKey = getActiveByApiKey;

function getActiveByApiKey(apiKey) {
  return TrustedClient.findOne({
      apiKey: apiKey,
      isActive: true
    }).exec();
}
