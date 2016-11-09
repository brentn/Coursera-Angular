(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSearchSection', {
    templateUrl: 'src/menu/section/search/menusearchsection.template.html',
    controller: 'MenuSearchSectionController as search',
    bindings: {
      title: '@',
      complete: '&'
    }
  })
})();
