(function () {

    'use strict';

    angular
        .module('subscriptionApp.subscriptions')
        .factory('subscriptionsFactory', subscriptionsFactory);

    subscriptionsFactory.$inject = [];

    function subscriptionsFactory() {

      return {
        getAll: getAll
      };

      ////

      function getAll() {
        return null;
      }

    }

}());
