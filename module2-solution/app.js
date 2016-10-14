(function() {
  "use strict;"

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService );

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    ShoppingListCheckOffService.addItem('cookies','2 bags');
    ShoppingListCheckOffService.addItem('camels','4 herds');
    ShoppingListCheckOffService.addItem('fairy dust','1 lb')

    toBuy.buy = ShoppingListCheckOffService.buy;
    toBuy.list = ShoppingListCheckOffService.getItemsToBuy();
    }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.list = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var tobuy = [];
    var bought = []

    service.addItem = function(name, qty) {
      var item = {
        name: name,
        qty: qty,
      }
      tobuy.push(item);
    }

    service.buy = function(index) {
      bought.push(tobuy[index]);
      tobuy.splice(index, 1)
    }

    service.getItemsToBuy = function() {
      return tobuy;
    }

    service.getBoughtItems = function() {
      return bought;
    }

  }
})();
