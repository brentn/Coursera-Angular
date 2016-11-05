(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceHeader', {
    templateUrl:'src/invoice/templates/invoiceheader.template.html',
    controllerAs: 'invoice',
    bindings: {
      data: '<',
      balance: '<'
    }
  });
})();
