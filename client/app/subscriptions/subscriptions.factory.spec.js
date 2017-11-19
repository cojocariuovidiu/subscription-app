'use strict';

describe('Factory: subscriptionsFactory', function() {

  beforeEach(module('subscriptionApp.subscriptions'));
  beforeEach(module('stateMock'));

  var endpoint;
  var subscriptionsFactory;
  var $httpBackend;

  beforeEach(inject(function(APP_CONFIG, _subscriptionsFactory_, _$httpBackend_) {
    endpoint = APP_CONFIG.apiEndpoint;
    subscriptionsFactory = _subscriptionsFactory_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be defined', function() {
    expect(subscriptionsFactory).to.be.defined;
  });

  describe('.create()', function () {

    var subscription;
    var subscriptionId;

    beforeEach(function () {
      subscription = {
        firstName: 'Bruce',
        email: 'brucewayne@wayne.enterprises.com',
        dateOfBirth: '1976-02-28T23:00:00.000Z',
        gender: 'male',
        newsletterId: '5a1095859ed46a42ff652796'
      };

      subscriptionId = '5a1095859ed46a42ff652796';
    });

    beforeEach(function () {
      $httpBackend
        .expectPOST(endpoint + '/api/subscriptions', subscription)
        .respond({
          _id: subscriptionId
        });
    });

    it('should create a subscription', function () {
      subscriptionsFactory.create(subscription)
        .then(function (result) {
          expect(result._id).to.equal(subscriptionId);
        });

      $httpBackend.flush();
    });

  });

});
