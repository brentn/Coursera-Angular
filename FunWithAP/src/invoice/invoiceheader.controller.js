(function() {
  'use strict';

  angular.module('Invoice')
  .controller('InvoiceHeaderController', InvoiceHeaderController);

  InvoiceHeaderController.$inject = ['UserService'];
  function InvoiceHeaderController(UserService) {
    var header = this;

    header.profileImageUrl='';

    header.$onInit = function() {
      UserService.ProfileImageUrl(header.data.UserId).then(function(response) {
        header.profileImageUrl = response.data;
      })
    }
  }
})();
