/* global chrome */
document.addEventListener(
    'ChromeInfomaxEvent',
    function(e) {
        // console.log('Event =>', e);
        // // send message to ext
        // const someInformation = {
        //     /* your msg here */
        // };
        // chrome.extension.sendMessage(someInformation, function(response) {
        //     // callback
        // });

        // console.log('call?');
        if (e.detail && e.detail.type === 'save') {
            // console.log('save url ctrl');
            chrome.storage.sync.set({ urlCtrl: e.detail }, function() {});
        }
    },
    false
);
