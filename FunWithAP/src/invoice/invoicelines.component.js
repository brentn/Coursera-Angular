(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceLines', {
    templateUrl: 'src/invoice/templates/invoicelines.template.html',
    bindings: {
      lines: '<'
    }
  })
})();
