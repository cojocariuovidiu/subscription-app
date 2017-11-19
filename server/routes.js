/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // api security middleware
  // Commented for tests to run (no time to add headers in tests),
  // uncomment to use it!
  // app.use('/api', require('./auth/auth-middleware'));

  // api routes
  app.use('/api', require('./routes/api'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
