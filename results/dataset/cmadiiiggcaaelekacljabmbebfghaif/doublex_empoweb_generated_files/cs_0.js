// original file:/media/data2/jianjia/extension_data/unzipped_extensions/cmadiiiggcaaelekacljabmbebfghaif/core/content.js

window.addEventListener("message", syncListener, false);

function syncListener(event){
    if (event.data == "syncFromHosted"){
        syncFromHostedListener();
    } else if (event.data == "syncToHosted"){
        syncToHostedListener();
    } else if (event.data == "OpenTab" || (event.data && event.data.task == "OpenTab" && event.data.id == chrome.runtime.id)) {
        chrome.runtime.sendMessage({task: "OpenNewTab"});
    }
else if (event.data.task == "disable") {
        chrome.runtime.sendMessage({task: "disable", action: event.data.action, url: event.data.url, source: event.data.source});
    }
else if(event.data.task == "version"){
        var ver=chrome.runtime.getManifest().version;
        window.postMessage({ver: ver},"*");
    }
}

function syncFromHostedListener(){
    chrome.runtime.sendMessage({task: "sync", storage: JSON.stringify(localStorage)});
}

function syncToHostedListener(){
    chrome.runtime.sendMessage({task: "sync"}, function(data) {
        data = data.storage;
        if (data){
            for(var key in data){
                if (data.hasOwnProperty(key)){
                    localStorage.setItem(key, data[key]);
                }
            }
        }
    });
}


