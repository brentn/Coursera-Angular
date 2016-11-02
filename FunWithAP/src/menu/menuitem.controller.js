(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuItemController', MenuItemController);

  MenuItemController.$inject = ['MenuDataService', 'UserService'];
  function MenuItemController(MenuDataService, UserService) {
    var menuItem = this;

    menuItem.getProfileImageUrl = function() {
      return UserService.ProfileImageUrl(menuItem.obj.UserId);
    }

  }
})();
