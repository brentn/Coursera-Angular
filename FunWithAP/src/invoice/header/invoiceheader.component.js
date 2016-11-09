(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceHeader', {
    templateUrl:'src/invoice/header/invoiceheader.template.html',
    controller: 'InvoiceController as invoice',
    bindings: {
      data: '<',
      balance: '<'
    }
  });
})();
