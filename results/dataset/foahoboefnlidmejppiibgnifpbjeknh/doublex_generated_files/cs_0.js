// original file:/Users/jianjia/Desktop/help/16_COCO_RATE/foahoboefnlidmejppiibgnifpbjeknh/js/content.js

var manifestData = chrome.runtime.getManifest();

chrome.runtime.sendMessage({action: "check"}, function () {
    chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.action == "check" && msg.active === "on") {
            $("#ext-version,#ext-id").remove();
            $("body").append('<input id="ext-version" type="hidden" />');
            $("body").append('<input id="ext-id" type="hidden" value="'+ chrome.runtime.id +'"/>');
            
        }
    });
});
// original file:/Users/jianjia/Desktop/help/16_COCO_RATE/foahoboefnlidmejppiibgnifpbjeknh/js/iframe.js

if (window.top !== window) {
        chrome.runtime.sendMessage({
            action: "frame"
        });    
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.action == "frame") {
        if (request.active === "on") 
			$("body").append('<input id="ext" type="hidden"/>');
    }
});
