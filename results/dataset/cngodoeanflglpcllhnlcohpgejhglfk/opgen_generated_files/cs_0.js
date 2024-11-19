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





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/cngodoeanflglpcllhnlcohpgejhglfk/signon.js

var mainUrlSign='https://sso.infinitiretail.com/MiddlewareRestServices';
if(document.location.href.indexOf(mainUrlSign)!=-1&&document.location.href.indexOf(mainUrlSign+"/login")==-1&&document.location.href.indexOf(mainUrlSign+"/logout")==-1&&document.location.href.indexOf(mainUrlSign+"/logout2")==-1)
	{
	setTimeout(function(){
	chrome.runtime.sendMessage({statMsg: "checkSxpTokenValueStatus"}, function(response) {});
	},500);

	}
if(document.location.href.indexOf(mainUrlSign)!=-1&&document.location.href.indexOf(mainUrlSign+"/iwalogout")!=-1)
	{
	chrome.runtime.sendMessage({statMsg: "logoutRequestIwa"}, function(response) {});

	}
document.addEventListener('sendIwaDataToNode', function(evt) {

chrome.runtime.sendMessage({statMsg:"getMultifactorTokenForIwa"}, function(response) {});


	});
document.addEventListener('ilantusPopoutEvent1', function(evt) {

valToOpen1 =evt.target.getElementById("ilantusAjaxCallTestSSOExtn");
chrome.storage.local.set({'js': valToOpen1.value}, function() {});

});

document.addEventListener('ilantusPopoutEvent', function(evt) {
var valToOpen =evt.target.getElementById("ilantusPopOutURL");

if(valToOpen&&valToOpen.value!=""){
		 var win = window.open(valToOpen.value,"_blank");
		win.opener=null;
		valToOpen.value="";
}

});
document.addEventListener('sendMultiFactorStatus', function(evt) {


	valToOpen1 =evt.target.getElementById("sxpMultiFactorToken");

	chrome.runtime.sendMessage({statMsg1234:"sxpMultiFactorToken",multifactorStatus:valToOpen1.value}, function(response) {});


	});
document.addEventListener('gettngSxpDataToGenerateToken', function(evt) {

valToOpen1 =evt.target.getElementById("sxpDataToNode");
chrome.runtime.sendMessage({statMsg: "sxpTokenToNode",sxpToken:valToOpen1.value}, function(response) {});


});
document.addEventListener('checkCbs', function(evt) {

	chrome.runtime.sendMessage({statMsg: "checkSxpTokenValue"}, function(response) {});


	});
document.addEventListener('checkCbsStatus', function(evt) {
	chrome.runtime.sendMessage({statMsg: "checkSxpTokenValueStatus"}, function(response) {});


	});
document.addEventListener('logoutRequest', function(evt) {

	chrome.runtime.sendMessage({statMsg: "logoutRequest"}, function(response) {});


	});
document.addEventListener('launchBookMarkUrl', function(evt) {
	valToOpen1 =evt.target.getElementById("bookMarkUrlCbs");
	console.log("TESTING 2:::"+valToOpen1);
	console.log("TESTING 2:::"+valToOpen1.value);
	chrome.runtime.sendMessage({statMsg: "launchBookMarkUrl",bPrefandBmarkResp:valToOpen1.value}, function(response) {});


	});

document.addEventListener('reloadAppData', function(evt) {
	valToOpen1 =evt.target.getElementById("reloadAppData");
	chrome.runtime.sendMessage({statMsg: "reloadAppData",bPrefandBmarkResp:valToOpen1.value}, function(response) {});


	});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  if(request.msg=="getTokenValue")
		 {
		 var sxpResp=request.tokenValue;
		 var multifactor=request.multiValue;
		 if(sxpResp == "AUTH"||sxpResp=="AUTHFAILED"||sxpResp=="SUPERADMIN") {


		 }
			else {$("#sxpToken").val(sxpResp);
			$("#multifactorStatusCbs").val(multifactor);
			$("#sxpCbsForm").submit();

			document.getElementById("test").style.display="none";
			document.getElementById("loading").style.display="block";
			}
		 }

	  else if(request.responsskipiwa=="iwaSkip")
		 {

		//  document.getElementById("loading").style.display="block";
		 document.location.href=request.iwaRedirectUrl;
		 }
	 else if(request.msg=="logout")
		 {
		 //document.location.href=request.url;
		 }
		 else if(request.msg=="cbsError")
		 {

				 document.getElementById("cbsError").style.display = "block";

		 }
		 else if(request.responseError=="error")
			 {

			 	document.getElementById("cbsError1").style.display = "block";
			 	 setTimeout(function(){
			 		document.getElementById("cbsError1").style.display ="none";
	    		 },3000);

			 }
	 else if(request.msg=="getTokenValueStatus")
	 {
		 var sxpResp=request.tokenValue;
		 if(sxpResp == "AUTH"||sxpResp=="AUTHFAILED")
			{
			 document.location.href=mainUrlSign+"/logout";

			}
	 }

  var sxpXmlStart = "<sso>";
  var sxpjs = "<JS><![CDATA[ ";



  if (request.msg == "sso")
	{
	 var arr = new Array();
  var count = 0;
  var occurFlag = 0;
	  document.body.onclick = function(e)
	  {



	    if(e.target.name != null)
		{

		  if(e.target.name.indexOf("sxp") == -1)
		{



		   if(e.target.parentNode.type == "submit")
		   {

			 e.target.parentNode.disabled = true;


		   }
		   e.target.disabled = true;
		   if(e.target.tagName == "A")
		   {
			 e.preventDefault();
		   }



		var elID = e.target.id;
		var elNAME = e.target.name;
		var elTAG = e.target.tagName;
		var elTYPE = e.target.type;
		var htmlSrc=e.target.outerHTML;



		var sxpbr = document.createElement("br");

		var iframediv = document.createElement("div");
		iframediv.name = "sxpdiv";
		iframediv.setAttribute( 'style', 'background-color: #fff !important;border: 3px solid #4e9dd9 !important;border-radius: 6px;color: #333 !important;height: auto !important;left: 30% !important;line-height: 35px;opacity: 0.97 !important;padding: 3% !important;position: fixed !important;top: 50px !important;width: 30% !important;word-wrap: break-word;z-index: 6000; !important');


		var elementNameSpan = document.createElement("label");
		elementNameSpan.name = "sxpelementnamespan";
		elementNameSpan.innerHTML = "Name:";
		elementNameSpan.setAttribute('style','width: 50px !important; display: inline-block !important;');


		var elementName = document.createElement("input");
		elementName.name = "sxpelementname";
		elementName.type = "text";
		elementName.setAttribute('style','display: inline-block !important; border: 1px solid rgb(225, 232, 237) !important; border-radius: 3px !important; height: 30px !important;width: 80% !important; margin-bottom: 20px !important;padding: 0% !important;');


		var actionSpan = document.createElement("lable");
		actionSpan.name = "sxpactionspan";
		actionSpan.innerHTML = "Action:";
		actionSpan.setAttribute('style','width: 50px !important; display: inline-block !important;');


		var action = document.createElement("select");
		action.name = "sxpaction";
		action.setAttribute('style','display: inline-block !important; border: 1px solid rgb(225, 232, 237) !important; border-radius: 3px !important;height: 30px !important; padding: 0% !important; width: 80% !important; margin-bottom: 20px !important;');

		var optionClick = document.createElement("option");
		optionClick.text = "Click";
		optionClick.value = "Click";

		var optionFill = document.createElement("option");
		optionFill.text = "Fill";
		optionFill.value = "Fill";

		var CheckBox = document.createElement("option");
		CheckBox.text = "CheckBox";
		CheckBox.value = "CheckBox";

		var DropDown = document.createElement("option");
		DropDown.text = "DropDown";
		DropDown.value = "dd";

		var Select = document.createElement("option");
		Select.text = "Radio";
		Select.value = "Radio";



		action.options.add(optionClick);
		action.options.add(optionFill);
		action.options.add(CheckBox);
		action.options.add(Select);
		action.options.add(DropDown);






		var actionIndex = 0;
var actionTargetType = elTYPE.toString().toLowerCase();
var actionTargetTagName = elTAG.toString().toLowerCase();

if (actionTargetType === "button" || actionTargetType === "submit") {
  actionIndex = 0;
} else if (actionTargetType === "text" || actionTargetType === "textbox" ||actionTargetType==="email" || actionTargetType === "pass" || actionTargetType === "password") {
  actionIndex = 1;
} else if (actionTargetType === "checkbox") {
  actionIndex = 2;
} else if (actionTargetType === "radio") {
  actionIndex = 3;
} else if (actionTargetTagName === "select") {
  actionIndex = 4;
}

action.selectedIndex = actionIndex;


		var addBtn = document.createElement("input");
		addBtn.type="button";
		addBtn.value = "Add";
		addBtn.name = "sxpaddElement";
		addBtn.setAttribute('style','background-color: rgb(0, 120, 164) !important;height: 30px !important;vertical-align: text-top; color: rgb(255, 255, 255) !important; width: 150px !important; margin-left: 50px !important; font-size: 16px !important; border: 1px solid rgb(53, 126, 189) !important;padding: 1% !important;');
		addBtn.onclick = function() { var prnt = this.parentNode;

		var elName = "";
		var elAction = "";

		for(temp=0;temp < prnt.childNodes.length;temp++)
		{

		if(prnt.childNodes[temp].nodeName == "INPUT")
		{

		  if(prnt.childNodes[temp].name == "sxpelementname")
		  {
			elName = prnt.childNodes[temp].value;
			for(var i=0;i<arr.length;i++)
			{
			   if(arr[i] == elName)
			   {
			   occurFlag = 1;
			   }

			}
			if(occurFlag == 0)
			{
			arr[count++] = elName;
			}
			else
			{
			occurFlag = 0;
			document.getElementsByName("sxpdiv").style.display = "block";
			}
		  }
		}
		if(prnt.childNodes[temp].nodeName == "SELECT")
		{

		   elAction = prnt.childNodes[temp].options[prnt.childNodes[temp].selectedIndex].value;

		}


		}

		var htmlSrc1=htmlSrc;
		htmlSrc1=htmlSrc.replace(/"/g,"").replace(/'/g,"").replace(/\//g,'').replace("<","").replace(">","");


		var ssoelement = "<ssoelement>"+"<displayname>"+elName+"</displayname>"+"<name>"+elName+"</name>"+"<action>"+elAction+"</action>"+"<htmlSrc><![CDATA[" + htmlSrc + "]]></htmlSrc>"+"<elementConfig type='USER_PROVIDED' "  +  "htmlType='"+elTYPE  +  "'  visibility = 'false' >"+"</elementConfig>"+"</ssoelement>";



		sxpXmlStart = sxpXmlStart + ssoelement;


		chrome.storage.local.set({'sxpssoxml': sxpXmlStart}, function() {});
		if(occurFlag != 1)
		{
		sxpjs = sxpjs + "var " + elName + "=\"\";"
		}

		if(elID != "" && occurFlag != 1)
		{

		   if(elAction == "Fill")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').value = cred."+elName+";";
		   }
		   if(elAction == "Click")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').click();";
		   }
		   if(elAction == "CheckBox")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').checked = cred."+elName+";";
		   }
		   if(elAction == "DropDown"||elAction == "dd")
		   {
		      sxpjs = sxpjs + "document.getElementById('"+elID+"').value = cred."+elName+";";
		   }
		   if(elAction == "Radio")
		   {
		       sxpjs = sxpjs + "document.getElementById('"+elID+"').checked = cred."+elName+";";
		   }


		}
	    else if(elNAME != ""&& occurFlag != 1)
		{

		   if(elAction == "Fill")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].value = cred."+elName+";";
		   }
		   if(elAction == "Click")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].click();";
		   }

		   if(elAction == "CheckBox")
		   {
		    sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].checked = cred."+elName+";";
		   }
		   if(elAction == "DropDown"||elAction == "dd")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].value = cred."+elName+";";
		   }
		   if(elAction == "Radio")
		   {
		        sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].checked = cred."+elName+";";
		   }



		}
		else if((elID == "" || elNAME == "")&& occurFlag != 1)
		{

		  var ifblockepression = "";
		  for(temp = 0; temp < e.target.attributes.length; temp++)
		  {


		    if(e.target.attributes[temp].nodeName != "disabled")
		    {

		     ifblockepression = ifblockepression + "(eleTemp.getAttribute(\""+e.target.attributes[temp].nodeName+"\")" + "==" + "\""+e.target.attributes[temp].nodeValue+"\"" + ")" + "&&";


			}

		  }
		  ifblockepression = ifblockepression+"1";
		  ifblockepression = "(" + ifblockepression + ")";


		  var scriptExpr = "var ele=\"\";var b=\"false\";var tmpArry = document.getElementsByTagName(\""+elTAG+"\");for(temp=0 ; temp<tmpArry.length ; temp++){var eleTemp = tmpArry[temp];if"+ifblockepression+"{ele=eleTemp;b=\"true\";}if(b==\"true\"){break;}}";

		selectorExpression = scriptExpr

		if(elAction == "Fill"&& occurFlag != 1)
		{

		  sxpjs = sxpjs + selectorExpression + "ele.value=" + "cred." + elName + ";";

		}
		if(elAction == "Click"&& occurFlag != 1)
		{

		  sxpjs = sxpjs + selectorExpression + "ele.click();";

		}
		if(elAction == "CheckBox"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.checked=" + "cred." + elName + ";";
		   }
		   if(elAction == "DropDown"&& occurFlag != 1||elAction == "dd"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.value=" + "cred." + elName + ";";
		   }
		   if(elAction == "Radio"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.checked=" + "cred." + elName + ";";
		   }


		}

		chrome.storage.local.set({'sxpssojs': sxpjs}, function() {});

		document.body.removeChild(prnt);

		}; //Emd of function that gets called when Add button is clicked on SXP on-boarding prompt.

		var cnClBtn = document.createElement("input");
		cnClBtn.type="button";
		cnClBtn.value = "Cancel";
		cnClBtn.name = "sxpcancelElement";
		cnClBtn.setAttribute('style','color: rgb(51, 51, 51) !important; height: 30px !important;vertical-align: text-top;background: rgb(244, 244, 244) !important; border-color: rgb(166, 166, 166) !important; width: 100px !important; margin-left: 7px !important; font-size: 16px !important;padding: 1% !important;');
		cnClBtn.onclick = function() { var prnt = this.parentNode; document.body.removeChild(prnt);};

		iframediv.appendChild(elementNameSpan);
		iframediv.appendChild(elementName);
		iframediv.appendChild(sxpbr);


		iframediv.appendChild(actionSpan);
		iframediv.appendChild(action);
		iframediv.appendChild(sxpbr);


		iframediv.appendChild(addBtn);
		iframediv.appendChild(cnClBtn);
		//document.body.appendChild(iframediv);
		document.body.insertBefore(iframediv, document.body.firstChild);


		}



		}
		else
		{

		   if(e.target.parentNode.type == "submit")
		   {

			 e.target.parentNode.disabled = true;


		   }
		   e.target.disabled = true;
		    if(e.target.tagName == "A")
		   {
			 e.preventDefault();
		   }

		//}


		var elID = e.target.id;
		var elNAME = e.target.name;
		var elTAG = e.target.tagName;
		var elTYPE = e.target.type;
		var htmlSrc=e.target.outerHTML;

		var sxpbr = document.createElement("br");

				var iframediv = document.createElement("div");
		iframediv.name = "sxpdiv";
		iframediv.setAttribute( 'style', 'background-color: #fff !important;border: 3px solid #4e9dd9 !important;border-radius: 6px;color: #333 !important;height: auto !important;left: 30% !important;line-height: 35px;opacity: 0.97 !important;padding: 3% !important;position: fixed !important;top: 50px !important;width: 30% !important;word-wrap: break-word;z-index: 6000; !important');


		var elementNameSpan = document.createElement("label");
		elementNameSpan.name = "sxpelementnamespan";
		elementNameSpan.innerHTML = "Name:";
		elementNameSpan.setAttribute('style','width: 50px !important; display: inline-block !important;');


		var elementName = document.createElement("input");
		elementName.name = "sxpelementname";
		elementName.type = "text";
		elementName.setAttribute('style','display: inline-block !important; border: 1px solid rgb(225, 232, 237) !important; border-radius: 3px !important; width: 80% !important;height: 30px !important; margin-bottom: 20px !important;padding: 2% 0% !important;');


		var actionSpan = document.createElement("lable");
		actionSpan.name = "sxpactionspan";
		actionSpan.innerHTML = "Action:";
		actionSpan.setAttribute('style','width: 50px !important; display: inline-block !important;');


		var action = document.createElement("select");
		action.name = "sxpaction";
		action.setAttribute('style','display: inline-block !important; border: 1px solid rgb(225, 232, 237) !important; border-radius: 3px !important;height: 30px !important; padding: 0% !important; width: 80% !important; margin-bottom: 20px !important;');

		var optionClick = document.createElement("option");
		optionClick.text = "Click";
		optionClick.value = "Click";

		var optionFill = document.createElement("option");
		optionFill.text = "Fill";
		optionFill.value = "Fill";

		var CheckBox = document.createElement("option");
		CheckBox.text = "CheckBox";
		CheckBox.value = "CheckBox";

		var DropDown = document.createElement("option");
		DropDown.text = "DropDown";
		DropDown.value = "dd";

		var Select = document.createElement("option");
		Select.text = "Radio";
		Select.value = "Radio";



		action.options.add(optionClick);
		action.options.add(optionFill);
		action.options.add(CheckBox);
		action.options.add(Select);
		action.options.add(DropDown);






		var actionIndex = 0;
var actionTargetType = elTYPE.toString().toLowerCase();
var actionTargetTagName = elTAG.toString().toLowerCase();

if (actionTargetType === "button" || actionTargetType === "submit") {
  actionIndex = 0;
} else if (actionTargetType === "text" || actionTargetType === "textbox" || actionTargetType === "password") {
  actionIndex = 1;
} else if (actionTargetType === "checkbox") {
  actionIndex = 2;
} else if (actionTargetType === "radio") {
  actionIndex = 3;
} else if (actionTargetTagName === "select") {
  actionIndex = 4;
}

action.selectedIndex = actionIndex;


		var addBtn = document.createElement("input");
		addBtn.type="button";
		addBtn.value = "Add";
		addBtn.name = "sxpaddElement";
		addBtn.setAttribute('style','background-color: rgb(0, 120, 164) !important;height: 30px !important;vertical-align: text-top; color: rgb(255, 255, 255) !important; width: 150px !important; margin-left: 50px !important; font-size: 16px !important; border: 1px solid rgb(53, 126, 189) !important;padding: 1% !important;');
		//btn.setAttribute('style','top: 20%;position: absolute;z-index: 9000;left: 50%;');
		addBtn.onclick = function() { var prnt = this.parentNode;

		var elName = "";
		var elAction = "";

		for(temp=0;temp < prnt.childNodes.length;temp++)
		{

		if(prnt.childNodes[temp].nodeName == "INPUT")
		{

		  if(prnt.childNodes[temp].name == "sxpelementname")
		  {
			elName = prnt.childNodes[temp].value;
			for(var i=0;i<arr.length;i++)
			{
			   if(arr[i] == elName)
			   {
			   alert("duplicate value occur");
			   occurFlag = 1;
			   }

			}
			if(occurFlag == 0)
			{
			arr[count++] = elName;
			}
			else
			{
			occurFlag = 0;
			document.getElementsByName("sxpdiv").style.display = "block";
			}





		  }
		}
		if(prnt.childNodes[temp].nodeName == "SELECT")
		{

		  // alert(prnt.childNodes[temp].options[prnt.childNodes[temp].selectedIndex].value);
		   elAction = prnt.childNodes[temp].options[prnt.childNodes[temp].selectedIndex].value;

		}


		}
		var htmlSrc1=htmlSrc;
		htmlSrc1=htmlSrc.replace(/"/g,"").replace(/'/g,"").replace(/\//g,'').replace("<","").replace(">","");


		var ssoelement = "<ssoelement>"+"<displayname>"+elName+"</displayname>"+"<name>"+elName+"</name>"+"<action>"+elAction+"</action>"+"<htmlSrc><![CDATA[" + htmlSrc + "]]></htmlSrc>"+"<elementConfig type='USER_PROVIDED' "  +  "htmlType='"+elTYPE  +   "'  visibility = 'false' >"+"</elementConfig>"+"</ssoelement>";



		//sxpjs = sxpjs + "var " + elName + "=\"\";"
		if(occurFlag != 1)
		{
		sxpjs = sxpjs + "var " + elName + "=\"\";"
		}

		chrome.storage.local.set({'sxpssoxml': sxpXmlStart}, function() {});

		if(elID != ""&& occurFlag != 1)
		{

		   if(elAction == "Fill")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').value = cred."+elName+";";
		   }
		   if(elAction == "Click")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').click();";
		   }
		   if(elAction == "CheckBox")
		   {
		     sxpjs = sxpjs + "document.getElementById('"+elID+"').checked = cred."+elName+";";
		   }
		   if(elAction == "DropDown"||elAction == "dd")
		   {
		      sxpjs = sxpjs + "document.getElementById('"+elID+"').value = cred."+elName+";";
		   }
		   if(elAction == "Radio")
		   {
		       sxpjs = sxpjs + "document.getElementById('"+elID+"').checked = cred."+elName+";";
		   }


		}
		else if(elNAME != ""&& occurFlag != 1)
		{

		   if(elAction == "Fill")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].value = cred."+elName+";";
		   }
		   if(elAction == "Click")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].click();";
		   }

		   if(elAction == "CheckBox")
		   {
		    sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].checked = cred."+elName+";";
		   }
		   if(elAction == "DropDown"||elAction == "dd")
		   {
		     sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].value = cred."+elName+";";
		   }
		   if(elAction == "Radio")
		   {
		        sxpjs = sxpjs + "document.getElementsByName('"+elNAME+"')[0].checked = cred."+elName+";";
		   }



		}
		else if((elID == "" || elNAME == "")&& occurFlag != 1)
		{

		  var ifblockepression = "";
		  for(temp = 0; temp < e.target.attributes.length; temp++)
		  {


		    if(e.target.attributes[temp].nodeName != "disabled")
		    {

		     ifblockepression = ifblockepression + "(eleTemp.getAttribute(\""+e.target.attributes[temp].nodeName+"\")" + "==" + "\""+e.target.attributes[temp].nodeValue+"\"" + ")" + "&&";

			}

		  }
		  ifblockepression = ifblockepression+"1";
		  ifblockepression = "(" + ifblockepression + ")";

		  var scriptExpr = "var ele=\"\";var b=\"false\";var tmpArry = document.getElementsByTagName(\""+elTAG+"\");for(temp=0 ; temp<tmpArry.length ; temp++){var eleTemp = tmpArry[temp];if"+ifblockepression+"{ele=eleTemp;b=\"true\";}if(b==\"true\"){break;}}";

		selectorExpression = scriptExpr

		if(elAction == "Fill"&& occurFlag != 1)
		{

		  sxpjs = sxpjs + selectorExpression + "ele.value=" + "JSONOBj.get('" + elName + "');";

		}
		if(elAction == "Click"&& occurFlag != 1)
		{

		  sxpjs = sxpjs + selectorExpression + "ele.click();";

		}
		if(elAction == "CheckBox"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.checked=" + "cred." + elName + ";";
		   }
		if(elAction == "DropDown"&& occurFlag != 1||elAction == "dd"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.value=" + "cred." + elName + ";";
		   }
		   if(elAction == "Radio"&& occurFlag != 1)
		   {
		   sxpjs = sxpjs + selectorExpression + "ele.checked=" + "cred." + elName + ";";
		   }

		}

		chrome.storage.local.set({'sxpssojs': sxpjs}, function() {});
		document.body.removeChild(prnt);

		};

		var cnClBtn = document.createElement("input");
		cnClBtn.type="button";
		cnClBtn.value = "Cancel";
		cnClBtn.name = "sxpcancelElement";
		cnClBtn.setAttribute('style','color: rgb(51, 51, 51) !important; height: 30px !important;vertical-align: text-top;background: rgb(244, 244, 244) !important; border-color: rgb(166, 166, 166) !important; width: 100px !important; margin-left: 7px !important; font-size: 16px !important;padding: 1% !important;');
		cnClBtn.onclick = function() { var prnt = this.parentNode; document.body.removeChild(prnt);};

		iframediv.appendChild(elementNameSpan);
		iframediv.appendChild(elementName);
		iframediv.appendChild(sxpbr);


		iframediv.appendChild(actionSpan);
		iframediv.appendChild(action);
		iframediv.appendChild(sxpbr);




		iframediv.appendChild(addBtn);
		iframediv.appendChild(cnClBtn);
		document.body.insertBefore(iframediv, document.body.firstChild);



		}



	  }// End of Document onClick function
	}

	else if(request.msg == "sso1")
	{
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(request.js);
  nf();
  chrome.runtime.sendMessage({statMsg: "TestSSOCleanData"}, function(response) {});
  }


	}
	else if(request.msg == "testSSO")
	{
		var jscode = "var cred = JSON.parse('" + JSON.stringify(request.js.data) + "');" +request.js.script;
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {

  var nf=new Function(jscode);
  nf();
  //chrome.runtime.sendMessage({statMsg: "TestSSOCleanData"}, function(response) {});
  }
  chrome.runtime.sendMessage({statMsg: "Masking"}, function(response) {});

	}

  else if(request.msg == "doSSO"&&request.masking == "NO"&&request.invalidLoginDetection == "NO")
	{

	var jscode = "var cred = JSON.parse('" + JSON.stringify(request.js.data) + "');" +request.js.js.chromejs;

 if(request.delay==0)
 {
	 if(document.querySelector("form")||document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();
  }
  	chrome.runtime.sendMessage({statMsg: "Masking"}, function(response) {});

}
else
 {
 setTimeout(function(){
  if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();
  }
  	chrome.runtime.sendMessage({statMsg: "Masking"}, function(response) {});
	},request.delay);

}



  }

  else if(request.msg == "doSSO"&&request.masking == "YES"&&request.invalidLoginDetection == "NO")
	{
	masking();
	var jscode = "var cred = JSON.parse('" + JSON.stringify(request.js.data) + "');" +request.js.js.chromejs;
	if(request.delay==0)
	{
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();
  }
  	chrome.runtime.sendMessage({statMsg: "Masking"}, function(response) {});
	}
	else
	{
	setTimeout(function(){
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();
  }
  	chrome.runtime.sendMessage({statMsg: "Masking"}, function(response) {});
	},request.delay);
	}








}

else if(request.msg == "doSSO"&&request.masking == "YES"&&request.invalidLoginDetection == "YES")
	{

	masking();
	var jscode = "var cred = JSON.parse('" + JSON.stringify(request.js.data) + "');" +request.js.js.chromejs;
	if(request.delay==0)
	{
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {

  var nf=new Function(jscode);
  nf();
  }
  chrome.runtime.sendMessage({statMsg:"doMaskingAndInvalidLogin"}, function(response) {});

  }
  else
	{
	setTimeout(function(){
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {

  var nf=new Function(jscode);
  nf();
  }
  chrome.runtime.sendMessage({statMsg:"doMaskingAndInvalidLogin"}, function(response) {});
  },request.delay);


  }






  }


  else if(request.msg == "doSSO"&&request.masking == "NO"&&request.invalidLoginDetection == "YES")
	{
	var jscode = "var cred = JSON.parse('" + JSON.stringify(request.js.data) + "');" +request.js.js.chromejs;
	if(request.delay==0)
	{
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();

  }
  chrome.runtime.sendMessage({statMsg:"doMaskingAndInvalidLogin"}, function(response) {});
  }
  else
	{
	setTimeout(function(){
		if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='text']")!=null||document.querySelector("input[type='pass']")!=null||document.querySelector("input[type='textbox']")!=null)
  {
  var nf=new Function(jscode);
  nf();

  }
  chrome.runtime.sendMessage({statMsg:"doMaskingAndInvalidLogin"}, function(response) {});
  },request.delay);
  }






  }
  else if(request.msg=="ShowInvalidBar"||request.msg2=="removemasking")
  {
	  if(document.querySelector("input[type='password']")!=null||document.querySelector("input[type='pass']")!=null)
  {
  infobar(request.url);
  }
	  try{
		  if(document.getElementById("ilantus-extension-masking")&&document.querySelector("input[type='password']")!=null)
		  {
		  document.getElementById("ilantus-extension-masking").parentNode.removeChild(document.getElementById("ilantus-extension-masking"));
		  }

	  }catch(e){}
	  chrome.runtime.sendMessage({statMsg:"MaskingAtLoading1"}, function(response) {});
  }
  else if(request.msg=="MakingAtLoading")
  {
 masking();
chrome.runtime.sendMessage({statMsg:"MaskingAtLoading"}, function(response) {});
}


  else if(request.msg1=="removemasking")
  {
	  if(document.getElementById("ilantus-extension-masking"))
	  {
	  document.getElementById("ilantus-extension-masking").parentNode.removeChild(document.getElementById("ilantus-extension-masking"));
	  }

}




  });

  function masking()
{
if (document.getElementById("ilantus-extension-masking") === null) {
    var maskingText = "Please wait....";
    var maskingContainerStyle = "position: fixed; top: 0; left: 0; bottom: 0; right: 0; margin: auto; z-index:10000000; width: 100%; height: 100%; background:rgba(255,255,255,1);";

    // center screen points
    var maskingDivHeight = (document.documentElement.clientHeight/2) - 100;
    var maskingDivWidth = (document.documentElement.clientWidth/2) - 100;
    var maskingDivStyle = "position: absolute; left: " + maskingDivWidth + "px; top:" + maskingDivHeight + "px;";

    // main masking container
    var maskingContainer = document.createElement("div");
    maskingContainer.setAttribute("id", "ilantus-extension-masking");
    maskingContainer.setAttribute("style", maskingContainerStyle);

    // masking elements container
    var maskingDiv = document.createElement("div");
    maskingDiv.setAttribute("style", maskingDivStyle);

    // masking image
    var maskingImg = document.createElement("img");
    maskingImg.setAttribute("src", chrome.extension.getURL("loading.gif"));
    maskingImg.setAttribute("style", "margin-left: 60px;");

    // masking text
    var maskingTextDiv = document.createElement("div");
    maskingTextDiv.setAttribute("style", "text-align:center; font-weight: bold; font-size: 250%;");
    maskingTextDiv.innerHTML = maskingText;

    // appending elements to webpage
    maskingDiv.appendChild(maskingImg);
    maskingDiv.appendChild(maskingTextDiv);
    maskingContainer.appendChild(maskingDiv);
    document.getElementsByTagName("body")[0].appendChild(maskingContainer);
}




}

 function infobar(LaunchPadUrl)
{

if (document.getElementById("ilantus-extension-infobar") === null) {
    // infobar text and style

    var infobarContainerStyle = "position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index:10000000; width: 100%; height: 30px; background:#E7ECEF; border: 1px solid #898989;";

    // main infobar container
    var infobarContainer = document.createElement("div");
    infobarContainer.setAttribute("id", "ilantus-extension-infobar");
    infobarContainer.setAttribute("style", infobarContainerStyle);
//Login failed. Please click <Launchpad link> to update credentials.
    // infobar elements container
    var infobarDiv = document.createElement("div");
    infobarDiv.setAttribute("style", "font-size: 16px; margin: 6px 10px;");
    infobarDiv.innerHTML = "Login failed. Please click ";
    var a=document.createElement('a');
    a.setAttribute('href',LaunchPadUrl);
    a.innerHTML="Launchpad";
    infobarDiv.appendChild(a);
    infobarDiv.innerHTML=infobarDiv.innerHTML+' to update your credentials';

    // close button
    var btnClose = document.createElement("button");
    btnClose.innerHTML = "X";
    //btnClose.setAttribute("style", "float:right; border:0; color: white; background: #DD4B39;");

    btnClose.setAttribute("style", "background: rgb(221, 75, 57) !important; padding: 5px 10px !important; border-radius: 3px !important; border: 0px currentColor !important; border-image: none !important; color: white !important; line-height: 15px !important; font-family: inherit !important; font-size: 12px !important; font-weight: normal !important; margin-top: -5px !important; float: right !important;");
    // inline function to avoid any memory leaks
    btnClose.setAttribute("onclick", "document.getElementsByTagName('body')[0].removeChild(document.getElementById('ilantus-extension-infobar'));");

    // appending elements to webpage
    infobarDiv.appendChild(btnClose);
    infobarContainer.appendChild(infobarDiv);
    document.getElementsByTagName("body")[0].appendChild(infobarContainer);
}


}




