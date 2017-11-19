(function() {

  'use strict';

  angular
    .module('subscriptionApp.widgets')
    .directive('subsValidSubscriptionAge', subsValidSubscriptionAge);

  subsValidSubscriptionAge.$inject = [
    'SUBSCRIPTION_SETTINGS'
  ];

  function subsValidSubscriptionAge(SUBSCRIPTION_SETTINGS) {
    return {
      require: 'ngModel',
      link: linkFn
    }

    ////

    function linkFn(scope, elem, attrs, ngModel) {
      scope.$watch(attrs.ngModel, function (value) {
        if (value && isDate(value)) {
          checkAgeAndSetValidity(value);
        } else {
          disableSubscriptionAgeError();
        }
      });

      ////

      function checkAgeAndSetValidity(dateOfBirth) {
        if (isValidSubscriptionAge(dateOfBirth)) {
          disableSubscriptionAgeError();
        } else {
          enableSubscriptionAgeError();
        }
      }

      function isDate(value) {
        return moment.isDate(new Date(value));
      }

      function isValidSubscriptionAge(dateOfBirth) {
        return calculateAge(dateOfBirth) >= SUBSCRIPTION_SETTINGS.minAge;
      }

      function enableSubscriptionAgeError() {
        ngModel.$setValidity('subscriptionAge', false);
      }

      function disableSubscriptionAgeError() {
        ngModel.$setValidity('subscriptionAge', true);
      }

      function calculateAge(dateOfBirth) {
        var today = moment().startOf('day');
        return today.diff(moment(dateOfBirth), 'years');
      }
    }
  }

})();
