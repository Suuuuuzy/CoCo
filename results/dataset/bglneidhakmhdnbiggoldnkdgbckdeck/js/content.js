var contentInjected = contentInjected || 0;
if (!contentInjected) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (sender.id !== 'bglneidhakmhdnbiggoldnkdgbckdeck') {
			sendResponse(false);
			return;
		}

		window.postMessage(request, '*');
		sendResponse(true); // ACK
	});

	window.addEventListener('unload', function() {
		try {
			chrome.runtime.sendMessage({type: 'internal', state: 'leave'});
		} catch (error) {}
	}, false);

	chrome.runtime.sendMessage({type: 'internal', state: 'join'});
	window.postMessage({type: 'extension', action: 'join'}, '*');

	contentInjected = 1;
}
