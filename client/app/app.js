(function() {

  'use strict';

  angular
    .module('subscriptionApp', [
      // Shared modules
      'subscriptionApp.core'

      // Feature areas
    ])
    .config(function($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    });

})();
