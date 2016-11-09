describe("MenuItemController", function() {
  var url = "THIS/is/my/Url";

  beforeEach(function() {
    module(function($provide) {
      $provide.service('UserServiceMock', function() {
        var service=this;
        service.getProfileImageUrl = function() {
          return $q.when(url);
        };
      });
    });
    module('MainMenu');
  });

  describe('profileImageUrl', function() {
    var $controller;
    var menuItemController;

    beforeEach(inject(function(_$controller_, UserServiceMock) {
      $controller = _$controller_;

      menuItemController = $controller('MenuItemController',
        {MenuDataService: null, UserService: UserServiceMock});
      menuItemController.obj = {};
    }));

    it('should provide imageUrl from UserService', function() {
      expect(menuItemController.profileImageUrl).toEqual(url);
    });
  });
})
