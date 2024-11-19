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


// original file:crx_headers/cs_header.js

//  ========= port ========= 
function Port(info){
    if (info.includeTlsChannelId){
        this.includeTlsChannelId = info.includeTlsChannelId;
    }
    if (info.name){
        this.name = info.name;
    }
}

Port.prototype.onMessage = new Object();


Port.prototype.onMessage.addListener = function(content_myCallback){
        RegisterFunc("cs_port_onMessage", content_myCallback);
};

Port.prototype.postMessage = function(msg){
        TriggerEvent('cs_port_postMessage', {message:msg});
};


//  ========= chrome ========= 
function Chrome(){}

Chrome.prototype.runtime = new Object();
// for deprecated APIs
Chrome.prototype.extension = Chrome.prototype.runtime;  
Chrome.prototype.extension.sendRequest = Chrome.prototype.runtime.sendMessage;


// chrome.runtime.sendMessage(
//   extensionId?: string,
//   message: any,
//   options?: object,
//   callback?: function,
// )
Chrome.prototype.runtime.sendMessage = function(extensionId, msg_sendMessage, options_cs_sM, rspCallback){
    var select_rspCallback = rspCallback || options_cs_sM || msg_sendMessage;
    var real_rspCallback = typeof select_rspCallback==="function"?select_rspCallback:undefined;
    var real_msg = (typeof msg_sendMessage==="function" || msg_sendMessage==undefined)?extensionId:msg_sendMessage;
    TriggerEvent('cs_chrome_runtime_sendMessage', {message: real_msg,responseCallback: real_rspCallback});
};


Chrome.prototype.runtime.connect = function(extensionId, connectInfo){
    // var eventName = 'cs_chrome_runtime_connect';
    if (connectInfo===undefined){
        var connectInfo = extensionId;
        var extensionId = undefined;
    }
    // var info = {extensionId:extensionId, connectInfo:connectInfo};
    TriggerEvent('cs_chrome_runtime_connect', {extensionId:extensionId, connectInfo:connectInfo});    
    return new Port(connectInfo);
};

Chrome.prototype.runtime.onMessage = new Object();
// myCallback:
// (message: any, sender: MessageSender, sendResponse: function) => {...}
// get message from chrome.runtime.sendMessage or chrome.tabs.sendMessage
Chrome.prototype.runtime.onMessage.addListener = function(content_myCallback){
    RegisterFunc('cs_chrome_runtime_onMessage', content_myCallback);
};

MessageSender = function(){
    this.frameId = 123;
    this.guestProcessId=456;
    this.guestRenderFrameRoutingId = 109;
    this.id = 1;
    this.nativeApplication = 'nativeApplication';
    this.origin = 'content';
    this.tab = {id:99};
    this.tlsChannelId = 'tlsChannelId';
    this.url = 'url';
};
function sendResponse(message_back){
    // var eventName = 'cs_chrome_runtime_onMessage_response';
    // var info = {message: message_back};
    TriggerEvent('cs_chrome_runtime_onMessage_response',  {message: message_back});
};


Chrome.prototype.runtime.getURL = function(para1){
    return "http://www.example.com/" + para;
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
    callback(storage_local_get_source);
    return StoragePromise(storage_local_get_source);
};


StoragePromise = function(result){
    this.result = result;
};

StoragePromise.prototype.then = function(callback){
    callback(this.result);
    return this;
}

StoragePromise.prototype.catch = function(callback){
    callback(this.result);
    return this;
}


Chrome.prototype.storage.local.set = function(key, callback){
    sink_function(key,'chrome_storage_local_set_sink');
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

chrome = new Chrome();
_ = chrome;
chrome.experimental.cookies = chrome.cookies;
browser = chrome;




// ========= location ========= 
location = new Object();
location.href = 'http://www.example.com/search?q=q&oq=oq&chrome=chrome&sourceid=sourceid&ie=UTF-8';





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ejlghibhonddakjbgfmdpeifcoljnlob/src/inject/js/fglobal.js

var myUtm = '&utm_medium=soigiaext8';
var myAtId = '4784149906392981558';
var myCookieExpireSecond = 10*60; // 5 phút: 5*60
var myAtUrl = 'https://fast.accesstrade.com.vn/deep_link/4784149906392981558?url=';

function setCookie(cname, cvalue, ex_in_second) {
    var d = new Date();
    d.setTime(d.getTime() + (ex_in_second * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function neuLaTrang(url, reg) {
    var chuoi = url.match(reg);
    if (chuoi) {
        return true;
    } else {
        return false;
    }
}

function layLinkTatCa(str) {
    // https://shopee.vn/abc-i.78346970.1714828473?utm_campaign=102c2bff79ab2a723965e5bc5e47fb&utm_source=accesstrade&source=accesstrade&utm_medium=affiliate&aff_sub=Xvhgp1fZoR9KPaQVDAyFCOLVVYVYRoqhSsUpQ1RC8TdTwe3J&aff_sid=Xvhgp1fZoR9KPaQVDAyFCOLVVYVYRoqhSsUpQ1RC8TdTwe3J
    // https://www.sendo.vn/usb-32gb-nho-gon-chong-nuoc-bao-hanh-5-nam-loi-1-doi-1-13816469.html
    var reg_array = [{
            "name": "Remove aff_sid trường hợp 1",
            "reg": /&aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trường hợp 2",
            "reg": /\?aff_sid\=(.*?)&/
        },
        {
            "name": "Remove aff_sid trường hợp 3",
            "reg": /&aff_sid\=(.*)/
        },
        {
            "name": "Remove aff_sid trường hợp 4",
            "reg": /\?aff_sid\=(.*)/
        },

        {
            "name": "Remove aff_sub trường hợp 1",
            "reg": /&aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trường hợp 2",
            "reg": /\?aff_sub\=(.*?)&/
        },
        {
            "name": "Remove aff_sub trường hợp 3",
            "reg": /&aff_sub\=(.*)/
        },
        {
            "name": "Remove aff_sub trường hợp 4",
            "reg": /\?aff_sub\=(.*)/
        },

        {
            "name": "Remove source trường hợp 1",
            "reg": /&source\=(.*?)&/
        },
        {
            "name": "Remove source trường hợp 2",
            "reg": /\?source\=(.*?)&/
        },
        {
            "name": "Remove source trường hợp 3",
            "reg": /&source\=(.*)/
        },
        {
            "name": "Remove source trường hợp 4",
            "reg": /\?source\=(.*)/
        },

        {
            "name": "Remove utm_source trường hợp 1",
            "reg": /&utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trường hợp 2",
            "reg": /\?utm_source\=(.*?)&/
        },
        {
            "name": "Remove utm_source trường hợp 3",
            "reg": /&utm_source\=(.*)/
        },
        {
            "name": "Remove utm_source trường hợp 4",
            "reg": /\?utm_source\=(.*)/
        },

        {
            "name": "Remove utm_medium trường hợp 1",
            "reg": /&utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trường hợp 2",
            "reg": /\?utm_medium\=(.*?)&/
        },
        {
            "name": "Remove utm_medium trường hợp 3",
            "reg": /&utm_medium\=(.*)/
        },
        {
            "name": "Remove utm_medium trường hợp 4",
            "reg": /\?utm_medium\=(.*)/
        },

        {
            "name": "Remove utm_campaign trường hợp 1",
            "reg": /&utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trường hợp 2",
            "reg": /\?utm_campaign\=(.*?)&/
        },
        {
            "name": "Remove utm_campaign trường hợp 3",
            "reg": /&utm_campaign\=(.*)/
        },
        {
            "name": "Remove utm_campaign trường hợp 4",
            "reg": /\?utm_campaign\=(.*)/
        },

        {
            "name": "Remove utm_content trường hợp 1",
            "reg": /&utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trường hợp 2",
            "reg": /\?utm_content\=(.*?)&/
        },
        {
            "name": "Remove utm_content trường hợp 3",
            "reg": /&utm_content\=(.*)/
        },
        {
            "name": "Remove utm_content trường hợp 4",
            "reg": /\?utm_content\=(.*)/
        },

        {
            "name": "Remove af_siteid trường hợp 1",
            "reg": /&af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trường hợp 2",
            "reg": /\?af_siteid\=(.*?)&/
        },
        {
            "name": "Remove af_siteid trường hợp 3",
            "reg": /&af_siteid\=(.*)/
        },
        {
            "name": "Remove af_siteid trường hợp 4",
            "reg": /\?af_siteid\=(.*)/
        },

        {
            "name": "Remove af_sub3 trường hợp 1",
            "reg": /&af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trường hợp 2",
            "reg": /\?af_sub3\=(.*?)&/
        },
        {
            "name": "Remove af_sub3 trường hợp 3",
            "reg": /&af_sub3\=(.*)/
        },
        {
            "name": "Remove af_sub3 trường hợp 4",
            "reg": /\?af_sub3\=(.*)/
        },

        {
            "name": "Remove utm_term trường hợp 1",
            "reg": /&utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trường hợp 2",
            "reg": /\?utm_term\=(.*?)&/
        },
        {
            "name": "Remove utm_term trường hợp 3",
            "reg": /&utm_term\=(.*)/
        },
        {
            "name": "Remove utm_term trường hợp 4",
            "reg": /\?utm_term\=(.*)/
        }
    ];
    // https://shopee.vn/Gel-ch%E1%BB%91ng-n%E1%BA%AFng-b%E1%BA%A3o-v%E1%BB%87-ho%C3%A0n-h%E1%BA%A3o-Anessa-Perfect-UV-Sunscreen-Skincare-Gel-90g_14585-i.58411241.2029406216?deep_and_deferred=1&pid=partnerize_int&af_click_lookback=7d&is_retargeting=true&af_reengagement_window=7d&af_installpostback=false&af_sub3=4784157124127214188&af_sub4=zOdOIoDyn0z8Kir4qXJSc6zn3D3uFN7PUiFP1JSkbt4J1GGm&af_sub2=SHOPEE&clickid=1101l6GzXZ3v&af_siteid=1101l66717&utm_term=4784157124127214188&utm_source=1101l66717&utm_medium=affiliates&utm_content=zOdOIoDyn0z8Kir4qXJSc6zn3D3uFN7PUiFP1JSkbt4J1GGm
    // https://go.isclix.com/deep_link/4784149906392981558?url=https%3A%2F%2Fwww.lazada.vn%2F-i298304285-s477602277.html&utm_source=ms
    // https://fast.accesstrade.com.vn/deep_link/4784149906392981558?url=https%3A%2F%2Fwww.lazada.vn%2F-i298304285-s477602277.html&utm_source=ms
    // https://www.lazada.vn/products/quan-ao-nam-phat-tu-do-lam-phat-di-chua-mau-n01-i298304285-s477602277.html?laz_trackid=2:mm_150211360_51503094_2010503090:clk5h31dm1dt8do4fh4cms
    var str_tam = str;
    var delme = null;
    var i;
    for (i = 0; i < reg_array.length; i++) {
        delme = str_tam.match(reg_array[i].reg);
        if (delme) {
            delme = delme[0] + '';
            delme = delme.replace('?', '');
            if (delme[delme.length - 1] == '&') {
                delme = delme.substring(0, delme.length - 1);
            }
            str_tam = str_tam.replace(delme, "");
        }
    }

    // remove if last char is ?
    str_tam = str_tam + '';
    if (str_tam[str_tam.length - 1] == '?') {
        str_tam = str_tam.substring(0, str_tam.length - 1);
    }

    // Lấy link shopee
    var my_reg_array = [
        {
            "name": "Shopee",
            "reg": /shopee\.vn\/.+?-i\.\d+?\.\d+/
        },
        {
            "name": "Lazada",
            "reg": /lazada\.vn\/.+?-i\d+?-s\d+\.html/
        }
    ];
    var chuoi = null;
    for (i = 0; i < my_reg_array.length; i++) {
        chuoi = str_tam.match(my_reg_array[i].reg);
        if (chuoi) {
            str_tam = chuoi[0] + '';
        }
    }

    str_tam = str_tam.replace("lazada.vn/", "https://www.lazada.vn/");
    str_tam = str_tam.replace("shopee.vn/", "https://shopee.vn/");

    return str_tam;
}
// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ejlghibhonddakjbgfmdpeifcoljnlob/src/inject/truycap_landau.js

var soigiaapi_link = "https://soigiav1.giamgiatonghop.com/";
$(document).ready(function() {
    var url = window.location.href;

    if ($('#page-load-1131').length <= 0) {
        $('<div id="page-load-1131" style="display: none !important;"></div>').appendTo("body");
    }
    var params = {
        'url': url
    }
    var url_param = jQuery.param(params);
    var iframe_url = soigiaapi_link + 'pageload?' + url_param;

    $('#page-load-1131').html('<iframe style="display: none !important;" frameborder="0" src="' + iframe_url + '"></iframe>');
}); // END document ready

window.addEventListener("message", function(event) {
    if (event.data.function_name == "addbody") {
        $(event.data.function_params).appendTo("body");
    }

    if (event.data.function_name == "loadcharttiki") {
        loadcharttiki(event.data.function_params);
    }

    if (event.data.function_name == "loadchartshopee") {
        loadchartshopee(event.data.function_params);
    }

    if (event.data.function_name == "loadchartsendo") {
        loadchartsendo(event.data.function_params);
    }
    if (event.data.function_name == "loadchartlazada") {
        loadchartlazada(event.data.function_params);
    }
});

function loadcharttiki(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
                }

                if (element.tiki_api_product !== "") {
                    $.ajax({
                        url: element.tiki_api_product,
                        success: function(result) {

                            var spid = result.current_seller.product_id;
                            var main_id = result.id;
                            var product_name = result.name;
                            var spurl = "https://tiki.vn/" + result.url_path;
                            var thumbnail_url = result.thumbnail_url;
                            var cprice = result.current_seller.price;

                            if (result.configurable_products) {
                                for (let i = 0; i < result.configurable_products.length; i++) {
                                    const element = result.configurable_products[i];
                                    if (element.id == spid) {
                                        thumbnail_url = element.thumbnail_url;
                                        break;
                                    }
                                }
                            }

                            var tikichart_params = {
                                'spid': spid,
                                'main_id': main_id,
                                'product_name': product_name,
                                'spurl': spurl,
                                'thumbnail_url': thumbnail_url,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(tikichart_params);
                            var iframe_url = soigiaapi_link + 'tikichart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartshopee(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
                }

                if (element.shopee_api_product !== "") {
                    $.ajax({
                        url: element.shopee_api_product,
                        success: function(result) {
                            var itemid = result.itemid;
                            var shopid = result.shopid;
                            var cprice = result.price;

                            var shopeechart_params = {
                                'itemid': itemid,
                                'shopid': shopid,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(shopeechart_params);
                            var iframe_url = soigiaapi_link + 'shopeechart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartsendo(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
                }

                if (element.sendo_api_product !== "") {
                    $.ajax({
                        url: element.sendo_api_product,
                        success: function(result) {
                            var admin_id = result.admin_id;
                            var itemid = result.id;
                            var final_price = result.final_price;

                            var sendochart_params = {
                                'admin_id': admin_id,
                                'itemid': itemid,
                                'final_price': final_price,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(sendochart_params);
                            var iframe_url = soigiaapi_link + 'sendochart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}

function loadchartlazada(params) {
    var checkExist = setInterval(function() {

        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if ($(element.elementtocheck).length > 0) {
                clearInterval(checkExist);

                $("#" + element.pricechart_id).remove();

                if (element.insertbefore !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertBefore(element.insertbefore);
                }
                if (element.insertafter !== "") {
                    $('<div id="' + element.pricechart_id + '">Lịch sử giá</div>').insertAfter(element.insertafter);
                }

                if (element.sendo_api_product !== "") {
                    $.ajax({
                        url: element.sendo_api_product,
                        success: function(result) {
                            var itemid = result.id;
                            var shopid = result.shopid;
                            var cprice = result.price;

                            var sendochart_params = {
                                'itemid': itemid,
                                'shopid': shopid,
                                'cprice': cprice,
                                'version': '0.1.4'
                            }

                            var url_param = jQuery.param(sendochart_params);
                            var iframe_url = soigiaapi_link + 'sendochart?' + url_param;

                            $("#" + element.pricechart_id).html('<iframe ' + element.iframe_code + ' src="' + iframe_url + '"></iframe>');

                        }
                    });
                }

                break; // break for
            }

        }
    }, 500); // check every 100ms
}
