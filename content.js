(function() {
  document.addEventListener('mouseup', function() {
    var regexp = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    var port = chrome.runtime.connect();

    return function() {
      var selection = window.getSelection().toString().trim();

      if (regexp.test(selection)) {
        // create
        port.postMessage({
          action: 'create'
        });
      }
      else {
        // remove
        port.postMessage({
          action: 'remove'
        });
      }
    };
  }());
})();