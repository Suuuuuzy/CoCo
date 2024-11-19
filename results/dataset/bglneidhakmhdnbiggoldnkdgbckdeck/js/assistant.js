var firstEnableBox = document.getElementById('firstEnableBox');
var settingsBox = document.getElementById('settingsBox');

chrome.runtime.sendMessage({type: 'getSettings', key: 'audioGranted'}, function(audioGranted) {
	if (audioGranted) {
		if (settingsBox) {
			settingsBox.style.display = 'block';
		}
	} else {
		if (firstEnableBox) {
			firstEnableBox.style.display = 'block';
		}
	}
});
chrome.runtime.sendMessage({type: 'getSettings', key: 'voiceActivation'}, function(voiceActivation) {
	if (!voiceActivation) {
		// Manual
		document.getElementById('manual').checked = true;
	} else {
		chrome.runtime.sendMessage({type: 'getSettings', key: 'voiceActivationCommand'}, function(voiceActivationCommand) {
			if (voiceActivationCommand === 1) {
				// SAMI
				document.getElementById('saySAMI').checked = true;
				document.getElementById('sensitivity-settings').style.display = 'block';
			}
		});
	}
});
chrome.runtime.sendMessage({type: 'getSettings', key: 'autoSpeak'}, function(autoSpeak) {
	if (autoSpeak) {
		document.getElementById('talk').checked = true;
	} else {
		document.getElementById('notify').checked = true;
	}
});
chrome.runtime.sendMessage({type: 'getSettings', key: 'detectionSensitivity'}, function(sensitivity) {
	document.getElementById('sensitivity').value = sensitivity;
});

document.getElementById('audioGrant').addEventListener('click', function() {
	audioRequest()
		.then(function() {
			toast('SAMI enabled!', 4000);

			chrome.runtime.sendMessage({type: 'setSettings', key: 'audioGranted', value: true});
			chrome.runtime.sendMessage({type: 'setSettings', key: 'voiceActivation', value: true, priority: true});

			settingsBox.style.display = 'block';
			firstEnableBox.style.display = 'none';
		})
		.catch(function() {
			toast('<span>You have blocked microphone access</span><br><span><a href="https://support.google.com/chrome/answer/2693767" target="_blank" class="red-text text-darken-1">Click here</a> to learn how to undo it</span>');

			chrome.runtime.sendMessage({type: 'setSettings', key: 'audioGranted', value: false});
		})
});

var sensitivityChangeTimeout;
var nextSensitivity;
document.getElementById('sensitivity').addEventListener('change', function() {
	clearTimeout(sensitivityChangeTimeout);

	var newSensitivity = this.value;
	if (nextSensitivity === newSensitivity) {
		return;
	}

	nextSensitivity = newSensitivity;
	sensitivityChangeTimeout = setTimeout(function() {
		chrome.runtime.sendMessage({type: 'setSettings', key: 'detectionSensitivity', value: nextSensitivity});
	}, 4000);
});

document.querySelectorAll("input[name='voiceActivationCommand']").forEach(function(radioItem) {
	radioItem.addEventListener('change', function() {
		if (!this.checked) {
			return;
		}

		switch (this.id) {
			case 'manual':
				updateVoiceCommand(0);
				document.getElementById('sensitivity-settings').style.display = 'none';
				break;
			case 'saySAMI':
				updateVoiceCommand(1);
				document.getElementById('sensitivity-settings').style.display = 'block';
				break;
			// case 'sayGTribe':
				// updateVoiceCommand(2);
				// break;
		}
	}, false);
});

document.querySelectorAll("input[name='autoSpeak']").forEach(function(radioItem) {
	radioItem.addEventListener('change', function() {
		if (!this.checked) {
			return;
		}

		switch (this.id) {
			case 'talk':
				chrome.runtime.sendMessage({type: 'setSettings', key: 'autoSpeak', value: true});
				break;
			case 'notify':
				chrome.runtime.sendMessage({type: 'setSettings', key: 'autoSpeak', value: false});
				break;
		}
	}, false);
});

function toast(toastBody) {
	var removeElement = function() {
		toastContainer.parentNode.removeChild(toastContainer);
	}

	var toastContainer = document.getElementById('toast-container');
	if (toastContainer) {
		removeElement();
	}

	var toastContainer = document.createElement('div');
	toastContainer.id = 'toast-container';
	toastContainer.innerHTML = '<div class="toast" style="top: 0px; opacity: 1; display: block;">' + toastBody + '</div>';
	toastContainer.addEventListener('click', function() {
		toastContainer.parentNode.removeChild(toastContainer);
	});
	var removeTimeout = setTimeout(removeElement, 4000);
	toastContainer.addEventListener('mouseenter', function() {
		clearTimeout(removeTimeout);
	});
	toastContainer.addEventListener('mouseleave', function() {
		removeTimeout = setTimeout(removeElement, 2000);
	});

	document.body.appendChild(toastContainer);
}

function updateVoiceCommand(commandId) {
	if (!commandId) {
		chrome.runtime.sendMessage({type: 'setSettings', key: 'voiceActivation', value: false, priority: true});
	} else {
		chrome.runtime.sendMessage({type: 'setSettings', key: 'voiceActivationCommand', value: commandId});
		chrome.runtime.sendMessage({type: 'setSettings', key: 'voiceActivation', value: true, priority: true});
	}
}

function audioRequest() {
	return navigator.mediaDevices.getUserMedia({ audio: true })
		.then(function(stream) {
			stream.getAudioTracks().forEach(function(track) {
				track.stop();
			});
		});
}