(function () {

  'use strict';

  angular
    .module('blocks.restangular')
    .factory('PublicRestangular', PublicRestangular);

  PublicRestangular.$inject = [
    'APP_CONFIG',
    'Restangular',
    '_',
    'trustedHeadersGenerator'
  ];

  function PublicRestangular(APP_CONFIG, Restangular, _, trustedHeadersGenerator) {
    return Restangular
      .withConfig(setConfig)
      .addFullRequestInterceptor(setTrustedClientHeaders);

    ////

    function setConfig(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(APP_CONFIG.apiEndpoint + '/api');
    }

    function setTrustedClientHeaders(elem, operation, what, url, headers) {
      return {
        headers: _.extend(headers, trustedHeadersGenerator.generate())
      };
    }
  }

})();
