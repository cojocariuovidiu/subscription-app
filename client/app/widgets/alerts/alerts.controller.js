(function () {

  'use strict';

  angular
    .module('subscriptionApp.widgets')
    .controller('AlertsCtrl', AlertsCtrl);

  AlertsCtrl.$inject = [
    'alertsFactory'
  ];

  function AlertsCtrl(alertsFactory) {
    var vm = this;

    vm.alerts = alertsFactory.getAll();

    vm.closeAlert = alertsFactory.close;
  }

})();
