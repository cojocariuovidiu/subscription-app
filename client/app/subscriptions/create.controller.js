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
    vm.hasInputErrors = hasInputErrors;
    vm.isFormFilledCorrectly = isFormFilledCorrectly;


    function createSubscription() {
      return subscriptionsFactory.create(vm.subscription)
        .then(_goToCreateConfirmation);
    }

    function hasInputErrors(inputName) {
      return !vm.createSubscriptionForm[inputName].$valid
        && vm.createSubscriptionForm[inputName].$dirty;
    }

    function isFormFilledCorrectly() {
      return _isFormValid() && vm.isConsentChecked;
    }

    ////

    function _goToCreateConfirmation() {
      $state.go('create-subscriptions-confirmation');
    }

    function _hasInputBeenUsed(inputName) {
      return vm.createSubscriptionForm[inputName].$dirty;
    }

    function _isFormValid() {
      return vm.createSubscriptionForm.$valid;
    }
  }

})();
