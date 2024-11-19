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
