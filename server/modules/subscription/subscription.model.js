'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var MIN_AGE = require('./../../config/environment').subscriptionSettings.minAge;

var SubscriptionSchema = new mongoose.Schema({
  newsletterId: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /\S+@\S+/
  },
  firstName: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (dateOfBirth) {
        var today = moment().startOf('day');
        var age = today.diff(moment(dateOfBirth), 'years')
        return age >= MIN_AGE;
      },
      message: 'Should be +' + MIN_AGE + ' years old to subscribe.'
    }
  },
  gender: {
    type: String,
    enum: [ 'male', 'female' ]
  }
});

SubscriptionSchema.index({ newsletterId: 1, email: 1  }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
