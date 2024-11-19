// original file:/Users/jianjia/Documents/COCO_results/all/10k/jnhcnpjjlgnklonkjpdamjghjbpiicao/inject.js

/**
 * code in inject.js
 * added "web_accessible_resources": ["injected.js"] to manifest.json
 */
var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
// original file:/Users/jianjia/Documents/COCO_results/all/10k/jnhcnpjjlgnklonkjpdamjghjbpiicao/run.js

var params = {}
location.search.substr(1).split("&").forEach(function (item) {
    params[item.split("=")[0]] = item.split("=")[1]
})

if (params && params.trainman) {
    console.log(params);
    chrome.extension.sendRequest({
        "action": "getOptions",
        "args": []
    }, function (response) {

        if (response.pnr) {
            console.log(response);
            $("#inputPnrNo").val(response.pnr);
            if (response.submitPnr) {
                $("#modal1").click();
            }
        }
    });
}

