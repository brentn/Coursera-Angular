(function() {
  'use strict';

  angular.module('AP')
  .controller('MenuSectionController', MenuSectionController);

  function MenuSectionController() {
    var section = this

    section.$postLink = function() {
      section.complete();
    }
  }
})();
