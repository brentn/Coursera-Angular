(function() {
  'use strict';

  angular.module('MainMenu')
  .component('menuSubsection', {
    templateUrl: 'src/menu/templates/menusubsection.template.html',
    controllerAs: 'subsection',
    bindings: {
      title: '@',
      asTree: '@',
      menuItems: '<'
    }
  });
})();
