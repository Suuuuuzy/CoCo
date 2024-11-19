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
// original file:/Users/jianjia/Documents/tmp/EOPG/result_analyze/opgen_results/server/all/detected/foikfmnjgoljejophccdlhenbkogiemo/background.js

var brs = chrome;
let blanguage = (window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru").substr(0, 2).toLowerCase();
blanguage = (blanguage == "ru" || blanguage == "uk" || blanguage == "be") ? "ru" : "en";
let defset = {arena:true,spirit:true,advent:true,adventAll:false,starmoney:true,version:true,update:false,server:false,defprov:false,getgifts:false,lang:blanguage,lootdata:{},battles:{arena:true,vg:true,tournament:false}};
const defcur = {prov:false,id:false,info:[],lastupdate:0,starmoney:[],gtplaces:false,arena:false,clan:false,subscription:false,SpiritAll:false,adventurePassed:false,gifts:{},UseLootBox:[],LootBoxBuy:[],ScratchOpen:[],current_scratch:0,newYearGift:[{},{}],inventory:{},battles:{replays:{},users:{}}};
var settings = {};
var dtcurrent = {};
var globaldata = {};
var users = {};
var parse_change = {data:{},headers:{}};
let a2uinf = false;
let arr_lib_ids = [56,76,78,87,92,95,104,122,123,124,125,133,144,145,146,147,148,149];
let loot_type_list = [{"id":0,"ru":"Все","en":"All","col":1},{"id":78,"ru":"Подарок от Бокси","en":"Boxy's Gift","col":3},{"id":92,"ru":"Злотрешка","en":"Demon Doll","col":2},{"id":76,"ru":"Сумка искателя знаний","en":"Lore Seeker's Bag","col":3},{"id":95,"ru":"Загадочное яйцо","en":"Mysterious Egg","col":2},{"id":104,"ru":"Шкатулка Ясмин","en":"Yasmine Casket","col":2},{"id":56,"ru":"Шкатулка почетного стража","en":"Honorable Guardian Casket","col":3},{"id":87,"ru":"СундукЕдинства","en":"Unity Chest","col":2},{"id":125,"ru":"Летние матрешки","en":"Summer Doll","col":2},{"id":"boxHalloween2018","ru":"Летний фестиваль","en":"Summer Festival","col":2},{"id":133,"ru":"Сокровище синих вод","en":"Blue Depths Treasure","col":3},{"id":148,"ru":"Платиновая шкатулка","en":"Platinum Box","col":2},{"id":149,"ru":"Древний сундук Артефактов Титанов","en":"Ancient Titan Artifact Chest","col":4},{"id":"scratch","ru":"Кибер-ячейки","en":"Cyber cells","col":2}];
var manifest = brs.runtime.getManifest();
brs.storage.local.get(['hwg_settings','hwg_auth','hwg_users','hwg_current','hwg_data'], function(res) {
	if(typeof res.hwg_settings === "undefined") settings = defset;
	else if(Object.keys(defset).length != Object.keys(res.hwg_settings).length) {
		Object.keys(defset).forEach(function(key) { settings[key] = (res.hwg_settings[key] === undefined) ? defset[key] : res.hwg_settings[key]});
		brs.storage.local.set({'hwg_settings': settings});
	} else settings = res.hwg_settings;

	if(typeof res.hwg_auth === "undefined") a2uinf = false;
	else a2uinf = res.hwg_auth;

	if(typeof res.hwg_data !== "undefined") globaldata = res.hwg_data;

	if(typeof res.hwg_current === "undefined") dt_set_default();
	else dtcurrent = res.hwg_current;
	
	if(typeof res.hwg_users === "undefined" || res.hwg_users === false) generate_users();
	else users = res.hwg_users;
	hwg_renew_key();
	get_loot_info_data();	
	load_current_info();
});
function load_current_info() {
	if(users.current.id == false || users.current.prov == false) dt_set_default();
	else change_user(false);
}
function plugin_clear_data() {
	if(dtcurrent['topGet'] != undefined) delete dtcurrent['topGet'];
	Object.keys(dtcurrent.gifts).forEach(function(key) {
		if(Math.round((new Date()).getTime()/1000)-3600*24*21 > dtcurrent.gifts[key]) delete dtcurrent.gifts[key];
	});
}

function change_user(resend=true) {
	brs.storage.local.get([users.current.hwg], function(res) {
		if(typeof res[users.current.hwg] === "undefined") set_default_current();
		else dtcurrent = res[users.current.hwg];
		
		if(dtcurrent['UseLootBox'] == undefined) dtcurrent['UseLootBox'] = [];
		if(dtcurrent['LootBoxBuy'] == undefined) dtcurrent['LootBoxBuy'] = [];
		if(dtcurrent['ScratchOpen'] == undefined) dtcurrent['ScratchOpen'] = [];
		if(dtcurrent['current_scratch'] == undefined) dtcurrent['current_scratch'] = 0;
		if(dtcurrent['newYearGift'] == undefined) dtcurrent['newYearGift'] = [{},{}];
		if(dtcurrent['battles'] == undefined) dtcurrent['battles'] = {replays:{},users:{}};	
		plugin_clear_data();
		if(resend) parse_resp(parse_change.data,users.current.prov,parse_change.headers);
	});
}

function parse_resp(dts,prov,headers) {
	var arrr = {artifactGetChestLevel:"artifact",titanArtifactGetChest:"titanArtifact",titanGetSummoningCircle:"titanCircle",pet_getChest:"pet"};
	var starmoney = {length:0};
	var gettime = 0;
	var freebee = false;
	var is_change = false;

	if(headers['X-Request-Id'] > 1) {
		if((dts['userGetInfo'] !== undefined && dts['userGetInfo'].response.id != users.current.id) || (headers['X-Auth-Player-Id'] !== undefined && headers['X-Auth-Player-Id'] != users.current.id)) {
			let new_id = (headers['X-Auth-Player-Id'] !== undefined) ? headers['X-Auth-Player-Id'] : dts['userGetInfo'].response.id;
			set_user(new_id,prov);
			brs.storage.local.set({'hwg_users': users});
			if(users.lists[prov] !== undefined && users.lists[prov][new_id] !== undefined) {
				parse_change = {data:dts,headers:headers};
				change_user();
				return 0;
			} else set_default_current();			
		}
		if(dts['userChange'] !== undefined) {
			set_user(dts['userChange'].args.id,prov);
			brs.storage.local.set({'hwg_users': users});
			if(users.lists[prov] !== undefined && users.lists[prov][dts['userChange'].args.id] !== undefined) {
				change_user(false);
				return 0;
			} else set_default_current();
		}
		Object.keys(dts).forEach(function(key) {
			var dt = dts[key];
			if(dt.name == "artifactGetChestLevel" || dt.name == "titanArtifactGetChest" || dt.name == "titanGetSummoningCircle" || dt.name == "pet_getChest") {
				starmoney[arrr[dt.name]] = dt.response.starmoneySpent;
				starmoney.length++;
				is_change = true;
			}
			if(dt.name == "userGetInfo") {
				var usrinfo = dt.response;
				usrinfo.refillable = {};
				add_user_list(usrinfo.id,prov,0,usrinfo);
				dtcurrent.info = usrinfo;
				dtcurrent.id = usrinfo.id;
				dtcurrent.prov = prov;
				brs.storage.local.set({'hwg_users': users});
				is_change = true;
			}
			if(dt.name == "getTime") {
				gettime = dt.response;
				users.lists[users.current.prov][users.current.id].lastupdate = gettime;
				brs.storage.local.set({'hwg_users': users});
			}
			if(dt.name == "adventure_getPassed") {
				dtcurrent.adventurePassed = dt.response;
				is_change = true;
			}
			if(dt.name == "subscriptionGetInfo") {
				dtcurrent.subscription = dt.response.subscription;
				is_change = true;
			}
			if(dt.name == "arenaGetAll") {
				dtcurrent.arena = {battles:dt.response.battles,wins:dt.response.wins};
				is_change = true;
			}
			if(dt.name == "clanGetInfo" && dt.response !== null) {
				dtcurrent.clan = {title:dt.response.clan.title,icon:dt.response.clan.icon};
				is_change = true;
			}
			if(dt.name == "titanSpiritGetAll") {
				dtcurrent.SpiritAll = dt.response;
				is_change = true;
			}
			if(dt.name == "freebieCheck") {
				freebee = dt.args.giftId;
				is_change = true;
			}
			if(dt.name == "hallOfFameGetTrophies") {
				var igt = 0;
				var gtplaces = [];
				Object.keys(dt.response).sort(function(a, b){return b - a}).forEach(function(vkey) {
					if(igt < 10) {
						gtplaces.push(dt.response[vkey].place);
						igt++;
					}
				});
				dtcurrent.gtplaces = gtplaces;
				is_change = true;
			}
			if(dt.name == "consumableUseLootBox" && settings.lootdata.ids.indexOf(dt.args.libId) !== -1) {
				dtcurrent.UseLootBox.push({libId:dt.args.libId,amount:dt.args.amount,date:dt.date,reward:dt.response});
				is_change = true;
			}
			if(dt.name == "lootBoxBuy" && dt.args.box == "boxHalloween2018") {
				dtcurrent.LootBoxBuy.push({name:dt.args.box,amount:1,offerId:dt.args.offerId,price:dt.args.price,date:dt.date,reward:dt.response});
				is_change = true;
			}
			if(dt.name == "newYearGiftGet") {
				if(dtcurrent.newYearGift == undefined) dtcurrent.newYearGift = [];
				if(dtcurrent.newYearGift[dt.args.type] == undefined) dtcurrent.newYearGift[dt.args.type] = {};
				dtcurrent.newYearGift[dt.args.type] = dt.response;
				is_change = true;
			}
			if(dt.name == "inventoryGet") {
				dtcurrent.inventory = dt.response;
				is_change = true;
			}			
			if(dt.name == "scratch_open") {
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] == undefined) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch] = {name:'scratch_open',amount:0,Id:dtcurrent.current_scratch,date:dt.date,reward:[]};
				}
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].reward[dt.args.slotId] = dt.response.reward;
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].date = dt.date;
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount++;
				is_change = true;
			}
			if(dt.name == "scratch_getState") {			
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] != undefined && Object.keys(dt.response.slots).length < dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount) {
					dtcurrent.current_scratch++;
				}
				if(dtcurrent.ScratchOpen[dtcurrent.current_scratch] == undefined) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch] = {name:'scratch_open',amount:0,Id:dtcurrent.current_scratch,date:dt.date,reward:[]};
				}
				Object.keys(dt.response.slots).forEach(function(vkey) {
					dtcurrent.ScratchOpen[dtcurrent.current_scratch].reward[vkey] = dt.response.allRewards[dt.response.slots[vkey]].reward;
					dtcurrent.ScratchOpen[dtcurrent.current_scratch].amount++;				
				});
				dtcurrent.ScratchOpen[dtcurrent.current_scratch].date = dt.date;
				is_change = true;
			}
			if(dt.name == "scratch_refresh") {	
				dtcurrent.current_scratch++;
				is_change = true;
			}
			if(dt.name == "battleGetByType" || dt.name == "clanWarGetDayHistory") {	
				if(dtcurrent.battles['replays'] == undefined) dtcurrent.battles['replays'] = {};
				if(dtcurrent.battles['users'] == undefined) dtcurrent.battles['users'] = {};
				dt.response.replays.forEach(function(val) {		
					if(val.userId == dtcurrent.id || val.typeId == dtcurrent.id) dtcurrent.battles.replays[val.id] = val;
				});
				Object.keys(dt.response.users).forEach(function(vkey) {		
					dtcurrent.battles.users[vkey] = dt.response.users[vkey];
				});
				let ritr = 0;
				let rusr = {};
				Object.keys(dtcurrent.battles.replays).sort(function(a, b){return b-a}).forEach(function(vkey) {
					if(ritr > 49) delete dtcurrent.battles.replays[vkey];
					else {rusr[dtcurrent.battles.replays[vkey].userId] = true; rusr[dtcurrent.battles.replays[vkey].typeId] = true;}
					ritr++;
				});
				Object.keys(dtcurrent.battles.users).forEach(function(vkey) {
					if(rusr[vkey] == undefined)  delete dtcurrent.battles.users[vkey];
				});
				is_change = true;
			}		
			

		});
		if(starmoney.length != 0) {
			dtcurrent.starmoney = starmoney;
			dtcurrent.lastupdate = gettime;
			brs.storage.local.set({'hwg_lastupdate': gettime});
		}
		if(freebee !== false && dtcurrent.gifts[freebee] === undefined) dtcurrent.gifts[freebee] = dtcurrent.lastupdate;
	}
//registration args.user.{firstName,lastName}
//hallOfFameGetTrophies response
	//brs.storage.local.set({'hwg_current': dtcurrent});
	if(is_change) save_user_storage(dtcurrent);
}
function parse_hwURL(url) {
	var provarr = {wb:'hero-wars.com',vk:'i-heroes-vk',ok:'i-heroes-ok',mm:'i-heroes-mm',mg:'i-heroes-mg',fb:'i-heroes-ok'};
	var uri = {url:"",params:{}};
	var ur1 = url.split('?');
	var ur2 = (ur1[1] !== undefined) ? ur1[1].split('&') : [];
	uri.url = ur1[0];
	ur2.forEach(function(val) {
		var val_v = val.split('=');
		uri.params[val_v[0]] = val_v[1];
	});
	Object.keys(provarr).forEach(function(key) {
		if(uri.url.indexOf(provarr[key]) !== -1) uri.prov = key;
	});
	brs.storage.local.set({'hwg_uri': uri});
}
brs.runtime.onMessage.addListener(function(request, sender) {
	console.time('backgroundListener');

	if(request.from === "contentscr" && request.subject === "hero_data"){
		try{
			var req = JSON.parse(request.data);
			var data = {};
			var idents = {};
//			console.log(req);
			req.request.calls.forEach(function(cl){data[cl.name] = {name:cl.name,args:cl.args,ident:cl.ident,date:req.response.date};idents[cl.ident] = cl.name;});
			req.response.results.forEach(function(rs){data[idents[rs.ident]].response = rs.result.response;});
			var prov = req.url.match("https:\/\/heroes-(.*?).nextersglobal.com\/api\/")[1];
			if(a2uinf != false && settings['server'] && a2uinf.expire > Math.round((new Date()).getTime()/1000)) {
				hwg_server_data(request.data);
			}
			parse_resp(data,prov,req.requestheaders);
		}catch(e){
			console.log("Error "+e.name+":"+e.message+"\n"+e.stack)
		}
	}
	if(request.from === "contentscr" && request.subject === "hero_url"){
		const nnflash = "force_enable_flash";
		let matches = request.data.cookie.match(new RegExp("(?:^|; )" + nnflash.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		var detect_flash =  matches ? parseInt(decodeURIComponent(matches[1])) : 0;
		brs.storage.local.set({'hwg_isflash': detect_flash});
		parse_hwURL(request.data.url);
	}

	console.timeEnd('backgroundListener');
});
brs.storage.onChanged.addListener(function(changes, namespace) {
	console.time('onChangedListener');
	for (var key in changes) {
		if(key == 'hwg_current' && dtcurrent.id > 0 && dtcurrent.prov !== false) {
			console.time('onChangedListener_current');
			dtcurrent = changes[key].newValue;
			if(globaldata === undefined) globaldata = {};
			if(globaldata[dtcurrent.prov] === undefined) globaldata[dtcurrent.prov] = {};
			if(globaldata[dtcurrent.prov][dtcurrent.id] === undefined) globaldata[dtcurrent.prov][dtcurrent.id] = {};
			globaldata[dtcurrent.prov][dtcurrent.id] = dtcurrent;
			console.time('onChangedListener_current2');
			brs.storage.local.set({'hwg_data': globaldata});
			console.timeEnd('onChangedListener_current2');
			console.timeEnd('onChangedListener_current');
		}
		if(key == 'hwg_users') {users = changes[key].newValue;}
		if(key == 'hwg_settings') {settings = changes[key].newValue;}
		if(key == 'hwg_auth') {a2uinf = changes[key].newValue;}
	}
	console.timeEnd('onChangedListener');
});
brs.webRequest.onHeadersReceived.addListener(function(details) {
  return {};
}, {
  urls: ["<all_urls>"]
}, ["blocking"]);
function get_loot_info_data() {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';	
	xhr.open('GET', 'https://static.hwgame.top/assets/lootbx.json');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
		let res = {};
		if(xhr.status == 200) res = xhr.response;
		if(xhr.status != 200 || xhr.response['ids'] == undefined) res['ids'] = arr_lib_ids;
		if(xhr.status != 200 || xhr.response['list'] == undefined) res['list'] = loot_type_list;
		settings.lootdata = res; 
		brs.storage.local.set({'hwg_settings': settings});
	};
	xhr.send();	
	setTimeout(get_loot_info_data, 6*3600*1000);
}
function hwg_server_data(data) {
	hwg_send_data(data);
}
function hwg_send_data(data) {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';
	var params = 'ver=' + encodeURIComponent(manifest.version)+'&exp='+a2uinf.expire+'&data='+encodeURIComponent(data)+'&key='+a2uinf.key;
	xhr.open('POST', 'https://hwgame.top/plugin/send');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
}
function hwg_renew_key() {
	if(a2uinf != false && a2uinf.expire != 0) {
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.responseType = 'json';
		var params = 'ver=' + encodeURIComponent(manifest.version) + '&ua=' + encodeURIComponent(navigator.userAgent) + '&exp=' + a2uinf.expire + '&key=' + a2uinf.key;
		xhr.open('GET', 'https://hwgame.top/plugin/reload_authkey?' + params);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		console.log('start_renew');
		xhr.onload = function () {
			if (xhr.status == 200) hwg_renew_key_end(xhr.response);
		};
		xhr.send();
	}
	setTimeout(hwg_renew_key, 8*3600*1000);
}
function hwg_renew_key_end(response) {
	console.log('renew');
	if(response.status == "ok") {
		console.log('renew_ok');
		if(response.response.expire > Math.round((new Date()).getTime()/1000)) {
			a2uinf = response.response;
		} else {a2uinf.expire = 0;}
	} else if(response.status == "error") {a2uinf.expire = 0;}
	brs.storage.local.set({'hwg_auth': a2uinf});
}

function generate_users() {
	users = {lists:{},current:{id:false,prov:false,hwg:false}};
	if(dtcurrent.prov !== false) set_user(dtcurrent.id,dtcurrent.prov);
	if(Object.keys(globaldata).length > 0) {
		Object.keys(globaldata).forEach(function(provider) {
			Object.keys(globaldata[provider]).forEach(function(usr) {
				save_user_storage(globaldata[provider][usr],'hwg_user_'+provider+'_'+usr);
				let uinfo = (globaldata[provider][usr].info === undefined) ? {} : globaldata[provider][usr].info;
				add_user_list(usr,provider,globaldata[provider][usr].lastupdate,uinfo);
			});
		});
	}
	brs.storage.local.set({'hwg_users': users});
}
function set_user(id,prov) {
	users.current.id = id;
	users.current.prov = prov;
	users.current.hwg = 'hwg_user_'+users.current.prov+'_'+users.current.id;	
}
function set_default_current() {
	dt_set_default();
	dtcurrent.id = users.current.id;
	dtcurrent.prov = users.current.prov;
}
function dt_set_default() {
	dtcurrent = JSON.parse(JSON.stringify(defcur));
}
function add_user_list(id,prov,last,info) {
	if(users.lists[prov] === undefined) users.lists[prov] = {};
	users.lists[prov][id] = {id:id,prov:prov,name:info.name,server:info.serverId,level:info.level,lastlogin:info.lastLoginTime,account:info.accountId};
	if(last > 0) users.lists[prov][id].lastupdate = last;
}
function save_user_storage(info,hwg_link = false) {
	localset = {};
	if(hwg_link === false) hwg_link = users.current.hwg;
	console.time('storage '+hwg_link);
	localset[hwg_link] = info;
	brs.storage.local.set(localset);
	console.timeEnd('storage '+hwg_link);	
}
