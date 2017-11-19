'use strict';

describe('Controller: CreateSubscriptionsCtrl', function() {

  beforeEach(module('subscriptionApp.subscriptions'));
  beforeEach(module('stateMock'));

  var scope;
  var q;
  var CreateSubscriptionsCtrl;
  var APP_CONFIG;
  var SHARED_CONFIG;
  var state;
  var subscriptionsFactory;
  var httpErrorUtils;
  var subscriptionsAlerts;

  beforeEach(inject(function($controller, $rootScope, $q, _APP_CONFIG_,
    _SHARED_CONFIG_, $state, _subscriptionsFactory_, _httpErrorUtils_,
    _subscriptionsAlerts_) {
    scope = $rootScope.$new();
    q = $q;
    APP_CONFIG = _APP_CONFIG_;
    SHARED_CONFIG = _SHARED_CONFIG_;
    state = $state;
    subscriptionsFactory = _subscriptionsFactory_;
    httpErrorUtils = _httpErrorUtils_;
    subscriptionsAlerts = _subscriptionsAlerts_;

    CreateSubscriptionsCtrl = $controller('CreateSubscriptionsCtrl', {
      APP_CONFIG: APP_CONFIG,
      $scope: scope,
      subscriptionsFactory: subscriptionsFactory,
      httpErrorUtils: httpErrorUtils,
      subscriptionsAlerts: subscriptionsAlerts
    });
  }));

  beforeEach(function () {
    sinon.stub(state);
    sinon.stub(subscriptionsFactory);
    sinon.stub(httpErrorUtils);
    sinon.stub(subscriptionsAlerts);
  });

  it('should be defined', function() {
    expect(CreateSubscriptionsCtrl).to.be.defined;
  });

  describe('After controller is loaded', function () {

    it('subscription should be initialized', function () {
      expect(CreateSubscriptionsCtrl.subscription).to.be.defined;
      expect(CreateSubscriptionsCtrl.subscription).to.deep.equal({
        newsletterId: APP_CONFIG.newsletterId
      });
    });

    it('consent should not be checked', function () {
      expect(CreateSubscriptionsCtrl.isConsentChecked).to.be.false;
    });

    it('datepicker should be closed', function () {
      expect(CreateSubscriptionsCtrl.isDatePickerOpened).to.be.false;
    });

    it('subscription min age should be initialized', function () {
      var minAge = SHARED_CONFIG.subscriptionSettings.minAge;
      expect(CreateSubscriptionsCtrl.minAge).to.equal(minAge);
    });

  });

  describe('Creating subscription', function () {

    describe('if done correctly', function () {

      beforeEach(function () {
        subscriptionsFactory.create.returns(q.resolve());
      });

      it('should send create request', function () {
        CreateSubscriptionsCtrl.createSubscription();
        scope.$apply();

        expect(subscriptionsFactory.create.called).to.be.true;
      });

      it('should go to creation confirmation state', function () {
        CreateSubscriptionsCtrl.createSubscription();
        scope.$apply();

        var called = state.go.calledWithExactly('create-subscriptions-confirmation');
        expect(called).to.be.true;
      });

    });

    describe('if it fails', function () {

      beforeEach(function () {
        subscriptionsFactory.create.returns(q.reject());
      });

      it('should send create request', function () {
        CreateSubscriptionsCtrl.createSubscription();
        scope.$apply();

        expect(subscriptionsFactory.create.called).to.be.true;
      });

      describe('due to an http conflict error', function () {

        beforeEach(function () {
          httpErrorUtils.isConflict.returns(true);
        });

        it('should show already subscribed alert', function () {
          CreateSubscriptionsCtrl.createSubscription();
          scope.$apply();

          expect(subscriptionsAlerts.showAlreadySubscribed.called).to.be.true;
        });

      });

      describe('due to any other http error', function () {

        beforeEach(function () {
          httpErrorUtils.isConflict.returns(false);
        });

        it('should show unexpected error alert', function () {
          CreateSubscriptionsCtrl.createSubscription();
          scope.$apply();

          expect(subscriptionsAlerts.showUnexpectedError.called).to.be.true;
        });

      });

    });

  });

  describe('.hasInputErrors()', function () {

    describe('if input is valid AND has been used', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          email: {
            $valid: true,
            $dirty: true
          }
        };
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.hasInputErrors('email')).to.be.false;
      });

    });

    describe('if input is valid AND has NOT been used', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          email: {
            $valid: true,
            $dirty: false
          }
        };
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.hasInputErrors('email')).to.be.false;
      });

    });

    describe('if input is NOT valid AND has been used', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          email: {
            $valid: false,
            $dirty: true
          }
        };
      });

      it('should return true', function () {
        expect(CreateSubscriptionsCtrl.hasInputErrors('email')).to.be.true;
      });

    });

    describe('if input is NOT valid AND has NOT been used', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          email: {
            $valid: false,
            $dirty: false
          }
        };
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.hasInputErrors('email')).to.be.false;
      });

    });

  });

  describe('.isFormFilledCorrectly()', function () {

    describe('if form is valid AND consent is checked', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          $valid: true
        };
        CreateSubscriptionsCtrl.isConsentChecked = true;
      });

      it('should return true', function () {
        expect(CreateSubscriptionsCtrl.isFormFilledCorrectly()).to.be.true;
      });

    });

    describe('if form is valid AND consent is NOT checked', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          $valid: true
        };
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.isFormFilledCorrectly()).to.be.false;
      });

    });

    describe('if form is NOT valid AND consent is checked', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          $valid: false
        };
        CreateSubscriptionsCtrl.isConsentChecked = true;
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.isFormFilledCorrectly()).to.be.false;
      });

    });

    describe('if form is NOT valid AND consent NOT is checked', function () {

      beforeEach(function () {
        CreateSubscriptionsCtrl.createSubscriptionForm = {
          $valid: false
        };
      });

      it('should return false', function () {
        expect(CreateSubscriptionsCtrl.isFormFilledCorrectly()).to.be.false;
      });

    });

  });

  describe('.openDatePicker()', function () {

    it('should open the datepicker', function () {
      expect(CreateSubscriptionsCtrl.isDatePickerOpened).to.be.false;
      CreateSubscriptionsCtrl.openDatePicker();
      expect(CreateSubscriptionsCtrl.isDatePickerOpened).to.be.true;
    });

  });

});
