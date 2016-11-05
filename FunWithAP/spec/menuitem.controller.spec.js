describe("MenuItemController", function() {
  var url = "THIS/is/my/Url";

  beforeEach(function() {
    module(function($provide) {
      $provide.service('UserServiceMock', function() {
        var service=this;
        service.ProfileImageUrl = function() {
          return url
        };
      });
    });
    module('MainMenu');
  });

  describe('getProfileImageUrl', function() {
    var $controller;
    var menuItemController;

    beforeEach(inject(function(_$controller_, UserServiceMock) {
      $controller = _$controller_;

      menuItemController = $controller('MenuItemController',
        {MenuDataService: null, UserService: UserServiceMock});
      menuItemController.obj = {};
    }))

    it('should provide imageUrl from UserService', function() {
      expect(menuItemController.getProfileImageUrl()).toBe(url);
    })
  })
})
