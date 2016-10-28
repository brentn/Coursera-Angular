(function() {
  'use strict';

  angular.module('AP')
  .component('menuSection', {
    templateUrl: 'src/menu/templates/menusection.template.html',
    controller: 'MenuSectionController as section',
    bindings: {
      title: '@',
      invoices: '<',
      complete: '&'
    }
  })

})();
