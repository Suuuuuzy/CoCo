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
