(function() {
  var id = 'iplookup';
  var hasMenu = false;
  var ipLookupHandler = function(info, tab) {
    var ip = info.selectionText;
    var index = tab.index + 1;

    chrome.tabs.create({
      index: index,
      url: "http://www.ip138.com/ips138.asp?ip=" + ip
    });
  };

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      var action = msg.action;

      if (action === 'create' && !hasMenu) {
        chrome.contextMenus.create({
          id: id,
          title: 'IP Lookup %s',
          contexts: ["selection"],
          onclick: ipLookupHandler
        }, function() {
          hasMenu = true;
        });
      }
      else if (action === 'remove' && hasMenu) {
        chrome.contextMenus.remove(id, function() {
          hasMenu = false;
        });
      }
    });
  });
})();