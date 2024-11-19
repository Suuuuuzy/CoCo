// original file:/media/data2/jianjia/extension_data/unzipped_extensions/mbpfipleganodbgndfadpokojibnfhjb/background.js

const EXTENSION_VERSION = chrome.runtime.getManifest().version

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: 'vidangel.com' },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
  const char = message.auth.uri.match(/\?./) ? '&' : '?';
  const uri = message.auth.uri + char + 'version=' + EXTENSION_VERSION;
  fetchToJSONResponse(uri, message.auth.options).then(response => {
    if (!response.ok) return sendResponse(response)
    router(message.request, sender, sendResponse)
  })
  return true
});

function fetchToJSONResponse(uri, options) {
  return fetch(uri, options).then(response => {
    var parseBody, json_response = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      parseBody = response.json().then(json => ({ json }));
    } else {
      parseBody = response.text().then(text => ({ text }));
    }
    return parseBody
      .then(_data => json_response = _data)
      .catch(err => console.log(err))
      .then(() => {
        json_response.headers = {}
        for (let key in response) { // Set Values
          const value = response[key];
          if (value !== Object(value)) json_response[key] = value;
        }
        for (let header of response.headers.entries()) { // Set Headers
          json_response.headers[header[0]] = header[1];
        }
        return json_response;
      });
  }).catch(error => {
    return { 
      ok: false, 
      status: 500, 
      error: '' + error 
    };
  })
}

function router(request, sender, sendResponse) {
  switch (request.uri) {
    case 'is_installed':
      sendResponse({ status: 200 })
      return false
    case 'cookies':
      // https://developer.chrome.com/extensions/cookies
      chrome.cookies[request.method](request.args[0], data => {
        const error = chrome.runtime.lastError
        sendResponse({
          status: error ? 500 : 200,
          error,
          data
        })
      })
      return true
    case 'fetch':
      const uri = request.args[0]
      const options = request.args[1]
      fetchToJSONResponse(uri, options).then(sendResponse)
      return true
    default:
      sendResponse({
        status: 404,
        error: { message: 'Unknown request to Chrome Extension' }
      })
      return false
  }
}

