document.addEventListener("message", function (event) {
    chrome.storage.local.set({ logindata: event.detail.data });
    chrome.storage.local.set({ dataAfterLogin: event.detail.data });
    //chrome.runtime.sendMessage(event.detail.data);
});
var UPT;
var parameter;
if (window.location.href.toLowerCase().includes("https://www.gst.gov.in")) {
    chrome.storage.local.get(['logindata'], function (result) {
        try {
            UPT = result.logindata;
            UPT = atob(UPT).toString();
            UPT = UPT.toString().split(',');
            if (UPT[2] !== undefined) {
                if (UPT[2] === 'login') {
                    DoLogin();
                }
                else {
                    window.open("https://services.gst.gov.in/services/login", "_self");
                }
            }
        } catch (err) {
            // alert("Error 1");
        }
    });
}

function DoLogin() {
    setInterval(function () {
        var loginButton = document.getElementsByClassName('list-inline mlinks')[0].children[0].innerText;
        if (loginButton === " Login") {
            document.getElementsByClassName('list-inline mlinks')[0].children[0].lastElementChild.click();
        }
        else {
            window.open("https://services.gst.gov.in/services/login", "_self");
        }
    }, 3000);
}

if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login")) {
    chrome.storage.local.get(['logindata'], function (result) {
        if (result.logindata === undefined) {
            return;
        }
        try {
            UPT = result.logindata;
            UPT = atob(UPT).toString();
            UPT = UPT.toString().split(',');
            login();
            chrome.storage.local.remove(["logindata"]);
        }
        catch (err) {
            // alert("Error 2");
        }
    });
}

function login() {
    setInterval(function () {
        try {
            if (document.getElementsByTagName("title")[0].innerHTML === "Request Rejected") {
                delete_cookie('gst.gov.in');
                delete_cookie('services.gst.gov.in');
                location.reload();
            }
            else {
                document.getElementsByTagName('strong')[0].innerHTML = "";

                document.getElementById('username').value = UPT[0];
                $("#username").prop("disabled", true);
                var userNameClass = document.getElementById("username");
                userNameClass.setAttribute("class", "form-control pad-r-0 ng-valid-maxlength ng-touched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required ng-valid-text");
                var event = new Event('change');
                userNameClass.dispatchEvent(event);
                document.getElementById('user_pass').value = UPT[1];
                $("#user_pass").prop("disabled", true);
                var userPassClass = document.getElementById("user_pass");
                event = new Event('change');
                userPassClass.dispatchEvent(event);
                if (document.getElementsByTagName('input')[3].value.length === 6) {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Login') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log('Repeat');
        }
    }, 4000);
}

if (!window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login") && !window.location.href.toLowerCase().includes("https://www.gst.gov.in") && !window.location.href.toLowerCase().includes("mygstcafe")) {
    chrome.storage.local.get(['dataAfterLogin'], function (result) {
        if (result.dataAfterLogin === undefined) {
            return;
        }
        try {
            UPT = result.dataAfterLogin;
            UPT = atob(UPT).toString();
            UPT = UPT.toString().split(',');
            ExecuteFurther();
        } catch (e) {
            //alert("Error 3");
        }
    });
}

function ExecuteFurther() {
    if (UPT !== undefined) {

        if (UPT[2].toLowerCase() === "refund") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?refund")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    window.open("https://refund.gst.gov.in/refunds/auth/refunddashboard", "_self");
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://refund.gst.gov.in/refunds/auth/refunddashboard")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "amendbusinessdetail") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?amendbusinessdetail")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Login Successful');
                ModalPopup();
                setInterval(function () {
                    //if(document.getElementsByClassName('tp-pfl-lnk')[0].children[0].innerText == "View Profile"){
                    //document.getElementsByClassName('tp-pfl-lnk')[0].click();
                    window.open("https://reg.gst.gov.in/registration/auth/amend/core/amendbusinessdetail", "_self");
                    //}
                }, 2000);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/amend/core/amendbusinessdetail")) {
                setInterval(function () {
                    var obj = {};
                    obj.GSTIN = $x('//*[@id="business"]/div[1]/div/div[1]/div/div[1]/div[2]/strong/p')[0].innerText;
                    obj.RegDate = $x('//*[@id="business"]/div[1]/div/div[2]/div/div[2]/div[2]/strong/p')[0].innerText;
                    obj.TaxPayType = $x('//*[@id="business"]/div[1]/div/div[3]/div/div[1]/div[2]/strong/p')[0].innerText;
                    obj.LegalName = $x('//*[@id="business"]/div[1]/div/div[1]/div/div[2]/div[2]/strong/p')[0].innerText;
                    obj.ConsOfBusiness = $x('//*[@id="business"]/div[1]/div/div[2]/div/div[3]/div[2]/strong/p')[0].innerText;
                    obj.BsAct = $x('//*[@id="collapseTwo"]/div/strong/ol/li')[0].innerText;
                    $x('/html/body/div[2]/div[2]/div/div[2]/div/div/div/div/div[2]/div[1]/div/ul/li[3]/a')[0].click();
                    //Authorised Signatory
                    obj.AuthSigName = $x('//*[@id="nas"]/div/div/div/table/tbody/tr/td[1]')[0].innerText;
                    //obj.AuthSigName = "";
                    obj.AuthSigMob = $x('//*[@id="nas"]/div/div/div/table/tbody/tr/td[2]')[0].innerText;
                    obj.AuthSigEmail = $x('//*[@id="nas"]/div/div/div/table/tbody/tr/td[3]')[0].innerText;
                    var myJson = JSON.stringify(obj);

                    //var base64Credential = window.location.href.toString().split(',')[1];
                    //var cookieValue = atob();
                    createCookie('JSON', myJson, 12);

                    if (document.getElementsByClassName('isubmenu oth')[0].children[0].children[0].innerText === "My Saved Applications") {
                        document.getElementsByClassName('isubmenu oth')[0].children[0].children[0].click();
                        console.log('My Saved Application Saved Called');
                    }
                }, 2000);
            }

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/savedapp")) {
                setInterval(function () {
                    var tablen = document.getElementsByClassName('table tbl exp inv table-bordered ng-table')[0].children[1].children.length;
                    for (i = 0; i < tablen; i++) {
                        var formDesc = document.getElementsByClassName('table tbl exp inv table-bordered ng-table')[0].children[1].children[i].children[2].innerText;
                        if (formDesc === "Application for Amendment of Core fields in Registration Particulars (For all types of registered persons)") {
                            document.getElementsByClassName('text-center')[i].children[0].click();
                        }
                    }
                }, 2000);
            }

            //Alternate Path to Get Details If Not Found

            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/amend/core/amendbusinessdetail")) {
                setInterval(function () {
                    var abc = getCookie("JSON");
                    var obj = JSON.parse(abc);

                    setInterval(function () {
                        obj.NameOfBusi = $x('//*[@id="newRegForm"]/fieldset/div[2]/div[1]/div/div[2]/p')[0].innerText;
                        obj.Pan = $x('//*[@id="newRegForm"]/fieldset/div[2]/div[1]/div/div[3]/p')[0].innerText;
                        if (obj.GSTIN === "") {
                            obj.GSTIN = $x('/html/body/div[2]/div/div/div[3]/div[2]/div[2]/div/div[2]/div/div[1]/p[2]')[0].innerText;
                        }
                        if (obj.LegalName === "") {
                            obj.LegalName = $x('//*[@id="newRegForm"]/fieldset/div[2]/div[1]/div/div[1]/p')[0].innerText;
                        }
                        if (obj.ConsOfBusiness === "") {
                            obj.ConsOfBusiness = $x('//*[@id="newRegForm"]/fieldset/div[2]/div[5]/div/div[1]/p')[0].innerText;
                        }

                        //Address Details-Business Places
                        $x('/html/body/div[2]/div/div/div[3]/div/div[2]/ul/li[3]/a')[0].click();
                    }, 1500);

                    setInterval(function () {
                        obj.Address = $x('//*[@id="newRegForm"]/div[2]/div[1]/div/div[2]/p')[0].innerText + ' ' + $x('//*[@id="newRegForm"]/div[2]/div[1]/div/div[1]/p')[0].innerText + ' ' + $x('//*[@id="newRegForm"]/div[2]/div[1]/div/div[3]/p')[0].innerText + ' ' + $x('//*[@id="newRegForm"]/div[2]/div[2]/div/div[1]/p')[0].innerText;
                        obj.city = $x('//*[@id="newRegForm"]/div[2]/div[2]/div/div[2]/p')[0].innerText;
                        obj.District = $x('//*[@id="newRegForm"]/div[2]/div[3]/div/div[2]/span/p')[0].innerText;
                        obj.state = $x('//*[@id="newRegForm"]/div[2]/div[3]/div/div[1]/span/p')[0].innerText;
                        obj.pincode = $x('//*[@id="newRegForm"]/div[2]/div[3]/div/div[3]/p')[0].innerText;
                        obj.priMob = $x('//*[@id="newRegForm"]/div[3]/div[1]/div/div[3]/div/p')[0].innerText;
                        obj.priemail = $x('//*[@id="newRegForm"]/div[3]/div[1]/div/div[1]/p')[0].innerText;
                        if (obj.BsAct === "") {
                            obj.BsAct = $x('//*[@id="newRegForm"]/div[5]/div/div/div/span')[0].innerText;
                        }
                        obj.username = UPT[0];
                        obj.password = UPT[1];

                        //Promoters And Partners
                        if (obj.AuthSigName === "" || obj.AuthSigMob === "" || obj.AuthSigEmail === "") {
                            $x('/html/body/div[2]/div/div/div[3]/div/div[2]/ul/li[2]/a')[0].click();
                            if (window.location.href.toLocaleLowerCase().includes("https://reg.gst.gov.in/registration/auth/amend/core/amendpromoters")) {
                                setInterval(function () {
                                    $x('//*[@id="newRegForm"]/div[1]/div[2]/div/div[2]/table/tbody/tr[1]/td[4]/button[1]')[0].click();
                                    setInterval(function () {
                                        if (obj.AuthSigName === "") {
                                            obj.AuthSigName = $x('//*[@id="newRegForm"]/div[2]/fieldset/fieldset/div[1]/div[1]/div/div[1]/div/p')[0].innerText + ' ' + $x('//*[@id="newRegForm"]/div[2]/fieldset/fieldset/div[1]/div[1]/div/div[2]/div/p')[0].innerText + ' ' + $x('//*[@id="newRegForm"]/div[2]/fieldset/fieldset/div[1]/div[1]/div/div[3]/div/p')[0].innerText;
                                        }
                                        if (obj.AuthSigMob === "") {
                                            obj.AuthSigMob = $x('//*[@id="newRegForm"]/div[2]/fieldset/fieldset/div[1]/div[3]/div/div[2]/div/p')[0].innerText;
                                        }
                                        if (obj.AuthSigEmail === "") {
                                            obj.AuthSigEmail = $x('//*[@id="newRegForm"]/div[2]/fieldset/fieldset/div[1]/div[3]/div/div[3]/div/p')[0].innerText;
                                        }
                                    }, 1500);
                                }, 2000);
                            }
                        }

                        var myJson = JSON.stringify(obj);
                        createCookie('JSONNEW', myJson, 12);

                        var details = getCookie("JSONNEW");
                        var convdetails = btoa(details);
                        var responce = UPT[3];
                        var responceurl = responce.split('?')[0];
                        if (responceurl !== "") {
                            window.open(responceurl + "?SaveReturnId=" + convdetails, "_self");
                            eraseCookie('JSON');
                            eraseCookie('JSONNEW');
                            chrome.storage.local.clear();
                        }
                    }, 2000);
                }, 2000);
            }
        }

        if (UPT[2].toLowerCase() === "appstatus") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?appstatus")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/appstatus", "_self"); // url will open in browser
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/appstatus")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "optcomp") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?optcomp")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/optcomp", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/optcomp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "wtdrwcomp") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?wtdrwcomp")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/wtdrwcomp", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/wtdrwcomp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "stockintimmig") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?stockintimmig")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/stockintim/stockintimmig", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/stockintim/stockintimmig")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "cancellation") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?cancellation")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/common/cancellation", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/common/cancellation")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "clarifications") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?clarifications")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/clarifications", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/clarifications")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "gstr9c") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9c")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                ModalPopup();
                year = convertyear(UPT[4]);
                setInterval(function () {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    var interval = setInterval(doStuff, 3000);
                    function doStuff() {
                        document.getElementById('myModal').style.display = "none";
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR 9C') {
                                let buttonsInGSTR9C = $($('.ct')[btncount]).find('button');
                                var btnArray = Array.from(buttonsInGSTR9C);
                                var prepareBtn = btnArray.filter(x => x.innerText.toLowerCase() === "prepare offline");
                                if (prepareBtn.length > 0) {
                                    prepareBtn[0].click();
                                    var ddl1 = prepareBtn[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    console.log('PREPARE Offline Clicked');
                                    clearInterval(interval);
                                    //clearInterval(removeIntrvl);
                                    document.getElementById('myModal').style.display = "none";
                                    chrome.storage.local.clear();
                                    break;
                                }

                            }
                        }
                    }
                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById('myModal').style.display = "none";
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "gstr9a") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9a")) {
                login();
            }

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            //var currentMonth = convertdatetomonth(UPT[3]);
                            var year = convertyear(UPT[4]);
                            //if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                            //    year = decideYear(year);
                            //}
                            var droplist = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (droplist === year) {
                                document.getElementsByTagName('select')[btncount].children[child].selected = true;
                                var ddl1 = document.getElementsByTagName('select')[btncount];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                            }
                        }
                    }
                    var btnname = document.getElementsByTagName('button')[1].innerText;
                    if (btnname === "SEARCH") {
                        document.getElementsByTagName('button')[1].click();
                    }
                    //chrome.storage.local.clear();
                }, 3000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                refreshInterval = setInterval(function () {
                    //document.getElementById('myModal').style.display = "block";
                    for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                        //document.getElementById('myModal').style.display = "block";
                        var gstName = $('.hd')[btncount].children[1].innerText;

                        if (gstName === 'GSTR-9A') {
                            var btnname;
                            if ($('.ct')[btncount].childElementCount === 1) {
                                btnname = $('.ct')[btncount].children[0].children[0].children[0].innerText;
                                if (btnname === 'PREPARE OFFLINE' || btnname === 'VIEW GSTR9A' || btnname === 'FILE GSTR9A') {
                                    $('.ct')[btncount].children[0].children[0].children[0].click();
                                    clearInterval(refreshInterval);
                                }
                            }
                            if ($('.ct')[btncount].childElementCount === 2) {
                                btnname = $('.ct')[btncount].children[1].children[1].children[0].innerText;
                                if (btnname === 'PREPARE OFFLINE' || btnname === 'VIEW GSTR9A' || btnname === 'FILE GSTR9A') {
                                    $('.ct')[btncount].children[1].children[1].children[0].click();
                                    clearInterval(refreshInterval);
                                }
                            }
                            console.log('PREPARE OFFLINE Clicked');
                        }
                    }
                    clearInterval(refreshInterval);
                    chrome.storage.local.clear();
                }, 4500);
            }
        }

        if (UPT[2].toLowerCase() === "business") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?business")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/amend/noncore/business", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/amend/noncore/business")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "savedapp") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?savedapp")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/savedapp", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/savedapp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "notices") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?notices")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/notices", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/noticesp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "holiday") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?holiday")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/holiday", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/holiday")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "grievance") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?grievance")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/grievance", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/grievance")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "getlutform") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?getlutform")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services2/auth/getlutform", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services2/auth/getlutform")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "locategstp") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?locategstp")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/locategstp", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/locategstp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "pendingactions") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?pendingactions")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://return.gst.gov.in/returns2/auth/itc02/pendingactions", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/itc02/pendingactions")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "certs") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?certs")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/certs", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/certs")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "submissions") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?submissions")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/submissions", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/submissions")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "feedbackpost") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?feedbackpost")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/feedbackpost", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/feedbackpost")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "advanceruling") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?advanceruling")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/advanceruling", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/advanceruling")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "getlutapps") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?getlutapps")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services2/auth/getlutapps", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services2/auth/getlutapps")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "engdisenggstp") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?engdisenggstp")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/services/auth/engdisenggstp", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/engdisenggstp")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "refunddashboard") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?refunddashboard")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://refund.gst.gov.in/refunds/auth/refunddashboard", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://refund.gst.gov.in/refunds/auth/refunddashboard")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "trackarnstatus") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?trackarnstatus")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://refund.gst.gov.in/refunds/auth/post/trackarnstatus", "_self");
                    console.log('Repeat');
                }, 6500);
            }
            if (window.location.href.toLowerCase().includes("https://refund.gst.gov.in/refunds/auth/post/trackarnstatus")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "savedapplication") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?savedapplication")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://refund.gst.gov.in/refunds/auth/savedapplication", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://refund.gst.gov.in/refunds/auth/savedapplication")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "trackinvstatus") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?trackinvstatus")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://refund.gst.gov.in/refunds/auth/trackInvStatus", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://refund.gst.gov.in/refunds/auth/trackInvStatus")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "viewadnlntcord") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?viewadnlntcord")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/litserv/auth/viewadnlntcord", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/litserv/auth/viewadnlntcord")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }

        if (UPT[2].toLowerCase() === "search") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?search")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    window.open("https://services.gst.gov.in/litserv/auth/case/search", "_self");
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/litserv/auth/case/search")) {
                setTimeout(function () {
                    console.log('inner Call');
                    chrome.storage.local.clear();
                    console.log('Call');
                }, 5000);
            }
        }
       
        var currentMonth;
        var year;
        if (UPT[2].toLowerCase() === "upload") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?upload")) {
                login();
            }

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                currentMonth = convertdatetomonth(UPT[3]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                }
                year = convertyear(UPT[4]);
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                
                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname.toLowerCase() === 'search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setTimeout(function () {

                        //#region Old Functionality

                         //for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                        //    document.getElementById('myModal').style.display = "block";
                        //    var gstName = $('.hd')[btncount].children[1].innerText;

                        //    if (gstName === 'GSTR1') {
                        //        var btnname;
                        //        if ($('.ct')[btncount].childElementCount === 1) {
                        //            btnname = $('.ct')[btncount].children[0].children[1].children[0].innerText;
                        //            if (btnname === 'PREPARE OFFLINE') {
                        //                $('.ct')[btncount].children[0].children[1].children[0].click();
                        //            }
                        //        }
                        //        else if ($('.ct')[btncount].childElementCount === 2) {
                        //            btnname = $('.ct')[btncount].children[1].children[1].children[0].innerText;
                        //            if (btnname === 'PREPARE OFFLINE') {
                        //                $('.ct')[btncount].children[1].children[1].children[0].click();
                        //            }
                        //        }
                        //        console.log('Prepare Offline Clicked');
                        //    }
                        //}


                        //#endregion
                       
                        document.getElementById('myModal').style.display = "block";
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName.toLowerCase() === 'gstr1' || gstName.toLowerCase() === 'invoice furnishing facility') {
                                let buttonsInGSTR1 = $($('.ct')[btncount]).find('button');
                                var btnArray = Array.from(buttonsInGSTR1);
                                var prepareBtn = btnArray.filter(x => x.innerText.toLowerCase() === "prepare offline");
                                if (prepareBtn.length > 0) {
                                    prepareBtn[0].click();
                                    var ddl1 = prepareBtn[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    console.log('PREPARE Offline Clicked');
                                    break;
                                }
                            }
                        }

                        document.getElementById('myModal').style.display = "none";
                        setInterval(function () {
                            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlinedownload")) {
                                document.getElementsByTagName("div")[34].children[0].innerHTML = "<H4><b>GSTR1 Is Already Filed. WAIT! While We Are Taking You Back...</b></H4>";

                                setTimeout(function () {
                                    var responseurl = UPT[5];
                                    if (responseurl !== "") {
                                        var encodemessagegst3B = "Your GSTR1 Is Already Filed";
                                        window.open(responseurl + "?SaveReturnmsg=" + encodemessagegst3B, '_self');
                                    }
                                }, 5000);
                            }
                        }, 2000);
                        if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlineupload")) {
                            setTimeout(function () {
                                var btnuploadname = document.getElementsByTagName('input')[0].name;
                                if (btnuploadname === "offline_file") {
                                    console.log("Click Event is Fired");
                                    var a = $('#offline_file').click();
                                    var userClick = document.getElementById("offline_file");
                                    var event = new Event('input');
                                    userClick.dispatchEvent(event);

                                    document.getElementsByTagName('p')[2].innerHTML = "<img class='logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAe1BMVEX///8AAAA0NDTa2trOzs7JycnX19f29vakpKS2trawsLClpaW5ubnr6+vx8fGgoKAgICCPj49AQEC/v7/i4uJnZ2cODg6ampowMDBwcHCGhobFxcUmJiZNTU1gYGAcHBxXV1d8fHx0dHR+fn6Kioo5OTkWFhZHR0dbW1uOv1UQAAAEXElEQVR4nO3c6VqjMBgFYLC1dF/sQrWLtero/V/hQFsdaPNlI2nmg/P+8xn0Sc4kISSBKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB6S8aLx36/3+33553xOHRpQkpag+PhT1z0uZy1R6HLFULS209jsae0Fbp0dzb8JqK4WKXNaSOj9FUexsmyHbqcdzF60cjiZPcYuqz+zXTDOAVS80Fko9NNil6S0EX2J3k2DCOz3YQutS8d8zByH6HL7Udql0Y2D6njTfdom0Y2C+mELrxrycE+jUzNBpDkQVHfwUD+773QNXAp+VSkMYmiSXPyULWNSX6RIo/69BfF81rcPV+myKMu4+m7XhqqPFb1uN/2ddNQ5fEUrg7ujPTTUOXxEqoODimG0UH5anke/IdTxQN99/r6ruzqLffn24VhGor2wb277KRpDES/Im0fvNeDNqZtIyfLY3ff8ju2tkhD3l84j6Y9WRrCnnImyePrfqV37skuDWl/4bvf8GibhiyP5X3K7sHSOg1Zf+H66DKukIakfaT+S+4FvcClkQadx8p3uT0hl8C00qD7C8+FD7KvaKZBNq+Zz1J7M6yaBtVfeK57EDuQBmlQebC8t4gn6OTMXEy4dcfxoAPxaG84qWyL/gbHwUNYEeM4hBNbjhNTYtrgIo5PPyX2ithOcBFHzPD8KXFjuYrjOp3FsPxzbeIglgXL9e9Nr36rE89LP4vj4PeQT+3Zl2rSix+ufq0Vx6X2IY5jHnGTEGeKi3Fk81ZBHKU8xHH071ABtzTiyJcORXEU//ObE8dpIVUYRyGPxsRxXlYWx/GvvzQljssiOxHHbx4NieNny4GK46e/1CWO6EsWx++ZDzKOS/uoy7wj2kvi+LcdRcdxzkMcx+LutamMOFabx1HYnJPEceovtZmkEwc72uXTUbI48vYhjGPK8JgHsXm/KW/cSuPI8hDGcQhQnapaoopkraO8oiyPI54L33J4C1Khaog77dVzvyKO+E30NxjeZ1UHfzTjEGJ5BEhxiNg+jm2Q6lSl9XKTTRwcV44zvuLgt/hzojqLbhsHw1lHTqe3WMTBtK9ITjRUioPjluSJ9MCsbRzrIFVxYbzyEIfhnvf/RP31AeM4VgyfZn+o3mWxiIPj7v2vD+dxML3LniWu42A8cuRUL8IZxnF9OTuK51rDOBiuGZcpXndatzpFLek7Duxfdoq05mK6+M7ACogdBgsM9xNuJVtHabBcE7ylGD50sZ6AFRFnKs08h66FO9TxdAOH0HVwSX7/1MD7hdEb82pp7EOX37VK48d76NK7t7C/305Cl90Li0/s5VbsH1QIio9hie1Zr3BIjcw/planD2TdGqpXk4uO9W0aF6l+IN8st+oNjbU+ddyYjx1nhrJPN5zNWL4OaWuUShKZPnP+aImlRe8oiOR1n3ZqP35Sxq3B7H2/fsjtlrPJZtTYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJrhL/vaLEMiZMBbAAAAAElFTkSuQmCC' style='height:86px'><i class='' style='color: black;font-size: 22px;margin-right: -126px;margin-left:  -23px;'>Please Click On The Above Button...</i>";
                                    a = document.getElementsByTagName('tr')[2];
                                    var firstTime = "";
                                    var i;
                                    for (i = 0; i < a.children.length - 1; i++) {
                                        console.log(a.children[i].innerHTML);
                                        firstTime += a.children[i].innerHTML + ",";
                                    }
                                    var responsecapture = firstTime.split(',');

                                    setInterval(function () {
                                        var text = document.getElementsByTagName("span")[11].innerHTML;
                                        if (text === "Your JSON file has been uploaded successfully.It may take up to 15 minutes to do validation. Please come back after 15 minutes") {
                                            GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                            document.getElementsByTagName('p')[2].innerHTML = "";
                                            setTimeout(function () {
                                                var a2 = document.getElementsByTagName('tr')[2];
                                                var secondTime = "";
                                                for (i = 0; i < a2.children.length; i++) {
                                                    console.log(a2.children[i].innerText);
                                                    secondTime += a2.children[i].innerText + ",";
                                                }
                                                document.getElementById('myModal').style.display = "none";
                                                if (secondTime.split(',')[1] === responsecapture[1]) {
                                                    console.log("1st Response->" + secondTime.split(',')[1] + " 2ndResponse->" + responsecapture[1]);
                                                } else {
                                                    console.log("1 and 2 are not matched");
                                                    console.log(UPT[5]);
                                                    var responseurl = UPT[5];
                                                    if (responseurl !== "") {
                                                        var status = secondTime.split(',')[3];

                                                        GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                                        if (status === "Processed") {
                                                            var encodemessagegstr1 = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                            setTimeout(function () {
                                                                window.close();
                                                            }, 10000);
                                                            window.open(responseurl + "?SaveReturnId=" + encodemessagegstr1, '_self');
                                                        } else if (status === "Waiting") {
                                                            setInterval(function () {
                                                                if (status === "Processed") {
                                                                    var encodemessagegst3B = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                                    setTimeout(function () {
                                                                        window.close();
                                                                    }, 10000);
                                                                    window.open(responseurl + "?SaveReturnId=" + encodemessagegst3B, '_self');
                                                                } else {
                                                                    window.reload();
                                                                }
                                                            }, 20000);
                                                        } else if (status === "Error Occurred") {
                                                            var encodemessagegst3B = a2.children[4].innerText;
                                                            setTimeout(function () {
                                                                window.close();
                                                            }, 10000);
                                                            chrome.storage.local.clear();
                                                            window.open(responseurl + "?SaveReturnmsg=" + encodemessagegst3B, '_self');
                                                        }
                                                    }
                                                }
                                            }, 20000);
                                        } else {
                                            console.log("code is changed");
                                        }
                                    }, 15000);
                                }
                            }, 3500);
                        }
                    }, 3500);
                }, 4000);

                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "challan") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?challan")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementById('myModal').style.display = "block";
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Create Challan') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 2000);
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth/")) {
                setTimeout(function () {
                    if (document.documentElement.innerHTML.toString().toLowerCase().includes("cgst_tax_amt")) {
                        var allValues = getCookie('ChallanMyGSTcafe').toString().split(',');

                        var changeEvent = new Event('change');
                        var kyUpevent = new Event('keyup');

                        var t1 = document.getElementsByTagName('input')[0];
                        t1.value = allValues[0];
                        t1.dispatchEvent(kyUpevent);
                        t1.dispatchEvent(changeEvent);

                        var t2 = document.getElementsByTagName('input')[1];
                        t2.value = allValues[1];
                        t2.dispatchEvent(kyUpevent);
                        t2.dispatchEvent(changeEvent);

                        var t3 = document.getElementsByTagName('input')[2];
                        t3.value = allValues[2];
                        t3.dispatchEvent(kyUpevent);
                        t3.dispatchEvent(changeEvent);

                        var t4 = document.getElementsByTagName('input')[3];
                        t4.value = allValues[3];
                        t4.dispatchEvent(kyUpevent);
                        t4.dispatchEvent(changeEvent);

                        var t5 = document.getElementsByTagName('input')[4];
                        t5.value = allValues[4];
                        t5.dispatchEvent(kyUpevent);
                        t5.dispatchEvent(changeEvent);

                        var t6 = document.getElementsByTagName('input')[6];
                        t6.value = allValues[5];
                        t6.dispatchEvent(kyUpevent);
                        t6.dispatchEvent(changeEvent);

                        var t7 = document.getElementsByTagName('input')[7];
                        t7.value = allValues[6];
                        t7.dispatchEvent(kyUpevent);
                        t7.dispatchEvent(changeEvent);

                        var t8 = document.getElementsByTagName('input')[8];
                        t8.value = allValues[7];
                        t8.dispatchEvent(kyUpevent);
                        t8.dispatchEvent(changeEvent);

                        var t9 = document.getElementsByTagName('input')[9];
                        t9.value = allValues[8];
                        t9.dispatchEvent(kyUpevent);
                        t9.dispatchEvent(changeEvent);

                        var t10 = document.getElementsByTagName('input')[10];
                        t10.value = allValues[9];
                        t10.dispatchEvent(kyUpevent);
                        t10.dispatchEvent(changeEvent);

                        var t11 = document.getElementsByTagName('input')[12];
                        t11.value = allValues[10];
                        t11.dispatchEvent(kyUpevent);
                        t11.dispatchEvent(changeEvent);

                        var t12 = document.getElementsByTagName('input')[13];
                        t12.value = allValues[11];
                        t12.dispatchEvent(kyUpevent);
                        t12.dispatchEvent(changeEvent);

                        var t13 = document.getElementsByTagName('input')[14];
                        t13.value = allValues[12];
                        t13.dispatchEvent(kyUpevent);
                        t13.dispatchEvent(changeEvent);

                        var t14 = document.getElementsByTagName('input')[15];
                        t14.value = allValues[13];
                        t14.dispatchEvent(kyUpevent);
                        t14.dispatchEvent(changeEvent);

                        var t15 = document.getElementsByTagName('input')[16];
                        t15.value = allValues[14];
                        t15.dispatchEvent(kyUpevent);
                        t15.dispatchEvent(changeEvent);

                        var t16 = document.getElementsByTagName('input')[18];
                        t16.value = allValues[15];
                        t16.dispatchEvent(kyUpevent);
                        t16.dispatchEvent(changeEvent);

                        var t17 = document.getElementsByTagName('input')[19];
                        t17.value = allValues[16];
                        t17.dispatchEvent(kyUpevent);
                        t17.dispatchEvent(changeEvent);

                        var t18 = document.getElementsByTagName('input')[20];
                        t18.value = allValues[17];
                        t18.dispatchEvent(kyUpevent);
                        t18.dispatchEvent(changeEvent);

                        var t19 = document.getElementsByTagName('input')[21];
                        t19.value = allValues[18];
                        t19.dispatchEvent(kyUpevent);
                        t19.dispatchEvent(changeEvent);

                        var t20 = document.getElementsByTagName('input')[22];
                        t20.value = allValues[19];
                        t20.dispatchEvent(kyUpevent);
                        t20.dispatchEvent(changeEvent);

                        var doc = document.getElementById('pay1');
                        doc.click();
                        var b = document.getElementById('pay1t');
                        b.click();
                        setTimeout(function () {
                            var generateChallan = document.getElementById('forEpay');
                            generateChallan.click();
                            setTimeout(function () {
                                document.getElementById('nb').click();
                                document.getElementById('pay1t').click();
                                setTimeout(function () {
                                    var radiobtnId = allValues[20];
                                    var clickEvent = new Event('click');
                                    var radiobtn = document.getElementById(radiobtnId);
                                    radiobtn.checked = true;
                                    radiobtn.dispatchEvent(clickEvent);
                                    var checkCondition = document.getElementById('checkbox-consent');
                                    checkCondition.checked = true;
                                    checkCondition.dispatchEvent(clickEvent);
                                    chrome.storage.local.clear();
                                    eraseCookie('ChallanMyGSTcafe');
                                }, 2000);
                            }, 6000);
                        }, 2000);
                    } else {
                        window.location.reload();
                    }
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "makechallanpayment") {
            //setInterval(function(){
            if (window.location.href.includes("https://services.gst.gov.in/services/login?MakeChallanPayment")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementById('myModal').style.display = "block";
                    $x('//*[@id="main"]/ul/li[2]/ul/li[5]/ul/li[3]/a[1]')[0].click();
                    //console.log('Repeat');
                }, 2000);
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth")) {
                // ModalPopup();
                setTimeout(function () {
                    var aaaaa = document.getElementById('cpin');
                    document.getElementById('cpin').value = UPT[3];
                    var ddl1 = document.getElementById('cpin');
                    var event = new Event('change');
                    ddl1.dispatchEvent(event);

                    $x('//*[@id="challanRec"]/div[1]/div[2]/div[2]/button')[0].click();
                    var ddl2 = $x('//*[@id="challanRec"]/div[1]/div[2]/div[2]/button')[0];
                    event = new Event('change');
                    ddl2.dispatchEvent(event);
                    setTimeout(function () {
                        var cpin = $x('/html/body/div[2]/div[2]/div/div[2]/div/div[2]/div/div/table/tbody/tr/td[1]/a')[0];
                        var cpinNo = cpin.children[0].innerText;

                        if (cpinNo === UPT[3]) {
                            console.log("Entered If");
                            cpin.click();

                            setTimeout(function () {
                                console.log("payment page entered");
                                document.getElementById('nb').click();
                                document.getElementById('pay1t').click();
                                // var height = document.body.scrollHeight + 500;
                                window.scrollTo(0, document.body.scrollHeight);
                                // console.log(height);

                                chrome.storage.local.clear();
                            }, 2000);
                        }
                        else
                            console.log("Not entered If");
                    }, 2000);
                }, 4000);
            }
        }
        var myInterval;
        if (UPT[2].toLowerCase() === "setpaymentstatus") {
            console.log("SetPaymentStatus is called");
            var msgForUser = "Fetching Tax Payable data";
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?setpaymentstatus")) {
                Dynamiclogin();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                GetErrorMessageModal(msgForUser);
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                GetErrorMessageModal(msgForUser);
                document.getElementById('myModal').style.display = "block";
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                    console.log(year);
                }
                setInterval(function () {
                    document.getElementById('myModal').style.display = "block";
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    console.log(currentMonth);
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        document.getElementById('myModal').style.display = "block";
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;

                            if (gstName === 'GSTR3B') {
                                var btnname;
                                if ($('.ct')[btncount].childElementCount === 1) {
                                    btnname = $('.ct')[btncount].children[0].children[0].children[0].innerText;
                                    if (btnname === 'PREPARE ONLINE' || btnname === 'VIEW GSTR3B' || btnname === 'FILE GSTR3B') {
                                        $('.ct')[btncount].children[0].children[0].children[0].click();
                                    }
                                }
                                else if ($('.ct')[btncount].childElementCount === 2) {
                                    btnname = $('.ct')[btncount].children[1].children[0].children[0].innerText;
                                    if (btnname === 'PREPARE ONLINE' || btnname === 'VIEW GSTR3B' || btnname === 'FILE GSTR3B') {
                                        $('.ct')[btncount].children[1].children[0].children[0].click();
                                    }
                                }
                                console.log('PREPARE ONLINE Clicked');
                            }
                        }
                    }, 1500);

                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {
                var responseHref = UPT[6];
                GetErrorMessageModal(msgForUser);
                myInterval = setInterval(function () {
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'OK') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();
                                console.log("Ok clicked");
                            }
                        }
                    }, 3000);
                    document.getElementById('myModal').style.display = "block";
                    window.scrollTo(0, document.body.scrollHeight);

                    var yes = document.getElementById("interestyes").checked;
                    var no = document.getElementById("interestno").checked;
                    console.log(yes, no);

                    if (yes === true || no === true) {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (txt === "Next") {
                                document.getElementsByTagName('button')[btncount].click();
                                console.log("next clicked");
                            }
                        }
                    }

                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btncount === 11 && btnname === 'Proceed to payment') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();

                                clearInterval(myInterval);
                                setTimeout(function () {
                                    chrome.storage.local.clear(); location.href = responseHref;
                                }, 3000);
                            }
                        }
                    }, 6000);
                }, 2000);
                $('#myModal').hide();
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b/payment")) {
                console.log("Payment is called");
                setInterval(function () {
                    window.open(" https://services.gst.gov.in/services/logout", "_self");
                    chrome.storage.local.clear();
                    window.close();
                }, 5000);
                $('#myModal').hide();

                chrome.storage.local.clear();
            }
        }
        var abc;
        var interval;
        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9pdfdownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9pdfdownload")) {
                    login();
                }
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();
                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;

                                if (gstName === 'GSTR9') {
                                    $('.hd')[btncount].children[1].click();
                                    //console.log('PREPARE ONLINE Clicked');
                                    //chrome.storage.local.clear();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/questionnaire")) {
                    interval = setInterval(doStuff, 5000); // 2000 ms = start after 2sec
                    function doStuff() {
                        
                            var txt = document.getElementsByTagName('button')[1].innerHTML;
                            if (txt === "Next") {
                                document.getElementsByTagName('button')[1].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                
                                
                            }
                        
                        clearInterval(interval);
                    }
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/dashboard")) {
                    interval = setInterval(doStuff, 5000); // 2000 ms = start after 2sec
                    function doStuff() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].children[0].innerHTML;
                            if (txt === "Download GSTR-9 details (PDF)" || txt === "Preview Draft GSTR-9(PDF)") {
                                document.getElementsByTagName('button')[btncount].children[0].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("report downloaded");
                                chrome.storage.local.clear();
                                break;
                            }
                        }
                        clearInterval(interval);
                    }
                }
            }
        }

        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9systemcomputedpdfdownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9systemcomputedpdfdownload")) {
                    login();
                }
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();
                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    //if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    //    year = decideYear(year);
                    //}

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;

                                if (gstName === 'GSTR9') {
                                    $('.hd')[btncount].children[1].click();
                                    //console.log('PREPARE ONLINE Clicked');
                                    //chrome.storage.local.clear();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/questionnaire")) {
                    interval = setInterval(doStuff, 5000); // 2000 ms = start after 2sec
                    function doStuff() {

                        var txt = document.getElementsByTagName('button')[1].innerHTML;
                        if (txt === "Next") {
                            document.getElementsByTagName('button')[1].click();
                            window.scrollTo(0, document.body.scrollHeight);


                        }

                        clearInterval(interval);
                    }
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/dashboard")) {
                    interval = setInterval(doStuff, 7000); // 2000 ms = start after 2sec
                    function doStuff() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (txt === "Download GSTR-9 System computed summary (PDF)") {
                                document.getElementsByTagName('button')[btncount].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("report");
                                chrome.storage.local.clear();
                                setTimeout(function () {
                                    window.close();
                                }, 4000);
                                break;
                            }
                        }
                        clearInterval(interval);
                    }
                }
            }
        }


        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9exceldownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9exceldownload")) {
                    login();
                }
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();

                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;
                                if (gstName === 'GSTR9') {
                                    $('.hd')[btncount].children[1].click();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/dashboard")) {
                    interval = setInterval(doStuff, 5000); // 2000 ms = start after 2sec
                    function doStuff() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].children[0].innerHTML;
                            if (txt === "DOWNLOAD FILED GSTR-9 (EXCEL)") {
                                document.getElementsByTagName('button')[btncount].children[0].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("report downloaded");
                                break;
                            }
                        }
                        clearInterval(interval);
                    }
                }
            }
        }

        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9cpdfdownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9cpdfdownload")) {
                    login();
                };
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();
                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;
                                if (gstName === 'GSTR 9C') {
                                    $('.hd')[btncount].children[1].click();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9c/dashboard")) {

                    interval = setInterval(doStuff, 9000); // 2000 ms = start after 2sec
                    function doStuff() {
                        var status = document.getElementsByClassName('col-sm-4')[4].children[1].innerText;
                        if (status === 'Filed') {
                            for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                var txt = document.getElementsByTagName('button')[btncount].children[0].innerHTML;
                                if (txt === "Download filed GSTR-9C(PDF)") {
                                    document.getElementsByTagName('button')[btncount].children[0].click();
                                    window.scrollTo(0, document.body.scrollHeight);
                                    console.log("report downloaded");
                                    chrome.storage.local.clear();
                                    break;
                                }
                            }
                            //var btnname = document.getElementsByTagName('button')[11].children[0].innerHTML;
                            //if (btnname === 'Download filed GSTR-9C(PDF)') {
                            //    document.getElementsByTagName('button')[11].children[0].click();
                            //    chrome.storage.local.clear();
                            //    window.scrollTo(0, document.body.scrollHeight);
                            //}
                            chrome.storage.local.clear();
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                        if (status === 'Not Filed') {
                            for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                var txt = document.getElementsByTagName('button')[btncount].children[0].innerHTML;
                                if (txt === "PREVIEW DRAFT GSTR-9C (PDF)") {
                                    document.getElementsByTagName('button')[btncount].children[0].click();
                                    window.scrollTo(0, document.body.scrollHeight);
                                    console.log("report downloaded");
                                    chrome.storage.local.clear();
                                    break;
                                }
                            }
                            //var btnname = document.getElementsByTagName('button')[7].children[0].innerHTML;
                            //if (btnname === 'PREVIEW DRAFT GSTR-9C (PDF)') {
                            //        document.getElementsByTagName('button')[7].children[0].click();
                            //        chrome.storage.local.clear();
                            //        window.scrollTo(0, document.body.scrollHeight);
                            //}
                        }
                        chrome.storage.local.clear();
                        window.scrollTo(0, document.body.scrollHeight);
                        clearInterval(interval);
                    }
                }
            }
        }

        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9ctablepdfdownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9ctablepdfdownload")) {
                    login();
                };
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();
                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;
                                if (gstName === 'GSTR 9C') {
                                    $('.hd')[btncount].children[1].click();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9c/dashboard")) {

                    interval = setInterval(doStuff, 9000); // 2000 ms = start after 2sec
                    function doStuff() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[1].innerHTML;
                            if (txt === "DOWNLOAD GSTR-9C TABLES DERIVED FROM GSTR-9(PDF)") {
                                document.getElementsByTagName('button')[1].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("report downloaded");
                                break;
                            }
                        }
                        clearInterval(interval);
                    }
                }
            }
        }


        if (UPT !== undefined) {
            if (UPT[2].toLowerCase() === "gstr9cexceldownload") {
                abc = 0;
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9cexceldownload")) {
                    login();
                }
                if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                    console.log('Dashboard called');
                    ModalPopup();

                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                                var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                                if (btnname === 'Annual Return') {
                                    document.getElementsByTagName('button')[btncount].children[child].click();
                                }
                            }
                        }
                        console.log('Repeat');
                    }, 3500);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    ModalPopup();

                    currentMonth = convertdatetomonth(UPT[3]);
                    year = convertyear(UPT[4]);
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }

                    setInterval(function () {
                        var btncount;
                        var btnname;
                        var ddl1;
                        var event;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === year) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                ddl1 = document.getElementsByTagName('button')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                        var interval = setInterval(doStuff, 6000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                                document.getElementById('myModal').style.display = "block";
                                var gstName = $('.hd')[btncount].children[1].innerText;

                                if (gstName === 'GSTR 9C') {
                                    $('.hd')[btncount].children[1].click();
                                    //console.log('PREPARE ONLINE Clicked');
                                    //chrome.storage.local.clear();
                                }
                            }
                            clearInterval(interval);
                        }
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 5000);
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9c/dashboard")) {
                    interval = setInterval(doStuff, 5000); // 2000 ms = start after 2sec
                    function doStuff() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[12].children[0].innerHTML;
                            if (txt === "Download filed GSTR-9C(EXCEL)") {
                                document.getElementsByTagName('button')[12].children[0].click();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("report downloaded");
                                break;
                            }
                        }
                        clearInterval(interval);
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "gstr3btds") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr3btds")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setInterval(function () {
                    window.open("https://return.gst.gov.in/returns2/auth/comptds", "_top");
                }, 3500);
            }

            setInterval(function () {
                var currentMonth = convertdatetomonth(UPT[3]);//February
                var year = convertyear(UPT[4]);//2019-20
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                for (var btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                    for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                        var droplist = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                        var ddl1;
                        var event;
                        if (droplist === year) {
                            document.getElementsByTagName('select')[btncount].children[child].selected = true;
                            ddl1 = document.getElementsByTagName('select')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                        if (droplist === currentMonth) {
                            document.getElementsByTagName('select')[btncount].children[child].selected = true;
                            ddl1 = document.getElementsByTagName('select')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }
                }
                var btnname = document.getElementsByTagName('button')[1].innerText;
                if (btnname === "SEARCH") {
                    document.getElementsByTagName('button')[1].click();
                }
            }, 3000);
            setInterval(function () {
                for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                    var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                    if (btncount === 2 && btnname === 'Prepare Online' || btnname === 'View') {
                        var a = document.getElementsByTagName('button')[btncount];
                        a.click();
                        chrome.storage.local.clear();
                    }
                }
            }, 4500);
        }

        if (UPT[2].toLowerCase() === "gstr3bevc") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr3bevc")) {
                login();
            }

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                var currentMonth = convertdatetomonth(UPT[3]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                }
                var year = convertyear(UPT[4]);
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                var clrInterval = setInterval(DoStuffs, 6000);
                function DoStuffs() {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        document.getElementById('myModal').style.display = "block";
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR3B' || gstName === 'GSTR-3B') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                                clearInterval();
                                clearInterval(clrInterval);
                                $('#myModal').hide();
                                break;
                            }
                        }
                    }, 2500);
                }
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {

                setTimeout(function () {
                    var status = 'not submitted';
                    var statusTags = document.getElementsByClassName('col-sm-3');
                    for (let child = 0; child < statusTags.length; child++) {
                        if (statusTags[child].children[0] !== undefined && statusTags[child].children[0] !== null) {
                            if (statusTags[child].children[0].innerText.toLowerCase().includes('status')) {
                                if (statusTags[child].children[0].innerText.trim().toLowerCase() === "status - submitted") {
                                    status = 'submitted';
                                }
                                if (statusTags[child].children[0].innerText.trim().toLowerCase() === "status - filed") {
                                    status = 'filed';
                                    chrome.storage.local.clear();
                                    clearTimeout();
                                    return true;

                                }
                            }
                            //clearInterval(maininterval);
                        }
                    }
                    if (status === 'submitted') {
                        var subInterval = setInterval(function () {
                            var btnList = document.getElementsByTagName('button');
                            var btnArray = Array.from(btnList);
                            var proceedBtn = btnArray.filter(x => x.innerHTML.trim().toLowerCase() == "proceed to payment");
                            if (proceedBtn.length > 0) {
                                proceedBtn[0].click();
                                var ddl1 = proceedBtn[0];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                var childInterval = setInterval(function () {
                                    var btnList = document.getElementsByTagName('a');
                                    var btnArray = Array.from(btnList);
                                    var proceedBtn = btnArray.filter(x => x.innerHTML.trim().toLowerCase() == "proceed");
                                    if (proceedBtn.length > 0) {
                                        proceedBtn[0].click();
                                        var ddl1 = proceedBtn[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        clearInterval(subInterval);
                                        clearInterval(childInterval);
                                        console.log("Payment is called");
                                        setTimeout(function () {
                                            window.scrollTo(0, document.body.scrollHeight);
                                            chrome.storage.local.clear();
                                        }, 2000);
                                    }
                                }, 4000);
                            }
                        }, 6000);
                       
                    }
                    else {
                        var subInterval = setInterval(function () {
                            setTimeout(function () {
                                for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                    var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                    if (btnname.toLowerCase() === 'ok') {
                                        var a = document.getElementsByTagName('button')[btncount];
                                        a.click();
                                        console.log("Ok clicked");
                                        break;
                                    }
                                }
                            }, 3000);
                            var interestYes = document.getElementById("interestyes");
                            var interestNo = document.getElementById("interestno");
                            var yes = false;
                            var no = false;
                            if (interestYes !== undefined && interestYes !== null)
                                yes = interestYes.checked;
                            if (interestNo !== undefined && interestNo !== null)
                                no = interestNo.checked;
                            if (yes === true || no === true) {
                                var btnList = document.getElementsByTagName('button');
                                var btnArray = Array.from(btnList);
                                var nextBtn = btnArray.filter(x => x.innerHTML.toLowerCase() == "next");
                                if (nextBtn.length > 0) {
                                    nextBtn[0].click();
                                    var ddl1 = nextBtn[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                }

                                var childInterval = setInterval(function () {
                                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                        var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                        if (btnname.toLowerCase() === 'proceed to payment') {
                                            var btn = document.getElementsByTagName('button')[btncount];
                                            btn.click();
                                            console.log("Proceed to payment clicked");
                                            chrome.storage.local.clear();
                                            clearInterval(subInterval);
                                            break;

                                        }
                                    }
                                    setTimeout(function () {
                                        window.scrollTo(0, document.body.scrollHeight);
                                        clearInterval(childInterval);
                                    }, 2000);
                                }, 5000);
                            }
                            else {
                                chrome.storage.local.clear();
                                clearInterval(subInterval);
                                console.log("If not entered");
                            }
                        }, 5000);
                    }

                },5000);
                $('#myModal').hide();
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b/payment")) {
                console.log("Payment is called");
                $('#myModal').hide();
                window.scrollTo(0, document.body.scrollHeight);
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "proceed") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?proceed")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                ModalPopup();
                var interval = setInterval(doThings, 7000);
                var year = convertyear(UPT[4]);
                function doThings() {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }

                    var subInterval = setInterval(doAction, 3500);
                    function doAction() {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btncount === 2 && btnname === 'PREPARE-ONLINE') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();
                                clearInterval(subInterval);
                                clearInterval(interval);
                                break;
                            }
                        }
                    }
                }
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9/questionnaire")) {
                var refreshId = setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        var txt = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (txt === "Next") {
                            document.getElementsByTagName('button')[btncount].click();
                            console.log("next clicked");
                            window.scrollTo(0, 5000);
                            chrome.storage.local.clear();
                            clearInterval(refreshId);
                        }
                    }
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "cmp08proceed") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?cmp08proceed")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();

                currentMonth = convertjoinmonth(UPT[3]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValueInComposition(UPT[3]);
                }
                year = convertyear(UPT[4]);
                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].innerText;
                            if (gstName.trim().toLowerCase() === 'statement for payment of self-assessed tax gst cmp-08') {
                                let buttonsInCMP08 = $($('.ct')[btncount]).find('button');
                                var btnArray = Array.from(buttonsInCMP08);
                                var prepareBtn = btnArray.filter(x => x.innerText.toLowerCase() === "prepare online");
                                if (prepareBtn.length > 0) {
                                    prepareBtn[0].click();
                                    var ddl1 = prepareBtn[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    console.log('Prepare Online Clicked');
                                    chrome.storage.local.clear();
                                    break;
                                }
                            }
                        }
                    }, 2000);

                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }
        }

        if (UPT[2].toLowerCase() === "gstr1") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr1")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();

                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }

                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR1') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                                chrome.storage.local.clear();
                            }
                        }
                    }, 2000);
                    chrome.storage.local.clear();
                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }
        }

        if (UPT[2].toLowerCase() === "gstr1pdfdownload") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();

                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }

                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName.toLowerCase() === 'gstr1' || gstName.toLowerCase() === 'invoice furnishing facility') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                            }
                        }
                    }, 2000);

                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr1")) {
                interval = setInterval(doStuff, 4000);
                function doStuff() {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname.toLowerCase() === 'preview') {
                            document.getElementsByTagName('button')[btncount].click();
                            var ddl1 = document.getElementsByTagName('button')[btncount];
                            var event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    clearInterval(interval);
                    chrome.storage.local.clear();
                    window.scrollTo(0, document.body.scrollHeight);
                }
            }
        }

        if (UPT[2].toLowerCase() === "gstr3pdfdownload") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();

                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }

                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR3B' || gstName === 'GSTR-3B') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                                break;
                            }
                        }
                    }, 2000);
                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {
                console.log('Dashboard called');
                ModalPopup();
                var intervl = setInterval(doStuff, 3000);
                function doStuff() {
                    var status = document.getElementsByClassName('reg')[2].innerText;
                    if (status === 'Status - Filed') {
                        var inte = setInterval(doStuf, 2000);
                        function doStuf() {
                            for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                if (btnname === 'Download Filed GSTR-3B') {
                                    var a = document.getElementsByTagName('button')[btncount];
                                    a.click();
                                    $("#GSTR3bInfoModal").hide();
                                    $('.modal-backdrop.in').hide();
                                    chrome.storage.local.clear();
                                    window.scrollTo(0, document.body.scrollHeight);
                                    console.log("Ok clicked");
                                    break;
                                }
                            }
                            clearInterval(inte);
                        }
                        chrome.storage.local.clear();
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                    if (status === 'Status - Not Filed') {
                        $("#GSTR3bInfoModal").hide();
                        var btncount;
                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'OK') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();
                                console.log("Ok clicked");
                                break;
                            }
                        }
                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (txt === "Next") {
                                //document.getElementById('nilyes').click();
                                document.getElementsByTagName('button')[btncount].click();
                                console.log("next clicked");
                                break;
                            }
                        }

                        var interval = setInterval(doStuff, 4000);
                        function doStuff() {
                            for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                if (btnname === 'Preview draft GSTR-3B') {
                                    document.getElementsByTagName('button')[btncount].click();
                                    var ddl1 = document.getElementsByTagName('button')[btncount];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    chrome.storage.local.clear();
                                    window.scrollTo(0, document.body.scrollHeight);
                                    $('#myModal').hide();
                                    break;
                                }
                            }
                            clearInterval(interval);
                            chrome.storage.local.clear();
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                    }
                    chrome.storage.local.clear();
                    window.scrollTo(0, document.body.scrollHeight);
                    clearInterval(intervl);
                }
            }
        }

        if (UPT[2].toLowerCase() === "gstr3bsystemcomputedpdf") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    var interval =  setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName.toLowerCase() === 'gstr3b' || gstName.toLowerCase() === 'gstr-3b') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                                clearInterval(interval);
                            }
                        }
                    }, 2000);
                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {
                console.log('Dashboard called');
                ModalPopup();
                var parentInterval = setInterval(doStuff, 4000);
                function doStuff() {
                    var status = document.getElementsByClassName('reg')[2].innerText;
                    if (status === 'Status - Filed') {
                        var childInterval = setInterval(doStuf, 2500);
                        function doStuf() {
                            var btnList = document.getElementsByTagName('a');
                            var btnArray = Array.from(btnList);
                            var downloadBtn = btnArray.filter(x => x.innerText.toLowerCase() === 'system generated gstr-3b');
                            if (downloadBtn[0].innerText.toLowerCase() === 'system generated gstr-3b') {
                                downloadBtn[0].click();
                                $("#GSTR3bInfoModal").hide();
                                $('.modal-backdrop.in').hide();
                                var ddl1 = downloadBtn[0];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                clearInterval(childInterval);
                                clearInterval(parentInterval);
                                chrome.storage.local.clear();
                                window.scrollTo(0, document.body.scrollHeight);
                                console.log("System Generated GSTR-3b Button Clicked");
                            }
                        }
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "gstrone") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }

                var clrInterval = setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    var subInterval = setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName.toLowerCase() === 'gstr1' || gstName.toLowerCase() === 'invoice furnishing facility') {
                                let buttonsInGSTR1 = $($('.ct')[btncount]).find('button');
                                var btnArray = Array.from(buttonsInGSTR1);
                                var prepareBtn1 = btnArray.filter(x => x.innerText.toLowerCase() === "prepare online");
                                var prepareBtn2 = btnArray.filter(x => x.innerText.toLowerCase() === "file gstr1");
                                var prepareBtn3 = btnArray.filter(x => x.innerText.toLowerCase() === "view gstr1");
                                if (prepareBtn1.length > 0) {
                                    prepareBtn1[0].click();
                                    var ddl1 = prepareBtn1[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    console.log('PREPARE Online Clicked');
                                    clearInterval(clrInterval);
                                    clearInterval(subInterval);
                                    break;
                                }
                                else {
                                    if (prepareBtn2.length > 0) {
                                        prepareBtn2[0].click();
                                        var ddl1 = prepareBtn2[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        console.log('File GSTR1 Clicked');
                                        clearInterval(clrInterval);
                                        clearInterval(subInterval);
                                        break;
                                    }
                                    if (prepareBtn3.length > 0) {
                                        prepareBtn3[0].click();
                                        var ddl1 = prepareBtn3[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        console.log('View GSTR1 Clicked');
                                        clearInterval(clrInterval);
                                        clearInterval(subInterval);
                                        break;
                                    }
                                }
                            }
                        }

                    }, 2000);

                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
            };
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr1")) {
                setTimeout(function () {
                    window.scrollTo(0, document.body.scrollHeight);
                    var tag = document.getElementById('submitCheckbox');
                    if (tag !== undefined && tag.length > 0)
                        tag.click();
                    for (var btncount = 0; btncount < document.getElementsByTagName('input').length; btncount++) {
                        if (btncount === 2) {
                            var a = document.getElementsByTagName('input')[btncount];
                            a.click();
                        }
                    }
                }, 3000);
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "gstrtwo") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrtwo")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            var a;
                            if (btncount === 7 && btnname === 'Prepare Online') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            } else if (btncount === 7 && btnname === 'View') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            } else {
                                console.log('Code is changed');
                            }
                        }
                    }, 1500);
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr2/preview")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementsByTagName('p')[2].children[1].click();
                }, 6000);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr2")) {
                ModalPopup();
                setTimeout(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('input').length; btncount++) {
                        if (btncount === 0) {
                            var a = document.getElementsByTagName('input')[btncount];
                            a.click();
                        } else {
                            console.log('Code is changed');
                            chrome.storage.local.clear();
                        }
                    }
                }, 6000);
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "payment") {
            console.log("PaymentStatus is called");
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?payment")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                var currentMonth = convertdatetomonth(UPT[3]);
                var year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                var clrInterval = setInterval(DoStuffs, 6000);
                function DoStuffs() {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('hd').length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR3B' || gstName === 'GSTR-3B') {
                                $('.hd')[btncount].children[1].click();
                                console.log('PREPARE ONLINE Clicked');
                                clearInterval();
                                clearInterval(clrInterval);
                                $('#myModal').hide();
                                break;
                            }
                        }
                    }, 2500);
                }
            }
           
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {

                setTimeout(function () {
                    var status = 'not submitted';
                    var statusTags = document.getElementsByClassName('col-sm-3');
                    for (let child = 0; child < statusTags.length; child++) {
                        if (statusTags[child].children[0] !== undefined && statusTags[child].children[0] !== null) {
                            if (statusTags[child].children[0].innerText.toLowerCase().includes('status')) {
                                if (statusTags[child].children[0].innerText.trim().toLowerCase() === "status - submitted") {
                                    status = 'submitted';
                                }
                            }
                        }
                    }
                    if (status === 'submitted') {
                        var subInterval = setInterval(function () {
                            var btnList = document.getElementsByTagName('button');
                            var btnArray = Array.from(btnList);
                            var proceedBtn = btnArray.filter(x => x.innerHTML.trim().toLowerCase() == "proceed to payment");
                            if (proceedBtn.length > 0) {
                                proceedBtn[0].click();
                                var ddl1 = proceedBtn[0];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                var childInterval = setInterval(function () {
                                    var btnList = document.getElementsByTagName('a');
                                    var btnArray = Array.from(btnList);
                                    var proceedBtn = btnArray.filter(x => x.innerHTML.trim().toLowerCase() == "proceed");
                                    if (proceedBtn.length > 0) {
                                        proceedBtn[0].click();
                                        var ddl1 = proceedBtn[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        clearInterval(subInterval);
                                        clearInterval(childInterval);
                                        console.log("Payment is called");
                                        setTimeout(function () {
                                            window.scrollTo(0, document.body.scrollHeight);
                                            chrome.storage.local.clear();
                                        }, 2000);
                                    }
                                }, 4000);
                            }
                        }, 6000);

                    }
                    else {
                        var subInterval = setInterval(function () {
                            setTimeout(function () {
                                for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                    var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                    if (btnname.toLowerCase() === 'ok') {
                                        var a = document.getElementsByTagName('button')[btncount];
                                        a.click();
                                        console.log("Ok clicked");
                                        break;
                                    }
                                }
                            }, 3000);
                            var interestYes = document.getElementById("interestyes");
                            var interestNo = document.getElementById("interestno");
                            var yes = false;
                            var no = false;
                            if (interestYes !== undefined && interestYes !== null)
                                yes = interestYes.checked;
                            if (interestNo !== undefined && interestNo !== null)
                                no = interestNo.checked;
                            if (yes === true || no === true) {
                                var btnList = document.getElementsByTagName('button');
                                var btnArray = Array.from(btnList);
                                var nextBtn = btnArray.filter(x => x.innerHTML.toLowerCase() == "next");
                                if (nextBtn.length > 0) {
                                    nextBtn[0].click();
                                    var ddl1 = nextBtn[0];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                }

                                var childInterval = setInterval(function () {
                                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                                        var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                                        if (btnname.toLowerCase() === 'proceed to payment') {
                                            var btn = document.getElementsByTagName('button')[btncount];
                                            btn.click();
                                            console.log("Proceed to payment clicked");
                                            chrome.storage.local.clear();
                                            clearInterval(subInterval);
                                            break;

                                        }
                                    }
                                    setTimeout(function () {
                                        window.scrollTo(0, document.body.scrollHeight);
                                        clearInterval(childInterval);
                                    }, 2000);
                                }, 5000);
                            }
                            else {
                                chrome.storage.local.clear();
                                clearInterval(subInterval);
                                console.log("If not entered");
                            }
                        }, 5000);
                    }

                }, 5000);
                $('#myModal').hide();
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b/payment")) {
                console.log("Payment is called");
                $('#myModal').hide();
                window.scrollTo(0, document.body.scrollHeight);
                chrome.storage.local.clear();
            }
          
        }

        if (UPT[2].toLowerCase() === "gstr9aefile") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr9aefile")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                setTimeout(function () {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    console.log(currentMonth);

                    document.getElementById('myModal').style.display = "block";

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";

                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search' || btnname === "SEARCH") {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    document.getElementById('myModal').style.display = "block";
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;

                            if (gstName === 'GSTR-9A') {
                                var btnname;
                                if ($('.ct')[btncount].childElementCount === 1) {
                                    btnname = $('.ct')[btncount].children[0].children[1].children[0].innerText;
                                    if (btnname === 'PREPARE-ONLINE') {
                                        $('.ct')[btncount].children[0].children[1].children[0].click();
                                    }
                                }
                                else if ($('.ct')[btncount].childElementCount === 2) {
                                    btnname = $('.ct')[btncount].children[1].children[0].children[0].innerText;
                                    if (btnname === 'PREPARE-ONLINE') {
                                        $('.ct')[btncount].children[1].children[0].children[0].click();
                                    }
                                }
                                console.log('Prepare Offline Clicked');
                            }
                        }

                        document.getElementById('myModal').style.display = "none";
                    }, 4000);
                }, 4000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr9a/questionnaire")) {
                myInterval = setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        var txt = document.getElementsByTagName('button')[1].innerHTML;
                        if (txt === "Next") {
                            document.getElementsByTagName('button')[btncount].click();
                            console.log("next clicked");
                            chrome.storage.local.clear();
                        }
                    }
                }, 2000);
            }
        }

        if (UPT[2].toLowerCase() === "uploadgst3b") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?uploadgst3b")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                setTimeout(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    console.log(currentMonth);
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    document.getElementById('myModal').style.display = "block";

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";

                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search' || btnname === "SEARCH") {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    document.getElementById('myModal').style.display = "block";
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;

                            if (gstName === 'GSTR3B') {
                                var btnname;
                                if ($('.ct')[btncount].childElementCount === 1) {
                                    btnname = $('.ct')[btncount].children[0].children[1].children[0].innerText;
                                    if (btnname === 'PREPARE OFFLINE') {
                                        $('.ct')[btncount].children[0].children[1].children[0].click();
                                    }
                                }
                                else if ($('.ct')[btncount].childElementCount === 2) {
                                    btnname = $('.ct')[btncount].children[1].children[1].children[0].innerText;
                                    if (btnname === 'PREPARE OFFLINE') {
                                        $('.ct')[btncount].children[1].children[1].children[0].click();
                                    }
                                }
                                console.log('Prepare Offline Clicked');
                            }
                        }

                        document.getElementById('myModal').style.display = "none";

                        if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlinedownload")) {
                            setInterval(function () {
                                document.getElementsByTagName("div")[34].children[0].innerHTML = "<H4><b>GSTR3B Is Already Filed. WAIT! While We Are Taking You Back...</b></H4>";

                                setTimeout(function () {
                                    var responseurl = UPT[5];
                                    if (responseurl !== "") {
                                        var encodemessagegst3B = "Your GSTR3B Is Already Filed";
                                        window.open(responseurl + "?SaveReturnmsg=" + encodemessagegst3B, '_self');
                                    }
                                }, 3500);
                            }, 2000);
                        }

                        if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlineupload"))
                            document.getElementById('myModal').style.display = "none";
                        var clickmsg = UPT[6];
                        setTimeout(function () {
                            var btnuploadname = document.getElementsByTagName('input')[0].name;
                            if (btnuploadname === "offline_file") {
                                console.log("Click Event is Fired");
                                var a = $('#offline_file').click();
                                var userClick = document.getElementById("offline_file");
                                var event = new Event('input');
                                userClick.dispatchEvent(event);

                                document.getElementsByTagName('p')[3].innerHTML = "<img class='logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAe1BMVEX///8AAAA0NDTa2trOzs7JycnX19f29vakpKS2trawsLClpaW5ubnr6+vx8fGgoKAgICCPj49AQEC/v7/i4uJnZ2cODg6ampowMDBwcHCGhobFxcUmJiZNTU1gYGAcHBxXV1d8fHx0dHR+fn6Kioo5OTkWFhZHR0dbW1uOv1UQAAAEXElEQVR4nO3c6VqjMBgFYLC1dF/sQrWLtero/V/hQFsdaPNlI2nmg/P+8xn0Sc4kISSBKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB6S8aLx36/3+33553xOHRpQkpag+PhT1z0uZy1R6HLFULS209jsae0Fbp0dzb8JqK4WKXNaSOj9FUexsmyHbqcdzF60cjiZPcYuqz+zXTDOAVS80Fko9NNil6S0EX2J3k2DCOz3YQutS8d8zByH6HL7Udql0Y2D6njTfdom0Y2C+mELrxrycE+jUzNBpDkQVHfwUD+773QNXAp+VSkMYmiSXPyULWNSX6RIo/69BfF81rcPV+myKMu4+m7XhqqPFb1uN/2ddNQ5fEUrg7ujPTTUOXxEqoODimG0UH5anke/IdTxQN99/r6ruzqLffn24VhGor2wb277KRpDES/Im0fvNeDNqZtIyfLY3ff8ju2tkhD3l84j6Y9WRrCnnImyePrfqV37skuDWl/4bvf8GibhiyP5X3K7sHSOg1Zf+H66DKukIakfaT+S+4FvcClkQadx8p3uT0hl8C00qD7C8+FD7KvaKZBNq+Zz1J7M6yaBtVfeK57EDuQBmlQebC8t4gn6OTMXEy4dcfxoAPxaG84qWyL/gbHwUNYEeM4hBNbjhNTYtrgIo5PPyX2ithOcBFHzPD8KXFjuYrjOp3FsPxzbeIglgXL9e9Nr36rE89LP4vj4PeQT+3Zl2rSix+ufq0Vx6X2IY5jHnGTEGeKi3Fk81ZBHKU8xHH071ABtzTiyJcORXEU//ObE8dpIVUYRyGPxsRxXlYWx/GvvzQljssiOxHHbx4NieNny4GK46e/1CWO6EsWx++ZDzKOS/uoy7wj2kvi+LcdRcdxzkMcx+LutamMOFabx1HYnJPEceovtZmkEwc72uXTUbI48vYhjGPK8JgHsXm/KW/cSuPI8hDGcQhQnapaoopkraO8oiyPI54L33J4C1Khaog77dVzvyKO+E30NxjeZ1UHfzTjEGJ5BEhxiNg+jm2Q6lSl9XKTTRwcV44zvuLgt/hzojqLbhsHw1lHTqe3WMTBtK9ITjRUioPjluSJ9MCsbRzrIFVxYbzyEIfhnvf/RP31AeM4VgyfZn+o3mWxiIPj7v2vD+dxML3LniWu42A8cuRUL8IZxnF9OTuK51rDOBiuGZcpXndatzpFLek7Duxfdoq05mK6+M7ACogdBgsM9xNuJVtHabBcE7ylGD50sZ6AFRFnKs08h66FO9TxdAOH0HVwSX7/1MD7hdEb82pp7EOX37VK48d76NK7t7C/305Cl90Li0/s5VbsH1QIio9hie1Zr3BIjcw/planD2TdGqpXk4uO9W0aF6l+IN8st+oNjbU+ddyYjx1nhrJPN5zNWL4OaWuUShKZPnP+aImlRe8oiOR1n3ZqP35Sxq3B7H2/fsjtlrPJZtTYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJrhL/vaLEMiZMBbAAAAAElFTkSuQmCC' style='height:86px'><i class='' style='font-size: 22px;margin-right: -126px;margin-left:  -23px;'>Please Click On The Above Button...</i>";
                                a = document.getElementsByTagName('tr')[2];
                                var firstTime = "";
                                for (i = 0; i < a.children.length - 1; i++) {
                                    console.log(a.children[i].innerHTML);
                                    firstTime += a.children[i].innerHTML + ",";
                                }
                                var responsecapture = firstTime.split(',');

                                setInterval(function () {
                                    var text = document.getElementsByTagName("span")[11].innerHTML;
                                    if (text === "Your JSON file has been uploaded successfully. The GST Systems will now validate uploaded data. Please come back after 15 minutes") {
                                        GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                        document.getElementsByTagName('p')[3].innerHTML = " ";
                                        setTimeout(function () {
                                            var a2 = document.getElementsByTagName('tr')[2];
                                            var secondTime = "";
                                            for (i = 0; i < a2.children.length; i++) {
                                                console.log(a2.children[i].innerText);
                                                secondTime += a2.children[i].innerText + ",";
                                            }
                                            if (secondTime.split(',')[1] === responsecapture[1]) {
                                                console.log("1st Response->" + secondTime.split(',')[1] + " 2ndResponse->" + responsecapture[1]);

                                                document.getElementById('myModal').style.display = "none";
                                            } else {
                                                console.log("1 and 2 are not matched");
                                                console.log(UPT[5]);
                                                var responseurl = UPT[5];
                                                if (responseurl !== "") {
                                                    var status = secondTime.split(',')[3];

                                                    document.getElementById('myModal').style.display = "none";
                                                    GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                                    if (status === "Processed") {
                                                        var encodemessagegst3B = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                        setTimeout(function () {
                                                            window.close();
                                                        }, 10000);
                                                        window.open(responseurl + "?SaveReturnId=" + encodemessagegst3B, '_self');
                                                    } else if (status === "Waiting") {
                                                        setInterval(function () {
                                                            if (status === "Processed") {
                                                                var encodemessagegst3B = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                                setTimeout(function () {
                                                                    window.close();
                                                                }, 10000);
                                                                window.open(responseurl + "?SaveReturnId=" + encodemessagegst3B, '_self');
                                                            } else {
                                                                window.reload();
                                                            }
                                                        }, 20000);
                                                    } else if (status === "Error Occurred") {
                                                        encodemessagegst3B = a2.children[4].innerText;
                                                        setTimeout(function () {
                                                            window.close();
                                                        }, 10000);
                                                        chrome.storage.local.clear();
                                                        window.open(responseurl + "?SaveReturnmsg=" + encodemessagegst3B, '_self');
                                                    }
                                                }
                                            }
                                        }, 20000);
                                    } else {
                                        console.log("code is changed");
                                    }
                                }, 4000);
                            }
                        }, 3500);
                    }, 4000);

                    chrome.storage.local.clear();
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "uploadgst2") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?uploadgst2")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementById('myModal').style.display = "block";
                    var currentMonth = convertdatetomonth(UPT[3]);
                    var year = convertyear(UPT[4]);
                    var quarter = "";
                    var isQRMP = false;
                    if (parseInt(UPT[4]) >= 2020) {
                        isQRMP = true;
                        quarter = GetQuarterTextValue(UPT[3]);
                    } 
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }
                    document.getElementById('myModal').style.display = "block";
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                            }
                        }
                    }
                    document.getElementById('myModal').style.display = "block";
                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            var a;
                            if (btncount === 8 && btnname === 'Prepare offline') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                                document.getElementById('myModal').style.display = "none";
                            }
                            if (btncount === 8 && btnname === 'Download') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                                document.getElementById('myModal').style.display = "none";
                            }
                        }
                    }, 2000);
                }, 6000);

                setTimeout(function () {
                    chrome.storage.local.clear();
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "uploadgst4") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?uploadgst4")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setTimeout(function () {
                    var currentMonth = convertjoinmonth(UPT[3]);
                    var year = convertyear(UPT[4]);
                    var quarter = "";
                    var isQRMP = false;
                    if (parseInt(UPT[4]) >= 2020) {
                        isQRMP = true;
                        quarter = GetQuarterTextValueInComposition(UPT[3]);
                    }
                    if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                        year = decideYear(year);
                    }
                    document.getElementById('myModal').style.display = "block";
                    var btnname;
                    var copy;
                    var child;
                    var ddl1;
                    var event;
                    for (child = 0; child < document.getElementsByTagName('select')[0].length; child++) {
                        btnname = document.getElementsByTagName('select')[0].children[child].innerHTML;
                        document.getElementById('myModal').style.display = "block";
                        if (btnname === year) {
                            document.getElementsByTagName('select')[0].selectedIndex = child;
                            copy = btnname;
                            ddl1 = document.getElementsByTagName('select')[0];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }
                    if (copy !== year) {
                        document.getElementById('myModal').style.display = "none";
                        console.log("Code is Changed");
                        return;
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    document.getElementById('myModal').style.display = "block";
                    for (child = 0; child < document.getElementsByTagName('select')[1].length; child++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('select')[1].children[child].innerHTML;
                        if (btnname === currentMonth) {
                            document.getElementsByTagName('select')[1].selectedIndex = child;
                            copy = btnname;
                            ddl1 = document.getElementsByTagName('select')[1];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }
                    if (copy !== currentMonth) {
                        document.getElementById('myModal').style.display = "none";
                        console.log("Code is Changed");
                        return;
                    }

                    //}
                    document.getElementById('myModal').style.display = "block";
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Prepare offline') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            }
                            else {
                                console.log("code changed");
                                document.getElementById('myModal').style.display = "none";
                            }
                        }

                        setInterval(function () {
                            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlinedownload")) {
                                $x("/html/body/div[3]/div[2]/div/div[2]/div/div[2]/div[4]/div")[0].innerHTML = "<H4>GSTR4 Is Already Filed.<b> WAIT!</b> While We Are Taking You Back...</H4>";

                                setTimeout(function () {
                                    window.close();
                                    chrome.storage.local.clear();
                                }, 6000);
                            };
                        }, 2000);

                        if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr/offlineupload")) {
                            setTimeout(function () {
                                var btnuploadname = document.getElementsByTagName('input')[0].name;
                                if (btnuploadname === "offline_file") {
                                    console.log("Click Event is Fired");
                                    var a = $('#offline_file').click();
                                    var userClick = document.getElementById("offline_file");
                                    var event = new Event('input');
                                    userClick.dispatchEvent(event);

                                    document.getElementsByTagName('p')[2].innerHTML = "<img class='logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAe1BMVEX///8AAAA0NDTa2trOzs7JycnX19f29vakpKS2trawsLClpaW5ubnr6+vx8fGgoKAgICCPj49AQEC/v7/i4uJnZ2cODg6ampowMDBwcHCGhobFxcUmJiZNTU1gYGAcHBxXV1d8fHx0dHR+fn6Kioo5OTkWFhZHR0dbW1uOv1UQAAAEXElEQVR4nO3c6VqjMBgFYLC1dF/sQrWLtero/V/hQFsdaPNlI2nmg/P+8xn0Sc4kISSBKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB6S8aLx36/3+33553xOHRpQkpag+PhT1z0uZy1R6HLFULS209jsae0Fbp0dzb8JqK4WKXNaSOj9FUexsmyHbqcdzF60cjiZPcYuqz+zXTDOAVS80Fko9NNil6S0EX2J3k2DCOz3YQutS8d8zByH6HL7Udql0Y2D6njTfdom0Y2C+mELrxrycE+jUzNBpDkQVHfwUD+773QNXAp+VSkMYmiSXPyULWNSX6RIo/69BfF81rcPV+myKMu4+m7XhqqPFb1uN/2ddNQ5fEUrg7ujPTTUOXxEqoODimG0UH5anke/IdTxQN99/r6ruzqLffn24VhGor2wb277KRpDES/Im0fvNeDNqZtIyfLY3ff8ju2tkhD3l84j6Y9WRrCnnImyePrfqV37skuDWl/4bvf8GibhiyP5X3K7sHSOg1Zf+H66DKukIakfaT+S+4FvcClkQadx8p3uT0hl8C00qD7C8+FD7KvaKZBNq+Zz1J7M6yaBtVfeK57EDuQBmlQebC8t4gn6OTMXEy4dcfxoAPxaG84qWyL/gbHwUNYEeM4hBNbjhNTYtrgIo5PPyX2ithOcBFHzPD8KXFjuYrjOp3FsPxzbeIglgXL9e9Nr36rE89LP4vj4PeQT+3Zl2rSix+ufq0Vx6X2IY5jHnGTEGeKi3Fk81ZBHKU8xHH071ABtzTiyJcORXEU//ObE8dpIVUYRyGPxsRxXlYWx/GvvzQljssiOxHHbx4NieNny4GK46e/1CWO6EsWx++ZDzKOS/uoy7wj2kvi+LcdRcdxzkMcx+LutamMOFabx1HYnJPEceovtZmkEwc72uXTUbI48vYhjGPK8JgHsXm/KW/cSuPI8hDGcQhQnapaoopkraO8oiyPI54L33J4C1Khaog77dVzvyKO+E30NxjeZ1UHfzTjEGJ5BEhxiNg+jm2Q6lSl9XKTTRwcV44zvuLgt/hzojqLbhsHw1lHTqe3WMTBtK9ITjRUioPjluSJ9MCsbRzrIFVxYbzyEIfhnvf/RP31AeM4VgyfZn+o3mWxiIPj7v2vD+dxML3LniWu42A8cuRUL8IZxnF9OTuK51rDOBiuGZcpXndatzpFLek7Duxfdoq05mK6+M7ACogdBgsM9xNuJVtHabBcE7ylGD50sZ6AFRFnKs08h66FO9TxdAOH0HVwSX7/1MD7hdEb82pp7EOX37VK48d76NK7t7C/305Cl90Li0/s5VbsH1QIio9hie1Zr3BIjcw/planD2TdGqpXk4uO9W0aF6l+IN8st+oNjbU+ddyYjx1nhrJPN5zNWL4OaWuUShKZPnP+aImlRe8oiOR1n3ZqP35Sxq3B7H2/fsjtlrPJZtTYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJrhL/vaLEMiZMBbAAAAAElFTkSuQmCC' style='height:86px'><i class='' style='color: black;font-size: 22px;margin-right: -126px;margin-left:  -23px;'>Please Click On The Above Button...</i>";
                                    a = document.getElementsByTagName('tr')[2];
                                    var firstTime = "";
                                    var i;
                                    for (i = 0; i < a.children.length - 1; i++) {
                                        console.log(a.children[i].innerHTML);
                                        firstTime += a.children[i].innerHTML + ",";
                                    }
                                    var responsecapture = firstTime.split(',');

                                    setInterval(function () {
                                        var text = document.getElementsByTagName("span")[11].innerHTML;
                                        if (text === "Your JSON file has been uploaded successfully.It may take up to 15 minutes to do validation. Please come back after 15 minutes") {
                                            GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                            document.getElementsByTagName('p')[2].innerHTML = "";
                                            setTimeout(function () {
                                                var a2 = document.getElementsByTagName('tr')[2];
                                                var secondTime = "";
                                                for (i = 0; i < a2.children.length; i++) {
                                                    console.log(a2.children[i].innerText);
                                                    secondTime += a2.children[i].innerText + ",";
                                                }
                                                document.getElementById('myModal').style.display = "none";
                                                if (secondTime.split(',')[1] === responsecapture[1]) {
                                                    console.log("1st Response->" + secondTime.split(',')[1] + " 2ndResponse->" + responsecapture[1]);
                                                } else {
                                                    console.log("1 and 2 are not matched");
                                                    console.log(UPT[5]);
                                                    var responseurl = UPT[5];
                                                    if (responseurl !== "") {
                                                        var status = secondTime.split(',')[3];

                                                        GetErrorMessageModal("Please Wait While Our Software Is updating Your Data...");
                                                        if (status === "Processed") {
                                                            var encodemessagegstr1 = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                            setTimeout(function () {
                                                                window.close();
                                                            }, 10000);
                                                            window.open(responseurl + "?SaveReturnId=" + encodemessagegstr1, '_self');
                                                        } else if (status === "Waiting") {
                                                            setInterval(function () {
                                                                if (status === "Processed") {
                                                                    var encodemessagegst3B = secondTime.split(',')[0] + "," + secondTime.split(',')[2];
                                                                    setTimeout(function () {
                                                                        window.close();
                                                                    }, 10000);
                                                                    window.open(responseurl + "?SaveReturnId=" + encodemessagegst3B, '_self');
                                                                } else {
                                                                    window.reload();
                                                                }
                                                            }, 20000);
                                                        } else if (status === "Error Occurred") {
                                                            var encodemessagegst3B = a2.children[4].innerText;
                                                            setTimeout(function () {
                                                                window.close();
                                                            }, 10000);
                                                            chrome.storage.local.clear();
                                                            window.open(responseurl + "?SaveReturnmsg=" + encodemessagegst3B, '_self');
                                                        }
                                                    }
                                                }
                                            }, 20000);
                                        } else {
                                            console.log("code is changed");
                                        }
                                    }, 15000);
                                }
                            }, 5000);
                        };
                    }, 6000);
                }, 6000);
            }
        }

        if (UPT[2].toLowerCase() === "submitgst3b") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?submitgst3b")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                currentMonth = convertdatetomonth(UPT[3]);
                year = convertyear(UPT[4]);
                var quarter = "";
                var isQRMP = false;
                if (parseInt(UPT[4]) >= 2020) {
                    isQRMP = true;
                    quarter = GetQuarterTextValue(UPT[3]);
                } 
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                setInterval(function () {
                    document.getElementById('myModal').style.display = "block";
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === currentMonth) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    setInterval(function () {
                        document.getElementById('myModal').style.display = "block";
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btncount === 9 && btnname === 'Prepare Online') {
                                var a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            }
                            if (btncount === 9 && btnname === 'FILE GSTR3B') {
                                document.getElementsByTagName('button')[btncount].click();
                            }
                            if (btncount === 9 && btnname === 'VIEW GSTR3B') {
                                document.getElementsByTagName('button')[btncount].click();
                            }
                        }
                    }, 1500);
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/gstr3b")) {
                setTimeout(function () {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 6000);
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "gstr4") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstr4")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                setTimeout(function () {
                    var currentMonth = convertjoinmonth(UPT[3]);
                    var year = convertyear(UPT[4]);
                    var quarter = "";
                    var isQRMP = false;
                    if (parseInt(UPT[4]) >= 2020) {
                        isQRMP = true;
                        quarter = GetQuarterTextValueInComposition(UPT[3]);
                    }
                    document.getElementById('myModal').style.display = "block";
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (child = 0; child < document.getElementsByTagName('select')[0].children.length; child++) {
                        btnname = document.getElementsByTagName('select')[0].children[child].innerHTML;
                        if (btnname === year) {
                            document.getElementsByTagName('select')[0].selectedIndex = child;
                            ddl1 = document.getElementsByTagName('select')[0];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    document.getElementById('myModal').style.display = "block";
                    for (child = 0; child < document.getElementsByTagName('select')[1].children.length; child++) {
                        btnname = document.getElementsByTagName('select')[1].children[child].innerHTML;
                        if (btnname === currentMonth) {
                            document.getElementsByTagName('select')[1].selectedIndex = child;
                            ddl1 = document.getElementsByTagName('select')[1];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }

                    // }

                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                    setTimeout(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            var a;
                            if (btnname === 'VIEW GSTR4') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            }
                            else if (btnname === 'Initiate Filing') {
                                a = document.getElementsByTagName('button')[btncount];
                                a.click();
                            }
                            else {
                                document.getElementById('myModal').style.display = "none";
                                console.log("code changed");
                                chrome.storage.local.clear();
                            }
                        }
                    }, 3000);
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4")) {
                setTimeout(function () {
                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById('submitCheckbox').click();
                    chrome.storage.local.clear();
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "summarygstr9c") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?summarygstr9c")) {
                login();
            }

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();

                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            setInterval(function () {
                for (var btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                    for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                        var currentMonth = convertdatetomonth(UPT[3]);
                        var year = convertyear(UPT[4]);
                        if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                            year = decideYear(year);
                        }
                        var droplist = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                        if (droplist === year) {
                            document.getElementsByTagName('select')[btncount].children[child].selected = true;
                            var ddl1 = document.getElementsByTagName('select')[btncount];
                            var event = new Event('change');
                            ddl1.dispatchEvent(event);
                        }
                    }
                }
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                    var btnname = document.getElementsByTagName('button')[1].innerText;
                    if (btnname === "SEARCH") {
                        document.getElementsByTagName('button')[1].click();
                    }
                }
            }, 3000);
            setInterval(function () {
                for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                    var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                    if (btncount === 4 && btnname === 'INITIATE-FILING') {
                        var a = document.getElementsByTagName('button')[btncount];
                        a.click();
                        chrome.storage.local.clear();
                    }
                }
            }, 4500);
        }

        if (UPT[2].toLowerCase() === "submitgstr4") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?submitgstr4")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Return Dashboard') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                            }
                        }
                    }
                    console.log('Repeat');
                }, 3500);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/dashboard")) {
                ModalPopup();
                setTimeout(function () {
                    var currentMonth = convertjoinmonth(UPT[3]);
                    var year = convertyear(UPT[4]);
                    var quarter = "";
                    var isQRMP = false;
                    if (parseInt(UPT[4]) >= 2020) {
                        isQRMP = true;
                        quarter = GetQuarterTextValueInComposition(UPT[3]);
                    }
                    document.getElementById('myModal').style.display = "block";
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (child = 0; child < document.getElementsByTagName('select')[0].children.length; child++) {
                        btnname = document.getElementsByTagName('select')[0].children[child].innerHTML;
                        if (btnname === year) {
                            document.getElementsByTagName('select')[0].selectedIndex = child;
                            ddl1 = document.getElementsByTagName('select')[0];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    if (isQRMP) {
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === quarter) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    ddl1 = document.getElementsByTagName('select')[btncount];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                        }
                    }
                    for (child = 0; child < document.getElementsByTagName('select')[1].children.length; child++) {
                        btnname = document.getElementsByTagName('select')[1].children[child].innerHTML;
                        if (btnname === currentMonth) {
                            document.getElementsByTagName('select')[1].selectedIndex = child;
                            ddl1 = document.getElementsByTagName('select')[1];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        document.getElementById('myModal').style.display = "block";
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                        }
                    }
                    setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[1].children.length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            var gstName = $('.hd')[btncount].children[1].innerText;

                            if (gstName === 'GSTR4') {
                                var btnname;
                                if ($('.ct')[btncount].childElementCount === 1) {
                                    btnname = $('.ct')[btncount].children[0].children[0].children[0].innerText;
                                    if (btnname === 'PREPARE ONLINE' || 'VIEW GSTR4') {
                                        $('.ct')[btncount].children[0].children[0].children[0].click();
                                    }
                                }
                                else if ($('.ct')[btncount].childElementCount === 2) {
                                    btnname = $('.ct')[btncount].children[1].children[0].children[0].innerText;
                                    if (btnname === 'PREPARE ONLINE' || 'VIEW GSTR4') {
                                        $('.ct')[btncount].children[1].children[0].children[0].click();
                                    }
                                }
                                console.log('PREPARE ONLINE Clicked');
                            }
                        }
                    }, 1500);
                }, 6000);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4")) {
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4/questionnaire")) {
                    myInterval = setInterval(function () {
                        for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            var txt = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (txt === "Next") {
                                document.getElementsByTagName('button')[btncount].click();
                                console.log("next clicked");
                            }
                        }
                    }, 2000);
                }
                setInterval(function () {
                    if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4/tax/payment/summary")) {
                        setTimeout(function () {
                            window.scrollTo(0, document.body.scrollHeight);
                        }, 2000);
                    }
                }, 2000);
                setTimeout(function () {
                    var a = $x('/html/body/div[2]/div[2]/div/div[2]/div[6]/div[2]/a')[0];
                    a.click();
                }, 6000);
            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr/ack")) {
                setInterval(function () {
                    var message;
                    for (const a of document.querySelectorAll("span")) {
                        if (a.textContent.includes("Acknowledgment Reference Number is")) {
                            console.log(a.textContent);
                            message = a.textContent;
                        }
                    }
                    var refNum;
                    if (message === undefined) {
                        refNum = "Filed";
                    }
                    else {
                        var refNumstr = message.toString().split(".")[1];
                        var length = refNumstr.toString().length;
                        refNum = refNumstr.substring(length - 15);
                    }
                    var parameter = { "message": refNum };
                    var responseurl = UPT[5];
                    var url = responseurl + "saveArnExtension.aspx/saveExtensionArn";
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: JSON.stringify(parameter),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            console.log(response);
                            chrome.storage.local.clear();
                        }
                    });
                }, 2000);
            }
        };

        if (UPT[2].toLowerCase() === "comp03") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?comp03")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/optcomp", "_self");
                    console.log('Repeat');

                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/optcomp")) {
                setTimeout(function () {
                    document.getElementById('cmpdecl').click();
                    document.getElementById('verify').click();
                    document.getElementsByTagName('select')[0].selectedIndex = 1;
                    document.getElementById('cm_pl').value = UPT[3];
                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById('myModal').style.display = "none";
                    chrome.storage.local.clear();
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "comp04") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?comp04")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    window.open("https://reg.gst.gov.in/registration/auth/wtdrwcomp", "_self");
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://reg.gst.gov.in/registration/auth/wtdrwcomp")) {
                setInterval(function () {
                    console.log('inner Call');
                    var txt = document.getElementsByTagName('p')[2].children[1].innerHTML;
                    if (txt === "You have not opted for Composition levy. You cannot file Intimation/Application for Withdrawal from Composition Levy (GST CMP-04) ") {
                        chrome.storage.local.clear();
                        console.log('Call');
                        document.getElementById('myModal').style.display = "none";
                    } else {
                        consolse.log('Code is changed');
                    }
                }, 5000);

                setTimeout(function () {
                    document.getElementById('myModal').style.display = "block";
                    document.getElementsByTagName('select')[0].selectedIndex = UPT[3];
                    var userPassClass = document.getElementsByTagName('select')[0];
                    var event = new Event('change');
                    userPassClass.dispatchEvent(event);
                    window.scrollTo(0, document.body.scrollHeight);
                    if (UPT[3] === 8) {
                        document.getElementsByTagName('textarea')[0].value = UPT[4];
                        document.getElementById('prdt').value = UPT[5];
                        document.getElementById('verify').click();
                        document.getElementsByTagName('select')[1].selectedIndex = 1;
                        document.getElementById('cm_pl').value = UPT[6];
                        userPassClass = document.getElementById('prdt');
                        event = new Event('change');
                        userPassClass.dispatchEvent(event);
                        userPassClass = document.getElementsByTagName('textarea')[0];
                        event = new Event('change');
                        userPassClass.dispatchEvent(event);
                    } else {
                        document.getElementById('prdt').value = UPT[4];
                        document.getElementById('verify').click();
                        document.getElementsByTagName('select')[1].selectedIndex = 1;
                        document.getElementById('cm_pl').value = UPT[5];
                        var dispatchPrdt = document.getElementById('prdt');
                        event = new Event('change');
                        dispatchPrdt.dispatchEvent(event);
                    }

                    chrome.storage.local.clear();
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "itcform") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?itcform")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    window.open("https://return.gst.gov.in/returns2/auth/itcform/links", "_self");
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/itcform/links")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementById('myModal').style.display = "block";

                    document.getElementsByTagName('button')[6].click();
                }, 3000);
                console.log('out from click');
            }

            setTimeout(function () {
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/itc04/selectquarter")) {
                    //ModalPopup();
                    var year = convertyear(UPT[4]);
                    document.getElementById('myModal').style.display = "block";

                    for (var btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                var ddl1 = document.getElementsByTagName('select')[btncount];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                document.getElementsByTagName('select')[0].click();
                            }
                        }
                    }

                    document.getElementById('myModal').style.display = "block";
                    var checkMonth = convertjoinmonth(UPT[3]);
                    setInterval(function () {
                        var btncount;
                        var btnname;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            document.getElementById('myModal').style.display = "block";
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === checkMonth) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    var ddl1 = document.getElementsByTagName('select')[btncount];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                }
                            }
                        }

                        document.getElementById('myModal').style.display = "block";

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                chrome.storage.local.clear();
                            }
                        }
                    }, 8000);

                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById('myModal').style.display = "none";
                    chrome.storage.local.clear();
                }
            }, 5000);
        }

        if (UPT[2].toLowerCase() === "itc04offlineupload") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?itc04offlineupload")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                console.log('Dashboard called');
                ModalPopup();
                document.getElementById('myModal').style.display = "block";
                setInterval(function () {
                    window.open("https://return.gst.gov.in/returns2/auth/itcform/links", "_self");
                    console.log('Repeat');
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/itcform/links")) {
                ModalPopup();
                setTimeout(function () {
                    document.getElementsByTagName('button')[7].click();
                }, 3000);
                console.log('out from click');
            }

            setTimeout(function () {
                if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/itc04/selectquarter")) {
                   
                    var year = convertyear(UPT[4]);
                    for (var btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                var ddl1 = document.getElementsByTagName('select')[btncount];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                document.getElementsByTagName('select')[0].click();
                            }
                        }
                    }

                    var checkMonth = convertjoinmonth(UPT[3]);
                    setTimeout(function () {
                        var btncount;
                        var btnname;
                        for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                            for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                if (btnname === checkMonth) {
                                    document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                    var ddl1 = document.getElementsByTagName('select')[btncount];
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                }
                            }
                        }
                        document.getElementById('myModal').style.display = "block";
                        document.getElementById('myModal').style.display = 'none';

                        for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                            btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                            if (btnname === 'Search') {
                                document.getElementsByTagName('button')[btncount].click();
                                setTimeout(function () {
                                    if (window.location.href.includes("https://return.gst.gov.in/returns2/auth/itc04/offlineupload")) {
                                        document.getElementById('myModal').style.display = "none";
                                       
                                    }
                                }, 2000);
                            }
                        }
                    }, 8000);

                    window.scrollTo(0, document.body.scrollHeight);
                }
            }, 5000);
        }

        if (UPT[2].toLowerCase() === "gstr4annualpdfdownload") {

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            };

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                                console.log("Annual Return Called");
                                break;
                            }
                        }
                    }
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                ModalPopup();
                var interval = setInterval(doThings, 5000);
                var year = convertyear(UPT[4]);
                function doThings() {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }

                    var subInterval = setInterval(doAction, 3500);
                    function doAction() {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR-4') {
                                $('.hd')[btncount].children[1].click();
                                console.log('GSTR-4 Clicked');
                                clearInterval(subInterval);
                                clearInterval(interval);
                                chrome.storage.local.clear();
                                break;
                            }
                        }
                    }
                }
            }
            if (window.location.href.toLowerCase().includes("https://fogstr4.gst.gov.in/gstr4annual/auth/gstr4")) {
                setTimeout(2000);
                ModalPopup();
                var maininterval = setInterval(doStuff, 8500);
                function doStuff() {
                    setTimeout(1000);
                    var btnList = document.getElementsByTagName('button');
                    var btnArray = Array.from(btnList);
                    var downloadBtn = btnArray.filter(x => x.innerText === "DOWNLOAD GSTR-4 SUMMARY (PDF)");
                    if (downloadBtn[0].innerText === 'DOWNLOAD GSTR-4 SUMMARY (PDF)') {
                        downloadBtn[0].click();
                        var ddl1 = downloadBtn[0];
                        var event = new Event('change');
                        ddl1.dispatchEvent(event);
                        setTimeout(2000);
                        setInterval(function () {
                            var btnList = document.getElementsByTagName('a');
                            var btnArray = Array.from(btnList);
                            var backBtn = btnArray.filter(x => x.innerText == "BACK");
                            if (backBtn[0].innerText === 'BACK') {
                                backBtn[0].click();
                                backBtn[0].click();
                                var ddl1 = backBtn[0];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                clearInterval(maininterval);
                            }
                        }, 5000);
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "gstr4annualsave") {

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            };

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                                console.log("Annual Return Called");
                                break;
                            }
                        }
                    }
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                var year = convertyear(UPT[4]);
                var interval = setInterval(doAction, 7000);
                function doAction() {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }
                    var subInterval = setInterval(dothings, 3500);
                    function dothings() {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR-4') {
                                var btnName = $('.ct')[btncount].children[1].children[1].children[0].innerText;
                                if (btnName == "UPLOAD/DOWNLOAD JSON") {
                                    $('.ct')[btncount].children[1].children[1].children[0].click();
                                    console.log('Offline Upload Clicked');
                                    clearInterval(subInterval);
                                    clearInterval(interval);
                                    break;
                                }
                            }
                        }
                    }
                    var newInterval = setInterval(doStuff, 2000);
                    function doStuff() {
                        if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4/offlineupload")) {
                            setTimeout(1000);
                            document.getElementsByTagName('p')[2].innerHTML = "<img class='logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAe1BMVEX///8AAAA0NDTa2trOzs7JycnX19f29vakpKS2trawsLClpaW5ubnr6+vx8fGgoKAgICCPj49AQEC/v7/i4uJnZ2cODg6ampowMDBwcHCGhobFxcUmJiZNTU1gYGAcHBxXV1d8fHx0dHR+fn6Kioo5OTkWFhZHR0dbW1uOv1UQAAAEXElEQVR4nO3c6VqjMBgFYLC1dF/sQrWLtero/V/hQFsdaPNlI2nmg/P+8xn0Sc4kISSBKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB6S8aLx36/3+33553xOHRpQkpag+PhT1z0uZy1R6HLFULS209jsae0Fbp0dzb8JqK4WKXNaSOj9FUexsmyHbqcdzF60cjiZPcYuqz+zXTDOAVS80Fko9NNil6S0EX2J3k2DCOz3YQutS8d8zByH6HL7Udql0Y2D6njTfdom0Y2C+mELrxrycE+jUzNBpDkQVHfwUD+773QNXAp+VSkMYmiSXPyULWNSX6RIo/69BfF81rcPV+myKMu4+m7XhqqPFb1uN/2ddNQ5fEUrg7ujPTTUOXxEqoODimG0UH5anke/IdTxQN99/r6ruzqLffn24VhGor2wb277KRpDES/Im0fvNeDNqZtIyfLY3ff8ju2tkhD3l84j6Y9WRrCnnImyePrfqV37skuDWl/4bvf8GibhiyP5X3K7sHSOg1Zf+H66DKukIakfaT+S+4FvcClkQadx8p3uT0hl8C00qD7C8+FD7KvaKZBNq+Zz1J7M6yaBtVfeK57EDuQBmlQebC8t4gn6OTMXEy4dcfxoAPxaG84qWyL/gbHwUNYEeM4hBNbjhNTYtrgIo5PPyX2ithOcBFHzPD8KXFjuYrjOp3FsPxzbeIglgXL9e9Nr36rE89LP4vj4PeQT+3Zl2rSix+ufq0Vx6X2IY5jHnGTEGeKi3Fk81ZBHKU8xHH071ABtzTiyJcORXEU//ObE8dpIVUYRyGPxsRxXlYWx/GvvzQljssiOxHHbx4NieNny4GK46e/1CWO6EsWx++ZDzKOS/uoy7wj2kvi+LcdRcdxzkMcx+LutamMOFabx1HYnJPEceovtZmkEwc72uXTUbI48vYhjGPK8JgHsXm/KW/cSuPI8hDGcQhQnapaoopkraO8oiyPI54L33J4C1Khaog77dVzvyKO+E30NxjeZ1UHfzTjEGJ5BEhxiNg+jm2Q6lSl9XKTTRwcV44zvuLgt/hzojqLbhsHw1lHTqe3WMTBtK9ITjRUioPjluSJ9MCsbRzrIFVxYbzyEIfhnvf/RP31AeM4VgyfZn+o3mWxiIPj7v2vD+dxML3LniWu42A8cuRUL8IZxnF9OTuK51rDOBiuGZcpXndatzpFLek7Duxfdoq05mK6+M7ACogdBgsM9xNuJVtHabBcE7ylGD50sZ6AFRFnKs08h66FO9TxdAOH0HVwSX7/1MD7hdEb82pp7EOX37VK48d76NK7t7C/305Cl90Li0/s5VbsH1QIio9hie1Zr3BIjcw/planD2TdGqpXk4uO9W0aF6l+IN8st+oNjbU+ddyYjx1nhrJPN5zNWL4OaWuUShKZPnP+aImlRe8oiOR1n3ZqP35Sxq3B7H2/fsjtlrPJZtTYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJrhL/vaLEMiZMBbAAAAAElFTkSuQmCC' style='height:86px'><i class='' style='color: black;font-size: 22px;margin-right: -126px;margin-left:  -23px;'>Please Click On The Above Button...</i>";
                            a = document.getElementsByTagName('tr')[2];
                            chrome.storage.local.clear();
                            clearInterval(newInterval);
                        }
                    }

                }
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/gstr4/offlineupload")) {
                setTimeout(1000);
                document.getElementsByTagName('p')[2].innerHTML = "<img class='logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAe1BMVEX///8AAAA0NDTa2trOzs7JycnX19f29vakpKS2trawsLClpaW5ubnr6+vx8fGgoKAgICCPj49AQEC/v7/i4uJnZ2cODg6ampowMDBwcHCGhobFxcUmJiZNTU1gYGAcHBxXV1d8fHx0dHR+fn6Kioo5OTkWFhZHR0dbW1uOv1UQAAAEXElEQVR4nO3c6VqjMBgFYLC1dF/sQrWLtero/V/hQFsdaPNlI2nmg/P+8xn0Sc4kISSBKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB6S8aLx36/3+33553xOHRpQkpag+PhT1z0uZy1R6HLFULS209jsae0Fbp0dzb8JqK4WKXNaSOj9FUexsmyHbqcdzF60cjiZPcYuqz+zXTDOAVS80Fko9NNil6S0EX2J3k2DCOz3YQutS8d8zByH6HL7Udql0Y2D6njTfdom0Y2C+mELrxrycE+jUzNBpDkQVHfwUD+773QNXAp+VSkMYmiSXPyULWNSX6RIo/69BfF81rcPV+myKMu4+m7XhqqPFb1uN/2ddNQ5fEUrg7ujPTTUOXxEqoODimG0UH5anke/IdTxQN99/r6ruzqLffn24VhGor2wb277KRpDES/Im0fvNeDNqZtIyfLY3ff8ju2tkhD3l84j6Y9WRrCnnImyePrfqV37skuDWl/4bvf8GibhiyP5X3K7sHSOg1Zf+H66DKukIakfaT+S+4FvcClkQadx8p3uT0hl8C00qD7C8+FD7KvaKZBNq+Zz1J7M6yaBtVfeK57EDuQBmlQebC8t4gn6OTMXEy4dcfxoAPxaG84qWyL/gbHwUNYEeM4hBNbjhNTYtrgIo5PPyX2ithOcBFHzPD8KXFjuYrjOp3FsPxzbeIglgXL9e9Nr36rE89LP4vj4PeQT+3Zl2rSix+ufq0Vx6X2IY5jHnGTEGeKi3Fk81ZBHKU8xHH071ABtzTiyJcORXEU//ObE8dpIVUYRyGPxsRxXlYWx/GvvzQljssiOxHHbx4NieNny4GK46e/1CWO6EsWx++ZDzKOS/uoy7wj2kvi+LcdRcdxzkMcx+LutamMOFabx1HYnJPEceovtZmkEwc72uXTUbI48vYhjGPK8JgHsXm/KW/cSuPI8hDGcQhQnapaoopkraO8oiyPI54L33J4C1Khaog77dVzvyKO+E30NxjeZ1UHfzTjEGJ5BEhxiNg+jm2Q6lSl9XKTTRwcV44zvuLgt/hzojqLbhsHw1lHTqe3WMTBtK9ITjRUioPjluSJ9MCsbRzrIFVxYbzyEIfhnvf/RP31AeM4VgyfZn+o3mWxiIPj7v2vD+dxML3LniWu42A8cuRUL8IZxnF9OTuK51rDOBiuGZcpXndatzpFLek7Duxfdoq05mK6+M7ACogdBgsM9xNuJVtHabBcE7ylGD50sZ6AFRFnKs08h66FO9TxdAOH0HVwSX7/1MD7hdEb82pp7EOX37VK48d76NK7t7C/305Cl90Li0/s5VbsH1QIio9hie1Zr3BIjcw/planD2TdGqpXk4uO9W0aF6l+IN8st+oNjbU+ddyYjx1nhrJPN5zNWL4OaWuUShKZPnP+aImlRe8oiOR1n3ZqP35Sxq3B7H2/fsjtlrPJZtTYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJrhL/vaLEMiZMBbAAAAAElFTkSuQmCC' style='height:86px'><i class='' style='color: black;font-size: 22px;margin-right: -126px;margin-left:  -23px;'>Please Click On The Above Button...</i>";
                a = document.getElementsByTagName('tr')[2];
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "efilegstr4annual") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?gstrone")) {
                login();
            };

            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setInterval(function () {
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname === 'Annual Return') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                                console.log("Annual Return Called");
                                break;
                            }
                        }
                    }
                }, 3500);
            }

            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns2/auth/annualreturn")) {
                ModalPopup();
                var year = convertyear(UPT[4]);
                var interval = setInterval(doAction, 5000);
                function doAction() {
                    var btncount;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            break;
                        }
                    }

                    var subInterval = setInterval(doAction, 3500);
                    function doAction() {
                        for (var btncount = 0; btncount < document.getElementsByClassName('card text-center')[0].children[0].children.length; btncount++) {
                            var gstName = $('.hd')[btncount].children[1].innerText;
                            if (gstName === 'GSTR-4') {
                                $('.hd')[btncount].children[1].click();
                                console.log('GSTR-4 Clicked');
                                clearInterval(subInterval);
                                clearInterval(interval);
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "qrmpoptin") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?qrmpoptin")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                var flagOpen = false;
                var parentInterval = setInterval(function () {
                    try {
                        var mainTags = document.getElementsByClassName('dropdown');
                        var mainTagsArray = Array.from(mainTags);
                        var mainTag = mainTagsArray.filter(x => x.innerText.trim().toLowerCase().includes("services"));
                        if (mainTag.length > 0) {
                            var subTags = mainTag[0].children;
                            var subTagsArray = Array.from(subTags);
                            var subTag = subTagsArray.filter(x => x.constructor.name == "HTMLUListElement");
                            if (subTag.length > 0) {
                                var childTags = subTag[0].children;
                                var childTagsArray = Array.from(childTags);
                                var childTag = childTagsArray.filter(x => x.innerText.trim().toLowerCase() === "returns");
                                if (childTag.length > 0) {
                                    var secondLastTags = childTag[0].children;
                                    var secondLastTagsArray = Array.from(secondLastTags);
                                    var secondLastTag = secondLastTagsArray.filter(x => x.constructor.name == "HTMLUListElement");
                                    if (secondLastTag.length > 0) {
                                        var lastTags = secondLastTag[0].children;
                                        var lastTagsArray = Array.from(lastTags);
                                        var lastTag = lastTagsArray.filter(x => x.innerText.trim().toLowerCase() === "opt-in for quarterly return");
                                        if (lastTag.length > 0) {
                                            lastTag[0].children[0].click();
                                            clearInterval(parentInterval);
                                            console.log("managertnprofile Page Called");
                                            flagOpen = true;
                                        }
                                    }
                                }
                                else {
                                    var childTags = subTag[0].children;
                                    var childTagsArray = Array.from(childTags);
                                    var childTag = childTagsArray.filter(x => x.innerText.trim().toLowerCase().includes('opt-in for quarterly return'));
                                    if (childTag.length > 0) {
                                        var secondLastTags = childTag[0].children;
                                        var secondLastTagsArray = Array.from(secondLastTags);
                                        var secondLastTag = secondLastTagsArray.filter(x => x.constructor.name == "HTMLUListElement");
                                        if (secondLastTag.length > 0) {
                                            var lastTags = secondLastTag[0].children;
                                            var lastTagsArray = Array.from(lastTags);
                                            var lastTag = lastTagsArray.filter(x => x.innerText.trim().toLowerCase() === "opt-in for quarterly return");
                                            if (lastTag.length > 0) {
                                                lastTag[0].children[0].click();
                                                clearInterval(parentInterval);
                                                console.log("managertnprofile Page Called");
                                                flagOpen = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (err) {
                        console.log(err.message);
                        window.open("https://return.gst.gov.in/returns/auth/managertnprofile", "_self"); // url will open in browser
                        console.log('Repeat');
                        clearInterval(parentInterval);
                        flagOpen = true;
                    }

                    if (!flagOpen) {
                        clearInterval(parentInterval);
                        var clrInterval = setInterval(function () {
                            window.open("https://return.gst.gov.in/returns/auth/managertnprofile", "_self"); // url will open in browser
                            console.log('Repeat');
                            clearInterval(clrInterval);
                        }, 1000);
                    }

                }, 4000);


            }
            if (window.location.href.toLowerCase().includes("https://return.gst.gov.in/returns/auth/managertnprofile")) {
                year = convertyear(UPT[4]);
                var currentMonth = convertdatetomonth(UPT[3]);
                if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                    year = decideYear(year);
                }
                var clrInterval = setInterval(function () {
                    var btncount;
                    var child;
                    var btnname;
                    var ddl1;
                    var event;
                    for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                            btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                            if (btnname === year) {
                                document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                ddl1 = document.getElementsByTagName('select')[btncount];
                                event = new Event('change');
                                ddl1.dispatchEvent(event);
                                break;
                            }
                        }
                    }

                    for (btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                        if (btnname === 'Search') {
                            document.getElementsByTagName('button')[btncount].click();
                            ddl1 = document.getElementsByTagName('button')[btncount];
                            event = new Event('change');
                            ddl1.dispatchEvent(event);
                            clearInterval(clrInterval);
                            chrome.storage.local.clear();
                            break;
                        }
                    }
                    window.scrollTo(0, document.body.scrollHeight);
                }, 4000);
            }
        }

        if (UPT[2].toLowerCase() === "paychallan35") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?paychallan35")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                var subInterval = setInterval(function () {
                     document.getElementById('myModal').style.display = "block";
                     for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                         for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                             var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                             if (btnname.toLowerCase() === 'create challan') {
                                 document.getElementsByTagName('button')[btncount].children[child].click();
                                 var ddl1 = document.getElementsByTagName('button')[btncount].children[child];
                                 var event = new Event('change');
                                 ddl1.dispatchEvent(event);
                                 console.log('Create Challan clicked.');
                                 clearInterval(subInterval);
                                 break;
                             }
                         }
                     }
                }, 2500);
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth") || window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth/challanreason")) {
                ModalPopup();
                var subInterval = setInterval(DoAction, 8000);
                function DoAction() {
                    window.scrollTo(0, document.body.scrollHeight);
                    var qrmpRadioBtn = document.getElementById('qrmp');
                    if (qrmpRadioBtn !== undefined && qrmpRadioBtn !== null) {
                        qrmpRadioBtn.click();
                        var ddl1 = qrmpRadioBtn;
                        var event = new Event('change');
                        ddl1.dispatchEvent(event);
                        var childInterval = setInterval(function () {
                            var currentMonth = convertdatetomonth(UPT[3]);
                            var year = convertyear(UPT[4]);
                            if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                                year = decideYear(year);
                            }
                            var btncount;
                            var child;
                            var btnname;
                            var ddl1;
                            var event;
                            for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                                for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                    btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                    if (btnname === year) {
                                        document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                        ddl1 = document.getElementsByTagName('select')[btncount];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        break;
                                    }
                                }
                            }

                            for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                                for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                    btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                    if (btnname === currentMonth) {
                                        document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                        ddl1 = document.getElementsByTagName('select')[btncount];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        clearInterval(subInterval);
                                        break;
                                    }
                                }
                            }

                            var lastInterval = setInterval(function () {
                                var challan35RadioBtn = document.getElementById('challan35');
                                if (challan35RadioBtn !== undefined && challan35RadioBtn !== null) {
                                    challan35RadioBtn.click();
                                    var ddl1 = challan35RadioBtn;
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    setTimeout(function () {
                                        var btnList = document.getElementsByTagName('button');
                                        var btnArray = Array.from(btnList);
                                        var proceedBtn = btnArray.filter(x => x.innerText.toLowerCase() === "proceed");
                                        if (proceedBtn.length > 0) {
                                            proceedBtn[0].click();
                                            var ddl1 = proceedBtn[0];
                                            var event = new Event('change');
                                            ddl1.dispatchEvent(event);
                                            console.log('Create Challan clicked.');
                                            clearInterval(childInterval);
                                            clearInterval(lastInterval);
                                            chrome.storage.local.clear();
                                            setTimeout(function () {
                                                $('#myModal').hide();
                                                chrome.storage.local.clear();
                                            },500);
                                        }
                                    }, 1000);
                                }
                            }, 2500);
                        }, 4000);
                    }
                }
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth/challancalculation")) {
                console.log("Final Challan page reached");
                $('#myModal').hide();
                chrome.storage.local.clear();
            }
        }

        if (UPT[2].toLowerCase() === "paychallansa") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?paychallansa")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                var subInterval = setInterval(function () {
                    document.getElementById('myModal').style.display = "block";
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname.toLowerCase() === 'create challan') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                                var ddl1 = document.getElementsByTagName('button')[btncount].children[child];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                console.log('Create Challan clicked.');
                                clearInterval(subInterval);
                                break;
                            }
                        }
                    }
                }, 2500);
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth") || window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth/challanreason")) {
                var subInterval = setInterval(DoAction, 8000);
                function DoAction() {
                    window.scrollTo(0, document.body.scrollHeight);
                    var qrmpRadioBtn = document.getElementById('qrmp');
                    if (qrmpRadioBtn !== undefined && qrmpRadioBtn !== null) {
                        qrmpRadioBtn.click();
                        var ddl1 = qrmpRadioBtn;
                        var event = new Event('change');
                        ddl1.dispatchEvent(event);
                        var childInterval = setInterval(function () {
                            var currentMonth = convertdatetomonth(UPT[3]);
                            var year = convertyear(UPT[4]);
                            if (currentMonth === "January" || currentMonth === "February" || currentMonth === "March") {
                                year = decideYear(year);
                            }
                            var btncount;
                            var child;
                            var btnname;
                            var ddl1;
                            var event;
                            for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                                for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                    btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                    if (btnname === year) {
                                        document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                        ddl1 = document.getElementsByTagName('select')[btncount];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        break;
                                    }
                                }
                            }

                            for (btncount = 0; btncount < document.getElementsByTagName('select').length; btncount++) {
                                for (child = 0; child < document.getElementsByTagName('select')[btncount].children.length; child++) {
                                    btnname = document.getElementsByTagName('select')[btncount].children[child].innerHTML;
                                    if (btnname === currentMonth) {
                                        document.getElementsByTagName('select')[btncount].selectedIndex = child;
                                        ddl1 = document.getElementsByTagName('select')[btncount];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        clearInterval(subInterval);
                                        break;
                                    }
                                }
                            }

                            var lastInterval = setInterval(function () {
                                var challanSARadioBtn = document.getElementById('challanSA');
                                if (challanSARadioBtn !== undefined && challanSARadioBtn !== null) {
                                    challanSARadioBtn.click();
                                    var ddl1 = challanSARadioBtn;
                                    var event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    setTimeout(function () {
                                        var btnList = document.getElementsByTagName('button');
                                        var btnArray = Array.from(btnList);
                                        var proceedBtn = btnArray.filter(x => x.innerText.toLowerCase() === "proceed");
                                        if (proceedBtn.length > 0) {
                                            proceedBtn[0].click();
                                            var ddl1 = proceedBtn[0];
                                            var event = new Event('change');
                                            ddl1.dispatchEvent(event);
                                            console.log('Create Challan clicked.');
                                            clearInterval(childInterval);
                                            clearInterval(lastInterval);
                                            setTimeout(function () {
                                                if (UPT.length > 5) {
                                                    let igstValue = UPT[5];
                                                    let cgstValue = UPT[6];
                                                    let sgstValue = UPT[7];
                                                    let cessValue = UPT[8];
                                                    var igstTag = document.getElementsByName("igst_tax_amt");
                                                    var cgstTag = document.getElementsByName("cgst_tax_amt");
                                                    var sgstTag = document.getElementsByName(" sgst_tax_amt");
                                                    var cessTag = document.getElementsByName("cess_tax_amt");
                                                    igstTag[0].value = igstValue;
                                                    var ddl1 = igstTag[0];
                                                    var event = new Event('change');
                                                    ddl1.dispatchEvent(event);
                                                    cgstTag[0].value = cgstValue;
                                                    ddl1 = cgstTag[0];
                                                     event = new Event('change');
                                                    ddl1.dispatchEvent(event);
                                                    sgstTag[0].value = sgstValue;
                                                    ddl1 = sgstTag[0];
                                                    event = new Event('change');
                                                    ddl1.dispatchEvent(event);
                                                    cessTag[0].value = cessValue;
                                                    ddl1 = cessTag[0];
                                                    event = new Event('change');
                                                    ddl1.dispatchEvent(event);
                                                }
                                                chrome.storage.local.clear();
                                            }, 1500);
                                        }
                                    }, 1000);
                                }
                            }, 2500);
                        }, 4000);
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "paychallanaop") {
            abc = 0;
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?paychallanaop")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                var s
                ubInterval = setInterval(function () {
                    document.getElementById('myModal').style.display = "block";
                    for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                        for (var child = 0; child < document.getElementsByTagName('button')[btncount].children.length; child++) {
                            var btnname = document.getElementsByTagName('button')[btncount].children[child].innerHTML;
                            if (btnname.toLowerCase() === 'create challan') {
                                document.getElementsByTagName('button')[btncount].children[child].click();
                                var ddl1 = document.getElementsByTagName('button')[btncount].children[child];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                console.log('Create Challan clicked.');
                                clearInterval(subInterval);
                                break;
                            }
                        }
                    }
                }, 2500);
            }
            if (window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth") || window.location.href.toLowerCase().includes("https://payment.gst.gov.in/payment/auth/challanreason")) {
                var subInterval = setInterval(DoAction, 6000);
                function DoAction() {
                    window.scrollTo(0, document.body.scrollHeight);
                    var aopRadioBtn = document.getElementById('aop');
                    if (aopRadioBtn !== undefined && aopRadioBtn !== null) {
                        aopRadioBtn.click();
                        var ddl1 = aopRadioBtn;
                        var event = new Event('change');
                        ddl1.dispatchEvent(event);
                        var childInterval = setInterval(function () {
                           var btnList = document.getElementsByTagName('button');
                           var btnArray = Array.from(btnList);
                           var proceedBtn = btnArray.filter(x => x.innerText.toLowerCase() === "proceed");
                            if (proceedBtn.length > 0) {
                                proceedBtn[0].click();
                                var ddl1 = proceedBtn[0];
                                var event = new Event('change');
                                ddl1.dispatchEvent(event);
                                console.log('Create Challan clicked.');
                                clearInterval(childInterval);
                                setTimeout(function () {
                                    if (UPT.length > 5) {
                                        let igstValue = UPT[5];
                                        let cgstValue = UPT[6];
                                        let sgstValue = UPT[7];
                                        let cessValue = UPT[8];
                                        var igstTag = document.getElementsByName("igst_tax_amt");
                                        var cgstTag = document.getElementsByName("cgst_tax_amt");
                                        var sgstTag = document.getElementsByName(" sgst_tax_amt");
                                        var cessTag = document.getElementsByName("cess_tax_amt");
                                        igstTag[0].value = igstValue;
                                        var ddl1 = igstTag[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        cgstTag[0].value = cgstValue;
                                        ddl1 = cgstTag[0];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        sgstTag[0].value = sgstValue;
                                        ddl1 = sgstTag[0];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        cessTag[0].value = cessValue;
                                        ddl1 = cessTag[0];
                                        event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                    }
                                    chrome.storage.local.clear();
                                    clearInterval(subInterval);
                                }, 1000);
                            }
                        }, 3000);
                    }
                }
            }
        }

        if (UPT[2].toLowerCase() === "manageapi") {
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/login?manageapi")) {
                login();
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/fowelcome")) {
                ModalPopup();
                setTimeout(function () {
                    window.open("https://services.gst.gov.in/services/auth/myprofile", "_self"); 
                }, 2500);
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/myprofile")) {
                var parent = document.getElementsByClassName("col-md-3 hidden-xs hidden-sm");
                var clrInterval = setInterval(DoStuffs, 2000);
                function DoStuffs() {
                    for (var btncount = 0; btncount < parent[0].children[0].children.length; btncount++) {
                        var option = parent[0].children[0].children[btncount].children[0].innerText
                        if (option.trim().toLowerCase() === "manage api access") {
                            parent[0].children[0].children[btncount].children[0].click();
                            console.log('Manage API Clicked');
                            clearInterval(clrInterval);
                            $('#myModal').hide();
                            break;
                        }
                    }
                }
            }
            if (window.location.href.toLowerCase().includes("https://services.gst.gov.in/services/auth/manageapiaccess")) {
                ModalPopup();
                var clrInterval = setInterval(DoStuffs, 3500);
                function DoStuffs() {
                    let isConfirm = false;
                    var parent = document.getElementsByName('duration');
                    var enableAPICheck = $("[Name='mng.isAPIEnable']")[0].value;
                    if (enableAPICheck.trim().toLowerCase() === "y") {
                        $("[Name='mng.isAPIEnable']")[0].click();
                        $($("[Name='mng.isAPIEnable']")[0]).prop('checked', true);
                        var ddl1 = $("[Name='mng.isAPIEnable']")[0];
                        var event = new Event('change');
                        ddl1.dispatchEvent(event);
                        setTimeout(function () {
                            for (var optionCount = 0; optionCount < parent[0].children.length; optionCount++) {
                                var option = parent[0].children[optionCount].innerText;
                                if (option.trim().toLowerCase() === "30 days") {
                                    isConfirm = true;
                                    parent[0].selectedIndex = optionCount;
                                    console.log('30 Days option selected.');
                                    ddl1 = parent[0];
                                    event = new Event('change');
                                    ddl1.dispatchEvent(event);
                                    break;
                                }
                            }
                            setTimeout(function () {
                                if (isConfirm) {
                                    var btnList = document.getElementsByTagName('button');
                                    var btnArray = Array.from(btnList);
                                    var confirmBtn = btnArray.filter(x => x.innerText.toLowerCase() === "confirm");
                                    if (confirmBtn.length > 0) {
                                        confirmBtn[0].click();
                                        var ddl1 = confirmBtn[0];
                                        var event = new Event('change');
                                        ddl1.dispatchEvent(event);
                                        console.log('API Enable For 30 Days Confirmed.');
                                        chrome.storage.local.clear();
                                        clearInterval(clrInterval);
                                        setTimeout(function () {
                                            window.close();
                                        }, 2000);
                                    }
                                }
                            }, 500);
                        }, 500);
                    }
                }
            }
        }
    }
}

function Dynamiclogin() {
    setTimeout(function () {
        document.getElementsByTagName('strong')[0].innerHTML = "";

        document.getElementById('username').value = UPT[0];
        $("#username").prop("disabled", true);
        var userNameClass = document.getElementById("username");
        userNameClass.setAttribute("class", "form-control pad-r-0 ng-valid-maxlength ng-touched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required ng-valid-text");
        var event = new Event('change');
        userNameClass.dispatchEvent(event);
        document.getElementById('user_pass').value = UPT[1];
        $("#user_pass").prop("disabled", true);
        var userPassClass = document.getElementById("user_pass");
        event = new Event('change');
        userPassClass.dispatchEvent(event);
        var modalelement = document.getElementsByTagName('body')[0],
            modalelChild = document.createElement('div');
        modalelChild.innerHTML = '<div id="oldmodal" style="display: block;position: absolute;padding-top: 0px;left: 19px;top: -1px;width: 100%;height: 755px;overflow: auto;background-color: rgba(0, 0, 0, 0.4);"><div style=""><h3 style="margin-left: 189px;background-color:  white;width: 67%;height: 30px;size: 100px;margin-top: 158px;">Please Fill Captcha to Fetch Tax Payable data . . .</h3>  </div></div>';
        modalelement.insertBefore(modalelChild, modalelement.firstChild);
        setInterval(function () {
            if (document.getElementsByTagName('input')[3].value.length === 6) {
                for (var btncount = 0; btncount < document.getElementsByTagName('button').length; btncount++) {
                    var btnname = document.getElementsByTagName('button')[btncount].innerHTML;
                    if (btnname === 'Login') {
                        document.getElementsByTagName('button')[btncount].click();
                    }
                }
            }
        }, 4000);
        console.log('Repeat');
    }, 4000);
}

function ModalPopup() {
    var modalelement = document.getElementsByTagName('body')[0],
        modalelChild = document.createElement('div');
    modalelChild.innerHTML = '<div id="myModal" style="display: block;position: absolute;z-index: 1000;padding-top: 0px;left: 0px;top: 0px;width: 100%;height: 755px;overflow: auto;background-color: rgba(0, 0, 0, 0.4);"><div style=""><h3 style="margin-left: 189px;background-color:white; display:none;width: 67%;height: 30px;size: 100px;margin-top: 158px;">Please Wait While Your Request is being Processed...</h3>  </div></div>';
    modalelement.insertBefore(modalelChild, modalelement.firstChild);
}

function GetErrorMessageModal(msg) {
    var modalelement = document.getElementsByTagName('body')[0],
        modalelChild = document.createElement('div');
    modalelChild.innerHTML = '<div id="myModal" style="display: block;position: absolute;z-index: 1000;padding-top: 0px;left: 0px;top: 0px;width: 100%;height: 755px;overflow: auto;background-color: rgba(0, 0, 0, 0.4);"><div style=""><h3 style="margin-left: 189px;background-color:  white;width: 67%;height: 30px;size: 100px;margin-top: 158px;">' + msg + '</h3>  </div></div>';
    modalelement.insertBefore(modalelChild, modalelement.firstChild);
}

function convertdatetomonth(month) {
    switch (month) {
        case "01":
            return "January";
        case "02":
            return "February";
        case "03":
            return "March";
        case "04":
            return "April";
        case "05":
            return "May";
        case "06":
            return "June";
        case "07":
            return "July";
        case "08":
            return "August";
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
    }
    return "January";
}

function GetQuarterTextValue(month) {
    switch (month) {
        case "01":
        case "02":
        case "03":
            return "Quarter 4 (Jan - Mar)";
        case "04":
        case "05":
        case "06":
            return "Quarter 1 (Apr - Jun)";
        case "07":
        case "08":
        case "09":
            return "Quarter 2 (Jul - Sep)";
        case "10":
        case "11":
        case "12":
            return "Quarter 3 (Oct - Dec)";
    }
    return "Quarter 1 (Apr - Jun)";
}

function GetQuarterTextValueInComposition(month) {
    switch (month) {
        case "16":
            return "Quarter 4 (Jan - Mar)";
        case "13":
            return "Quarter 1 (Apr - Jun)";
        case "14":
            return "Quarter 2 (Jul - Sep)";
        case "15":
            return "Quarter 3 (Oct - Dec)";
    }
    return "Quarter 1 (Apr - Jun)";
}

function convertjoinmonth(currentMonth) {
    switch (currentMonth) {
        case "13":
            return "Apr-Jun";
        case "14":
            return "Jul-Sep";
        case "15":
            return "Oct-Dec";
        case "16":
            return "Jan-Mar";
    }
    return "Apr-Jun";
}

function decideYear(year) {
    var y1 = year.substr(0, 4);
    var y2 = year.substr(5, 2);
    y1 = parseInt(y1) - 1;
    y2 = parseInt(y2) - 1;
    y1 = y1.toString();
    y2 = y2.toString();

    year = y1 + "-" + y2;
    return year;
}

function convertyear(currentYear) {
    switch (currentYear) {
        case "2017":
            return "2017-18";
            
        case "2018":
            return "2018-19";

        case "2019":
            return "2019-20";
            
        case "2020":
            return "2020-21";
            
        case "2021":
            return "2021-22";
            
        case "2022":
            return "2022-23";
    }
    return "2017-18";
}

function eraseCookie(name) {
    var d = new Date();
    d.setTime(d.getTime());
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + ";domain=.gst.gov.in;path=/;expires=" + expires;
}

function $x(path) {
    var xpath = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var temp = [];
    for (var i = xpath.snapshotLength - 1; i >= 0; i--) {
        temp.push(xpath.snapshotItem(i));
    }
    return temp;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return parts.pop().split(";").shift();
}

function createCookie(name, value, days) {
    var expires;
    expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";expires=" + days +
        ";domain=.gst.gov.in;path=/";
}
