(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['items'];
  function ItemController(items) {
    var controller = this;

    controller.items=items;
  };

})();
