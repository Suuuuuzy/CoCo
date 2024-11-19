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