(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuSearchSectionController', MenuSearchSectionController);

  MenuSearchSectionController.$inject = ['MenuDataService']
  function MenuSearchSectionController(MenuDataService) {
    var search = this;

    search.term='';
    search.total='';
    search.results=[];

    search.search = function() {
      if (search.term.length==0) {
        search.results=[];
      } else {
        MenuDataService.search(search.term)
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
