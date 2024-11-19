// original file:/media/data2/jianjia/extension_data/unzipped_extensions/ilecenhhieemgphjfbmggnhllgcfipfi/js/background.js

var API_URL = 'https://app.letslync.com/backend/plugin/web/';
LAUNCHER_URL = 'https://launcher.letslync.com/#/auth/auth_login/';
// var API_URL = 'http://localhost:8080/backend/plugin/web/';
// LAUNCHER_URL = 'http://localhost:4200/#/auth/auth_login/';
let step = 1;
let authToken='';
// function to get browser property for all browser
window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.checkExtension) {
            sendResponse(true)
        } else if (request.access) {
            localStorage.setItem('API_KEY', request.token);
            this.openAuthTab(request.access.module_id, request.token)
            sendResponse(true)

        }
    });

function openAuthTab(moduleId, token) {
    authToken=token;
    step = 1;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/module-auth?module_id=" + moduleId,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            dataType: "json",
            success: function (data) {
                url = data.data.url;
                console.log(data.data)
                window.browser.tabs.create({ url: url }, async tab => {
                    injectDataToPage(data.data, tab)
                });
            },
            error: function (error) {
                reject('something');
            }
        });
    });
}
function injectDataToPage(data, tab) {
    return new Promise((resolve, reject) => {
        window.browser.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === 'complete' && tabId === tab.id) {
                fillUpTabData(tab, data,listener);
                window.setTimeout(function() {
                window.browser.tabs.onUpdated.removeListener(listener);
                }, 1000)

            } else if (info.status == 'unloaded') {
                window.browser.tabs.onUpdated.removeListener(listener);
                sendLoginErrorMessage(data.module_user_id)
                    .then(
                        data => {
                            console.log(data)
                        },
                        err => {
                            console.log(err);
                        },
                    )
            }
        });
    });
}
function injectDataAgainToPage(data, tab) {
    window.browser.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (info.status === 'complete'  && tabId === tab.id) {
            if (step <= parseInt(data.step)){
                step = step + 1
                fillUpTabData(tab, data,listener);
            }
            window.setTimeout(function() {
            window.browser.tabs.onUpdated.removeListener(listener);
            }, 10)

        } else if (info.status == 'unloaded') {
            window.browser.tabs.onUpdated.removeListener(listener);
            sendLoginErrorMessage(data.module_user_id)
                .then(
                    data => {
                        console.log(data)
                    },
                    err => {
                        console.log(err);
                    },
                )
        }
    });
}
function fillUpTabData(tab, data,listener=null) {
    
    window.browser.tabs.sendMessage(tab.id, { text: 'auto_fill_login', data: data,step:step }, function (w) {
        if (step < parseInt(data.step)) {
            window.browser.tabs.onUpdated.removeListener(listener);
            window.setTimeout(function() {
            injectDataAgainToPage(data, tab)
        }, 200)
        }
    });
}


/*
    send error log to server
*/
function sendLoginErrorMessage(module_user_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/save-login-error?module_user_id=" + module_user_id,
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + authToken
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}



function login(username, password, organization_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: API_URL + "site/login",
            dataType: "json",
            data: {
                "username": username,
                "password": password,
                "organization_branch_id": organization_id,
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject('something');
            }
        });
    });

}

function login_with_key(key) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: API_URL + "site/login-with-key",
            dataType: "json",
            data: {
                "extension_key": key,
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject('something');
            }
        });
    });

}

function listModules(token) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/module",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function listRecentModules(token) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/recent-module",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject(error);
            }
        });
    });

}

function searchModules(token, key) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/search-module?key=" + key,
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                console.log('error')
                reject(error);
            }
        });
    });
}

function getUserDetails(token) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: API_URL + "user/get-details",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                console.log('error')
                reject(error);
            }
        });
    });
}



function getLauncherUrl() {
    return LAUNCHER_URL + btoa(getLogin())
}

function getLogin() {
    return localStorage.getItem('API_KEY');
}
