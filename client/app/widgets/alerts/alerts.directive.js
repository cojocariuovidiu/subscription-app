(function() {

  'use strict';

  angular
    .module('subscriptionApp.widgets')
    .directive('subsAlerts', subsAlerts);

  subsAlerts.$inject = [];

  function subsAlerts() {
    return {
      templateUrl: 'app/widgets/alerts/alerts.html',
      restrict: 'E',
      scope: {},
      controller: 'AlertsCtrl as alertsVM'
    };
  }

})();
