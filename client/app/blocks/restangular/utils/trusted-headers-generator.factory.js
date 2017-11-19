(function () {

  'use strict';

  angular
    .module('blocks.restangular')
    .factory('trustedHeadersGenerator', trustedHeadersGenerator);

  trustedHeadersGenerator.$inject = [
    'APP_CONFIG',
    'randomString'
  ];

  function trustedHeadersGenerator(APP_CONFIG, randomString) {
    return {
      generate: generate
    }

    ////

    function generate() {
      var nonce = randomString(32);
      var ts = Date.now();

      return {
        'subs-ts': ts,
        'subs-nonce': nonce,
        'subs-apikey': APP_CONFIG.apiKey,
        'subs-authorization': _generateSignature(nonce, ts)
      }
    }

    ////

    function _generateSignature(nonce, ts) {
      return CryptoJS.HmacSHA1(_generateKeyString(nonce, ts), APP_CONFIG.apiSecret)
        .toString(CryptoJS.enc.Hex);
    }

    function _generateKeyString(nonce, ts) {
      return nonce.concat('#')
        .concat(ts)
        .concat('#')
        .concat(APP_CONFIG.apiKey)
        .concat('##');
    }
  }

})();
