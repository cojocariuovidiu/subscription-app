'use strict';

var express = require('express');
var subscriptionController = require('../../modules/subscription/subscription.controller');

var router = express.Router();

router.post('/subscriptions', subscriptionController.create);

module.exports = router;
