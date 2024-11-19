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