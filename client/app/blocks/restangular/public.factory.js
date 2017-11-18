(function () {

    'use strict';

    angular
      .module('blocks.restangular')
      .factory('PublicRestangular', PublicRestangular);

    PublicRestangular.$inject = [
        'appConfig',
        'Restangular'
    ];

    function PublicRestangular(appConfig, Restangular) {
        return Restangular.withConfig(_setConfig);

        ////

        function _setConfig(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(appConfig.apiEndpoint + '/api');
            // TODO: revise
            // RestangularConfigurer.setDefaultHeaders({
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache'
            // });
        }
    }

})();
