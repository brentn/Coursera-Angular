(function() {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller:NarrowItDownDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function NarrowItDownDirectiveController() {
    var list = this;

    list.exists = function() {
      return list.foundItems!=='empty';
    }
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function(result) {
        var foundItems;
        if (searchTerm.length===0) {
          foundItems = [];
        } else {
          var foundItems = result.data.menu_items.filter(function(item) {
            return item.description.toLowerCase().indexOf(searchTerm.toLowerCase())>=0
          });
        }
        return foundItems;
      })
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.term = '';
    controller.found = 'empty';
    controller.search = function() {
      if (controller.term.length>0) {
        MenuSearchService.getMatchedMenuItems(controller.term)
        .then(function(result) {controller.found = result;});
      }
    }
    controller.remove = function(itemIndex) {
      controller.found.splice(itemIndex, 1);
    }

  }
})()
