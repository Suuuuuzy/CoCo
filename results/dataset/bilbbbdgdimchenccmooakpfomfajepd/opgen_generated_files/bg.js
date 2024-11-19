// original file:crx_headers/jquery_header.js

// ========= proxy ========= 
// function Proxy(target, handler){
//     handler.apply
    
//     if (info.includeTlsChannelId){
//         this.includeTlsChannelId = info.includeTlsChannelId;
//     }
//     if (info.name){
//         this.name = info.name;
//     }
// }
//  ========= window ========= 

// targetWindow.postMessage(message, targetOrigin, [transfer]);
window.postMessage = function(message, targetOrigin, [transfer]){
    sink_function(message, 'window_postMessage_sink');
};

// target.addEventListener(type, listener [, options]);
// the 'e' parameter passed to listener can be ignored, otherwise, it is the event object
window.addEventListener = function(type, listener,  [options]){
    MarkAttackEntry('cs_window_eventListener_' + type, listener);
};


window.top = new Object();
window.top.addEventListener = window.addEventListener;

window.localStorage = new Object();
window.localStorage.removeItem = function(a){
    sink_function(a, 'localStorage_remove_sink');
};

window.localStorage.setItem = function(a, b){
    sink_function(a, 'localStorage_setItem_key');
    sink_function(b, 'localStorage_setItem_value');
};

window.localStorage.getItem = function(a){
    var localStorage_getItem = 'value';
    MarkSource(localStorage_getItem, 'localStorage_getItem_source');
};

window.localStorage.clear = function(){
    sink_function('localStorage_clear_sink');
};


window.frames[0] = window;
window.frames[1] = window;

var self = window;
var top = window;

//  ========= the document and its elements are all objects ========= 

function Document_element(id, class_name, tag){
    this.id = id;
    this.class_name = class_name;
    this.tag = tag;
}
Document_element.prototype.contentWindow = new Window();
Document_element.prototype.createElement = function(tagname){
    var de = new Document_element(undefined, undefined, tagname);
    return de;
}

Document_element.prototype.innerText = new Object();
MarkSource(Document_element.prototype.innerText, "document.body.innerText");

Document_element.prototype.appendChild = function(node){}


function Document(){}

Document.prototype.body = new Document_element(undefined, undefined, "body");

Document.prototype.getElementById = function(id){
    var document_element = new Document_element(id);
};

// Document.prototype.body.appendChild = function(){};


Document.prototype.addEventListener = function(type, listener,  [ options]){
    // var type = 'document_event_listener';
    MarkAttackEntry('document_event_listener', listener);
};


Document.prototype.createElement = Document_element.prototype.createElement;



Document.prototype.write = function(text){
    sink_function(text, "document_write_sink");
}


document = new Document();


//  ========= JQuery ========= 
// $(this).hide() - hides the current element.
// $("p").hide() - hides all <p> elements.
// $(".test").hide() - hides all elements with class="test".
// $("#test").hide() - hides the element with id="test".
function $(a){
    // find element a in document
    // if a is an Array
    if (Array.isArray(a)){
        var array_in = a;
        a = undefined;
    }
    else if(typeof a === 'function') {
        a();
    }
    else{
        // $("#test")
        if (a[0] == '#'){
            var document_element = new Document_element(a.substring(1,));
            // document.push(document_element);
            // document[a] = document_element;
        }
        // $(".test")
        else if(a[0] == '.'){
            var document_element = new Document_element(undefined, a.substring(1,));
            // document.push(document_element);
        }
        // document
        else if (a == document){
            var document_element = document;
        }
        // $("p")
        else{
            var document_element = new Document_element(undefined, undefined,a.substring(1,));
            // document.push(document_element);
        }
        var array_in = [document_element];
    }
    return new JQ_obj(a, array_in);
};



// jqXHR
$.ajax = function(url, settings){
    if (typeof url=="string"){
        sink_function(url, 'jQuery_ajax_url_sink');
        sink_function(settings.data, 'jQuery_ajax_settings_data_sink');
        if(settings.beforeSend){
            settings.beforeSend();
        }
        if (settings.success){
            var jQuery_ajax_result_source = 'data_form_jq_ajax';
            MarkSource(jQuery_ajax_result_source, 'jQuery_ajax_result_source');
            settings.success(jQuery_ajax_result_source);
        }
    }
    else{
        sink_function(url.url, 'jQuery_ajax_settings_url_sink');
        sink_function(url.data, 'jQuery_ajax_settings_data_sink');
        if (url.complete){
            url.complete(xhr, textStatus);
        }
    }
}
// jQuery.get( url [, data ] [, success ] [, dataType ] )
// data: Type: PlainObject or String
// success: Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
// dataType: Type: String
$.get = function(url , success){
    var responseText = 'data_from_url_by_get';
    MarkSource(responseText, 'jQuery_get_source');
    sink_function(url, 'jQuery_get_url_sink');
    success(responseText);
    return new jqXHR();
}
// jQuery.post( url [, data ] [, success ] [, dataType ] )
$.post = function( url , data, success){
    var responseText = 'data_from_url_by_post';
    MarkSource(responseText, 'jQuery_post_source');
    sink_function(data, 'jQuery_post_data_sink');
    sink_function(url, 'jQuery_post_url_sink');
    success(responseText);
    return new jqXHR();
}


// jQuery.extend( target, object1 [, objectN ] )
$.extend = function(obj1, obj2){
    for (var key in obj2){
        obj1[key] = obj2[key];
    }
}

// jQuery.extend( [deep ], target, object1 [, objectN ] ) deep copy

$.each = function(obj, callback){
    var index=0;
    for (index=0; index<obj.length; i++){
        callback(index, obj[index]);
    }
}



jQuery = $;

jqXHR = function(){}

// jqXHR.fail(function( jqXHR, textStatus, errorThrown ) {});
jqXHR.prototype.fail = function(callback){
    // do nothing
    return this;
}
// jqXHR.done(function( data, textStatus, jqXHR ) {});
// done == success
jqXHR.prototype.done = function(callback){
    callback();
    return this;
}
// jqXHR.always(function( data|jqXHR, textStatus, jqXHR|errorThrown ) {});
jqXHR.prototype.always = function(callback){
    callback();
    return this;
}


fetch_obj = function(){}

fetch = function(resource, options){
    sink_function(resource, "fetch_resource_sink");
    sink_function(options, "fetch_options_sink");
    return new fetch_obj();
}

fetch_obj.prototype.then = function(callback){
    var responseText = 'data_from_fetch';
    MarkSource(responseText, 'fetch_source');
    callback(responseText);
    return this;
}

JQ_obj = function(a, array_in){
    this.selector = a;
    this.context = document;
    var i=0;
    for (i=0; i<array_in.length; i++){
        this[i] = array_in[i];
    }
    this.length = array_in.length;
}

// events [,selector] [,data], handler
JQ_obj.prototype.on = function(){
    if (this[0]==document){
        MarkAttackEntry('document_on_event', arguments[-1]);
    }  
}

JQ_obj.prototype.val = function(first_argument) {
    if (first_argument!=undefined){
        sink_function(first_argument, 'JQ_obj_val_sink');
        this[0].value = first_argument;
    }
    else{
        // return value of x
    }
};

JQ_obj.prototype.html = function(first_argument) {
    if (arguments.length >0){
        sink_function(first_argument, 'JQ_obj_html_sink');
        this[0].html = first_argument;
    }
    else{
        // return html of x
    }
};

JQ_obj.prototype.ready = function(first_argument) {
    if (this[0]==document){
        first_argument();
    }  
};

JQ_obj.prototype.remove = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.focus = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.click = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.attr = function(first_argument, second_argument) {
    this[0].first_argument = second_argument;
};

JQ_obj.prototype.find = function(first_argument) {
    var document_element = new Document_element();
    return new JQ_obj(undefined, document_element);
};

JQ_obj.prototype.filter = function(first_argument) {
    // do nothing
};

JQ_obj.prototype.keyup = function(first_argument) {
    first_argument();
};

JQ_obj.prototype.each = function(first_argument) {
    // for (var i=0; i<this.length; i++){
    //     first_argument.call(this[i]);
    // }
    first_argument.call(this[0]);
};



//  ========= Event ========= 
function Event(type){
    this.type = type;
}


// =========XMLHttpRequest======
function XMLHttpRequest(){};

XMLHttpRequest.prototype.open = function(method, url, async, user, psw){
    sink_function(url, 'XMLHttpRequest_url_sink');
};

// if msg is not none, used for POST requests
XMLHttpRequest.prototype.send = function(msg){
    if (msg!=undefined){
        sink_function(msg, 'XMLHttpRequest_post_sink');
    }
};


XMLHttpRequest.prototype.responseText = 'sensitive_responseText';
XMLHttpRequest.prototype.responseXML = 'sensitive_responseXML';
MarkSource(XMLHttpRequest.prototype.responseText, 'XMLHttpRequest_responseText_source');
MarkSource(XMLHttpRequest.prototype.responseXML, 'XMLHttpRequest_responseXML_source');


XHR = XMLHttpRequest;


function eval(para1){
    sink_function(para1, 'eval_sink');
}

function setTimeout(para1){

}

function URL(url, base){
    return base+url;
}
URL.prototype.createObjectURL = function(object){
    return object.toString()
} 


// original file:crx_headers/bg_header.js

// ========= port ========= 
function Port(info){
    if (info.includeTlsChannelId){
        this.includeTlsChannelId = info.includeTlsChannelId;
    }
    if (info.name){
        this.name = info.name;
    }
}

Port.prototype.onMessage = new Object();

Port.prototype.onMessage.addListener = function(myCallback){
    RegisterFunc("bg_port_onMessage", myCallback);
};

Port.prototype.postMessage = function(msg){
    TriggerEvent('bg_port_postMessage', {message:msg});
};


// ========= external port ========= 
function externalPort(info){
    this.includeTlsChannelId = "includeTlsChannelId";
    this.name = "name";
}

externalPort.prototype.onMessage = new Object();

externalPort.prototype.onMessage.addListener = function(myCallback){
    MarkAttackEntry('bg_external_port_onMessage', myCallback);
};

externalPort.prototype.postMessage = function(msg){
    sink_function(msg, 'bg_external_port_postMessage');
};


// ========= tab ========= 
function Tab(){
    this.active = true;
    this.audible = true;
    this.autoDiscardable = true;
    this.discarded = true;
    this.favIconUrl = 'https://example.com/image.png';
    this.groupId = 1;
    this.height =  600;
    this.highlighted = true;
    this.id = 99;
    this.incognito = false;
    this.index = 2;
    this.mutedInfo = {muted:false};
    this.openerTabId = 1;
    this.pendingUrl = 'https://example2.com';
    this.pinned = true;
    this.sessionId = '23';
    this.status = 'complete';
    this.title = 'example';
    this.url = 'https://example.com';
    this.width =  800;
    this.windowId = 14;
}

//  ========= chrome ========= 
function Chrome(){}

Chrome.prototype.runtime = new Object();
// for deprecated APIs
Chrome.prototype.extension = Chrome.prototype.runtime;  
Chrome.prototype.extension.onRequest = Chrome.prototype.runtime.onMessage;



Chrome.prototype.runtime.onInstalled = new Object();
// this function be called righrt after all the 
Chrome.prototype.runtime.onInstalled.addListener = function(myCallback) {
    var details = {is:99, previousVersion:'0.0.1', reason:'install'};
    myCallback(details);
};


Chrome.prototype.runtime.onConnect = new Object();
Chrome.prototype.runtime.onConnect.addListener = function(myCallback) {
  RegisterFunc("bg_chrome_runtime_onConnect", myCallback);
};


Chrome.prototype.runtime.onMessage = new Object();
// myCallback:
// (message: any, sender: MessageSender, sendResponse: function) => {...}
// get message from chrome.runtime.sendMessage or chrome.tabs.sendMessage
Chrome.prototype.runtime.onMessage.addListener = function(myCallback) {
    RegisterFunc('bg_chrome_runtime_onMessage', myCallback);
};
MessageSender = function(){
    this.frameId = 123;
    this.guestProcessId=456;
    this.guestRenderFrameRoutingId = 109;
    this.id = 0;
    this.nativeApplication = 'nativeApplication';
    this.origin = 'back';
    this.tab = new Tab();
    this.tlsChannelId = 'tlsChannelId';
    this.url = 'url';
};
function sendResponse(message_back){
    // var eventName = 'bg_chrome_runtime_onMessage_response';
    // var info = {message: message_back};
    TriggerEvent('bg_chrome_runtime_onMessage_response', {message: message_back});
};


// chrome.runtime.onMessage.removeListener
Chrome.prototype.runtime.onMessage.removeListener = function(myCallback) {
    UnregisterFunc('bg_chrome_runtime_onMessage', myCallback);
};

// chrome.runtime.onMessageExternal.addListener
Chrome.prototype.runtime.onMessageExternal = new Object();
// myCallback parameters: (message: any, sender: MessageSender, sendResponse: function) => {...}
Chrome.prototype.runtime.onMessageExternal.addListener = function(myCallback){
    // var type = 'bg_chrome_runtime_MessageExternal';
    MarkAttackEntry('bg_chrome_runtime_MessageExternal', myCallback);
}
MessageSenderExternal = function(){
    this.frameId = 123;
    this.guestProcessId=456;
    this.guestRenderFrameRoutingId = 109;
    this.id = 0;
    this.nativeApplication = 'nativeApplication';
    this.origin = 'external';
    this.tab = new Tab();
    this.tlsChannelId = 'tlsChannelId';
    this.url = 'url';
};
function sendResponseExternal(message_out){
    sink_function(message_out, 'sendResponseExternal_sink');
};

// chrome.runtime.onConnectExternal.addListener
Chrome.prototype.runtime.onConnectExternal = new Object();
// myCallback parameters: (message: any, sender: MessageSender, sendResponse: function) => {...}
Chrome.prototype.runtime.onConnectExternal.addListener = function(myCallback){
    // var type = 'bg_chrome_runtime_MessageExternal';
    MarkAttackEntry('bg_chrome_runtime_onConnectExternal', myCallback);
}

Chrome.prototype.runtime.connectNative = function(extensionId, connectInfo){
    // var eventName = 'cs_chrome_runtime_connect';
    if (connectInfo===undefined){
        var connectInfo = extensionId;
        var extensionId = undefined;
    }
    // var info = {extensionId:extensionId, connectInfo:connectInfo};
    return new externalPort(connectInfo);
};




Chrome.prototype.topSites = new Object();
Chrome.prototype.topSites.get = function(myCallback){
    var mostVisitedUrls_source = [{title:'title', url:'url'}];
    // mostVisitedUrls is sensitive data!
    MarkSource(mostVisitedUrls_source, 'topSites_source');
    myCallback(mostVisitedUrls_source);
};

// chrome.tabs.sendMessage(tabId: number, message: any, options: object, responseCallback: function)
// Chrome.prototype.tabs.sendMessage = function(tabId, message, options, responseCallback){
//     var eventName = 'bg_chrome_tabs_sendMessage';
//     var info =  {tabId:99, message:message, options:options, responseCallback:responseCallback};
//     TriggerEvent(eventName, info);
// };
// 
Chrome.prototype.tabs = new Object();
Chrome.prototype.tabs.sendMessage = function(tabId, message, responseCallback){
    // var eventName = 'bg_chrome_tabs_sendMessage';
    // var info =  {tabId:tabId, message:message, responseCallback:responseCallback};
    TriggerEvent('bg_chrome_tabs_sendMessage', {tabId:tabId, message:message, responseCallback:responseCallback});
};

// chrome.tabs.query(queryInfo: object, callback: function)
Chrome.prototype.tabs.query = function(queryInfo, callback){
    // queryInfo is to find corresponding tabs, ingore it now
    var tab = new Tab();
    var alltabs = [tab];
    callback(alltabs);
}

Chrome.prototype.tabs.getSelected = function(callback){
    var tab = new Tab();
    callback(tab);
}

Chrome.prototype.tabs.onActivated = new Object();
// the callback is called once a new tab is activated, we run the callback after all the others are set
Chrome.prototype.tabs.onActivated.addListener = function(myCallback){
    var activeInfo = new ActiveInfo();
    myCallback(activeInfo);
}

Chrome.prototype.tabs.onUpdated = new Object();
Chrome.prototype.tabs.onUpdated.addListener = function(myCallback){
    MarkAttackEntry('bg_tabs_onupdated', myCallback);
    // var tab = new Tab();
    // myCallback(99, {}, tab);
}

// for deprecated APIs
Chrome.prototype.tabs.onActiveChanged = Chrome.prototype.tabs.onActivated


// chrome.tabs.executeScript
Chrome.prototype.tabs.executeScript = function(tabid, details, callback){
    sink_function(tabid, 'chrome_tabs_executeScript_sink');
    sink_function(details, 'chrome_tabs_executeScript_sink');
    sink_function(callback, 'chrome_tabs_executeScript_sink');
    callback();
}


function ActiveInfo(){
    this.tabId = 3;
    this.windowId = 1;
};


// chrome.tabs.create
Chrome.prototype.tabs.create = function(createProperties, callback){
    sink_function(createProperties.url, 'chrome_tabs_create_sink');
    callback();
}
// chrome.tabs.update
Chrome.prototype.tabs.update = function(tabId, updateProperties, callback){
    sink_function(updateProperties.url, 'chrome_tabs_update_sink');
    callback();
}
// chrome.tabs.getAllInWindow
Chrome.prototype.tabs.getAllInWindow = function(winId, callback){
    var tab = new Tab();
    var tabs = [tab];
    callback(tabs);
}



Chrome.prototype.cookies = new Object();
// chrome.cookies.get(details: CookieDetails, callback: function)
Chrome.prototype.cookies.get = function(details, callback){
    var cookie_source = {domain:'cookie_domain', expirationDate:2070, hostOnly:true, httpOnly: false, name:'cookie_name', path:'cookie_path',sameSite:'no_restriction', secure:true, session: true, storeId:'cookie_storeId', value: 'cookie_value' };
    MarkSource(cookie_source, 'cookie_source')
    callback(cookie_source);
};

// chrome.cookies.getAll(details: object, callback: function)
Chrome.prototype.cookies.getAll = function(details, callback){
    var cookie_source = {domain:'.uspto.gov', expirationDate:2070, hostOnly:true, httpOnly: false, name:'cookie_name', path:'cookie_path',sameSite:'no_restriction', secure:true, session: true, storeId:'cookie_storeId', value: 'cookie_value' };
    var cookies_source = [cookie_source];
    MarkSource(cookies_source, 'cookies_source')
    callback(cookies_source);
};


// chrome.cookies.getAllCookieStores(callback: function)
Chrome.prototype.cookies.getAllCookieStores = function(callback){
    var CookieStore_source = {id:'cookiestore_id', tabIds:[0,1,2,3]};
    var CookieStores_source = [CookieStore_source];
    MarkSource(CookieStores_source, 'CookieStores_source')
    callback(CookieStores_source);
};

// chrome.cookies.getAllCookieStores(callback: function)
Chrome.prototype.cookies.set = function(details, callback){
    sink_function(details, 'chrome_cookies_set_sink');

};

Chrome.prototype.cookies.remove = function(details, callback){
    sink_function(details, 'chrome_cookies_remove_sink');
    callback(details);
}



Chrome.prototype.storage = new Object();
Chrome.prototype.storage.sync = new Object();
Chrome.prototype.storage.sync.get = function(key, callback){
    var storage_sync_get_source = {'key':'value'};
    MarkSource(storage_sync_get_source, 'storage_sync_get_source');
    callback(storage_sync_get_source);
};

Chrome.prototype.storage.sync.set = function(key, callback){
    sink_function(key, 'chrome_storage_sync_set_sink');
    callback();
};

Chrome.prototype.storage.sync.remove = function(key, callback){
    sink_function(key, 'chrome_storage_sync_remove_sink');
    callback();
};

Chrome.prototype.storage.sync.clear = function(callback){
    sink_function('chrome_storage_sync_clear_sink');
    callback();
};


Chrome.prototype.storage.local = new Object();
Chrome.prototype.storage.local.get = function(key, callback){
    var storage_local_get_source = {'key':'value'};
    MarkSource(storage_local_get_source, 'storage_local_get_source');
    arguments[len(arguments)-1](storage_local_get_source);
};

Chrome.prototype.storage.local.set = function(key, callback){
    sink_function(key, 'chrome_storage_local_set_sink');
    callback();
};

Chrome.prototype.storage.local.remove = function(key, callback){
    sink_function(key, 'chrome_storage_local_remove_sink');
    callback();
};

Chrome.prototype.storage.local.clear = function(callback){
    sink_function('chrome_storage_local_clear_sink');
    callback();
};



Chrome.prototype.history = new Object();
Chrome.prototype.history.search = function(query, callback){
    var HistoryItem = {id:'id for history item' ,lastVisitTime:1000 ,title:'title of history page' , typedCount:3, url:'https://example.com' , visitCount:2   };
    var HistoryItem_source = [HistoryItem];
    MarkSource(HistoryItem_source, 'HistoryItem_source');
    callback(HistoryItem_source);
};


Chrome.prototype.history.getVisits = function(details, callback){
    var VisitItem = {id:'id for the item' ,referringVisitId: 'referringVisitIdvfdsv', transition:'auto_bookmark' ,visitId:'visitIdvfsv', visitTime:1001};
    var VisitItem_source = [VisitItem];
    MarkSource(VisitItem_source, 'VisitItem_source');
    callback(VisitItem_source);
};

Chrome.prototype.downloads = new Object();
Chrome.prototype.downloads.search = function(query, callback){
    var DownloadItem = {byExtensionId:'id for the extension', byExtensionName:'name for the extension'};
    var DownloadItem_source = [DownloadItem];
    MarkSource(DownloadItem_source, 'DownloadItem_source');
    callback(DownloadItem_source);
};


Chrome.prototype.downloads.download = function(options, callback){
    sink_function(options, 'chrome_downloads_download_sink');
}

Chrome.prototype.downloads.getFileIcon = function(downloadId, callback){
    var iconURL = 'https://example.com/image.png';
    var iconURL_source = iconURL;
    MarkSource(iconURL_source, 'iconURL_source');
    callback(iconURL_source);
};

// Remove the downloaded file if it exists and the DownloadItem is complete
Chrome.prototype.downloads.removeFile = function(downloadId, callback) {
    sink_function(downloadId, 'chrome_downloads_removeFile_sink');
    // body...
}

// Erase matching DownloadItem from history without deleting the downloaded file.
Chrome.prototype.downloads.erase = function(query, callback) {
    sink_function(query, 'chrome_downloads_erase_sink');
    // body...
}

// chrome.windows
Chrome.prototype.windows = new Object();
Chrome.prototype.windows.getCurrent = function(callback){
    var win = {id:"id"};
    callback(win);
};



function BookmarkTreeNode(){
    this.children = [];
    this.dataAdded= 10;
    this.dateGroupModified=1;
    this.id='id for the node';
    this.index=2;
    this.parentId='id for the parent';
    this.title = 'title of the node';
    this.unmodifiable = 'managed';
    this.url = 'http://www.example.com';
}


// chrome.bookmarks.getTree(function(data)
Chrome.prototype.bookmarks = new Object(); 
Chrome.prototype.bookmarks.getTree = function(callback){
    var node = new BookmarkTreeNode();
    var child = new BookmarkTreeNode();
    node.children = [child];
    var BookmarkTreeNode_source = [node];
    MarkSource(BookmarkTreeNode_source, 'BookmarkTreeNode_source');
    callback(BookmarkTreeNode_source);
}


Chrome.prototype.webRequest = new Object();
Chrome.prototype.webRequest.onBeforeSendHeaders = new Object();
// Fired before sending an HTTP request
// chrome.webRequest.onBeforeSendHeaders.addListener(listener: function)
// MDN:
// browser.webRequest.onBeforeSendHeaders.addListener(
//   listener,             //  function
//   filter,               //  object
//   extraInfoSpec         //  optional array of strings
// )
Chrome.prototype.webRequest.onBeforeSendHeaders.addListener = function(myCallback, filter, extraInfoSpec){

}


// chrome.alarms
Chrome.prototype.alarms = new Object();
Chrome.prototype.alarms.clearAll = function(callback){}
Chrome.prototype.alarms.create = function(name, alarmInfo){}
Chrome.prototype.alarms.onAlarm.addListener = function(callback){}


// chrome.browsingData.remove

Chrome.prototype.browsingData = new Object();
Chrome.prototype.browsingData.remove = function(para1, prara2, para3){
    sink_function('chrome_browsingData_remove_sink');
}

Chrome.prototype.management = new Object();
Chrome.prototype.management.getAll = function(callback){
    var ExtensionInfos = [{"description":"description", "enabled":true}];
    MarkSource(ExtensionInfos, "management_getAll_source");
    callback(ExtensionInfos);
}

Chrome.prototype.management.getSelf = function(callback){
    var ExtensionInfos = [{"description":"description", "enabled":true}];
    MarkSource(ExtensionInfos, "management_getSelf_source");
    callback(ExtensionInfos);
}

// chrome.management.setEnabled(
Chrome.prototype.management.setEnabled = function(id, enabled, callback){
    sink_function(id, "management_setEnabled_id");
    sink_function(enabled, "management_setEnabled_enabled");
    callback();
}

Chrome.prototype.permissions = new Object();
Chrome.prototype.permissions.contains = function(permissions, callback){
    callback(true);
}
Chrome.prototype.permissions.request = function(permissions, callback){
    callback(true);
}


chrome = new Chrome();
_ = chrome;
chrome.experimental.cookies = chrome.cookies;
browser = chrome;
/////////
// original file:/Users/jianjia/Documents/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/UserSettings.js

var userSettings = {
    extensionHasJustUpdated: false,
    localStorageMustBeCleared: false,
    userGender: 'men',
    userMaxHr: 185,
    userRestHr: 50,
    userFTP: 300,
    userHrrZones: [
        {
            fromHrr: 0,
            toHrr: 30,
        },
        {
            fromHrr: 30,
            toHrr: 50,
        },
        {
            fromHrr: 50,
            toHrr: 60,
        },
        {
            fromHrr: 60,
            toHrr: 70,
        },
        {
            fromHrr: 70,
            toHrr: 80,
        },
        {
            fromHrr: 80,
            toHrr: 90,
        },
        {
            fromHrr: 90,
            toHrr: 100,
        },
        {
            fromHrr: 100,
            toHrr: 110,
        }
    ],
    zones: {
        speed: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 18
        }, {
            from: 18,
            to: 21
        }, {
            from: 21,
            to: 24
        }, {
            from: 24,
            to: 27
        }, {
            from: 27,
            to: 30
        }, {
            from: 30,
            to: 33
        }, {
            from: 33,
            to: 36
        }, {
            from: 36,
            to: 39
        }, {
            from: 39,
            to: 42
        }, {
            from: 42,
            to: 45
        }, {
            from: 45,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 75
        }, {
            from: 75,
            to: 999
        }],
        pace: [{
            from: 0,
            to: 180
        }, {
            from: 180,
            to: 200
        }, {
            from: 200,
            to: 220
        }, {
            from: 220,
            to: 240
        }, {
            from: 240,
            to: 260
        }, {
            from: 260,
            to: 280
        }, {
            from: 280,
            to: 300
        }, {
            from: 300,
            to: 320
        }, {
            from: 320,
            to: 340
        }, {
            from: 340,
            to: 360
        }, {
            from: 360,
            to: 390
        }, {
            from: 390,
            to: 420
        }, {
            from: 420,
            to: 450
        }, {
            from: 450,
            to: 480
        }, {
            from: 480,
            to: 600
        }, {
            from: 600,
            to: 720
        }, {
            from: 720,
            to: 900
        }, {
            from: 900,
            to: 1200
        }, {
            from: 1200,
            to: 1800
        }, {
            from: 1800,
            to: 3599
        }],
        power: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 25
        }, {
            from: 25,
            to: 50
        }, {
            from: 50,
            to: 75
        }, {
            from: 75,
            to: 100
        }, {
            from: 100,
            to: 125
        }, {
            from: 125,
            to: 150
        }, {
            from: 150,
            to: 175
        }, {
            from: 175,
            to: 200
        }, {
            from: 200,
            to: 225
        }, {
            from: 225,
            to: 250
        }, {
            from: 250,
            to: 275
        }, {
            from: 275,
            to: 300
        }, {
            from: 300,
            to: 350
        }, {
            from: 350,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 750
        }, {
            from: 750,
            to: 1000
        }, {
            from: 1000,
            to: 1500
        }, {
            from: 1500,
            to: 9999
        }],
        cyclingCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 55
        }, {
            from: 55,
            to: 60
        }, {
            from: 60,
            to: 65
        }, {
            from: 65,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 95
        }, {
            from: 95,
            to: 100
        }, {
            from: 100,
            to: 105
        }, {
            from: 105,
            to: 110
        }, {
            from: 110,
            to: 120
        }, {
            from: 120,
            to: 150
        }],
        runningCadence: [{
            from: 0,
            to: 1
        }, {
            from: 1,
            to: 10
        }, {
            from: 10,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 45
        }, {
            from: 45,
            to: 48
        }, {
            from: 48,
            to: 51
        }, {
            from: 51,
            to: 54
        }, {
            from: 54,
            to: 57
        }, {
            from: 57,
            to: 60
        }, {
            from: 60,
            to: 63
        }, {
            from: 63,
            to: 66
        }, {
            from: 66,
            to: 70
        }, {
            from: 70,
            to: 75
        }, {
            from: 75,
            to: 80
        }, {
            from: 80,
            to: 85
        }, {
            from: 85,
            to: 90
        }, {
            from: 90,
            to: 100
        }, {
            from: 100,
            to: 120
        }],
        grade: [{
            from: -100,
            to: -50
        }, {
            from: -50,
            to: -30
        }, {
            from: -30,
            to: -20
        }, {
            from: -20,
            to: -15
        }, {
            from: -15,
            to: -12
        }, {
            from: -12,
            to: -9
        }, {
            from: -9,
            to: -6
        }, {
            from: -6,
            to: -3
        }, {
            from: -3,
            to: -1
        }, {
            from: -1,
            to: 1
        }, {
            from: 1,
            to: 3
        }, {
            from: 3,
            to: 6
        }, {
            from: 6,
            to: 9
        }, {
            from: 9,
            to: 12
        }, {
            from: 12,
            to: 15
        }, {
            from: 15,
            to: 20
        }, {
            from: 20,
            to: 30
        }, {
            from: 30,
            to: 40
        }, {
            from: 40,
            to: 50
        }, {
            from: 50,
            to: 100
        }],
        elevation: [{
            from: 0,
            to: 50
        }, {
            from: 50,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 1000
        }, {
            from: 1000,
            to: 1250
        }, {
            from: 1250,
            to: 1500
        }, {
            from: 1500,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 3000
        }, {
            from: 3000,
            to: 3500
        }, {
            from: 3500,
            to: 4000
        }, {
            from: 4000,
            to: 5000
        }, {
            from: 5000,
            to: 6000
        }, {
            from: 6000,
            to: 8848
        }],
        ascent: [{
            from: 0,
            to: 10
        }, {
            from: 10,
            to: 100
        }, {
            from: 100,
            to: 200
        }, {
            from: 200,
            to: 300
        }, {
            from: 300,
            to: 400
        }, {
            from: 400,
            to: 500
        }, {
            from: 500,
            to: 600
        }, {
            from: 600,
            to: 700
        }, {
            from: 700,
            to: 800
        }, {
            from: 800,
            to: 900
        }, {
            from: 900,
            to: 1000
        }, {
            from: 1000,
            to: 1100
        }, {
            from: 1100,
            to: 1200
        }, {
            from: 1200,
            to: 1300
        }, {
            from: 1300,
            to: 1400
        }, {
            from: 1400,
            to: 1500
        }, {
            from: 1500,
            to: 1750
        }, {
            from: 1750,
            to: 2000
        }, {
            from: 2000,
            to: 2500
        }, {
            from: 2500,
            to: 5000
        }]
    },
    remoteLinks: true,
    feedAutoScroll: true,
    defaultLeaderboardFilter: 'overall',
    activateRunningGradeAdjustedPace: true,
    activateRunningHeartRate: true,
    activityGoogleMapType: 'satellite',
	customMapboxStyle: 'mapbox.outdoors',
    hidePremiumFeatures: true,
    displaySegmentRankPercentage: true,
    displayNearbySegments: true,
    displayMotivationScore: true,
    displayActivityRatio: true,
    displayAdvancedPowerData: true,
    displayAdvancedSpeedData: true,
    displayAdvancedHrData: true,
    displayCadenceData: true,
    displayAdvancedGradeData: true,
    displayAdvancedElevationData: true,
    displayBikeOdoInActivity: true,
    enableBothLegsCadence: false,
    feedHideChallenges: false,
    feedHideCreatedRoutes: false,
    highLightStravistiXFeature: false, // For heartrate related data.
    displaySegmentTimeComparisonToKOM: true,
    displaySegmentTimeComparisonToPR: true,
    reviveGoogleMaps: true,
    reviveGoogleMapsLayerType: 'hybrid',
    displayActivityBestSplits: true,
    bestSplitsConfiguration: null,
    temperatureUnit: 'C',
    windUnit: 'km/h',
};

// original file:/Users/jianjia/Documents/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/StravistiX.js

//env.debugMode>0   && console.info('Begin     StravistiX.js');
//  \--- this line should't be here, because then BestSplits and Updated message don't work. No idea why?!?!?
/**
 *   StravistiX is responsible of linking processors with modfiers and user settings/health data
 *






/*    check for correct working with following acitivities:

      Downhill < Mostly Down < Flat < Mostly Flat < A Bit Hilly <  Hilly  < Very Hilly < Mountanous < Alpine

                                                StravaType      Streams                         Comment                                 Problems
Bike:                                           ______________  ______________________________  ______________________________________  ____________________________________________
~~~~~                                           
https://www.strava.com/activities/423623105     Ride            (GPS)                           downhill      ANT

https://www.strava.com/activities/122932386     Ride            (GPS, HR, cadence)              mostly down   My

https://www.strava.com/activities/338896255     Ride            (GPS, power, HR, cadence, T)    flat          Marcel Wyss TdF TT
https://www.strava.com/activities/339726290     Ride            (GPS, power, HR, cadence, T)    flat          Marcel Wyss TdF 2

https://www.strava.com/activities/355194013     Ride            (GPS, power, HR, cadence, T)    mostly flat   Marcel Wyss TdF 21

https://www.strava.com/activities/342465523     Ride            (GPS, power, HR, cadence, T)    a bit hilly   Marcel Wyss TdF 6

https://www.strava.com/activities/340423634     Ride            (GPS, power, HR, cadence, T)    hilly         Marcel Wyss TdF 3
https://www.strava.com/activities/275555059     Ride            (GPS, HR, cadence)              hilly         TTR
https://www.strava.com/activities/155030220     Ride            (GPS)                           hilly         Tojzl						* badQ gps -> VAM calculations not good
https://www.strava.com/activities/69193942      Ride            (GPS)                           hilly         trikotna

https://www.strava.com/activities/145492114     Ride            (GPS)                           very hilly    avcar
https://www.strava.com/activities/345973208     Ride            (GPS, power, HR, cadence, T)    very hilly    Wyss TdF 10

https://www.strava.com/activities/441531034     Ride            (GPS*, HR, cadence) *baro       mountainous   My Ri
https://www.strava.com/activities/347389644     Ride            (GPS, power, HR, cadence, T)    mountainous   Marcel Wyss TdF 12
https://www.strava.com/activities/344723361     Ride            (GPS*, HR, cadence) *baro       mountainous   My

https://www.strava.com/activities/353116695     Ride            (GPS, power, HR, cadence, T)    alpine        Marcel Wyss TdF 19


Bike - stationary: (with GPS)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
https://www.strava.com/activities/443325145     Workout         (*GPS*, power, HR, cadence, T)  GPS, but really stationary   Elle
                                                                                                -> avg_velocity << 1 (velocity_avgThreshold ~ 0.5)

Bike - trainer: (no GPS)
~~~~~~~~~~~~~~~~~~~~~~~~
https://www.strava.com/activities/442775904     Workout         (HR, cadence, power, speed)     on trainer - with speed  Julian
https://www.strava.com/activities/442206536     Workout         (HR, cadence, power)            on trainer - no speed    Denzyl			* pedaling time shows 0, elapsed and moving time bad



Run:
~~~~
https://www.strava.com/activities/255144956     Run             (GPS, HR, cadence)              downhill      My
*https://www.strava.com/activities/249069073    Run             (GPS, HR, cadence)              downhill      My                        UP grade avg shows negative?

https://www.strava.com/activities/245769754     Run             (GPS, HR, cadence)              mostly down   My

https://www.strava.com/activities/200732119     Run             (GPS, HR, cadence)              flat          My Banovci

https://www.strava.com/activities/325514295     Run             (GPS, HR, cadence)              mostly flat   My Tek trojk				*RACE* elaped and moving time 0 until reload at overview
https://www.strava.com/activities/429614312     Run             (GPS, HR, cadence)              mostly flat   My
https://www.strava.com/activities/152922062     Run             (GPS, HR, cadence)              mostly flat   My nabreje

https://www.strava.com/activities/307138432     Run             (GPS, HR, cadence)              a bit hilly   My park, 3r

https://www.strava.com/activities/442681892     Run             (GPS, HR, cadence)              hilly         My panorama
https://www.strava.com/activities/107829725     Run             (GPS, HR, cadence)              hilly         My 2x Kalvarija
https://www.strava.com/activities/107829727     Run             (GPS, HR, cadence)              hilly         My 3x Kalvarija
https://www.strava.com/activities/159495959     Run             (GPS, HR, cadence)              hilly         My proti obr. domu

https://www.strava.com/activities/235711434     Run             (GPS, HR, cadence)              very hilly    My zppp, stolp, ani

https://www.strava.com/activities/380222430     Run             (GPS, HR, cadence)              mountainous   My trail maraton 22km		*RACE* elaped and moving time 0 until reload at overview
https://www.strava.com/activities/379977674     Run             (GPS, HR, cadence, T)           mountainous   Balazs Trail Maraton 42km

*alpine*


Hike (*** hike=run ***)
~~~~~
https://www.strava.com/activities/119185669     hike            (GPS, HR, cadence)              dowhnill

* mostly down *

https://www.strava.com/activities/83625036      hike            (only GPS) / badQ GPS           flat           My Vrbanski plato

https://www.strava.com/activities/83623294      hike            (only GPS) / badQ GPS           mostly flat    My LJ

* a bit hilly *

https://www.strava.com/activities/83625038      hike            (only GPS)                      hilly (could also be a bit hilly) my

https://www.strava.com/activities/214252443     hike            (GPS, HR, cadence)              hilly          My trikotna

* very hilly *

https://www.strava.com/activities/433810631     hike            (GPS, power, HR, cadence, T)    mountainous

* alpine *



Row: (on trainer)
~~~~~~~~~~~~~~~~~
https://www.strava.com/activities/269549200     StationaryOther (HR, cadence)


Backcountry Ski
~~~~~~~~~~~~~~~~~
https://www.strava.com/activities/463519034








Console Activity Data Access examples:
================================================================================
$.browser
this
this.parent
document
strava
Strava

env

*globals:
RPENote
StravaStreams
GlobalActivityStatsMap
globalActivityAnalysisData
globalActivityStreams


stravistiX                 this.stravistiX
stravistiX.athleteName_
stravistiX.userSettings_
stravistiX.appResources_
stravistiX.vacuumProcessor_.getActivityCommonStats()
stravistiX.vacuumProcessor_.getActivityCommonStats().elapsedTime
VacuumProcessor.prototype.getActivityCommonStats()
VacuumProcessor.prototype.getActivityCommonStats().elapsedTime

stravistiX.activityProcessor_
stravistiX.activityProcessor_.zones			zone distribution (ascent, cadence, elevation, grade, pace, power, speed)
stravistiX.activityProcessor_.userHrrZones_	zone distribution HRR

Helper.hrPercentFromHeartrate(90,180)

activityName
currentAthlete.attributes
pageView.activityAthlete().attributes
pageView.activity().attributes
pageView
pageView.streams().streamData.data.altitude
pageView.streams().attributes.altitude


this.lightboxdata.title
pageView.lightboxData()
pageView.lightboxData().title

this.version	??? v2.2
?activityProcessor.activityStream      - streams					   - accessible if not cached
?activityProcessor.activityStatsMap    - common stats (from vacuum) - accessible if not cached
================================================================================
http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/





 */
function StravistiX(userSettings, appResources) {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        this.userSettings_              = userSettings;
        this.appResources_              = appResources;
        this.extensionId_               = this.appResources_.extensionId;


        this.vacuumProcessor_           = new VacuumProcessor();
        this.activityProcessor_         = new ActivityProcessor(this.vacuumProcessor_, this.userSettings_.userHrrZones, this.userSettings_.zones);


		// first get basic info about athlete
        this.athleteId_                 = this.vacuumProcessor_.getAthleteId();
        this.athleteName_               = this.vacuumProcessor_.getAthleteName();
        this.isPremium_                 = this.vacuumProcessor_.getPremiumStatus();
        this.isPro_                     = this.vacuumProcessor_.getProStatus();



	if (window.location.pathname.match(/^\/activities/)) {
env.debugMode>0   && console.debug("----------------------------   Activity Page");



		// get basic activity info only if we're on activity page
//        this.athleteIdAuthorOfActivity_ = this.vacuumProcessor_.getAthleteIdAuthorOfActivity();
        this.activityAthleteId_ = this.vacuumProcessor_.getAthleteIdAuthorOfActivity();
        this.activityId_                = this.vacuumProcessor_.getActivityId();
        this.activityName_              = this.vacuumProcessor_.getActivityName();
        this.activityTime_              = this.vacuumProcessor_.getActivityTime();
		this.activityType_				= this.vacuumProcessor_.getActivityType();

if (env.debugMode>0 && (typeof pageView !== 'undefined')) console.debug( "Activity: " + pageView.activity().get('type') + " (" + pageView.activity().get('id') + ")" );
if (env.debugMode>0 && (typeof pageView !== 'undefined')) if( pageView.activityAthlete() != null ) console.debug( "Athlete:  " + pageView.activityAthlete().get('display_name') + " (" + pageView.activityAthlete().get('id') + ")" );
env.debugMode>0   && console.debug("-----------------------");



	} else if (window.location.pathname.match(/^\/segments/)) {
env.debugMode>0   && console.debug("-----------------------        Segments Page");



	} else {
env.debugMode>0   && console.debug("-----------------------");
	}



    // Make the work...
    this.init_();
    


} // StravistiX




/**
 *   Static vars
 */
StravistiX.getFromStorageMethod = 'getFromStorage';
StravistiX.setToStorageMethod = 'setToStorage';
StravistiX.defaultIntervalTimeMillis = 750;





/**
 * Define prototype
 */
StravistiX.prototype = {



//  --------------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    init_: function init_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )



        // Redirect app.strava.com/* to www.strava.com/*
        if (this.handleForwardToWWW_()) {
            return; // Skip rest of init to be compliant with www.strava.com/* on next reload
        }



        // Handle some tasks to od when update occurs
        if (this.userSettings_.extensionHasJustUpdated || env.forceUpdated) {
            this.handleExtensionHasJustUpdated_();
        }



        if (env.preview) {
            this.handlePreviewRibbon_();
        }



        if (this.userSettings_.localStorageMustBeCleared) {
            localStorage.clear();
            Helper.setToStorage(this.extensionId_, StorageManager.storageSyncType, 'localStorageMustBeCleared', false, function(response) {
                console.log('localStorageMustBeCleared is now ' + response.data.localStorageMustBeCleared);
            });
        }



        // Common
env.debugMode>0   && console.debug('\n > (f: StravistiX.js) >   COMMON   < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] + '\n\n')
        this.handleMenu_();
        this.handleRemoteLinks_();
        this.handleWindyTyModifier_();
        this.handleActivityScrolling_();
        this.handleDefaultLeaderboardFilter_();
        this.handleSegmentRankPercentage_();
        this.handleActivityGoogleMapType_();
        this.handleCustomMapboxStyle_();
        this.handleHidePremium_();
        this.handleHideFeed_();
        this.handleDisplayFlyByFeedModifier_();





                //
        this.handleExtendedActivityData_();
                //





        // Bike
env.debugMode>0   && console.debug(' > (f: StravistiX.js) >   BIKE   < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
        this.handleNearbySegments_();
        this.handleActivityBikeOdo_();
        this.handleActivitySegmentTimeComparison_();
        this.handleActivityBestSplits_();



        // Run
env.debugMode>0   && console.debug(' > (f: StravistiX.js) >   RUN   < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
        this.handleRunningGradeAdjustedPace_();
        this.handleRunningHeartRate_();
        this.handleMoveFooterOutofWay_();



        // All activities
env.debugMode>0   && console.debug(' > (f: StravistiX.js) >   ALL   < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
        this.handleActivityQRCodeDisplay_();
        this.handleVirtualPartner_();
        this.handleAthletesStats();



        // Must be done at the end
env.debugMode>0   && console.debug(' > (f: StravistiX.js) >   FINAL   < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
        this.handleTrackTodayIncommingConnection_();
        this.handleGoogleMapsComeBackModifier();



    }, // init_
    /**
     *
     */
//  --------------------------------------------------------------------------------------------------------------------





    /**
     *
     */
    handleForwardToWWW_: function handleForwardToWWW() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (_.isEqual(window.location.hostname, 'app.strava.com')) {
            var forwardUrl = window.location.protocol + "//www.strava.com" + window.location.pathname;
            window.location.href = forwardUrl;
            return true;
        }
        return false;
    },



    /**
     *
     */
    handleExtensionHasJustUpdated_: function handleExtensionHasJustUpdated_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )


        // Clear localstorage
        // Especially for activies data stored in cache
        localStorage.clear(); sessionStorage.clear();
        console.info("Extension Has Updated ->   !!!   localstorage cleared   !!!");


        if (!window.location.pathname.match(/^\/dashboard/)) {
            return;
        }


        // Display ribbon update message
        this.handleUpdateRibbon_();


        // Send update info to ga
        var updatedToEvent = {
            categorie: 'Exploitation',
            action: 'updatedVersion',
            name: this.appResources_.extVersion
        };

        _spTrack('send', 'event', updatedToEvent.categorie, updatedToEvent.action, updatedToEvent.name);
        _spTrack('send', 'event', updatedToEvent.categorie, updatedToEvent.action, updatedToEvent.name+'_'+this.athleteName_+ ' #' + this.athleteId_,1);


        // Now mark extension "just updated" to false...
        Helper.setToStorage(this.extensionId_, StorageManager.storageSyncType, 'extensionHasJustUpdated', false, function(response) {});
    },



    /**
     *   update message popup can be started with: "StravistiX.prototype.handleUpdateRibbon_()"
     */
    handleUpdateRibbon_: function handleUpdateRibbon_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

//        var title = 'StraTistiX updated/installed to <strong>v' + this.appResources_.extVersion + '</strong>';
        var title = 'StraTistiX recently updated to v2.3.2';
        var message = '';
    message += "<font size=+0>"
        message += "- IMPROVED grade/VAM analysis and flat/uphill/downhill estimates<br/>"
        message += "- Added VAM, ascent time and max negative grade to overview table<br/>"
        message += "- FIX small bug in HR data analysis (resulted wrong HR export to CSV)<br/>"
        message += "- FIX Stationary workouts with altitude, but no distance data<br/>"
    message += "</font><br/>"

        message += "<font size=-1><strong>Known problems/workarounds:</strong><br/>"
        message += "- if TRIMP/aRPEe charts doesn't show right away, just refresh the page!<br/>"
        message += "&nbsp&nbsp(race or other workouts that don't show overview page as default)<br/>"
        message += "- exporting to CSV fails for very long workouts<br/>"
        message += "- after CROPping activity clear local cache to get updated results<br/>"
        message += "&nbsp&nbsp(right-click StraTistiX release notes in StraTistiX menu)<br/>"
        message += "</font><br/>"
        
        message += "<br/></font>"
        message += "<font size=+0><strong>Important changes from previous updates:</strong></font><br><font size=-1>";
        message += "- <strong/>graphic aRPEe Zones</strong/> (~TRIMP/hour) % and minute distribution!<br/>"
        message += "- heart rate extended statistics returned to <strong/>total elapsed time</strong/>, from moving time<br/>"
        message += "- <strong/>MapFlippers</strong/> working again after Strava's changes that made them unfunctional<br/>"
        message += "- more extended statistics view data<br/>"
        message += "- fine-tuned some default zones<br/>"
        message += "- Added CSV export (for easy analysis in spreadsheet software)<br/>"
        message += "- Added Ascent speed statistics (VAM)<br/>"
        message += "- Improved 'Best Splits' - click to highlight the part of activity they represent!<br/>"
        message += "- Weather unis preferences<br/>"
        message += "- statistics now computed on <strong>weighted percentiles</strong><br/>"
        message += "- improved grade profile word description<br>"
        message += "- Added year progression (activity count, distance, elevation, time) table and chart<br>"
        message += "- Added 'Best Splits' (distance, time, elevation, hr,...) to biking activities<br>"
        message += "- export of segments as Virtual Partner (cycling: button under segment compare)<br>"
        message += "- Added segment builder link to segments page<br>"
        message += "- Added biking segment time comparisons to KOM's and PR's<br>"
        message += "- Added weather at activity date/time (wind/temp/clouds/humidity)<br>"
        message += "- more analysis data (climbing time and speed, pedalling time,...)<br>"
        message += "- Searchable common settings<br>"

//        message += "</h4>";
//        message += "<h4><strong>BUGFIXES:</strong></h4><h5>";
//        message += "- bugfix<br/>"
//        message += "</h5><br>";

        message += "<br><br><div align='center'>";
        message += "<h4>This is <strong><a href='https://chrome.google.com/webstore/detail/stratistix-with-arpee-sco/bilbbbdgdimchenccmooakpfomfajepd'>StraTistiX</a></strong> - Dejan Kamensek's <a href='https://github.com/KamensekD/StraTistiX/wiki'>fork</a> of <a href='https://chrome.google.com/webstore/detail/stravistix-for-strava/dhiaggccakkgdfcadnklkbljcgicpckn'>StravistiX</a><br>";
        message += '<div align><font size=-1>Original StravistiX is being developed by Thomas Champagne</font></h4></div>';
//        message += '<h4><a target="_blank" href="' + this.appResources_.settingsLink + '#/donate">Donate Thomas Champagne to get more features</a></h4>';

        $.fancybox('<h2>' + title + '</h2>' + message);
    },




    /**
     *
     */
    handleAthletesStats: function handleAthletesStats() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // If we are not on the athletes page then return...
        if (!window.location.pathname.match(new RegExp("/athletes/" + this.athleteId_ + "$", "g"))) {
            return;
        }

        var athleteStatsModifier = new AthleteStatsModifier(this.appResources_);
        athleteStatsModifier.modify();
    },



    /**
     *
     */
    handlePreviewRibbon_: function handlePreviewRibbon_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
        var globalStyle = 'background-color: #FFF200; color: rgb(84, 84, 84); font-size: 12px; padding: 5px; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; text-align: center;';
        var html = '<div id="updateRibbon" style="' + globalStyle + '"><strong>WARNING</strong> You are running a preview of <strong>StravistiX</strong>, to remove it, open a new tab and type <strong>chrome://extensions</strong></div>';
        $('body').before(html);
    },



    /**
     *
     */
    handleMenu_: function handleMenu_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        var menuModifier = new MenuModifier(this.athleteId_, this.userSettings_.highLightStravistiXFeature, this.appResources_);
        menuModifier.modify();
    },



    /**
     *
     */
    handleRemoteLinks_: function handleRemoteLinks_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // If we are not on a segment or activity page then return...
//        if (!window.location.pathname.match(/^\/segments\/(\d+)$/) && !window.location.pathname.match(/^\/activities/)) {
        if (!window.location.pathname.match(/^\/segments\/(\d+)$/) && !window.location.pathname.match(/^\/activities/) && !window.location.pathname.match(/^\/publishes\/wizard\\?/)) {
            return;
        }

        if (!this.userSettings_.remoteLinks) {
            return;
        }

        var remoteLinksModifier = new RemoteLinksModifier(this.userSettings_.highLightStravistiXFeature, this.appResources_, (this.activityAthleteId_ === this.athleteId_), this.userSettings_.customMapboxStyle);
        remoteLinksModifier.modify();
    },



    /**
     *
     */
    handleWindyTyModifier_: function handleWindyTyModifier_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // If we are not on a segment or activity page then return...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        if (!window.pageView) {
            return;
        }

        // Avoid running Extended data at the moment
        if (window.pageView.activity().get('type') != "Ride") {
            return;
        }

        // If home trainer skip (it will use gps data to locate weather data)
        if (window.pageView.activity().get('trainer')) {
            return;
        }

        var windyTyModifier = new WindyTyModifier(this.activityId_, this.appResources_, this.userSettings_);
        windyTyModifier.modify();
    },



    /**
     *
     */
    handleActivityScrolling_: function handleActivityScrolling_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.feedAutoScroll) {
            return;
        }

        var activityScrollingModifier = new ActivityScrollingModifier();
        activityScrollingModifier.modify();
    },



    /**
     *
     */
    handleDefaultLeaderboardFilter_: function handleDefaultLeaderboardFilter_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // If we are not on a segment or activity page then return...
        if (!window.location.pathname.match(/^\/segments\/(\d+)$/) && !window.location.pathname.match(/^\/activities/)) {
            return;
        }

        // Kick out if we are not on SegmentLeaderboardView
        try {
            eval('Strava.Labs.Activities.SegmentLeaderboardView');
        } catch (err) {
env.debugMode>0   && console.log('Kick out no Strava.Labs.Activities.SegmentLeaderboardView available');
            return;
        }

        var defaultLeaderboardFilterModifier = new DefaultLeaderboardFilterModifier(this.userSettings_.defaultLeaderboardFilter);
        defaultLeaderboardFilterModifier.modify();
    },



    /**
     *
     */
    handleSegmentRankPercentage_: function handleSegmentRankPercentage_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.displaySegmentRankPercentage) {
            return;
        }

        // If we are not on a segment page then return...
        if (!window.location.pathname.match(/^\/segments\/(\d+)$/)) {
            return;
        }

        var segmentRankPercentage = new SegmentRankPercentageModifier();
        segmentRankPercentage.modify();
    },



    /**
     *
     */
    handleActivityGoogleMapType_: function handleActivityGoogleMapType_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        var activityGoogleMapTypeModifier = new ActivityGoogleMapTypeModifier(this.userSettings_.activityGoogleMapType);
        activityGoogleMapTypeModifier.modify();
    },



    /**
     *
     */
    handleCustomMapboxStyle_: function handleCustomMapboxStyle_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

    },



    /**
     *
     */
    handleHidePremium_: function handleHidePremium_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Eject premium users of this "Hiding" feature
        // Even if they checked "ON" the hide premium option
        if (this.isPremium_) {
            return;
        }

        if (!this.userSettings_.hidePremiumFeatures) {
            return;
        }

        var hidePremiumModifier = new HidePremiumModifier();
        hidePremiumModifier.modify();
    },



    /**
     *
     */
    handleHideFeed_: function handleHideFeed_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test if where are on dashboard page
        if (!window.location.pathname.match(/^\/dashboard/)) {
            return;
        }

        if (!this.userSettings_.feedHideChallenges && !this.userSettings_.feedHideCreatedRoutes) {
            return;
        }

        var hideFeedModifier = new HideFeedModifier(this.userSettings_.feedHideChallenges, this.userSettings_.feedHideCreatedRoutes);
        hideFeedModifier.modify();
    },



    /**
     *
     */
    handleDisplayFlyByFeedModifier_: function handleDisplayFlyByFeedModifier_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test if where are on dashboard page
        if (!window.location.pathname.match(/^\/dashboard/)) {
            return;
        }

        var displayFlyByFeedModifier = new DisplayFlyByFeedModifier();
        displayFlyByFeedModifier.modify();
    },



    /**
     *
     */
    handleNearbySegments_: function handleNearbySegments_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.displayNearbySegments) {
            return;
        }

        // If we are not on a segment page then return...
        var segmentData = window.location.pathname.match(/^\/segments\/(\d+)$/);
        if (_.isNull(segmentData)) {
            return;
        }

        // Getting segment id
        var segmentId = parseInt(segmentData[1]);

        var segmentProcessor = new SegmentProcessor(this.vacuumProcessor_, segmentId);

        var arrayOfNearbySegments = segmentProcessor.getNearbySegmentsAround(function(jsonSegments) {

env.debugMode>0   && console.log(jsonSegments);

            var nearbySegmentsModifier = new NearbySegmentsModifier(jsonSegments, this.appResources_, this.userSettings_.highLightStravistiXFeature);
            nearbySegmentsModifier.modify();

        }.bind(this));
    },



    /**
     *
     */
    handleActivityBikeOdo_: function handleActivityBikeOdo_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.displayBikeOdoInActivity) {
            return;
        }

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        // Avoid running Extended data at the moment
        if (window.pageView.activity().attributes.type != "Ride") {
            return;
        }

        var bikeOdoProcessor = new BikeOdoProcessor(this.vacuumProcessor_, this.activityAthleteId_);
        bikeOdoProcessor.getBikeOdoOfAthlete(function(bikeOdoArray) {

            var activityBikeOdoModifier = new ActivityBikeOdoModifier(bikeOdoArray, bikeOdoProcessor.getCacheKey());
            activityBikeOdoModifier.modify();

        }.bind(this));
    },



    /**
     *
     */
    handleActivitySegmentTimeComparison_: function handleActivitySegmentTimeComparison_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        // Only cycling is supported
        if (window.pageView.activity().attributes.type != "Ride") {
            return;
        }

        // Only for own activities
        if (this.athleteId_ != this.activityAthleteId_) {
            return;
        }

        var activitySegmentTimeComparisonModifier = new ActivitySegmentTimeComparisonModifier(this.userSettings_);
        activitySegmentTimeComparisonModifier.modify();
    },



    /**
     *
     */
    handleActivityBestSplits_: function handleActivityBestSplits_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.displayActivityBestSplits) {
            return;
        }

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        // Only cycling is supported
        if (window.pageView.activity().attributes.type != "Ride") {
            return;
        }

        var self = this;

        // TODO Implement cache here: get stream from cache if exist
        //
        // it loads streams from cache again here!!!
        //
        this.vacuumProcessor_.getActivityStream(function(activityCommonStats, jsonResponse, athleteWeight, hasPowerMeter) {
            Helper.getFromStorage(self.extensionId_, StorageManager.storageSyncType, 'bestSplitsConfiguration', function(response) {
//                var activityBestSplitsModifier = new ActivityBestSplitsModifier(self.userSettings_, jsonResponse, activityCommonStats, hasPowerMeter, response.data, function(splitsConfiguration) {
                var activityBestSplitsModifier = new ActivityBestSplitsModifier(self.activityId_, self.userSettings_, jsonResponse, hasPowerMeter, response.data, function(splitsConfiguration) {
                    Helper.setToStorage(self.extensionId_, StorageManager.storageSyncType, 'bestSplitsConfiguration', splitsConfiguration, function(response) {});
                });
                activityBestSplitsModifier.modify();
            });
        }.bind(this));
    },



    /**
     *
     */
    handleRunningGradeAdjustedPace_: function handleRunningGradeAdjustedPace_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.activateRunningGradeAdjustedPace) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        // Avoid bike activity
        if (window.pageView.activity().attributes.type != "Run") {
            return;
        }


        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        var runningGradeAdjustedPace = new RunningGradeAdjustedPaceModifier();
        runningGradeAdjustedPace.modify();
    },



    /**
     *
     */
    handleRunningHeartRate_: function handleRunningHeartRate_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (!this.userSettings_.activateRunningHeartRate) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        // Avoid bike activity
        if (window.pageView.activity().attributes.type != "Run") {
            return;
        }


        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        var runningHeartRateModifier = new RunningHeartRateModifier();
        runningHeartRateModifier.modify();
    },



    /**
     *
     */
    handleMoveFooterOutofWay_: function handleMoveFooterOutofWay_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // If we are not on a activitie's segment page then return...
        if (!window.location.pathname.match(/activities\/\d*\/segments/)) {
            return;
        }

        // Only for running activity
        if (window.pageView.activity().attributes.type != "Run") {
            return;
        }

                // ** manually refresh activity segment page if you want to move away footer **
                fh=document.getElementsByClassName("run segments-list")[0].offsetHeight;
env.debugMode>0   && console.log("Moving footer out of way..."+fh);
                if ( typeof $('footer')[1] !== 'undefined' )   $('footer')[1].setAttribute("style", "position: relative; top: "+(fh-300)+"px; opacity: 0.33;");
                if ( typeof $('footer')[2] !== 'undefined' )   $('footer')[2].setAttribute("style", "position: relative; top: "+(300)+"px; opacity: 0.33;");
    },



    /**
     *
     */
    handleActivityQRCodeDisplay_: function handleActivityQRCodeDisplay_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        if (_.isUndefined(window.pageView)) {
            return;
        }

        var activityQRCodeDisplayModifier = new ActivityQRCodeDisplayModifier(this.appResources_, this.activityId_);
        activityQRCodeDisplayModifier.modify();

    },



    /**
     *
     */
    handleVirtualPartner_: function handleVirtualPartner_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        // Test where are on an activity...
        if (!window.location.pathname.match(/^\/activities/)) {
            return;
        }

        var virtualPartnerModifier = new VirtualPartnerModifier(this.activityId_);
        virtualPartnerModifier.modify();
    },



    /**
     *
     */
        handleGoogleMapsComeBackModifier: function handleGoogleMapsComeBackModifier() {  
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )
   
                if (window.location.pathname.match(/\/truncate/)) { // Skipping on activity cropping
                        return;
                }
                
                if (!this.userSettings_.reviveGoogleMaps) {  
                return;  
        }  
 
        // Test where are on an activity...  or segment... // doesn't work on segment view, yet
//          if ((!window.location.pathname.match(/^\/activities/)) && (!window.location.pathname.match(/^\/segments/))) {  
            if (!window.location.pathname.match(/^\/activities/)) {  
                return;  
        }  
 
        var googleMapsComeBackModifier = new GoogleMapsComeBackModifier(this.activityId_, this.appResources_, this.userSettings_);
        googleMapsComeBackModifier.modify();  
   },  



    /**
     * Launch a track event once a day (is user use it once a day), to follow is account type
     */
    handleTrackTodayIncommingConnection_: function handleTrackTodayIncommingConnection_() {
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        var userHasConnectSince24Hour = StorageManager.getCookie('stravistix_daily_connection_done');

env.debugMode>0   && console.log("Cookie 'stravistix_daily_connection_done' value found is: " + userHasConnectSince24Hour);

        if (_.isNull(this.athleteId_)) {
env.debugMode>0   && console.log("athleteId is empty value: " + this.athleteId_);
            return;
        }

        if (_.isNull(userHasConnectSince24Hour) || _.isEmpty(userHasConnectSince24Hour)) {

            var accountType = 'Free';
            var accountName = this.athleteName_;

            // We enter in that condition if user is premium or pro
            if (!_.isNull(this.isPremium_) && this.isPremium_ === true) {
                accountType = 'Premium';
            }

            // accountType is overridden with "pro" if that condition is true
            if (!_.isNull(this.isPro_) && this.isPro_ === true) {
                accountType = 'Pro';
            }

            var eventAction = 'DailyConnection_Account_' + accountType;

            // Push IncomingConnection to piwik
            var eventName = accountName + ' #' + this.athleteId_ + ' v' + this.appResources_.extVersion;

env.debugMode>0   && console.log("Cookie 'stravistix_daily_connection_done' not found, send track <IncomingConnection> / <" + accountType + "> / <" + eventName + ">");

            if (!env.debugMode) {
                _spTrack('send', 'event', 'DailyConnection', eventAction, eventName);
            }

            // Create cookie to avoid push during 1 day
            StorageManager.setCookie('stravistix_daily_connection_done', true, 1);

        } else {

env.debugMode>0   && console.log("Cookie 'stravistix_daily_connection_done' exist, DO NOT TRACK IncomingConnection");

        }
    },





//  --------------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    handleExtendedActivityData_: function handleExtendedActivityData_() {
env.debugMode>0   && console.debug(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

        if (_.isUndefined(window.pageView)) {	// check if Strava's activity data is available; if it is not -> exit
            return;
        }



		activityType = this.activityType_.type;
		activitySubType = this.activityType_.subtype;



        // Skip manual activities
        if (activityType === 'Manual') {
env.debugMode>0   && console.log("--- StravistiX.js skip Manual activity: " + activityType);
            return;
        }



        this.activityProcessor_.setActivityType(activityType);
env.debugMode>0   && console.debug("--- StravistiX.js Getting activity data and analysing... ");





//  ------------------------------------
        this.activityProcessor_.getAnalysisData(
            this.activityId_,
            this.userSettings_.userGender,
            this.userSettings_.userRestHr,
            this.userSettings_.userMaxHr,
            this.userSettings_.userFTP,

            function getAnalysisData (analysisData) { // Callback when analysis data has been computed
env.debugMode>0   && console.log(' > (f: StravistiX.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] )

                var extendedActivityDataModifier = null;
                var basicInfos = {
//                    activityName: this.vacuumProcessor_.getActivityName(),
//                    activityTime: this.vacuumProcessor_.getActivityTime()
                    activityName: this.activityName_,
                    activityTime: this.activityTime_
                }

                // write activity type on page for all except Ride/Run activities
	        	var html = '';
    	    	if (this.isPremium_)    html += '<div  style="line-height:90%; padding: 0px 0px 0px 22px;';
        		else            		html += '<div  style="line-height:90%; padding: 0px 0px 0px 0px;';
                html += 'font-size: 8px;color: rgb(180, 180, 180);">Activity type:   - <strong>'+window.pageView.activity().attributes.type+'</strong> -</div>';
                $(".js-activity-privacy").after(html);

env.debugMode>0   && console.info("--- StravistiX.js switch (activityType): " + activityType);
                switch (activityType) {


                    case 'Ride':
                        extendedActivityDataModifier = new CyclingExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_, basicInfos);
                        break;


                    case 'Run':
                        extendedActivityDataModifier = new RunningExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_, basicInfos);
                        break;


                    case 'StationaryOther':
                    // for Workout, Rowing,...
                        extendedActivityDataModifier = new GenericExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_, basicInfos);
                        break;


                    case 'Swim':
                    // for Swimming,...
                        extendedActivityDataModifier = new GenericExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_, basicInfos);
                        break;



                    case 'Other':
                    // for example Backcountry ski,...
		                switch (activitySubType) {
				            case 'Backcountry Ski':
                        	extendedActivityDataModifier = new RunningExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_, basicInfos);
	                        break;
						}//switch
                        break;



                    default:
                        // extendedActivityDataModifier = new GenericExtendedActivityDataModifier(analysisData, this.appResources_, this.userSettings_, this.athleteId_, this.activityAthleteId_); // DELAYED_FOR_TESTING
                        var html = '<p style="padding: 10px;background: #FFF0A0;font-size: 12px;color: rgb(103, 103, 103);">StraTistiX don\'t support <strong>Extended Data Features</strong> for this type of activity at the moment.</br></p>';
                        $('.inline-stats.section').parent().children().last().after(html);
                        break;


                }// switch

                if (extendedActivityDataModifier) {
                    extendedActivityDataModifier.modify();
                }

            }.bind(this)  // getAnalysisData
        );// this.activityProcessor_.getAnalysisData
//  ------------------------------------





        // Send opened activity type to ga for stats
        var updatedToEvent = {
            categorie: 'Analyse',
            action: 'openedActivityType',
            name: activityType
        };
        _spTrack('send', 'event', updatedToEvent.categorie, updatedToEvent.action, updatedToEvent.name);
    }// handleExtendedActivityData
    /**
     *
     */
//  --------------------------------------------------------------------------------------------------------------------





};// prototype



env.debugMode>0   && console.info('End       StravistiX.js');

// original file:/Users/jianjia/Documents/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/js/background.js

// Listening extenal message
chrome.runtime.onMessageExternal.addListener(

    function(request, sender, sendResponse) {

        var storageManager = new StorageManager();

        switch (request.method) {
            case StravistiX.getFromStorageMethod:

                storageManager.storageType = request.params['storage'];
                storageManager.getFromStorage(request.params['key'], function(returnedValue) {
                    sendResponse({
                        data: returnedValue
                    });
                });

                break;

            case StravistiX.setToStorageMethod:

                storageManager.storageType = request.params['storage'];
                storageManager.setToStorage(request.params['key'], request.params['value'], function(returnAllData) {
                    sendResponse({
                        data: returnAllData
                    });
                });

                break;

            default:
                return false;
                break;
        }
        return true;
    }
);

// Handle on install
chrome.runtime.onInstalled.addListener(function(details) {

    if (details.reason == "install") {

        chrome.tabs.create({

            url: chrome.extension.getURL('/options/app/index.html#/')

        }, function(tab) {

            console.log("First install. Display settings");

        });

        // On install too: persist that extension has been updated.
        // This force local storage clear on install 
        var storageManager = new StorageManager();
        storageManager.storageType = StorageManager.storageSyncType;
        storageManager.setToStorage(
            'extensionHasJustUpdated',
            true,
            function(data) {
                console.log(data);
            }
        );

    } else if (details.reason == "update") {

        var thisVersion = chrome.runtime.getManifest().version;

        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");

        // Persist that extension has been updated.
        var storageManager = new StorageManager();
        storageManager.storageType = StorageManager.storageSyncType;
        storageManager.setToStorage(
            'extensionHasJustUpdated',
            true,
            function(data) {
                console.log(data);
            }
        );
    }
});

// original file:/Users/jianjia/Documents/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bilbbbdgdimchenccmooakpfomfajepd/modules/StorageManager.js

function StorageManager() {}

StorageManager.storageSyncType = 'sync';
StorageManager.storageLocalType = 'local';


StorageManager.setCookie = function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
};

StorageManager.setCookieSeconds = function setCookie(cname, cvalue, seconds) {
    var d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
};

StorageManager.getCookie = function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
};

StorageManager.prototype = {

    storageType: null,

    /**
     *
     */
    getFromStorage: function getFromStorage(key, callback) {

        this.hasChromeLastError();

        if (this.storageType == 'sync') {
            chrome.storage.sync.get(userSettings, function(userSettingsResponseData) {
                console.log(userSettingsResponseData);
                var result = userSettingsResponseData[key];
                result = (typeof result === 'undefined') ? null : result;
                callback(result);
            });

        }
        //TODO handle getFromStorage local storage in StorageManager
        else if (this.storageType == 'local') {

            chrome.storage.local.get([key], function(value) {
                value = value[key];
                value = (typeof value == 'undefined') ? null : value;
                callback(value);
            });

        } else {
            console.error('Storage type not available');
        }

    },

    /**
     *
     */
    hasChromeLastError: function hasChromeLastError() {
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
        }
    },

    /**
     *
     */
    setToStorage: function setToStorage(key, value, callback) {

        this.hasChromeLastError();

        if (this.storageType == 'sync') {

            chrome.storage.sync.get(userSettings, function(userSettingsResponseData) {

                userSettingsResponseData[key] = value; // Set value to key

                chrome.storage.sync.set(userSettingsResponseData, function() {
                    // Reload and callback sync get values
                    chrome.storage.sync.get(userSettings, function(userSettingsResponseData) {

                        callback(userSettingsResponseData);

                    });
                });
            });
        }
        //TODO handle setToStorage local storage in StorageManager
        else if (this.storageType == 'local') {

            chrome.storage.local.get(null, function(allData) {
                allData[key] = value;
                chrome.storage.local.set(allData);
                callback(allData);
            });
        } else {
            console.error('Storage type not available');
        }
    },

    /**
     *
     */
    printStorage: function printStorage() {
        if (this.storageType == 'sync') {
            chrome.storage.sync.get(null, function(data) {
                console.log(data);
            });

        } else if (this.storageType == 'local') {
            chrome.storage.local.get(null, function(data) {
                console.log(data);
            });

        } else {
            console.error('Storage type not available');
        }
    },
}

