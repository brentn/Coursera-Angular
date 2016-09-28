(function() {
"use strict;"

  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchMenu=""
    $scope.message="";
    $scope.setMessage = function() {
      if ($scope.lunchMenu.length===0) {
        $scope.message = "Please enter data first";
      } else if ($scope.lunchMenu.split(',').length < 4) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }
  };

})();
