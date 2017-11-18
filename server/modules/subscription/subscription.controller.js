'use strict';

exports.create = create;

function create(req, res, next) {
  console.log('subscription received:', req.body)
  res.sendStatus(204);
}
