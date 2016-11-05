(function() {
  'use strict';

  angular.module('Invoice')
  .filter('statusName', function () {
      return function(a){
          switch (a) {
            case 0: return 'Draft';
            case 1: return 'Pending Approval';
            case 2: return 'Pending Director Approval';
            case 3: return 'Pending EDMS Approval';
            case 4: return 'Processing';
            case 5: return 'Paying';
            case 6: return 'Deleted';
            case 8: return 'Paid';
            case 10: return 'Pending Download';
            case 20: return 'Download Failed';
            default: return 'UNKNOWN';
          }
      };
  });
})();
