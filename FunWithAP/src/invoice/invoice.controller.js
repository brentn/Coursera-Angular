(function() {
  'use strict';

  angular.module('Invoice')
  .controller('InvoiceController', InvoiceController);

  InvoiceController.$inject = ['$scope', 'UserService', 'AccountsService', 'InvoiceService'];
  function InvoiceController($scope, UserService, AccountsService, InvoiceService) {
    var invoice = this;

    invoice.isOwner=false;
    invoice.isApprover=false;
    invoice.isFinance=false;

    //values that need to be looked up
    invoice.profileImageUrl='images/person.png';
    invoice.submitterName = '';
    invoice.submittedDate = '';
    invoice.approverName = '';
    invoice.processorName = '';

    //basic values
    invoice.costCenter=invoice.data.CostCenter;
    invoice.vendorId=invoice.data.VendorId;
    invoice.invoiceDate=new Date(invoice.data.InvoiceDate);
    invoice.invoiceNumber=invoice.data.InvoiceNumber;
    invoice.comments=invoice.data.Comments;
    invoice.apprComments=invoice.data.ApprComments;
    invoice.acctComments=invoice.data.AcctComments;

    invoice.balance = 'loading...';

    invoice.isInSubmittableState = InvoiceService.isInSubmittableState(invoice.data);


    invoice.$onInit = function() {
      UserService.getProfileImageUrl(invoice.data.UserId).then(function(response) {
        invoice.profileImageUrl = response.data;
      })
      UserService.currentUserId().then(function(response) {
        invoice.isOwner=(response.data==invoice.data.UserId);
      });
      UserService.currentUserIsFinance().then(function(response) {
        invoice.isFinance = response.data;
      })
      AccountsService.accountBalance(invoice.data.CostCenter).then(function(response) {
        invoice.balance = response.data;
      });
      if (InvoiceService.hasBeenSubmitted(invoice.data)) {
        invoice.submittedDate = InvoiceService.hasBeenSubmitted(invoice.data)
                                ?invoice.data.SubmittedDate:'';
        UserService.getDisplayname(invoice.data.UserId).then(function(response) {
          invoice.submitterName = response.data;
        });
        UserService.getDisplayname(invoice.data.ApprUserId).then(function(response) {
          invoice.approverName = response.data;
        });
        UserService.getDisplayname(invoice.data.ProcUserId).then(function(response) {
          invoice.processorName = response.data;
        });
      }
    }
  }
})();
