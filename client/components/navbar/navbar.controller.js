'use strict';

class NavbarController {
  isCollapsed = true;
  //end-non-standard

  constructor() {
  }
}

angular.module('subscriptionApp')
  .controller('NavbarController', NavbarController);
