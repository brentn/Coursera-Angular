(function() {
  'use strict';

  angular.module('MainMenu')
  .service('UserService', UserService);

  function UserService() {
    var user=this;

    user.getUsername = function(userId) {
      switch (userId) {
        case 2:return 'jasonb'; break;
        case 3:return 'brentn'; break;
        default: return '';
      }
    }

    user.ProfileImageUrl = function(userId) {
      return "https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username="
        + user.getUsername(userId);
    }
  }
})();
