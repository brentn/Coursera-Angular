(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuItemController', MenuItemController);

  MenuItemController.$inject = ['UserService'];
  function MenuItemController(UserService) {
    var menuItem = this;

    menuItem.getProfileImageUrl = function() {
      return UserService.ProfileImageUrl(menuItem.obj.UserId);
    }

  }
})();
