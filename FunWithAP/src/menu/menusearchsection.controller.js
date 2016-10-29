(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuSearchSectionController', MenuSearchSectionController);

  MenuSearchSectionController.$inject = ['InvoiceService']
  function MenuSearchSectionController(InvoiceService) {
    var search = this;

    search.term='';
    search.total='';
    search.results=[];

    search.search = function() {
      if (search.term.length==0) {
        search.results=[];
      } else {
        InvoiceService.search(search.term)
        .then(function(result) {
          search.results=result.data;
          search.total=result.data.length;
          if (search.total===0) {
            search.total='';
          }
        })
      }
    }

    search.$postLink = function() {
      search.complete();
    }
  }
})();
