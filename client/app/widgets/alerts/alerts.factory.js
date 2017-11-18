(function () {
  'use strict';

  angular
    .module('subscriptionApp.widgets')
    .factory('alertsFactory', alertsFactory);

  alertsFactory.$inject = [];

  function alertsFactory() {
    var alerts = [];

    return {
      getAll: getAll,
      show: show,
      close: close
    };

    ////

    function getAll() {
      return alerts;
    }

    function show(alert) {
      if (_isAlertBeingShown()) {
        clearAlerts();
      }
      _add(alert);
    }

    function close() {
      alerts.pop();
    }

    ////

    function _clearAlerts() {
      alerts.length = 0;
    }

    function _add(alert) {
      alerts.push(alert);
    }

    function _isAlertBeingShown() {
      return alerts.length > 0;
    }

  }

}());
