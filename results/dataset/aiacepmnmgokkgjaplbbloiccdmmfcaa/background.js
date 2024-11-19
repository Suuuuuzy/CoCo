var listTab = [];
var checkIsMobile = null;
var spinUrlRequest = "";
var spinUrlRequestData = "";
var postRequest = "";
var postRequestData = "";
var tabCaptcha = null;
chrome.tabs.onRemoved.addListener(function (tabid, removed) {
    if (tabCaptcha != null) {
        if (tabid == tabCaptcha) {
            spinUrlRequest = "";
            spinUrlRequestData = "";
        }
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "OpenView") {
        request = request.obj;
        var spinView = request.Name;
        var url = spinView.substring(0, spinView.indexOf(";"));
        if (spinView.indexOf(";") == -1) {
            url = spinView;
            spinView = "";
        } else {
            spinView = spinView.substring(spinView.indexOf(";") + 1);
        }
        chrome.tabs.getAllInWindow(null, function (tabs) {
            if (tabs.length > 15) {
                for (var i = 0; i < tabs.length; i++) {
                    if (!tabs[i].url.startsWith("http://spineditor.com") && !tabs[i].url.startsWith("https://spineditor.com")) {
                        chrome.tabs.remove(tabs[i].id);
                    }
                }
                listTab = [];
            }
        });
        chrome.tabs.create({
            url: url,
            selected: true
        }, function (tab) {
            listTab.push(tab.id);
            request.Time += Math.floor(Math.random() * 30);
			setTimeout(function () { chrome.tabs.executeScript(tab.id, { code: "winName=\"spineditorview_" + request.Id + "_" + (request.Time * 1000) + "_" + spinView + "\";" }); },  1000);
            setTimeout(function () { chrome.tabs.remove(tab.id); }, request.Time * 1000);
        });
        CheckTab();

        if (request.RemoveCaptcha) {
            RemoveTabCaptcha();
        }
    } else if (request.type == "OpenForum") {
        request = request.obj;
        chrome.tabs.create({
            url: request.ForumUrl,
            selected: true
        }, function (tab) {
            chrome.tabs.executeScript(tab.id, { code: "winName='spineditorpost_unlogin_" + request.Id + "'" });
        });
    } else if (request.type == "RequestLink") {
        var linkUrl = request.obj;
        var mobile = request.mobile;
        if (linkUrl.localeCompare(spinUrlRequest) == 0) {
            sendResponse({
                response: spinUrlRequestData
            });
            if (spinUrlRequestData == "-1") {
                spinUrlRequestData = "";
            }
            if (spinUrlRequestData != "") {
                spinUrlRequestData = "";
                spinUrlRequest = "";
            }
        } else {
            spinUrlRequest = linkUrl;
            try {
                if (mobile) {
                    checkIsMobile = mobile;
                }else{
					checkIsMobile = null;
				}
				clearTimeout(timeCheckMobile);
				
                var x = new XMLHttpRequest();
                x.open('GET', linkUrl);
                x.responseType = 'text/plain';
                x.onload = function () {
					var data = x.response;
					clearMobile();
					if (x.status == 200) {
						spinUrlRequestData = data;
					} else {
						if (linkUrl.indexOf("google.com")!=-1) {
							spinUrlRequestData = "-1";
							if (request.incognito) {
								chrome.windows.create({ "url": x.responseURL, "incognito": false, "focused": true, "type": "popup" }, function (tab) {
									tabCaptcha = tab.id + 1;
									if (request.captcha) {
										chrome.tabs.executeScript(tabCaptcha, { code: "window.name='spineditor-captcha-"+request.mid+"'" });
									} else {
										chrome.tabs.executeScript(tabCaptcha, { code: "window.name='spineditor-noncaptcha'" });
									}
								});
							} else {
								chrome.tabs.create({
									url: x.responseURL,
									selected: true
								}, function (tab) {
									tabCaptcha = tab.id;
									if (request.captcha) {
										chrome.tabs.executeScript(tabCaptcha, { code: "window.name='spineditor-captcha-"+request.mid+"'" });
									} else {
										chrome.tabs.executeScript(tabCaptcha, { code: "window.name='spineditor-noncaptcha'" });
									}
								});
							}
						} else{
							spinUrlRequestData = "-2";
						}
					}
                };
                x.onerror = function () {
                    clearMobile();
                    spinUrlRequestData = "-2";
                };
                x.send();

            } catch (ex) {
                spinUrlRequestData = "-3";
            }
        }
    } else if (request.type == "PostRequest") {
        var linkUrl = request.obj.url;
        var datajson = request.obj.data;
        if (linkUrl == postRequest) {
            if (postRequestData != "") {
                sendResponse({
                    response: postRequestData
                });
                postRequestData = "";
                postRequest = "";
            }
        } else {
            postRequest = linkUrl;
            try {
                var x = new XMLHttpRequest();
                x.open('POST', linkUrl);
                x.setRequestHeader("Content-type", "application/json");
                x.responseType = 'application/json';
                x.onload = function () {
                    var data = x.response;

                    if (x.status == 200) {
                        postRequestData = data;
                    } else {
                        postRequestData = data;
                    }
                };
                x.onerror = function () {
                    postRequestData = "-2";
                };
                x.send(datajson);
            } catch (ex) {
                postRequestData = "-3";
            }
        }
    } else if (request.type == "CloseCaptcha") {
        chrome.tabs.remove(tabCaptcha);
    }

});

var timeCheckMobile=null;
function clearMobile(){
	clearTimeout(timeCheckMobile);
	timeCheckMobile= setTimeout(function(){
		checkIsMobile = null;
	},3000);
}

function RequestLinkUrl(linkUrl) {
    try {
        var x = new XMLHttpRequest();
        x.open('GET', linkUrl);
        x.responseType = 'application/json';
        x.onload = function () {
            var response = x.response;
            if (x.status == 200) {
                return response
            } 
        };
        x.onerror = function () {
        };
        x.send();
    } catch (ex) {
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
			//checkIsMobile = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
            if (checkIsMobile) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = checkIsMobile;
						break;
                    }
                }
            }
            return { requestHeaders: details.requestHeaders };
        },
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]);
});

var timeoutCheckTab = false;
var checkTabFlag = false;
var countCheckTab = 0;
function CheckTab() {
    if (timeoutCheckTab) {
        countCheckTab++;
        var listTabNew = [];
        chrome.tabs.getAllInWindow(null, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var flag = false;
                for (var k = 0; k < listTab.length; k++) {
                    if (tabs[i].id == listTab[k]) {
                        flag = true;
                    }
                }
                if (!flag) {
                    if (!tabs[i].url.startsWith("http://spineditor.com") && !tabs[i].url.startsWith("https://spineditor.com") && !tabs[i].url.startsWith("http://www.spineditor.com") && !tabs[i].url.startsWith("https://www.spineditor.com")) {
                        chrome.tabs.remove(tabs[i].id);
                    }
                } else {
                    listTabNew.push(tabs[i].id);
                }
            }
            listTab = listTabNew;
        });
        timeoutCheckTab = false;
        checkTabFlag = false;
        if (countCheckTab == 6) {
            RemoveTab();
            countCheckTab = 0;
        }
    } else {
        if (!checkTabFlag) {
            checkTabFlag = true;
            setTimeout(function () {
                timeoutCheckTab = true;
            }, 400000);
        }
    }
}

function RemoveTab() {
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (!tabs[i].url.startsWith("http://spineditor.com") && !tabs[i].url.startsWith("https://spineditor.com") && !tabs[i].url.startsWith("http://www.spineditor.com") && !tabs[i].url.startsWith("https://www.spineditor.com")) {
                chrome.tabs.remove(tabs[i].id);
            }
        }
    });
    listTab = [];
}

function RemoveTabCaptcha() {
    var listTabNew = [];
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.startsWith("https://ipv4.google.com") || tabs[i].url.startsWith("https://ipv6.google.com") || tabs[i].url.startsWith("https://www.google.com/sorry/index")) {
                chrome.tabs.remove(tabs[i].id);
            } else {
                listTabNew.push(tabs[i].id);
            }
        }
    });
    listTab = listTabNew;
}
