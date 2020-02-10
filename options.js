let reloadEnabled = document.getElementById("reloadEnabled");
let refreshInterval = document.getElementById("refreshInterval");
let urls = document.getElementById("urls");

// onload
chrome.storage.sync.get(['reloadEnabled'], function(result) {
    if (!result.reloadEnabled) {
        return;
    }
    reloadEnabled.value = result.reloadEnabled;
});
chrome.storage.sync.get(['refreshInterval'], function(result) {
    if (!result.refreshInterval) {
        return;
    }
    refreshInterval.value = result.refreshInterval;
});
chrome.storage.sync.get(['urls'], function(result) {
    if (!result.urls) {
        return;
    }
    urls.value = result.urls;
});

// after change
refreshInterval.addEventListener("change", function() {
  chrome.storage.sync.set({refreshInterval: this.value});
});

reloadEnabled.addEventListener("change", function() {
  chrome.storage.sync.set({reloadEnabled: this.value});
});

urls.addEventListener("change", function() {
  chrome.storage.sync.set({urls: this.value});
});
