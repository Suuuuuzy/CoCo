// original file:/Users/jianjia/Documents/COCO_results/all/10k/ggjakfijchdkbmmhbfemjciidhnipgoe/content_script/contentScript.js

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
const params = getParams(url.search);


(() => {
    /* Used to detect installation */
    document.body.className += ' ' + params['s'];

    /* If this variable isn't null, it means we're installed and ready to communicate with application */
    const vertical = document.querySelector(`.${params['vert']}`);
    if (document.body.className.includes('dashboard-app') && vertical) {
        const button = document.querySelector('#detect-installation');

        if (button) {
            button.click();
        }
    }

    window.addEventListener('message', event => {
        if (event.source !== window) {
            console.log('Only accepting messages from ourselves!');
            return;
        }

        chrome.runtime.sendMessage(event.data, response => {
            event.source.postMessage(response, event.origin);
        });
    }, false);

})();
