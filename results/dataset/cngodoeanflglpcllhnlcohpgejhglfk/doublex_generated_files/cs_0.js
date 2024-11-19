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




