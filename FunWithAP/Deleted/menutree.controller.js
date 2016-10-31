(function() {
  'use strict';

  angular.module('MainMenu')
  .controller('MenuTreeController', MenuTreeController);

  function MenuTreeController() {
      var tree = this;


      tree.$postLink = function() {
        var data = buildTree(tree.menuItems);
        $('#tree').treeview({'data': data});
      }

      function buildTree(items) {
        var result = [];
        for (var i in items) {
          var accounts = result.filter(function(item) {return item.text==items[i].CostCenter});
          if (accounts.length==0) {
            accounts=[{'text':items[i].CostCenter, 'nodes':[], 'selectable':false}];
            result.push(accounts[0]);
          }
          accounts[0].nodes.push({'text':items[i].VendorId||'Invoice'});
        }
        return result;
      }
  }

})();
