(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceDetails', {
    templateUrl: 'src/invoice/details/invoicedetails.template.html',
    controller: 'InvoiceController as invoice',
    bindings: {
      data: '<',
      lines: '<'
    }
  })
})();
