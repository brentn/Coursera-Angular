(function() {
  "use strict;"

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService );

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var items = [];

    service.addItem = function(name, qty) {
      var item = {
        name: name,
        qty: qty,
        bought: false
      }
      items.push(item);
    }

    service.getItemsToBuy = function() {
      return items.filter(function(item) {!item.bought});
    }

    service.getBoughtItems = function() {
      return items.filter(function(item) {item.bought});
    }

  }
})
