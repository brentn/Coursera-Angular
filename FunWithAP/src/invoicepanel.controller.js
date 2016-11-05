(function() {
  'use strict';

  angular.module('AP')
  .controller('InvoicePanelController', InvoicePanelController);

  InvoicePanelController.$inject = ['data', 'lines'];
  function InvoicePanelController(data, lines) {
    var invoicePanel = this;

    invoicePanel.data = data.data;
    invoicePanel.lines = lines.data;
  }
})();
