(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSection', {
    templateUrl: 'src/menu/templates/menusection.template.html',
    controller: 'MenuSectionController as section',
    bindings: {
      title: '@',
      menuItems: '<',
      subsections: '<',
      complete: '&'
    }
  })

})();
