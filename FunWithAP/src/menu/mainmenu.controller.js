(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MainMenuController', MainMenuController);

  MainMenuController.$inject = ['InvoiceService', 'Status'];
  function MainMenuController(InvoiceService, Status) {
    var menu = this;
    var number_of_sections_loaded=0;
    menu.searchResults = [];
    menu.myDraftInvoices = [];
    menu.mySubmittedInvoices = [];
    menu.myProcessingInvoices = [];
    menu.myPayingInvoices = [];
    menu.myPaidInvoices = [];
    menu.myDeletedInvoices = [];
    menu.approvableTotal = 0;
    menu.myAccountsSubmitted = [];
    menu.myAccountsProcessing = [];
    menu.myAccountsPaying = [];
    menu.myAccountsPaid = [];

    menu.submittedSubsections = [];

    menu.$onInit  = function() {
      menu.refresh();
    }

    menu.refresh = function() {
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
      InvoiceService.MyApprovableInvoices()
      .then(function(result) {
        if (result.data.length>0) {

          menu.submittedSubsections.push({title: 'Awaiting my approval', menuItems:result.data})
          menu.approvableTotal=result.data.length;
        } else {
          menu.submittedSubsections = [];
          menu.approvableTotal=0;
        }
      })
      InvoiceService.InvoicesForMyAccounts()
      .then(function(result) {
        menu.myAccountsSubmitted = getSubmittedInvoices(result.data);
      })
    }

    menu.onSectionComplete = function() {
      number_of_sections_loaded++;
      if (number_of_sections_loaded==7) {
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
