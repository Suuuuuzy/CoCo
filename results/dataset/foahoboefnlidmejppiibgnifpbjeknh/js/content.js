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