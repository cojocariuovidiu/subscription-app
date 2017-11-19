/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import keygen from 'keygen';
import TrustedClient from '../auth/trusted-client/trusted-client.model';

TrustedClient.find({}).remove().exec()
  .then(() => {
    TrustedClient.create({
      name: 'Subscription SPA',
      description: 'This is the Subscriptions SPA from where we will be ' +
        'allowing people to subscribe to our newsletter',
      isActive: true,
      apiKey: '9cf09931e7cf2d7d36ad06',
      apiSecret: 'ead67e06054b717adb50899be53d3bb41f6452374820'
    });
  });
