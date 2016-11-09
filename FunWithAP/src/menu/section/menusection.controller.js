(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuSectionController', MenuSectionController);

  MenuSectionController.$inject = ['$scope']
  function MenuSectionController($scope) {
    var section = this
    section.subsectionsDisplayed = section.subsections
      && section.subsections
        .filter(function(subsection) {
            return subsection.items && subsection.items.length>0;
          }).length>0;

    section.$postLink = function() {
      $scope.$emit('menuSection.loaded')
    }
  }
})();
