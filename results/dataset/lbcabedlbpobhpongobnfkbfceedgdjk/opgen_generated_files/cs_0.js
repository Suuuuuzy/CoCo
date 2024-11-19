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





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/lbcabedlbpobhpongobnfkbfceedgdjk/build/content/content.min.js

!function(){if(!window.hasRun){window.hasRun=!0;var e=chrome.runtime.connect({name:location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g,"").split("\n").join("").split("\r").join("")});window.addEventListener("message",function(e){var t="chrome-extension://"+chrome.runtime.id;if(e.origin==t){var n=u();if(!n)return;if(e.data.cameraSetupError){if(chrome.storage.sync.set({enableEmbeddedCamera:"false"}),n.getElementById("outklip-webcam-player").style.display="none",$("#cameraswitch",n)&&$("#cameraswitch",n).prop("checked",!1),$("#tabcameraswitch",n)&&$("#tabcameraswitch",n).prop("checked",!1),"user"==e.data.requesttype){var o='<span style="color:red;">Camera setup failed</span>. <a href="https://outklip.com/help/article/fix-the-camera-setup-failed-error" target="_blank"> How to fix? </a>';n.getElementById("outklip-desktop-error").innerHTML=o,n.getElementById("outklip-tab-error").innerHTML=o,n.getElementById("outklip-camera-mode-error").innerHTML=o,function(){if(!document.getElementById("outklip-camera-setup-error")){var e=document.createElement("div");e.id="outklip-camera-setup-error",document.body.appendChild(e)}}()}}else if(e.data.cameraIsOn){chrome.storage.sync.set({enableEmbeddedCamera:e.data.cameraIsOn.toString()}),n.getElementById("outklip-profile-photo").style.display="none",n.getElementById("outklip-webcam-player").style.display="inline-block",$("#cameraswitch",n)&&$("#cameraswitch",n).prop("checked",e.data.cameraIsOn),$("#tabcameraswitch",n)&&$("#tabcameraswitch",n).prop("checked",e.data.cameraIsOn),chrome.storage.sync.get(["cameraSize"],function(e){var t=n.getElementById("getcameraiframe");if(t){var o="250px",i="250px";"Medium"==e.cameraSize?(o="190px",i="190px"):"Small"==e.cameraSize&&(o="140px",i="140px"),t.contentWindow.postMessage({type:"CHANGE_SIZE",width:o,height:i},"*"),t.style.width=o,t.style.height=i}}),function(){var e=document.getElementById("outklip-camera-setup-error");e&&e.remove();var t=u();if(!t)return;t.getElementById("outklip-desktop-error").innerHTML="",t.getElementById("outklip-tab-error").innerHTML="",t.getElementById("outklip-camera-mode-error").innerHTML=""}(),pe(),(l=n.getElementById("getcameraiframe"))&&l.contentWindow.postMessage({type:"GET_CAMERA_DEVICES",requesttype:"auto"},"*"),chrome.storage.sync.get(["askUserForAllUrlsPermission","hasAllUrlsPermission"],function(e){"true"==e.askUserForAllUrlsPermission&&"false"==e.hasAllUrlsPermission&&(n.getElementById("outklip-allurls-rationale-container").style.display="block",chrome.storage.sync.set({askUserForAllUrlsPermission:"false"}))})}else if(e.data.micSetupError){if(chrome.storage.sync.set({enableMicrophone:"false"}),$("#audioswitch",n)&&$("#audioswitch",n).prop("checked",!1),$("#tabmicswitch",n)&&$("#tabmicswitch",n).prop("checked",!1),$("#cameramicswitch",n)&&$("#cameramicswitch",n).prop("checked",!1),"user"==e.data.requesttype){var i='<span style="color:red;">Mic setup failed</span>. <a href="https://outklip.com/help/article/fix-the-mic-setup-failed-error" target="_blank"> How to fix? </a>';n.getElementById("outklip-desktop-error").innerHTML=i,n.getElementById("outklip-tab-error").innerHTML=i,n.getElementById("outklip-camera-mode-error").innerHTML=i,function(){if(!document.getElementById("outklip-mic-setup-error")){var e=document.createElement("div");e.id="outklip-mic-setup-error",document.body.appendChild(e)}}()}}else if(e.data.micIsOn){var l;chrome.storage.sync.set({enableMicrophone:"true"}),$("#audioswitch",n)&&$("#audioswitch",n).prop("checked",!0),$("#tabmicswitch",n)&&$("#tabmicswitch",n).prop("checked",!0),$("#cameramicswitch",n)&&$("#cameramicswitch",n).prop("checked",!0),pe(),(l=n.getElementById("getmiciframe"))&&l.contentWindow.postMessage({type:"GET_MIC_DEVICES",requesttype:"auto"},"*")}else if(e.data.listOfCameraInputDevices){if($("#cameradeviceselect",n)){$("#cameradeviceselect",n).empty();var a=!1;chrome.storage.sync.get(["camera"],function(t){for(var o=0;o<e.data.listOfCameraInputDevices.length;o++)$("#cameradeviceselect",n).append(`<option value="${e.data.listOfCameraInputDevices[o].id}">${e.data.listOfCameraInputDevices[o].label}</option>`),t.camera==e.data.listOfCameraInputDevices[o].id&&($("#cameradeviceselect",n).val(e.data.listOfCameraInputDevices[o].id),a=!0);a||(0==e.data.listOfCameraInputDevices.length?$("#cameradeviceselect",n).append('<option value="none">None</option>').val("none"):$("#cameradeviceselect",n).val(e.data.listOfCameraInputDevices[0].id))})}}else if(e.data.listOfMicDevices&&$("#micdeviceselect",n)){$("#micdeviceselect",n).empty();var r=!1;chrome.storage.sync.get(["microphone"],function(t){for(var o=0;o<e.data.listOfMicDevices.length;o++)$("#micdeviceselect",n).append(`<option value="${e.data.listOfMicDevices[o].id}">${e.data.listOfMicDevices[o].label}</option>`),t.microphone==e.data.listOfMicDevices[o].id&&($("#micdeviceselect",n).val(e.data.listOfMicDevices[o].id),r=!0);r||(0==e.data.listOfMicDevices.length?$("#micdeviceselect",n).append('<option value="none">None</option>').val("none"):$("#micdeviceselect",n).val(e.data.listOfMicDevices[0].id))})}}},!1);var t=["filter-none","filter-aden","filter-amaro","filter-clarendon","filter-gingham","filter-hefe","filter-hudson","filter-inkwell","filter-juno","filter-lark","filter-lofi","filter-ludwig","filter-mayfair","filter-moon","filter-nashville","filter-perpetua","filter-reyes","filter-rise","filter-sierra","filter-valencia","filter-willow","filter-xpro-ii"];if(chrome.runtime.onMessage.addListener(function(t,n,o){if("show_signup"==t.greeting)chrome.storage.sync.set({contentScriptState:"signup"}),(s=u())&&s.getElementById("outklip-modal-id")?(s.getElementById("outklip-config-modal").style.display="none",s.getElementById("outklip-signup-modal").style.display="block",s.getElementById("outklip-modal-id").style.display="block",s.getElementById("outklip-sandbox").addEventListener("click",R),s.getElementById("outklip-close-signup").onclick=T,s.getElementById("outklip-signup-logo").src=chrome.extension.getURL("images/v11/logo.png")):$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var t=u();t.getElementById("outklip-config-modal").style.display="none",t.getElementById("outklip-signup-modal").style.display="block",t.getElementById("outklip-modal-id").style.display="block",t.getElementById("outklip-sandbox").addEventListener("click",R),t.getElementById("outklip-close-signup").onclick=T,t.getElementById("outklip-signup-logo").src=chrome.extension.getURL("images/v11/logo.png")});else if("hide_signup"==t.greeting){(s=u())?(s.getElementById("outklip-signup-modal").style.display="none",s.getElementById("outklip-modal-id").style.display="none"):$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var t=u();t.getElementById("outklip-signup-modal").style.display="none",t.getElementById("outklip-modal-id").style.display="none"}),chrome.storage.sync.set({contentScriptState:"none"})}else if("show_config"==t.greeting){if(a=t.profilephoto?t.profilephoto:me(t.username),chrome.storage.sync.set({contentScriptState:"config"}),(s=u())&&s.getElementById("outklip-modal-id"))ye(),s.getElementById("outklip-signup-modal").style.display="none",s.getElementById("outklip-webcam-video-container").style.display="block",s.getElementById("outklip-config-modal").style.display="block",s.getElementById("outklip-modal-id").style.display="block",h(),E(),V(),ee(),se(t.customerType,t.daysLeftInTrial,t.numCredits),s.getElementById("outklip-settings-link").href="chrome-extension://"+chrome.runtime.id+"/settings.html";else $.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),ye();var n=u();n.getElementById("outklip-signup-modal").style.display="none",n.getElementById("outklip-config-modal").style.display="block",n.getElementById("outklip-modal-id").style.display="block",n.getElementById("outklip-webcam-video-container").style.display="block",h(),E(),V(),ee(),se(t.customerType,t.daysLeftInTrial,t.numCredits),n.getElementById("outklip-settings-link").href="chrome-extension://"+chrome.runtime.id+"/settings.html"})}else if("hide_config"==t.greeting){(s=u())?D():$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),D()}),t.switchactivetab||chrome.storage.sync.set({contentScriptState:"none"})}else if("show_countdown"==t.greeting){a=t.profilephoto?t.profilephoto:me(t.username),chrome.storage.sync.set({isRecordingPausedOrNotStarted:"false"}),(s=u())?(ae(),re(),chrome.storage.sync.get("countdownTimerValueInSeconds",function(t){if(t.countdownTimerValueInSeconds){if(0===parseInt(t.countdownTimerValueInSeconds))return s.getElementById("outklip-countdown-container").style.display="none",clearTimeout(r),r=null,void e.postMessage({startRecording:!0});c=Math.round(1e3*parseInt(t.countdownTimerValueInSeconds,10)/300)+1}else c=d,chrome.storage.sync.set({countdownTimerValueInSeconds:"3"});s.getElementById("outklip-countdown-timer").innerHTML=oe().toString(),s.getElementById("outklip-countdown-pause-resume-button").addEventListener("click",le),le(),ce()}),s.getElementById("outklip-cancel-recording-during-countdown").addEventListener("click",O),s.getElementById("toggle-menu").removeEventListener("click",te),s.getElementById("toggle-menu").addEventListener("click",ne),s.getElementById("toggle-pause-resume").removeEventListener("click",A),s.getElementById("toggle-pause-resume").removeEventListener("click",H),s.getElementById("toggle-pause-resume").addEventListener("click",le),s.getElementById("cancel-recording").removeEventListener("click",T),s.getElementById("cancel-recording").removeEventListener("click",N),s.getElementById("cancel-recording").addEventListener("click",O),s.getElementById("outklip-sandbox").removeEventListener("click",R)):$.get(chrome.runtime.getURL("content/content.html"),function(t){g(t);var n=u();ae(),re(),chrome.storage.sync.get("countdownTimerValueInSeconds",function(t){if(t.countdownTimerValueInSeconds){if(0===parseInt(t.countdownTimerValueInSeconds))return n.getElementById("outklip-countdown-container").style.display="none",clearTimeout(r),r=null,void e.postMessage({startRecording:!0});c=Math.round(1e3*parseInt(t.countdownTimerValueInSeconds,10)/300)+1}else c=d,chrome.storage.sync.set({countdownTimerValueInSeconds:"3"});n.getElementById("outklip-countdown-timer").innerHTML=oe().toString(),n.getElementById("outklip-countdown-pause-resume-button").addEventListener("click",le),le(),ce()}),n.getElementById("outklip-cancel-recording-during-countdown").addEventListener("click",O),n.getElementById("toggle-menu").removeEventListener("click",te),n.getElementById("toggle-menu").addEventListener("click",ne),n.getElementById("toggle-pause-resume").removeEventListener("click",A),n.getElementById("toggle-pause-resume").removeEventListener("click",H),n.getElementById("toggle-pause-resume").addEventListener("click",le),n.getElementById("cancel-recording").removeEventListener("click",T),n.getElementById("cancel-recording").removeEventListener("click",N),n.getElementById("cancel-recording").addEventListener("click",O),n.getElementById("outklip-sandbox").removeEventListener("click",R)}),chrome.storage.sync.set({contentScriptState:"countdown"})}else if("started_recording"==t.greeting){a=t.profilephoto?t.profilephoto:me(t.username),(s=u())?(t.switchactivetab&&ae(),re(),s.getElementById("toggle-pause-resume").removeEventListener("click",A),s.getElementById("toggle-pause-resume").removeEventListener("click",le),s.getElementById("toggle-pause-resume").addEventListener("click",H),s.getElementById("cancel-recording").removeEventListener("click",T),s.getElementById("cancel-recording").removeEventListener("click",O),s.getElementById("cancel-recording").addEventListener("click",N),s.getElementById("outklip-webcam-resize-icon").addEventListener("click",x),s.getElementById("outklip-webcam-change-filter").addEventListener("click",w),s.getElementById("outklip-open-picture-in-picture").addEventListener("click",L),s.getElementById("outklip-webcam-container-close-icon").addEventListener("click",C),s.getElementById("toggle-menu").removeEventListener("click",te),s.getElementById("toggle-menu").addEventListener("click",ne)):$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var n=u();t.switchactivetab&&ae(),re(),n.getElementById("toggle-pause-resume").removeEventListener("click",A),n.getElementById("toggle-pause-resume").removeEventListener("click",le),n.getElementById("toggle-pause-resume").addEventListener("click",H),n.getElementById("cancel-recording").removeEventListener("click",T),n.getElementById("cancel-recording").removeEventListener("click",O),n.getElementById("cancel-recording").addEventListener("click",N),n.getElementById("outklip-webcam-resize-icon").addEventListener("click",x),n.getElementById("outklip-webcam-change-filter").addEventListener("click",w),n.getElementById("outklip-open-picture-in-picture").addEventListener("click",L),n.getElementById("outklip-webcam-container-close-icon").addEventListener("click",C),n.getElementById("toggle-menu").removeEventListener("click",te),n.getElementById("toggle-menu").addEventListener("click",ne)}),chrome.storage.sync.set({contentScriptState:"recording"}),chrome.storage.sync.get("highlightMouseCursor",function(e){if("true"==e.highlightMouseCursor)for(var t=document.getElementsByTagName("body"),n=chrome.runtime.getURL("content/assets/outklip_highlight_mouse.cur"),o=0;o<t.length;o++)t[o].style.cursor=`url("${n}") 25 20, default`,t[o].style.zIndex="100000"})}else if("stopped_recording"==t.greeting){if(s=u()){var i=s.getElementById("getcameraiframe");i&&i.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*");var l=s.getElementById("getcameramodeiframe");l&&l.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),t.switchactivetab||chrome.storage.sync.set({contentScriptState:"none"}),s.getElementById("outklip-webcam-video-container").style.display="none",s.getElementById("outklip-control-container").style.display="none",s.getElementById("outklip-camera-modal-content").style.display="none"}else $.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var n=u(),o=n.getElementById("getcameraiframe");o&&o.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*");var i=n.getElementById("getcameramodeiframe");i&&i.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),t.switchactivetab||chrome.storage.sync.set({contentScriptState:"none"}),n.getElementById("outklip-webcam-video-container").style.display="none",n.getElementById("outklip-control-container").style.display="none",n.getElementById("outklip-camera-modal-content").style.display="none"});chrome.storage.sync.get("highlightMouseCursor",function(e){if("true"==e.highlightMouseCursor)for(var t=document.getElementsByTagName("body"),n=0;n<t.length;n++)t[n].style.cursor="default"})}else if("update_recording_time_indicator"==t.greeting){(s=u())?(s.getElementById("recording-time-indicator-string").innerHTML=de(t.timeinseconds),s.getElementById("recording-blinker").style.display="inline-block"):$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var n=u();n.getElementById("recording-time-indicator-string").innerHTML=de(t.timeinseconds),n.getElementById("recording-blinker").style.display="inline-block"})}else if("show_outklip_loader"==t.greeting){if(s=u())s.getElementById("outklip-close-loader").onclick=z,s.getElementById("outklip-motivational-message").innerHTML=m[Math.floor(Math.random()*m.length)],s.getElementById("outklip-loader-container").style.display="block";else $.get(chrome.runtime.getURL("content/content.html"),function(e){g(e);var t=u();t.getElementById("outklip-close-loader").onclick=z,t.getElementById("outklip-motivational-message").innerHTML=m[Math.floor(Math.random()*m.length)],t.getElementById("outklip-loader-container").style.display="block"});chrome.storage.sync.set({contentScriptState:"uploadinprogress"})}else if("hide_outklip_loader"==t.greeting){(s=u())?s.getElementById("outklip-loader-container").style.display="none":$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),u().getElementById("outklip-loader-container").style.display="none"}),t.switchactivetab||chrome.storage.sync.set({contentScriptState:"none"})}else if("update_loader_percentage_complete"==t.greeting){(s=u())?s.getElementById("outklip-loader-percentage-complete").innerHTML="Uploading... "+t.percentageUploadComplete+"% complete":$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),u().getElementById("outklip-loader-percentage-complete").innerHTML="Uploading... "+t.percentageUploadComplete+"% complete"})}else if("update_profile_photo"==t.greeting){a=t.profilephoto?t.profilephoto:me(t.username),(s=u())?s.getElementById("outklip-profile-photo").src=a:$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),u().getElementById("outklip-profile-photo").src=a})}else if("force_pause_recording"==t.greeting){(s=u())?P():$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),P()})}else if("force_resume_recording"==t.greeting){(s=u())?F():$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),F()})}else if("force_cancel_recording"==t.greeting){var s;(s=u())?U():$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),U()})}}),!document.getElementById("outklip-extension-is-installed")){var n=document.createElement("div");n.id="outklip-extension-is-installed",document.body.appendChild(n)}var o=null,i=null,l=!1,a=null,r=null,c=0,s=300,d=11,m=["The curiosity he had was a driving force. - Elon Musk's uncle","A mind once stretched never regains its original dimensions. - Oliver Wendell Holmes","Innovation, adaption and evolution are ultimately keys to survival. - Andrew Lo","The work will teach you how to do it. - fortune cookie","Creativity comes from constraint. - Biz Stone","No one has ever become poor by giving. - Anne Frank","Believe you can and you’re halfway there. - Theodore Roosevelt","There are no limits. There are only plateaus, and you must not stay there, you must go beyond them. - Bruce Lee","The mind is not a vessel to be filled but a fire to be kindled. - Plutarch","A flower is simply a weed with an advertising budget. - Rory Sutherland","Art is what you can get away with. - Andy Warhol","Don’t think about making art, just get it done. Let everyone else decide if it’s good or bad, whether they love it or hate it. While they are deciding, make even more art. - Andy Warhol","The only learning curve worth being on is a steep one. - Tahir Shah","The more you make the more you learn. - Kevin Allocca","It's the job that's never started that takes the longest to finish. - J. R. R Tolkien","It is our choices, that show what we truly are, far more than our abilities. - J. K. Rowling","A flower does not think of competing with the flower next to it. It just blooms. - Iris Murdoch","The right teacher doesn’t have to be brilliant — they just have to be able to make you want to do more of whatever you are interested in. - Robert Twigger","We are what we repeatedly do. - Aristotle","Delete the negative; accentuate the positive. - Donna Karan","Creativity is intelligence having fun. - anon","To teach is to learn twice. - Joseph Joubert","Action is the foundational key to all success. - Picasso","Nothing in life is to be feared. It is only to be understood. - Marie Curie","Creativity is the residue of time wasted. - Albert Einstein","Knowledge not shared is a puny little thing. - Dee Hock","One person can make a huge difference in the world. - Startup Daemon","Champions keep playing until they get it right. - Billie Jean King","One demonstration is worth a month of practice. - Takeno Sensei","I don't go by the rule book. I lead from the heart, not the head. - Princess Diana","I discovered that I was the world's leading expert in one thing: my experience. - Peter Schjeldahl","Every upgrade is inevitably in some way a downgrade. - Chris Clark","Nothing is impossible; the word itself says 'I'm possible'! - Audrey Hepburn","If you believe it will work out, you'll see opportunities. If you believe it won't, you will see obstacles. - Wayne Dyer","Great video is a communication tool of unparallelled impact. - Steve Stockman","Technology is simply a tool supporting human brilliance. - Gail Ayers","Expect the unexpected, and whenever possible, be the unexpected. - Lynda Barry"];$(document).ready(function(){document.addEventListener("fullscreenchange",function(e){i&&(i.remove(),e.target==document?document.body.appendChild(i):e.target.appendChild(i))}),chrome.storage.sync.get(["inlineVideoPlayback"],function(e){e&&e.inlineVideoPlayback&&"false"!=e.inlineVideoPlayback&&(window.onload=Ee,window.onhashchange=Ee,History.Adapter.bind(window,"statechange",Ee))})}),document.addEventListener("keydown",function(e){"Escape"===e.code&&chrome.storage.sync.get("contentScriptState",function(e){if("config"===e.contentScriptState)(t=u())?D():$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),D()}),chrome.storage.sync.set({contentScriptState:"none"});else if("uploadinprogress"===e.contentScriptState){var t;(t=u())?t.getElementById("outklip-loader-container").style.display="none":$.get(chrome.runtime.getURL("content/content.html"),function(e){g(e),u().getElementById("outklip-loader-container").style.display="none"}),chrome.storage.sync.set({contentScriptState:"none"})}})});var p=["classroom.google.com"]}function g(e){$(e).appendTo("body");var t=(i=document.getElementById("outklip-root")).attachShadow({mode:"open"}),n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href="chrome-extension://"+chrome.runtime.id+"/css/all.min.css",t.appendChild(n);var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.href="chrome-extension://"+chrome.runtime.id+"/css/instagram.min.css",t.appendChild(o);var l=document.getElementById("outklip-template").content,a=document.importNode(l,!0);t.appendChild(a)}function u(){var e=document.getElementById("outklip-root"),t=e?e.shadowRoot:null;return t&&t.getElementById("outklip-modal-id")?t:null}function y(){var e=u();e&&(e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-player").style.display="inline-block",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!0),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!0))}function h(){var e=u();if(e){var n=e.getElementById("getcameraiframe");chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","cameraSize","avatarinplaceofcamera","camera","cameralabel"],function(i){var l="250px",r="250px";"Medium"==i.cameraSize?(l="190px",r="190px"):"Small"==i.cameraSize&&(l="140px",r="140px"),"true"==i.enableEmbeddedCamera?"true"==i.useIframeForEmbeddedCamera?(e.getElementById("outklip-profile-photo").style.display="none",n?(n.contentWindow.postMessage({type:"ENABLE_CAMERA",requesttype:"auto",width:l,height:r,cameradeviceid:i.camera,squareaspectratio:!0},"*"),n.style.width=l,n.style.height=r,e.getElementById("outklip-webcam-player").style.display="inline-block"):I(y),e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-resize-icon").style.display="inline-block",e.getElementById("outklip-webcam-change-filter").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none",e.getElementById("outklip-live-video-viewer-for-pip").style.display="none",v()):(v(),navigator.mediaDevices.enumerateDevices().then(function(n){for(var l=null,a=0;a<n.length;a++)"videoinput"===n[a].kind&&n[a].label==i.cameralabel&&(l=n[a].deviceId);var r={video:{aspectRatio:1}};l&&(r.video.deviceId=l),navigator.mediaDevices.getUserMedia(r).then(function(n){o=n,e.getElementById("outklip-live-video-viewer-for-pip").srcObject=n,chrome.storage.sync.set({enableEmbeddedCamera:"true"}),$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!0),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!0),f(),e.getElementById("outklip-webcam-player").classList.remove(...t),e.getElementById("outklip-profile-photo").classList.remove(...t),e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-webcam-resize-icon").style.display="none",e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-change-filter").style.display="none",e.getElementById("outklip-open-picture-in-picture").style.display="inline-block",e.getElementById("outklip-webcam-player").style.display="inline-block",e.getElementById("outklip-live-video-viewer-for-pip").style.display="inline-block"}).catch(function(t){console.log(t),chrome.storage.sync.set({enableEmbeddedCamera:"false"}),e.getElementById("outklip-webcam-player").style.display="none",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!1),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!1)})})):(n&&n.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),e.getElementById("outklip-webcam-player").style.display="none",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!1),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!1),"true"==i.avatarinplaceofcamera?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width=l,e.getElementById("outklip-profile-photo").style.height=r,e.getElementById("outklip-profile-photo").style.display="inline-block",ge(e.getElementById("outklip-webcam-video-container"),"outklip-profile-photo"),e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none"):(e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.add("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="none"))}),b()}}function E(){var e=u();e&&(e.getElementById("getmiciframe")||k(),chrome.storage.sync.get("enableMicrophone",function(t){"true"==t.enableMicrophone?($("#audioswitch",e).prop("checked",!0),$("#tabmicswitch",e).prop("checked",!0),$("#cameramicswitch",e).prop("checked",!0)):($("#audioswitch",e).prop("checked",!1),$("#tabmicswitch",e).prop("checked",!1),$("#cameramicswitch",e).prop("checked",!1))}))}function k(e){var t=u();if(t){var n="chrome-extension://"+chrome.runtime.id;if(!location.ancestorOrigins.contains(n)){var o=document.createElement("iframe");o.id="getmiciframe",e&&(o.onload=e),o.src=chrome.runtime.getURL("micpermission/getmic.html"),o.allow=["microphone"],t.getElementById("outklip-mic-container").appendChild(o)}}}function I(e){var t=u();t&&chrome.storage.sync.get(["camera"],function(n){var o="chrome-extension://"+chrome.runtime.id;if(!location.ancestorOrigins.contains(o)){var i=document.createElement("iframe");i.id="getcameraiframe",i.src=chrome.runtime.getURL("camerapermission/getcamera.html")+"?cameradeviceid="+n.camera+"&squareaspectratio=true",i.style="display:block;border:none;vertical-align:middle;",i.scrolling="no",e&&(i.onload=e),i.allow=["camera"],t.getElementById("outklip-webcam-player").appendChild(i),t.getElementById("outklip-profile-photo").style.display="none",t.getElementById("outklip-webcam-player").style.display="inline-block",ge(t.getElementById("outklip-webcam-video-container"),"outklip-webcam-player")}})}function f(){var e=u();if(e){var t=e.getElementById("getcameraiframe");t&&(t.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),e.getElementById("outklip-webcam-player").removeChild(t))}}async function v(){if(o){try{await document.exitPictureInPicture()}catch(e){}o.getVideoTracks()[0].stop(),o=null}}function B(){var e=u();e&&chrome.storage.sync.get("enableMicrophone",function(t){if("true"==t.enableMicrophone)chrome.storage.sync.set({enableMicrophone:"false"}),$("#audioswitch",e).prop("checked",!1),$("#tabmicswitch",e).prop("checked",!1),$("#cameramicswitch",e).prop("checked",!1);else{var n=e.getElementById("getmiciframe");n?n.contentWindow.postMessage({type:"ENABLE_MICROPHONE",requesttype:"user"},"*"):k()}})}function b(){var e=u();e&&chrome.storage.sync.get("webcamFilterIndex",function(n){e.getElementById("outklip-webcam-player").classList.remove(...t),e.getElementById("outklip-profile-photo").classList.remove(...t);var o=parseInt(n.webcamFilterIndex);e.getElementById("outklip-webcam-player").classList.add(t[o]),e.getElementById("outklip-profile-photo").classList.add(t[o]),chrome.storage.sync.set({webcamFilterIndex:o})})}function w(){var e=u();e&&chrome.storage.sync.get("webcamFilterIndex",function(n){e.getElementById("outklip-webcam-player").classList.remove(...t),e.getElementById("outklip-profile-photo").classList.remove(...t);var o=parseInt(n.webcamFilterIndex);o=++o%t.length,e.getElementById("outklip-webcam-player").classList.add(t[o]),e.getElementById("outklip-profile-photo").classList.add(t[o]),chrome.storage.sync.set({webcamFilterIndex:o})})}async function L(){var e=u();e&&await e.getElementById("outklip-live-video-viewer-for-pip").requestPictureInPicture()}function M(){var e=u();e&&chrome.storage.sync.get("enableTabAudio",function(t){"true"==t.enableTabAudio?(chrome.storage.sync.set({enableTabAudio:"false"}),$("#tabaudioswitch",e).prop("checked",!1)):(chrome.storage.sync.set({enableTabAudio:"true"}),$("#tabaudioswitch",e).prop("checked",!0))})}function S(){var e=u();if(e){var t=e.getElementById("getcameraiframe");chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","cameraSize","avatarinplaceofcamera","camera","cameralabel"],function(n){var i="250px",l="250px";"Medium"==n.cameraSize?(i="190px",l="190px"):"Small"==n.cameraSize&&(i="140px",l="140px"),"true"==n.enableEmbeddedCamera?(chrome.storage.sync.set({enableEmbeddedCamera:"false"}),e.getElementById("outklip-webcam-player").style.display="none",e.getElementById("outklip-live-video-viewer-for-pip").style.display="none",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!1),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!1),t&&t.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),v(),"true"==n.avatarinplaceofcamera?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width=i,e.getElementById("outklip-profile-photo").style.height=l,e.getElementById("outklip-profile-photo").style.display="inline-block",ge(e.getElementById("outklip-webcam-video-container"),"outklip-profile-photo"),e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none"):(e.getElementById("outklip-webcam-controls").classList.add("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="none")):(chrome.storage.sync.set({enableEmbeddedCamera:"true"}),"true"==n.useIframeForEmbeddedCamera?(e.getElementById("outklip-profile-photo").style.display="none",n.cameraSize||chrome.storage.sync.set({cameraSize:"Large"}),$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!0),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!0),t?(t.contentWindow.postMessage({type:"ENABLE_CAMERA",requesttype:"user",width:i,height:l,cameradeviceid:n.camera,squareaspectratio:!0},"*"),t.style.width=i,t.style.height=l,e.getElementById("outklip-webcam-player").style.display="inline-block"):I(y),e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-resize-icon").style.display="inline-block",e.getElementById("outklip-webcam-change-filter").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none",e.getElementById("outklip-live-video-viewer-for-pip").style.display="none",v()):(v(),navigator.mediaDevices.enumerateDevices().then(function(t){for(var i=null,l=0;l<t.length;l++)"videoinput"===t[l].kind&&t[l].label==n.cameralabel&&(i=t[l].deviceId);var a={video:{aspectRatio:1}};i&&(a.video.deviceId=i),navigator.mediaDevices.getUserMedia(a).then(function(t){o=t,e.getElementById("outklip-live-video-viewer-for-pip").srcObject=t,f(),e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-webcam-resize-icon").style.display="none",e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-change-filter").style.display="none",e.getElementById("outklip-open-picture-in-picture").style.display="inline-block",e.getElementById("outklip-live-video-viewer-for-pip").style.display="inline-block",e.getElementById("outklip-webcam-player").style.display="inline-block"}).catch(function(e){console.log(e)})})))})}}function C(){var e=u();if(e){var t=e.getElementById("getcameraiframe");chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","avatarinplaceofcamera"],function(n){"true"==n.enableEmbeddedCamera?(chrome.storage.sync.set({enableEmbeddedCamera:"false"}),e.getElementById("outklip-webcam-player").style.display="none",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!1),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!1),e.getElementById("outklip-webcam-controls").classList.add("disable-hover"),"true"==n.useIframeForEmbeddedCamera&&t?t.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"):(e.getElementById("outklip-open-picture-in-picture").style.display="none",v())):"true"==n.avatarinplaceofcamera&&(e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.add("disable-hover"),chrome.storage.sync.set({avatarinplaceofcamera:"false"}),$("#profilephotoswitch",e)&&$("#profilephotoswitch",e).prop("checked",!1))})}}function x(){var e=u();if(e){var t=e.getElementById("getcameraiframe");chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","cameraSize","avatarinplaceofcamera"],function(n){"true"==n.enableEmbeddedCamera?n.useIframeForEmbeddedCamera&&("Large"==n.cameraSize?(t&&(t.contentWindow.postMessage({type:"CHANGE_SIZE",width:"190px",height:"190px"},"*"),t.style.width="190px",t.style.height="190px"),chrome.storage.sync.set({cameraSize:"Medium"})):"Medium"==n.cameraSize?(t&&(t.contentWindow.postMessage({type:"CHANGE_SIZE",width:"140px",height:"140px"},"*"),t.style.width="140px",t.style.height="140px"),chrome.storage.sync.set({cameraSize:"Small"})):"Small"==n.cameraSize&&(t&&(t.contentWindow.postMessage({type:"CHANGE_SIZE",width:"250px",height:"250px"},"*"),t.style.width="250px",t.style.height="250px"),chrome.storage.sync.set({cameraSize:"Large"}))):"true"==n.avatarinplaceofcamera&&("Large"==n.cameraSize?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="190px",e.getElementById("outklip-profile-photo").style.height="190px",e.getElementById("outklip-profile-photo").style.display="inline-block",chrome.storage.sync.set({cameraSize:"Medium"})):"Medium"==n.cameraSize?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="140px",e.getElementById("outklip-profile-photo").style.height="140px",e.getElementById("outklip-profile-photo").style.display="inline-block",chrome.storage.sync.set({cameraSize:"Small"})):"Small"==n.cameraSize&&(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="250px",e.getElementById("outklip-profile-photo").style.height="250px",e.getElementById("outklip-profile-photo").style.display="inline-block",chrome.storage.sync.set({cameraSize:"Large"})))})}}function A(t){var n=u();if(n){t.preventDefault(),n.getElementById("outklip-modal-id").style.display="none",n.getElementById("outklip-webcam-video-container").style.display="none",n.getElementById("outklip-control-container").style.display="none";var o=n.getElementById("getcameraiframe");o&&o.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*");try{chrome.storage.sync.set({enableSpeakers:"false"},function(){chrome.extension.lastError&&alert("An error occurred: "+chrome.extension.lastError.message),e.postMessage({setupForRecording:!0})})}catch(e){}return!1}}function T(){D(),chrome.storage.sync.set({contentScriptState:"none"})}function R(e){var t=u();if(t){var n=["outklip-config-modal","outklip-camera-modal-content","outklip-control-container","outklip-countdown-container","outklip-loader-container","outklip-webcam-video-container","outklip-mic-container","outklip-allurls-rationale-content","outklip-signup-modal"],o=0;for(o=0;o<n.length&&!t.getElementById(n[o]).contains(e.target);o++);o<n.length||(e.preventDefault(),T())}}function z(){var e=u();e&&(e.getElementById("outklip-loader-container").style.display="none",chrome.storage.sync.set({contentScriptState:"none"}))}function _(){var t=u();if(t){var n=t.getElementById("getcameraiframe");n&&n.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),v();var o=t.getElementById("getcameramodeiframe");o&&o.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),t.getElementById("outklip-webcam-video-container").style.display="none",t.getElementById("outklip-control-container").style.display="none",e.postMessage({stopRecording:!0})}}function D(){var e=u();if(e){e.getElementById("outklip-modal-id").style.display="none";var t=e.getElementById("getcameraiframe");t&&t.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),v(),e.getElementById("outklip-webcam-video-container").style.display="none",e.getElementById("outklip-control-container").style.display="none",e.getElementById("outklip-allurls-rationale-container").style.display="none"}}function N(){U(),e.postMessage({cancelRecording:!0})}function O(){U(),e.postMessage({cancelCountdown:!0})}function U(){var e=u();if(e){r&&(clearTimeout(r),r=null),chrome.storage.sync.set({contentScriptState:"none"});var t=e.getElementById("getcameraiframe");t&&t.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),v();var n=e.getElementById("getcameramodeiframe");n&&n.contentWindow.postMessage({type:"DISABLE_CAMERA"},"*"),e.getElementById("outklip-webcam-video-container").style.display="none",e.getElementById("outklip-control-container").style.display="none",e.getElementById("outklip-camera-modal-content").style.display="none",e.getElementById("outklip-countdown-container").style.display="none"}}function H(){u()&&chrome.storage.sync.get("isRecordingPausedOrNotStarted",function(t){"true"==t.isRecordingPausedOrNotStarted?(F(),e.postMessage({resumeRecording:!0})):(P(),e.postMessage({pauseRecording:!0}))})}function P(){var e=u();e&&(chrome.storage.sync.set({isRecordingPausedOrNotStarted:"true"}),e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]),e.getElementById("outklip-pause-resume-recording").title="Resume recording")}function F(){var e=u();e&&(chrome.storage.sync.set({isRecordingPausedOrNotStarted:"false"}),e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").title="Pause recording")}function W(){var e=u();e&&(!0===l?(l=!1,e.getElementById("config-options").style.display="none",e.getElementById("show-more-options-button").innerHTML="Show more options",e.getElementById("show-more-options-button-icon").classList.remove(["fa-caret-up"]),e.getElementById("show-more-options-button-icon").classList.add(["fa-caret-down"])):(l=!0,e.getElementById("show-more-options-button").innerHTML="Hide options",e.getElementById("show-more-options-button-icon").classList.remove(["fa-caret-down"]),e.getElementById("show-more-options-button-icon").classList.add(["fa-caret-up"]),e.getElementById("config-options").style.display="block"))}function V(){var e=u();e&&(e.getElementById("outklip-webcam-video-container").style.display="block",e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]),e.getElementById("outklip-pause-resume-recording").title="Start recording",chrome.storage.sync.set({isRecordingPausedOrNotStarted:"true"}),e.getElementById("outklip-close-config").onclick=T,e.getElementById("outklip-recordaudiosetting").addEventListener("click",B),e.getElementById("outklip-recordaudiosettinglabel").addEventListener("click",B),e.getElementById("audioswitch").addEventListener("click",B),e.getElementById("outklip-recordtabmicsetting").addEventListener("click",B),e.getElementById("outklip-recordtabmicsettinglabel").addEventListener("click",B),e.getElementById("outklip-recordcameramicsetting").addEventListener("click",B),e.getElementById("outklip-recordcameramicsettinglabel").addEventListener("click",B),e.getElementById("tabmicswitch").addEventListener("click",B),e.getElementById("cameramicswitch").addEventListener("click",B),e.getElementById("tabaudioswitch").addEventListener("click",M),e.getElementById("outklip-recordtabaudiosetting").addEventListener("click",M),e.getElementById("outklip-recordtabaudiosettinglabel").addEventListener("click",M),chrome.storage.sync.set({enableTabCaptureAPI:"false"}),e.getElementById("outklip-recordcamerasetting").addEventListener("click",S),e.getElementById("outklip-recordcamerasettinglabel").addEventListener("click",S),e.getElementById("cameraswitch").addEventListener("click",S),e.getElementById("outklip-recordtabcamerasetting").addEventListener("click",S),e.getElementById("outklip-recordtabcamerasettinglabel").addEventListener("click",S),e.getElementById("tabcameraswitch").addEventListener("click",S),e.getElementById("outklip-webcam-resize-icon").addEventListener("click",x),e.getElementById("outklip-webcam-change-filter").addEventListener("click",w),e.getElementById("outklip-open-picture-in-picture").addEventListener("click",L),e.getElementById("outklip-webcam-container-close-icon").addEventListener("click",C),e.getElementById("outklip-startrecording").addEventListener("click",A),e.getElementById("cancel-recording").removeEventListener("click",O),e.getElementById("cancel-recording").removeEventListener("click",N),e.getElementById("cancel-recording").addEventListener("click",T),e.getElementById("toggle-pause-resume").removeEventListener("click",le),e.getElementById("toggle-pause-resume").removeEventListener("click",H),e.getElementById("toggle-pause-resume").addEventListener("click",A),e.getElementById("outklip-sandbox").addEventListener("click",R),e.getElementById("outklip-config-logo").src=chrome.extension.getURL("images/v11/logo.png"),e.getElementById("outklip-show-allurls-permission").addEventListener("click",J),e.getElementById("outklip-cancel-allurls-rationale").addEventListener("click",Z),e.getElementById("outklip-close-allurls-rationale-modal").addEventListener("click",Z),e.getElementById("show-more-options-button").addEventListener("click",W),e.getElementById("show-more-options-button-icon").addEventListener("click",W),chrome.storage.sync.get(["controlpanel","avatarinplaceofcamera","countdownTimerValueInSeconds","useIframeForEmbeddedCamera"],function(t){"true"==t.controlpanel?$("#controlpanelswitch",e).prop("checked",!0):$("#controlpanelswitch",e).prop("checked",!1),"true"==t.avatarinplaceofcamera?$("#profilephotoswitch",e).prop("checked",!0):$("#profilephotoswitch",e).prop("checked",!1),t.countdownTimerValueInSeconds.length<2?$("#countdownwhitespaceprefix",e).html("&nbsp;"):$("#countdownwhitespaceprefix",e).html(""),$("#countdownvalue",e).html(t.countdownTimerValueInSeconds),"true"==t.useIframeForEmbeddedCamera?$("#pictureinpictureswitch",e).prop("checked",!1):$("#pictureinpictureswitch",e).prop("checked",!0)}),$("#micdeviceselect",e).on("change",Y),$("#cameradeviceselect",e).on("change",Q),e.getElementById("controlpanelswitch").addEventListener("click",G),e.getElementById("outklip-show-control-panel-label").addEventListener("click",G),e.getElementById("outklip-show-control-panel-icon").addEventListener("click",G),e.getElementById("profilephotoswitch").addEventListener("click",K),e.getElementById("outklip-show-profile-photo-label").addEventListener("click",K),e.getElementById("outklip-show-profile-photo-icon").addEventListener("click",K),e.getElementById("countdownvalueincrement").addEventListener("click",q),e.getElementById("countdownvaluedecrement").addEventListener("click",j),e.getElementById("pictureinpictureswitch").addEventListener("click",X),e.getElementById("outklip-show-picture-in-picture-icon").addEventListener("click",X),e.getElementById("outklip-show-picture-in-picture-label").addEventListener("click",X))}function q(){var e=u();if(e){var t=parseInt($("#countdownvalue",e).html());isNaN(t)?t=3:t>=99?t=99:t+=1,chrome.storage.sync.set({countdownTimerValueInSeconds:t.toString()}),t<10?$("#countdownwhitespaceprefix",e).html("&nbsp;"):$("#countdownwhitespaceprefix",e).html(""),$("#countdownvalue",e).html(t)}}function j(){var e=u();if(e){var t=parseInt($("#countdownvalue",e).html());isNaN(t)?t=3:t<=0?t=0:t-=1,chrome.storage.sync.set({countdownTimerValueInSeconds:t.toString()}),t<10?$("#countdownwhitespaceprefix",e).html("&nbsp;"):$("#countdownwhitespaceprefix",e).html(""),$("#countdownvalue",e).html(t)}}function G(){var e=u();e&&chrome.storage.sync.get(["controlpanel","isMenuMinimized"],function(t){"true"===t.controlpanel?($("#controlpanelswitch",e).prop("checked",!1),chrome.storage.sync.set({controlpanel:"false"}),e.getElementById("outklip-control-container").style.display="none"):($("#controlpanelswitch",e).prop("checked",!0),chrome.storage.sync.set({controlpanel:"true"}),e.getElementById("recording-time-indicator").style.display="none",e.getElementById("finish-recording").style.display="none","true"==t.isMenuMinimized?(e.getElementById("toggle-pause-resume").style.display="none",e.getElementById("cancel-recording").style.display="none",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-one-control",e.getElementById("outklip-toggle-menu").title="Expand control panel"):(e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-three-controls",e.getElementById("toggle-menu").style.display="block",e.getElementById("toggle-pause-resume").style.display="block",e.getElementById("cancel-recording").style.display="block",e.getElementById("outklip-toggle-menu").title="Minimize control panel"))})}function K(){var e=u();e&&chrome.storage.sync.get(["avatarinplaceofcamera","cameraSize","enableEmbeddedCamera"],function(t){if("true"==t.avatarinplaceofcamera)$("#profilephotoswitch",e).prop("checked",!1),chrome.storage.sync.set({avatarinplaceofcamera:"false"}),e.getElementById("outklip-profile-photo").style.display="none";else{if($("#profilephotoswitch",e).prop("checked",!0),chrome.storage.sync.set({avatarinplaceofcamera:"true"}),"true"==t.enableEmbeddedCamera)return;"Small"==t.cameraSize?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="140px",e.getElementById("outklip-profile-photo").style.height="140px"):"Medium"==t.cameraSize?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="190px",e.getElementById("outklip-profile-photo").style.height="190px"):"Large"==t.cameraSize&&(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width="250px",e.getElementById("outklip-profile-photo").style.height="250px"),e.getElementById("outklip-profile-photo").style.display="inline-block",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover")}})}function J(){e.postMessage({askAllUrlsPermission:!0}),Z()}function Z(){var e=u();e&&(e.getElementById("outklip-allurls-rationale-container").style.display="none")}function X(){var e=u();e&&chrome.storage.sync.get(["useIframeForEmbeddedCamera"],function(t){"true"===t.useIframeForEmbeddedCamera?($("#pictureinpictureswitch",e).prop("checked",!0),chrome.storage.sync.set({useIframeForEmbeddedCamera:"false"})):($("#pictureinpictureswitch",e).prop("checked",!1),chrome.storage.sync.set({useIframeForEmbeddedCamera:"true"})),h()})}function Y(){var e=u();e&&chrome.storage.sync.set({microphone:$("#micdeviceselect",e).val()})}function Q(){var e=u();e&&(chrome.storage.sync.set({camera:$("#cameradeviceselect",e).val()}),chrome.storage.sync.set({cameralabel:$("#cameradeviceselect option:selected",e).text()}),h())}function ee(){var e=u();e&&chrome.storage.sync.get(["isMenuMinimized","controlpanel"],function(t){"false"==t.controlpanel?e.getElementById("outklip-control-container").style.display="none":(e.getElementById("toggle-menu").removeEventListener("click",ne),e.getElementById("toggle-menu").addEventListener("click",te),e.getElementById("recording-time-indicator").style.display="none",e.getElementById("finish-recording").style.display="none","true"==t.isMenuMinimized?(e.getElementById("toggle-pause-resume").style.display="none",e.getElementById("cancel-recording").style.display="none",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-one-control",e.getElementById("outklip-toggle-menu").title="Expand control panel"):(e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-three-controls",e.getElementById("toggle-menu").style.display="block",e.getElementById("toggle-pause-resume").style.display="block",e.getElementById("cancel-recording").style.display="block",e.getElementById("outklip-toggle-menu").title="Minimize control panel"))})}function te(){var e=u();e&&chrome.storage.sync.get("isMenuMinimized",function(t){"true"==t.isMenuMinimized?(chrome.storage.sync.set({isMenuMinimized:"false"}),e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-three-controls",e.getElementById("toggle-pause-resume").style.display="block",e.getElementById("cancel-recording").style.display="block",e.getElementById("outklip-toggle-menu").title="Minimize control panel"):(chrome.storage.sync.set({isMenuMinimized:"true"}),e.getElementById("toggle-pause-resume").style.display="none",e.getElementById("cancel-recording").style.display="none",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-one-control",e.getElementById("outklip-toggle-menu").title="Expand control panel")})}function ne(){var e=u();e&&chrome.storage.sync.get("isMenuMinimized",function(t){"true"==t.isMenuMinimized?(chrome.storage.sync.set({isMenuMinimized:"false"}),e.getElementById("outklip-toggle-menu").title="Expand control panel",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-five-controls",e.getElementById("finish-recording").style.display="block",e.getElementById("cancel-recording").style.display="block",e.getElementById("toggle-pause-resume").style.display="block",e.getElementById("recording-blinker").style.display="none",e.getElementById("recording-time-indicator-string").innerHTML=de(0),e.getElementById("recording-time-indicator").style.display="block"):(chrome.storage.sync.set({isMenuMinimized:"true"}),e.getElementById("outklip-toggle-menu").title="Minimize control panel",e.getElementById("toggle-pause-resume").style.display="none",e.getElementById("cancel-recording").style.display="none",e.getElementById("finish-recording").style.display="none",e.getElementById("recording-time-indicator").style.display="none",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-one-control")})}function oe(){var e=Math.floor(300*c/1e3);return c>10?e:c<=10&&c>=8?3:c<=7&&c>=5?2:c<=4&&c>=2?1:0}function ie(){var t=u();t&&(1==--c?(t.getElementById("outklip-countdown-container").style.display="none",r=setTimeout(ie,s)):c>0?(t.getElementById("outklip-countdown-timer").innerHTML=oe().toString(),r=setTimeout(ie,s)):(t.getElementById("outklip-countdown-container").style.display="none",clearTimeout(r),r=null,e.postMessage({startRecording:!0})))}function le(){var e=u();e&&(r?(clearTimeout(r),r=null,e.getElementById("outklip-countdown-pause-resume-button").innerText="Resume countdown",e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]),e.getElementById("outklip-pause-resume-recording").title="Resume recording"):(r=setTimeout(ie,s),e.getElementById("outklip-countdown-pause-resume-button").innerText="Pause countdown",e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").title="Pause recording"))}function ae(){var e=u();e&&(chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","cameraSize","avatarinplaceofcamera","enableCamera","camera","cameralabel"],function(n){if("true"==n.enableCamera)e.getElementById("outklip-camera-modal-content").style.display="block",v(),(i=e.getElementById("getcameramodeiframe"))?i.contentWindow.postMessage({type:"ENABLE_CAMERA",requesttype:"auto",cameradeviceid:n.camera,squareaspectratio:!1},"*"):function(e){var t=u();t&&chrome.storage.sync.get(["camera"],function(n){var o="chrome-extension://"+chrome.runtime.id;if(!location.ancestorOrigins.contains(o)){var i=document.createElement("iframe");i.id="getcameramodeiframe",i.src=chrome.runtime.getURL("camerapermission/getcamera.html")+"?cameradeviceid="+n.camera+"&squareaspectratio=false",i.style="display:block;border:none;vertical-align:middle;width:100%;height:100%;",i.scrolling="no",i.onload=e,i.allow=["camera"],t.getElementById("outklip-camera-modal-content").appendChild(i)}})}(y);else if("true"==n.enableEmbeddedCamera)if(e.getElementById("outklip-webcam-video-container").style.display="block",e.getElementById("outklip-profile-photo").style.display="none","true"==n.useIframeForEmbeddedCamera){var i,l="250px",r="250px";"Medium"==n.cameraSize?(l="190px",r="190px"):"Small"==n.cameraSize&&(l="140px",r="140px"),(i=e.getElementById("getcameraiframe"))?(i.contentWindow.postMessage({type:"ENABLE_CAMERA",requesttype:"auto",width:l,height:r,cameradeviceid:n.camera,squareaspectratio:!0},"*"),i.style.width=l,i.style.height=r,e.getElementById("outklip-webcam-player").style.display="inline-block",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover")):I(y),e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-resize-icon").style.display="inline-block",e.getElementById("outklip-webcam-change-filter").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none",e.getElementById("outklip-live-video-viewer-for-pip").style.display="none",v()}else v(),navigator.mediaDevices.enumerateDevices().then(function(i){for(var l=null,a=0;a<i.length;a++)"videoinput"===i[a].kind&&i[a].label==n.cameralabel&&(l=i[a].deviceId);var r={video:{aspectRatio:1}};l&&(r.video.deviceId=l),navigator.mediaDevices.getUserMedia(r).then(function(n){o=n,e.getElementById("outklip-live-video-viewer-for-pip").srcObject=n,f(),e.getElementById("outklip-webcam-player").classList.remove(...t),e.getElementById("outklip-profile-photo").classList.remove(...t),e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-webcam-resize-icon").style.display="none",e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-change-filter").style.display="none",e.getElementById("outklip-open-picture-in-picture").style.display="inline-block",e.getElementById("outklip-webcam-player").style.display="inline-block",e.getElementById("outklip-live-video-viewer-for-pip").style.display="inline-block"}).catch(function(t){console.log(t),chrome.storage.sync.set({enableEmbeddedCamera:"false"}),e.getElementById("outklip-webcam-player").style.display="none"})});else e.getElementById("outklip-webcam-player").style.display="none","true"==n.avatarinplaceofcamera?(e.getElementById("outklip-profile-photo").src=a,e.getElementById("outklip-profile-photo").style.width=l,e.getElementById("outklip-profile-photo").style.height=r,e.getElementById("outklip-profile-photo").style.display="inline-block",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-webcam-video-container").style.display="block"):e.getElementById("outklip-profile-photo").style.display="none"}),b())}function re(){var e=u();e&&(function(){var e=u();e&&chrome.storage.sync.get("isRecordingPausedOrNotStarted",function(t){"true"==t.isRecordingPausedOrNotStarted?(e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-play"]),e.getElementById("outklip-pause-resume-recording").title="Resume recording"):(e.getElementById("outklip-pause-resume-recording").classList.remove(["fa-play"]),e.getElementById("outklip-pause-resume-recording").classList.add(["fa-pause"]),e.getElementById("outklip-pause-resume-recording").title="Pause recording")})}(),e.getElementById("outklip-finish-recording").addEventListener("click",_),function(){var e=u();e&&chrome.storage.sync.get(["isMenuMinimized","controlpanel"],function(t){"false"==t.controlpanel?e.getElementById("outklip-control-container").style.display="none":"true"==t.isMenuMinimized?(e.getElementById("outklip-toggle-menu").title="Expand control panel",e.getElementById("toggle-menu").style.display="block",e.getElementById("toggle-pause-resume").style.display="none",e.getElementById("cancel-recording").style.display="none",e.getElementById("finish-recording").style.display="none",e.getElementById("recording-blinker").style.display="none",e.getElementById("recording-time-indicator").style.display="none",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-one-control"):(e.getElementById("outklip-toggle-menu").title="Minimize control panel",e.getElementById("outklip-control-container").style.display="grid",e.getElementById("outklip-control-container").className="grid-of-five-controls",e.getElementById("toggle-menu").style.display="block",e.getElementById("finish-recording").style.display="block",e.getElementById("cancel-recording").style.display="block",e.getElementById("toggle-pause-resume").style.display="block",e.getElementById("recording-blinker").style.display="none",e.getElementById("recording-time-indicator-string").innerHTML=de(0),e.getElementById("recording-time-indicator").style.display="block")})}())}function ce(){var e=u();e&&(e.getElementById("outklip-countdown-container").style.display="block")}function se(e,t,n){var o=u();if(o)if("basic"==e||"basic5mins"==e){var i=10;switch(e){case"basic":i=10;break;case"basic5mins":i=5}if(o.getElementById("outklip-startrecording").innerText=n>0?"Record":`Record (up to ${i} mins)`,n>3)o.getElementById("outklip-upgrade-cta-container").style.display="none",o.getElementById("outklip-version-subtitle-container").style.display="none";else if(n>0){var l="long videos";1==n&&(l="long video"),o.getElementById("outklip-upgrade-cta-string").innerHTML=`<p>${n} ${l} left. <a href='https://outklip.com/checkoutpayperuse' target="_blank">Get more</a>.</p>`,o.getElementById("outklip-upgrade-cta-container").style.display="block",o.getElementById("outklip-version-subtitle-container").style.display="none"}else o.getElementById("outklip-upgrade-cta-string").innerHTML="<p>Longer video, no watermark and more? <a href='https://outklip.com/pricing' target=\"_blank\"> Upgrade</a>.</p>",o.getElementById("outklip-upgrade-cta-container").style.display="block",o.getElementById("outklip-version-subtitle-container").style.display="none"}else"limited"==e?(o.getElementById("outklip-startrecording").innerText="Record (up to 5 minutes)",o.getElementById("outklip-upgrade-cta-string").innerHTML="<p> <a href='https://outklip.com/signup' target=\"_blank\">Register</a>&nbsp;for free video hosting and video editing.</p>",o.getElementById("outklip-upgrade-cta-container").style.display="block"):"trial"==e?(o.getElementById("outklip-startrecording").innerText="Record",o.getElementById("outklip-version-subtitle-string").innerHTML="Trial Version",o.getElementById("outklip-upgrade-cta-string").innerHTML="<p>Trial ends in "+t+" days. <a href='https://outklip.com/pricing' target=\"_blank\">Upgrade to Pro.</a></p>",o.getElementById("outklip-version-subtitle-container").style.display="block",o.getElementById("outklip-upgrade-cta-container").style.display="block"):(o.getElementById("outklip-startrecording").innerText="Record",o.getElementById("outklip-version-subtitle-container").style.display="none",o.getElementById("outklip-upgrade-cta-container").style.display="none")}function de(e){var t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60),o=e-3600*t-60*n,i="";t>0?i=t+":"+(n<10?"0":"")+n+":"+(o<10?"0":"")+o:i=n+":"+(o<10?"0":"")+o;return i}function me(e){var t=e?e[0]:"a";t=t.toLowerCase();var n=0;return/^[A-Za-z]*$/.test(t)&&(n=Math.floor((t.charCodeAt(0)-97)/3)),chrome.extension.getURL("images/monograms/letter"+n+".png")}function pe(){var e=document.getElementById("outklip-mic-setup-error");e&&e.remove();var t=u();t&&(t.getElementById("outklip-desktop-error").innerHTML="",t.getElementById("outklip-tab-error").innerHTML="",t.getElementById("outklip-camera-mode-error").innerHTML="")}function ge(e,t){var n=document.getElementById("outklip-root"),o=n?n.shadowRoot:null,i=0,l=0,a=0,r=0;function c(e){(e=e||window.event).preventDefault(),a=e.clientX,r=e.clientY,document.onmouseup=d,document.onmousemove=s}function s(t){(t=t||window.event).preventDefault(),i=a-t.clientX,l=r-t.clientY,a=t.clientX,r=t.clientY,e.style.top=e.offsetTop-l+"px",e.style.left=e.offsetLeft-i+"px"}function d(e){(e=e||window.event).preventDefault(),document.onmouseup=null,document.onmousemove=null}o.getElementById(t)?o.getElementById(t).onmousedown=c:e.onmousedown=c}function ue(e){var n=u();if(n){var i,l,a;for(l=n.querySelectorAll(".tabcontent"),i=0;i<l.length;i++)l[i].style.display="none";for(a=n.querySelectorAll(".tablinks"),i=0;i<a.length;i++)a[i].className=a[i].className.replace(" active","");n.getElementById(e.target.tabId).style.display="block",e.currentTarget.className+=" active","record-desktop"==e.target.tabId?chrome.storage.sync.set({enableScreen:"true",enableCamera:"false",enableTabCaptureAPI:"false",recordingmode:"desktop"}):"record-tab"==e.target.tabId?(chrome.storage.sync.set({enableScreen:"true",enableCamera:"false",enableTabCaptureAPI:"true",recordingmode:"tab"}),chrome.storage.sync.get("enableTabAudio",function(e){"true"==e.enableTabAudio?$("#tabaudioswitch",n).prop("checked",!0):$("#tabaudioswitch",n).prop("checked",!1)})):"record-camera"==e.target.tabId&&(chrome.storage.sync.set({enableScreen:"false",enableCamera:"true",enableTabCaptureAPI:"false",recordingmode:"camera"}),function(){var e=u();if(e){var n=e.getElementById("getcameraiframe");chrome.storage.sync.get(["enableEmbeddedCamera","useIframeForEmbeddedCamera","cameraSize","camera","cameralabel"],function(i){if("false"==i.enableEmbeddedCamera)if("true"==i.useIframeForEmbeddedCamera){var l="250px",a="250px";"Medium"==i.cameraSize?(l="190px",a="190px"):"Small"==i.cameraSize&&(l="140px",a="140px"),e.getElementById("outklip-profile-photo").style.display="none",chrome.storage.sync.set({enableEmbeddedCamera:"true"}),i.cameraSize||chrome.storage.sync.set({cameraSize:"Large"}),$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!0),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!0),n?(n.contentWindow.postMessage({type:"ENABLE_CAMERA",requesttype:"user",width:l,height:a,cameradeviceid:i.camera,squareaspectratio:!0},"*"),n.style.width=l,n.style.height=a,e.getElementById("outklip-webcam-player").style.display="inline-block"):I(y),e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-resize-icon").style.display="inline-block",e.getElementById("outklip-webcam-change-filter").style.display="inline-block",e.getElementById("outklip-open-picture-in-picture").style.display="none",e.getElementById("outklip-live-video-viewer-for-pip").style.display="none",v()}else v(),navigator.mediaDevices.enumerateDevices().then(function(n){for(var l=null,a=0;a<n.length;a++)"videoinput"===n[a].kind&&n[a].label==i.cameralabel&&(l=n[a].deviceId);var r={video:{aspectRatio:1}};l&&(r.video.deviceId=l),navigator.mediaDevices.getUserMedia(r).then(function(n){o=n,e.getElementById("outklip-live-video-viewer-for-pip").srcObject=n,chrome.storage.sync.set({enableEmbeddedCamera:"true"}),$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!0),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!0),f(),e.getElementById("outklip-webcam-player").classList.remove(...t),e.getElementById("outklip-profile-photo").classList.remove(...t),e.getElementById("outklip-profile-photo").style.display="none",e.getElementById("outklip-webcam-controls").classList.remove("disable-hover"),e.getElementById("outklip-webcam-resize-icon").style.display="none",e.getElementById("outklip-change-avatar-icon").style.display="none",e.getElementById("outklip-webcam-change-filter").style.display="none",e.getElementById("outklip-open-picture-in-picture").style.display="inline-block",e.getElementById("outklip-webcam-player").style.display="inline-block",e.getElementById("outklip-live-video-viewer-for-pip").style.display="inline-block"}).catch(function(t){console.log(t),chrome.storage.sync.set({enableEmbeddedCamera:"false"}),e.getElementById("outklip-webcam-player").style.display="none",$("#cameraswitch",e)&&$("#cameraswitch",e).prop("checked",!1),$("#tabcameraswitch",e)&&$("#tabcameraswitch",e).prop("checked",!1)})})})}}())}}function ye(){var e=u();e&&(e.getElementById("desktop-button").addEventListener("click",ue),e.getElementById("desktop-button").tabId="record-desktop",e.getElementById("tab-button").addEventListener("click",ue),e.getElementById("tab-button").tabId="record-tab",e.getElementById("cameramode-button").addEventListener("click",ue),e.getElementById("cameramode-button").tabId="record-camera",chrome.storage.sync.get("recordingmode",function(t){"camera"==t.recordingmode?e.getElementById("cameramode-button").click():"tab"==t.recordingmode?e.getElementById("tab-button").click():e.getElementById("desktop-button").click()}))}function he(){for(var e=0;e<p.length&&-1==window.location.hostname.indexOf(p[e]);e++);if(e!=p.length){for(var t=document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,function(e){return"a"==e.tagName.toLowerCase()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},!0),n=[];t.nextNode();)0==t.currentNode.href.indexOf("https://outklip.com/v/")&&n.push(t.currentNode);for(var o=0;o<n.length;o++){var i=n[o].href.split("/").pop(),l=document.createElement("iframe");l.width=560,l.height=315,l.src="https://outklip.com/embed/"+i,l.setAttribute("frameborder","0"),l.setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),l.setAttribute("scrolling","no"),l.setAttribute("allowFullScreen",""),n[o].parentNode.replaceChild(l,n[o])}}}function Ee(){setTimeout(he,2e3)}}();
