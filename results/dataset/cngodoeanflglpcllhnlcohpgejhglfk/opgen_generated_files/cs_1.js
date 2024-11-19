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





// original file:/media/data2/jianjia/extension_data/unzipped_extensions/cngodoeanflglpcllhnlcohpgejhglfk/popup.js

document.addEventListener('DOMContentLoaded', function () {
	$(".loader").show();
	$("#select1").hide();

	// disable right click in popup
	if (document.getElementById("prntCnt")) {
		document.getElementById("prntCnt").addEventListener("contextmenu", function(e){e.preventDefault(); return false;});
	}

	if (document.getElementById("adminprntCnt")) {
		document.getElementById("adminprntCnt").addEventListener("contextmenu", function(e){e.preventDefault(); return false;});
	}

	// serach app functionality for end user
	if (document.getElementById("searchBoxEndUser")) {
		document.getElementById("searchBoxEndUser").addEventListener("keyup", function(e) {
			var searchKey = document.getElementById("searchBoxEndUser").value;
			var allLabels = document.getElementById("prntCnt").getElementsByTagName("a");
			var searchCount = 0;

			for (var i = 0; i < allLabels.length; ++i) {
				allLabels[i].style.display = allLabels[i].innerHTML.toLowerCase().indexOf(searchKey) ? "none" : "block";

				if (allLabels[i].style.display === "block") {
		            ++searchCount;
		        }
			}

			document.getElementById("searchCountEndUser").style.display = searchCount ? "none" : "block";
		});
	}

	// serach app functionality for admin
	if (document.getElementById("searchBox")) {
		document.getElementById("searchBox").addEventListener("keyup", function(e) {
			var searchKey = document.getElementById("searchBox").value;
			var allLabels = document.getElementById("adminprntCnt").getElementsByTagName("a");
			var searchCount = 0;

			for (var i = 0; i < allLabels.length; ++i) {
				allLabels[i].style.display = allLabels[i].innerHTML.toLowerCase().indexOf(searchKey) ? "none" : "block";

				if (allLabels[i].style.display === "block") {
		            ++searchCount;
		        }
			}

			document.getElementById("searchCount").style.display = searchCount ? "none" : "block";
		});
	}

initApp();
  validate();
  document.getElementById('password').addEventListener('keypress', capLock);

	document.querySelector('button').addEventListener('click', authenticateUser);

	chrome.storage.local.get('chkBoxChkd', function (result) {


		try{
			if(result.chkBoxChkd=="undefined"||result.chkBoxChkd==undefined)
			{
			chrome.storage.local.set({'chkBoxChkd': "false"}, function() {});
			}
		      }catch(e) {}
		      try{

		if(result.chkBoxChkd == "true")
		{
		  document.getElementById('sxptoggleExtnUsage').checked = "true";
		}
		      }catch(e){}
   });

   document.getElementById('FinishedCapturing').addEventListener('click', sso);
  document.getElementById('sxptoggleExtnUsage').addEventListener('change', extensionOnBoardingMode);


	document.getElementById("cancel").onclick = function () {
	window.close();
  };

});
try{
var background = chrome.extension.getBackgroundPage();
var mainurl=background.mainurl;
var cbsUrl=background.cbsUrl;
}catch(e){}
var isCBSEnabled = false;
var languageListOeByOne;
var multi_domain_value='';
var multi_domain_id='';
var extensionAppData = null;
 var validate = function(){
	 $("#username,#password").change(function(){
	      $("#button").removeAttr("disabled");
	 });
	 $("#username").on("keypress",function(e){
	 	var e=window.event || e
	 	var keyunicode=e.charCode || e.keyCode
	 	if(document.getElementById("username").value.indexOf(".")>0&&String.fromCharCode(keyunicode)=="."){
	 	return false;
	 	}
	 	else
	 	{
	 	return ((keyunicode>=48 && keyunicode<=122) ||keyunicode==32|| keyunicode==8 || keyunicode==9 || keyunicode==192 || keyunicode==189 || keyunicode==190 || keyunicode==110||keyunicode==64||keyunicode==42||keyunicode==43||keyunicode==61||keyunicode==91||keyunicode==93||keyunicode==92||keyunicode==59||keyunicode==44||keyunicode==47||keyunicode==124||keyunicode==34||keyunicode==58||keyunicode==60||keyunicode==62||keyunicode==63||String.fromCharCode(keyunicode)==".")? true : false
	 	}
	 	});

	 	$("#password").on("keypress",function(e){
	 	var e=window.event || e
	 	var keyunicode=e.charCode || e.keyCode
	 	//Allow alphabetical keys, plus BACKSPACE and SPACE
	 	return (keyunicode!=32)? true : false
	 	});
	 };
	 function getCbsToken(callback) {
		    $.ajax({
		        type : "POST",
		        url : cbsUrl+"/getSxpTokenValue",
		        crossDomain: true,
		        beforeSend : function(xhr) {
		            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		        },
		        xhrFields : {
		            withCredentials: true
		        },
		        complete : function(xhr, status) {
		            // console.log("complete: " + status);
		        },
		        success : function(data, status, xhr) {
		        	if (data != "" && data != "AUTH" && data != "AUTHFAILED"&&data !="SUPERADMIN" ) {
		        		callback(data);
		        	}
		        	else if(data== "" && data== "AUTH" && data== "AUTHFAILED" )
		        		{
		        		logoutfun();
		        		$("#signin").show();
		        		}
		        },
		        error : function(xhr, status, error) {
		            // console.log(status);
		            // callback(status);
		        }
		    });
		}

		function validateToken(token) {
			var multi;
			$.ajax({

				url:cbsUrl+'/getMultifactorValue',
				type:'get',
				data:{},
				success:function(response1)
				{
					multi=response1;
				 if (token != "AUTH") {
				        $.ajax({
				            type : "POST",
				            url : mainurl + "/validateToken",
				            data : {"sxpToken" : token,"multifactorStatusCbs":multi},
				            crossDomain: true,
				            beforeSend : function(xhr) {
				                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				            },
				            xhrFields : {
				                withCredentials: true
				            },
				            complete : function(xhr, status) {
				                // console.log("complete: " + status);
				            },
				            success : function(data, status, xhr) {
				            	$("#auth").hide();
				                initApp();
				                // SSOXP.fetchOnboardedAppData(onOnboardedAppDataFetchedCallback);
				                // callback(status);
				            },
				            error : function(xhr, status, error) {
				                console.log(status);
				                // callback(status);
				            }
				        });
				    }
				}
				});

		}

		function initApp()
		{
			$(".loader").hide();
			$("#select1").show();
		 chrome.browserAction.setIcon({path:"icon1.png"});

		multidomainAndAddLanguage();
		chrome.storage.local.get('chkBoxChkd', function (result) {


				if(result.chkBoxChkd == "true")
				{
				  document.getElementById('sxptoggleExtnUsage').checked = "true";
				}

		   });
		var userTypeAndLoggedInUserName =checkUserLogin();

		var userType=JSON.parse(userTypeAndLoggedInUserName);
		try{
			if(userType.cbs==true&&userType.iwaStatus==false){
				var tokenValue=getTokenStatus();
				if(tokenValue=="AUTH")
					{
					userType.userType="other";
					}
			}
			}catch(e){}
		if(userType.userType=="admin")
		{

		$("#check").show();
		$("#check1").show();

		$("#enduser1").show();

		$("#adminMyApps").show();
		$('#user_name').show();
		 document.getElementById('sxptoggleExtnUsage').addEventListener('change', extensionOnBoardingMode);
		$('#LoggedInUserName').append(userType.loggedInUserName);
		document.querySelector('#sxptoggleExtnUsage').addEventListener('change', changeHandler);
		CheckBoxInitializaion();
		var dv = document.createElement("div");
		dv.setAttribute("class","appList");
		var AppListDetail =appListDetail(false);
		if (typeof AppListDetail === "object") {
			AppListDetail=JSON.stringify(AppListDetail);
		}
		var AppList=JSON.parse(AppListDetail);

		if (AppList.content) {
		for(i=0;i<AppList.content.length;i++)
		{
								$('#noAppsFoundAdmin').hide();
								var a = document.createElement("a");
		                        a.id = AppList.content[i].appId;
							    a.href = AppList.content[i].url;
		                        a.innerHTML=AppList.content[i].appName;
		                        a.applicationType=AppList.content[i].applicationType;
								a.bookMarkUrl=AppList.content[i].bookMarkUrl;
								a.brPref=AppList.content[i].brPref;
								a.MFACheck=AppList.content[i].MFACheck ? AppList.content[i].MFACheck : "";
								a.appLevelMfaBookMarkUrl=AppList.content[i].appLevelMfaBookMarkUrl ? AppList.content[i].appLevelMfaBookMarkUrl : "";
		                        a.addEventListener("click", doSSO);
		                        $('#adminprntCnt').append(dv);
								$('.appList').append(a);
		}
		}
		else {
			$('#noAppsFoundAdmin').show();
		}
		addLaunchPadLink();
		addLogoutLink();
		}
		else if(userType.userType=="user")
		{

		// var userTypeAndLoggedInUserName =checkUserLogin();
		// var userType=JSON.parse(userTypeAndLoggedInUserName);
		$("#enduser").show();
		$("#endUserMyApps").show();
		$('#Enduser_name').show();
		$('#EnUserLoggedInUserName').append(userType.loggedInUserName);
		var dv = document.createElement("div");
		dv.setAttribute("class","appList");
		var AppListDetail =appListDetail(false);

		if (typeof AppListDetail === "object") {
			AppListDetail=JSON.stringify(AppListDetail);
		}
		var AppList=JSON.parse(AppListDetail);

		if (AppList.content) {
			for(i=0;i<AppList.content.length;i++)
			{
									$('#noAppsFound').hide();
									var a = document.createElement("a");
			                        a.id = AppList.content[i].appId;
								    a.href = AppList.content[i].url;
			                        a.innerHTML=AppList.content[i].appName;
									a.bookMarkUrl=AppList.content[i].bookMarkUrl;
									a.brPref=AppList.content[i].brPref;
									a.MFACheck=AppList.content[i].MFACheck ? AppList.content[i].MFACheck : "";
									a.appLevelMfaBookMarkUrl=AppList.content[i].appLevelMfaBookMarkUrl ? AppList.content[i].appLevelMfaBookMarkUrl : "";
									   a.applicationType=AppList.content[i].applicationType;
			                        a.addEventListener("click", doSSO);

			                        $('#prntCnt').append(dv);
									$('.appList').append(a);
			}
		} else {
			$('#noAppsFound').show();
		}

		addLaunchPadLink();
		addLogoutLink();
		}
		else if(userType.userType=="MFA"){
						$("#auth").hide();
						chrome.browserAction.setIcon({path:"icon.png"});
						chrome.tabs.create({url: mainurl+"/performLogin"});

						window.close();
					}
					else
					{
						if (userType.cbs) {
							isCBSEnabled = true;
							getCbsToken(validateToken);
						} else {
							isCBSEnabled = false;
						}

						$("#auth").show();


						chrome.browserAction.setIcon({path:"icon.png"});

						$("#check").hide();
						$("#check1").hide();
						$("#on_board_app").hide();
						$("#on_board_app1").hide();
						$("#FinishedCapturing").hide();
						$("#enduser").hide();
						$("#enduser1").hide();
						$("#fxplogo,#signIn").show();

					}

		}
		function authenticateUser()
		{
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			var xhr = new XMLHttpRequest();
			xhr.open("POST",mainurl+"/login", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.send("username="+username+"&password="+encodeURIComponent(password)+"&domainName="+multi_domain_value+"&domainId="+multi_domain_id);
			xhr.onload = function(e)
			{
				if(this.status == 200)
				{
					if (isCBSEnabled) {
						// perform CBS request
			            $.ajax({
			                type : "POST",
			                url : mainurl+"/validate",
			                async:false,
			                data : {"sxpusername": username, "sxppassword": password, "domainName": multi_domain_value, "domainId" : multi_domain_id},
			                crossDomain: true,
			                beforeSend : function(xhr) {
			                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			                },
			                xhrFields : {
			                    withCredentials: true
			                },
			                complete : function(xhr, status) {
			                    // console.log("complete: " + status);
			                },
			                success : function(data, status, xhr) {
			                     $.ajax({

			             			url:cbsUrl+'/sxpauth',
			             			 async:false,
			             			type:'POST',
			             			data:data,
			             			success:function(response)
			             			{
			             			},
			             			error:function(response)
			             			{
			             			}
			             		});

			                    //callback(status);
			                },
			                error : function(xhr, status, error) {
			                    // console.log(status);
			                    callback(status);
			                }
			            });
					}

				$("#frmFlds").show();
				$("#auth").hide();
				chrome.browserAction.setIcon({path:"icon1.png"});
				document.getElementById('enduser').style.display = 'none';
				document.getElementById('enduser1').style.display = 'none';
				var userTypeAndLoggedInUserName =checkUserLogin();
				var userType=JSON.parse(userTypeAndLoggedInUserName);
						if(userType.userType=="admin")
		{
		$("#check").show();
		$("#check1").show();
		$("#enduser1").show();
		$("#adminMyApps").show();
		$('#user_name').show();
		$('#LoggedInUserName').append(userType.loggedInUserName);
		document.querySelector('#sxptoggleExtnUsage').addEventListener('change', changeHandler);
		CheckBoxInitializaion();
		var dv = document.createElement("div");
		dv.setAttribute("class","appList");
		var AppListDetail =appListDetail(false);

		if (typeof AppListDetail === "object") {
			AppListDetail=JSON.stringify(AppListDetail);
		}
		var AppList=JSON.parse(AppListDetail);
		if (AppList.content) {
		for(i=0;i<AppList.content.length;i++)
		{
								$('#noAppsFoundAdmin').hide();
								var a = document.createElement("a");
		                        a.id = AppList.content[i].appId;
							    a.href = AppList.content[i].url;
		                        a.innerHTML=AppList.content[i].appName;
								a.bookMarkUrl=AppList.content[i].bookMarkUrl;
								a.brPref=AppList.content[i].brPref;
								a.MFACheck=AppList.content[i].MFACheck ? AppList.content[i].MFACheck : "";
								a.appLevelMfaBookMarkUrl=AppList.content[i].appLevelMfaBookMarkUrl ? AppList.content[i].appLevelMfaBookMarkUrl : "";
								   a.applicationType=AppList.content[i].applicationType;
		                        a.addEventListener("click", doSSO);
		                        $('#adminprntCnt').append(dv);
								$('.appList').append(a);
		}
		}
		else {
			$('#noAppsFoundAdmin').show();
		}
		addLaunchPadLink();
		addLogoutLink();
		}
		else if(userType.userType=="user")
		{
		//$('#main_wrapper').css({'margin-top':'-24px'});
		//multidomainAndAddLanguage();
		// var userTypeAndLoggedInUserName =checkUserLogin();
		// var userType=JSON.parse(userTypeAndLoggedInUserName);
		$("#enduser").show();
		$("#endUserMyApps").show();
		$('#Enduser_name').show();
		$('#EnUserLoggedInUserName').append(userType.loggedInUserName);
		var dv = document.createElement("div");
		dv.setAttribute("class","appList");
		var AppListDetail =appListDetail(false);

		if (typeof AppListDetail === "object") {
			AppListDetail=JSON.stringify(AppListDetail);
		}
		var AppList=JSON.parse(AppListDetail);

		if (AppList.content) {
		for(i=0;i<AppList.content.length;i++)
		{
								$('#noAppsFound').hide();
								var a = document.createElement("a");
		                        a.id = AppList.content[i].appId;
							    a.href = AppList.content[i].url;
							    a.applicationType=AppList.content[i].applicationType;
		                        a.innerHTML=AppList.content[i].appName;
								a.bookMarkUrl=AppList.content[i].bookMarkUrl;
								a.brPref=AppList.content[i].brPref;
								a.MFACheck=AppList.content[i].MFACheck ? AppList.content[i].MFACheck : "";
								a.appLevelMfaBookMarkUrl=AppList.content[i].appLevelMfaBookMarkUrl ? AppList.content[i].appLevelMfaBookMarkUrl : "";


								//Attach event to click on any hyperlink

		                        a.addEventListener("click", doSSO);
		                        //attaching same to div
		                        $('#prntCnt').append(dv);
								$('.appList').append(a);
		                    }
		} else {
			$('#noAppsFound').show();
		}
		             addLaunchPadLink();
		                addLogoutLink();
		               }
		                 else if(userType.userType=="MFA"){
						$("#auth").hide();
						chrome.browserAction.setIcon({path:"icon.png"});
						chrome.tabs.create({url: mainurl+"/performLogin"});

						window.close();
					}

		                  else if(userType.userType=="other")
								{

									$("#err").show();
									var x="UserName & Password are Not Correct";

									document.getElementById('signIn').style.display = 'block';

									document.getElementById('fx').style.display = 'block';
									document.getElementById('auth').style.display = 'block';
									chrome.browserAction.setIcon({path:"icon.png"});
								}
				if(xhr.responseText == "SXP.ldap.acc_locked")
				{
					$("#err").html("Account is currently locked out");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.ldap.acc_disabled")
				{
					$("#err").html("Your account is disabled");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.ldap.invalid_credentials")
				{
					$("#err").html("The Username or Password you entered is incorrect");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.ldap.acc_expired")
				{
					$("#err").html("The user's account has expired");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.ldap.pwd_must_change")
				{

                    $("#err").html("Password must be changed before logging on the first time, Please <span id='pwdChange'></span> to change");
					$("#err").show();
					var dv=document.getElementById("pwdChange");
					var a=document.createElement("a");
					a.id="pwdChangeId"
						a.innerHTML="Click Here";
					a.href=mainurl;
					dv.appendChild(a);
					a.addEventListener("click", pwdChangeId);
				}
				if(xhr.responseText == "SXP.ldap.logon_not_permitted_this_time")
				{
					$("#err").html("Not permitted to log-on at this time is set");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.ldap.pwd_expired")
				{
					$("#err").html("Your password has expired");
					$("#err").show();
				}
				if(xhr.responseText == "SXP.account.deactivated")
				{
					$("#err").html("Your account is Disabled.Please Contact administrator");
					$("#err").show();
				}

				}
		    }

		}
		function pwdChangeId()
		{
			chrome.tabs.create({url: mainurl+"/loginfailed"});
		}
		function multidomainAndAddLanguage()
		{
		var sd=new Array();

				var x1hr = new XMLHttpRequest();
				x1hr.open("POST",mainurl+"/getAllDomainList", true);
		x1hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x1hr.send();
		x1hr.onload = function()
			{
			if (this.status == 200)
			{

			var multi_resp=x1hr.responseText;
			var check_config_ldap=multi_resp.split(",")
					var as=check_config_ldap[0].substring(check_config_ldap[0].indexOf("{")+1,check_config_ldap[0].indexOf("}"));
					as=as.split("#");


				if(as[0]=="microsoft")
				{
				   if(as[1]=="TRUE")
				   {
					   var x = document.getElementById("multi_domain");
						var multi_domain_attr;
						 for(var i=1;i<check_config_ldap.length-1; i++)
						{
							multi_domain_attr=check_config_ldap[i].substring(check_config_ldap[i].indexOf("{")+1,check_config_ldap[i].indexOf("}"));
							multi_domain_attr=multi_domain_attr.split("#");

							sd.push(multi_domain_attr);
							for(var j=1;j<multi_domain_attr.length-1;j++)
							{
								var option = document.createElement("option");
								option.value = multi_domain_attr[j];
								option.text =multi_domain_attr[++j];
								x.add(option);
							}
						}
						if(check_config_ldap.length == 3)
						{
							x.remove(0);
							multi_domain_id= multi_domain_attr[0];
							multi_domain_value=multi_domain_attr[1];

							$("#Multi_domain").hide();
						} else {
							$("#Multi_domain").show();
						}
					}
					 else{

				$("#Multi_domain").hide();

				}

				}
				  else{

				$("#Multi_domain").hide();

				}

				}}
			var lang;
		$("#select1").on('change',function(){

				add($(this).val());

			});
		$("#multi_domain").on('change',function(){

				multi_domain_value=$(this).val();

			for(var i=0;i<sd.length;i++){
						if(multi_domain_value==sd[i][1])
						{
								multi_domain_id=sd[i][0];

								break;
						}

			}


				});


		var nonsamlurls=new Array();
		var xhr1 = new XMLHttpRequest();
		xhr1.open("POST",mainurl+"/checkuserlogin1", true);
		xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr1.send();
		xhr1.onload = function()
		{
			if (this.status == 200)
			{

			languageList = xhr1.responseText;

			var splt=languageList.split("$");

			var lang=splt[1];
			 if(lang=="NSE")
			 {
				lang=window.navigator.language;
				lang=lang.substring(0,2);
			}

			add(lang);
			 languageListOeByOne=splt[2].split(",");


			 for(var i=0; i<languageListOeByOne.length; i++)
			 {
			 var langList=languageListOeByOne[i].substring(languageListOeByOne[i].indexOf("{")+1,languageListOeByOne[i].indexOf("}"));
			 langList=langList.split("#");

			 addLanguage(langList);

			 }

			 for (var j = 0; j< document.getElementById("select1").options.length; j++)
			 {

			 if (document.getElementById("select1").options[j].value == lang)
			 {
				 document.getElementById("select1").options[j].selected = true;
			 break;
			 }
			 }

		}


		}


		}



		/*function addMultiDomainValues(arr)
		{


		var x = document.getElementById("multi_domain");

			for(var i=1;i<arr.length-1;i++){
				var option = document.createElement("option");

				option.value = arr[i];
				option.text =arr[++i];
				x.add(option);
			}
			if(x.options.length == 2)
			{
				x.remove(0);
				multi_domain_id= arr[0];
				multi_domain_value=arr[1];
			}
		}*/

		function addLanguage(arr)
		{



			var x = document.getElementById("select1");

			for(var i=0;i<arr.length-1;i++){
				var option = document.createElement("option");
				option.text =arr[i];
				option.value = arr[++i];
				x.add(option);
			}


		}
		function add(val)
		{

			var dataObj = {language:val};
			$.ajax({
				  url: mainurl+"/getExtentionLables",
				  type:"POST",
				  data:dataObj,
				  success:function(data){

					  data = JSON.parse(data);

					  $('#username').attr("placeholder",data.IFedWebLoginMsgCode0002);
					  $('#password').attr("placeholder",data.IFedWebLoginMsgCode0003);

					  $('#capsalert').html('<img src=images/warn_login_creds.png>'+data.IFedWebLaunchpadMsgCode000165);
					  $('#button').html(data.IFedWebLaunchpadMsgCode00095);
					  $('#cancel').html(data.IFedWebLaunchpadMsgCode00015);
					  $('#signIn').html(data.IFedWebLoginMsgCode0005);


					  $('#err').html(data.IFedWebLaunchpadMsgCode000123);
					  $('#MyApp').html(data.IFedWebLaunchpadMsgCode000122);
					  $('#endUserMyApps').html(data.IFedWebLaunchpadMsgCode000122);
					  $('#adminMyApps').html(data.IFedWebLaunchpadMsgCode000122);
					  $('#lpad').html(data.IFedWebLaunchpadMsgCode0004);

					 $('#logout').html(data.IFedWebLaunchpadMsgCode00099);
					 $('#sd').html(data.IFedWebLaunchpadMsgCode000162);
				  }
				  });

			}


		function changeHandler()
		{

		if(document.getElementById('sxptoggleExtnUsage').checked==true)
						{
						    $("#finishCapture").addClass('finishCapture');
							$("#on_board_style1,#on_board_style2").removeClass('on_board_style');
						    $("#on_board_style1,#on_board_style2").addClass('off_board_style');
	                        $("#on_board_app").show();
							 $("#on_board_app1").show();
							$("#FinishedCapturing").show();
							$(".ftrLnks").hide();
							$("#on_board_app").attr("href",mainurl+"/admin/addApplication?signonoptions=UserIdAndPassword&report=Proceed");
							$("#on_board_app").click(function(){
					        chrome.tabs.create({url: this.href});
					        });
							$("#enduser1").hide();
							$("#FinishedCapturing").show();

	                 }
					 else if(document.getElementById('sxptoggleExtnUsage').checked==false)
						{
						$("#finishCapture").removeClass('finishCapture');
						$("#on_board_style2,#on_board_style1").removeClass('off_board_style');
						$("#on_board_style2,#on_board_style1").addClass('on_board_style');

						$("#err1").hide();
						$("#err2").hide();
						$(".ftrLnks").show();
						$("#on_board_app").hide();
						 $("#on_board_app1").hide();
						$("#FinishedCapturing").hide();
						$("#enduser1").show();
						$("#adminMyApps").show();
						$("#FinishedCapturing").hide();

	                 }







		}
		function CheckBoxInitializaion()
		{
		chrome.storage.local.get('chkBoxChkd', function (result) {


		if(result.chkBoxChkd=="true")
						{
						 $("#finishCapture").addClass('finishCapture');
						$("#on_board_style1,#on_board_style2").removeClass('on_board_style');
						    $("#on_board_style1,#on_board_style2").addClass('off_board_style');


						$("#on_board_app").show();
	                        $("#on_board_app1").show();
							$("#on_board_app").attr("href",mainurl+"/admin/addApplication?signonoptions=UserIdAndPassword&report=Proceed");
							$("#on_board_app").click(function(){
					        chrome.tabs.create({url: this.href});
					        });
							$("#enduser1").hide();
							$(".ftrLnks").hide();
							$("#FinishedCapturing").show();

	                 }
					 else if(result.chkBoxChkd=="false")
						{
						$("#finishCapture").removeClass('finishCapture');
						$("#on_board_style2,#on_board_style1").removeClass('off_board_style');
						$("#on_board_style2,#on_board_style1").addClass('on_board_style');


						$("#err1").hide();
						$("#err2").hide();
						$("#on_board_app").hide();
						$("#on_board_app1").hide();
						$("#FinishedCapturing").hide();
						$("#enduser1").show();
						$("#adminMyApps").show()
						$(".ftrLnks").show();;

							document.getElementById('admin').style.display = 'block';
							document.getElementById('adminMyApps').style.display = 'block';

	                 }
					   });
		}
		function doSSO(e)
	{
			 e.preventDefault();
			var userTypeAndLoggedInUserName =checkUserLogin();

			var userType=JSON.parse(userTypeAndLoggedInUserName);

			if((userType.cbs==false||this.brPref=="undefined"||this.brPref=="default") && this.applicationType != "ThickClient")
				{


	chrome.tabs.create({url: this.bookMarkUrl});
				}
			else if((userType.cbs==true&&this.brPref!="undefined") || this.applicationType == "ThickClient")
				{
					// @this.MFACheck {String}
					if (this.applicationType != "ThickClient" || (this.applicationType == "ThickClient" && this.MFACheck === "false")) {
		    			var bPrefandBmarkResp=this.brPref+"<SXP_DELIM>"+this.bookMarkUrl;
						var s1 = new XMLHttpRequest;
						s1.open("POST",cbsUrl+"/launchBookmark",true);
						s1.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
						s1.send(bPrefandBmarkResp);
						s1.onreadystatechange = function()
						{
							if (s1.readyState != 4 && s1.status == 200) {
						    } else if (s1.readyState == 4 && s1.status == 200) {
						    	if(s1.responseText=="error")
						    		{
						    		 alert("Application could not be launch. Please contact your administrator.");
						    		}
						    	
						    } else {
						        alert("Could not communicate with agent. Please contact your Administrator.");
						    }
						}
					} else {
						chrome.tabs.create({url: this.appLevelMfaBookMarkUrl});
					}
				}


	}

	function goToLaunchpad()


	{
	chrome.tabs.create({url: this.href});


	}


	function logoutfun()


	{
		var userTypeAndLoggedInUserName =checkUserLogin();
		var userType=JSON.parse(userTypeAndLoggedInUserName);
		if(true || userType.cbs==true)
			{
			$.ajax({
	            url:cbsUrl+"/invalidate",

	            type: 'POST',
	            data: {},
	            async: false,
	            success: function(data) {
				}
	        });
			extensionAppData = null;
			}
		if(userType.amStatus==true)
		{
		chrome.storage.local.set({'chkBoxChkd': "false"}, function() {});
	$.ajax({
	    url:mainurl+"/logoutAmExtensions",

	    type: 'POST',
	    data: {},
	    async: false,
	    success: function(data) {
	    	try{
	    	if(userType.amLogoutStatus==true)
	    		{
	    	      $.ajax({
	                             url:userType.amLogoutUrl,
				                  type: 'get',
				                  data: {},
				                  async: false,
				                  success: function(data) {
	    		                           }
	                   });
	    		}
	    	}catch(e){}
		}

	  });

	}
	chrome.storage.local.set({'chkBoxChkd': "false"}, function() {});
		var xhr = new XMLHttpRequest();
		xhr.open("Get",mainurl+"/logout", false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send();
		xhr.onload = function()
		{
			if(this.status == 200)
			{

			}
		}

		window.close();
	}
	function checkUserLogin()
	  {
		  var data1;

	            $.ajax({
	            url:mainurl+"/checkuserlogin",

	            type: 'POST',
	            data: {},
	            async: false,
	            success: function(data) {
				if(isJson(data)){
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
          url:mainurl+"/customer/getExtensionApps",

          type: 'GET',
          data: {},
          async: false,
          success: function(data) {

			data1 = data;

				if(!flag) {
					if (true || extensionAppData != JSON.stringify(data)) {
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
	function capLock(e){
		 kc = e.keyCode?e.keyCode:e.which;
		 sk = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
		 if(((kc >= 65 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk))
		  document.getElementById('capsalert').style.display = 'block';
		 else
		  document.getElementById('capsalert').style.display = 'none';
		}
	function AmClick()
	{
		chrome.tabs.create({url:mainurl});

	}
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
	function extensionOnBoardingMode()
	{

	var tempStatus = "";
	if(document.getElementById('sxptoggleExtnUsage').checked == true)
	{

		 chrome.runtime.sendMessage({sxpExtn: "YES"}, function(response) {});
		 tempStatus = "true";
		 chrome.storage.local.set({'chkBoxChkd': tempStatus}, function() {});

	}
	else
	{

	   chrome.runtime.sendMessage({sxpExtn: "NO"}, function(response) {});
	   tempStatus = "false";
	   chrome.storage.local.set({'chkBoxChkd': tempStatus}, function() {});
	}


	}
	function addLaunchPadLink()
	{
	var launchpadurl = document.createElement("a");
	launchpadurl.id = "lpad";
	launchpadurl.href = mainurl+"/customer/launchpad";
	launchpadurl.innerHTML = "Launchpad";
	launchpadurl.addEventListener("click", goToLaunchpad);
	$('#lhPd').append(launchpadurl);
	}
	function addLogoutLink()
	{
	var logout = document.createElement("a");
							logout.id = "logout";
							logout.href = "logout";
							logout.innerHTML = "Logout";
							var z=$("#select1").val();

							var dataObj = {language:z};
							$.ajax({
								  url: mainurl+"/getExtentionLables",
								  type:"POST",
								  data:dataObj,
								  success:function(data){

									  data = JSON.parse(data);
									  $('#lpad').html(data.IFedWebLaunchpadMsgCode0004);
									  logout.innerHTML= "logout";
									$('#logout').html(data.IFedWebLaunchpadMsgCode00099);
								  }
								  });
							logout.addEventListener("click", logoutfun);
							$('#lgT').append(logout);


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

