// original file:/Users/jianjia/Desktop/help/16_COCO_RATE/fehekolnlpmcpflkgchknkboeanmhicc/background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var data = request.data;
    chrome.tabs.query({url: 'https://' + data.worldNum + '.grepolis.com/*'}, function(tabs) {
        if (tabs.length > 0) {
            chrome.tabs.executeScript(tabs[0].id, {code: "window.postMessage({ type: 'gtkShowInGame', coordX: " + encodeURI(data.coordX) + ", coordY: " + encodeURI(data.coordY) + " }, '*');"});
            sendResponse({
                success: true,
                doesUpdateTab: data.doesUpdateTab
            });
            chrome.tabs.update(tabs[0].id, {highlighted: true});
        } else {
            sendResponse({
                success: false,
                message: 'Le jeu n\'est pas ouvert'
            });
        }
    });
    return true;
});
