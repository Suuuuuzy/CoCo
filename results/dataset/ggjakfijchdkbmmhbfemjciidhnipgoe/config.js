'use strict';

const getLocation = (url) => {
    let l = document.createElement('a');
    l.href = url;
    return l;
};

const getParams = (query) => {
    let params = {};
    if (query.startsWith('?')) {
        query = query.substring(1);
    }
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

const url = getLocation(chrome.runtime.getManifest()
    .chrome_settings_overrides.search_provider.search_url);
const domain = `${url.hostname.split('.')[1]}.${url.hostname.split('.')[2]}`;
const extName = chrome.runtime.getManifest()
    .name;
const params = getParams(url.search);

export const config = {
    domain: domain,
    yid: params['s'],
    vert: params['vert'],
    extensionName: extName,
    uninstall: `${url.origin}/wim/uninstall?s=${params['s']}&vert=${params['vert']}`,
    search: `${url.origin}${url.pathname}?category=web&s=${params['s']}&vert=${params['vert']}`,
    extId: chrome.runtime.id,
    goRedirectionWebsite: chrome.runtime.getManifest().homepage_url,
    like: `${url.origin}/wim/rate?id=${chrome.runtime.id}&s=${params['s']}&a=LikeLink`,
    dislike: `${url.origin}/wim/ds/survey?yid=${params['s']}&vert=${params['vert']}&extid=${chrome.runtime.id}&name=${extName}`,
    update: `${url.origin}/wim/updated?vert=commands`
};