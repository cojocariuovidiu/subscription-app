'use strict';

var mongoose = require('mongoose');

var NonceSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    index: true
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    expires: '48h'
  }
});

module.exports = mongoose.model('Nonce', NonceSchema);
