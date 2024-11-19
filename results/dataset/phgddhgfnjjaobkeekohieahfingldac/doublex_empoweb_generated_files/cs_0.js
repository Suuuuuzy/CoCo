// original file:/Users/jianjia/Documents/COCO_results/all/10k/phgddhgfnjjaobkeekohieahfingldac/content-script.js

﻿//console.log('executing content script');

function getFromStorage(key) {
  return new Promise(function(resolve, reject) {
    chrome.storage.local.get(key, items => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        //console.debug("getFromStorage: " + key + " => " + items[key]);
        resolve(items[key]);
      }
    });
  });
}

function dispatchFDConnectEvent(){
  //Get current version
  var manifest = chrome.runtime.getManifest();

  //Get values from storage, send fdConnect msg
  getFromStorage('fdWebExtension.fdPort').then(fdPort => {
    if (fdPort === undefined) fdPort = 2020;
    getFromStorage('fdWebExtension.userId').then(userId => {
      var fdConnect = new CustomEvent('fdWebExtension.fdConnect', {
        detail: JSON.stringify({
          // ff doesn't allow sending raw data
          version: manifest.version,
          fdPort: fdPort,
          userId: userId,
        }),
      });
      document.dispatchEvent(fdConnect);
    });
  });
}

document.addEventListener('fdWebExtension.saveToStorage', e => {
  var key = e.detail.key;
  var value = e.detail.value;
  //console.debug("fdWebExtension.saveToStorage key: " + key + " value: " + value);
  chrome.storage.local.set({ [key]: value });
});

document.addEventListener('fdWebExtension.deleteFromStorage', e => {
  var key = e.detail.key;
  chrome.storage.local.remove(key, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  });
});

document.addEventListener('fdWebExtension.DisableInactiveConnections', e=> {
  var obj = JSON.parse(e.detail);
  var isDisabled = obj.disable;
  chrome.runtime.sendMessage({message : "DisableInactiveConnections", disable : isDisabled});
});

document.addEventListener('fdWebExtension.CheckIfTabActive', e=> {
  chrome.runtime.sendMessage({message : "CheckIfTabActive"});
});

document.addEventListener('fdWebExtension.TargetCleared', e=>{
  chrome.runtime.sendMessage({message : "CheckForActiveTab"});
})

chrome.runtime.onMessage.addListener(function(request, sender, response){
  if(request.msg == "pushUpdatedTabInfo"){
    var pushUpdatedTabInfoEvt = new CustomEvent('fdWebExtension.PushTabUpdate', {
      detail: JSON.stringify({msg:"pushUpdatedTab"})
    });
    document.dispatchEvent(pushUpdatedTabInfoEvt);
  }
  if(request.msg == "disconnectFD"){
    var fdDisconnect = new CustomEvent('fdWebExtension.fdDisconnect');
    document.dispatchEvent(fdDisconnect);    
  }
  if(request.msg == "connectFD"){
    dispatchFDConnectEvent();
  }
});

var s = document.createElement('script');
s.src = chrome.extension.getURL('fd-web-connector.js');
s.onload = function() {
  dispatchFDConnectEvent();
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
undefined; // suppress ff non-structured-clonable error

