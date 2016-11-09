(function() {
  'use strict';

  angular.module('AP')
  .service('VendorsService', VendorsService);

  VendorsService.$inject = ['$q', '$timeout']
  function VendorsService($q, $timeout) {
    var vendors = this;

    vendors.getAllVendors= function(company) {
      var deferred = $q.defer();
      deferred.resolve({data:[{VendorID:'VEN001',VendorIDAndName:'VEN001 - Vendor 1',VendorName:'Vendor 1',CurrencyID:'CAD'}]});
      return deferred.promise;
    }
  }

})();
