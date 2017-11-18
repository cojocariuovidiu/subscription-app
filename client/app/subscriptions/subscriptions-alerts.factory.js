(function () {
  'use strict';

  angular
    .module('subscriptionApp.subscriptions')
    .factory('subscriptionsAlerts', subscriptionsAlerts);

  subscriptionsAlerts.$inject = [
    'alertsFactory'
  ];

  function subscriptionsAlerts(alertsFactory) {

    return {
      showAlreadySubscribed: showAlreadySubscribed,
      showUnexpectedError: showUnexpectedError
    };

    ////

    function showAlreadySubscribed(email) {
      alertsFactory.show(_getAlreadySubscribedAlert(email));
    }

    function showUnexpectedError() {
      alertsFactory.show(_getUnexpectedErrorAlert())
    }

    ////

    function _getAlreadySubscribedAlert(email) {
      return {
        type: 'danger',
        msg: '<strong>' + email + '</strong> is already subscribed to the list.'
      };
    }

    function _getUnexpectedErrorAlert() {
      return {
        type: 'danger',
        msg: '<strong>Oops!</strong> Something went wrong. Please, try again later.'
      }
    }

  }

}());
