let reloadEnabled = document.getElementById("reloadEnabled");
let urls = document.getElementById("urls");

// onload
chrome.storage.sync.get(['reloadEnabled'], function(result) {
    reloadEnabled.checked = result.reloadEnabled;
});
chrome.storage.sync.get(['urls'], function(result) {
    urls.value = result.urls;
});

// after change
reloadEnabled.addEventListener("click", function() {
  chrome.storage.sync.set({reloadEnabled: this.checked});
});

urls.addEventListener("change", function() {
  chrome.storage.sync.set({urls: this.value});
});
