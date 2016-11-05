(function() {
  'use strict';

  angular.module('Invoice')
  .filter('zeroPad', function () {
      return function(a,b){
          return(1e4+""+a).slice(-b);
      };
  });
})();
