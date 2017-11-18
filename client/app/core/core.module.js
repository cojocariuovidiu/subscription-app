(function() {

  'use strict';

    angular
        .module('subscriptionApp.core', [
            // Angular modules
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngAutodisable',

            // Cross-app modules
            'subscriptionApp.constants',

            // 3rd-party modules
            'ui.router',
            'ui.bootstrap'
        ]);

})();
