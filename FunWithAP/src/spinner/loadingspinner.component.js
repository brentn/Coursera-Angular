(function() {
  'use strict';

  angular.module('AP')
  .component('loadingSpinner', {
    templateUrl: 'src/spinner/loadingspinner.template.html',
    controller: SpinnerController
  })

  SpinnerController.$inject =['$rootScope'];
  function SpinnerController($rootScope) {
    var spinner=this;
    spinner.visible=false;

    $rootScope.$on('$stateChangeStart', function() {
      spinner.visible=true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      spinner.visible=false;
    });
    $rootScope.$on('$stateChangeError', function() {
      spinner.visible=false;
    });
  }
})();
