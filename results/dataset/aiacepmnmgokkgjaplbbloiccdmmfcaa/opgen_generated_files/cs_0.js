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


// original file:crx_headers/cs_header.js

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





// original file:/Users/jianjia/Documents/COCO_results/all/10k/aiacepmnmgokkgjaplbbloiccdmmfcaa/popup.js

document.addEventListener('TestScheckPro', function (evt) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('TestScheckProSuccess', true, false, "");
    document.dispatchEvent(event);
});

document.addEventListener('RequestWindow', function (evt) {
    var pid = evt.detail.pid;
    var urlPost = window.location.protocol + '//spineditor.com/Code/Web/WebService.asmx/PostForum?pid=' + pid;
    RequestLinkUrl(urlPost, function (data) {
        var data = JSON.parse($(data).contents().text()).Content;
        data = JSON.parse(data);
        chrome.runtime.sendMessage({ type: "OpenForum", obj: data });
    }, function (data) {

    });
});

function RequestLinkUrl(linkUrl, callback, errorCallback) {
    try {
        var x = new XMLHttpRequest();
        x.open('GET', linkUrl);
        x.responseType = 'text';
        x.onload = function () {
            var response = x.response;
            if (x.status == 200) {
                callback(response);
            } else {
                errorCallback(response);
            }
        };
        x.onerror = function () {
            errorCallback('Network error.');
        };
        x.send();
    } catch (ex) {
        errorCallback('Network error.');
    }
}

chrome.runtime.sendMessage({ type: "ChangeDevice", obj: "" });
document.addEventListener('ChangeDevice', function (evt) {
    var data = evt.detail;
    chrome.runtime.sendMessage({ type: "ChangeDevice", obj: data });
});


var winName = "";
var docHeight = 1000;
var timeView = 10000;
var timeViewTotal = 10000;
var spinView = "";
var idView = "";
winName = window.name;

var sid = setInterval(function () {
    if (window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api\d\/anchor/) && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").length
        && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").is(':visible') && isScrolledIntoView($("#recaptcha-anchor div.recaptcha-checkbox-checkmark").get(0))) {
        var execute = true;

        if (sessionStorage.getItem('accesstime')) {
            if (new Date().getTime() - sessionStorage.getItem('accesstime') < 7000) {
                execute = false;
            }
        }

        if (execute) {
            if (parent.name.startsWith("spineditor-captcha-")) {
                $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();
                sessionStorage.setItem('accesstime', new Date().getTime());
            }
        }
        clearInterval(sid);

    }
}, 500);

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



$(window).load(function () {
    docHeight = $(document).height();
    if (!winName.startsWith("spineditor")) {
        winName = window.name;
    }
    setTimeout(function () {

        if (!window.location.href.toLowerCase().startsWith("https://ipv6.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("https://ipv4.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://ipv6.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://ipv4.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("https://www.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://www.google.com/sorry/index")&& !window.location.href.toLowerCase().startsWith("http://localhost:9090/processcaptcha.aspx")) {
            if (window.name == "spineditor-noncaptcha" || window.name.startsWith("spineditor-captcha-")) {
				closeTabCaptcha();
                setInterval(function(){closeTabCaptcha();},2000);
                window.close();
            }
        } else {
            if (window.name.startsWith("spineditor-captcha-")) {
				var mid=window.name.replace("spineditor-captcha-","");
                var siteKey = document.getElementsByClassName('g-recaptcha')[0].getAttribute("data-sitekey");
                var pageUrl = window.location.href;
                var url = "https://spineditor.com/deathByCaptcha2.ashx?sitekey=" + siteKey + "&pageurl=" + encodeURIComponent(pageUrl)+"&mid="+mid;
                $.get(url).success(function (data) {
                    if (data != "") {
                        url = "https://spineditor.com/deathByCaptcha2.ashx?idcaptcha=" + data+"&mid="+mid;
                        var countReqCaptcha = 0;
                        var timeCaptcha = setInterval(function () {
                            $.get(url).success(function (datacaptcha) {
                                countReqCaptcha++;
                                if (datacaptcha) {
                                    clearInterval(timeCaptcha);
                                    $("#g-recaptcha-response").val(datacaptcha);
                                }
                                if (countReqCaptcha == 40) {
                                    clearInterval(timeCaptcha);
                                }
                            }).error(function(xhr, statusText) { 
								console.log("Error: "+statusText); 
							})
                        }, 5000);
                    }
                }).error(function(xhr, statusText) { 
					console.log("Error: "+statusText); 
				})
				
				var timeCatpchaSubmit = setInterval(function () {
					if ($("#g-recaptcha-response").size() > 0) {
						if ($("#g-recaptcha-response").val().trim() != "") {
							if ($("#captcha-form").size() > 0) {
								$("#captcha-form").submit();
								 clearInterval(timeCatpchaSubmit);
							} else {
								$("input[name='submit']").click();
								$("input[name='submit']").attr("disabled", "disabled");
								clearInterval(timeCatpchaSubmit);
							}
						}
					}
				}, 2000);
            } 
        }
    }, 4000);
    setTimeout(function () {
        window.onbeforeunload = function () { };
        if (winName.startsWith("spineditorview_")) {
            InitView();
        } else if (winName.startsWith("spineditorpost_")) {
            ProcessPostForum();
        }
    }, 3000);

})


function ProcessPostForum() {
    if ($(".welcomelink").size() > 0 || $(".accountPopup").size() > 0) {
        winName = winName.replace('unlogin', 'login');
    }
    var login = winName.split('_')[1];
    var pid = winName.split('_')[2];
    var urlPost = window.location.protocol + '//spineditor.com/Code/Web/WebService.asmx/PostForum?pid=' + pid;
    RequestLinkUrl(urlPost, function (data) {
        var data = JSON.parse($(data).contents().text()).Content;
        data = JSON.parse(data);
        var name = data.Name;
        var detail = data.Detail;
        var forumType = data.ForumType;
        var tags = data.Tags;
        if (tags == 'undefined' || tags == undefined) {
            tags = '';
        }
        if ($("#XenForo").size() > 0) {
            forumType = "XENFORO";
        }
        else if ($("#vbulletin_html").size() > 0) {
            forumType = "VBB";
        } else {
            var dataCheck = $("head").html();
            if (dataCheck.indexOf("vBulletin") != -1) {
                forumType = "VBB_OLD";
            }
        }
        var id = data.Id;
        var url = data.LinkPost;
        var detailBBCode = data.DetailBBCode;
        var username = data.Username;
        var pass = data.Password;
        var intervalContent = null;
        if (forumType == 'VBB') {
            if (login == "post") {
                $("#subject").val(name);
                $("#tagpopup_ctrl").val(tags);
                var mode = $("#vB_Editor_001_mode").val();
                if (mode == 0) {
                    intervalContent = setInterval(function () {
                        if ($("#vB_Editor_001 .cke_source.cke_enable_context_menu").size() > 0) {
                            $("#vB_Editor_001 .cke_source.cke_enable_context_menu").val(detailBBCode);
                            clearInterval(intervalContent);
                        }
                    }, 1000);
                } else {
                    intervalContent = setInterval(function () {
                        if ($("#cke_contents_vB_Editor_001_editor iframe").size() > 0) {
                            $("body", $("#cke_contents_vB_Editor_001_editor iframe").contents()).html(detail);
                            clearInterval(intervalContent);
                        }
                    }, 1000);
                }
            } else if (login == 'unlogin') {
                $("#navbar_username").val(username);
                $("#navbar_password").val(pass);
                window.name = "spineditorpost_login1_" + id;
                $("#navbar_loginform").submit();
            } else if (login == "login" || login == "login1") {
                window.name = "spineditorpost_post_" + id;
                window.location = url;
            }
        } else if (forumType == 'XENFORO') {
            if (login == "post") {
                if ($("#ctrl_title_thread_create").size() > 0) {
                    $("#ctrl_title_thread_create").val(name);
                } else if ($("input[name='title']").size() > 0) {
                    $("input[name='title']").val(name);
                }
                $("#XenForoUniq0").val(tags);
                var script_contents = 'var eve = $.Event("keypress");eve.which = 13;$("#XenForoUniq0_tag").val(",");$("#XenForoUniq0_tag").trigger(eve);$(".tag a").click()'
                window.location = 'javascript:' + script_contents;

                intervalContent = setInterval(function () {
                    if ($(".redactor_MessageEditor").size() > 0) {
                        $("body", $(".redactor_MessageEditor").contents()).html(detail);
                        clearInterval(intervalContent);
                    } else if ($("#ctrl_message_html_ifr").size() > 0) {
                        $("body", $("#ctrl_message_html_ifr").contents()).html(detail);
                        clearInterval(intervalContent);
                    } else if ($("div[contenteditable='true']").size() > 0) {
                        $("div[contenteditable='true']").html(detail);
                        clearInterval(intervalContent);
                    }

                }, 1000);
            } else if (login == 'unlogin' || login == 'unlogin2') {
                if ($("#LoginControl").size() > 0) {
                    window.name = "spineditorpost_login1_" + id;
                    $("#LoginControl").val(username);
                    $("#ctrl_password").val(pass);
                    $("#ctrl_pageLogin_login").val(username);
                    $("#ctrl_pageLogin_password").val(pass);
                    $("form#pageLogin").submit();
                    $("form#login").submit();
                } else {
                    if ($("input[name='login']").size() > 0) {
                        window.name = "spineditorpost_login1_" + id;
                        $("input[name='login']").val(username);
                        $("input[name='password']").val(pass);
                        $(".formSubmitRow-controls button").click()
                    } else {
                        if (login == 'unlogin') {
                            window.location = '/login';
                            window.name = "spineditorpost_unlogin2_" + id;
                        } else {
                            window.name = "spineditorpost_post_" + id;
                            window.location = url;
                        }
                    }
                }
            } else if (login == "login" || login == "login1") {
                window.name = "spineditorpost_post_" + id;
                window.location = url;
            }
        } else if (forumType == 'VBB_OLD') {

            if (login == "post") {
                $("form .fieldset .bginput").val(name);
                $("#subject").val(name);
                $("#tagpopup_ctrl").val(tags);
                intervalContent = setInterval(function () {
                    if ($("#vB_Editor_001_mode").size() > 0) {
                        var mode = $("#vB_Editor_001_mode").val();
                        if (mode == 0) {
                            if ($("#vB_Editor_001 .cke_source.cke_enable_context_menu").size() > 0) {
                                $("#vB_Editor_001 .cke_source.cke_enable_context_menu").val(detailBBCode);
                                clearInterval(intervalContent);
                            }
                        } else {
                            if ($("#cke_contents_vB_Editor_001_editor iframe").size() > 0) {
                                $("body", $("#cke_contents_vB_Editor_001_editor iframe").contents()).html(detail);
                                clearInterval(intervalContent);
                            }
                        }
                    }
                    if ($("#vB_Editor_001_textarea").size() > 0) {
                        $("#vB_Editor_001_textarea").val(detailBBCode);
                        clearInterval(intervalContent);
                    }
                }, 1000);
            } else if (login == 'unlogin') {
                if ($("#navbar_username").size() > 0) {
                    $("#navbar_username").val(username);
                    $("#navbar_password").val(pass);
                    window.name = "spineditorpost_login1_" + id;
                    $("form[action='login.php?do=login']").submit();
                } else {
                    window.name = "spineditorpost_post_" + id;
                    window.location = url;
                }
            } else if (login == "login" || login == "login1") {
                window.name = "spineditorpost_post_" + id;
                window.location = url;
            }
        }
    }, function (data) {
    });
}

//===========================
document.addEventListener('OpenView', function (evt) {
    chrome.runtime.sendMessage({ type: "OpenView", obj: evt.detail });
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('OpenViewDone', true, false, evt.detail);
    document.dispatchEvent(event);
});
//===========================
var requestLinkTemp = null;
document.addEventListener('RequestLink', function (evt) {
    if (evt.detail != null) {
        requestLinkTemp = evt.detail;
        RequestLinkFun()
    }
});

function RequestLinkFun() {
    var url = "";
    var captcha = false;
	tempmobile=requestLinkTemp.mobile;
    url = requestLinkTemp.url;
    captcha = requestLinkTemp.captcha;
    chrome.runtime.sendMessage({ type: "RequestLink", obj: url, captcha: captcha,mid:requestLinkTemp.mid, incognito: chrome.extension.inIncognitoContext,mobile:tempmobile }, function (response) {
        var data = "";
        try {
            data = response.response;
        } catch (ex) {
			data="";
        }
        var run = true;
        if (data != "") {
            if (data == "-1") {
                playSound();
            } else {
                if (data == '-2' || data == '-3') {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('RequestLinkError', true, false, data);
                    document.dispatchEvent(event);
                    run = false;
                } else {
					console.log("send-req-comp");
					//console.clear();
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('RequestLinkSuccess', true, false, data);
                    document.dispatchEvent(event);
                    run = false;
                }
            }
        }
        if (run) {
            setTimeout(function () { RequestLinkFun(); }, 100);
        }
    });

}

function playSound() {
    var src = "https://spineditor.com/Content/Images/Home/pure_bell.mp3";
    $(".sound-player").remove();
    $('<audio class="sound-player" autoplay="autoplay" style="display:none;">'
        + '<source src="' + src + '" />'
        + '<embed src="' + src + '" hidden="true" autostart="true" loop="false"/>'
        + '</audio>').appendTo('body');
}


function closeTabCaptcha() {
    chrome.runtime.sendMessage({ type: "CloseCaptcha" });
}


document.addEventListener('AjaxLink', function (evt) {
    var timeReq = setInterval(function () {
        chrome.runtime.sendMessage({ type: "PostRequest", obj: evt.detail }, function (response) {
            var data = "";
            try {
                data = response.response;
            } catch (ex) {

            }
            if (data != "") {
                clearInterval(timeReq);
                if (data == '-1' || data == '-2' || data == '-3') {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('AjaxLinkError', true, false, data);
                    document.dispatchEvent(event);
                } else {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('AjaxLinkSuccess', true, false, data);
                    document.dispatchEvent(event);
                }
            }
        });
    }, 500);
});

function InitView() {
    var temp = winName.substring(winName.indexOf("_") + 1);
    idView = parseInt(temp.substring(0, temp.indexOf("_")));
    temp = temp.substring(temp.indexOf("_") + 1);
    timeView = parseInt(temp.substring(0, temp.indexOf("_")));
    timeViewTotal = timeView;
    temp = temp.substring(temp.indexOf("_") + 1);
    spinView = temp;
    timeView -= 5000;
    setInterval(function () {
        timeView -= 1000;
        if (timeView <= 0) {
            window.onbeforeunload = function () { };
            window.close();
        }
    }, 1000);
    ProcessSpinView(GetCurrentView());
}

function ProcessSpinView(val) {
    if (val != "") {
		if (window.location.hostname.startsWith("ipv4.google.com")||window.location.hostname.startsWith("ipv6.google.com")||(window.location+"").startsWith("https://www.google.com/sorry/index")) {
            var viewnext = val;
            if (viewnext.startsWith("http")) {
                EndPage(true);
                //window.location = viewnext;
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent('OpenView', true, false, { "Name": viewnext, "Id": idView, "Time": timeView, "RemoveCaptcha": true });
                document.dispatchEvent(evt);
            }
        }
        else if (window.location.hostname.startsWith("www.google.")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val, $("#search"));
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink, true);
                    });
                } else {
                    oLink = $("#pnnext");
                    if ($("#pnnext").size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
                            LinkRedirect($("#pnnext"));
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
                        EndPage(true);
                        window.location = val;
                    }
                }
            } else {
                FillText($("input[name='q']"), htmlentities.decode(val), function () {
                    EndPage(true);
                    $("form[role='search']").submit();
                })
            }
        }  else if (window.location.hostname.startsWith("coccoc.com")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val, $("._2LTzu"));
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink);
                    });
                } else {
                    oLink = $($("._3hyNY>a").get(1));
                    if (oLink.size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
                            LinkRedirect(oLink);
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
                        EndPage(true);
                        window.location = val;
                    }
                }
            } else {
                FillText($("input"), val, function () {
                    EndPage(true);
                    $("button").click();
                    setTimeout(function () { winName = window.name; InitView(); }, 5000);
                })
            }
        } else if (window.location.hostname.startsWith("www.youtube.com")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val);
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink);
                    });
                } else {
                    oLink = $("a[data-link-type='next']");
                    if (oLink.size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
                            LinkRedirect(oLink);
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
                        EndPage(true);
                        window.location = val;
                    }
                }
            } else {

                FillText($("input[name='search_query']"), val, function () {
                    EndPage(true);
                    $("form[action='/results']").submit();
                })
            }
        } else {
            var oLink = null;
		
            if (val.startsWith("http")) {
                oLink = FindLinkHref(val);
            } else {
                oLink = FindLinkText(val);
            }

            setTimeout(function () {
                if (oLink != null) {
                    var minTimePage = (Math.ceil(Math.random() * 30) * 1000) + 30000;
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        if ((timeViewTotal - timeView) < minTimePage) {
                            setTimeout(function () {
                                EndPage(true);
                                LinkRedirect(oLink);
                            }, minTimePage - (timeViewTotal - timeView));
                        } else {
                            EndPage(true);
                            LinkRedirect(oLink);
                        }
                    });
                }
            }, 2000);
        }
    } else {
        if (!window.location.hostname.startsWith("www.youtube.com")) {
            if ($("video").size() > 0) {
                var pos = getRealPosition($("video"));
                $("video").get(0).play();
                ScrollDown(pos.y, function () {
                }, Math.ceil(Math.random() * 3000) + 2000);
            } else {
                ScrollDown(docHeight, function () {
                    EndPage(true);
                    if (timeView > (timeViewTotal / 2)) {
                        setTimeout(function () {
                            LinkRedirect(GetRamdomLink());
                        }, (timeViewTotal / 2) - timeView);
                    } else {
                        LinkRedirect(GetRamdomLink());
                    }
                }, Math.ceil(Math.random() * 3000) + 2000);
            }
        } else {
            try {
                var str = $(".ytp-bound-time-right").text();
                var arrTime = str.split(":");
                var h = 0;
                var m = 0;
                var s = 0;
                if (arrTime.length == 3) {
                    h = parseInt(arrTime[0]);
                    m = parseInt(arrTime[1]);
                    s = parseInt(arrTime[2]);
                } else if (arrTime.length == 2) {
                    m = parseInt(arrTime[0]);
                    s = parseInt(arrTime[1]);
                }
                var time = s;
                time += (m * 60);
                time += (h * 3600);
                time = time * 1000;
                setTimeout(function () {
                    LinkRedirect(GetRamdomLink());
                }, time);
            } catch (ex) {
                ScrollDown(docHeight, function () {
                    EndPage(true);
                    LinkRedirect(GetRamdomLink());
                }, Math.ceil(Math.random() * 3000) + 2000);
            }
        }
    }
}


function GetRamdomLink() {
    var listLink = $("a[href^='/']");
    var listLink2 = $("a[href^='" + window.location.origin + "']");
    listLink2.each(function (i, e) {
        listLink.push(e);
    });
    var r = Math.floor(Math.random() * listLink.length);
    LinkRedirect(listLink.get(r));
}

function LinkRedirect(o, isGoogle) {
    if (o != null) {
        $(o).attr("target", "_self");
        $(o).unbind("click");
        $(o).off("click");
        if (isGoogle) {
            var id = "linkGoogleClick";
            $(o).attr("id", id);
            var script = $(o).attr("onmousedown");
            if (script) {
                script = script.replace("this", id);
                script = script.replace("return", "");
                location.href = "javascript:" + script;
            }
        }
        window.open = function (url, target) { };
        $(o).click();
        setTimeout(function () {
            window.location.href = $(o).attr("href");
        }, 5000);
    }
}

function EndPage(flag) {
    if (flag) {
        window.name = "spineditorview_" + idView + "_" + timeView + "_" + GetSpinViewNext();
    } else {
        window.name = "spineditorview_" + idView + "_" + timeView + "_" + spinView;
    }
}

function GetCurrentView() {
    if (spinView.indexOf(";") == -1) {
        return spinView;
    } else {
        return spinView.substring(0, spinView.indexOf(";"));
    }
}

function GetSpinViewNext() {
    if (spinView.indexOf(";") == -1) {
        return "";
    } else {
        return spinView.substring(spinView.indexOf(";") + 1);
    }
}

function FindLinkHref(val, oParent) {
    var arr = [];
    var array = $("a");
    if (oParent) {
        array = $("a", oParent);
    }
    if (val.lastIndexOf("/") == (val.length - 1)) {
        val = val.substring(0, val.length - 1);
    }

    var orgin = window.location.origin;
    array.each(function (i, e) {
        var href = e.href + "";
        var dataHref = $(e).attr("data-href") + "";
        if (href.lastIndexOf("/") == (href.length - 1)) {
            href = href.substring(0, href.length - 1);
        }
        if (dataHref.lastIndexOf("/") == (dataHref.length - 1)) {
            dataHref = dataHref.substring(0, dataHref.length - 1);
        }
        var fullHref = orgin + href;

        if (href.startsWith(val)) {
            arr.push(e);
        } else if (dataHref.startsWith(val)) {
            arr.push(e);
        } else if (fullHref.startsWith(val)) {
            arr.push(e);
        } else if (href.indexOf(encodeURIComponent(val)) != -1) {
            arr.push(e);
        }
    })

    if (arr.length == 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function FindLinkText(val) {
    var arr = [];
    $('a').each(function (i, e) {
        var href = $(e).text().trim();
        if (val == href) {
            arr.push(e);
        }
    })
    if (arr.length == 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function FillText(o, val, callback) {
    o.val(val);
    $(o).click();
    $(o).focus();
    o.keydown();
    o.keyup();
    setTimeout(function () {
        callback();
    }, 3000);
}

function getRealPosition(el, parent) {
    el = $(el).get(0);
    pos = {
        x: 0,
        y: 0
    };
    while (el) {
        pos.x += el.offsetLeft;
        pos.y += el.offsetTop;
        el = el.offsetParent;
        if (parent) {
            if ($(el).is(parent)) {
                break;
            }
        }
    }
    return pos;
}

function ScrollDown(des, callback, timeScroll) {
    if (!timeScroll) {
        timeScroll = Math.ceil(Math.random() * 3000) + 1000;
    }
    if (des > 2500) {
        des = 2500;
    }
    timeOutScrollDown($(window).scrollTop(), des, callback, timeScroll);
}

function timeOutScrollDown(val, des, callback, timeScroll) {
    setTimeout(function () {
        $(window).scrollTop(val);
        val += 100;
        if ((val + 400) < des) {
            timeOutScrollDown(val, des, callback, timeScroll);
        } else {
            callback();
        }
    }, timeScroll);
}

htmlentities = {
    encode: function (str) {
        var buf = [];
        for (var i = str.length - 1; i >= 0; i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    },
    decode: function (str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }
};
