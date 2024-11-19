// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kalfcfpaabnmkndhefnijjhcndjhnijc/background.js

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    //alert("This is my favorite website!");
    //alert(msg);
    //chrome.storage.local.clear();
    //console.info("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    chrome.storage.local.set({ logindata: msg });
    chrome.storage.local.set({ dataAfterLogin: msg });

    // alert("This is my favorite website!");
});
