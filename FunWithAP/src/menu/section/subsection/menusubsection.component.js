(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSubsection', {
    templateUrl: 'src/menu/section/subsection/menusubsection.template.html',
    controller: 'MenuSubsectionController as subsection',
    bindings: {
      title: '<',
      items: '<',
      template: '<',
      level: '@'
    }
  });
})();
