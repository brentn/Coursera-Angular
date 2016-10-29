(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuTree', {
    templateUrl: 'src/menu/templates/menutree.template.html',
    bindings: {
      title: '@',
      menuItems: '<'
    }
  })
})();
