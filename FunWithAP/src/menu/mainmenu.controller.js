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

    menu.submittedSubsections = [];
    menu.processingSubsections = [];
    menu.payingSubsections = [];
    menu.paidSubsections = [];

    menu.$onInit  = function() {
      menu.refresh();
    }

    menu.refresh = function() {

      InvoiceService.MyInvoices()
      .then(function(result) {
        menu.myDraftInvoices = getDraftInvoices(result.data);
        menu.mySubmittedInvoices = getSubmittedInvoices(result.data);
        menu.myProcessingInvoices = getProcessingInvoices(result.data);
        menu.myPayingInvoices = getPayingInvoices(result.data);
        menu.myPaidInvoices = getPaidInvoices(result.data);
        menu.myDeletedInvoices = getDeletedInvoices(result.data);
      });

      menu.submittedSubsections = [];
      menu.processingSubsections = [];
      menu.payingSubsections = [];
      menu.paidSubsections = [];

      // Look up extra sections in order they should appear
      InvoiceService.MyApprovableInvoices()
      .then(function(result) {
        if (result.data.length>0) {
          menu.submittedSubsections.push({title: 'Awaiting my approval', asTree: false, menuItems:result.data})
          menu.approvableTotal=result.data.length;
        } else {
          menu.submittedSubsections = [];
          menu.approvableTotal=0;
        }
        InvoiceService.InvoicesForMyAccounts()
        .then(function(result) {
          var myAccountsSubmitted = getSubmittedInvoices(result.data);
          if (myAccountsSubmitted.length>0) {
            menu.submittedSubsections.push({title: 'My Accounts', asTree: true, menuItems:myAccountsSubmitted})
          }
          var myAccountsProcessing = getProcessingInvoices(result.data);
          if (myAccountsProcessing.length>0) {
            menu.processingSubsections.push({title: 'My Accounts', asTree: true, menuItems:myAccountsProcessing})
          }
          var myAccountsPaying = getPayingInvoices(result.data);
          if (myAccountsPaying.length>0) {
            menu.payingSubsections.push({title: 'My Accounts', asTree: true, menuItems:myAccountsPaying})
          }
          var myAccountsPaid = getPaidInvoices(result.data);
          if (myAccountsPaid.length>0) {
            menu.paidSubsections.push({title: 'My Accounts', asTree: true, menuItems:myAccountsPaid})
          }
        })
      })
    }

    menu.onSectionComplete = function() {
      number_of_sections_loaded++;
      if (number_of_sections_loaded==7) {
        $('#MainMenu').accordion({
          header: "menu-section>h3,menu-search-section>h3",
          navigate: false,
          heightStyle: 'fill'
        });
      }
    }

    // Private Methods

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
