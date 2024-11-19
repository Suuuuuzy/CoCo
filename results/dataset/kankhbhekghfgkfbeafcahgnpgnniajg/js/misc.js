function getUILanguage(short) {
    $language = chrome.i18n.getUILanguage().toLowerCase().replace('-', '_');
    if (!short) {
        return $language;
    }
    return $language.split('_')[0];
}

function addContextMenu(menu) {
    if (menu.languages && (menu.languages.indexOf('all') >= 0 || menu.languages.indexOf(getUILanguage()) >= 0 || menu.languages.indexOf(getUILanguage(true)) >= 0)) {
        if (!menu.type) {
            menu.type = 'normal';
        }
        chrome.contextMenus.create({
            parentId: menu.parentId,
            id: menu.id,
            title: menu.title,
            type: menu.type,
            contexts: menu.contexts,
            onclick: menu.onclick
        });
    }
}

function openTab(url) {
    chrome.tabs.create({ 
        url: url, 
        active: true 
    });
}

function openPrivacyWindow(url) {
    chrome.windows.create({
        url: url,
        state: 'maximized',
        incognito: true
    });
}

function createUUID() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}