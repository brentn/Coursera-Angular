(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSection', {
    templateUrl: 'src/menu/section/menusection.template.html',
    controller: 'MenuSectionController as section',
    bindings: {
      title: '<',
      items: '<',
      total: '<',
      subsections: '<',
    }
  })

})();
