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
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/cngodoeanflglpcllhnlcohpgejhglfk/background.js

//var mainurl='https://192.168.10.5:8443/sxp';
var mainurl='https://sso.infinitiretail.com/MiddlewareRestServices';
var cbsUrl='http://127.0.0.1:7070';
var isCBSEnabled = false;
var languageListOeByOne;
var multi_domain_value='';
var multi_domain_id='';
var extensionAppData = null;
var task={};
var appName={};
var tabURL = "";
 var valToOpen1;
chrome.tabs.onCreated.addListener(function(tab){
    tabid = tab.id;
	task[tab.id]="init";
	chrome.storage.local.get('chkBoxChkd', function (result) {
		if(result.chkBoxChkd == "true")
		{
		window.console.log("result.chkBoxChkd on Tab created="+result.chkBoxChkd);
		  task[tab.id] = "AppOnboard";
		}
		else if(result.chkBoxChkd == "true")
		{
		window.console.log("result.chkBoxChkd on Tab created="+result.chkBoxChkd);
		 task[tab.id] = "init";
		}

   });
});
chrome.tabs.onUpdated.addListener(function(tabid, tabchgobj, tab)
{
	chrome.browserAction.setIcon({path:"icon.png"});
try{
	if(task[tab.id]=="undefined"||task[tab.id]==undefined)
	{
task[tab.id]="init";
	}
if(task[tab.id]=="init")
{
var turl=tab.url;
tabURL = turl || "";
var tid=tab.id;
var userTypeAndLoggedInUserName =checkUserLogin();

var userType=userTypeAndLoggedInUserName;
if(userType.userType == "user" || userType.userType=="admin")
{
	
	chrome.browserAction.setIcon({path: 'icon1.png'});
try{

chrome.storage.local.get('js', function (result) {
	if(result.js!="NoData")
		{
			console.log("inside data js " );
chrome.tabs.sendMessage(tabid, {msg: "sso1",js:result.js},function(response){});
		}
});

}catch(e){ }

try{
	
chrome.storage.local.get('chkBoxChkd', function (result) {

 if(tab.status=="complete"&&result.chkBoxChkd=="true"&&turl.indexOf("addApplication?signonoptions")==-1)
	 {
 chrome.tabs.sendMessage(tabid, {msg: "sso"},function(response){});
 }});}catch(e){}
 if(turl.indexOf(mainurl)==-1&&tab.status=="complete")
	{
		var AppListDetail =appListDetail(true);
	}
else if(tab.status=="complete")
	{
	var AppListDetail =appListDetail(false);
	}

if (typeof AppListDetail === "object") {
	AppListDetail=JSON.stringify(AppListDetail);
}
var AppList=JSON.parse(AppListDetail);
 for(j=0;j<AppList.content.length;j++)
{
	try{
		
	if((turl.indexOf("doSSO?")!=-1))
	{
		var result = turl.split("?");
		var req = result[1];
		var finalSplt = req.split("&");
		appNameSplt=finalSplt[0].split("=");
		appName[tab.id] = appNameSplt[1];
	}
	else if((turl.indexOf("doSSO1?")!=-1))
	{
		var result = turl.split("?");
		var req = result[1];
		var finalSplt = req.split("&");
		appNameSplt=finalSplt[0].split("=");
		appName[tab.id] = appNameSplt[1];
	}
	}catch(e){}

try{
  									 if(
											( ($.trim(AppList.content[j].url)!=""&&decodeURIComponent(turl).match(AppList.content[j].url)
											 ||
											 (turl==AppList.content[j].url)
											 ||
											 (turl.indexOf(AppList.content[j].url)!=-1)
											 ||
											 (AppList.content[j].url.indexOf(turl)!=-1)
											 ||
											 decodeURIComponent(turl).indexOf(AppList.content[j].url)!=-1
											 ||
											 AppList.content[j].url.indexOf(decodeURIComponent(turl))!=-1
											 ||
											 decodeURIComponent(turl).indexOf(AppList.content[j].url)!=-1)
											 &&
											 ($.trim(AppList.content[j].appId)==$.trim(decodeURIComponent(appName[tab.id]))||appName[tab.id]==""||appName[tab.id]==undefined))
											 ||

											 ($.trim(AppList.content[j].url)==$.trim(turl)&&($.trim(AppList.content[j].appName)==$.trim(decodeURIComponent(appName[tab.id]))||(appName[tab.id]==undefined||appName[tab.id]==""))))


									   {
										var flagMasking,flagInvalidLoginDetection;
										var appId=AppList.content[j].appId;
										 var masking=AppList.content[j].masking;

										   if(masking==true)
										   {
										   flag="YES";
										   }
										   else
										   {
										   flag="NO";
										   }
										   if(flag=="YES"&&tab.status=="loading")
										   {

										   chrome.tabs.sendMessage(tabid, {msg: "MakingAtLoading"},function(response){});

										   }


										   var invalidLoginDetection=AppList.content[j].invalidLoginDetection;
										   if(invalidLoginDetection==true)
										   {
										   flagInvalidLoginDetection="YES";
										   }
										   else
										   {
										   flagInvalidLoginDetection="NO";
										   }


										   var delay=AppList.content[j].loginDelay;

										       var xhr3 = new XMLHttpRequest();
					                          	xhr3.open("POST",mainurl+"/extension/getAppCredsBasedOnSearch", true);
					                         	xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					                        	xhr3.send("appId="+appId);
					                        	xhr3.onload = function()
						                          {
						                         	if(this.status == 200)
						                                	{
                                                            var CredsAndJS =  xhr3.responseText;


						                                     var CredsAndJsJSON=JSON.parse(CredsAndJS);
															

															try{
															 if(CredsAndJsJSON.script!="undefined"&&CredsAndJsJSON.script!=undefined)
															 {  
															  chrome.tabs.sendMessage(tabid, {msg: "testSSO",js:CredsAndJsJSON},function(response){
																 
															  });
															}
															}catch(e){}
															
															 chrome.storage.local.get('chkBoxChkd', function (result) {

															 try{
																 
															 if(result.chkBoxChkd=="undefined"||result.chkBoxChkd==undefined)
															 {
																 
															 result.chkBoxChkd="false";
															 }
															 }catch(e){}
															 try{
																 

															 if(tab.status=="complete"&&result.chkBoxChkd=="false")
															 {
																
                                                             chrome.tabs.sendMessage(tabid, {msg: "doSSO",js:CredsAndJsJSON,masking:flag,
															 invalidLoginDetection:flagInvalidLoginDetection,delay:delay},function(response){});

															  }
									                          }catch(e){}
															  });

                                                              }

                                                    }

										break;

										}
}catch(e){}

}

}
}
else if(task[tab.id]=="AppOnboard")
{
var turl=tab.url;

var tid=tab.id;
var userTypeAndLoggedInUserName =checkUserLogin();
var userType=JSON.parse(userTypeAndLoggedInUserName);

if(userType.userType == "user" || userType.userType=="admin")
{
chrome.storage.local.get('chkBoxChkd', function (result) {

 if(tab.status=="complete"&&result.chkBoxChkd=="true"&&turl.indexOf("addApplication?signonoptions")==-1)
	 {

 chrome.tabs.sendMessage(tabid, {msg: "sso"},function(response){});
 }});


}
}
else if(task[tab.id]=="ShowInfoBarMasking")
{
setTimeout(function()
{
	chrome.tabs.sendMessage(tabid, {msg: "ShowInvalidBar",url:mainurl,msg2:"removemasking"},function(response){});


},2000);


}
else if(task[tab.id]=="abc")
{
}
}catch(e){}
});


	function checkUserLogin()
	  {
		
		  var data1;
	            $.ajax({
	            url:mainurl+"/extension/checkuserlogin",
	            type: 'POST',
	            data: {},
	            async: false,
	            success: function(data) {
				if(isJson(data)==false){
				
				data1 = data;
				}
				else
					{
	            		showUiAM();
					}
				},
	            error:function(data){
	            		showUiAM();
	            }
	        });
			return data1;
			
	    }
	function appListDetail(flag)
	  {
		  
	  var data1;
            $.ajax({
            url:mainurl+"/extension/getExtensionApps",
            type: 'POST',
            data: {appurl:tabURL},
            async: false,
            success: function(data) {
			data1 = data;
			
				if(!flag) {
				
					if (extensionAppData != JSON.stringify(data)) {
						extensionAppData = JSON.stringify(data);
			            var xhr = new XMLHttpRequest();
			            xhr.open("POST", cbsUrl + "/setAppData", true);
			            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			            xhr.send(JSON.stringify(data));
				
			            xhr.onload = function() {
			            };

			            xhr.onerror = function() {
			            };
			        }
				}
			}
        });
		
		return data1;
    }



function getTokenStatus()
{
	var responseToken="";
	$.ajax({

		url:cbsUrl+'/getSxpTokenValue',
		type:'POST',
		data:{},
		async: false,
		success:function(response)
		{
			responseToken=response;
		},
		error:function(response)
		{
		}
	});
return responseToken;
}
function sso()
{

var sxpssoxmldata = "";
var sxpssojs = "";


        chrome.storage.local.get('sxpssoxml', function (result) {

		sxpssoxmldata = result.sxpssoxml + "</sso>";

		chrome.storage.local.get('sxpssojs', function (result){

		sxpssojs = result.sxpssojs + "]]></JS>" ;


		appXml = "<appxmldata>" + sxpssoxmldata + sxpssojs + "</appxmldata>";
		if(appXml.indexOf("document") == -1)
		{
		$("#err2").show();
		$('#err2').css({'color':'red'});

		$('#FinishedCapturing').css({'background-color':'red'});
		}
		else
		{
		$("#err1").show();
		$('#err1').css({'color':'green'});
		$('#FinishedCapturing').css({'background-color':'darkgrey'});
		document.getElementById('sxptoggleExtnUsage').checked=false;
		chrome.storage.local.set({'chkBoxChkd': "false"}, function() {});

		}

    $.ajax({
        url:mainurl+'/admin/sendAppXmlAndJs',
        type: 'POST',
        data: {appXmlData:appXml} ,
        // expected format for response
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
        },
        error: function () {
        }
    });

  chrome.storage.local.set({'sxpssoxml':""}, function() {});
 chrome.storage.local.set({'sxpssojs':""}, function() {});
   });


   });


}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if(request.statMsg == "MaskingAtLoading")
	{
	}
	else if(request.statMsg == "MaskingAtLoading1")
	{
		task[sender.tab.id]="DontShowMsgAgain";
	}
	else if(request.statMsg == "Masking")
	{
	   task[sender.tab.id] = "abc";
	   try{
		   if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='pass']")!=null)
			   {
	   setTimeout(function()
			   {
	 	chrome.tabs.sendMessage(tabid, {msg1:"removemasking"},function(response){});},4000);}	}catch(e){}
	}
	else if(request.statMsg == "doMaskingAndInvalidLogin")
	{

	   task[sender.tab.id] = "ShowInfoBarMasking";
	   try{
	   if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='pass']")!=null)
		   {

	   setTimeout(function()
	   {
	   	chrome.tabs.sendMessage(tabid, {msg: "ShowInvalidBar",url:mainurl,msg2:"removemasking"},function(response){});


	   },4000);	}	}catch(e){}

	}
	else if(request.statMsg == "TestSSOCleanData")
	{
	chrome.storage.local.set({'js':"NoData"}, function() {});
	}
	else if(request.statMsg == "sxpTokenToNode")
	{
		$.ajax({

			url:cbsUrl+'/sxpauth',
			type:'POST',
			data:request.sxpToken,
			success:function(response)
			{
			},
			error:function(response)
			{
			}
		});


	}
	else if(request.statMsg == "checkSxpTokenValue")
	{
$.ajax({

			url:cbsUrl+'/getSxpTokenValue',
			type:'POST',
			data:{},
			success:function(response)
			{

				$.ajax({

					url:cbsUrl+'/getMultifactorValue',
					type:'get',
					data:{},
					success:function(response1)
					{
					try{

						chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){console.debug(d[0].id);
						chrome.tabs.sendMessage(d[0].id, {msg: "getTokenValue",tokenValue:response,multiValue:response1},function(response){});
						})

					}catch(e){}
					}
				});




			},
			error:function(response)
			{
			}
		});
	}
	else if(request.statMsg == "sxpMultiFactorToken")
	{
		 var s1 = new XMLHttpRequest;
			s1.open("POST",cbsUrl+"/sxpMultiFactorValue",true);
			s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	        s1.send(request.multifactorStatus);
	     s1.onreadystatechange = function()
	     {
	   	 };




	}

	else if(request.statMsg == "checkSxpTokenValueStatus")
	{
		var userTypeAndLoggedInUserName =checkUserLogin();
		var userType=JSON.parse(userTypeAndLoggedInUserName);
		if(userType.cbs===true&&userType.iwaStatus==false)
			{
$.ajax({

			url:cbsUrl+'/getSxpTokenValue',
			type:'POST',
			data:{},
			success:function(response)
			{
			try{

				chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){console.debug(d[0].id);
				chrome.tabs.sendMessage(d[0].id, {msg: "getTokenValueStatus",tokenValue:response},function(response){});
				})

			}catch(e){}
			},
			error:function(response)
			{
			}
		});
			}
	}
	else if(request.statMsg == "logoutRequestIwa")
	{
		 var s1 = new XMLHttpRequest;
			s1.open("POST",cbsUrl+"/invalidate",true);
			s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	        s1.send();
	     s1.onreadystatechange = function()
	     {

	   	 };

	   	 extensionAppData = null;


	}
	else if(request.statMsg == "logoutRequest")
	{
		 var s1 = new XMLHttpRequest;
			s1.open("POST",cbsUrl+"/invalidate",true);
			s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	        s1.send();
	     s1.onreadystatechange = function()
	     {
	    	 try{
					chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){console.debug(d[0].id);
					chrome.tabs.sendMessage(d[0].id, {msg: "logout",url:mainurl},function(response){});
					});

				}catch(e){}
	   	 };

	   	 extensionAppData = null;


	}
	else if (request.statMsg == "getMultifactorTokenForIwa")
	{
		$.ajax({

			url:cbsUrl+'/getMultifactorValue',
			type:'get',
			data:{},
			async:false,
			success:function(response)
			{
			if(response=="true"){
			$.ajax({

				url:mainurl+'/IwaSkipMFA',
				type:'POST',
				async:false,
				data:{},
				success:function(response)
				{

					response=JSON.parse(response);
					if(response.url){
						try {
                            chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
                                console.debug(d[0].id);
                                chrome.tabs.sendMessage(d[0].id, {responsskipiwa: "iwaSkip",iwaRedirectUrl:response.url}, function(response){});
                            });
                        } catch(e) {}

					}
				}
			});
			}

			}
		});

	}

	else if (request.statMsg == "reloadAppData") {
		var AppListDetail = appListDetail(false);
	}

	else if (request.statMsg == "launchBookMarkUrl")
	{
        // check if token exist

		if (request.bPrefandBmarkResp.indexOf("ThickClient") === 0) {
			// send app data
       		// var AppListDetail = appListDetail(false);
            var s1 = new XMLHttpRequest;
            s1.open("POST", cbsUrl + "/launchBookmark", true);
            s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            s1.send(request.bPrefandBmarkResp);
            s1.onreadystatechange = function() {
                if (s1.readyState != 4 && s1.status == 200) {
                } else if (s1.readyState == 4 && s1.status == 200) {
                	if (s1.responseText == "error") {
						try {
						    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
						        console.debug(d[0].id);
						        chrome.tabs.sendMessage(d[0].id, {responseError: "error"}, function(response){});
						    });
						} catch(e) {}
					}
                } else {
                    try {
                        chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
                            console.debug(d[0].id);
                            chrome.tabs.sendMessage(d[0].id, {msg: "cbsError"}, function(response){});
                            extensionAppData = null;
                        });
                    } catch(e) {}
                }
            }
		} else {
	        // check if token exist
			var userTypeAndLoggedInUserName = checkUserLogin();
			console.log("TESTING userTypeAndLoggedInUserName"+ userTypeAndLoggedInUserName);
			//console.log("TESTING userTypeAndLoggedInUserName Parsed"+ JSON.parse(userTypeAndLoggedInUserName));
			var userType = userTypeAndLoggedInUserName;
			console.log("TESTING userType"+ userType);
	        var xhrGetToken = new XMLHttpRequest();
			console.log("TESTING----------------- 14 ---------------------");
	        xhrGetToken.open("POST", cbsUrl + "/getSxpTokenValue", true);
	        xhrGetToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	        xhrGetToken.send(null);

	        xhrGetToken.onreadystatechange = function() {
	            if (xhrGetToken.readyState != 4 && xhrGetToken.status == 200) {
	            } else if (xhrGetToken.readyState == 4 && xhrGetToken.status == 200) {
	            	// send app data
	            	// var AppListDetail = appListDetail(false);

	                var token = xhrGetToken.responseText;
	                if (token !== "" && token !== "AUTH" && token !== "AUTHFAILED" || userType.iwaStatus == true) {
	                    var s1 = new XMLHttpRequest;
	                    s1.open("POST", cbsUrl + "/launchBookmark", true);
	                    s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	                    s1.send(request.bPrefandBmarkResp);
	                    s1.onreadystatechange = function(){
	                        if (s1.readyState != 4 && s1.status == 200) {
	                        } else if (s1.readyState == 4 && s1.status == 200) {
	                        	if (s1.responseText == "error") {
									try {
										chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
											console.debug(d[0].id);
											chrome.tabs.sendMessage(d[0].id, {responseError: "error"}, function(response){});
										});
									} catch(e) {}
								}
	                        } else {
	                            try {
	                                chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
	                                    console.debug(d[0].id);
	                                    chrome.tabs.sendMessage(d[0].id, {msg: "cbsError"}, function(response){});
	                                    extensionAppData = null;
	                                });
	                            } catch(e) {}
	                        }
	                    }
	                } else if (request.bPrefandBmarkResp.indexOf("ThickClient") != -1) {
	                	// send app data
	                	// var AppListDetail = appListDetail(false);

	                    var s1 = new XMLHttpRequest;
	                    s1.open("POST", cbsUrl + "/launchBookmark", true);
	                    s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	                    s1.send(request.bPrefandBmarkResp);
	                    s1.onreadystatechange = function() {
	                        if (s1.readyState != 4 && s1.status == 200) {
	                        } else if (s1.readyState == 4 && s1.status == 200) {
	                        	if (s1.responseText == "error") {
									try {
									    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
									        console.debug(d[0].id);
									        chrome.tabs.sendMessage(d[0].id, {responseError: "error"}, function(response){});
									    });
									} catch(e) {}
								}
	                        } else {
	                            try {
	                                chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
	                                    console.debug(d[0].id);
	                                    chrome.tabs.sendMessage(d[0].id, {msg: "cbsError"}, function(response){});
	                                    extensionAppData = null;
	                                });
	                            } catch(e) {}
	                        }
	                    }
	                } else {
						try {
							chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
								console.debug(d[0].id);
								chrome.tabs.sendMessage(d[0].id, {msg: "logout", url:mainurl}, function(response){});
							});
						} catch(e) {}
	                }
	            } else {
	                try {
	                    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
	                        console.debug(d[0].id);
	                        chrome.tabs.sendMessage(d[0].id, {msg: "cbsError"}, function(response){});
	                        extensionAppData = null;
	                    });
	                } catch(e) {}
	            }
	        };
		}

}//end
});

function showUiAM()
{
var dv=document.getElementById("AMUI");
var a=document.createElement("a");
a.id="AMID"
	a.innerHTML="Click Here To Login";
a.href=mainurl;
dv.appendChild(a);
a.addEventListener("click", AmClick);
document.getElementById('select1').style.display = 'none';
a.style.fontSize='20px';
chrome.browserAction.setIcon({path:"icon.png"});
}
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

