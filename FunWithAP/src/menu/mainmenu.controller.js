(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MainMenuController', MainMenuController);

  MainMenuController.$inject = ['$scope', 'MenuDataService'];
  function MainMenuController($scope, MenuDataService) {
    var menu = this;
    var number_of_sections_loaded=0;
    menu.data = [];
    menu.searchResults = [];

    menu.$onInit  = function() {
      menu.refresh();
    }

    menu.refresh = function() {
      MenuDataService.Reload()
      .then(function() {
        menu.data = MenuDataService.MenuData;
      });
      menu.flags = MenuDataService.userFlags;
    }

    $scope.$on('menuSection.loaded', function() {
      // only initialize the accordion after all sections have been rendered
      number_of_sections_loaded++;
      if (number_of_sections_loaded==menu.data.sections.length) {
        $('#MainMenu').accordion({
          header: "menu-section>h3,menu-search-section>h3",
          navigate: false,
          heightStyle: 'fill'
        });
      }
    });
  };
})();
