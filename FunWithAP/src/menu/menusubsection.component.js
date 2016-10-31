(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSubsection', {
    templateUrl: 'src/menu/templates/menusubsection.template.html',
    controller: 'MenuSubsectionController as subsection',
    bindings: {
      title: '<',
      items: '<',
      level: '@'
    }
  });
})();
