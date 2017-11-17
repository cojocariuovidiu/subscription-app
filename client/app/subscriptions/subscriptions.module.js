(function() {

  'use strict';

  angular
    .module('subscriptionApp.subscriptions', [
      'subscriptionApp.core'
    ])
    .config(configStates);

  configStates.$inject = [
    '$stateProvider'
  ];

  function configStates($stateProvider) {
    $stateProvider
      .state('create-subscriptions', {
        url: '/',
        templateUrl: 'app/subscriptions/create.html',
        controller: 'CreateSubscriptionsCtrl',
        controllerAs: 'createVM'
      })
      .state('create-subscriptions-confirmation', {
        url: '/confirmation',
        templateUrl: 'app/subscriptions/create-confirmation.html'
      });
  }

})();
