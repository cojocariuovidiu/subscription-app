(function () {
  'use strict';

  angular
    .module('subscriptionApp.subscriptions')
    .controller('CreateSubscriptionsCtrl', CreateSubscriptionsCtrl);

  CreateSubscriptionsCtrl.$inject = [
    'APP_CONFIG',
    'SUBSCRIPTION_SETTINGS',
    '$state',
    'subscriptionsFactory',
    'httpErrorUtils',
    'subscriptionsAlerts'
  ];

  function CreateSubscriptionsCtrl(APP_CONFIG, SUBSCRIPTION_SETTINGS, $state,
    subscriptionsFactory, httpErrorUtils, subscriptionsAlerts) {
    var vm = this;

    vm.subscription = _getEmptySubscription();
    vm.isConsentChecked = false;
    vm.isDatePickerOpened = false;
    vm.minAge = SUBSCRIPTION_SETTINGS.minAge;

    vm.createSubscription = createSubscription;
    vm.hasInputErrors = hasInputErrors;
    vm.isFormFilledCorrectly = isFormFilledCorrectly;
    vm.isInvalidDateError = isInvalidDateError;
    vm.isInvalidSubscriptionAgeError = isInvalidSubscriptionAgeError;
    vm.openDatePicker = openDatePicker;


    function createSubscription() {
      return subscriptionsFactory.create(vm.subscription)
        .then(_goToCreateConfirmation)
        .catch(_handleCreateSubscriptionError);
    }

    function hasInputErrors(inputName) {
      return !vm.createSubscriptionForm[inputName].$valid
        && vm.createSubscriptionForm[inputName].$dirty;
    }

    function isFormFilledCorrectly() {
      return _isFormValid() && vm.isConsentChecked;
    }

    function isInvalidDateError(inputName) {
      return vm.createSubscriptionForm[inputName].$error.date;
    }

    function isInvalidSubscriptionAgeError(inputName) {
      return vm.createSubscriptionForm[inputName].$error.subscriptionAge;
    }

    function openDatePicker() {
      vm.isDatePickerOpened = true;
    }

    ////

    function _getEmptySubscription() {
      return {
        newsletterId: APP_CONFIG.newsletterId
      };
    }

    function _goToCreateConfirmation() {
      $state.go('create-subscriptions-confirmation');
    }

    function _hasInputBeenUsed(inputName) {
      return vm.createSubscriptionForm[inputName].$dirty;
    }

    function _isFormValid() {
      return vm.createSubscriptionForm.$valid;
    }

    function _handleCreateSubscriptionError(err) {
      if (httpErrorUtils.isConflict(err)) {
        subscriptionsAlerts.showAlreadySubscribed(vm.subscription.email);
      } else {
        subscriptionsAlerts.showUnexpectedError();
      }
    }
  }

})();
