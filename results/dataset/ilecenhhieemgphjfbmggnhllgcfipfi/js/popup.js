// function to get browser property for all browser
window.browser = (function() {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

document.addEventListener('DOMContentLoaded', function() {
    var bgPage = window.browser.extension.getBackgroundPage();

    // var links = document.getElementsByTagName("a");
    // for (var i = 0; i < links.length; i++) {
    //     (function () {
    //         var ln = links[i];
    //         var location = ln.href;
    //         ln.onclick = function () {
    //             var dat =  bgPage.openTab(location);
    //         };
    //     })();
    // }


    var logoutLink = document.getElementById("logout_link");
    var loginButton = document.getElementById("login_button");
    var key_login_button = document.getElementById("key_login_button");
    var login_with_key = document.getElementById('login_with_key');
    var login_with_username = document.getElementById('login_with_username');
    var username = document.getElementById("login_username");
    var login_key = document.getElementById("login_key");
    var password = document.getElementById("login_password");
    var branch = document.getElementById("login_branch");
    var error = document.getElementById("login_error");
    var key_error = document.getElementById("login_key_error");
    var loginDiv = document.getElementById("login_area");
    var loggedInDiv = document.getElementById("logged_area");
    var linkArea = document.getElementById("link_area");
    var recentArea = document.getElementById("recent_area");
    var recentLinkArea = document.getElementById("recent_link_area");
    var searchArea = document.getElementById("search_area");
    var searchTextBox = document.getElementById("input_search");
    var launcher_button = document.getElementById("launcher_button");
    var organization_id = document.getElementById("organization_id");
    var question_organizationId = document.getElementById("question_organizationId");
    var question_extention_key = document.getElementById("question_extention_key");
    var close_button = document.getElementById("close_button");
    var extention_key_info = document.getElementById("extention_key_info");
    var organization_id_info = document.getElementById("organization_id_info");
    var info_page = document.getElementById("info_page");
    var request_id = document.getElementById("request_id");
    var profile_details = document.getElementById("profile_details");
    var organization_details = document.getElementById("organization_details");
    var moduleList;

    launcher_button.onclick = function() {
        window.browser.tabs.create({ url: bgPage.getLauncherUrl() }, async tab => {});
    }
    logoutLink.onclick = function() {
        clearLogin();
    }
    login_with_key.onclick = function() {
        showKeyLogin();
    }
    login_with_username.onclick = function() {
        hideKeyLogin();
    }
    question_organizationId.onclick = function() {
        info_page.style.display = "block";
        extention_key_info.style.display = "none";
        organization_id_info.style.display = "block";

    }
    request_id.onclick = function() {
        info_page.style.display = "block";
        extention_key_info.style.display = "none";
        organization_id_info.style.display = "block";

    }
    question_extention_key.onclick = function() {
        info_page.style.display = "block";
        organization_id_info.style.display = "none";
        extention_key_info.style.display = "block";
    }
    close_button.onclick = function() {
        info_page.style.display = "none";
    }

    function storeLogin(key) {
        localStorage.setItem('API_KEY', key);
    }

    function getLogin() {
        return localStorage.getItem('API_KEY');
    }

    function clearLogin() {
        localStorage.removeItem('API_KEY');
        showLogin();
    }
    var key = getLogin();
    if (key) {
        hideLogin();
        getUserdetails();
        listModules();
        listRecentModules();
    } else {
        showLogin();
        showKeyLogin();
        // resp = bgPage.getOrganizations();
        // resp.then(
        //     data => {
        //         organizations = data.data;
        //         // console.log(organizations)
        //         showOrganizations(organizations);
        //     },
        //     err => {
        //         console.log(err);
        //     },
        // )
    }

    function showRecentArea() {
        recentArea.style.display = "block";
    }

    function hideRecentArea() {
        recentArea.style.display = "none";
    }

    function hideLogin() {
        loginDiv.style.display = "none";
        logoutLink.style.display = "";
        linkArea.style.display = "block";
        loggedInDiv.style.display = "block";
        recentArea.style.display = "block";
        login_with_key.style.display = "none";
        extension_key_login.style.display = "none";
    }

    function showKeyLogin() {
        loginDiv.style.display = "none";
        logoutLink.style.display = "";
        login_with_username.style.display = "block";
        extension_key_login.style.display = "block";
        login_with_key.style.display = "none";
    }

    function hideKeyLogin() {
        extension_key_login.style.display = "none";
        loginDiv.style.display = "block";
        login_with_username.style.display = "none";
        login_with_key.style.display = "block";
    }

    function showLogin() {
        loginDiv.style.display = "block";
        linkArea.style.display = "none";
        logoutLink.style.display = "none";
        loggedInDiv.style.display = "none";
        recentArea.style.display = "none";
        extension_key_login.style.display = "none";
        login_with_username.style.display = "none";
        login_with_key.style.display = "block";
    }

    function listModules() {
        var resp = bgPage.listModules(getLogin());
        resp.then(
            data => {
                moduleList = data.data;
                showModuleList();
            },
            err => {
                console.log(err);
            },
        )
    }

    function listRecentModules() {
        var resp = bgPage.listRecentModules(getLogin());
        resp.then(
            data => {
                moduleList = data.data;
                showRecentModuleList();
            },
            err => {
                console.log(err);
            },
        )
    }

    function searchModules(key) {
        var resp = bgPage.searchModules(getLogin(), key);
        resp.then(
            data => {
                moduleList = data.data;
                console.log(data)
                showModuleList();
            },
            err => {
                console.log(err);
            },
        )
    }

    function showModuleList() {
        linkArea.innerHTML = '';

        if (moduleList.length > 0) {
            moduleList.forEach(element => {
                if (element.icon_url)
                    imageUrl = element.icon_url
                else
                    imageUrl = "/icons/ico_access.svg";

                var newcontent = document.createElement('div');
                // newcontent.setAttribute('data-id',element.module_id);
                newcontent.classList.add('modIconList');
                newcontent.innerHTML = '<a data-id="' + element.module_id + '" class="auth-link modlist"> <img src="' + imageUrl + '" ><div>' + element.module_name + '</div></a>';
                newcontent.getElementsByTagName("a")[0].onclick = function() {
                    var dat = bgPage.openAuthTab(this.getAttribute("data-id"), getLogin());
                };
                linkArea.appendChild(newcontent);
            });
        } else {
            linkArea.innerHTML = "<div class='error-msg full-width'>no module found!</div>"
        }
    }

    function showRecentModuleList() {
        recentLinkArea.innerHTML = '';
        imageUrl = ''
        if (moduleList.length > 0) {
            moduleList.forEach(element => {
                if (element.icon_url)
                    imageUrl = element.icon_url
                else
                    imageUrl = "/icons/ico_access.svg";
                var newcontent = document.createElement('div');
                // newcontent.setAttribute('data-id',element.module_id);
                newcontent.classList.add('modIconList');
                newcontent.innerHTML = '<a data-id="' + element.module_id + '" class="recent-auth-link modlist"> <img src="' + imageUrl + '" ><div>' + element.module_name + '</div></a>';
                newcontent.getElementsByTagName("a")[0].onclick = function() {
                    var dat = bgPage.openAuthTab(this.getAttribute("data-id"), getLogin());
                };

                recentLinkArea.appendChild(newcontent);
            });
            showRecentArea();
        } else {
            hideRecentArea();
        }
    }

    function getUserdetails() {
        var resp = bgPage.getUserDetails(getLogin());
        resp.then(
            data => {
                showUserDetails(data.data[0]);
                showOrganizationDetails(data.data[0].branch);
            },
            err => {
                console.log(err);
            },
        )
    }

    function showUserDetails(details) {
        html = ' <span class="bold f-s-15">' + details.first_name + ' ' + details.last_name + '</span><br><span></span>';
        profile_details.innerHTML = html;
    }

    function showOrganizationDetails(details) {
        html = ' <span class="bold">' + details.organization.name + '</span><br><span>' + details.name + '</span>';
        organization_details.innerHTML = html
    }


    loginButton.onclick = function() {
        error.innerHTML = '';
        if (organization_id.value) {
            if (username.value && password.value) {
                var dat = bgPage.login(username.value, password.value, organization_id.value);
                dat.then(
                    data => {
                        storeLogin(data.data);
                        hideLogin();
                        getUserdetails();
                        listModules();
                        listRecentModules();
                        // localStorage.setItem('API_KEY', JSON.stringify(testObject));
                    },
                    err => {
                        error.innerHTML = '<span style="color:red;">Wrong login credential</span>';
                    }
                )
            } else {
                error.innerHTML = '<span style="color:red;">Username and password required</span>';
            }

        } else {
            error.innerHTML = '<span style="color:red;">Organization ID required</span>';
        }
    };
    key_login_button.onclick = function() {
        error.innerHTML = '';
        if (login_key.value) {
            var dat = bgPage.login_with_key(login_key.value);
            dat.then(
                data => {
                    storeLogin(data.data);
                    getUserdetails();
                    hideLogin();
                    listModules();
                    listRecentModules();
                    // localStorage.setItem('API_KEY', JSON.stringify(testObject));
                },
                err => {
                    key_error.innerHTML = '<span style="color:red;">Wrong login key</span>';
                }
            )
        } else {
            key_error.innerHTML = '<span style="color:red;">extension key required</span>';
        }
    };
    searchTextBox.onkeyup = function() {
        searchKey = searchTextBox.value;
        searchModules(searchKey);
    };


});