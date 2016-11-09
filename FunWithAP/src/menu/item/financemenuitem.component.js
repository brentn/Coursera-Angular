(function() {
  'use strict';

  angular.module('MainMenu')
  .component('financeMenuItem', {
    templateUrl: 'src/menu/item/financemenuitem.template.html',
    bindings: {
      obj: '<'
    }
  })
})();
