(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['categories'];
  function CategoryController(categories) {
    var controller = this;

    controller.categories=categories;
  };

})();
