// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    //set default values if there arent any set already
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches: 'kickstarter.com/*'
                        },
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});
chrome.runtime.onMessage.addListener(function (message, sender) {
    if (message.type == "options") {
        chrome.runtime.openOptionsPage();
    }
});
//inject content right on load
chrome.webNavigation.onHistoryStateUpdated.addListener(function (e) {
    chrome.tabs.executeScript(null, {
        file: "js/injector.js"
    });
}, {
        url: [{
            urlMatches: 'kickstarter.com/*'
        }]
    });
