'use strict';

var express = require('express');
var controller = require('../../modules/thing/thing.controller');

var router = express.Router();

router.get('/things/', controller.index);
router.get('/things/:id', controller.show);
router.post('/things/', controller.create);
router.put('/things/:id', controller.update);
router.patch('/things/:id', controller.update);
router.delete('/things/:id', controller.destroy);

module.exports = router;
