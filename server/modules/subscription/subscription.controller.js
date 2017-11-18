'use strict';

var subscriptionService = require('./subscription.service');

exports.create = create;

function create(req, res, next) {
  subscriptionService.create(req.body);
  res.sendStatus(204);
}
