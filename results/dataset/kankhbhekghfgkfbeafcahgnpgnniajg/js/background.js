let gaClientId = localStorage.getItem('__gaClientId');
let browserType = '';
let DOMAIN = 'https://abcdpdf.com';
let API_DOMAIN = 'https://abcdpdf.com/api';
const INSTALL_URL = DOMAIN + '/index.html';
const UNINSTALL_URL = DOMAIN + '/uninstall.html';
const SHORTCUT_MAX_COUNT = 15;
const GA_TRACKING_ID = 'abcd';

const EVENTS = {
    HEART: 'heart',
    SEARCH_BOOKMARKS: 'search_bookmarks',
    SEARCH_HISTORY: 'search_history',
    NOTIFI: 'notifi',
    OPEN_NEW_TAB: 'open_new_tab',
    OPEN_NEW_WINDOW: 'open_new_window',
    OPEN_INCOGNITO: 'open_incognito',
    COLLECT_WEBSITE: 'collect_website',
    SET_USER_STATUS: 'set_user_status'
};

const DetectClient = {
    isChrome: function() {
        return /chrome/i.test(navigator.userAgent) && !DetectClient.isEdge() && !DetectClient.isEdgeForChromium();
    },

    isFirefox: function() {
        return /firefox/i.test(navigator.userAgent);
    },

    isEdge: function() {
        return /edge/i.test(navigator.userAgent);
    },

    isEdgeForChromium: function() {
        return /edg/i.test(navigator.userAgent);
    }
};

let startPage = 'chrome://newtab/';
if (DetectClient.isChrome()) {
    browserType = 'chrome';
} else if (DetectClient.isFirefox()) {
    browserType = 'firefox';
    startPage = chrome.runtime.getURL("dist/index.html");
} else if (DetectClient.isEdgeForChromium()) {
    browserType = 'edge';
    startPage = 'edge://newtab/';
}

const browserInfo = Browser();

if (!gaClientId) {
    gaClientId = browserInfo.name.substr(0, 2).toLocaleLowerCase() + GA_TRACKING_ID + 'xx-' + createUUID();
    localStorage.setItem('__gaClientId', gaClientId);
}


function GA(placeholder, params) {
    let hitType = params.hitType;
    let postData = "v=1&tid=" + GA_TRACKING_ID + "&cid=" + gaClientId + "&t=" + hitType + '&vp=' + (window.innerWidth + 'x' + window.innerHeight) + '&sr=' + (window.screen.width + 'x' + window.screen.height)
                    + "&bt=" + browserInfo.name + "&bv=" + browserInfo.fullVersion + "&os=" + browserInfo.os + "&tz=" + (Intl.DateTimeFormat()).resolvedOptions().timeZone + "&re=" + window.document.referrer;
    if (hitType == 'pageview') {
        if (params.page) {
            postData += "&dp=" + params.page;
        }
        if (params.title) {
            postData += "&dt=" + params.title;
        }
    } else if (hitType == 'event') {
        let eventCategory = params.eventCategory || '';
        let eventAction = params.eventAction || '';
        let eventLabel = params.eventLabel || '';
        postData += "&ec=" + eventCategory + "&ea=" + eventAction + "&el=" + eventLabel;
    }

    const _gaUri = 'https://sa.abcdpdf.com/collect?';
    let image = new Image(1, 1);
    image.src = _gaUri + postData;
};

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        // chrome.tabs.create({url: startPage});
        chrome.tabs.create({url: INSTALL_URL + '?cid=' + gaClientId});
    }
    
    GA('send', {
        hitType: 'event',
        eventCategory: details.reason,
        eventAction: browserType,
        eventLabel: 'clientId: ' + gaClientId
    });
});

chrome.runtime.setUninstallURL(UNINSTALL_URL + '?cid=' + gaClientId);

chrome.tabs.onCreated.addListener(function (tab) {
    let locSetting = localStorage.getItem('setting');
    if (locSetting) {
        locSetting = JSON.parse(locSetting);
        if (locSetting.searchFocus) {
            if (browserType == 'chrome') {
                if (tab.pendingUrl && tab.pendingUrl === startPage && tab.incognito === false) {
                    chrome.tabs.create({ url: 'dist/index.html' }, function (tab1) {
                        chrome.tabs.update(tab1.id, { url: startPage });
                    });
                    chrome.tabs.remove(tab.id);
                }
            } else if (browserType == 'edge') {
                if (tab.pendingUrl && tab.pendingUrl === startPage && tab.incognito === false) {
                    chrome.tabs.create({ url: 'dist/index.html' }, function (tab1) {
                        chrome.tabs.update(tab1.id, { url: startPage });
                    });
                    chrome.tabs.remove(tab.id);
                }
            } else if (browserType == 'firefox') {
                // if (tab.url == 'about:blank' && tab.favIconUrl != 'chrome://browser/skin/customize.svg' && tab.title.indexOf('about:') == -1 && !tab.openerTabId) {
                //     chrome.tabs.create({ url: startPage, openerTabId: tab.id });
                //     chrome.tabs.remove(tab.id);
                // }
            }            
        }
    }
});

chrome.contextMenus.create({
    id: 'menu_collect_page',
    title: chrome.i18n.getMessage('menu_collect_page'),
    contexts: ['page'],
    onclick: (info, tab) => {
        let _shortcut = {
            id: createId('website', 8),
            type: 'website',
            icon: tab.favIconUrl,
            name: tab.title,
            url: tab.url,
            bgColor: '#11B3D9',
            textColor: '#FFFFFF',
            sort: 0,
            page: '__default_desktop'
        }

        let account = localStorage.getItem('account');
        if (account) {
            _shortcut.page = null;
            account = JSON.parse(account);
            fetch(API_DOMAIN + '/shortcut/insert?uid=' + account.user_id + '&_t=' + new Date().getTime(), {
                method: 'post', 
                body: JSON.stringify(_shortcut),
                // mode: 'cors'
                headers: {
                    'Authorization': 'Bearer ' + account.token,
                    'Content-Type': 'application/json'
                }
            });
            return;
        }

        let pages = JSON.parse(localStorage.getItem('pages'));
        if (Object.keys(pages) == 0) {
            const _page = addPage();
            pages[_page.id] = _page;
        }
        for (let i in pages) {
            _shortcut.page = i;
            shortcut = insertShortcut(pages[i], _shortcut);
            if (shortcut) {
                pages[i] = shortcut;
                break;
            }
        }
        localStorage.setItem('pages', JSON.stringify(pages));
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'collect page'
        });
    }
});

function insertShortcut(locStorage, _shortcut) {
    let keys = Object.keys(locStorage.data);
    if (keys.length >= SHORTCUT_MAX_COUNT) {
        return false;
    }

    let sort = 0;
    if (keys.length > 0) {
        let idx = keys.length - 1;
        let lastKey = keys[idx];
        sort = parseInt(locStorage.data[lastKey].sort) + 1;
    }
    _shortcut.sort = sort;
    locStorage.data[_shortcut.id] = _shortcut;
    return locStorage;
}

function addPage() {
    let page = {};
    page.id = createId('desktop_', 8);
    page.name = 'Desktop';
    page.bgColor = '#FFFFFF';
    page.textColor = '#000000';
    page.locked = false;
    page.lockPass = null;
    page.sort = 1;
    page.data = {};
    return page;
}

// chrome.contextMenus.create({
//     id: 'menu_collect_link',
//     title: chrome.i18n.getMessage('menu_collect_link', [chrome.i18n.getMessage('extName')]),
//     contexts: ['link'],
//     onclick: (info, tab) => {
//         let data = {
//             icon: '',
//             title: info.linkUrl,
//             url: info.linkUrl
//         }
//         console.log(data);
//     }
// });

// chrome.contextMenus.create({
//     id: 'menu_wallpaper',
//     title: chrome.i18n.getMessage('menu_wallpaper', [chrome.i18n.getMessage('extName')]),
//     contexts: ['image'],
//     onclick: (info, tab) => {
//         console.log(info.srcUrl);
//     }
// });

const engineList = {
    google: { name: 'google', url: 'https://google.com/search', key: 'q' },
    bing: { name: 'bing', url: 'https://www.bing.com/search', key: 'q' },
    duckduckgo: { name: 'duckduckgo', url: 'https://duckduckgo.com', key: 'q' },
    yahoo: { name: 'yahoo', url: 'https://search.yahoo.com/search', key: 'p' },
    yandex: { name: 'yandex', url: 'https://yandex.com/search/', key: 'text' },
    baidu: { name: 'baidu', url: 'https://www.baidu.com/s', key: 'wd' },
};

chrome.contextMenus.create({
    id: 'menu_search',
    title: chrome.i18n.getMessage('menu_search', [chrome.i18n.getMessage('extName')]),
    contexts: ['selection'],
    onclick: (info, tab) => {
        let searchUrl = engineList.google.url;
        let searchKey = engineList.google.key;
        let setting = localStorage.getItem('setting');
        if (setting) {
            setting = JSON.parse(setting);
            if (setting.rightClickSearch) {
                let searchEngine = engineList[setting.rightClickSearch.name];
                searchUrl = searchEngine.url;
                searchKey = searchEngine.key;
            }
        }
        openTab(searchUrl + '?' + searchKey + '=' + info.selectionText);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'search by'
        });
    }
});

chrome.contextMenus.create({
    id: 'menu_search_privacy',
    title: chrome.i18n.getMessage('menu_search_privacy', [chrome.i18n.getMessage('extName')]),
    contexts: ['selection'],
    onclick: (info, tab) => {
        let searchUrl = engineList.google.url;
        let searchKey = engineList.google.key;
        let setting = localStorage.getItem('setting');
        if (setting) {
            setting = JSON.parse(setting);
            if (setting.rightClickSearch) {
                let searchEngine = engineList[setting.rightClickSearch.name];
                searchUrl = searchEngine.url;
                searchKey = searchEngine.key;
            }
        }
        openPrivacyWindow(searchUrl + '?' + searchKey + '=' + info.selectionText);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'search incognito'
        });
    }
});

chrome.contextMenus.create({
    id: 'menu_link_privacy',
    title: chrome.i18n.getMessage('menu_link_privacy', [chrome.i18n.getMessage('extName')]),
    contexts: ['link'],
    onclick: (info, tab) => {
        openPrivacyWindow(info.linkUrl);
        GA('send', {
            hitType: 'event',
            eventCategory: 'ContentMenus',
            eventAction: 'link incognito'
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

function listener(request, sender, sendResponse) {
    switch(request.event) {
        case EVENTS.HEART:
            sendResponse(true);
            break;
        case EVENTS.SEARCH_BOOKMARKS:
            searchBookmarks(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.SEARCH_HISTORY:
            searchHistory(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.OPEN_NEW_TAB:
            chrome.tabs.create({
                url: request.url
            });
            break;
        case EVENTS.OPEN_NEW_WINDOW:
            chrome.windows.create({
                url: request.url,
                state: 'maximized'
            });
            break;
        case EVENTS.OPEN_INCOGNITO:
            chrome.windows.create({
                url: request.url,
                incognito: true,
                state: 'maximized'
            });
            break;
        case EVENTS.SET_USER_STATUS:
            if (request.status && request.account) {
                localStorage.setItem('account', JSON.stringify(request.account));
            }
            break;
    }
}

function searchBookmarks(query) {
    return new Promise((resolve, reject) => {
        chrome.bookmarks.search(query, (res) => {
            resolve(res);
        });
    });
}

function searchHistory(query) {
    return new Promise((resolve, reject) => {
        chrome.history.search({ text: query, maxResults: 10 }, (res) => {
            resolve(res);
        });
    });
}

function createId(prefix, num) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let usort_id = [];
    let radix = chars.length;
    let len = num || 36;
    usort_id[0] = prefix || "ntp_";
    for (let i = 1; i < len; i++) usort_id[i] = chars[0 | Math.random() * radix];
    return usort_id.join('');
}

function Browser() {
    let userAgent = navigator.userAgent;
    let tem;

    let os = getOS(userAgent);
    let match = userAgent.match(/(opera|coast|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i) || [];

    tem = userAgent.match(/\bIEMobile\/(\S+[0-9])/);
    if (tem !== null) {
        return {
            name: 'IEMobile',
            version: tem[1].split('.')[0],
            fullVersion: tem[1],
            os: os
        };
    }

    if (/trident/i.test(match[1])) {
        tem = /\brv[ :]+(\S+[0-9])/g.exec(userAgent) || [];
        return {
            name: 'IE',
            version: tem[1] && tem[1].split('.')[0],
            fullVersion: tem[1],
            os: os
        };
    }

    if (match[1] === 'Chrome') {
        tem = userAgent.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return {
                name: 'Opera',
                version: tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }

        tem = userAgent.match(/\bEdg\/(\S+)/) || userAgent.match(/\bEdge\/(\S+)/);
        if (tem !== null) {
            return {
                name: 'Edge',
                version: tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }
    }
    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if (match[0] === 'Coast') {
        match[0] = 'OperaCoast';
    }

    if (match[0] !== 'Chrome') {
        let tem = userAgent.match(/version\/(\S+)/i)
        if (tem !== null && tem !== '') {
            match.splice(1, 1, tem[1]);
        }
    }

    if (match[0] === 'Firefox') {
        match[0] = /waterfox/i.test(userAgent) ?
            'Waterfox' :
            match[0];
    }

    return {
        name: match[0],
        version: match[1].split('.')[0],
        fullVersion: match[1],
        os: os
    };

    function getOS(userAgent) {
        if (userAgent.indexOf('Windows Phone') !== -1) {
            return 'Windows Phone';
        }
        if (userAgent.indexOf('Win') !== -1) {
            return 'Windows';
        }
        if (userAgent.indexOf('Android') !== -1) {
            return 'Android';
        }
        if (userAgent.indexOf('Linux') !== -1) {
            return 'Linux';
        }
        if (userAgent.indexOf('X11') !== -1) {
            return 'UNIX';
        }
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            return 'iOS';
        }
        if (userAgent.indexOf('Mac') !== -1) {
            return 'macOS X';
        }
        return 'unknown';
    }
}