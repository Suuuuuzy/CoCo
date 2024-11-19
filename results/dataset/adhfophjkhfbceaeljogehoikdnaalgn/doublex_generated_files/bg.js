// original file:/Users/jianjia/Documents/COCO_results/all/1k-/detected/adhfophjkhfbceaeljogehoikdnaalgn/background2.js

/* global chrome */
chrome.tabs.onActivated.addListener(function(activeInfo, changeInfo, tab) {
    //  console.log(activeInfo.tabId)
    // chrome.tabs.executeScript(activeInfo.tabId, { code: 'window.print();' })
    // console.log('tabId, changeInfo, tab', activeInfo, changeInfo, tab)
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (!tab) {
            return;
        }
        createIframe(tab.id, tab.url);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // alert('updated from background')
    if (changeInfo.status === 'complete') {
        // console.log('tabId, changeInfo, tab', tabId, changeInfo, tab.url)
        createIframe(tabId, tab.url);
    }
    // console.log(tabId, changeInfo, tab)
});

function createIframe(id, url) {
    if (!url || url.indexOf('http') !== 0) {
        return;
    }

    const realUrl = url.replace('http://', '').replace('https://', '');

    chrome.tabs.query({ active: false }, function(tabs) {
        // console.log('tabs', tabs);
        tabs.forEach((tab) => {
            if (!tab.url || tab.url.indexOf('http') !== 0) {
                return;
            } else if (tab.url.includes('https://chrome.google.com/webstore')) {
                return;
            }

            chrome.tabs.executeScript(tab.id, {
                code: `
        (function(){
            if(document.getElementById("infomax_ifrm_super")){
                document.getElementById("infomax_ifrm_super").remove()
            }
        })()
        `
            });
        });
    });

    chrome.storage.sync.get(['userkey', 'urlExcludeList', 'urlCtrl'], function(data) {
        if (data && data.userkey) {
            let isRun = false;

            const { viewOption, allowUrls, denyUrls } = data.urlCtrl;

            if (viewOption === '보지 않기') {
            } else if (viewOption === '선택된 사이트만 보기') {
                if (allowUrls.find((str) => realUrl.includes(str))) {
                    isRun = true;
                }
            } else if (viewOption === '모든 사이트 보기') {
                if (!denyUrls.find((str) => realUrl.includes(str))) {
                    isRun = true;
                }
            }

            // console.log(isRun, denyUrls, realUrl);

            if (isRun) {
                const code = `
                    (function(){
                        if(!document.getElementById("infomax_ifrm_super")){
                            //document.getElementById("infomax_ifrm_super").remove()
                            var iframe = document.createElement('iframe');
                            iframe.setAttribute('id', 'infomax_ifrm_super');
                            iframe.src = 'https://chrome.einfomax.co.kr/view/${data.userkey}'
                            iframe.scrolling = 'no'
                            iframe.frameBorder = 0
                            iframe.style.cssText =
                                'position: fixed;bottom: 0px;left: 0px;width: 100%;height: 30px;min-height: 30px;max-height: 30px;z-index: 999999;border: 0;background-color: #FFF;border-top: 0px solid #000;'
                            document.documentElement.appendChild(iframe)
                        }
                    })()
                    `;
                chrome.tabs.executeScript(id, { code });
            }
        }
    });
}

