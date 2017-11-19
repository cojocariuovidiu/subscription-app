(function(angular, undefined) {
'use strict';

angular.module('subscriptionApp.constants', [])

.constant('APP_CONFIG', {apiEndpoint:'http://localhost:9000',newsletterId:'qwerty'})

.constant('SUBSCRIPTION_SETTINGS', {minAge:18})

;
})(angular);