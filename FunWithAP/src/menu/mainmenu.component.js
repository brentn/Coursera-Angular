(function() {
  'use strict';

  angular.module('AP')
  .component('mainMenu', {
    templateUrl: 'src/menu/templates/mainmenu.template.html',
    controller: 'MainMenuController as menu'
  });

})();
