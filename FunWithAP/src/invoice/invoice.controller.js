(function() {
  'use strict';

  angular.module('Invoice')
  .controller('InvoiceController', InvoiceController);

  InvoiceController.$inject = ['$scope', 'AccountsService'];
  function InvoiceController($scope, AccountsService) {
    var invoice = this;

    invoice.balance = 'loading...';

    AccountsService.accountBalance(invoice.data.CostCenter).then(function(response) {
      invoice.balance = response.data;
    });
  }
})();
