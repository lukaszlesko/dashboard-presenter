'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({refreshInterval: 15000});
  chrome.storage.sync.set({reloadEnabled: 0});

  let currentIndex = -1;
  let mainThreadInterval;

  function magic(tabIndex) {
    chrome.storage.sync.get(['urls'], function(result) {
        let urls = result.urls.split("\n");
        if (!urls.length) {
            return;
        }

        // set next url to be loaded
        currentIndex++;
        currentIndex = currentIndex % urls.length;

        // load it
        chrome.tabs.query({index: tabIndex}, function(tabs) {
          chrome.tabs.update(tabs[0].id, {url: urls[currentIndex]});
        });
    });
  }

  chrome.storage.onChanged.addListener(function(changes, areaName) {
    chrome.storage.sync.get(['reloadEnabled', 'refreshInterval'], function(result) {
        let reloadEnabled = parseInt(result.reloadEnabled);
        let refreshInterval = parseInt(result.refreshInterval);

        if ("reloadEnabled" in changes) {
            reloadEnabled = parseInt(changes["reloadEnabled"]["newValue"]);
        }
        if ("refreshInterval" in changes) {
            refreshInterval = parseInt(changes["refreshInterval"]["newValue"]);
        }

        // clear old interval if running
        if (mainThreadInterval) {
            clearInterval(mainThreadInterval);
        }

        // run new if needed
        if (reloadEnabled && refreshInterval) {
            mainThreadInterval = setInterval(() => {
              magic(reloadEnabled);
            }, refreshInterval);
        }
    });
  });
});
