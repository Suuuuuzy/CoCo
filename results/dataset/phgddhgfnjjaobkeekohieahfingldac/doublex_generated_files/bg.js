// original file:/media/data2/jianjia/extension_data/unzipped_extensions/phgddhgfnjjaobkeekohieahfingldac/background.js

//console.log('running background script');
let disconnectOnTabUpdate = undefined;

// workaround for the chrome v91 tabs bug, see https://bugs.chromium.org/p/chromium/issues/detail?id=1213925, comment #35
const ChromeWrapper = {
  chromeTabsQuery: function (params, callback) {
    chrome.tabs.query(params, tabs => {
      if (chrome.runtime.lastError) {
        setTimeout(function () {
          //console.warn("ChromeWrapper.chromeTabsQuery re-called.");
          ChromeWrapper.chromeTabsQuery(params, callback)
        }, 500); // arbitrary delay
      } else {
        callback(tabs)
      }
    })
  }
}

function disconnectTabFromFD(tab) {
  //console.log('disconnectTabFromFD tabId=' + tab.id + ' executing disconnect-content-script');
  chrome.tabs.sendMessage(tab.id, {msg:"disconnectFD"});
}

function connectTabToFD(tab){
  chrome.tabs.sendMessage(tab.id, {msg:"connectFD"});
}

function connectActiveTabToFD(window) {
  // connect active tab in focused window
  ChromeWrapper.chromeTabsQuery({ windowId: window.id, active: true }, function(tabs) {
    for (var j = 0; j < tabs.length; j++) {
      //console.log('onFocusChanged allTabId=' + tabs[j].id);
      //console.log('onFocusChanged connecting to FD');
      connectTabToFD(tabs[j]);
    }
  });
}
  

function disconnectAllInactiveTabsFromFD(window) {
  ChromeWrapper.chromeTabsQuery({ windowId: window.id }, function(tabs) {
    for (var j = 0; j < tabs.length; j++) {
      //console.log('onFocusChanged allTabId=' + tabs[j].id);
      if (!window.focused || !tabs[j].active) {
        //console.log('onFocusChanged disconnecting from FD');
        disconnectTabFromFD(tabs[j]);
      }
    }
  });
}
    
function updateTabConnectionsToFD() {
  chrome.windows.getAll({}, function(windows) {
    // disconnect inactive tabs (incl active tab in windows w/out focus)
    for (var i = 0; i < windows.length; i++) {
      //console.log('onFocusChanged allWindowId=' + windows[i].id);
      disconnectAllInactiveTabsFromFD(windows[i]);
    }

    chrome.windows.getLastFocused({}, function(window) {
      connectActiveTabToFD(window);
    });
  });
}

// Override any Content Security Policy to allow us to connect to local host. Only basic wildcard support, so have to list ports individually.
chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  for (var j = 0; j < headers.length; j++) {
      var header = headers[j];
      var name = header.name.toLowerCase();
      if (name == 'content-security-policy' ||
          name == 'content-security-policy-report-only' ||
          name == 'x-webkit-csp') {
            
          var policyToModify = null;
          
          if (header.value.includes('default-src')) {
            policyToModify = 'default-src';
          }
            
          if (header.value.includes('connect-src')) {
             policyToModify = 'connect-src';
          }
          
          if (policyToModify !== null) {          
            header.value = header.value.replace(policyToModify, policyToModify + 
            ' wss://127.0.0.1:2020 wss://127.0.0.1:2021 wss://127.0.0.1:2022 wss://127.0.0.1:2023 wss://127.0.0.1:2024' +
            ' wss://127.0.0.1:2025 wss://127.0.0.1:2026 wss://127.0.0.1:2027 wss://127.0.0.1:2028 wss://127.0.0.1:2029' + 
            ' wss://127.0.0.1:2030 wss://127.0.0.1:2031 wss://127.0.0.1:2032 wss://127.0.0.1:2033 wss://127.0.0.1:2034' + 
            ' wss://127.0.0.1:2035 wss://127.0.0.1:2036 wss://127.0.0.1:2037 wss://127.0.0.1:2038 wss://127.0.0.1:2039' + 
            ' wss://127.0.0.1:2040 wss://127.0.0.1:2041 wss://127.0.0.1:2042 wss://127.0.0.1:2043 wss://127.0.0.1:2044' + 
            ' wss://127.0.0.1:2045 wss://127.0.0.1:2046 wss://127.0.0.1:2047 wss://127.0.0.1:2048 ');
          }
      }
  }
  return {responseHeaders: headers};
}, {
    urls: ['*://*/*'],
    types: ['main_frame', 'sub_frame']
}, ['blocking', 'responseHeaders']);

// Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus.
chrome.windows.onFocusChanged.addListener(function(windowId) {
  console.log('onFocusChanged windowId=' + windowId);
  if (windowId != chrome.windows.WINDOW_ID_NONE){
    if(disconnectOnTabUpdate){
      updateTabConnectionsToFD();
    }else{
      ChromeWrapper.chromeTabsQuery({ windowId: windowId, active: true }, function(tabs) {
        for (var j = 0; j < tabs.length; j++) {
          chrome.tabs.sendMessage(tabs[j].id, {msg:"pushUpdatedTabInfo"});
        }
      });
    }
  }
});

// Fires when the active tab in a window changes.
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(
    'onActivated tabId=' +
      activeInfo.tabId +
      ', windowId=' +
      activeInfo.windowId,
  );
  if(disconnectOnTabUpdate){
    updateTabConnectionsToFD();
  }else{
    chrome.tabs.sendMessage(activeInfo.tabId, {msg:"pushUpdatedTabInfo"});
  }
});

// Fired when a tab is updated.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(
    'onUpdated tabId=' + tabId + ', changeInfo=' + JSON.stringify(changeInfo),
  );

  if ('status' in changeInfo && changeInfo.status == 'complete') {
    //console.log('onUpdated tabId=' + tabId + ' page is complete');
    chrome.tabs.sendMessage(tabId, {msg:"pushUpdatedTabInfo"});
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var firstTime = disconnectOnTabUpdate === undefined;
  if(request.message == "DisableInactiveConnections"){
    if(request.disable){
      disconnectOnTabUpdate = true;

      if(firstTime){
        updateTabConnectionsToFD();
      }
    }
  }else if(request.message == "CheckIfTabActive"){ // should only be called after initial connection
    ChromeWrapper.chromeTabsQuery({active: true, currentWindow: true}, function(tabs){
      if(tabs[0].id == sender.tab.id){
        console.log(`yes, ${sender.tab.id}, you are active!`);
        chrome.tabs.sendMessage(sender.tab.id, {msg: "pushUpdatedTabInfo"});
      }
    });
  }else if(request.message == "CheckForActiveTab"){
    ChromeWrapper.chromeTabsQuery({active: true, currentWindow: true}, function(tabs){
      if(tabs[0].id != sender.tab.id){
        console.log(`updating active tab to new tab ${sender.tab.id}`);
        chrome.tabs.sendMessage(tabs[0].id, {msg: "pushUpdatedTabInfo"});
      }
    })
  }
});
