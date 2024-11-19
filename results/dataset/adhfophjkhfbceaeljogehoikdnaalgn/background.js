// /* global chrome */

// // var s = document.createElement('script');
// // // TODO: add "script.js" to web_accessible_resources in manifest.json
// // s.src = chrome.extension.getURL('inject.js');
// // s.onload = function() {
// //     //this.remove();
// //     console.log('onload');
// // };

// // var iframe = document.createElement('iframe');
// // iframe.src = 'https://imboard.einfomax.co.kr/service/nd/ticker.html';

// // //(document.head || document.documentElement).appendChild(s);
// // iframe.style.cssText =
// //     'position: fixed;bottom: 0px;left: 0px;width: 100%;height: 26px;z-index: 999999;border: 0;background-color: #FFF;border-top: 1px solid #000;';
// // document.documentElement.appendChild(iframe);

// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   console.log('message', message, sender, sendResponse)
// //   sendResponse(`I'm fine thank you and you?`)
// //   if (message === `How are you?`) {
// //   }
// // })

// chrome.storage.sync.get(['userkey', 'urlExcludeList'], function(data) {
//   // console.log('=======>', data, location)
//   return
//   if (data && data.userkey) {
//     if (data.urlExcludeList && data.urlExcludeList.includes(location.host)) {
//       return
//     }

//     const iframe = document.createElement('iframe')
//     iframe.src = `https://chrome.einfomax.co.kr/view/${data.userkey}`
//     // (document.head || document.documentElement).appendChild(s);
//     iframe.scrolling = 'no'
//     iframe.frameBorder = 0
//     iframe.style.cssText =
//       'position: fixed;bottom: 0px;left: 0px;width: 100%;height: 30px;z-index: 999999;border: 0;background-color: #FFF;border-top: 0px solid #000;'
//     document.documentElement.appendChild(iframe)
//   }
// })

// // chrome.tabs.onActiveChanged.addListener(function(activeInfo) {
// //   console.log('activeInfo=>', activeInfo.tabId)
// // })
