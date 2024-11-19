var mainurl='https://sso.infinitiretail.com/MiddlewareRestServices';
var cbsUrl='http://127.0.0.1:7070';
var isCBSEnabled = false;
var languageListOeByOne;
var multi_domain_value='';
var multi_domain_id='';
var extensionAppData = null;
var task={};
var appName={};
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
var tid=tab.id;
var userTypeAndLoggedInUserName =checkUserLogin();
var userType=JSON.parse(userTypeAndLoggedInUserName);
if(userType.userType == "user" || userType.userType=="admin")
{
	chrome.browserAction.setIcon({path: 'icon1.png'});
try{

chrome.storage.local.get('js', function (result) {
	if(result.js!="NoData")
		{
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
											 ($.trim(AppList.content[j].appName)==$.trim(decodeURIComponent(appName[tab.id]))||appName[tab.id]==""||appName[tab.id]==undefined))
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
					                          	xhr3.open("POST",mainurl+"/customer/getAppCredsBasedOnSearch", true);
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


															  chrome.tabs.sendMessage(tabid, {msg: "testSSO",js:CredsAndJsJSON},function(response){});
															}
															}catch(e){}
															 chrome.storage.local.get('chkBoxChkd', function (result) {

															 try{
															 if(result.chkBoxChkd=="undefined"||result.chkBoxChkd==undefined)
															 {
															 result.chkBoxChkd=="false";
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
	else if(request.statMsg1234 == "sxpMultiFactorToken")
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
			var userType = JSON.parse(userTypeAndLoggedInUserName);
	        var xhrGetToken = new XMLHttpRequest();
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
