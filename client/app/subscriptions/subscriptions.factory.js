(function () {

    'use strict';

    angular
        .module('subscriptionApp.subscriptions')
        .factory('subscriptionsFactory', subscriptionsFactory);

    subscriptionsFactory.$inject = [];

    function subscriptionsFactory() {

      return {
        create: create
      };

      ////

      function create(subscription) {
        return null;
      }

    }

}());
