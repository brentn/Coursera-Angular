(function() {
  'use strict';

  angular.module('AP')
  .controller('MenuItemController', MenuItemController);

  MenuItemController.$inject = ['UserService'];
  function MenuItemController(UserService) {
    var item = this;

    item.getProfileImageUrl = function() {
      return UserService.ProfileImageUrl(item.invoice.UserId);
    }

    item.getVendorId = function() {
      return (item.invoice.VendorId||"Invoice")
    }
  }
})();
