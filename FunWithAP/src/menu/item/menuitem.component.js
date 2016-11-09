(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuItem', {
    templateUrl: 'src/menu/item/menuitem.template.html',
    controller: 'MenuItemController as menuItem',
    bindings: {
      obj: '<'
    }
  });

})();
