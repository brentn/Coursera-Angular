(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuItemController', MenuItemController);

  MenuItemController.$inject = ['UserService'];
  function MenuItemController(UserService) {
    var menuItem = this;

    menuItem.profileImageUrl='';

    menuItem.$onInit = function() {
      UserService.getProfileImageUrl(menuItem.obj.UserId).then(function(response) {
        menuItem.profileImageUrl=response.data;
      });
    }

  }
})();
