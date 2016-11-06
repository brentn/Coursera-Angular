(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceHeader', {
    templateUrl:'src/invoice/templates/invoiceheader.template.html',
    controller: 'InvoiceHeaderController as invoice',
    bindings: {
      data: '<',
      balance: '<'
    }
  });
})();
