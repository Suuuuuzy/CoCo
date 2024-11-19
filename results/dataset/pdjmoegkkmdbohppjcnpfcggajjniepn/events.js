
function openDashboard() {
    var creating = chrome.tabs.create({
        url: '/dashboard.html'
    });
}

chrome.browserAction.onClicked.addListener(openDashboard);
