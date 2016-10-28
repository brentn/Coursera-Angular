(function() {
  'use strict';

  angular.module('AP')
  .controller('MainMenuController', MainMenuController);

  MainMenuController.$inject = ['InvoiceService', 'Status'];
  function MainMenuController(InvoiceService, Status) {
    var menu = this;
    var number_of_sections_loaded=0;
    menu.myDraftInvoices = [];
    menu.mySubmittedInvoices = [];
    menu.myProcessingInvoices = [];
    menu.myPayingInvoices = [];
    menu.myPaidInvoices = [];
    menu.myDeletedInvoices = [];

    menu.$onInit  = function() {
      console.debug("Looking up invoices...")
      InvoiceService.MyInvoices()
      .then(function(result) {
        menu.myDraftInvoices = getDraftInvoices(result.data);
        menu.mySubmittedInvoices = getSubmittedInvoices(result.data);
        menu.myProcessingInvoices = getProcessingInvoices(result.data);
        menu.myPayingInvoices = getPayingInvoices(result.data);
        menu.myPaidInvoices = getPaidInvoices(result.data);
        menu.myDeletedInvoices = getDeletedInvoices(result.data);
      });
    }

    menu.onSectionComplete = function() {
      number_of_sections_loaded++;
      if (number_of_sections_loaded==6) {
        $('#MainMenu').accordion({
          header: "menu-section>h3",
          navigate: false,
          heightStyle: 'fill'
        });
      }
    }

    function getDraftInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return invoice.Status==Status.DRAFT;
      })
    }

    function getSubmittedInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return (invoice.Status==Status.SUBMITTED
          || invoice.Status==Status.PENDINGDIRECTOR
          || invoice.Status==Status.PENDINGEDMS);
      })
    }

    function getProcessingInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return invoice.Status==Status.APPROVED;
      })
    }

    function getPayingInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return (invoice.Status==Status.PROCESSING
          || invoice.Status==Status.PENDINGDOWNLOAD
          || invoice.Status==Status.DOWNLOADFAILED);
      })
    }

    function getPaidInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return invoice.Status==Status.PAID;
      })
    }

    function getDeletedInvoices(invoices) {
      return invoices.filter(function(invoice) {
        return invoice.Status==Status.DELETED;
      })
    }
  };
})();
