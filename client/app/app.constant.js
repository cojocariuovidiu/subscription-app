(function(angular, undefined) {
'use strict';

angular.module('subscriptionApp.constants', [])

.constant('SHARED_CONFIG', {subscriptionSettings:{minAge:16}})

.constant('APP_CONFIG', {apiEndpoint:'http://localhost:9000',apiKey:'9cf09931e7cf2d7d36ad06',apiSecret:'ead67e06054b717adb50899be53d3bb41f6452374820',newsletterId:'qwerty'})

;
})(angular);