(function() {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function() {
      var promise = $http({
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
      });
      return promise;
    };

    service.getItemsForCategory = function(categoryShortName) {
      var url =  'https://davids-restaurant.herokuapp.com/menu_items.json?category='+categoryShortName;
      var promise = $http({
        url: url
      });
      return promise;
    };
  }
})();
