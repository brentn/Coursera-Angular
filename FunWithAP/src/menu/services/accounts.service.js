(function() {
  'use strict';

  angular.module('MainMenu')
  .service('AccountsService', AccountsService);

  AccountsService.$inject = ['$q', '$timeout'];
  function AccountsService($q, $timeout) {
    var service = this;

    service.myAccounts = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve({data:['110100','110110','110120','110130']});
      }, 800);
      return deferred.promise;
    }
  }
})();
