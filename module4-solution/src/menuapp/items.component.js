(function() {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuapp/items.html',
    restrict: 'E',
    bindings: {
      items: '<'
    }
  });

})();
