(function () {
  'use strict';

  angular
    .module('subscriptionApp.subscriptions')
    .controller('CreateSubscriptionsCtrl', CreateSubscriptionsCtrl);

  CreateSubscriptionsCtrl.$inject = [
    '$state',
    'subscriptionsFactory'
  ];

  function CreateSubscriptionsCtrl($state, subscriptionsFactory) {
    var vm = this;

    vm.subscription = {};
    vm.isConsentChecked = false;

    vm.createSubscription = createSubscription;
    vm.isFormFilledCorrectly = isFormFilledCorrectly;


    function createSubscription() {
      // return subscriptionsFactory.create(vm.subscription);
      _goToCreateConfirmation();
    }

    function isFormFilledCorrectly() {
      return _areFieldsFilledCorrectly()
        && vm.isConsentChecked;
    }

    ////

    function _goToCreateConfirmation() {
      $state.go('create-subscriptions-confirmation');
    }

    function _areFieldsFilledCorrectly() {
      return !vm.createSubscriptionForm.$invalid;
    }
  }

})();
