(function() {
  'use strict';

  angular.module('AP')
  .service('UserService', UserService)
  .constant('ApiBasePath', 'https://...');

  UserService.$inject = ['$q', '$timeout'];
  function UserService($q, $timeout) {
    var user=this;
    var displayNameCache={};
    var usernameCache={};

    // Current User
    user.currentUserId = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve({data:3});
      },1000);
      return deferred.promise;
    }

    user.currentUserIsFinance = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve({data:true});
      }, 600);
      return deferred.promise;
    }

    // Functions that require userid
    user.getUsername = function(userId) {
      var deferred = $q.defer();
      if (usernameCache[userId]) {
        deferred.resolve(usernameCache[userId]);
      } else {
        $timeout(function() {
          switch (userId) {
            case 2:usernameCache[userId]={data:'jasonb'}; break;
            case 3:usernameCache[userId]={data:'brentn'}; break;
            default: deferred.resolve({data:''});
          }
          deferred.resolve(usernameCache[userId]);
        }, 500);
      }
      return deferred.promise;
    }

    user.getDisplayname = function(userId) {
      var deferred = $q.defer();
      if (displayNameCache[userId]) {
        deferred.resolve(displayNameCache[userId]);
      } else {
        $timeout(function() {
          switch (userId) {
            case 2:displayNameCache[userId]={data:'Jason Brink'}; break;
            case 3:displayNameCache[userId]={data:'Brent Nesbitt'}; break;
            default: deferred.resolve({data:''});
          }
          deferred.resolve(displayNameCache[userId]);
        }, 700);
      }
      return deferred.promise;
    }

    user.getProfileImageUrl = function(userId) {
      var baseUrl="https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username=";
      var deferred = $q.defer();
      user.getUsername(userId).then(function(result) {
        deferred.resolve({data:baseUrl + result.data});
      });
      return deferred.promise;
    }
  }
})();
