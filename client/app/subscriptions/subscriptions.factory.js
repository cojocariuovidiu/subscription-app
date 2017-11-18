(function () {

  'use strict';

  angular
      .module('subscriptionApp.subscriptions')
      .factory('subscriptionsFactory', subscriptionsFactory);

  subscriptionsFactory.$inject = [
    'PublicRestangular'
  ];

  function subscriptionsFactory(PublicRestangular) {

    return {
      create: create
    };

    ////

    function create(subscription) {
      return PublicRestangular
        .all('subscriptions')
        .post(subscription, null);
    }

  }

}());
