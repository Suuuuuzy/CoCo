[{id: 'global-keys', key: 'globalMediaKeys'}, {id: 'music-notifications', key: 'musicNotifications'}].forEach(function(setting) {
	var cachedSetting = +localStorage.getItem(setting.key);
	var checkbox = document.getElementById(setting.id);

	checkbox.checked = isNaN(cachedSetting) ? checkbox.checked : cachedSetting;

	checkbox.addEventListener('change', function() {
		chrome.runtime.sendMessage({type: 'setSettings', key: setting.key, value: checkbox.checked});
		localStorage.setItem(setting.key, +checkbox.checked);
	});

	chrome.runtime.sendMessage({type: 'getSettings', key: setting.key}, function(checked) {
		if (cachedSetting !== +checked) {
			checkbox.checked = checked;
			localStorage.setItem(setting.key, +checked);
		}
	});
});

chrome.runtime.sendMessage({type: 'hasPendingMessages'}, function(hasPendingMessages) {
	if (hasPendingMessages) {
		document.getElementById('pendingMessages').style.display = 'block';
	}
});
chrome.runtime.sendMessage({type: 'getSettings', key: 'audioGranted'}, function(audioGranted) {
	if (!audioGranted) {
		document.getElementById('askSAMI').style.display = 'none';
	}
});

document.getElementById('askSAMI').addEventListener('click', function() {
	chrome.runtime.sendMessage({type: 'toggleListening'});
}, false);
document.getElementById('playMessages').addEventListener('click', function() {
	chrome.runtime.sendMessage({type: 'playMessages'});
}, false);
document.getElementById('dismissMessages').addEventListener('click', function() {
	chrome.runtime.sendMessage({type: 'dismissMessages'});
}, false);
