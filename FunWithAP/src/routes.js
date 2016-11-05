(function () {
  'use strict';

  angular.module('AP')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html',
    })
    .state('home.invoice', {
      url: '/id/{InvoiceId}',
      templateUrl: "/src/templates/invoicepanel.template.html",
      controller: 'InvoicePanelController as invoicePanel',
      resolve: {
        data: ['InvoiceService', '$stateParams', function(InvoiceService, $stateParams) {
          return InvoiceService.getInvoice($stateParams.InvoiceId);
        }],
        lines: ['InvoiceService', '$stateParams', function(InvoiceService, $stateParams) {
          return InvoiceService.getInvoiceLines($stateParams.InvoiceId);
        }]
      }
    })
  };
})();
