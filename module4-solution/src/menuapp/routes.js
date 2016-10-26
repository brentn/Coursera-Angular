(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      template: '<h2>Welcome to our Restaurant!</h2><br/><button ui-sref="categories">View Menu</button>'
    })
    .state('categories', {
      url: '/categories',
      template: "<categories categories='list.categories'></categories>",
      controller: 'CategoryController as list',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('categories.items', {
      url: '/{category}/items',
      template: "<items items='list.items'></items>",
      controller: "ItemController as list",
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    })
  }

})();
