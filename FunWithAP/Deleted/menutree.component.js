(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuTree', {
    templateUrl: 'src/menu/templates/menutree.template.html',
    controller: 'MenuTreeController as tree',
    bindings: {
      title: '<',
      menuItems: '<'
    }
  })
})();
