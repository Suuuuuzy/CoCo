var core = {
    "getOptions": function () {
        return localStorage;
    },
}

window.onload = function () {
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        var ret = (core[request.action] || function () {
        }).apply(this, request.args);
        sendResponse(ret);
    });
}

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.message && request.message == 'version') {
            var version = chrome.runtime.getManifest().version;
            sendResponse({status: "true", version: version});
        } else if (request.pnr) {
            localStorage['pnr'] = request.pnr;
            localStorage['submitPnr'] = request.submitPnr;
        } else if (request.remove) {
            localStorage.clear();
            sendResponse({msg:'cleared'});
        }
    });


chrome.runtime.onInstalled.addListener(function (details) {
    chrome.tabs.query({url: ["*://*.flightman.in/*", "*://*.trainman.in/*", "*://*.localhost2.ab/*", "*://*.localhost/*"]}, function (tabArray) {
        tabArray.forEach((tab) => {
            chrome.tabs.reload(tab.id);
        })
    });
});


/*(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "*://!*.indianrail.gov.in/!*"
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }

        tabStorage[tabId].requests[requestId] = {
            requestId: requestId,
            url: details.url,
            startTime: details.timeStamp,
            status: 'pending'
        };
        console.log(tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.webRequest.onCompleted.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];

        Object.assign(request, {
            endTime: details.timeStamp,
            requestDuration: details.timeStamp - request.startTime,
            status: 'complete'
        });
        console.log(tabStorage[tabId].requests[details.requestId]);
    }, networkFilters);

    chrome.webRequest.onErrorOccurred.addListener((details)=> {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];
        Object.assign(request, {
            endTime: details.timeStamp,
            status: 'error',
        });
        console.log(tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
}());*/

