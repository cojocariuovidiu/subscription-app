(function() {

  'use strict';

  angular
    .module('subscriptionApp.core')
    .factory('_', lodash);

  function lodash() {
    return window._;
  }

})();
