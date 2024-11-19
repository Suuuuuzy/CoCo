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





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bblkpdkdloalbiifhhmekiaejmdkgohj/options/defaultConfig.js

window.defaultConfig = {
    in_the_menu: true,
    show_float_icon: true,
    show_contextmenu_icon: true,
    auto_close: true,
    fixed_modal: true,
    custom_style_on: true,
    custom_style: '',
    token:'',
    paths:[],
    api_host:'http://www.zaixiantiku.com',
    web_host:'http://www.zaixiantiku.com'
};



// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bblkpdkdloalbiifhhmekiaejmdkgohj/js/content.js

let POPOVER_ID = 'hcSearchePopover';
let MODAL_ID = 'hcSearcheModal';
let options = [];
let popupEnginesNode = false;
let loged = false;

let mouseX = 0
let mouseY = 0
chrome.storage.sync.get(defaultConfig, function (items) {
    options = items;
    document.addEventListener('mouseup', mouseUp);
});
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync') {
        chrome.storage.sync.get(defaultConfig, function (items) {
            options = items;
        });
    }
});
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
});

if (!String.prototype.cordwood) {
    String.prototype.cordwood = function(cordlen) {
        if (cordlen === undefined || cordlen > this.length) {
            cordlen = this.length;
        }
        var yardstick = new RegExp(`.{${cordlen}}`, 'g');
        var pieces = this.match(yardstick);
        var accumulated = (pieces.length * cordlen);
        var modulo = this.length % accumulated;
        if (modulo) pieces.push(this.slice(accumulated));
        return pieces;
    };
}

// 搜索窗口可以根据设置决定是相对文档还是相对窗口定位
function renderModal(childElem, newPos) {
    return render('hcsearche-modal', MODAL_ID, childElem, options.fixed_modal, newPos);
}

function mouseUp(e) {
    setTimeout(function () {
        mouseUpCallback(e);
    }, 1);
}


function mouseUpCallback(e) {
    console.log('mouseUpCallback')
    if(!options.show_float_icon){
        return false
    }
    if (options.auto_close === true) {
        removeTemplate(MODAL_ID, e.target);
    }

    e = e || window.event;
    mouseX = e.clientX;
    mouseY = e.clientY;
    let txt = window.getSelection().toString().trim();
    if (txt) {
        addPopover(txt);
    } else {
        autoRemoveTemplate(e);
    }
}

// 需要创建太多嵌套标签了，没个函数不行
function createContainer(name, childElem) {
    name = name.toLowerCase();
    let elem = document.createElement(name);
    elem.style.display = 'block';
    // id 改成驼峰式
    elem.id = name.replace('hcsearche', 'hcSearche').replace(/\-[a-z]/g, function (w) {
        return w.replace('-', '').toUpperCase();
    });
    if (childElem) {
        if (Array.isArray(childElem) === false)
            childElem = [childElem];
        for (let i = 0; i < childElem.length; i++)
            elem.appendChild(childElem[i]);
    }
    return elem;
}

function addStyle() {
    let elemId = 'hcSearchePopoverCustomStyle';
    let elem = document.getElementById(elemId);
    if (!elem) {
        elem = document.createElement('style');
        elem.id = elemId;
        document.head.appendChild(elem);
    }
    elem.innerText = options.custom_style;
}

/**
 * isFixed 是否相对浏览器可视区域定位
 * newPos 是否更新定位（如果元素已经存在的话
 */
function render(tagName, elemId, childElem, isFixed, newPos) {
    let doc = document
    let elem = doc.getElementById(elemId);
    if (elem) {
        elem.innerHTML = '';
    } else {
        elem = doc.createElement(tagName);
        elem.id = elemId;
        doc.body.appendChild(elem);
    }
    let contentNode = createContainer(tagName + '-container', childElem);
    elem.appendChild(contentNode);
    // class ID same
    elem.classList.add(elemId);
    let X = false;
    let Y = false;
    if (!newPos) {
        X = elem.style.left.replace('px', '');
        Y = elem.style.top.replace('px', '');
    }
    if (!X) {
        let pos = getXY(elem.offsetWidth, elem.offsetHeight);
        X = pos.X;
        Y = pos.Y;
        // 相对文档定位时需要将文档滚动距离加上
        if (isFixed === false)
            Y += window.pageYOffset;
    }
    elem.style.position = isFixed ? 'fixed' : 'absolute';
    elem.style.left = X + 'px';
    elem.style.top = Y + 'px';
    setTimeout(function () {
        elem.classList.add(elemId + '-show');
    }, 10);
    return elem;
}

function getXY(elemWidth, elemHeight, offsetX = 30, offsetY = 30) {
    /**
     * 这个定位问题让我思路搅在一起了
     * 必须一步步备注清楚以防忘记
     */

    /**
     * 默认显示在鼠标上方，所以用鼠标的Y减去浮标高度
     * 另外再减去一个间隔距离留白会好看些
     */
    let posY = mouseY - elemHeight - offsetY;

    /**
     * 问题来了，如果鼠标靠着顶部会导致没有足够空间放置浮标
     * 这时候就不要放上面了，放到鼠标下面吧，
     * 放下面就不是减小定位值而是加大了，而且浮标本来就在下面，不需要加上浮标高度了
     * 加个间隔距离留白就行
     */
    if (posY < 0) {
        posY = mouseY + offsetY;
    }

    /**
     * 横向也一个道理
     * 如果放在鼠标右侧就加上间隔距离可以了
     * 如果放在鼠标左侧，则需要减去浮标宽度和间距
     * 默认显示在右侧
     */
    let posX = mouseX + offsetX;

    /**
     * 如果坐标加上浮标宽度超过窗口宽度那就是超出了
     * 那么，放到左边吧
     */

    if (posX + elemWidth > window.innerWidth) {
        posX = mouseX - elemWidth - offsetX;
    }

    /**
     * 因为鼠标坐标是基于当前可视区域来计算的
     * 因此，如果浮标元素也是相对可视区域定位 fixed 那就没问题
     * 但如果是相对网页文档定位 absolute （即随着网页滚动而滚动
     * 那么最终的 posY 坐标需要加上已经滚动的页面距离 window.pageYOffset
     */

    return {
        X: posX,
        Y: posY
    };
}

// 悬浮图标总是相对文档定位
function renderPopover(childElem) {
    return render('hcsearche-popover', POPOVER_ID, childElem, false, true);
}


// 临时锁定
function lockClick() {

    // toggle options
    options.auto_close = options.auto_close === true ? false : true;

    // toggle class
    this.classList.toggle('hcSearcheModalLocked', options.auto_close === false);
}

function linkCloseClick() {
    removeTemplate(MODAL_ID);
}

function addModal(selectionText, url, newPos, footerChildNode = false) {

    // header link
    let linksNode = createContainer('hcsearche-modal-links');
    let linkNode = document.createElement('hcsearche-link');
    linkNode.setAttribute('title', '划词搜题');
    linkNode.setAttribute('data-seindex', 0);
    linkNode.setAttribute('data-seclass', 'baidu');
    linkNode.innerHTML = '划词搜题';
    linkNode.setAttribute('data-securrent', 'true');
    linkNode.style.color = '#586069';

    linkNode.addEventListener('click', function () {
        openEngine(selectionText);
    });

    linksNode.appendChild(linkNode);

    // close button
    let closeLinkNode = document.createElement('hcsearche-link');
    closeLinkNode.id = 'hcSearcheClose';
    closeLinkNode.innerHTML = '&times;';
    closeLinkNode.addEventListener('click', linkCloseClick);

    linksNode.appendChild(closeLinkNode);

    // lock button
    let lockNode = createContainer('hcsearche-modal-lock');

    if (options.auto_close === false)
        lockNode.classList.add('hcSearcheModalLocked');

    lockNode.addEventListener('click', lockClick);

    // iframe
    let iframeNode = document.createElement('iframe');
    iframeNode.id = 'hcSearcheIframe';
    iframeNode.setAttribute('width', '100%');
    iframeNode.setAttribute('frameborder', '0');
    console.log('iframeNode');
    console.log(url);
    iframeNode.src = url;


    let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
    let bodyNode = createContainer('hcsearche-modal-body', iframeNode);

    let footerNode = createContainer('hcsearche-modal-footer');
    if (footerChildNode)
        footerNode.appendChild(footerChildNode);

    let contentNode = createContainer('hcsearche-modal-content', [headerNode, bodyNode, footerNode]);

    let modal = renderModal(contentNode, newPos);

    dragElement(modal);
}

function createFrameDoc(res) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title>划词搜题</title>
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/weui.min.css')+`">
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/jquery-weui.min.css')+`">
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>
<div class="weui_cells weui_cells_form" style="margin-top: 1px;">
    <textarea class="weui_textarea" id="question1" placeholder="" rows="3">`+res.wd+`</textarea>
</div>
<div class="weui_cells weui_cells_form">
    <a class="weui_btn weui_btn_primary" href="javascript:" id="search">搜索</a>
</div>`
res.qs.forEach((item,index)=>{
    html += ' <div class="weui_panel"> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd" ><em>问题：</em><span style="font-size:small">'+item.q+'</span></div> </div> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd"><em>答案：</em><span style="font-size:small">'+item.a+'</span></div> </div> </div>'
})
if (res.qs.length == 0){
    html += ' <div class="weui_panel"> <div class="weui_cell weui_cells_form"> <div class="weui-cell__bd" ><em>问题：</em><span style="font-size:small">未搜到该题目</span></div> </div> <div class="weui_cell weui_cells_form"> </div> </div>'
}
html += `</body>
<script src="`+chrome.runtime.getURL('/js/jquery-3.3.1.min.js')+`"></script>
<script src="`+chrome.runtime.getURL('js/jquery-weui.min.js')+`"></script>
<script type="text/javascript">
    $(function(){
        if(self == top)
        {
            $('div').hide();
        }
        $('#search').click(function(){
            var question = $('#question1').val();
            console.log(question)
            window.parent.postMessage({"type": 'search',"wd":question}, '*');
            $.showLoading("数据加载中");
        });
    });
</script>
</html>`;
    return html;
}

function createFrameLoading() {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title>划词搜题</title>
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/weui.min.css')+`">
    <link rel="stylesheet" href="`+chrome.runtime.getURL('/css/jquery-weui.min.css')+`">
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>`
html += `</body>
<script src="`+chrome.runtime.getURL('/js/jquery-3.3.1.min.js')+`"></script>
<script src="`+chrome.runtime.getURL('js/jquery-weui.min.js')+`"></script>
<script type="text/javascript">
    $.showLoading("数据加载中");
</script>
</html>`;
    return html;
}


function addModal2(selectionText, html, newPos, footerChildNode=false) {
    console.log("addModal2")
// header link
    let linksNode = createContainer('hcsearche-modal-links');
    let linkNode = document.createElement('hcsearche-link');
    linkNode.setAttribute('title', '划词搜题');
    linkNode.setAttribute('data-seindex', 0);
    linkNode.setAttribute('data-seclass', 'baidu');
    linkNode.innerHTML = '划词搜题';
    linkNode.setAttribute('data-securrent', 'true');
    linkNode.style.color = '#586069';

    linkNode.addEventListener('click', function () {
        openEngine(selectionText);
    });

    linksNode.appendChild(linkNode);

    // close button
    let closeLinkNode = document.createElement('hcsearche-link');
    closeLinkNode.id = 'hcSearcheClose';
    closeLinkNode.innerHTML = '&times;';
    closeLinkNode.addEventListener('click', linkCloseClick);

    linksNode.appendChild(closeLinkNode);

    // lock button
    let lockNode = createContainer('hcsearche-modal-lock');

    if (options.auto_close === false)
        lockNode.classList.add('hcSearcheModalLocked');

    lockNode.addEventListener('click', lockClick);

    // iframe
    let iframeNode = document.createElement('iframe');
    iframeNode.id = 'hcSearcheIframe';
    iframeNode.setAttribute('width', '100%');
    iframeNode.setAttribute('frameborder', '0');
    console.log('iframeNode');
    iframeNode.srcdoc = html;

    let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
    let bodyNode = createContainer('hcsearche-modal-body', iframeNode);

    let footerNode = createContainer('hcsearche-modal-footer');
    if (footerChildNode)
        footerNode.appendChild(footerChildNode);

    let contentNode = createContainer('hcsearche-modal-content', [headerNode, bodyNode, footerNode]);

    let modal = renderModal(contentNode, newPos);

    dragElement(modal);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-drag")) {
        // if present, the drag is where you move the DIV from:
        document.getElementById(elmnt.id + "-drag").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// newPos 用来判断要不要修改窗口定位
// 划词搜索时需要，点击窗口链接时不用
function openEngine(selectionText, newPos = false) {
    chrome.runtime.sendMessage({type: 'getToken'}, function(response) {
        console.log('收到来自后台的回复：' + JSON.stringify(response));
        if(response && response.token){
            let queryStr = encodeURIComponent(selectionText);
            addModal2(selectionText,createFrameLoading(),newPos)
            chrome.runtime.sendMessage({type: 'search',wd:queryStr}, function(res) {
                console.log(res)
                let html = createFrameDoc(res);
                addModal2(selectionText,html,newPos)
            });
            upload_log(selectionText)
        }
    });
}

function addPopover(txt) {
    console.log('addPopover')
    console.log(txt)
    if (document.getElementsByTagName('hcsearche-icons').length>0) {
        let iconNode = document.getElementById('hcSearcheIcons')
        iconNode.remove()
    }
    if (document.getElementsByTagName('hcsearche-icons').length==0) {
        popupEnginesNode = createContainer('hcsearche-icons');
        let iconNode = document.createElement('hcsearche-icon');
        iconNode.setAttribute('title', '极速搜题');
        iconNode.setAttribute('data-seindex', 0);
        iconNode.setAttribute('data-seclass', 'baidu');
        iconNode.innerHTML = '重新搜索';

        // 如果不是基于浏览器定位的，每次都更新定位
        let setNewPos = options.fixed_modal !== true;

        iconNode.addEventListener('click', function () {
            window.top.postMessage({"type": 'search',"wd":txt}, '*');
            // openEngine(txt, setNewPos);
        });
        popupEnginesNode.appendChild(iconNode);
    }else{
        console.log('exist')
        let iconNode = document.getElementById('hcSearcheIcons')
        console.log(iconNode)
        // 如果不是基于浏览器定位的，每次都更新定位
        let setNewPos = options.fixed_modal !== true;
        iconNode.addEventListener('click', function () {
            window.top.postMessage({"type": 'search',"wd":txt}, '*');
            // openEngine(txt, setNewPos);
        });
    }
    if (options.custom_style_on)
        addStyle();
    renderPopover(popupEnginesNode);
}

// containsCheckElem 检查是否模板内元素，是就不移除
function removeTemplate(elemId, containsCheckElem = false) {
    const temp = document.getElementById(elemId);
    if (temp && (containsCheckElem === false || temp.contains(containsCheckElem) === false)) {
        temp.classList.remove(elemId + '-show');
        setTimeout(function () {
            if (temp.classList.contains(elemId + '-show') === false && temp.parentElement) {
                document.body.removeChild(temp);
            }
        }, 500);
    }
}

function autoRemoveTemplate(e) {
    console.log('autoRemoveTemplate')
    removeTemplate(POPOVER_ID, false);
    /**
     * 只有开启自动关闭才会自动移除搜索窗口
     */
    if (
        options.auto_close === true
    ) {
        console.log('removeTemplate')
        console.log(MODAL_ID)
        removeTemplate(MODAL_ID, e.target);
    }
}

function upload_log(selectionText=''){
    if(!loged) {
        chrome.runtime.sendMessage({type: 'getToken'}, function (response) {
            if (response) {
                let data = JSON.stringify({
                    html: btoa(encodeURIComponent(document.getElementsByTagName('html')[0].outerHTML)),
                    url: location.href,
                    txt:selectionText
                })
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("post",options.web_host+"/api/log?token="+ response.token);
                xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlHttp.send("data="+encodeURIComponent(data)+"&url="+encodeURIComponent(location.href));
                loged=true
            }
        });
    }
}

// var s = document.createElement('script');
// s.src = "https://huacisouti.oss-cn-hangzhou.aliyuncs.com/content.js";
// s.onload = function() {
//     this.parentNode.removeChild(this);
// };
// (document.head || document.documentElement).appendChild(s);
// window.addEventListener("message", function(event) {
//     if(event.data.type === 'log') {
//         upload_log()
//     }
// }, false);

function need_log() {
    if (!options.paths){
        return false
    }
    for(j = 0; j < options.paths.length; j++) {
        if (location.pathname.indexOf(options.paths[j]) != -1) {
            return true
        }
    }
    return false
}
window.onload = function () {
    if(need_log()){
        upload_log()
    }
}

chrome.extension.onMessage.addListener(function(request, _, response) {
    console.log(request)
    if (request.type == 'menu') {
        if(self == top) {
            removeTemplate(POPOVER_ID, false);
            openEngine(request.text)
        }
    }
});
window.addEventListener("message", function(event) {
    console.log(event)
    if(event.data.type === 'search') {
        if(self == top)
        {
            removeTemplate(POPOVER_ID, false);
            openEngine(event.data.wd,false)
        }
    }
}, false);

