(function() {
  'use strict';

  angular.module('Invoice')
  .filter('balanceString', function () {
      return function(a){
          if (a.balance) {
            return 'Account balance: $'+a.balance
          } else if (a.budget) {
            return 'Budget surplus/deficit: $'+a.budget.surplus+' Income minus expenses: $'+a.budget.income-minus-expenses
          } else
            return ''
      };
  });
})();
