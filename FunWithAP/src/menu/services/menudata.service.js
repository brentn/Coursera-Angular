(function() {
  'use strict';

  angular.module('MainMenu')
  .service('MenuDataService', MenuDataService)

  MenuDataService.$inject = ['$q', '$filter', 'InvoiceService', 'AccountsService', 'UserService'];
  function MenuDataService($q, $filter, InvoiceService, AccountsService, UserService) {
    var service=this;

    service.MenuData = {
      userFlags:'',
      sections: [{
        title:'Drafts',
      },{
        title:'Submitted',
        subsections: [{
          title:'Awaiting my approval'
        },{
          title:'Finance'
        },{
          title:'My Accounts',
        }]
      },{
        title:'Processing',
        subsections: [{
          title:'Finance'
        },{
          title:'My Accounts'
        }]
      },{
        title:'Paying',
        subsections: [{
          title:'Finance'
        },{
          title:'My Accounts'
        }]
      },{
        title:'Paid',
        subsections: [{
          title:'Finance'
        },{
          title:'My Accounts'
        }]
      },{
        title:'Deleted'
      }]
    };

    service.Reload = function() {
      service.MenuData.userFlags='';
      return $q.all([
        service.LoadMyItems(),
        service.LoadMyApprovableItems(),
        service.LoadItemsIOversee(),
        service.LoadFinanceItems()
      ]);
    }

    service.LoadFinanceItems = function() {
      // returns a tree of all menu items, for someone like Finance to see.
      UserService.currentUserIsFinance().then(function(response) {
        if (response.data===true) {
          service.MenuData.userFlags = '[Finance] '+service.MenuData.userFlags;
          return InvoiceService.getAllInvoices()
          .then(function(result) {
            var items=[];
            var submitted = InvoiceService.getSubmittedInvoices(result.data);
            service.MenuData.sections[1].subsections[1].title='All Items ('+submitted.length+')';
            service.MenuData.sections[1].subsections[1].items=buildTree(submitted);
            var finance = InvoiceService.getProcessingInvoices(result.data);
            service.MenuData.sections[2].subsections[0].title='Finance';
            service.MenuData.sections[2].subsections[0].items=buildFinanceTree(finance);
            var paying = InvoiceService.getPayingInvoices(result.data);
            service.MenuData.sections[3].subsections[0].title='All Items ('+paying.length+')';
            service.MenuData.sections[3].subsections[0].items=buildTree(paying);
            setTotal(service.MenuData.sections[3], paying.length);
            var paid = InvoiceService.getPaidInvoices(result.data);
            service.MenuData.sections[4].subsections[0].title='All Items ('+paid.length+')';
            service.MenuData.sections[4].subsections[0].items=buildTree(paid);
          });
        }
      });
    };

    service.LoadMyItems = function() {
      // returns a flat list of all menu items belonging to the current user
      return InvoiceService.getMyInvoices()
      .then(function(result) {
        service.MenuData.sections[0].items = InvoiceService.getDraftInvoices(result.data);
        service.MenuData.sections[1].items = InvoiceService.getSubmittedInvoices(result.data);
        service.MenuData.sections[2].items = InvoiceService.getProcessingInvoices(result.data);
        service.MenuData.sections[3].items = InvoiceService.getPayingInvoices(result.data);
        service.MenuData.sections[4].items = InvoiceService.getPaidInvoices(result.data);
        service.MenuData.sections[5].items = InvoiceService.getDeletedInvoices(result.data);
      });
    }

    service.LoadMyApprovableItems = function() {
      // returns a flat list of menu items which are currently in a state that require the current user to approve them
      return InvoiceService.getInvoicesAwaitingMyApproval()
      .then(function(result) {
        setTotal(service.MenuData.sections[1], result.data.length);
        service.MenuData.sections[1].subsections[0].items = result.data;
      });
    }

    service.LoadItemsIOversee = function() {
      // returns a tree of menu items, separated by account/user/etc for which I am responsible
      AccountsService.myAccounts().then(function(result) {
        if (result.data.length>0) {
          service.MenuData.userFlags += ' [Signing authority]';
          return InvoiceService.getInvoicesForMyAccounts()
          .then(function(result) {
            service.MenuData.sections[1].subsections[2].items = [];
            service.MenuData.sections[2].subsections[1].items = [];
            service.MenuData.sections[3].subsections[1].items = [];
            service.MenuData.sections[4].subsections[1].items = [];
            for (var i in result.data) {
              var item = result.data[i];
              addIfFound(item.title, InvoiceService.getSubmittedInvoices(item.items),
                service.MenuData.sections[1].subsections[2].items);
              addIfFound(item.title, InvoiceService.getProcessingInvoices(item.items),
                service.MenuData.sections[2].subsections[1].items);
              addIfFound(item.title, InvoiceService.getPayingInvoices(item.items),
                service.MenuData.sections[3].subsections[1].items);
              addIfFound(item.title, InvoiceService.getPaidInvoices(item.items),
                service.MenuData.sections[4].subsections[1].items);
            }
          }
        )};
      })

      function addIfFound(account, items, list) {
        if (items.length>0) {
          list.push({title:account, items:items});
        }
      }
    }

    service.search = function(term) {
      return InvoiceService.search(term);
    }

    // Private Methods

    function setTotal(obj, total) {
      if (total===0) {
        delete obj.total;
      } else {
        obj.total=total;
      }
    }

    function buildTree(items) {
      var result = [];
      var sortedItems = $filter('orderBy')(items, 'VendorId');
      for (var i in  sortedItems) {
        var item = sortedItems[i];
        var vendor = item.VendorId||'_NO VENDOR_';
        var letter = vendor[0].toUpperCase();
        var letterNode = result.filter(function(node) {return node.title==letter});
        if (letterNode.length===0) {
          letterNode = {title:letter, items:[]};
          result.push(letterNode);
        } else {
          letterNode=letterNode[0];
        }
        var vendorNode = letterNode.items.filter(function(node) {return node.title==vendor});
        if (vendorNode.length===0) {
          vendorNode = {title:vendor, items:[]}
          letterNode.items.push(vendorNode);
        } else {
          vendorNode=vendorNode[0];
        }
        vendorNode.items.push(item);
      }
      return result;
    }

    function buildFinanceTree(items) {
      var result = [];
      var companies = ['PTC', 'GAiN'];
      var payment_methods = ['Chq/EFT', 'Wire Transfer', 'Amex'];
      for (var i in companies) {
        for (var j in payment_methods) {
          result.push({title:companies[i]+' ('+payment_methods[j]+')', items:[]});
        }
      }
      result.push({title:'Pending Import', items:[]})
      var sortedItems = $filter('orderBy')(items, 'InvoiceDate');
      for (var i in sortedItems) {
        var item = sortedItems[i];
        var index = 0
        if (InvoiceService.isDownloading(item)) {
          index = companies.length*payment_methods.length;
        } else {
          index = (companies.indexOf(item.Company)*payment_methods.length)
          + payment_methods.indexOf(item.PaymentMethod||'Chq/EFT');
        }
        result[index].items.push(item);
      }
      // update totals
      var total=0;
      for (var i in result) {
        result[i].title += ' ('+result[i].items.length+')'
        total += result[i].items.length;
      }
      setTotal(service.MenuData.sections[2], total);
      return result;
    }
  }
})();
