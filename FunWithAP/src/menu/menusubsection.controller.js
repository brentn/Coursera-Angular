(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuSubsectionController', MenuSubsectionController);

  function MenuSubsectionController() {
    var subsection=this;

    subsection.expand = function($event) {
      $($event.currentTarget).siblings().toggle(200);
    }
  }
})();
