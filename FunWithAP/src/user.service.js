(function() {
  'use strict';

  angular.module('AP')
  .service('UserService', UserService);

  function UserService() {
    var user=this;

    user.getUsername = function(userId) {
      return 'jasonb';
    }

    user.ProfileImageUrl = function(userId) {
      return "https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username="
        + user.getUsername(userId);
    }
  }
})();
