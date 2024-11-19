window.addEventListener('message', function (e) {
    if (!e.data.from || e.data.from != '__newtab') {
        return false;
    }

    if (localStorage.getItem('__debug')) {
        console.log('Content script receiving: ');
        console.log(e);
    }

    chrome.runtime.sendMessage(e.data, (res) => {
        if (chrome.runtime.lastError) {
            
        }
        
        const sender = {
            event: e.data.event,
            res: res
        };
        sendMessage(sender);

        if (localStorage.getItem('__debug')) {
            console.log('Content script sending: ');
            console.log(sender);
        }
    });
});


// chrome.runtime.onMessage.addListener(request => {
//     sendMessage(request);
//     return true;
// });

function sendMessage(sender) {
    sender.from = 'ext';
    window.postMessage(sender, '*');
}