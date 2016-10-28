(function() {
  'use strict';

  angular.module('AP')
  .component('menuItem', {
    templateUrl: 'src/menu/templates/menuitem.template.html',
    controller: 'MenuItemController as item',
    bindings: {
      invoice: '<'
    }
  });

})();
