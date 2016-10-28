(function() {
  'use strict';

  var app = angular.module('AP', ['ui.router']);

  app.constant('Status', {
    DRAFT: 0,
    SUBMITTED: 1,
    PENDINGDIRECTOR: 2,
    PENDINGEDMS: 3,
    APPROVED: 4,
    PROCESSING: 5,
    PENDINGDOWNLOAD: 10,
    DOWNLOADFAILED: 20,
    PAID: 8,
    DELETED: 6
  })

})();
