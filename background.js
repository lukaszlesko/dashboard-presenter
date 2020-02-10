'use strict';

chrome.runtime.onInstalled.addListener(function() {
  let currentIndex = -1;

  function magic() {
    chrome.storage.sync.get(['urls'], function(result) {
        let urls = result.urls.split("\n");
        if (!urls.length) {
            return;
        }

        // set next url to be loaded
        currentIndex++;
        currentIndex = currentIndex % urls.length;

        // load it
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.update(tabs[0].id, {url: urls[currentIndex]});
        });
    });
  }

  setInterval(() => {
    chrome.storage.sync.get(['reloadEnabled'], function(result) {
      if (result.reloadEnabled) {
        magic();
      }
    });

  }, 15000);
});
