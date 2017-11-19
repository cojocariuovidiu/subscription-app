(function() {

  'use strict';

  angular
    .module('subscriptionApp.widgets')
    .directive('subsValidSubscriptionAge', subsValidSubscriptionAge);

  subsValidSubscriptionAge.$inject = [
    'SHARED_CONFIG'
  ];

  function subsValidSubscriptionAge(SHARED_CONFIG) {
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
        return calculateAge(dateOfBirth) >= SHARED_CONFIG.subscriptionSettings.minAge;
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
