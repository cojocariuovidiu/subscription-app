'use strict';

var Promise = require('bluebird');
var NonceModel = require('./model');

exports.store = store;
exports.getByKey = getByKey;

function store(key) {
  return new NonceModel({
      key: key
    }).save();
}

function getByKey(key) {
  return NonceModel.findOne({
      key: key
    }).exec();
}
