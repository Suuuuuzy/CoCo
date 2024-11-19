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
MarkSource(Document_element.prototype.innerText, "document_body_innerText");

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

Document.prototype.execCommand = function(text){
    sink_function(text, "document_execCommand_sink");
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

$.when = function(func1, func2){
    func1();
    func2();
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

//  ========= window ========= 

// targetWindow.postMessage(message, targetOrigin, [transfer]);
// window.postMessage = function(message, targetOrigin, [transfer]){
//     sink_function(message, 'window_postMessage_sink');
// };

// // target.addEventListener(type, listener [, options]);
// // the 'e' parameter passed to listener can be ignored, otherwise, it is the event object
// window.addEventListener = function(type, listener,  [options]){
//     MarkAttackEntry('cs_window_eventListener_' + type, listener);
// };


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
    return new externalNativePort(connectInfo);
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

Chrome.prototype.bookmarks.search = function(query, callback){
    var node = new BookmarkTreeNode();
    var child = new BookmarkTreeNode();
    node.children = [child];
    var BookmarkTreeNode_source = [node];
    MarkSource(BookmarkTreeNode_source, 'BookmarkTreeNode_source');
    callback(BookmarkTreeNode_source);
    sink_function(query, 'BookmarkSearchQuery_sink');
}

Chrome.prototype.bookmarks.create = function(bookmark, callback){
    var node = new BookmarkTreeNode();
    var child = new BookmarkTreeNode();
    node.children = [child];
    var BookmarkTreeNode_source = [node];
    sink_function(bookmark, 'BookmarkCreate_sink');
    MarkSource(BookmarkTreeNode_source, 'BookmarkTreeNode_source');
    callback(BookmarkTreeNode_source);
}

Chrome.prototype.bookmarks.remove = function(id, callback){
    sink_function(bookmark, 'BookmarkRemove_sink');
    callback();
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
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/js/misc.js

function getUILanguage(short) {
    $language = chrome.i18n.getUILanguage().toLowerCase().replace('-', '_');
    if (!short) {
        return $language;
    }
    return $language.split('_')[0];
}

function addContextMenu(menu) {
    if (menu.languages && (menu.languages.indexOf('all') >= 0 || menu.languages.indexOf(getUILanguage()) >= 0 || menu.languages.indexOf(getUILanguage(true)) >= 0)) {
        if (!menu.type) {
            menu.type = 'normal';
        }
        chrome.contextMenus.create({
            parentId: menu.parentId,
            id: menu.id,
            title: menu.title,
            type: menu.type,
            contexts: menu.contexts,
            onclick: menu.onclick
        });
    }
}

function openTab(url) {
    chrome.tabs.create({ 
        url: url, 
        active: true 
    });
}

function openPrivacyWindow(url) {
    chrome.windows.create({
        url: url,
        state: 'maximized',
        incognito: true
    });
}

function createUUID() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/js/background.js

let gaClientId = localStorage.getItem('__gaClientId');
let browserType = '';
let DOMAIN = 'https://abcdpdf.com';
let API_DOMAIN = 'https://abcdpdf.com/api';
const INSTALL_URL = DOMAIN + '/index.html';
const UNINSTALL_URL = DOMAIN + '/uninstall.html';
const SHORTCUT_MAX_COUNT = 15;
const GA_TRACKING_ID = 'abcd';

const EVENTS = {
    HEART: 'heart',
    SEARCH_BOOKMARKS: 'search_bookmarks',
    SEARCH_HISTORY: 'search_history',
    NOTIFI: 'notifi',
    OPEN_NEW_TAB: 'open_new_tab',
    OPEN_NEW_WINDOW: 'open_new_window',
    OPEN_INCOGNITO: 'open_incognito',
    COLLECT_WEBSITE: 'collect_website',
    SET_USER_STATUS: 'set_user_status'
};

const DetectClient = {
    isChrome: function() {
        return /chrome/i.test(navigator.userAgent) && !DetectClient.isEdge() && !DetectClient.isEdgeForChromium();
    },

    isFirefox: function() {
        return /firefox/i.test(navigator.userAgent);
    },

    isEdge: function() {
        return /edge/i.test(navigator.userAgent);
    },

    isEdgeForChromium: function() {
        return /edg/i.test(navigator.userAgent);
    }
};

let startPage = 'chrome://newtab/';
if (DetectClient.isChrome()) {
    browserType = 'chrome';
} else if (DetectClient.isFirefox()) {
    browserType = 'firefox';
    startPage = chrome.runtime.getURL("dist/index.html");
} else if (DetectClient.isEdgeForChromium()) {
    browserType = 'edge';
    startPage = 'edge://newtab/';
}

const browserInfo = Browser();

if (!gaClientId) {
    gaClientId = browserInfo.name.substr(0, 2).toLocaleLowerCase() + GA_TRACKING_ID + 'xx-' + createUUID();
    localStorage.setItem('__gaClientId', gaClientId);
}


function GA(placeholder, params) {
    let hitType = params.hitType;
    let postData = "v=1&tid=" + GA_TRACKING_ID + "&cid=" + gaClientId + "&t=" + hitType + '&vp=' + (window.innerWidth + 'x' + window.innerHeight) + '&sr=' + (window.screen.width + 'x' + window.screen.height)
                    + "&bt=" + browserInfo.name + "&bv=" + browserInfo.fullVersion + "&os=" + browserInfo.os + "&tz=" + (Intl.DateTimeFormat()).resolvedOptions().timeZone + "&re=" + window.document.referrer;
    if (hitType == 'pageview') {
        if (params.page) {
            postData += "&dp=" + params.page;
        }
        if (params.title) {
            postData += "&dt=" + params.title;
        }
    } else if (hitType == 'event') {
        let eventCategory = params.eventCategory || '';
        let eventAction = params.eventAction || '';
        let eventLabel = params.eventLabel || '';
        postData += "&ec=" + eventCategory + "&ea=" + eventAction + "&el=" + eventLabel;
    }

    const _gaUri = 'https://sa.abcdpdf.com/collect?';
    let image = new Image(1, 1);
    image.src = _gaUri + postData;
};

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        // chrome.tabs.create({url: startPage});
        chrome.tabs.create({url: INSTALL_URL + '?cid=' + gaClientId});
    }
    
    GA('send', {
        hitType: 'event',
        eventCategory: details.reason,
        eventAction: browserType,
        eventLabel: 'clientId: ' + gaClientId
    });
});

chrome.runtime.setUninstallURL(UNINSTALL_URL + '?cid=' + gaClientId);

chrome.tabs.onCreated.addListener(function (tab) {
    let locSetting = localStorage.getItem('setting');
    if (locSetting) {
        locSetting = JSON.parse(locSetting);
        if (locSetting.searchFocus) {
            if (browserType == 'chrome') {
                if (tab.pendingUrl && tab.pendingUrl === startPage && tab.incognito === false) {
                    chrome.tabs.create({ url: 'dist/index.html' }, function (tab1) {
                        chrome.tabs.update(tab1.id, { url: startPage });
                    });
                    chrome.tabs.remove(tab.id);
                }
            } else if (browserType == 'edge') {
                if (tab.pendingUrl && tab.pendingUrl === startPage && tab.incognito === false) {
                    chrome.tabs.create({ url: 'dist/index.html' }, function (tab1) {
                        chrome.tabs.update(tab1.id, { url: startPage });
                    });
                    chrome.tabs.remove(tab.id);
                }
            } else if (browserType == 'firefox') {
                // if (tab.url == 'about:blank' && tab.favIconUrl != 'chrome://browser/skin/customize.svg' && tab.title.indexOf('about:') == -1 && !tab.openerTabId) {
                //     chrome.tabs.create({ url: startPage, openerTabId: tab.id });
                //     chrome.tabs.remove(tab.id);
                // }
            }            
        }
    }
});

chrome.contextMenus.create({
    id: 'menu_collect_page',
    title: chrome.i18n.getMessage('menu_collect_page'),
    contexts: ['page'],
    onclick: (info, tab) => {
        let _shortcut = {
            id: createId('website', 8),
            type: 'website',
            icon: tab.favIconUrl,
            name: tab.title,
            url: tab.url,
            bgColor: '#11B3D9',
            textColor: '#FFFFFF',
            sort: 0,
            page: '__default_desktop'
        }

        let account = localStorage.getItem('account');
        if (account) {
            _shortcut.page = null;
            account = JSON.parse(account);
            fetch(API_DOMAIN + '/shortcut/insert?uid=' + account.user_id + '&_t=' + new Date().getTime(), {
                method: 'post', 
                body: JSON.stringify(_shortcut),
                // mode: 'cors'
                headers: {
                    'Authorization': 'Bearer ' + account.token,
                    'Content-Type': 'application/json'
                }
            });
            return;
        }

        let pages = JSON.parse(localStorage.getItem('pages'));
        if (Object.keys(pages) == 0) {
            const _page = addPage();
            pages[_page.id] = _page;
        }
        for (let i in pages) {
            _shortcut.page = i;
            shortcut = insertShortcut(pages[i], _shortcut);
            if (shortcut) {
                pages[i] = shortcut;
                break;
            }
        }
        localStorage.setItem('pages', JSON.stringify(pages));
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'collect page'
        });
    }
});

function insertShortcut(locStorage, _shortcut) {
    let keys = Object.keys(locStorage.data);
    if (keys.length >= SHORTCUT_MAX_COUNT) {
        return false;
    }

    let sort = 0;
    if (keys.length > 0) {
        let idx = keys.length - 1;
        let lastKey = keys[idx];
        sort = parseInt(locStorage.data[lastKey].sort) + 1;
    }
    _shortcut.sort = sort;
    locStorage.data[_shortcut.id] = _shortcut;
    return locStorage;
}

function addPage() {
    let page = {};
    page.id = createId('desktop_', 8);
    page.name = 'Desktop';
    page.bgColor = '#FFFFFF';
    page.textColor = '#000000';
    page.locked = false;
    page.lockPass = null;
    page.sort = 1;
    page.data = {};
    return page;
}

// chrome.contextMenus.create({
//     id: 'menu_collect_link',
//     title: chrome.i18n.getMessage('menu_collect_link', [chrome.i18n.getMessage('extName')]),
//     contexts: ['link'],
//     onclick: (info, tab) => {
//         let data = {
//             icon: '',
//             title: info.linkUrl,
//             url: info.linkUrl
//         }
//         console.log(data);
//     }
// });

// chrome.contextMenus.create({
//     id: 'menu_wallpaper',
//     title: chrome.i18n.getMessage('menu_wallpaper', [chrome.i18n.getMessage('extName')]),
//     contexts: ['image'],
//     onclick: (info, tab) => {
//         console.log(info.srcUrl);
//     }
// });

const engineList = {
    google: { name: 'google', url: 'https://google.com/search', key: 'q' },
    bing: { name: 'bing', url: 'https://www.bing.com/search', key: 'q' },
    duckduckgo: { name: 'duckduckgo', url: 'https://duckduckgo.com', key: 'q' },
    yahoo: { name: 'yahoo', url: 'https://search.yahoo.com/search', key: 'p' },
    yandex: { name: 'yandex', url: 'https://yandex.com/search/', key: 'text' },
    baidu: { name: 'baidu', url: 'https://www.baidu.com/s', key: 'wd' },
};

chrome.contextMenus.create({
    id: 'menu_search',
    title: chrome.i18n.getMessage('menu_search', [chrome.i18n.getMessage('extName')]),
    contexts: ['selection'],
    onclick: (info, tab) => {
        let searchUrl = engineList.google.url;
        let searchKey = engineList.google.key;
        let setting = localStorage.getItem('setting');
        if (setting) {
            setting = JSON.parse(setting);
            if (setting.rightClickSearch) {
                let searchEngine = engineList[setting.rightClickSearch.name];
                searchUrl = searchEngine.url;
                searchKey = searchEngine.key;
            }
        }
        openTab(searchUrl + '?' + searchKey + '=' + info.selectionText);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'search by'
        });
    }
});

chrome.contextMenus.create({
    id: 'menu_search_privacy',
    title: chrome.i18n.getMessage('menu_search_privacy', [chrome.i18n.getMessage('extName')]),
    contexts: ['selection'],
    onclick: (info, tab) => {
        let searchUrl = engineList.google.url;
        let searchKey = engineList.google.key;
        let setting = localStorage.getItem('setting');
        if (setting) {
            setting = JSON.parse(setting);
            if (setting.rightClickSearch) {
                let searchEngine = engineList[setting.rightClickSearch.name];
                searchUrl = searchEngine.url;
                searchKey = searchEngine.key;
            }
        }
        openPrivacyWindow(searchUrl + '?' + searchKey + '=' + info.selectionText);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'search incognito'
        });
    }
});

chrome.contextMenus.create({
    id: 'menu_link_privacy',
    title: chrome.i18n.getMessage('menu_link_privacy', [chrome.i18n.getMessage('extName')]),
    contexts: ['link'],
    onclick: (info, tab) => {
        openPrivacyWindow(info.linkUrl);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'link incognito'
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

function listener(request, sender, sendResponse) {
    switch(request.event) {
        case EVENTS.HEART:
            sendResponse(true);
            break;
        case EVENTS.SEARCH_BOOKMARKS:
            searchBookmarks(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.SEARCH_HISTORY:
            searchHistory(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.OPEN_NEW_TAB:
            chrome.tabs.create({
                url: request.url
            });
            break;
        case EVENTS.OPEN_NEW_WINDOW:
            chrome.windows.create({
                url: request.url,
                state: 'maximized'
            });
            break;
        case EVENTS.OPEN_INCOGNITO:
            chrome.windows.create({
                url: request.url,
                incognito: true,
                state: 'maximized'
            });
            break;
        case EVENTS.SET_USER_STATUS:
            if (request.status && request.account) {
                localStorage.setItem('account', JSON.stringify(request.account));
            }
            break;
    }
}

function searchBookmarks(query) {
    return new Promise((resolve, reject) => {
        chrome.bookmarks.search(query, (res) => {
            resolve(res);
        });
    });
}

function searchHistory(query) {
    return new Promise((resolve, reject) => {
        chrome.history.search({ text: query, maxResults: 10 }, (res) => {
            resolve(res);
        });
    });
}

function createId(prefix, num) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let usort_id = [];
    let radix = chars.length;
    let len = num || 36;
    usort_id[0] = prefix || "ntp_";
    for (let i = 1; i < len; i++) usort_id[i] = chars[0 | Math.random() * radix];
    return usort_id.join('');
}

function Browser() {
    let userAgent = navigator.userAgent;
    let tem;

    let os = getOS(userAgent);
    let match = userAgent.match(/(opera|coast|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i) || [];

    tem = userAgent.match(/\bIEMobile\/(\S+[0-9])/);
    if (tem !== null) {
        return {
            name: 'IEMobile',
            version: tem[1].split('.')[0],
            fullVersion: tem[1],
            os: os
        };
    }

    if (/trident/i.test(match[1])) {
        tem = /\brv[ :]+(\S+[0-9])/g.exec(userAgent) || [];
        return {
            name: 'IE',
            version: tem[1] && tem[1].split('.')[0],
            fullVersion: tem[1],
            os: os
        };
    }

    if (match[1] === 'Chrome') {
        tem = userAgent.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return {
                name: 'Opera',
                version: tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }

        tem = userAgent.match(/\bEdg\/(\S+)/) || userAgent.match(/\bEdge\/(\S+)/);
        if (tem !== null) {
            return {
                name: 'Edge',
                version: tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }
    }
    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if (match[0] === 'Coast') {
        match[0] = 'OperaCoast';
    }

    if (match[0] !== 'Chrome') {
        let tem = userAgent.match(/version\/(\S+)/i)
        if (tem !== null && tem !== '') {
            match.splice(1, 1, tem[1]);
        }
    }

    if (match[0] === 'Firefox') {
        match[0] = /waterfox/i.test(userAgent) ?
            'Waterfox' :
            match[0];
    }

    return {
        name: match[0],
        version: match[1].split('.')[0],
        fullVersion: match[1],
        os: os
    };

    function getOS(userAgent) {
        if (userAgent.indexOf('Windows Phone') !== -1) {
            return 'Windows Phone';
        }
        if (userAgent.indexOf('Win') !== -1) {
            return 'Windows';
        }
        if (userAgent.indexOf('Android') !== -1) {
            return 'Android';
        }
        if (userAgent.indexOf('Linux') !== -1) {
            return 'Linux';
        }
        if (userAgent.indexOf('X11') !== -1) {
            return 'UNIX';
        }
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            return 'iOS';
        }
        if (userAgent.indexOf('Mac') !== -1) {
            return 'macOS X';
        }
        return 'unknown';
    }
}
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/js/config.js

const CMD_GET_BG = 'cmd_get_bg';
const CMD_CREATE_NOTIFICATIONS = 'cmd_create_notifications';
const BROWSER_ACTION_NUMBERS = 'browser_action_numbers';
const OPEN_EXTENSIONS = 'open_extensions';
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/js/addressparser.js

/**
 https://github.com/andris9/addressparser

 * Parses structured e-mail addresses from an address field
 *
 * Example:
 *
 *    'Name <address@domain>'
 *
 * will be converted to
 *
 *     [{name: 'Name', address: 'address@domain'}]
 *
 * @param {String} str Address field
 * @return {Array} An array of address objects
 */
function addressparser(str) {
    var tokenizer = new Tokenizer(str),
        tokens = tokenizer.tokenize();

    var addresses = [],
        address = [],
        parsedAddresses = [];

    tokens.forEach(function(token) {
        if (token.type === 'operator' && (token.value === ',' || token.value === ';')) { // v2 reverted change v1 removed token.value === ',' ||  because of this https://bitbucket.org/jasonsav/checker-plus-for-gmail/issues/108/issue-with-commas-in-from-name
            if (address.length) {
                addresses.push(address);
            }
            address = [];
        } else {
            address.push(token);
        }
    });

    if (address.length) {
        addresses.push(address);
    }

    addresses.forEach(function(address) {
        address = _handleAddress(address);
        if (address.length) {
			parsedAddresses = parsedAddresses.concat(address);
        }
    });

	parsedAddresses.forEach(function(parsedAddress) {
		// jason patch: let's use .email instead of .address
		parsedAddress.email = parsedAddress.address;
		delete parsedAddress.address;

		if (parsedAddress.name) {
			parsedAddress.name = parsedAddress.name.replace(/^'/, "").replace(/'$/, "");
		} else {
			// name might have been the same as email ie.  "<blah@hec.ca>" <blah@hec.ca>   so let's extract the email username
			if (parsedAddress.email) {
				parsedAddress.name = parsedAddress.email.split("@")[0];
			}
		}
	});

    return parsedAddresses;
}

/**
 * Converts tokens for a single address into an address object
 *
 * @param {Array} tokens Tokens object
 * @return {Object} Address object
 */
function _handleAddress(tokens) {
    var token,
        isGroup = false,
        state = 'text',
        address,
        addresses = [],
        data = {
            address: [],
            comment: [],
            group: [],
            text: []
        },
        i, len;

    // Filter out <addresses>, (comments) and regular text
    for (i = 0, len = tokens.length; i < len; i++) {
        token = tokens[i];

        if (token.type === 'operator') {
            switch (token.value) {
                case '<':
                    state = 'address';
                    break;
                case '(':
                    state = 'comment';
                    break;
                case ':':
                    state = 'group';
                    isGroup = true;
                    break;
                default:
                    state = 'text';
            }
        } else {
            if (token.value) {
                data[state].push(token.value);
            }
        }
    }

    // If there is no text but a comment, replace the two
    if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
    }

    if (isGroup) {
        // http://tools.ietf.org/html/rfc2822#appendix-A.1.3
        data.text = data.text.join(' ');
        addresses.push({
            name: data.text || (address && address.name),
            group: data.group.length ? addressparser(data.group.join(',')) : []
        });
    } else {
        // If no address was found, try to detect one from regular text
        if (!data.address.length && data.text.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
                if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
                    data.address = data.text.splice(i, 1);
                    break;
                }
            }

            var _regexHandler = function(address) {
                if (!data.address.length) {
                    data.address = [address.trim()];
                    return ' ';
                } else {
                    return address;
                }
            };

            // still no address
            if (!data.address.length) {
                for (i = data.text.length - 1; i >= 0; i--) {
                    data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^@\s]+\b\s*/, _regexHandler).trim();
                    if (data.address.length) {
                        break;
                    }
                }
            }
        }

        // If there's still is no text but a comment exixts, replace the two
        if (!data.text.length && data.comment.length) {
            data.text = data.comment;
            data.comment = [];
        }

        // Keep only the first address occurence, push others to regular text
        if (data.address.length > 1) {
            data.text = data.text.concat(data.address.splice(1));
        }

        // Join values with spaces
        data.text = data.text.join(' ');
        data.address = data.address.join(' ');

        if (!data.address && isGroup) {
            return [];
        } else {
            address = {
                address: data.address || data.text || '',
                name: data.text || data.address || ''
            };

            if (address.address === address.name) {
                if ((address.address || '').match(/@/)) {
                    address.name = '';
                } else {
                    address.address = '';
                }

            }

            addresses.push(address);
        }
    }

    return addresses;
}

/**
 * Creates a Tokenizer object for tokenizing address field strings
 *
 * @constructor
 * @param {String} str Address field string
 */
function Tokenizer(str) {
    this.str = (str || '').toString();
    this.operatorCurrent = '';
    this.operatorExpecting = '';
    this.node = null;
    this.escaped = false;

    this.list = [];
}

/**
 * Operator tokens and which tokens are expected to end the sequence
 */
Tokenizer.prototype.operators = {
    '"': '"',
    '(': ')',
    '<': '>',
    ',': '',
    ':': ';',
    // Semicolons are not a legal delimiter per the RFC2822 grammar other
    // than for terminating a group, but they are also not valid for any
    // other use in this context.  Given that some mail clients have
    // historically allowed the semicolon as a delimiter equivalent to the
    // comma in their UI, it makes sense to treat them the same as a comma
    // when used outside of a group.
    ';': ''
};

/**
 * Tokenizes the original input string
 *
 * @return {Array} An array of operator|text tokens
 */
Tokenizer.prototype.tokenize = function() {
    var chr, list = [];
    for (var i = 0, len = this.str.length; i < len; i++) {
        chr = this.str.charAt(i);
        this.checkChar(chr);
    }

    this.list.forEach(function(node) {
        node.value = (node.value || '').toString().trim();
        if (node.value) {
            list.push(node);
        }
    });

    return list;
};

/**
 * Checks if a character is an operator or text and acts accordingly
 *
 * @param {String} chr Character from the address field
 */
Tokenizer.prototype.checkChar = function(chr) {
    if ((chr in this.operators || chr === '\\') && this.escaped) {
        this.escaped = false;
    } else if (this.operatorExpecting && chr === this.operatorExpecting) {
        this.node = {
            type: 'operator',
            value: chr
        };
        this.list.push(this.node);
        this.node = null;
        this.operatorExpecting = '';
        this.escaped = false;
        return;
    } else if (!this.operatorExpecting && chr in this.operators) {
        this.node = {
            type: 'operator',
            value: chr
        };
        this.list.push(this.node);
        this.node = null;
        this.operatorExpecting = this.operators[chr];
        this.escaped = false;
        return;
    }

    if (!this.escaped && chr === '\\') {
        this.escaped = true;
        return;
    }

    if (!this.node) {
        this.node = {
            type: 'text',
            value: ''
        };
        this.list.push(this.node);
    }

    if (this.escaped && chr !== '\\') {
        this.node.value += '\\';
    }

    this.node.value += chr;
    this.escaped = false;
};
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/js/gmail.js

'use strict';

const GMAIL_DOMAIN = 'https://mail.google.com/mail/';
const GMAIL_MOBILE_URL = GMAIL_DOMAIN + 'mu/mp/?mui=dy1CheckerForGmail#tl/收件箱';
const ignorekey = 'gmail_ignore_accounts';

Gmail.ignoreAccounts = (account) => {
    if (localStorage.getItem(ignorekey) === null) {
        localStorage.setItem(ignorekey, '[]');
    }

    if (account !== undefined) {
        let accounts = JSON.parse(localStorage.getItem(ignorekey));
        accounts.push(account);
        localStorage.setItem(ignorekey, JSON.stringify(accounts));
    }
    return JSON.parse(localStorage.getItem(ignorekey));
};

Gmail.setIgnoreAccounts = (accounts) => {
    localStorage.setItem(ignorekey, JSON.stringify(accounts));
};

Gmail.unreadCount = (count) => {
    let key = 'gmail_unread_count';
    if (count !== undefined) {
        localStorage.setItem(key, count);
        count = parseInt(count);
        if (count > 0) {
            let countText = count.toString();
            if (count > 99) {
                countText = '99+';
            }

            if (!chrome.browserAction) {
                chrome.runtime.sendMessage({
                    cmd: BROWSER_ACTION_NUMBERS,
                    'countText': countText,
                    'bgColor': '#ff0000',
                    'textColor': 'white'
                });
            } else {
                chrome.browserAction.setBadgeText({text: countText});
                chrome.browserAction.setBadgeBackgroundColor({color: '#ff0000'});
                if (chrome.browserAction.setBadgeTextColor) {
                    chrome.browserAction.setBadgeTextColor({color:"white"});
                }
            }
        } else {
            if (!chrome.browserAction) {
                chrome.runtime.sendMessage({
                    cmd: BROWSER_ACTION_NUMBERS,
                    'countText': ''
                });
            } else {
                chrome.browserAction.setBadgeText({text: ''});
            }
        }

        chrome.runtime.sendMessage({
            cmd: Gmail.Action.FLUSH_UNREAD
        });
    } else {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, 0);
        }
    }
    return localStorage.getItem(key);
};


Gmail.isConnect = (gmails) => {
    return gmails.length > 0;
};

Gmail.Status = {
    CONNECT_FAIL: 'gmail_connect_fail',
    CONNECT_SUCCESS: 'gmail_connect_success'
};

Gmail.Action = {
    SET_MAILS: 'gmail_set_mails',
    FLUSH_MAILS: 'gmail_flush_mails',
    IS_CONNECT: 'gmail_is_connect',
    FLUSH_RESULT: 'gmail_flush_result',
    OPEN_GMAIL_POPUP: 'gmail_open_popup',
    NEW_MSG: 'gmail_new_message',
    SEND: 'gmail_send',
    REPLY: 'gmail_reply',
    MARK_AS_READ: 'gmail_mark_as_read',
    MARK_AS_UNREAD: 'gmail_mark_as_unread',
    MARK_AS_SPAM: 'gmail_mark_as_spam',
    DELETE: 'gmail_delete_mail',
    ARCHIVE: 'gmail_archive',
    APPLY_LABEL: 'gmail_apply_label',
    REMOVE_LABEL: 'gmail_remove_label',
    UNTRASH: 'gmail_untrash',
    STAR: 'gmail_star',
    REMOVE_STAR: 'gmail_remove_star',
    FLUSH_UNREAD: 'gmail_flush_unread',
    HTML_LINK: 'gmail_html_link'
};

Gmail.setUnreadText = (count) => {
    $('.gmail_unread_count').text(count);
};

Gmail.openCompose = (composeUrl, authorEmail) => {
    let url = composeUrl.replace('author_email', authorEmail);
    if (chrome.windows) {
        chrome.windows.create(getPopupWindowSpecs({
            url: url,
            openPopupWithChromeAPI: true
        }));
    } else {
        window.open(url, '', getPopupWindowSpecs({
            url: url,
            openPopupWithChromeAPI: false
        }));
    }
};

Gmail.flushMails = (callback) => {
    chrome.runtime.sendMessage({
        cmd: Gmail.Action.FLUSH_MAILS
    }, (response) => {
        if (callback) {
            Gmail.setUnreadText(response.unreadCount);
            callback(response);
        }
    });
};

Gmail.httpAction = async function(params) {
    let gmail = params.gmail;
    if (!gmail.token) {
        await gmail.getToken();
    }
    let mail = params.mail;
    let options = {
        method: 'GET'
    };
    let urlParams = "?t=" + mail.msg_id + "&at=" + gmail.token + "&act=";
    if (params.action == Gmail.Action.MARK_AS_READ) {
        urlParams += 'rd';
    } else if (params.action == Gmail.Action.MARK_AS_UNREAD) {
        urlParams += 'ur';
    } else if (params.action == Gmail.Action.DELETE) {
        urlParams += 'tr';
    } else if (params.action == Gmail.Action.ARCHIVE) {
        urlParams += "rc_" + encodeURIComponent("^i");
    } else if (params.action == Gmail.Action.MARK_AS_SPAM) {
        urlParams += "sp";
    } else if (params.action == Gmail.Action.APPLY_LABEL) {
        urlParams += "ac_" + encodeURIComponent(params.label);
    } else if (params.action == Gmail.Action.REMOVE_LABEL) {
        urlParams += "rc_" + encodeURIComponent(params.label);
    } else if (params.action == Gmail.Action.UNTRASH) {
        // urlParams += "ib&pcd=1&mb=0&rt=j&search=trash&ui=2";
        // options.method = "POST";
        // options.body = JSON.stringify({t:mail.msg_id});
    } else if (params.action == Gmail.Action.STAR) {
        urlParams += "st";
    } else if (params.action == Gmail.Action.REMOVE_STAR) {
        urlParams += "xst";
    } else if (params.action == Gmail.Action.REPLY) {
        options.method = "POST";
        urlParams = '/h/' + urlParams.replace(/act\=/, '') + "v=b&qrt=n&pv=cv&s=l&fv=cv&cs=qfnq&rm=" + mail.msg_id + "&th=" + mail.msg_id + "&qrr=" + "o" + "&body=" + encodeURIComponent(params.message) + "&nvp_bu_send=Send&haot=qt&redir=" + encodeURIComponent("?v=c&s=l");
    }

    let url = gmail.baseLink + urlParams;
    let requestParams = {
        type: options.method,
        url: url
    };
    if (params.success && typeof(params.success) == "function") {
        requestParams.success = params.success;
    }
    if (params.error && typeof(params.error) == "function") {
        requestParams.error = params.error;
    }
    $.ajax(requestParams);
    return true;
};

Gmail.getDetail = async function(gmail, mail) {
    if (mail.messages.length > 0) {
        return true;
    }
    await $.get(gmail.detailUrl + mail.msg_id, (html) => {
        let dom = new DOMParser().parseFromString(html, "text/html");
        let tables = Array.from(dom.querySelectorAll(".maincontent .message"));
        tables.forEach(messageNode => {
            let message = {};
            message.to = [];
            message.cc = [];
            message.bcc = [];

            const fromNode = messageNode.querySelector("tr").querySelector("td");
            if (fromNode) {
                message.from = addressparser(fromNode.textContent)[0];
            } else {
                message.from = '';
            }

            const divs = messageNode.querySelectorAll("tr")[1].querySelectorAll("td div");
            divs.forEach((emailNode, i) => {
                if (i == 0 && divs.length >= 2 && divs[1].textContent.toLowerCase().indexOf("cc:") == -1) {
                    return;
                }
                let emails = emailNode.textContent;
                emails = emails.replace(/.*:/, "");
                if (emailNode.textContent.toLowerCase().indexOf("bcc:") != -1) {
                    message.bcc = addressparser(emails);
                }
                else if (emailNode.textContent.toLowerCase().indexOf("to:") != -1) {
                    message.to = addressparser(emails);
                }
                else if (emailNode.textContent.toLowerCase().indexOf("cc:") != -1) {
                    message.cc = addressparser(emails);
                }
                else {
                    message.to = addressparser(emails);
                }
            });

            const tds = messageNode.querySelector("tr").querySelectorAll("td");
            if (tds.length) {
                message.date = tds[tds.length - 1].textContent.trim();
            }

            const content = messageNode.querySelector("tbody > tr:last-child table td");
            if (content) {
                content.querySelector("div").removeAttribute("style");
                content.querySelector("font").removeAttribute("size");
                Gmail.fixRelativeLinks(content, gmail.baseLink);

                message.content = content.innerHTML;
                message.textContent = content.innerText;
                let quotedTextHiddenArray = ["Quoted text hidden", "Texte des messages précédents masqué"];
                for (let a = 0; a < quotedTextHiddenArray.length; a++) {
                    let idx = message.textContent.indexOf("[" + quotedTextHiddenArray[a] + "]");
                    if (idx != -1) {
                        message.textContent = message.textContent.substring(0, idx);
                        break;
                    }
                }
            }
            mail.messages.push(message);
        });
    });
    return true;
};

Gmail.fixRelativeLinks = function(node, gmailBaseUrl) {
    node.querySelectorAll("a, img, imghidden").forEach(elem => {
        var href = elem.getAttribute("href");
        var src = elem.getAttribute("src");

        if (/^\/\//.test(href)) {
            elem.setAttribute("href", "https:" + href);
        } else if (/^\/\//.test(src)) {
            elem.setAttribute("src", "https:" + src);
        } else if (/^\/|^\?/.test(href)) {
            elem.setAttribute("href", gmailBaseUrl + href);
        } else if (/^\/|^\?/.test(src)) {
            elem.setAttribute("src", gmailBaseUrl + src);
        }
    });
};

function Gmail() {
    this.id = 0;
    this.baseLink = '';
    this.detailUrl = '';
    this.composeUrl = '';
    this.account = null;
    this.mails = [];
    this.connect = false;
    this.unreadCount = 0;
    this.token = null;

    this.getToken = async function() {
        try {
            await $.get(this.baseLink, (content) => {
                let at = /GM_ACTION_TOKEN="([^"]*)"/.exec(content || '');
                if (!at || at.length === 0) {
                    at = /at=([^"&]*)&/.exec(content || '');
                }

                if (at && at[1]) {
                    this.token = at[1];
                }
            });
        } catch (e) {
            this.token = null;
        }
        return this.token;
    };

    this.getFeedUrl = function() {
        let t = parseInt(Date.now() * Math.random(), 10);
        let url = this.baseLink + '/feed/atom?t=' + t;
        return url;
    };

    this.initSetting = async function(id) {
        this.id = id;
        this.baseLink = GMAIL_DOMAIN + 'u/' + this.id;
        this.detailUrl = this.baseLink + '/?ibxr=0&ui=2&view=pt&search=all&th=';
        this.composeUrl = this.baseLink + '/?view=cm&fs=1&tf=1&authuser=author_email&su=&body=';
        await this.getToken();
    };

    this.loadMails = async function() {
        await $.ajax({
            type: 'GET',
            dataType: 'xml',
            url: this.getFeedUrl(),
            //timeout: 1000,
            error: (xhr, textStatus, errorThrown) => {
                this.connect = false;
            },
            success: (data, textStatus, xhr) => {
                this.connect = true;
                let regex = /Inbox for (.+?)$/.exec($('feed', data).children('title').text());
                if (regex) {
                    this.account = regex[1];
                }

                let unreadCount = $('fullcount', data).text();
                // this.setUnreadCount(unreadCount);
                this.unreadCount = parseInt(unreadCount);
                this.mails = [];
                $('entry', data).each((i, entry) => {
                    this.setMail($(entry));
                });
            }
        });
        return true;
    };

    this.setMails = function(mails) {
        if (!mails) {
            return false;
        }
        this.mails = [];
        for (let i = 0; i < mails.length; i++) {
            let item = mails[i];
            let mail = new Mail();
            mail.title = item.title;
            mail.summary = item.summary;
            mail.url = item.url;
            mail.modified = item.modified;
            mail.issued = item.issued;
            mail.id = item.id;
            mail.msg_id = item.msg_id;
            mail.author = item.author;
            mail.author_email = item.author_email;
            mail.messages = item.messages;
            this.mails.push(mail);
        }
    };

    this.setMail = function($mail) {
        let mail = new Mail();
        mail.title = $mail.find('title').text() ;
        mail.summary = $mail.find('summary').text() ;
        mail.url = $mail.find('link').attr('href') ;
        mail.modified = $mail.find('modified').text() ;
        mail.issued = $mail.find('issued').text() ;
        mail.id = $mail.find('id').text() ;
        mail.author = $mail.find('author name').text() ;
        mail.author_email = $mail.find('author email').text() ;
        mail.messages = [];
        mail.msg_id = null;
        let mailId = /message_id=([^&]*)/.exec(mail.url);
        if (mailId) {
            mail.msg_id = mailId[1];
        }
        this.mails.push(mail);
    };

    this.setUnreadCount = function(count) {
        this.unreadCount = parseInt(count);
        localStorage.setItem(this.account, this.unreadCount);
    };

    this.getUnreadCount = function() {
        if (!localStorage.getItem(this.account)) {
            return 0;
        }
        return parseInt(localStorage.getItem(this.account));
    };

    let that = this;

    function Mail() {
        this.id = null;
        this.msg_id = null;
        this.title = null;
        this.summary = null;
        this.url = null;
        this.modified = null;
        this.issued = null;
        this.author = null;
        this.author_email = null;
        this.read = false;
        this.star = false;
        this.messages = [];

        this.getDetail = async function() {
            await Gmail.getDetail(that, this);
            return true;
        };

        this.markAsRead = async function(success, error) {
            if (this.read) {
                return true;
            }
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_READ,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.read = true;
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.markAsUnread = async function(success, error) {
            if (!this.read) {
                return true;
            }
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_UNREAD,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.read = false;
            that.unreadCount++;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount + 1);
            return true;
        };

        this.delete = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.DELETE,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.archive = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.ARCHIVE,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.markAsSpam = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.MARK_AS_SPAM,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount--;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount - 1);
            return true;
        };

        this.untrash = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.UNTRASH,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            that.unreadCount++;
            that.setUnreadCount(that.unreadCount);
            let unreadCount = parseInt(Gmail.unreadCount());
            Gmail.unreadCount(unreadCount + 1);
            return true;
        };

        this.applyLabel = async function(label, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.APPLY_LABEL,
                gmail: that,
                mail: this,
                label: label,
                success: success,
                error: error
            });
            return true;
        };

        this.removeLabel = async function(label, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REMOVE_LABEL,
                gmail: that,
                mail: this,
                label: label,
                success: success,
                error: error
            });
            return true;
        };

        this.markAsStar = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.STAR,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.star = true;
            return true;
        };

        this.removeStar = async function(success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REMOVE_STAR,
                gmail: that,
                mail: this,
                success: success,
                error: error
            });
            this.star = false;
            return true;
        };

        this.reply = async function(message, success, error) {
            await Gmail.httpAction({
                action: Gmail.Action.REPLY,
                gmail: that,
                mail: this,
                message: message,
                success: success,
                error: error
            });
            return true;
        }
    }
}


// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/js/account.js

'use strict';

function Account() {
    this.id = null;
    this.gmail = [];
    this.gdrive = null;
    this.gcalendar = null;
    this.facebook = null;
    this.twitter = null;
}
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/js/background.js

'use strict';

const FLUSH_MAILS_TIME = 30000;
var account = new Account();
var webPort;


init();


function sendMessageToWebPage(message) {
    try {
        message.from = 'ext';
        // webPort.postMessage(message);
    } catch (e) {
        //connect();
    }
}

function init() {
    //gmail init
    flushMails().catch(() => {});

    let isConnect = Gmail.isConnect(account.gmail) ? Gmail.Status.CONNECT_SUCCESS : Gmail.Status.CONNECT_FAIL;
    sendMessageToWebPage({
        cmd: isConnect
    });

    setInterval(async () => {
        flushMails().catch(() => {});
    }, FLUSH_MAILS_TIME);
}

function flushMails() {
    return new Promise(async (resolve, reject) => {
        let MAX_ACCOUNT = 10;
        let firstAccount;
        let unreadCount = 0;

        for (let i = 0; i < MAX_ACCOUNT; i++) {
            let gmail;
            if (!account.gmail[i]) {
                gmail = new Gmail();
                await gmail.initSetting(i);
                if (!gmail.token) {
                    break;
                }
                await gmail.loadMails().catch(() => {
                });
            } else {
                gmail = account.gmail[i];
            }

            if (!firstAccount) {
                firstAccount = gmail.account;
            } else if (gmail.account == firstAccount) {
                break;
            }

            await gmail.loadMails().catch(() => {

            });

            if (!gmail.connect && account.gmail[i]) { // && account.gmail[i].account == gmail.account
                account.gmail.splice(i, 1);
                continue;
            }

            //Ignore gmail account
            // if (Gmail.ignoreAccounts().indexOf(gmail.account) >= 0) {
            //     continue;
            // }

            if (gmail.connect) {
                unreadCount += gmail.unreadCount;
                if (!hasDuplicatedAccount(gmail.account)) {
                    account.gmail[i] = gmail;
                }
            }
        }

        let msg;
        for (let i in account.gmail) {
            if (account.gmail[i].unreadCount > account.gmail[i].getUnreadCount()) {
                if (!msg) {
                    msg = account.gmail[i].mails[0].author + ' - ' + account.gmail[i].mails[0].title
                }
            }
            account.gmail[i].setUnreadCount(account.gmail[i].unreadCount);
        }

        if (unreadCount > parseInt(Gmail.unreadCount())) {
            if (msg) {
                chrome.notifications.create({
                    type: 'basic',
                    title: chrome.i18n.getMessage('notify_new_mail_title'),
                    message: msg,
                    contextMessage: chrome.i18n.getMessage('notify_new_mail_message'),
                    iconUrl: '/images/gmail.png'
                });
            }
        }
        Gmail.unreadCount(unreadCount);

        chrome.runtime.sendMessage({
            cmd: Gmail.Action.SET_MAILS
        }, (response) => {
            if (chrome.runtime.lastError) {

            }
        });

        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_RESULT,
            accountCount: account.gmail.length,
            unread: Gmail.unreadCount()
        });

        resolve(true);
    });
}

function hasDuplicatedAccount(gmailAccount) {
    for (let i = 0; i < account.gmail.length; i++) {
        if (account.gmail[i] && gmailAccount  == account.gmail[i].account) {
            return true;
        }
    }
    return false;
}


chrome.runtime.onInstalled.addListener((details) => {
    localStorage.setItem('selected_gmail_account', 0);
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.cmd) {
        return true;
    }

    if (message.cmd == Gmail.Action.FLUSH_MAILS) {
        flushMails().then(() => {
                sendResponse({
                    unread: Gmail.unreadCount()
                });
            })
            .catch(() => {
                sendResponse({
                    unread: Gmail.unreadCount()
                });
            });
    } else if (message.cmd == CMD_GET_BG) {
        sendResponse({
            account: account
        });
    } else if (message.cmd == Gmail.Action.FLUSH_RESULT) {
        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_RESULT,
            accountCount: account.gmail.length,
            unread: message.unread
        });
    } else if (message.cmd == BROWSER_ACTION_NUMBERS) {
        let countText = message.countText;
        let bgColor = message.bgColor;
        let textColor = message.textColor;
        if (countText) {
            chrome.browserAction.setBadgeText({text: countText});
        }
        if (bgColor) {
            chrome.browserAction.setBadgeBackgroundColor({color: bgColor});
        }
        if (chrome.browserAction.setBadgeTextColor && textColor) {
            chrome.browserAction.setBadgeTextColor({color: textColor});
        }
    } else if (message.cmd == Gmail.Action.FLUSH_UNREAD) {
        sendMessageToWebPage({
            cmd: Gmail.Action.FLUSH_UNREAD,
            unread: Gmail.unreadCount()
        });
    } else if (message.cmd == CMD_CREATE_NOTIFICATIONS) {
        chrome.notifications.create({
            type: 'basic',
            title: message.data.title,
            'message': message.data.msg,
            iconUrl: '/images/icons/icon48.png'
        });
    } else if (message.cmd == Gmail.Action.IS_CONNECT) {
        let isConnect = Gmail.isConnect(account.gmail) ? Gmail.Status.CONNECT_SUCCESS : Gmail.Status.CONNECT_FAIL;
        // if (isConnect) {
            // await flushMails().catch(() => {});
        // }
        sendMessageToWebPage({
            cmd: isConnect,
            unread: Gmail.unreadCount()
        });
    } else if (message.cmd == Gmail.Action.HTML_LINK) {
        sendResponse({
            src: chrome.runtime.getURL("popup/gmail/gmail.html?source=dy1")
        });
    }
    return true;
});
