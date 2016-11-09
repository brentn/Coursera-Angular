(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceLines', {
    templateUrl: 'src/invoice/details/lines/invoicelines.template.html',
    bindings: {
      lines: '<'
    }
  })
})();
