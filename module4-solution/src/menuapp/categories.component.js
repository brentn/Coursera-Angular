(function() {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/menuapp/categories.html',
    restrict: 'E',
    bindings: {
      categories: '<'
    }
  });

})();
