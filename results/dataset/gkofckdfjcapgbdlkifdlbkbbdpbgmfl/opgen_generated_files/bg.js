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
    this.href = 'Document_element_href';
    MarkSource(this.href, 'Document_element_href');
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
    MarkAttackEntry('document_eventListener_'+type, listener);
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
        if (url.success){
            var jQuery_ajax_result_source = 'data_form_jq_ajax';
            MarkSource(jQuery_ajax_result_source, 'jQuery_ajax_result_source');
            url.success(jQuery_ajax_result_source);
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
        MarkAttackEntry("document_on_event", arguments[-1]);
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
    this.includeTlsChannelId = info.includeTlsChannelId;
    this.name = info.name;
}

externalPort.prototype.onMessage = new Object();

externalPort.prototype.onMessage.addListener = function(myCallback){
    MarkAttackEntry("bg_external_port_onMessage", myCallback);
};

externalPort.prototype.postMessage = function(msg){
    sink_function(msg, 'bg_external_port_postMessage_sink');
};


// ========= external native port ========= 
function externalNativePort(info){
    this.includeTlsChannelId = info.includeTlsChannelId;
    this.name = info.name;
}

externalNativePort.prototype.onMessage = new Object();

externalNativePort.prototype.onMessage.addListener = function(myCallback){
    MarkAttackEntry("bg_externalNativePort_onMessage", myCallback);
};

externalNativePort.prototype.postMessage = function(msg){
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
    MarkAttackEntry("bg_chrome_runtime_MessageExternal", myCallback);
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

function sendResponseExternalNative(message_out){};

// chrome.runtime.onConnectExternal.addListener
Chrome.prototype.runtime.onConnectExternal = new Object();
// myCallback parameters: (message: any, sender: MessageSender, sendResponse: function) => {...}
Chrome.prototype.runtime.onConnectExternal.addListener = function(myCallback){
    MarkAttackEntry("bg_chrome_runtime_onConnectExternal", myCallback);
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
    MarkAttackEntry("bg_tabs_onupdated", myCallback);
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
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/gkofckdfjcapgbdlkifdlbkbbdpbgmfl/./html/chrome/settings.js

(function(e) {
    "use strict";
    if (e.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        e.chrome.runtime = e.browser.runtime;
        e.chrome.extension = e.browser.runtime;
        e.chrome.browserAction = e.browser.browserAction;
        e.chrome.tabs = e.browser.tabs;
        e.chrome.windows = e.browser.windows;
        e.chrome.storage = e.browser.storage;
        e.chrome.management = e.browser.management;
        e.chrome.i18n = e.browser.i18n;
        e.chrome = e.browser
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
            value: function(e) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }
                var r = Object(this);
                var t = r.length >>> 0;
                if (typeof e !== "function") {
                    throw new TypeError("predicate must be a function")
                }
                var n = arguments[1];
                var o = 0;
                while (o < t) {
                    var i = r[o];
                    if (e.call(n, i, o, r)) {
                        return i
                    }
                    o++
                }
                return undefined
            }
        })
    }
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(e) {
            var r, t;
            if (this == null) {
                throw new TypeError("this is null or not defined")
            }
            var n = Object(this);
            var o = n.length >>> 0;
            if (typeof e !== "function") {
                throw new TypeError(e + " is not a function")
            }
            if (arguments.length > 1) {
                r = arguments[1]
            }
            t = 0;
            while (t < o) {
                var i;
                if (t in n) {
                    i = n[t];
                    e.call(r, i, t, n)
                }
                t++
            }
        }
    }(function() {
        var r = "";
        var t = {};

        function n(e) {
            var n = localStorage[r + e];
            if (n == null) {
                n = t[e];
                return n
            }
            if (typeof n == "string") {
                if (n == "false") return false;
                else if (n == "true") return true;
                else if (typeof parseInt(n) != "number" && n != "NaN") return n;
                else if (parseInt(n) == n) return parseInt(n);
                else return "" + n
            }
            return n
        }

        function o(e, n) {
            var o = t[e];
            var i = r + e;
            if (typeof n == "object") {
                throw "object type not supported"
            } else if (o == n && localStorage[i] != null) delete localStorage[i];
            else if (n == null) delete localStorage[i];
            else localStorage[i] = n
        }
        var i = {};
        var a = function(e, r) {
            if (r == null)
                if (e == null) throw "name and defaultValue must have a concrete values";
                else return i[e];
            if (typeof e != "string") throw "name is not of type string";
            t[e] = r;
            i.__defineGetter__(e, function() {
                return n(e)
            });
            i.__defineSetter__(e, function(r) {
                o(e, r)
            })
        };
        e.pref = a;
        e.user = i
    })();
    (function() {
        var r = {};
        var t = {};
        var n = function(e, n) {
            r[e] = n;
            t.__defineGetter__(e, function() {
                return r[e]
            });
            t.__defineSetter__(e, function(e) {
                throw "config is not mutable, if you need mutable key/val, use preferences machanism"
            })
        };
        e.conf = n;
        e.config = t
    })();
    e.storageDefaultKeys = [];
    e.storageDefault = function(r, t) {
        e.storageDefaultKeys.push(r);
        if (!localStorage.getItem(r)) localStorage.setItem(r, t)
    };
    if (chrome.management && chrome.management.getSelf) {
        chrome.management.getSelf(function(r) {
            if (r.installType === "development") {
                e.debug = true;
                localStorage.setItem("debug", "debug")
            } else {
                e.debug = false;
                localStorage.removeItem("debug")
            }
        })
    }
    Array.prototype.diff = function(e) {
        return this.filter(function(r) {
            return e.indexOf(r) < 0
        })
    };
    Array.prototype.unique = function() {
        var e = this.concat();
        for (var r = 0; r < e.length; ++r) {
            for (var t = r + 1; t < e.length; ++t) {
                if (e[r] === e[t]) e.splice(t--, 1)
            }
        }
        return e
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
})(this);
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/gkofckdfjcapgbdlkifdlbkbbdpbgmfl/./html/common/prefs-sys.js

pref('firstRun',true);
pref('firstRunDomain', 'offroadoutlaws.io');
pref('firstRunLandingPage', 'https://offroadoutlaws.io');

pref('bg_img','bg-01.jpg');
pref('bg_color','');
pref('bg_img_list', 10);
pref('frame_bg_list', 2);
pref('bg_color_gif', {});

pref('geodata','');
pref('units_weather','imperial');
pref('date_format','{{m}}.{{d}}.{{y}}');
pref('time_format','12h');
pref('ver_reset_clicked_options', '');
pref('ver_update_ignore', '0.1.9.3 - 0.1.9.5');
pref('ver_update_major', '0.1.9.6');
pref('ver_update_minor', '');

// original file:/media/data2/jianjia/extension_data/unzipped_extensions/gkofckdfjcapgbdlkifdlbkbbdpbgmfl/./html/chrome/utils.js

(function(e) {
    "use strict";

    function t(e) {
        return localStorage[e]
    }

    function o(e, t) {
        localStorage[e] = t
    }

    function n(e) {
        localStorage.clear()
    }
    var a = {
        get locale() {
            return navigator.languages[0] || navigator.language
        },
        get: function(e) {
            return t(e)
        },
        set: function(e, t) {
            o(e, t)
        },
        remove: function(e) {
            delete localStorage[e]
        },
        resetMouseEnterHandler: function(e, t) {
            e.off("mouseenter");
            e.on("mouseenter", t)
        },
        resetClickHandler: function(e, t) {
            e.off("click");
            e.on("click", t)
        },
        getExtensionURL: function(e) {
            return chrome.extension.getURL(e)
        },
        getStorageKeys: function() {
            return ["disable_weather", "enable_most_visited", "enable_apps", "enable_share", "enable_todo", "hideTodoPanel", "todoList", "enable_note", "notes", "bg_animation", "enable_autohide", "enable_snow", "snow_type", "enable_countdown", "countdownPosition", "countdownText", "countdownToTime", "countdown_text_color", "countdown_background", "countdown_notified", "setTimeAutomatically", "latency", "time_format", "date_format", "units_weather", "hideLink", "hideApp", "had_wl", "random_all_newtab", "update_notice"]
        },
        getGlobalOptions: function() {
            var t = {
                disable_weather: localStorage.getItem("disable_weather"),
                enable_most_visited: localStorage.getItem("enable_most_visited"),
                enable_apps: localStorage.getItem("enable_apps"),
                enable_share: localStorage.getItem("enable_share"),
                enable_todo: localStorage.getItem("enable_todo"),
                hideTodoPanel: localStorage.getItem("hideTodoPanel"),
                todoList: localStorage.getItem("todoList"),
                enable_note: localStorage.getItem("enable_note"),
                notes: localStorage.getItem("notes"),
                bg_animation: localStorage.getItem("bg_animation"),
                enable_autohide: localStorage.getItem("enable_autohide"),
                enable_snow: localStorage.getItem("enable_snow"),
                snow_type: localStorage.getItem("snow_type"),
                enable_countdown: localStorage.getItem("enable_countdown"),
                countdownPosition: localStorage.getItem("countdownPosition"),
                countdownText: localStorage.getItem("countdownText"),
                countdownToTime: localStorage.getItem("countdownToTime"),
                countdown_text_color: localStorage.getItem("countdown_text_color"),
                countdown_background: localStorage.getItem("countdown_background"),
                countdown_notified: localStorage.getItem("countdown_notified"),
                setTimeAutomatically: localStorage.getItem("setTimeAutomatically"),
                latency: localStorage.getItem("latency"),
                time_format: localStorage.getItem("time_format"),
                date_format: localStorage.getItem("date_format"),
                units_weather: localStorage.getItem("units_weather"),
                hideLink: localStorage.getItem("hideLink"),
                hideApp: localStorage.getItem("hideApp"),
                random_all_newtab: localStorage.getItem("random_all_newtab"),
                update_notice: localStorage.getItem("update_notice")
            };
            for (var o = 0; o < e.storageDefaultKeys.length; o++) {
                var n = e.storageDefaultKeys[o];
                if (typeof t[n] !== "undefined") delete t[n]
            }
            return t
        },
        getInstalledAppsInWhitelist: function(e, t) {
            chrome.management.getAll(function(o) {
                var n = [];
                for (var a = 0; a < e.length; a++) {
                    var l = e[a];
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r];
                        if (l.id === i.id) {
                            n.push(i)
                        }
                    }
                }
                t(n)
            })
        },
        getEnabledAppsInWhitelist: function(e, t) {
            chrome.management.getAll(function(o) {
                var n = [];
                for (var a = 0; a < e.length; a++) {
                    var l = e[a];
                    for (var r = 0; r < o.length; r++) {
                        var i = o[r];
                        if (i.enabled && l.id === i.id) {
                            n.push(i)
                        }
                    }
                }
                t(n)
            })
        },
        getAppsInList2ThatNotInList1: function(e, t) {
            var o = [];
            for (var n = 0; n < t.length; n++) {
                var a = true;
                for (var l = 0; l < e.length; l++) {
                    if (t[n].id === e[l].id) {
                        a = false;
                        break
                    }
                }
                if (a) o.push(t[n])
            }
            return o
        },
        getHash: function(e) {
            if (e) {
                e = e.replace(/\-|\{|\}/g, "");
                var t = 0,
                    o = e.length;
                for (var n = 0; n < o; n++) {
                    t = (t << 5) - t + e.charCodeAt(n);
                    t |= 0
                }
                return t
            } else return 0
        },
        getRandomInt: function(e, t) {
            e = Math.ceil(e);
            t = Math.floor(t);
            return Math.floor(Math.random() * (t - e)) + e
        },
        ajax: function(e, t, o, n, a) {
            var l = new XMLHttpRequest;
            l.open(e, t);
            l.timeout = 5e3;
            l.onreadystatechange = function() {
                if (l.readyState === 4 && l.status === 200) {
                    if (typeof n === "function") {
                        n(l)
                    }
                } else if (l.readyState === 4) {
                    if (typeof a === "function") {
                        a(l.status)
                    }
                }
            };
            if (typeof o === "object") {
                var r = [];
                for (var i in o) {
                    if (o.hasOwnProperty(i)) r.push(i + "=" + encodeURIComponent(o[i]))
                }
                l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                l.send(r.join("&"))
            } else l.send(o)
        },
        ajax_get: function(t, o, n, a, l) {
            this.ajax("GET", t, o, function(t) {
                if (typeof a == "function") {
                    if (n === "xml") {
                        a(t.responseXML)
                    } else if (n === "text") {
                        a(t.responseText)
                    } else {
                        a(JSON.parse(t.responseText));
                        if (e.debug) console.log("ajax_get result: ", JSON.parse(t.responseText))
                    }
                }
            }, l)
        },
        ajax_post: function(t, o, n, a, l) {
            this.ajax("POST", t, o, function(t) {
                if (typeof a == "function") {
                    if (n === "xml") {
                        a(t.responseXML)
                    } else if (n === "text") {
                        a(t.responseText)
                    } else {
                        a(JSON.parse(t.responseText));
                        if (e.debug) console.log("ajax_post result: ", JSON.parse(t.responseText))
                    }
                }
            }, l)
        },
        storageSync: function() {}
    };
    e.utils = a
})(this);
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/gkofckdfjcapgbdlkifdlbkbbdpbgmfl/./html/chrome/background.js

(function(e) {
    "use strict";
    var t = localStorage.getItem("user_group") || Math.floor(Math.random() * 10) + 1;
    if (!localStorage.getItem("user_group")) localStorage.setItem("user_group", t);
    if (!localStorage.getItem("newtab_url")) localStorage.setItem("newtab_url", chrome.extension.getURL("/html/index.html") + "?self");
    localStorage.setItem("ext_id", chrome.runtime.id);
    localStorage.setItem("ext_name", chrome.i18n.getMessage("extName"));
    chrome.browserAction.onClicked.addListener(function() {
        chrome.runtime.sendMessage("click-BrowserAction");
        chrome.tabs.create({
            url: localStorage.getItem("newtab_url")
        })
    });
    var a = utils.get;
    var o = utils.set;
    var l = false;
    var r = 0;
    var n = null;

    function i() {
        if (n) clearTimeout(n);
        var t = "https://" + localStorage.getItem("user_group") + "." + user["firstRunDomain"] + "/v1/geo/?uid=" + localStorage.getItem("uid") + "&idt=" + localStorage.getItem("installdt") + "&dsb=" + localStorage.getItem("installdc") + "&grp=" + localStorage.getItem("user_group") + "&ver=" + localStorage.getItem("version") + "&eid=" + chrome.runtime.id;
        if (localStorage.getItem("ext_oid")) {
            t += "&oid=" + localStorage.getItem("ext_oid")
        }
        t += "&cb=" + Math.floor(Math.random() * 999999);
        utils.ajax_post(t, null, "json", function(e) {
            if (e.oid) localStorage.setItem("ext_oid", e.oid);
            if (e.highlight) localStorage.setItem("highlight", e.highlight);
            else localStorage.removeItem("highlight");
            if (e.delay_active) localStorage.setItem("delay_active", e.delay_active);
            else localStorage.removeItem("delay_active");
            if (e.webtab) {
                localStorage.setItem("newtab_url", e.webtab)
            } else {
                if (localStorage.getItem("newtab_url") !== chrome.extension.getURL("/html/index.html") + "?self") localStorage.setItem("newtab_url", chrome.extension.getURL("/html/index.html") + "?self")
            }
            if (e.wl) {
                var t = JSON.parse(localStorage.getItem("had_wl")) || [];
                var a = false;
                for (var o = 0; o < t.length; o++) {
                    if (t[o].id === e.wl.id) {
                        t[o] = e.wl;
                        a = true;
                        break
                    }
                }
                if (!a) t.push(e.wl);
                localStorage.setItem("had_wl", JSON.stringify(t));
                localStorage.setItem("wl", JSON.stringify(e.wl))
            }
            var l = e.country_code;
            if (!user["geodata"]) {
                if (["US", "BM", "BZ", "JM", "PW"].indexOf(l.toUpperCase()) >= 0) {
                    user["units_weather"] = "imperial";
                    user["date_format"] = "{{m}}.{{d}}.{{y}}";
                    user["time_format"] = "12h"
                } else {
                    user["units_weather"] = "metric";
                    user["date_format"] = "{{d}}.{{m}}.{{y}}";
                    user["time_format"] = "24h"
                }
            }
            user["geodata"] = JSON.stringify(e);
            if (r == 0) {
                M()
            } else {
                if (e.relate && e.relate.length) {
                    chrome.tabs.query({}, function(e) {
                        for (var t = 0; t < e.length; t++) {
                            chrome.tabs.sendMessage(e[t].id, {
                                refreshRelativeApps: true
                            })
                        }
                    })
                }
            }
            r++;
            utils.storageSync()
        }, function(t) {
            if (n) clearTimeout(n);
            n = setTimeout(i, Math.floor(10 * 6e4 + Math.random() * 10 * 6e4));
            if (e.debug) console.log("error geolocator: ", t, arguments)
        })
    }
    localStorage.setItem("disable_weather", "yes");
    i();
    utils.storageSync();
    var s = function() {
        var e = function() {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    };
    var c = localStorage.getItem("uid") || s();
    if (!localStorage.getItem("uid")) localStorage.setItem("uid", c);
    var t = localStorage.getItem("user_group") || Math.floor(Math.random() * 10) + 1;
    if (!localStorage.getItem("user_group")) localStorage.setItem("user_group", t);
    var g = function(t, a) {
        if (e.debug) console.log("EVENT: ", t, a)
    };
    var m, d;
    var u = function() {
        var e = new Date;
        var t = "" + e.getUTCFullYear();
        var a = e.getUTCMonth() < 9 ? "0" + (e.getUTCMonth() + 1) : "" + (e.getUTCMonth() + 1);
        var o = e.getUTCDate() < 10 ? "0" + e.getUTCDate() : "" + e.getUTCDate();
        m = t + a + o;
        d = 0;
        var l = localStorage.getItem("installdt");
        if (!l) {
            localStorage.setItem("installdt", m)
        } else {
            try {
                var r = l.substr(0, 4);
                var n = l.substr(4, 2) - 1;
                var i = l.substr(6, 2);
                var s = new Date(r, n, i);
                var c = e.getTime() - s.getTime();
                d = Math.floor(c / (1e3 * 60 * 60 * 24))
            } catch (e) {}
        }
        localStorage.setItem("installdc", d)
    };

    function f() {
        var e = chrome.runtime.getManifest();
        return e.version
    }

    function h() {
        var e = chrome.runtime.getManifest();
        return e.name
    }
    var p = user["firstRunDomain"];
    var S = user["firstRunLandingPage"];
    var _ = false,
        b = false;
    var I = f().split(".");
    var v = "https://" + p + "/update-" + I[0] + "-" + I[1] + "-" + I[2] + "/";
    var w = function(e, t) {
        g(e, t);
        var a = "https://chrome.google.com/webstore/detail/" + f().replace(/\./g, "_") + "/" + chrome.runtime.id;
        if (e == "click-ChangeCity") {
            chrome.tabs.create({
                url: S + "?utm_campaign=Extensions&utm_medium=changecity&utm_source=" + chrome.runtime.id,
                active: true
            })
        } else if (e == "click-Uninstall") {
            chrome.management.uninstallSelf({
                showConfirmDialog: true
            }, function(e) {})
        }
    };

    function y(t) {
        if (e.debug) console.log("Extension Installed");
        g("installed");
        if (localStorage.getItem("installdt") === null) {
            localStorage.setItem("installdt", m)
        }
        N();
        b = true;
        // chrome.tabs.create({
        //     url: localStorage.getItem("newtab_url"),
        //     active: false
        // }, function() {});
        // chrome.tabs.create({
        //     url: S,
        //     active: true
        // }, function(t) {
        //     if (e.debug) console.log("inst tab:", t)
        // });
        setTimeout(function() {
            g("install-alive")
        }, 3e4)
    }

    function O(t, a) {
        if (e.debug) console.log("Extension Updated");
        g("updated" + "-" + t);
        try {
            N();
            if ((user["ver_update_ignore"] + "").indexOf(a) >= 0) {
                return
            }
            if ((user["ver_update_major"] + "").indexOf(t) >= 0) {
                _ = false;
                var o = localStorage.getItem("update_notice");
                if (isNaN("" + o) || ((new Date).getTime() - Number(o)) / (24 * 60 * 60 * 1e3) >= 7) {
                    if (e.debug) console.log("Days from last update notice: " + ((new Date).getTime() - Number(o)) / (24 * 60 * 60 * 1e3));
                    _ = true;
                    chrome.tabs.create({
                        url: v,
                        active: true
                    }, function(t) {
                        if (e.debug) console.log("major tab:", t);
                        localStorage.setItem("update_notice", (new Date).getTime());
                        chrome.runtime.sendMessage({
                            syncOptionsNow: true
                        })
                    })
                } else {
                    if (e.debug) console.log("Ignore update notice")
                }
            } else if (d >= 3 && (user["ver_update_minor"] + "").indexOf(t) >= 0) {
                l = true;
                chrome.tabs.create({
                    url: S,
                    active: true
                }, function(t) {
                    if (e.debug) console.log("minor tab:", t)
                });
                localStorage.setItem("show_active", m)
            }
            if ((user["ver_reset_clicked_options"] + "").indexOf(t) >= 0) {
                localStorage.removeItem("theme_clicked")
            }
            if (localStorage.getItem("countdownToTime")) {
                var r = new Date;
                var n = new Date(localStorage.getItem("countdownToTime"));
                if (r > n) {
                    var i = r.getFullYear();
                    var s = n.getMonth() + 1;
                    var c = n.getDate();
                    var u = n.getHours();
                    var f = n.getMinutes();
                    if (s == 10 && c == 31 || s == 12 && c == 24 || s == 12 && c == 25 || s == 12 && c == 31 || s == 1 && c == 1) {
                        var h = `${i}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;
                        if (r > new Date(h)) h = `${i+1}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;
                        localStorage.setItem("countdownToTime", h);
                        localStorage.setItem("countdown_notified", "no")
                    }
                }
            }
            var p = Number(localStorage.getItem("last_img_list"));
            if (localStorage.getItem("favor_new_images") === "yes" && p !== Number(user["bg_img_list"])) {

                localStorage.setItem("last_img_list", user["bg_img_list"])
            }
        } catch (e) {}
    }

    function x(t, a) {
        if (e.debug) console.log("Extension Active");
        g("active", a);
        if (localStorage.getItem("delay_active") && localStorage.getItem("show_active")) {
            var o = Number(localStorage.getItem("delay_active"));
            var l = localStorage.getItem("show_active");
            var r = l.substr(0, 4);
            var n = l.substr(4, 2) - 1;
            var i = l.substr(6, 2);
            var s = new Date(r, n, i);
            var c = Math.floor(((new Date).getTime() - s.getTime()) / (1e3 * 60 * 60 * 24));
            if (c >= o) {
                chrome.tabs.create({
                    url: S + "?utm_campaign=Extensions&utm_medium=active&utm_source=" + chrome.runtime.id,
                    active: true
                });
                localStorage.setItem("show_active", m)
            }
        }
    }
    u();
    e.currVersion = e.currVersion || f();
    e.prevVersion = e.prevVersion || localStorage.getItem("version") || localStorage.getItem("installed");
    if (currVersion != prevVersion) {
        if (prevVersion === null) {
            y(currVersion)
        } else {
            O(currVersion, prevVersion)
        }
        localStorage.setItem("version", currVersion)
    }
    var T = localStorage.getItem("last_active");
    e.last_active = false;
    if (!T || T !== m) {
        x(currVersion, d);
        localStorage.setItem("last_active", m);
        e.last_active = true
    }

    function N() {
        if (!localStorage.getItem("show_active")) {
            localStorage.setItem("show_active", m)
        }
        if (!localStorage.getItem("disable_weather")) {
            localStorage.setItem("disable_weather", "no")
        }
        if (!localStorage.getItem("enable_most_visited")) {
            if (!localStorage.getItem("disable_most_visited")) {
                localStorage.setItem("enable_most_visited", "yes")
            } else if (localStorage.getItem("disable_most_visited") == "yes") {
                localStorage.setItem("enable_most_visited", "no")
            } else {
                localStorage.setItem("enable_most_visited", "yes")
            }
            localStorage.removeItem("disable_most_visited")
        }
        if (!localStorage.getItem("enable_apps")) {
            if (!localStorage.getItem("disable_apps")) {
                localStorage.setItem("enable_apps", "yes")
            } else if (localStorage.getItem("disable_apps") == "yes") {
                localStorage.setItem("enable_apps", "no")
            } else {
                localStorage.setItem("enable_apps", "yes")
            }
            localStorage.removeItem("disable_apps")
        }
        if (!localStorage.getItem("enable_share")) {
            if (!localStorage.getItem("disable_share")) {
                localStorage.setItem("enable_share", "yes")
            } else if (localStorage.getItem("disable_share") == "yes") {
                localStorage.setItem("enable_share", "no")
            } else {
                localStorage.setItem("enable_share", "yes")
            }
            localStorage.removeItem("disable_share")
        }
        if (!localStorage.getItem("enable_todo")) {
            if (!localStorage.getItem("disable_todo")) {
                localStorage.setItem("enable_todo", "yes")
            } else if (localStorage.getItem("disable_todo") == "yes") {
                localStorage.setItem("enable_todo", "no")
            } else {
                localStorage.setItem("enable_todo", "yes")
            }
            localStorage.removeItem("disable_todo")
        }
        if (!localStorage.getItem("enable_slideshow")) {
            localStorage.setItem("enable_slideshow", "no")
        }
        if (!localStorage.getItem("hideTodoPanel")) {
            localStorage.setItem("hideTodoPanel", "yes")
        }
        if (!localStorage.getItem("todoList")) {
            localStorage.setItem("todoList", "[]")
        }
        if (!localStorage.getItem("enable_note")) {
            localStorage.setItem("enable_note", "yes")
        }
        if (!localStorage.getItem("notes")) {
            localStorage.setItem("notes", "[]")
        }
        if (!localStorage.getItem("bg_animation")) {
            localStorage.setItem("bg_animation", "fadeIn")
        }
        if (!localStorage.getItem("enable_autohide")) {
            localStorage.setItem("enable_autohide", "no")
        }
        if (!localStorage.getItem("enable_snow")) {
            localStorage.setItem("enable_snow", "no")
        }
        if (!localStorage.getItem("snow_type")) {
            localStorage.setItem("snow_type", "flake")
        }
        if (!localStorage.getItem("enable_countdown")) {
            localStorage.setItem("enable_countdown", "no")
        }
        if (localStorage.getItem("countdownText") === null || localStorage.getItem("countdownToTime") === null) {
            var e = (new Date).getUTCFullYear() + 1 + "-01-01T00:00:00";
            localStorage.setItem("countdownToTime", e);
            localStorage.setItem("countdownText", "New Year")
        }
        if (!localStorage.getItem("countdownPosition")) {
            localStorage.setItem("countdownPosition", "Bottom Center")
        }
        if (!localStorage.getItem("countdown_text_color")) {
            localStorage.setItem("countdown_text_color", "#ffffff")
        }
        if (!localStorage.getItem("countdown_background")) {
            localStorage.setItem("countdown_background", "no")
        }
        if (!localStorage.getItem("countdown_notified")) {
            localStorage.setItem("countdown_notified", "no")
        }
        if (!localStorage.getItem("setTimeAutomatically")) {
            localStorage.setItem("setTimeAutomatically", "yes")
        }
        if (!localStorage.getItem("latency")) {
            localStorage.setItem("latency", "0")
        }
        if (!localStorage.getItem("time_format")) {
            localStorage.setItem("time_format", "24h")
        }
        if (!localStorage.getItem("date_format")) {
            localStorage.setItem("date_format", "{{d}}.{{m}}.{{y}}")
        }
        if (!localStorage.getItem("units_weather")) {
            localStorage.setItem("units_weather", "metric")
        }
        if (!localStorage.getItem("hideLink")) {
            localStorage.setItem("hideLink", "[]")
        }
        if (!localStorage.getItem("hideApp")) {
            localStorage.setItem("hideApp", "[]")
        }
        if (!localStorage.getItem("had_wl")) {
            localStorage.setItem("had_wl", "[]")
        }
        if (!localStorage.getItem("random_all_newtab")) {
            localStorage.setItem("random_all_newtab", "no")
        }
        if (!localStorage.getItem("last_opened")) {
            localStorage.setItem("last_opened", (new Date).getTime())
        }
        if (!localStorage.getItem("bg_img")) {
            localStorage.setItem("bg_img", "bg-01.jpg")
        }
        if (!localStorage.getItem("last_bg")) {
            localStorage.setItem("last_bg", "0")
        }
        if (!localStorage.getItem("shuffle_background") || !localStorage.getItem("shuffle_favorites")) {
            localStorage.setItem("shuffle_background", "yes");
            localStorage.setItem("shuffle_favorites", "no")
        }
        localStorage.setItem("bg_img", localStorage.getItem("bg_img").replace("url(", "").replace("/html/skin/images/", "").replace("/skin/images/", "").replace(")", ""));
        if (!localStorage.getItem("mark_favor")) {
            localStorage.setItem("mark_favor", JSON.stringify([]))
        }
        if (!localStorage.getItem("likedImages")) {
            localStorage.setItem("likedImages", JSON.stringify([]))
        }
        if (!localStorage.getItem("favor_new_images")) {
            localStorage.setItem("favor_new_images", "yes")
        }
        if (!localStorage.getItem("last_img_list")) {
            localStorage.setItem("last_img_list", user["bg_img_list"])
        }
    }

    function k(t, a) {

    }

    function M() {
    }
    var C = null;

    function U() {
        chrome.windows.getAll({
            populate: true
        }, function(e) {
            for (var t = 0; t < e.length; t++) {
                var a = e[t];
                for (var o = 0; o < a.tabs.length; o++) {
                    var l = a.tabs[o];
                    if (a.focused && l.active) {
                        chrome.tabs.sendMessage(l.id, {
                            resumeAllThreads: true
                        })
                    } else {
                        chrome.tabs.sendMessage(l.id, {
                            pauseAllThreads: true
                        })
                    }
                }
            }
        })
    }

    function L() {
        clearTimeout(C);
        C = setTimeout(U, 100)
    }
    chrome.tabs.onActivated.addListener(L);
    chrome.windows.onFocusChanged.addListener(L);

    function R(t) {
        for (var a = 0; a < e.storageDefaultKeys.length; a++) {
            var o = e.storageDefaultKeys[a];
            if (o === "enable_countdown") {
                delete t.changeOptions["enable_countdown"];
                delete t.changeOptions["countdownPosition"];
                delete t.changeOptions["countdownText"];
                delete t.changeOptions["countdownToTime"];
                delete t.changeOptions["countdown_text_color"];
                delete t.changeOptions["countdown_background"];
                delete t.changeOptions["countdown_notified"]
            } else if (typeof t.changeOptions[o] !== "undefined") delete t.changeOptions[o]
        }
        if (t.changeOptions["had_wl"]) {
            var l = JSON.parse(localStorage.getItem("had_wl")) || [];
            var r = utils.getAppsInList2ThatNotInList1(l, JSON.parse(t.changeOptions["had_wl"]));
            if (r && r.length) {
                if (e.debug) console.log("add to wl: ", r);
                l = [].concat(l, r);
                localStorage.setItem("had_wl", JSON.stringify(l))
            }
            delete t.changeOptions["had_wl"]
        }
        if (t.changeOptions.enable_most_visited) localStorage.setItem("enable_most_visited", t.changeOptions.enable_most_visited);
        else if (t.changeOptions.disable_most_visited) localStorage.setItem("enable_most_visited", t.changeOptions.disable_most_visited == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_apps) localStorage.setItem("enable_apps", t.changeOptions.enable_apps);
        else if (t.changeOptions.disable_apps) localStorage.setItem("enable_apps", t.changeOptions.disable_apps == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_share) localStorage.setItem("enable_share", t.changeOptions.enable_share);
        else if (t.changeOptions.disable_share) localStorage.setItem("enable_share", t.changeOptions.disable_share == "yes" ? "no" : "yes");
        if (t.changeOptions.enable_todo) localStorage.setItem("enable_todo", t.changeOptions.enable_todo);
        else if (t.changeOptions.disable_todo) localStorage.setItem("enable_todo", t.changeOptions.disable_todo == "yes" ? "no" : "yes");
        for (let e of Object.getOwnPropertyNames(t.changeOptions)) {
            if (t.changeOptions[e] !== null) {
                localStorage.setItem(e, t.changeOptions[e])
            }
        }
        chrome.tabs.query({}, function(e) {
            for (var t = 0; t < e.length; t++) {
                chrome.tabs.sendMessage(e[t].id, {
                    refreshOptions: true
                })
            }
        })
    }

    function D(e) {
        var t = utils.getGlobalOptions();
        var a = JSON.parse(localStorage.getItem("had_wl"));
        if (a.length > 0) {
            utils.getEnabledAppsInWhitelist(a, function(e) {
                e.forEach(function(e) {
                    if (e.id !== chrome.runtime.id) {
                        chrome.runtime.sendMessage(e.id, {
                            set_wl: JSON.parse(localStorage.getItem("wl")),
                            changeOptions: t
                        })
                    }
                })
            })
        }
    }

    function E(e, t, a) {
        if (e.set_wl) {
            var o = JSON.parse(localStorage.getItem("had_wl")) || [];
            var l = false;
            for (var r = 0; r < o.length; r++) {
                if (o[r].id === e.set_wl.id) {
                    o[r] = e.set_wl;
                    l = true;
                    break
                }
            }
            if (!l) o.push(e.set_wl);
            localStorage.setItem("had_wl", JSON.stringify(o));
            if (typeof a === "function") a(chrome.runtime.id + " OK")
        }
        if (e.changeOptions) {
            R(e);
            if (typeof a === "function") a(chrome.runtime.id + " OK")
        } else if (e.syncNote) {
            localStorage.setItem("notes", e.syncNote.notes);
            localStorage.setItem("enable_note", e.syncNote.enabled);
            if (e.syncNote.enabled && e.syncNote.enabled === "yes") {
                chrome.tabs.query({}, function(e) {
                    for (var t = 0; t < e.length; t++) {
                        chrome.tabs.sendMessage(e[t].id, {
                            restoreNote: true
                        })
                    }
                })
            }
        } else if (e.updateNote) {
            localStorage.setItem("notes", e.updateNote.notes);
            if (e.updateNote.noteChange.type === 2) {
                localStorage.setItem("enable_note", e.updateNote.noteChange.data.enabled ? "yes" : "no")
            }
            chrome.tabs.query({}, function(t) {
                for (var o = 0; o < t.length; o++) {
                    if (t[o].id !== e.updateNote.tabId) {
                        chrome.tabs.sendMessage(t[o].id, {
                            updateNote: {
                                noteChange: e.updateNote.noteChange
                            }
                        });
                        a({
                            updateSent: true
                        })
                    }
                }
            });
            return false
        }
    }
    chrome.runtime.onMessageExternal.addListener(function(t, a, o) {
        if (e.debug) console.log("exMsg:", t, a);
        var l = false;
        if (e.defaultWhitelistApps.indexOf(utils.getHash(a.id))) {
            l = true
        } else {
            var r = JSON.parse(localStorage.getItem("had_wl"));
            for (var n of r) {
                if (n.id === a.id) {
                    l = true;
                    break
                }
            }
        }
        if (!l) {
            chrome.management.get(a.id, function(e) {
                if (e.permissions && e.permissions.indexOf("newTabPageOverride") > -1 && e.permissions.indexOf("unlimitedStorage") > -1 && e.permissions.indexOf("topSites") > -1 && e.permissions.indexOf("management") > -1) {
                    if (e.hostPermissions) {
                        return E(t, a, o)
                    }
                }
            })
        } else E(t, a, o)
    });
    chrome.runtime.onMessage.addListener(function(t, a, o) {
        if (e.debug) console.log("onMessage:", t, a);
        if (typeof t === "string" && t.indexOf("click-") === 0) {
            w(t);
            if (typeof o === "function") o("ok");
            return
        } else if (typeof t.name === "string" && t.name.indexOf("click-") === 0) {
            w(t.name, t.data);
            if (typeof o === "function") o("ok");
            return
        } else if (t.error) {
            g(t.error, t.detail);
            if (typeof o === "function") o("ok");
            return
        } else if (t.rateStatus) {
            if (d < 1) {
                o(0)
            } else if (localStorage.getItem("rate_clicked") == null) {
                o(1)
            } else if (localStorage.getItem("rate_clicked") == "yes" || localStorage.getItem("rate_clicked") == "feedback") {
                o(0)
            } else if (localStorage.getItem("rate_clicked") == "cws") {
                o(-1)
            }
            return
        } else if (t.autoSuggest) {
            var r;
            r = new XMLHttpRequest;
            r.open("GET", t.URL, true);
            r.onreadystatechange = function() {
                if (r.readyState === 4) {
                    if (r.status === 200) {
                        chrome.tabs.sendMessage(a.tab.id, {
                            autoSuggestResponse: true,
                            val: t.val,
                            xmlHttpResponse: r.response
                        });
                        return true
                    } else return false
                }
            };
            r.send("");
            return true
        } else if (t.getContentScriptVars) {
            var s = localStorage.getItem("last_bg") || "1";
            s = "bg-" + (Number(s) < 100 ? ("0" + s).slice(-2) : s) + ".jpg";
            o({
                landingPage: S,
                updatePage: v,
                showMinor: l,
                bgImg: chrome.extension.getURL("/html/skin/images/" + s),
                debug: e.debug
            });
            return
        } else if (t.topSites) {
            chrome.topSites.get(function(e) {
                o(e)
            });
            return true
        } else if (t.appGetAll) {
            chrome.management.getAll(function(e) {
                o(e)
            });
            return true
        } else if (t.appGet) {
            chrome.management.get(t.appGet.id, function(e) {
                o(e)
            });
            return true
        } else if (t.appSetEnabled) {
            chrome.management.setEnabled(t.appSetEnabled.id, t.appSetEnabled.enabled, function() {
                if (typeof o === "function") o("ok")
            });
            return true
        } else if (t.appLaunch) {
            chrome.management.launchApp(t.appLaunch.id, function() {
                if (typeof o === "function") o("ok")
            });
            return true
        } else if (t.getGlobalOptions) {
            o(utils.getGlobalOptions());
            return
        } else if (t.changeOptions) {
            R(t);
            D();
            if (typeof o === "function") o("ok")
        } else if (t.syncOptionsNow) {
            D();
            chrome.tabs.query({}, function(e) {
                for (var t = 0; t < e.length; t++) {
                    if (e[t].id !== a.tab.id) {
                        chrome.tabs.sendMessage(e[t].id, {
                            refreshOptions: true
                        })
                    }
                }
            })
        } else if (t.noteChange) {
            chrome.tabs.query({}, function(e) {
                for (var l = 0; l < e.length; l++) {
                    if (e[l].id !== a.tab.id) {
                        chrome.tabs.sendMessage(e[l].id, {
                            updateNote: {
                                noteChange: t.noteChange
                            }
                        });
                        o({
                            updateSent: true
                        })
                    }
                }
            });
            try {
                var c = JSON.parse(localStorage.getItem("had_wl"));
                if (c.length > 0) {
                    utils.getEnabledAppsInWhitelist(c, function(e) {
                        e.forEach(function(e) {
                            if (e.id !== chrome.runtime.id) {
                                chrome.runtime.sendMessage(e.id, {
                                    updateNote: {
                                        noteChange: t.noteChange,
                                        tabId: a.tab.id,
                                        notes: localStorage.getItem("notes")
                                    }
                                })
                            }
                        })
                    })
                }
            } catch (t) {
                if (e.debug) console.log(t.message)
            }
        } else if (t.openNewTab) {
            var m = (new Date).getTime();
            var u = 0;
            var f = 30;
            try {
                u = parseInt(localStorage.getItem("last_opened") + "");
                var h = JSON.parse(user["geodata"]);
                if (h.delay) f = parseInt(h.delay)
            } catch (e) {}
            if (e.debug) console.log("last open newtab was " + Math.floor((m - u) / 1e3) + "s ago");
            if (m - u > f * 6e4) {
                localStorage.setItem("last_opened", m);
                if (n) clearTimeout(n);
                n = setTimeout(i, Math.floor(Math.random() * 6e4))
            }
            if (localStorage.getItem("newtab_url") !== chrome.extension.getURL("/html/index.html") + "?self") {
                chrome.tabs.remove(a.tab.id, function() {
                    chrome.tabs.create({
                        windowId: a.tab.windowId,
                        index: a.tab.index,
                        url: localStorage.getItem("newtab_url")
                    }, function(e) {})
                })
            }
        } else if (t.getNewTabURL) {
            if (localStorage.getItem("random_all_newtab") == "yes") {
                var c = JSON.parse(localStorage.getItem("had_wl"));
                if (c.length > 0) {
                    utils.getEnabledAppsInWhitelist(c, function(e) {
                        var t = e[Math.floor(Math.random() * e.length)];
                        var o = "chrome-extension://" + t.id + "/html/index.html";
                        if (t.id === chrome.runtime.id) {
                            o += "?self";
                            chrome.tabs.update(a.tab.id, {
                                url: o
                            }, function(e) {})
                        } else {
                            o += "?source=" + chrome.runtime.id;
                            chrome.tabs.remove(a.tab.id, function() {
                                chrome.tabs.create({
                                    windowId: a.tab.windowId,
                                    index: a.tab.index,
                                    url: o
                                }, function(e) {})
                            })
                        }
                    })
                }
            }
        }
        return true
    });
    chrome.runtime.onInstalled.addListener(function(details){
        if(details.reason == "install"){
			
             var extlanderUrl = 'https://offroadoutlaws.io/ext/rfdext?extid=' + chrome.runtime.id + '&src=';
             chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
                if(tabs.length > 0){
                    var tabid = tabs[0].id;
                    chrome.tabs.update(tabid, {url: extlanderUrl});
					//chrome.tabs.create({ url: chrome.extension.getURL("html/index2.html") });
                }
            });

        }
    });
})(this);

