(function() {
  'use strict';

  angular.module('MainMenu')
  .component('mainMenu', {
    templateUrl: 'src/menu/templates/mainmenu.template.html',
    controller: 'MainMenuController as menu'
  });

})();
