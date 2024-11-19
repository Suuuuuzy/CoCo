// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/iolllppockafcienapcpdpbmbdolbpgn/src/bg/background.js

var baseUrl = "http://localhost%port";
var ports = [ ":15100", ":15101" ];
var operations = { 
	version: "/version?callback=la",
	open: "/openFile?t=%token&domain=%domain&file&name=%fileName&callback=la",
	extensions: "/extensions?domain=%domain&callback=la",
	status: "/documentStatus?t=%token&domain=%domain&callback=la",
    sign: "/sign?t=%token&domain=%domain&file&name=%fileName&signType=%signType&taskId=%taskId&actionId=%actionId&callback=la"
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if(request.request) {
          switch(request.request) {
            case "version":
                var url = baseUrl + operations.version;
                sendRequest(url, 0, sendResponse);
                return true;
            case "open_document":
                if(request.detail.domain && request.detail.token) {
                    var url = baseUrl + operations.open;
                    url = url.replace("%token", request.detail.token)
                             .replace("%domain", encodeURIComponent(request.detail.domain));
                    if(request.detail.fileName) {
                        url = url.replace("%fileName", request.detail.fileName);
                    } else {
                        url = url.replace("name=%fileName", "");
                    }
                   sendRequest(url, 0, sendResponse); 
                } else {
                    sendResponse(undefined);
                }
                return true;
            case "document_progress":
                if(request.detail.domain && request.detail.token) {
                    var url = baseUrl + operations.status;
                    url = url.replace("%domain", encodeURIComponent(request.detail.domain))
                             .replace("%token", request.detail.token);
                    sendRequest(url, 0, sendResponse);
                } else {
                    sendResponse(undefined);
                }
                return true;
            case "allowed_extensions":
                if(request.detail.domain) {
                    var url = baseUrl + operations.extensions;
                    url = url.replace("%domain", encodeURIComponent(request.detail.domain));
                    sendRequest(url, 0, sendResponse);
                } else {
                    sendResponse(undefined);
                }
                return true;
            case "sign_document":
                if(request.detail.domain && 
                   request.detail.token &&
                   request.detail.fileName &&
                   request.detail.signType &&
                   request.detail.taskId &&
                   request.detail.actionId) {     
                    var url = baseUrl + operations.sign;
                    url = url.replace("%domain", encodeURIComponent(request.detail.domain))
                             .replace("%token", request.detail.token)
                             .replace("%name", request.detail.fileName)
                             .replace("%signType", request.detail.signType)
                             .replace("%taskId", request.detail.taskId)
                             .replace("%actionId", request.detail.actionId);
                    sendRequest(url, 0, sendResponse);
                } else {
                    sendResponse(undefined);
                }
                return true;
          }
      }
});

function sendRequest(partialUrl, portIndex, callback) {
    try {
        var url = partialUrl.replace("%port", ports[portIndex]);
        //console.log(url);
        var xhtp = new XMLHttpRequest();
        xhtp.open("GET", url, true);
        xhtp.onreadystatechange = function() {
            if(xhtp.readyState == 4) {
                if(xhtp.status == 200) {
                    callback(JSON.parse(xhtp.responseText));
                } else {
                    if(portIndex >= ports.length) {
                        callback(undefined);
                    } else {
                        sendRequest(partialUrl, portIndex + 1, callback);
                    }
                }
            }
        };
        xhtp.send();
    }catch(err) {
        if(portIndex >= ports.length) {
            callback(undefined);
        } else {
            sendRequest(partialUrl, portIndex + 1, callback);
        }
    }
}



