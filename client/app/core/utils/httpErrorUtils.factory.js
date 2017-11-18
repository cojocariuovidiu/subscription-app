(function () {

  'use strict';

  angular
      .module('subscriptionApp.core')
      .factory('httpErrorUtils', httpErrorUtils);

  httpErrorUtils.$inject = [];

  function httpErrorUtils() {

    return {
      isConflict: isConflict
    };

    ////

    function isConflict(error) {
      return error && error.data && error.data.statusCode === 409;
    }

  }

}());
