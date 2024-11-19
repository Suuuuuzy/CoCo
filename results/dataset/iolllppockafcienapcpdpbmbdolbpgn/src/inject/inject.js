document.addEventListener("version_request", versionRequest, false);
document.addEventListener("extensions_request", allowedExtensionsRequest, false);
document.addEventListener("open_document_request", openDocumentRequest, false);
document.addEventListener("document_progress_request", documentProgressRequest, false);
document.addEventListener("sign_document_request", signRequest, false);

function versionRequest() {
    chrome.runtime.sendMessage({ request: "version" }, function(resp) {
        if(!resp) {
            sendComponentNotRunningEvent();
        } else if(resp && resp.Version && (resp.SuccessResponse === "ALL_OK" || resp.SuccessCode === "ALL_OK")) {
            sendComponentVersionEvent(resp.Version);
        } else {
            sendComponentMalformedResponseEvent();
        }
    });
}

function openDocumentRequest(param) {
    if(param && param.detail && param.detail.token) {
        chrome.runtime.sendMessage({ request: "open_document", detail: param.detail }, function(resp) {
            if(!resp) {
                sendComponentNotRunningEvent();
            } else if(resp && (resp.SuccessResponse || resp.SuccessCode)) {
                var suc = resp.SuccessResponse || resp.SuccessCode;
                sendOpenDocumentResponse(suc, param.detail.token, param.detail.documentId);
            } else {
                sendComponentMalformedResponseEvent();
            }
        });
    }
}

function allowedExtensionsRequest(param) {
    if(param && param.detail && param.detail.domain) {
        chrome.runtime.sendMessage({ request: "allowed_extensions", detail: param.detail }, function(resp) {
            if(!resp) {
                sendComponentNotRunningEvent();
            } else if(resp && resp.AllowedExtensions) {
                sendExtensionsResponse(resp.AllowedExtensions);
            } else {
                sendComponentMalformedResponseEvent();
            }
        });
    }
}

function documentProgressRequest(param) {
    if(param && param.detail && param.detail.domain && param.detail.token) {
        chrome.runtime.sendMessage({ request: "document_progress", detail: param.detail }, function(resp) {
            if(!resp) {
                sendComponentNotRunningEvent();
            } else if(resp && (resp.SuccessResponse || resp.SuccessCode)) {
                sendDocumentProgressResponse(resp, param.detail.token, param.detail.documentId);
            } else {
                sendComponentMalformedResponseEvent();
            }
        });
    }
}

function signRequest(param) {
    if(param && param.detail && param.detail.domain && 
                   param.detail.token &&
                   param.detail.fileName &&
                   param.detail.signType &&
                   param.detail.taskId &&
                   param.detail.actionId) { 
        chrome.runtime.sendMessage({ request: "sign_document", detail: param.detail }, function(resp) {
            if(!resp) {
                sendComponentNotRunningEvent();
            } else if(resp && (resp.SuccessResponse || resp.SuccessCode)) {
                var suc = resp.SuccessResponse || resp.SuccessCode;
                sendSignDocumentResponse(suc, param.detail.token, param.detail.documentId);
            } else {
                sendComponentMalformedResponseEvent();
            }
        });
    } 
}

function sendComponentVersionEvent(vers) {
	dispatchEvent("version_response", {"component_version": vers});
}

function sendExtensionsResponse(ext) {
	dispatchEvent("extensions_response", {"allowed_extensions": ext});
}

function sendOpenDocumentResponse(doc, toc, docId) {
	dispatchEvent("open_document_response", {"document_status": doc, "token": toc, "document_id": docId});
}

function sendDocumentProgressResponse(doc, toc, docId) {
	dispatchEvent("document_progress_response", {"document_status": doc.Status, "document_progress": doc.Progress, "token": toc, "document_id": docId});
}

function sendSignDocumentResponse(doc, toc, docId) {
	dispatchEvent("sign_document_response", {"document_status": doc, "token": toc, "document_id": docId});
}

function sendComponentNotRunningEvent() {
	dispatchEvent("component_not_running");
}

function sendComponentMalformedResponseEvent() {
	dispatchEvent("component_sent_malformed_response");
}

function dispatchEvent(eventName, eventDetails) {
    //console.log("Dispatching:" + eventName);
    //console.log(eventDetails);
	var isCustomEvent = (eventDetails );
	var eventToDispatch;
	if(isCustomEvent) {
		if(typeof CustomEvent == 'function') {
			eventToDispatch = new CustomEvent(eventName, {"detail": eventDetails});
		}
		else {
			eventToDispatch = document.createEvent("CustomEvent");
			eventToDispatch.initCustomEvent(eventName, true, true, eventDetails);
		}
	}
	else {
		if(typeof Event == 'function') {
			eventToDispatch = new Event(eventName);
		}
		else {
			eventToDispatch = document.createEvent("Event");
			eventToDispatch.initEvent(eventName, true, true);
		}
	}
	document.dispatchEvent(eventToDispatch);
}
