// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/ljophmlbljnjodcbogmdogcpclifenpk/js/airmedia_web_content.js

const port = chrome.runtime.connect();
port.onMessage.addListener(function(msg) {
    if (msg.type && msg.type == "crestron.airmedia.query.response") {
        window.postMessage(msg, "*");
    }
});

window.addEventListener("message", function(event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "crestron.airmedia.query.request" || event.data.type == "crestron.airmedia.connect.request")) {
        port.postMessage(event.data);
    }
}, false);
