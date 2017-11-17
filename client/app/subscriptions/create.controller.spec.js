'use strict';

describe('Controller: CreateSubscriptionsCtrl', function() {

  beforeEach(module('subscriptionApp.subscriptions'));
  beforeEach(module('stateMock'));

  var scope;
  var CreateSubscriptionsCtrl;
  var state;
  var $httpBackend;
  var subscriptionsFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $state, _subscriptionsFactory_) {
    scope = $rootScope.$new();
    state = $state;
    subscriptionsFactory = _subscriptionsFactory_;

    CreateSubscriptionsCtrl = $controller('CreateSubscriptionsCtrl', {
      $scope: scope,
      subscriptionsFactory: subscriptionsFactory
    });
  }));

  it('should attach a list of things to the controller', function() {
    console.log(subscriptionsFactory)
  });

});
