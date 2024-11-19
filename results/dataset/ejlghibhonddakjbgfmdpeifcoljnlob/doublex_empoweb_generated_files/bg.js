// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ejlghibhonddakjbgfmdpeifcoljnlob/src/bg/background.js

var response;
var draw_chart_count = 0;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.cmd == "hello") {
            response = {
                draw_chart_count: draw_chart_count
            };
            sendResponse(response);
        }

    }
);
