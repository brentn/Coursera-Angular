(function() {
  'use strict';

  angular.module('Invoice')
  .component('invoiceImage', {
    template: "<img ng-src='{{image.src}}' class='{{image.class}}' alt='Invoice Image missing'/>",
    controller: 'InvoiceImageController as image',
    bindings: {
      id: '<'
    }
  })
})();
