(function() {
  'use strict';

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$http', 'UserService', 'ApiPath']
  function SignupController($http, UserService, ApiPath) {
    var signup = this;

    signup.user = {
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      favDish:''
    }

    signup.dishExists = true;
    signup.saved=false;

    signup.go = function() {
      $http.get(ApiPath + '/menu_items/'+ signup.user.favDish + '.json')
      .then(function(response) {
              signup.dishExists=true;
              UserService.saveUser(signup.user);
              signup.saved=true;
            },
            function(response) {
              signup.dishExists=false;
            })
    }

  }
})();
