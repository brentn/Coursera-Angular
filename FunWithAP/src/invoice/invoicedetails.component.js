(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceDetails', {
    templateUrl: 'src/invoice/templates/invoicedetails.template.html',
    controller: 'InvoiceDetailsController as invoice',
    bindings: {
      data: '<',
      lines: '<'
    }
  })
})();
