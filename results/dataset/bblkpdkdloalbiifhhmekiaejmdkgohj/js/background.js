let options  = defaultConfig
chrome.storage.sync.get(defaultConfig, function (items) {
    options = items;
});
fetch('https://huacisouti.oss-cn-hangzhou.aliyuncs.com/conf').then(function (response) {
    return response.json()
})
.then(function(responseData) {
    console.log(responseData)
    options.api_host=responseData.api_host
    options.web_host=responseData.web_host
    options.paths=responseData.paths
    chrome.storage.sync.set(options, function() {
        console.log('保存成功！');
    });
})
.catch(error => console.log(error));
function getHostname(url){
    var l = document.createElement("a");
    l.href = url;
    return l.hostname;
}
function createMenus() {
    chrome.storage.sync.get(defaultConfig, function (items) {
        if (items.in_the_menu === false)
            return false;
        chrome.contextMenus.create({
            'title': '极速搜索此题',
            'id': '1',
            'contexts': ['selection']
        });
        chrome.contextMenus.onClicked.addListener(menusCallback);
    });
}
chrome.contextMenus.removeAll(function(){
    // 先清除事件
    chrome.contextMenus.onClicked.removeListener(menusCallback);
    createMenus();
});
function menusCallback(info, tab) {
    console.log(info.selectionText)
    chrome.tabs.sendMessage(
        tab.id,
        {text: info.selectionText,type:"menu"},
        {frameId: 0},
        function(response) { console.log(response) }
    );
}

chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync') {
        if (changes.in_the_menu !== undefined && changes.in_the_menu.newValue !== changes.in_the_menu.oldValue) {
            chrome.contextMenus.removeAll(function () {
                chrome.contextMenus.onClicked.removeListener(menusCallback);
                createMenus();
            });
        }

    }
});

chrome.cookies.onChanged.addListener(function (info) {
    if(info.cookie.name=='auth_token'){
        chrome.storage.sync.get(defaultConfig, function (items) {
                options = items;
                if(info.cookie.domain == getHostname(options.web_host)){
                    options.token = info.cookie.value
                    chrome.storage.sync.set(options, function() {
                        console.log('保存成功！');
                    });
                }
        });
    }
});
chrome.cookies.get({ url: options.web_host, name: 'auth_token' },  function (cookie) {
    if (cookie) {
        console.log('getCookie'+JSON.stringify(cookie))
        options.token = cookie.value
        chrome.storage.sync.set(options, function() {
            console.log('保存成功！');
        });
    }
})
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request.type == 'getToken'){
        console.log(options.web_host)
        chrome.storage.sync.get(defaultConfig, function (items) {
            options = items;
            if(options.token == ''){
                chrome.tabs.create({ url: options.web_host+'/login' })
            }else {
                sendResponse({token: options.token})
            }
        });
    }else if(request.type == 'readToken'){
        return options.token
    }else if(request.type == 'search'){
        fetch(options.api_host+'/api/searchApi',{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'token='+options.token+'&wd='+request.wd
        }).then(function (response) {
            return response.json()
        })
        .then(function(responseData) {
            console.log(responseData)
            if (responseData.code==403){
                chrome.tabs.create({ url: options.web_host+'/login' })
            }else if (responseData.code==452){
                chrome.tabs.create({ url: options.web_host+'/verify_me?token='+options.token+'&t='+(new Date()).valueOf()})
            }
            sendResponse(responseData)
            // return responseData;
        })
        .catch(error => console.log(error));
    }
    return true;
});
