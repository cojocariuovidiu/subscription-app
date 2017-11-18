'use strict';

var mongoose = require('mongoose');

var SubscriptionSchema = new mongoose.Schema({
  newsletterId: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: [ 'male', 'female' ]
  }
});

SubscriptionSchema.index({ newsletterId: 1, email: 1  }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
