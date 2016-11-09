(function() {
  'use strict';

  angular.module('Invoice')
  .controller('InvoiceImageController', InvoiceImageController);

  InvoiceImageController.$inject = ['InvoiceService']
  function InvoiceImageController(InvoiceService) {
    var image = this;

    image.src = '';
    image.class = '';

    image.$onInit = function() {
      InvoiceService.getInvoiceImages(image.id).then(function(response) {
        if (response.data.length>1) {
          image.src='images/multi.png';
        } else if (response.data.length==1) {
          if (response.data[0].type=='pdf') {
            image.src='images/pdf.png';
          } else {
            //TODO: image.src=actual image
          }
        } else {
          image.class='missing';
        }
      });
    }
  }
})();
