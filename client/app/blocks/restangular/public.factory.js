(function () {

    'use strict';

    angular
      .module('blocks.restangular')
      .factory('PublicRestangular', PublicRestangular);

    PublicRestangular.$inject = [
        'APP_CONFIG',
        'Restangular'
    ];

    function PublicRestangular(APP_CONFIG, Restangular) {
        return Restangular.withConfig(_setConfig);

        ////

        function _setConfig(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(APP_CONFIG.apiEndpoint + '/api');
            // TODO: revise
            // RestangularConfigurer.setDefaultHeaders({
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache'
            // });
        }
    }

})();
