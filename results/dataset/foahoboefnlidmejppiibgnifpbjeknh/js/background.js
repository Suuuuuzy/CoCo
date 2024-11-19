var ua = "chrome";

if (!localStorage.active)
    localStorage.active = "on";

if (localStorage.active == "on")
    chrome.browserAction.setIcon({path: '24-on.png'});
else
    chrome.browserAction.setIcon({path: '24-off.png'});

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case "dv":
            var cookie = {};
			cookie.url = "https://drive.google.com";
            cookie.name = "DRIVE_STREAM";
            cookie.value = request.cookie;
			cookie.domain = "drive.google.com";
			cookie.sameSite = "no_restriction";
			cookie.secure = true;
            chrome.cookies.set(cookie);
            sendResponse({
                msg: "dv"
            });
            break;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "check") {
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {
                    action: "check",
                    active: localStorage.active
                });
            }
        });
    } else if (request.action == "frame") {
        chrome.tabs.sendRequest(sender.tab.id, {
            action: "frame",
            active: localStorage.active
        });
    }
});