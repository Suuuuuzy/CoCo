// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/popup/gmail/tabletView.js

function onLoad() {
	if (location.href.indexOf("mui=dy1CheckerForGmail") != -1) {
		let s = document.createElement('link');
		s.setAttribute("href", chrome.runtime.getURL("popup/gmail/tabletView.css"));
		s.setAttribute("rel", "stylesheet");
		s.setAttribute("type", "text/css");
		document.head.appendChild(s);
	}
}

window.addEventListener("load", onLoad);
// original file:/Users/jianjia/Documents/COCO_results/all/1k_9k/kankhbhekghfgkfbeafcahgnpgnniajg/js/content_script.js

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
