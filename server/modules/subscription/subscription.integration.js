
'use strict';

var request = require('supertest');
var HttpStatus = require('http-status-codes');

var app = require('../..');
var Subscription = require('./subscription.model');

describe('Subscriptions API:', function() {

  var subscription;

  before(function (done) {
    Subscription.remove({}).exec()
      .then(function () {
        done();
      });
  });

  beforeEach(function () {
    subscription = {
      firstName: 'Bruce',
      email: 'brucewayne@wayne.enterprises.com',
      dateOfBirth: '1976-02-28T23:00:00.000Z',
      gender: 'male',
      newsletterId: '5a1095859ed46a42ff652796'
    };
  });

  describe('POST /api/subscriptions', function() {

    it('should respond with the created subscription\'s ID', function(done) {
      request(app)
        .post('/api/subscriptions')
        .send(subscription)
        .expect(HttpStatus.CREATED)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body).to.be.instanceOf(Object);
          expect(res.body).to.have.property('_id');

          done();
        });
    });

    it('should respond with 409 when email is already subscribed to newsletter', function (done) {
      request(app)
        .post('/api/subscriptions')
        .send(subscription)
        .expect('Content-Type', /json/)
        .expect(HttpStatus.CONFLICT, done);
    });

    it('should respond with 400 when any of the required fields is missing', function (done) {
      request(app)
        .post('/api/subscriptions')
        .send({
          firstName: 'Bruce',
          dateOfBirth: '1976-02-28T23:00:00.000Z',
          gender: 'male',
          newsletterId: '5a1095859ed46a42ff652796'
        })
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it('should respond with 400 when any of the fields is invalid', function (done) {
      request(app)
        .post('/api/subscriptions')
        .send({
          email: 'invalid.email.com',
          dateOfBirth: '1976-02-28T23:00:00.000Z',
          newsletterId: '5a1095859ed46a42ff652796'
        })
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST, done);
    });

  });

});
