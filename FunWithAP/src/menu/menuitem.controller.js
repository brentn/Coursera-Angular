(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuItemController', MenuItemController);

  MenuItemController.$inject = ['MenuDataService', 'UserService', '$rootScope'];
  function MenuItemController(MenuDataService, UserService, $rootScope) {
    var menuItem = this;

    menuItem.getProfileImageUrl = function() {
      return UserService.ProfileImageUrl(menuItem.obj.UserId);
    }

  }
})();
