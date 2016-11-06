(function() {
  'use strict';

  angular.module('Invoice')
  .filter('balanceString', function () {
      return function(a){
          if (a && a.balance) {
            return 'Account balance: $'+a.balance
          } else if (a && a.budget) {
            return 'Budget surplus/deficit: $'+a.budget.surplus+' Income minus expenses: $'+a.budget.income-minus-expenses
          } else
            return ''
      };
  });
})();
