describe('UserService', function() {
  var userService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function() {
    module('AP');
    inject(function ($injector) {
      userService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    })
  })
  describe('currentUser()', function() {

  });
  describe('currentUserIsFinance()', function() {

  });
  describe('getUsername(userId)', function() {
    it('should return a promise', function() {
      expect(userService.getUserName(1)).not.toBeNull();
      expect(isFunction(userService.getUserName(1).then)).toBe(true);
    })
    it('should handle null userId', function() {
      expect(userService.getUserName()).not.toBeNull();
      expect(isFunction(userService.getUserName()).then).toBe(true);
    })
    it('should provide empty string if userId is unknown', function() {
      
    })
    it('should provide correct username', function() {
      var userid=2424;
      var username='TestUserName';
      $httpBackend.whenGET(ApiBasePath + '/Users/' + userid).respond({username:username});
      userService.getUsername(userid).then(function(response) {
        expect(response.data).toHaveProp('username',username);
      });
      $httpBackend.flush();
    })
  })
  describe('getDisplayname(userid)', function() {

  });
  describe('getProfileImageUrl(userid)', function() {

  });
})
