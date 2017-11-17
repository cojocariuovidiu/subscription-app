(function() {

  'use strict';

  angular
    .module('subscriptionApp', [
      // Shared modules
      'subscriptionApp.core',

      // Feature areas
      'subscriptionApp.subscriptions'
    ])
    .config(configRoutes);

    configRoutes.$inject = [
      '$urlRouterProvider',
      '$locationProvider'
    ];

    function configRoutes($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    }

})();
