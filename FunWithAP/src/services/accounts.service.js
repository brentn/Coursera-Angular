(function() {
  'use strict';

  angular.module('AP')
  .service('AccountsService', AccountsService);

  AccountsService.$inject = ['$q', '$timeout'];
  function AccountsService($q, $timeout) {
    var service = this;

    service.allAccounts = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve({data:[{account:'110100',name:'AIA Account'},{account:'110110',name:'FamilyLife account'},{account:'110140',name:'IT Account'}]})
      },600);
      return deferred.promise;
    }

    service.myAccounts = function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve({data:['110100','110110','110120','110130']});
      }, 800);
      return deferred.promise;
    }

    service.accountBalance = function(account) {
      var deferred = $q.defer();
      if (account && account.length>0) {
        $timeout(function() {
          deferred.resolve({data:{balance:'304.32'}});
        }, 500);
      } else {
        $timeout(function() {
          deferred.resolve({data:{}});
        }, 500);
      }
      return deferred.promise;
    }

  }
})();
