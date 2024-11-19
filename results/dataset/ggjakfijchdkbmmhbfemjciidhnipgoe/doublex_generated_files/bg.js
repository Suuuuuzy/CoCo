// original file:/Users/jianjia/Documents/COCO_results/all/10k/ggjakfijchdkbmmhbfemjciidhnipgoe/bg/background.js

import {config} from '../config.js';

initContextMenu();

checkSearchEngines();

chrome.runtime.onInstalled.addListener((data) => {
    if (data['reason'] === 'install') {
        chrome.runtime.setUninstallURL(config.uninstall);
    } else if (data['reason'] === 'update') {
        if (data['previousVersion'] === '1.0.0') {
            chrome.tabs.create({url: config.update});
        }
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: chrome.extension.getURL('extension/index.html')});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.message === 'getDefaultSearchEngines') {
        sendResponse({
            defaultSearch: localStorage.getItem('default_engine'),
            privateEngine: localStorage.getItem('private_engine')
        });
    } else if (request.message === 'setDefaultSearchEngine') {
        let engine = request.engine.toLowerCase() === 'yahoo' || request.engine.toLowerCase() === 'default' ? 'yahoo' : request.engine.toLowerCase()
        writeCookie('se', engine);
        saveSettings('default_engine', engine);
    } else if (request.message === 'setPrivateSearchEngine') {
        let engine = request.engine.toLowerCase() === 'default' ? 'duckduckgo' : request.engine.toLowerCase()
        writeCookie('private_engine', engine);
        saveSettings('private_engine', request.engine);
    } else if (request.message === 'uninstall') {
        setSelfUninstall(false, sendResponse);
    } else if (request.message === 'openIncognito') {
        const data = request.data;
        openIncognito(data.query, data.se);
    } else if (request.message === 'onw') {
        const data = request.data;
        const url = data.query ? `${config.search}&se=${data.se}&q=${data.query}` : null;
        chrome.windows.create({url: url});
    } else if (request.message === 'ont') {
        const data = request.data;
        const url = data.query ? `${config.search}&se=${data.se}&q=${data.query}` : null;
        chrome.tabs.create({url: url});
    }

    return true;
});

chrome.contextMenus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
        case 'uninstall':
            setSelfUninstall(false);
            break;
        case 'how-to':
            chrome.tabs.create({
                url: config.goRedirectionWebsite
            });
            break;
        case 'like':
            chrome.tabs.create({
                url: config.like
            });
            break;
        case 'privacy':
            chrome.tabs.create({
                url: `https://www.${config.domain}/wim/privacy`
            });
            break;
        case 'faq':
            chrome.tabs.create({
                url: `https://www.${config.domain}/wim/help`
            });
            break;
    }
});

function saveSettings(key, value) {
    localStorage.setItem(key, value);
}

function openIncognito(query = null, se = 'yahoo') {
    const url = query ? `${config.search}&se=${se}&q=${query}` : null;
    chrome.windows.create({
        url: url,
        incognito: true
    });
}

function initContextMenu() {
    const contexts = ['page_action', 'browser_action'];

    chrome.contextMenus.create({
        'title': 'How to use',
        'type': 'normal',
        'id': 'how-to',
        'contexts': contexts
    });
    chrome.contextMenus.create({
        'title': 'Privacy',
        'type': 'normal',
        'id': 'privacy',
        'contexts': contexts
    });
    chrome.contextMenus.create({
        'title': 'FAQ',
        'type': 'normal',
        'id': 'faq',
        'contexts': contexts
    });
    chrome.contextMenus.create({
        'title': 'I like this extension',
        'type': 'normal',
        'id': 'like',
        'contexts': contexts
    });
    chrome.contextMenus.create({
        'title': 'Uninstall from Chrome',
        'type': 'normal',
        'id': 'uninstall',
        'contexts': contexts
    });
}

function setSelfUninstall(showDialog, sendResponse = null) {
    chrome.runtime.setUninstallURL(`${config.uninstall}&fe=true`, () => {
        if (sendResponse) {
            sendResponse({
                origin: 'ext',
                response: 'uninstalled'
            });
        }

        chrome.management.uninstallSelf({
            showConfirmDialog: showDialog
        }, () => {
            if (chrome.runtime.lastError) {
                if (sendResponse) {
                    sendResponse({
                        origin: 'ext',
                        response: 'uninstall-failed'
                    });
                }
                return false;
            }
        });
    });
}

function writeCookie(cookieName, cookieValue) {
    chrome.cookies.set({
        url: `https://${config.domain}`,
        name: cookieName,
        value: cookieValue,
        domain: `.${config.domain}`,
        secure: true,
        sameSite: 'no_restriction',
    });
}

function checkSearchEngines() {
    chrome.cookies.getAll({url: `https://${config.domain}`}, (cookies) => {
        cookies.forEach((cookie) => {
            if (cookie.name === 'se') {
                saveSettings('default_engine', cookie.value);
            } else if (cookie.name === 'private_engine') {
                saveSettings('private_engine', cookie.value);
            }
        });
    });
}

