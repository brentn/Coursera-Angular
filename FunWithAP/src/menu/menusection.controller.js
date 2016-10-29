(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuSectionController', MenuSectionController);

  function MenuSectionController() {
    var section = this

    section.$postLink = function() {
      section.complete();
    }
  }
})();
