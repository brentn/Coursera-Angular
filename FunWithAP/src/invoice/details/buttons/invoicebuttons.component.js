(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceButtons', {
    templateUrl: 'src/invoice/details/buttons/invoicebuttons.template.html',
    controller: 'InvoiceController as invoice',
    bindings: {
      data: '<'
    }
  })
})();
