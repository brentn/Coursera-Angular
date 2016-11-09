(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoice', {
    templateUrl: 'src/invoice/invoice.template.html',
    controller: 'InvoiceController as invoice',
    bindings: {
      data: '<',
      lines: '<'
    }
  })
})();
