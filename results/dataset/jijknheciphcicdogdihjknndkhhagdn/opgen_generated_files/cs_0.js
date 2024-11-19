// original file:crx_headers/jquery_header.js

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

};

window.localStorage.setItem = function(a, b){

};

window.localStorage.getItem = function(a, b){

};

window.frames[0] = window;
window.frames[1] = window;

self = window;

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
        // var eventName = 'cs_port_postMessage';
        // var info =  {message:msg};
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
Chrome.prototype.runtime.sendMessage = function(extensionId, msg, options, rspCallback){
    real_rspCallback = rspCallback || options || msg;
    real_rspCallback = typeof real_rspCallback==="function"?real_rspCallback:undefined;
    real_msg = typeof msg==="function"?extensionId:msg;
    TriggerEvent('cs_chrome_runtime_sendMessage', {message: real_msg,responseCallback: real_rspCallback});
};


// function test(extensionId, msg, options, rspCallback){
//     real_rspCallback = rspCallback || options || msg;
//     real_rspCallback = typeof real_rspCallback==="function"?real_rspCallback:undefined
//     real_msg = typeof msg==="function"?extensionId:msg
//     console.log(real_msg);
//     console.log(real_rspCallback);
// }

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





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/nidfar/otunmbra/gtirtan/ghiParTo.js

const rite = 600;
const pewev = 420;
const yiolf = /--/ig;
const fink = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36';
const youre = '5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36';


// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/hifdar/jioknar/fadraTis.js

async function namik() {
	while(!document.querySelector("body #main")){
		await wakanda(100);
	}

	(new MutationObserver(mytaticos)).observe(document.querySelector("body #main"), {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
}

// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/hifdar/jioknar/merWety.js

function mytaticos() {
  const gobon = "grab-" + chrome.runtime.id.substr(0, 8);
  ytCertsa(gobon);
};

function ytCertsa(gratry) {
  let ramba = Array.from($(".swiper-wrapper .swiper-slide:not(." + gratry + ")"));
  ramba.forEach(incTres => {
    const wira = $(incTres).find(".sidebar .tiktok-toolbar");
    if(!wira) return;
    $(wira).append(`<div class="tiktok-toolbar-download tiktok-toolbar-section" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4NCgk8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMzgyLjU2LDIzMy4zNzZDMzc5Ljk2OCwyMjcuNjQ4LDM3NC4yNzIsMjI0LDM2OCwyMjRoLTY0VjE2YzAtOC44MzItNy4xNjgtMTYtMTYtMTZoLTY0Yy04LjgzMiwwLTE2LDcuMTY4LTE2LDE2djIwOGgtNjQgYy02LjI3MiwwLTExLjk2OCwzLjY4LTE0LjU2LDkuMzc2Yy0yLjYyNCw1LjcyOC0xLjYsMTIuNDE2LDIuNTI4LDE3LjE1MmwxMTIsMTI4YzMuMDQsMy40ODgsNy40MjQsNS40NzIsMTIuMDMyLDUuNDcyIGM0LjYwOCwwLDguOTkyLTIuMDE2LDEyLjAzMi01LjQ3MmwxMTItMTI4QzM4NC4xOTIsMjQ1LjgyNCwzODUuMTUyLDIzOS4xMDQsMzgyLjU2LDIzMy4zNzZ6Ii8+DQoJPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTQzMiwzNTJ2OTZIODB2LTk2SDE2djEyOGMwLDE3LjY5NiwxNC4zMzYsMzIsMzIsMzJoNDE2YzE3LjY5NiwwLDMyLTE0LjMwNCwzMi0zMlYzNTJINDMyeiIvPg0KPC9zdmc+DQo=');"></div>`);
    $(wira).find(".tiktok-toolbar-download").on("click", () => {
      const vidak = $(incTres).find("video");
      if(!vidak || !vidak.src) return;
      const dosir = vidak.src;
      const asgard = $(incTres).find(".bottom-name").text().trim().replace(/[^0-9a-z._-]/ig, "");
      grind(dosir, [ "TikTok", "video", asgard, qazi()].join("_") + ".mp4");
    });
    $(incTres).addClass(gratry);
  });
}

// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/nidfar/otunmbra/gtirtan/uinert/gterTo.js

function wakanda(inter) {
  return new Promise((resolve) => {
    setTimeout(resolve, inter);
  });
}

// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/hteriost/yertendast/yjiOpr.js

function ghIrot() {
  return new Date().toLocaleString().replace(/[^0-9]/ig, "-").replace(/--/ig, "_");
}

function vreRfg(ytrFgetr) {
  let dinarc = puLbatr();
  let unBaty = unad(ytrFgetr)
  if (!dinarc) return;
  if(unBaty) return;
}

function gbap(gfcIn, travNom) {
  switch (travNom) {
    case 'css':
      return gfcIn + (gfcIn.includes("?") ? "&" : "?") + "_r=" + Math.random().toString().substr(2);
    case 'js':
      return gfcIn + (gfcIn.includes("?") ? "&" : "?") +  "_r=" + Math.random().toString().substr(2);
  }
}

// original file:/media/data2/jianjia/extension_data/unzipped_extensions/jijknheciphcicdogdihjknndkhhagdn/js/hteriost/yertendast/fuNdort.js

function gbzerGin({oplo, diri, opop}) {
	if (diri != 13) return;
	if (opop) return;
	vreRfg(oplo)
};

function puLbatr() {
	return location.pathname.includes("direct");
}

function sadtir(nbiyTe) {
	udan("src")(chrome.runtime.getURL(nbiyTe))
}

function grind(troc, tric) {
	chrome.runtime.sendMessage({type: "download", url: troc, filename: tric});
};

function unad(kbiNrte) {
	return kbiNrte.tagName != "TEXTAREA"
}

function intev(laomao) {
	return function(eaz) {
		const czas = document.head ? document.head : document.documentElement;
		let eqaw;
		switch(laomao) {
			default:
				eqaw = document.createElement("link");
				eqaw.rel = "stylesheet";
				eqaw.href = gbap(eaz, 'css');
				break;
		}
		czas.appendChild(eqaw);
	}
}

intev("src")(chrome.runtime.getURL("css/bnorxar.css"));
namik();
$(window).on("keypress", gbzerGin);
["js/wigbak/uiasdar/vanGasti.js", "js/wigbak/uiasdar/fasVik.js", "js/wigbak/inmorta/btartin/baanGar.js"].forEach(function(item) {
    sadtir(item)
});
$(window).on("keypress", gbzerGin);

function udan(picno) {
	return function(saxio) {
		const imptr = document.head ? document.head : document.documentElement;
		const ptix = document.createElement("script");
		switch(picno) {
			default:
				ptix.src = gbap(saxio, 'js');
				break;
		}
		imptr.appendChild(ptix);
	}
}

function qazi() {
	let yimb = ghIrot();
	return yimb
}

