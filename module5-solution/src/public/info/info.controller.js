(function() {
  'use strict';

  angular.module('public')
  .controller('InfoController', InfoController);

  InfoController.$inject = ['$http', 'UserService', 'ApiPath'];
  function InfoController($http, UserService, ApiPath) {
    var info = this;

    info.user;
    info.favDish;

    info.$onInit = function() {
      info.user = UserService.getUser();
      $http.get(ApiPath + '/menu_items/' + info.user.favDish + '.json').then(function(response) {
        info.favDish = response.data;
        info.favDish.image = ApiPath + '/images/'+response.data.short_name+'.jpg';
      })
    }
  }
})();
