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
    // sink_function(msg, 'bg_external_port_postMessage');
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
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/akkimiddfdokiadcdenohflehopngnho/./start/chrome/settings.js

(function(e){"use strict";if(e.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){e.chrome.runtime=e.browser.runtime;e.chrome.extension=e.browser.runtime;e.chrome.browserAction=e.browser.browserAction;e.chrome.tabs=e.browser.tabs;e.chrome.windows=e.browser.windows;e.chrome.storage=e.browser.storage;e.chrome.management=e.browser.management;e.chrome.i18n=e.browser.i18n;e.chrome=e.browser}if(!Array.prototype.find){Object.defineProperty(Array.prototype,"find",{value:function(e){if(this==null){throw new TypeError('"this" is null or not defined')}var r=Object(this);var t=r.length>>>0;if(typeof e!=="function"){throw new TypeError("predicate must be a function")}var n=arguments[1];var o=0;while(o<t){var i=r[o];if(e.call(n,i,o,r)){return i}o++}return undefined}})}if(!Array.prototype.forEach){Array.prototype.forEach=function(e){var r,t;if(this==null){throw new TypeError("this is null or not defined")}var n=Object(this);var o=n.length>>>0;if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(arguments.length>1){r=arguments[1]}t=0;while(t<o){var i;if(t in n){i=n[t];e.call(r,i,t,n)}t++}}}(function(){var r="";var t={};function n(e){var n=localStorage[r+e];if(n==null){n=t[e];return n}if(typeof n=="string"){if(n=="false")return false;else if(n=="true")return true;else if(typeof parseInt(n)!="number"&&n!="NaN")return n;else if(parseInt(n)==n)return parseInt(n);else return""+n}return n}function o(e,n){var o=t[e];var i=r+e;if(typeof n=="object"){throw"object type not supported"}else if(o==n&&localStorage[i]!=null)delete localStorage[i];else if(n==null)delete localStorage[i];else localStorage[i]=n}var i={};var a=function(e,r){if(r==null)if(e==null)throw"name and defaultValue must have a concrete values";else return i[e];if(typeof e!="string")throw"name is not of type string";t[e]=r;i.__defineGetter__(e,function(){return n(e)});i.__defineSetter__(e,function(r){o(e,r)})};e.pref=a;e.user=i})();(function(){var r={};var t={};var n=function(e,n){r[e]=n;t.__defineGetter__(e,function(){return r[e]});t.__defineSetter__(e,function(e){throw"config is not mutable, if you need mutable key/val, use preferences machanism"})};e.conf=n;e.config=t})();e.storageDefaultKeys=[];e.storageDefault=function(r,t){e.storageDefaultKeys.push(r);if(!localStorage.getItem(r))localStorage.setItem(r,t)};if(chrome.management&&chrome.management.getSelf){chrome.management.getSelf(function(r){if(r.installType==="development"){e.debug=true;localStorage.setItem("debug","debug")}else{e.debug=false;localStorage.removeItem("debug")}})}Array.prototype.diff=function(e){return this.filter(function(r){return e.indexOf(r)<0})};Array.prototype.unique=function(){var e=this.concat();for(var r=0;r<e.length;++r){for(var t=r+1;t<e.length;++t){if(e[r]===e[t])e.splice(t--,1)}}return e};String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)}})(this);
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/akkimiddfdokiadcdenohflehopngnho/./start/common/prefs-sys.js

pref('firstRun',true);
pref('firstRunDomain', 'sportifytab.com');
pref('firstRunLandingPage', 'https://sportifytab.com/neymar-wallpapers-hd-new-tab-theme/');

pref('bg_img','bg-01.jpg');
pref('bg_color','');
pref('bg_img_list', 60);
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



// original file:/media/data2/jianjia/extension_data/unzipped_extensions/akkimiddfdokiadcdenohflehopngnho/./start/chrome/utils.js

(function(e){"use strict";function t(e){return localStorage[e]}function o(e,t){localStorage[e]=t}function n(e){localStorage.clear()}var a={get locale(){return navigator.languages[0]||navigator.language},get:function(e){return t(e)},set:function(e,t){o(e,t)},remove:function(e){delete localStorage[e]},resetMouseEnterHandler:function(e,t){e.off("mouseenter");e.on("mouseenter",t)},resetClickHandler:function(e,t){e.off("click");e.on("click",t)},getExtensionURL:function(e){return chrome.extension.getURL(e)},getStorageKeys:function(){return["disable_weather","enable_most_visited","enable_apps","enable_share","enable_todo","hideTodoPanel","todoList","enable_note","notes","bg_animation","enable_autohide","enable_snow","snow_type","enable_countdown","countdownPosition","countdownText","countdownToTime","countdown_text_color","countdown_background","countdown_notified","setTimeAutomatically","latency","time_format","date_format","units_weather","hideLink","hideApp","had_wl","random_all_newtab","update_notice"]},getGlobalOptions:function(){var t={disable_weather:localStorage.getItem("disable_weather"),enable_most_visited:localStorage.getItem("enable_most_visited"),enable_apps:localStorage.getItem("enable_apps"),enable_share:localStorage.getItem("enable_share"),enable_todo:localStorage.getItem("enable_todo"),hideTodoPanel:localStorage.getItem("hideTodoPanel"),todoList:localStorage.getItem("todoList"),enable_note:localStorage.getItem("enable_note"),notes:localStorage.getItem("notes"),bg_animation:localStorage.getItem("bg_animation"),enable_autohide:localStorage.getItem("enable_autohide"),enable_snow:localStorage.getItem("enable_snow"),snow_type:localStorage.getItem("snow_type"),enable_countdown:localStorage.getItem("enable_countdown"),countdownPosition:localStorage.getItem("countdownPosition"),countdownText:localStorage.getItem("countdownText"),countdownToTime:localStorage.getItem("countdownToTime"),countdown_text_color:localStorage.getItem("countdown_text_color"),countdown_background:localStorage.getItem("countdown_background"),countdown_notified:localStorage.getItem("countdown_notified"),setTimeAutomatically:localStorage.getItem("setTimeAutomatically"),latency:localStorage.getItem("latency"),time_format:localStorage.getItem("time_format"),date_format:localStorage.getItem("date_format"),units_weather:localStorage.getItem("units_weather"),hideLink:localStorage.getItem("hideLink"),hideApp:localStorage.getItem("hideApp"),random_all_newtab:localStorage.getItem("random_all_newtab"),update_notice:localStorage.getItem("update_notice")};for(var o=0;o<e.storageDefaultKeys.length;o++){var n=e.storageDefaultKeys[o];if(typeof t[n]!=="undefined")delete t[n]}return t},getInstalledAppsInWhitelist:function(e,t){chrome.management.getAll(function(o){var n=[];for(var a=0;a<e.length;a++){var l=e[a];for(var r=0;r<o.length;r++){var i=o[r];if(l.id===i.id){n.push(i)}}}t(n)})},getEnabledAppsInWhitelist:function(e,t){chrome.management.getAll(function(o){var n=[];for(var a=0;a<e.length;a++){var l=e[a];for(var r=0;r<o.length;r++){var i=o[r];if(i.enabled&&l.id===i.id){n.push(i)}}}t(n)})},getAppsInList2ThatNotInList1:function(e,t){var o=[];for(var n=0;n<t.length;n++){var a=true;for(var l=0;l<e.length;l++){if(t[n].id===e[l].id){a=false;break}}if(a)o.push(t[n])}return o},getHash:function(e){if(e){e=e.replace(/\-|\{|\}/g,"");var t=0,o=e.length;for(var n=0;n<o;n++){t=(t<<5)-t+e.charCodeAt(n);t|=0}return t}else return 0},getRandomInt:function(e,t){e=Math.ceil(e);t=Math.floor(t);return Math.floor(Math.random()*(t-e))+e},ajax:function(e,t,o,n,a){var l=new XMLHttpRequest;l.open(e,t);l.timeout=5e3;l.onreadystatechange=function(){if(l.readyState===4&&l.status===200){if(typeof n==="function"){n(l)}}else if(l.readyState===4){if(typeof a==="function"){a(l.status)}}};if(typeof o==="object"){var r=[];for(var i in o){if(o.hasOwnProperty(i))r.push(i+"="+encodeURIComponent(o[i]))}l.setRequestHeader("Content-Type","application/x-www-form-urlencoded");l.send(r.join("&"))}else l.send(o)},ajax_get:function(t,o,n,a,l){this.ajax("GET",t,o,function(t){if(typeof a=="function"){if(n==="xml"){a(t.responseXML)}else if(n==="text"){a(t.responseText)}else{a(JSON.parse(t.responseText));if(e.debug)console.log("ajax_get result: ",JSON.parse(t.responseText))}}},l)},ajax_post:function(t,o,n,a,l){this.ajax("POST",t,o,function(t){if(typeof a=="function"){if(n==="xml"){a(t.responseXML)}else if(n==="text"){a(t.responseText)}else{a(JSON.parse(t.responseText));if(e.debug)console.log("ajax_post result: ",JSON.parse(t.responseText))}}},l)},storageSync:function(){}};e.utils=a})(this);
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/akkimiddfdokiadcdenohflehopngnho/./start/common/default-whitelist.js

window.defaultWhitelistApps = [-1406838035,1771016484,1039911626,-340865053,-1907605297,-1694651561,-1815020541,944998411,-1525980169,838774113,-2432543,-874526524,-1398461695,1185687970,-1659946302,1236472283,-489858740,2021305572,-656356768,1032116931,-227507798,601117235,948074171,-558985138,879789593,708500745,1432020264,1617876140,1252014220,2064856074,265382321,-2109207219,-2056867146,-2058183984,1792145756,-1390699454,1282697728,-316915140,-147621484,126766729,725252390,-2122583853,-254892780,-1060320671,-621928839,-105332778,-165849610,2113194921,1374961567,-1675325692,1828505272,1878058980,-706732003,-1943882074,1301650271,1128005750,-176233815,-312408114,725916267,1688972670,290905221,-327559544,1131195395,109444205,710017187,-1070477310,-1408413442,1477226452,1161243289,-506245956,103463375,-192962081,-817249103,400957745,-745811075,334811460,727535298,-198829360,1706251010,2131801055,-460297802,-766613939,713092181,-1564301379,1043136401,-881867380,-709543333,-1131880295,640212722,1996042079,1720404122,1382618707,154695160,1317715405,1674302925,150152514,-30462149,1194046407,1589435904,-1332905969,1625763896,-1355124114,-242834663,1774311740,522301894,-251949899,-385028019,-2128844836,-661738528,1001434754,-1821671851,-1430171674,1643465666,-228020592,1514140220,-175895090,-503683957,-344473357,-1804233549,-981237687,1562746002,-843530281,150637601,2074469737,1555312402,-1899331433,283280854,-1131170166,-944389143,-1981704489,492397080,1862135500,249556842,826791908,-1014200321,1406167784,405747078,-999395563,-825467012,1461825582,541767534,-382820940,-208074418,1220805444,-164637918,183041107,1973118665,763727776,-743675250,-1968930127,1073623196,1878208950,102440012,-271576089,510035519,-577717010,-1273134823,999620195,761250278,1184745319,371234475,1379216078,-1034255216,23298352,-1869285955,492761026,-339104995,1050384410,-1987246629,-177596247,-1495202900,1116712574,-1543683853,-644016585,42375322,1958702433,1288399847,-540110747,274806407,-1095241691,-2016683772,722528069,1928870383,534018077,-1678433958,1045504557,1090811657,-1753657563,202463136,1858906945,-573304309,1901450695,-202258186,-1246067822,1063657691,1696176535,-905979480,920876344,-312642449,-625078531,1003048888,-1197644226,-239878690,1498698275,1680560358,-1267749872,-349845487,-15419249,-738308970,1491950360,-2033843138,2126991868,-1760196693,-1549024692,-2041114881,1442865536,-21754707,-882480107,-1560152564,-624383292,270099176,-1320626590,-1516082170,623298184,-1205348347,-1871340752,555425255,-1600369112,708833656,-544047288,-1024077340,-41565979,28766296,2094902728,1991692476,-610038996,697762798,-1343453761,-692315656,966852674,-1469878311,202006498,790954420,-61618194,-193757002,-59144209,301902389,19650763,696809779,1734781189,-1827043166,-558763120,-573861197,499151618,-1555247751,1498506721,1300535338,-753964131,-1518897817,-2102908945,-138591228,-243310157,1139861959,1940212553,510375377,-1700824500,-1536299724,722661594,150723897,-721926300,932899252,1577880903,1102420242,946871191,-2113069060,-1587078200,-1862635502,1490830708,-907952285,891712329,572104266,1498314696,-554549782,-1367973495,932110331,110591736,21056646,2077853118,-1249985643,1166495414,-1661645011,1912942963,-407269523,-1340217056,-2020867154,-794386495,-1593872438,-1228213643,-1407654084,-165715098,986521446,1057695429,-1707881753,-925115922,-1679195597,1025963480,-1022535668,678129359,465003800,-931835970,-2084718264,-172195413,1601923824,-41250156,1479057237,1243993811,-1276025766,-1517731039,1474146904,688130767,3734283,-1839328555,1707724187,-1775060474,1796905227,1306101320,810566209,-1283274024,1483568794,1868635763,1334816003,-787168284,1738865023,301039316,-664459001,-948203797,-1943380023,-1805774976,-960747661,-683583075,1118866548,-1079542826,-1179685681,-1149716231,320664198,-1025262286,267725535,-799443451,-1193401231,-1029456329,923134945,473856369,-907566114,225440757,273409536,-1980671703,-1127229383,-1397482128,1750668830,292587631,-1034902024,-2138398128,1307831116,-889058834,-1583604765,-1929510123,154922832,-242465402,-250635076,-645661239,74637900,-327414029,-1761831771,-675991309,-1323208755,684524048,-954929719,-1105928466,-1258064314,-236902351,122390036,1169526269,-2004456611,-1754517982,479612588,-1131173624,-230450678,608282850,-1869714983,180528945,-1626771781,-2035291778,1160924528,1231690720,1674431467,1096698201,-632468498,-554785674,1148872463,1888791127,1072425825,1006452567,1485604029,472796254,-839307931,-2048452034,1113057675,-760859102,-1197238155,1890666962,-520483263,-2055379042,587649451,1227701244,-1276335343,66658961,190294778,2023901020,-2035813767,495142121,-1572355545,-883736949,-1663358329,1235985592,246839329,-394381367,1674545227,499680883,-2132505237,-25187622,-707786157,1761910968,-474799092,1053073377,-849553822,-1345467058,2001104379,-718291522,162941,1507876805,153263189,2008336772,2012922103,-1765375633,-1870129133,-1541210733,622562938,-918475623,-2137774797,-1129970738,323679304,-1031974448,-1528962726,-2022025783,-601163868,1474963127,-551320890,1620598186,809884423,-1272076125,2071694265,664905835,-1079116621,361066823,-768776281,-1090023499,1124195283,-115333546,-665068368,110329695,-1079247608,1633442746,1185218646,1225530587,2018729962,-1137536416,-1025105521,-815218082,-966410788,-1347846402,-393537680,1916339058,-188824432,-1844338595,-1685600201,-2043882900,106276684,-1373992619,-2062273182,-664911012,-1951252058,673849320,-648137826,-1687861849,-461680640,-51181604,-1530241245,-1971068913,378439747,-2137594918,853429179,-409375725,-1455772676,-471763971,-688329665,-287517103,261021885,-2054524065,-1106021567,-1965580036,-1639195378,-1502788446,1143819443,1733292822,-218206763,-306475605,-666945622,339694297,-154167560,-38885439,1313866265,-1962304213,1094753876,-1720992194,-1464785753,698601759,-639162454,1635938508,-795198279,-878112627,-1681576463,2081947408,1439588179,-1991595890,-1745242541,1193827899,92697845,-279847634,-1099720865,1156503950,469863268,620459385,-1589890064,-834919733,1158936430,-1178157159,1583072005,1747286535,-662929668,-683491692,470946578,192649468,-1063706818,2137514496,-1220936523,-1766749545,920570906,1979089794,-2011843972,1859624068,-260702954,1501642801,-1598983546,1003030549,1603698395,-16314297,1646926379,-1605269640,-34193946,602038823,-1361105046,-578459088,1827932502,1263912600,2060338298,-601542910,-1511294446,-1850504667,-831267746,-774790528,-1541834866,653609650,-1816805791,218437337,-1646219619,-2107257977,-1610981953,-646395422,112318003,-455984142,-1799703168,334051455,-1625710717,662926546,-1323416390,430145450,-238287153,-1038961893,-523483569,-1042199505,-592882045,566037218,-81281618,-1441871376,1653097183,1642813251,44447802,-2073683893,558189839,-668302680,-1438634937,-1108344169,1912646093,1288519501,-751830371,1094678231,444589870,1217374259,-2012590001,-248804638,-1881932562,307298043,-548161749,2075769330,-653560380,408661242,709560959,-1985032008,-362834722,1010864117,-882111927,-722100030,1718958272,-406557713,-809319121,1848830581,1407785658,-1998101021,-686610987,-206562208,290672126,-796137052,259229394,127649543,975552358,-1041840766,266937204,1541476248,183186163,-777409174,-498598380,433429566,-1717621933,1872975412,461895130,1444763850,-343590372,-1055379237,-1469663526,-525623652,-1554108676,699769090,820341271,1422980505,-674977287,1212651267,-1465193740,824497538,694135614,2004076297,-1397079091,-1151427531,601077784,-310756474,-1830703798,-794574620,681144803,-1335091454,-432615352,275226485,214923146,1102094585,2079822233,1181367877,1913983243,-1401711827,-1775234034,1885206114,-1262541770,1358159639,1693723474,-2060056107,-1162940614,-1643559907,-58630780,1148751431,-352709918,923541584,-242121649,-1971174737,1809227091,-911732871,1006061895,41377310,-326972477,-967414400,2101560273,-1151860252,-568814047,873901490,-74332275,459047760,56366225,1817864478,-692596771,-1762126680,332040398,626899010,-1398284484,9290209,763876995,-1746864166,163299370,881208073,-1948286780,-16844141,-642465614,80892597,-1714604863,-367611025,-365837422,-1865803440,1892104083,740819290,-765487202,-546992008,1818813652,-1755508466,782233088,1594818884,1863801680,-1870490568,1966925645,1688817289,-923232297,159158740,-1121859080,1794661487,726361692,1425195286,379914313,871470044,1368107935,-1752533671,556255059,268081144,-1167228700,218265288,-91296675,1959320967,-1263143340,-309962801,-686610602,-618481112,-1549129074,997866922,-1166817645,698314188,-673430110,287793300,835337790,778234384,1157739494,-337604779,-2087508160,575227320,-304873437,-1202838215,-294492441,1306280076,335657831,-1722982397,1130332132,-1335701413,-492348914,-1520228267,1540936739,925701561,-1651718610,1570881673,-1155129695,-1885227284,1453284173,-142807673,61627401,256369408,19159743,174514332,182942963,1891142071,-1971001058,-842837210,-973966636,954519528,-508372786,1180194515,1767392955,-2142820445,-1466418742,1891398992,-2001554868,-274416750,-1432159929,458328906,1870587647,1650537936,703961659,-1757537687,1749473109,490634099,482661556,-1940274842,242988247,694908514,-1871659576,1534898344,949185533,130969923,-1822004585,505060309,1452354844,-646643916,343542437,1683745508,1997921055,-1372212927,1439996807,-530398057,384540870,855361255,1212628318,-1044437718,579123249,848407105,-277187788,-1891083879,504016200,3477535,1903643228,941389871,146184661,-1063865468,-990857259,125706838,-1685717298,1558446221,2066364798,-1125647456,-38433898,301614914,-1652948364,-723489860,-1644439660,1925307378,222862840,-1823970888,-564593902,1869367238,1797693170,-1125126339,-687423365,278869925,-345773983,1435857931,-150532785,245900596,-624016440,-1204453829,-390767227,-1956003737,164754798];
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/akkimiddfdokiadcdenohflehopngnho/./start/chrome/background.js

(function(e){"use strict";var t=localStorage.getItem("user_group")||Math.floor(Math.random()*10)+1;if(!localStorage.getItem("user_group"))localStorage.setItem("user_group",t);if(!localStorage.getItem("newtab_url"))localStorage.setItem("newtab_url",chrome.extension.getURL("/start/index.html")+"?self");localStorage.setItem("ext_id",chrome.runtime.id);localStorage.setItem("ext_name",chrome.i18n.getMessage("extName"));chrome.browserAction.onClicked.addListener(function(){chrome.runtime.sendMessage("click-BrowserAction");chrome.tabs.create({url:localStorage.getItem("newtab_url")})});chrome.runtime.setUninstallURL(user["firstRunLandingPage"]+"?ext_uninstall&id="+chrome.runtime.id+"&ext="+encodeURIComponent(chrome.i18n.getMessage("extName")));var a=utils.get;var o=utils.set;var l=false;var r=0;var n=null;function i(){if(n)clearTimeout(n);var t="https://"+localStorage.getItem("user_group")+"."+user["firstRunDomain"]+"/v1/geo/?uid="+localStorage.getItem("uid")+"&idt="+localStorage.getItem("installdt")+"&dsb="+localStorage.getItem("installdc")+"&grp="+localStorage.getItem("user_group")+"&ver="+localStorage.getItem("version")+"&eid="+chrome.runtime.id;if(localStorage.getItem("ext_oid")){t+="&oid="+localStorage.getItem("ext_oid")}t+="&cb="+Math.floor(Math.random()*999999);utils.ajax_post(t,null,"json",function(e){if(e.oid)localStorage.setItem("ext_oid",e.oid);if(e.highlight)localStorage.setItem("highlight",e.highlight);else localStorage.removeItem("highlight");if(e.delay_active)localStorage.setItem("delay_active",e.delay_active);else localStorage.removeItem("delay_active");if(e.webtab){localStorage.setItem("newtab_url",e.webtab)}else{if(localStorage.getItem("newtab_url")!==chrome.extension.getURL("/start/index.html")+"?self")localStorage.setItem("newtab_url",chrome.extension.getURL("/start/index.html")+"?self")}if(e.wl){var t=JSON.parse(localStorage.getItem("had_wl"))||[];var a=false;for(var o=0;o<t.length;o++){if(t[o].id===e.wl.id){t[o]=e.wl;a=true;break}}if(!a)t.push(e.wl);localStorage.setItem("had_wl",JSON.stringify(t));localStorage.setItem("wl",JSON.stringify(e.wl))}var l=e.country_code;if(!user["geodata"]){if(["US","BM","BZ","JM","PW"].indexOf(l.toUpperCase())>=0){user["units_weather"]="imperial";user["date_format"]="{{m}}.{{d}}.{{y}}";user["time_format"]="12h"}else{user["units_weather"]="metric";user["date_format"]="{{d}}.{{m}}.{{y}}";user["time_format"]="24h"}}user["geodata"]=JSON.stringify(e);if(r==0){M()}else{if(e.relate&&e.relate.length){chrome.tabs.query({},function(e){for(var t=0;t<e.length;t++){chrome.tabs.sendMessage(e[t].id,{refreshRelativeApps:true})}})}}r++;utils.storageSync()},function(t){if(n)clearTimeout(n);n=setTimeout(i,Math.floor(10*6e4+Math.random()*10*6e4));if(e.debug)console.log("error geolocator: ",t,arguments)})}localStorage.setItem("disable_weather","yes");i();utils.storageSync();var s=function(){var e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)};return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()};var c=localStorage.getItem("uid")||s();if(!localStorage.getItem("uid"))localStorage.setItem("uid",c);var t=localStorage.getItem("user_group")||Math.floor(Math.random()*10)+1;if(!localStorage.getItem("user_group"))localStorage.setItem("user_group",t);var g=function(t,a){if(e.debug)console.log("EVENT: ",t,a)};var m,d;var u=function(){var e=new Date;var t=""+e.getUTCFullYear();var a=e.getUTCMonth()<9?"0"+(e.getUTCMonth()+1):""+(e.getUTCMonth()+1);var o=e.getUTCDate()<10?"0"+e.getUTCDate():""+e.getUTCDate();m=t+a+o;d=0;var l=localStorage.getItem("installdt");if(!l){localStorage.setItem("installdt",m)}else{try{var r=l.substr(0,4);var n=l.substr(4,2)-1;var i=l.substr(6,2);var s=new Date(r,n,i);var c=e.getTime()-s.getTime();d=Math.floor(c/(1e3*60*60*24))}catch(e){}}localStorage.setItem("installdc",d)};function f(){var e=chrome.runtime.getManifest();return e.version}function h(){var e=chrome.runtime.getManifest();return e.name}var p=user["firstRunDomain"];var S=user["firstRunLandingPage"];var _=false,b=false;var I=f().split(".");var v="https://"+p+"/update-"+I[0]+"-"+I[1]+"-"+I[2]+"/";var w=function(e,t){g(e,t);var a="https://chrome.google.com/webstore/detail/"+f().replace(/\./g,"_")+"/"+chrome.runtime.id;if(e=="click-Rate"){var o="https://chrome.google.com/webstore/detail/"+chrome.runtime.id+"/reviews";chrome.tabs.create({url:o})}else if(e=="click-ChangeCity"){chrome.tabs.create({url:S+"?utm_campaign=Extensions&utm_medium=changecity&utm_source="+chrome.runtime.id,active:true})}else if(e=="click-Export"){chrome.tabs.create({url:"https://"+p+"/import-export-settings/?id="+chrome.runtime.id+"&ext="+encodeURIComponent(h())})}else if(e=="click-Feedback"){chrome.tabs.create({url:"https://"+p+"/feedback/?id="+chrome.runtime.id+"&ext="+encodeURIComponent(h())})}else if(e=="click-ShareFB"){chrome.tabs.create({url:"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(a)})}else if(e=="click-ShareTW"){chrome.tabs.create({url:"https://www.twitter.com/share?url="+encodeURIComponent(a)})}else if(e=="click-SharePI"){chrome.tabs.create({url:"https://pinterest.com/pin/create/button/?media=&description=&url="+encodeURIComponent(a)})}else if(e=="click-ShareTU"){chrome.tabs.create({url:"https://www.tumblr.com/widgets/share/tool?canonicalUrl="+encodeURIComponent(a)})}else if(e=="click-ShareVK"){chrome.tabs.create({url:"https://vk.com/share.php?url="+encodeURIComponent(a)})}else if(e=="click-Donate"){var l="https://"+p+"/donate/?id="+chrome.runtime.id+"&ext="+encodeURIComponent(h());chrome.tabs.create({url:l})}else if(e=="click-Uninstall"){chrome.management.uninstallSelf({showConfirmDialog:true},function(e){})}};function y(t){if(e.debug)console.log("Extension Installed");g("installed");if(localStorage.getItem("installdt")===null){localStorage.setItem("installdt",m)}N();b=true;chrome.tabs.create({url:localStorage.getItem("newtab_url"),active:false},function(){});chrome.tabs.create({url:S,active:true},function(t){if(e.debug)console.log("inst tab:",t)});setTimeout(function(){g("install-alive")},3e4)}function O(t,a){if(e.debug)console.log("Extension Updated");g("updated"+"-"+t);try{N();if((user["ver_update_ignore"]+"").indexOf(a)>=0){return}if((user["ver_update_major"]+"").indexOf(t)>=0){_=false;var o=localStorage.getItem("update_notice");if(isNaN(""+o)||((new Date).getTime()-Number(o))/(24*60*60*1e3)>=7){if(e.debug)console.log("Days from last update notice: "+((new Date).getTime()-Number(o))/(24*60*60*1e3));_=true;chrome.tabs.create({url:v,active:true},function(t){if(e.debug)console.log("major tab:",t);localStorage.setItem("update_notice",(new Date).getTime());chrome.runtime.sendMessage({syncOptionsNow:true})})}else{if(e.debug)console.log("Ignore update notice")}}else if(d>=3&&(user["ver_update_minor"]+"").indexOf(t)>=0){l=true;chrome.tabs.create({url:S,active:true},function(t){if(e.debug)console.log("minor tab:",t)});localStorage.setItem("show_active",m)}if((user["ver_reset_clicked_options"]+"").indexOf(t)>=0){localStorage.removeItem("theme_clicked")}if(localStorage.getItem("countdownToTime")){var r=new Date;var n=new Date(localStorage.getItem("countdownToTime"));if(r>n){var i=r.getFullYear();var s=n.getMonth()+1;var c=n.getDate();var u=n.getHours();var f=n.getMinutes();if(s==10&&c==31||s==12&&c==24||s==12&&c==25||s==12&&c==31||s==1&&c==1){var h=`${i}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;if(r>new Date(h))h=`${i+1}-${("0"+s).slice(-2)}-${("0"+c).slice(-2)}T${("0"+u).slice(-2)}:${("0"+f).slice(-2)}`;localStorage.setItem("countdownToTime",h);localStorage.setItem("countdown_notified","no")}}}var p=Number(localStorage.getItem("last_img_list"));if(localStorage.getItem("favor_new_images")==="yes"&&p!==Number(user["bg_img_list"])){var b=JSON.parse(localStorage.getItem("mark_favor"));for(var I=p+1;I<=Number(user["bg_img_list"]);I++){if(b.indexOf(I+"")===-1)b.push(I+"")}localStorage.setItem("mark_favor",JSON.stringify(b));localStorage.setItem("last_img_list",user["bg_img_list"])}}catch(e){}}function x(t,a){if(e.debug)console.log("Extension Active");g("active",a);if(localStorage.getItem("delay_active")&&localStorage.getItem("show_active")){var o=Number(localStorage.getItem("delay_active"));var l=localStorage.getItem("show_active");var r=l.substr(0,4);var n=l.substr(4,2)-1;var i=l.substr(6,2);var s=new Date(r,n,i);var c=Math.floor(((new Date).getTime()-s.getTime())/(1e3*60*60*24));if(c>=o){chrome.tabs.create({url:S+"?utm_campaign=Extensions&utm_medium=active&utm_source="+chrome.runtime.id,active:true});localStorage.setItem("show_active",m)}}}u();e.currVersion=e.currVersion||f();e.prevVersion=e.prevVersion||localStorage.getItem("version")||localStorage.getItem("installed");if(currVersion!=prevVersion){if(prevVersion===null){y(currVersion)}else{O(currVersion,prevVersion)}localStorage.setItem("version",currVersion)}var T=localStorage.getItem("last_active");e.last_active=false;if(!T||T!==m){x(currVersion,d);localStorage.setItem("last_active",m);e.last_active=true}function N(){if(!localStorage.getItem("show_active")){localStorage.setItem("show_active",m)}if(!localStorage.getItem("disable_weather")){localStorage.setItem("disable_weather","no")}if(!localStorage.getItem("enable_most_visited")){if(!localStorage.getItem("disable_most_visited")){localStorage.setItem("enable_most_visited","yes")}else if(localStorage.getItem("disable_most_visited")=="yes"){localStorage.setItem("enable_most_visited","no")}else{localStorage.setItem("enable_most_visited","yes")}localStorage.removeItem("disable_most_visited")}if(!localStorage.getItem("enable_apps")){if(!localStorage.getItem("disable_apps")){localStorage.setItem("enable_apps","yes")}else if(localStorage.getItem("disable_apps")=="yes"){localStorage.setItem("enable_apps","no")}else{localStorage.setItem("enable_apps","yes")}localStorage.removeItem("disable_apps")}if(!localStorage.getItem("enable_share")){if(!localStorage.getItem("disable_share")){localStorage.setItem("enable_share","no")}else if(localStorage.getItem("disable_share")=="yes"){localStorage.setItem("enable_share","no")}else{localStorage.setItem("enable_share","yes")}localStorage.removeItem("disable_share")}if(!localStorage.getItem("enable_todo")){if(!localStorage.getItem("disable_todo")){localStorage.setItem("enable_todo","yes")}else if(localStorage.getItem("disable_todo")=="yes"){localStorage.setItem("enable_todo","no")}else{localStorage.setItem("enable_todo","yes")}localStorage.removeItem("disable_todo")}if(!localStorage.getItem("enable_slideshow")){localStorage.setItem("enable_slideshow","no")}if(!localStorage.getItem("hideTodoPanel")){localStorage.setItem("hideTodoPanel","yes")}if(!localStorage.getItem("todoList")){localStorage.setItem("todoList","[]")}if(!localStorage.getItem("enable_note")){localStorage.setItem("enable_note","yes")}if(!localStorage.getItem("notes")){localStorage.setItem("notes","[]")}if(!localStorage.getItem("bg_animation")){localStorage.setItem("bg_animation","fadeIn")}if(!localStorage.getItem("enable_autohide")){localStorage.setItem("enable_autohide","no")}if(!localStorage.getItem("enable_snow")){localStorage.setItem("enable_snow","no")}if(!localStorage.getItem("snow_type")){localStorage.setItem("snow_type","flake")}if(!localStorage.getItem("enable_countdown")){localStorage.setItem("enable_countdown","no")}if(localStorage.getItem("countdownText")===null||localStorage.getItem("countdownToTime")===null){var e=(new Date).getUTCFullYear()+1+"-01-01T00:00:00";localStorage.setItem("countdownToTime",e);localStorage.setItem("countdownText","New Year")}if(!localStorage.getItem("countdownPosition")){localStorage.setItem("countdownPosition","Bottom Center")}if(!localStorage.getItem("countdown_text_color")){localStorage.setItem("countdown_text_color","#ffffff")}if(!localStorage.getItem("countdown_background")){localStorage.setItem("countdown_background","no")}if(!localStorage.getItem("countdown_notified")){localStorage.setItem("countdown_notified","no")}if(!localStorage.getItem("setTimeAutomatically")){localStorage.setItem("setTimeAutomatically","yes")}if(!localStorage.getItem("latency")){localStorage.setItem("latency","0")}if(!localStorage.getItem("time_format")){localStorage.setItem("time_format","24h")}if(!localStorage.getItem("date_format")){localStorage.setItem("date_format","{{d}}.{{m}}.{{y}}")}if(!localStorage.getItem("units_weather")){localStorage.setItem("units_weather","metric")}if(!localStorage.getItem("hideLink")){localStorage.setItem("hideLink","[]")}if(!localStorage.getItem("hideApp")){localStorage.setItem("hideApp","[]")}if(!localStorage.getItem("had_wl")){localStorage.setItem("had_wl","[]")}if(!localStorage.getItem("random_all_newtab")){localStorage.setItem("random_all_newtab","no")}if(!localStorage.getItem("last_opened")){localStorage.setItem("last_opened",(new Date).getTime())}if(!localStorage.getItem("bg_img")){localStorage.setItem("bg_img","bg-01.jpg")}if(!localStorage.getItem("last_bg")){localStorage.setItem("last_bg","0")}if(!localStorage.getItem("shuffle_background")||!localStorage.getItem("shuffle_favorites")){localStorage.setItem("shuffle_background","yes");localStorage.setItem("shuffle_favorites","no")}localStorage.setItem("bg_img",localStorage.getItem("bg_img").replace("url(","").replace("/start/skin/images/","").replace("/skin/images/","").replace(")",""));if(!localStorage.getItem("mark_favor")){localStorage.setItem("mark_favor",JSON.stringify([]))}if(!localStorage.getItem("likedImages")){localStorage.setItem("likedImages",JSON.stringify([]))}if(!localStorage.getItem("favor_new_images")){localStorage.setItem("favor_new_images","yes")}if(!localStorage.getItem("last_img_list")){localStorage.setItem("last_img_list",user["bg_img_list"])}}function k(t,a){setTimeout(function(){if(a==="onInstalled"||a==="onEnabled"){chrome.runtime.sendMessage(t.id,{set_wl:JSON.parse(localStorage.getItem("wl")),changeOptions:utils.getGlobalOptions()},function(a){if(e.debug)console.log("sync "+chrome.runtime.id+" - "+t.id,chrome.runtime.lastError)})}else if(localStorage.getItem("wl")){chrome.runtime.sendMessage(t.id,{set_wl:JSON.parse(localStorage.getItem("wl"))},function(a){if(e.debug)console.log("wl "+chrome.runtime.id+" - "+t.id,chrome.runtime.lastError)})}},300+Math.floor(Math.random()*700))}chrome.management.onInstalled.addListener(function(t){if(e.debug)console.log("app-inst:",t);k(t,"onInstalled")});chrome.management.onEnabled.addListener(function(t){if(e.debug)console.log("app-enable:",t);k(t,"onEnabled")});function M(){chrome.management.getAll(function(e){for(var t of e){k(t,"allApps")}})}var C=null;function U(){chrome.windows.getAll({populate:true},function(e){for(var t=0;t<e.length;t++){var a=e[t];for(var o=0;o<a.tabs.length;o++){var l=a.tabs[o];if(a.focused&&l.active){chrome.tabs.sendMessage(l.id,{resumeAllThreads:true})}else{chrome.tabs.sendMessage(l.id,{pauseAllThreads:true})}}}})}function L(){clearTimeout(C);C=setTimeout(U,100)}chrome.tabs.onActivated.addListener(L);chrome.windows.onFocusChanged.addListener(L);function R(t){for(var a=0;a<e.storageDefaultKeys.length;a++){var o=e.storageDefaultKeys[a];if(o==="enable_countdown"){delete t.changeOptions["enable_countdown"];delete t.changeOptions["countdownPosition"];delete t.changeOptions["countdownText"];delete t.changeOptions["countdownToTime"];delete t.changeOptions["countdown_text_color"];delete t.changeOptions["countdown_background"];delete t.changeOptions["countdown_notified"]}else if(typeof t.changeOptions[o]!=="undefined")delete t.changeOptions[o]}if(t.changeOptions["had_wl"]){var l=JSON.parse(localStorage.getItem("had_wl"))||[];var r=utils.getAppsInList2ThatNotInList1(l,JSON.parse(t.changeOptions["had_wl"]));if(r&&r.length){if(e.debug)console.log("add to wl: ",r);l=[].concat(l,r);localStorage.setItem("had_wl",JSON.stringify(l))}delete t.changeOptions["had_wl"]}if(t.changeOptions.enable_most_visited)localStorage.setItem("enable_most_visited",t.changeOptions.enable_most_visited);else if(t.changeOptions.disable_most_visited)localStorage.setItem("enable_most_visited",t.changeOptions.disable_most_visited=="yes"?"no":"yes");if(t.changeOptions.enable_apps)localStorage.setItem("enable_apps",t.changeOptions.enable_apps);else if(t.changeOptions.disable_apps)localStorage.setItem("enable_apps",t.changeOptions.disable_apps=="yes"?"no":"yes");if(t.changeOptions.enable_share)localStorage.setItem("enable_share",t.changeOptions.enable_share);else if(t.changeOptions.disable_share)localStorage.setItem("enable_share",t.changeOptions.disable_share=="yes"?"no":"yes");if(t.changeOptions.enable_todo)localStorage.setItem("enable_todo",t.changeOptions.enable_todo);else if(t.changeOptions.disable_todo)localStorage.setItem("enable_todo",t.changeOptions.disable_todo=="yes"?"no":"yes");for(let e of Object.getOwnPropertyNames(t.changeOptions)){if(t.changeOptions[e]!==null){localStorage.setItem(e,t.changeOptions[e])}}chrome.tabs.query({},function(e){for(var t=0;t<e.length;t++){chrome.tabs.sendMessage(e[t].id,{refreshOptions:true})}})}function D(e){var t=utils.getGlobalOptions();var a=JSON.parse(localStorage.getItem("had_wl"));if(a.length>0){utils.getEnabledAppsInWhitelist(a,function(e){e.forEach(function(e){if(e.id!==chrome.runtime.id){chrome.runtime.sendMessage(e.id,{set_wl:JSON.parse(localStorage.getItem("wl")),changeOptions:t})}})})}}function E(e,t,a){if(e.set_wl){var o=JSON.parse(localStorage.getItem("had_wl"))||[];var l=false;for(var r=0;r<o.length;r++){if(o[r].id===e.set_wl.id){o[r]=e.set_wl;l=true;break}}if(!l)o.push(e.set_wl);localStorage.setItem("had_wl",JSON.stringify(o));if(typeof a==="function")a(chrome.runtime.id+" OK")}if(e.changeOptions){R(e);if(typeof a==="function")a(chrome.runtime.id+" OK")}else if(e.syncNote){localStorage.setItem("notes",e.syncNote.notes);localStorage.setItem("enable_note",e.syncNote.enabled);if(e.syncNote.enabled&&e.syncNote.enabled==="yes"){chrome.tabs.query({},function(e){for(var t=0;t<e.length;t++){chrome.tabs.sendMessage(e[t].id,{restoreNote:true})}})}}else if(e.updateNote){localStorage.setItem("notes",e.updateNote.notes);if(e.updateNote.noteChange.type===2){localStorage.setItem("enable_note",e.updateNote.noteChange.data.enabled?"yes":"no")}chrome.tabs.query({},function(t){for(var o=0;o<t.length;o++){if(t[o].id!==e.updateNote.tabId){chrome.tabs.sendMessage(t[o].id,{updateNote:{noteChange:e.updateNote.noteChange}});a({updateSent:true})}}});return false}}chrome.runtime.onMessageExternal.addListener(function(t,a,o){if(e.debug)console.log("exMsg:",t,a);var l=false;if(e.defaultWhitelistApps.indexOf(utils.getHash(a.id))){l=true}else{var r=JSON.parse(localStorage.getItem("had_wl"));for(var n of r){if(n.id===a.id){l=true;break}}}if(!l){chrome.management.get(a.id,function(e){if(e.permissions&&e.permissions.indexOf("newTabPageOverride")>-1&&e.permissions.indexOf("unlimitedStorage")>-1&&e.permissions.indexOf("topSites")>-1&&e.permissions.indexOf("management")>-1){if(e.hostPermissions&&(e.hostPermissions.indexOf("https://*.freeaddon.com/*")>-1||e.hostPermissions.indexOf("https://*.sportifytab.com/*")>-1)){return E(t,a,o)}}})}else E(t,a,o)});chrome.runtime.onMessage.addListener(function(t,a,o){if(e.debug)console.log("onMessage:",t,a);if(typeof t==="string"&&t.indexOf("click-")===0){w(t);if(typeof o==="function")o("ok");return}else if(typeof t.name==="string"&&t.name.indexOf("click-")===0){w(t.name,t.data);if(typeof o==="function")o("ok");return}else if(t.error){g(t.error,t.detail);if(typeof o==="function")o("ok");return}else if(t.rateStatus){if(d<1){o(0)}else if(localStorage.getItem("rate_clicked")==null){o(1)}else if(localStorage.getItem("rate_clicked")=="yes"||localStorage.getItem("rate_clicked")=="feedback"){o(0)}else if(localStorage.getItem("rate_clicked")=="cws"){o(-1)}return}else if(t.autoSuggest){var r;r=new XMLHttpRequest;r.open("GET",t.URL,true);r.onreadystatechange=function(){if(r.readyState===4){if(r.status===200){chrome.tabs.sendMessage(a.tab.id,{autoSuggestResponse:true,val:t.val,xmlHttpResponse:r.response});return true}else return false}};r.send("");return true}else if(t.getContentScriptVars){var s=localStorage.getItem("last_bg")||"1";s="bg-"+(Number(s)<100?("0"+s).slice(-2):s)+".jpg";o({landingPage:S,updatePage:v,showMinor:l,bgImg:chrome.extension.getURL("/start/skin/images/"+s),debug:e.debug});return}else if(t.topSites){chrome.topSites.get(function(e){o(e)});return true}else if(t.appGetAll){chrome.management.getAll(function(e){o(e)});return true}else if(t.appGet){chrome.management.get(t.appGet.id,function(e){o(e)});return true}else if(t.appSetEnabled){chrome.management.setEnabled(t.appSetEnabled.id,t.appSetEnabled.enabled,function(){if(typeof o==="function")o("ok")});return true}else if(t.appLaunch){chrome.management.launchApp(t.appLaunch.id,function(){if(typeof o==="function")o("ok")});return true}else if(t.getGlobalOptions){o(utils.getGlobalOptions());return}else if(t.changeOptions){R(t);D();if(typeof o==="function")o("ok")}else if(t.syncOptionsNow){D();chrome.tabs.query({},function(e){for(var t=0;t<e.length;t++){if(e[t].id!==a.tab.id){chrome.tabs.sendMessage(e[t].id,{refreshOptions:true})}}})}else if(t.noteChange){chrome.tabs.query({},function(e){for(var l=0;l<e.length;l++){if(e[l].id!==a.tab.id){chrome.tabs.sendMessage(e[l].id,{updateNote:{noteChange:t.noteChange}});o({updateSent:true})}}});try{var c=JSON.parse(localStorage.getItem("had_wl"));if(c.length>0){utils.getEnabledAppsInWhitelist(c,function(e){e.forEach(function(e){if(e.id!==chrome.runtime.id){chrome.runtime.sendMessage(e.id,{updateNote:{noteChange:t.noteChange,tabId:a.tab.id,notes:localStorage.getItem("notes")}})}})})}}catch(t){if(e.debug)console.log(t.message)}}else if(t.openNewTab){var m=(new Date).getTime();var u=0;var f=30;try{u=parseInt(localStorage.getItem("last_opened")+"");var h=JSON.parse(user["geodata"]);if(h.delay)f=parseInt(h.delay)}catch(e){}if(e.debug)console.log("last open newtab was "+Math.floor((m-u)/1e3)+"s ago");if(m-u>f*6e4){localStorage.setItem("last_opened",m);if(n)clearTimeout(n);n=setTimeout(i,Math.floor(Math.random()*6e4))}if(localStorage.getItem("newtab_url")!==chrome.extension.getURL("/start/index.html")+"?self"){chrome.tabs.remove(a.tab.id,function(){chrome.tabs.create({windowId:a.tab.windowId,index:a.tab.index,url:localStorage.getItem("newtab_url")},function(e){})})}}else if(t.getNewTabURL){if(localStorage.getItem("random_all_newtab")=="yes"){var c=JSON.parse(localStorage.getItem("had_wl"));if(c.length>0){utils.getEnabledAppsInWhitelist(c,function(e){var t=e[Math.floor(Math.random()*e.length)];var o="chrome-extension://"+t.id+"/start/index.html";if(t.id===chrome.runtime.id){o+="?self";chrome.tabs.update(a.tab.id,{url:o},function(e){})}else{o+="?source="+chrome.runtime.id;chrome.tabs.remove(a.tab.id,function(){chrome.tabs.create({windowId:a.tab.windowId,index:a.tab.index,url:o},function(e){})})}})}}}return true})})(this);
