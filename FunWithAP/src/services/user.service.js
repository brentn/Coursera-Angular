(function() {
  'use strict';

  angular.module('MainMenu')
  .service('UserService', UserService);

  UserService.$inject = ['$q', '$timeout'];
  function UserService($q, $timeout) {
    var user=this;
    var displayNameCache={};
    var imageUrlCache={};

    user.getUsername = function(userId) {
      var deferred = $q.defer();
      $timeout(function() {
        switch (userId) {
          case 2:deferred.resolve({data:'jasonb'}); break;
          case 3:deferred.resolve({data:'brentn'}); break;
          default: deferred.resolve({data:''});
        }
      }, 500);
      return deferred.promise;
    }

    user.getDisplayname = function(userId) {
      var deferred = $q.defer();
      if (! displayNameCache[userId]) {
        $timout(function() {
          switch (userId) {
            case 2:displayNameCache[userId]={data:'Jason Brink'}; break;
            case 3:displayNameCache[userId]={data:'Brent Nesbitt'}; break;
          }
          deferred.resolve(displayNameCache[userId]);
        }, 700);
      }
      return deferred.promise;
    }

    user.currentUserIsFinance = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(true);
      }, 600);
      return deferred.promise;
    }

    user.ProfileImageUrl = function(userId) {
      var baseUrl="https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username=";
      var deferred = $q.defer();
      if (imageUrlCache[userId]) {
          deferred.resolve({data:baseUrl+imageUrlCache[userId]});
      } else {
        user.getUsername(userId).then(function(result) {
          imageUrlCache[userId] = result.data;
          deferred.resolve({data:baseUrl + imageUrlCache[userId]});
        });
      }
      return deferred.promise;
    }
  }
})();
