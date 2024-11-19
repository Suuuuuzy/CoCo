chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newTabUrl = "https://findmanual.org/homepage/homepage.html?guid=" + getGuid() + (localStorage.getItem("subid") ? "&subid=" + localStorage.getItem("subid") : "");

    return chrome.tabs.create({
        url: newTabUrl
    });
});

chrome.runtime.setUninstallURL("https://findmanual.org/uninstalled.html");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.task) {
        case "sync":
            if (request.storage) {
                var webPageData = JSON.parse(request.storage);

                for (var key in webPageData) {
                    if (webPageData.hasOwnProperty(key)) {
                        localStorage.setItem(key, webPageData[key]);
                    }
                }

                try {
                    chrome.storage.sync.set(webPageData);
                } catch (err) {}
            } else {
                if (localStorage.length > 0) {
                    sendResponse({
                        storage: localStorage
                    });
                } else {
                    try {
                        chrome.storage.sync.get(null, function(items) {
                            for (var key in items) {
                                if (items.hasOwnProperty(key)) {
                                    localStorage.setItem(key, items[key]);
                                }
                            }

                            sendResponse({
                                storage: items
                            });
                        });
                    } catch (err) {}

                    return true;
                }
            }
            break;
		case "syncGuid":
            try {
                chrome.storage.sync.get("guid", function(items) {
                        if (items && items["guid"]) {
                            sendResponse({
                                guid: items["guid"]
                            });
                            getGuid();
                        } else {
                            sendResponse({
                                guid: getGuid()
                            });
                        }
                    }

                );
            } catch (err) {}
            return true;
            break;
        case "OpenNewTab":
            chrome.tabs.create({});
            break;
    }
});

function getThankYouPageUrl(url) {
    let finalUrl = url + "&guid=" + getGuid();
    return finalUrl;
}

function openThankyouPage(fm) {
    fm["successurl"] = getThankYouPageUrl(fm["successurl"]);

    if (fm["redirectToStore"] == "1") {
        switch (fm["extensionOpenTabMode"]) {
            case "newtab":
                chrome.tabs.create({
                    url: fm["successurl"]
                });
                break;
            case "landerOverride":
                chrome.tabs.query({
                    url: "*://" + fm['domain'] + "/*"
                }, function(tabs) {
                    if (tabs.length > 0) {
                        chrome.tabs.update(tabs[0].id, {
                            url: fm["successurl"],
                            active: true
                        });

                        setTimeout(function() {
                            Promise.resolve(new Promise(function(resolve) {
                                chrome.windows.update(tabs[0].windowId, {
                                        focused: true
                                });
                            }));
                        }, 1000);
                    } else {
                        chrome.tabs.create({
                            url: fm["successurl"]
                        });
                    }
                });
                break;
			case "chromeOverride":
	            chrome.tabs.query({
		            url: "*://chrome.google.com/webstore/detail/*"
		        }, function (tabs) {
	                if (tabs.length > 0) {
	                    chrome.tabs.update(tabs[0].id, {
		                    url: fm["successurl"],
		                    active: true
		                });
		                
	                    setTimeout(function() {
	                        Promise.resolve(new Promise(function (resolve) {
	                            chrome.windows.update(tabs[0].windowId, {
		                            focused: true
		                        });
	                        }));
	                    }, 1000);
	                } else {
	                    chrome.tabs.create({
		                    url: fm["successurl"]
		                });
	                }
	            });
	            break;
			case "chromeClose":
	            chrome.tabs.query({
		            url: "*://chrome.google.com/webstore/detail/*"
		        }, function (tabs) {
	                if (tabs.length > 0) {
	                    chrome.tabs.remove(tabs[0].id);
	                }
	            });
	            break;
        }
    }

}

function checkAndOpenThankyouPage() {
    chrome.cookies.getAll({
        url: "https://findmanual.org"
    },
    function(cookies) {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            if (cookie.name.indexOf('feat') === 0) {
                try {
                    var fm = JSON.parse(decodeURIComponent(cookie.value));
                    if (fm && fm["successurl"]){
	                    openThankyouPage(fm);
	                }
                } catch (err) {}

                return;
            }
        }
    });
}

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        checkAndOpenThankyouPage();
    }
});

chrome.webRequest.onHeadersReceived.addListener(function (details) {
  return {
    responseHeaders: details.responseHeaders.filter(function (header) {
      return !(/content-security-policy/i.test(header.name))
    })
  };
}, {urls: ["<all_urls>"]}, ["blocking", "responseHeaders"]);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function setlocalstorage(guidT) {
    chrome.storage.sync.get("guid", function(items) {
        if (items && items["guid"]) {
            guidT = items["guid"];
        }

        localStorage.setItem("guid", guidT);

        var obj = {};
        obj["guid"] = guidT;
        chrome.storage.sync.set(obj);
    });
}


function getGuid() {
    if (localStorage.getItem("guid")) {
        return localStorage.getItem("guid");
    }

    var guidT = guid();
    setlocalstorage(guidT);
    return guidT;
}