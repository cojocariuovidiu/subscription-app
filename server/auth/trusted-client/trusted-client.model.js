'use strict';

var mongoose = require('mongoose');

var TrustedClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  apiKey: {
    type: String,
    unique: true
  },
  apiSecret: {
    type: String,
    unique: true
  }
});

TrustedClientSchema.index({ apiKey: 1, isActive: 1 }, { unique: true });

module.exports = mongoose.model('TrustedClient', TrustedClientSchema);
