alert('Got Here');
'use strict';   
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {file: "injectImage.js"});
});

    chrome.browserAction.setBadgeBackgroundColor({color: [0, 200, 0, 100]});

    var i = 0;
    window.setInterval(function () {
        chrome.browserAction.setBadgeText({text: String(i)});
        i++;
    }, 10);