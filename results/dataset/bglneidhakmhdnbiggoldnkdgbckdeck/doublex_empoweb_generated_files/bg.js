// original file:/media/data2/jianjia/extension_data/unzipped_extensions/bglneidhakmhdnbiggoldnkdgbckdeck/js/background.js

var musicActiveTab;
var musicNotifications = true;
var autoSpeak = false;
var pendingTabCommands = {};

var audioAlert;
var audioStream;
var audioContext;
var callbackManager;
var browserActionManager;
var webSocketManager;
var voiceDB;
var recognizer;
var recorder;
var webRecognizer;

var ACTIVATE_SAMI = 1;
var ACTIVATE_GTRIBE = 2;

var voiceActivationLoaded = false;
var startingUpVoiceActivation = false;
var shuttingDownVoiceActivation = false;
var listening = false;
var activationCommand = 1;
var detectionSensitivity = 30;
var lastDetectedCount = 0;

var loadVoiceActivationTimeout;
var unloadVoiceActivationTimeout;

chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason === 'install') {
		setSettings({key: 'audioGranted', value: false});
		setSettings({key: 'voiceActivation', value: true});
		setSettings({key: 'voiceActivationCommand', value: ACTIVATE_SAMI});
		setSettings({key: 'autoSpeak', value: false});
		setSettings({key: 'globalMediaKeys', value: true});
		setSettings({key: 'musicNotifications', value: true});
		setSettings({key: 'detectionSensitivity', value: 30});

		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(function(stream) {
				setSettings({key: 'audioGranted', value: true});
				stream.getAudioTracks().forEach(function(track) {
					track.stop();
				});
			}).catch(fnn);
	} else {
		getAvailableTabs().then(function(tabs) {
			tabs.forEach(function(tabId) {
				chrome.tabs.executeScript(tabId, {file: 'js/content.js'});
			});
		});
	}
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	if (request.type === 'setSettings') {
		setSettings(request);
	} else if (request.type === 'getSettings') {
		return getSettings(request, sendResponse);
	} else if (request.type === 'music') {
		if (request.change === 'state') {
			if (request.state === 'playing') {
				chrome.tabs.executeScript(sender.tab.id, {file: 'js/content.js'});
				musicActiveTab = sender.tab.id;
				chrome.power.requestKeepAwake('system');
			} else if (sender.tab.id === musicActiveTab) {
				chrome.power.releaseKeepAwake();
			}
		} else if (request.change === 'track') {
			if (!musicNotifications) {
				return;
			}

			getMusicActiveTab().then(function(tabId) {
				if (!tabId) {
					chrome.tabs.executeScript(sender.tab.id, {file: 'js/content.js'});
				}
			});

			var trackTitle;
			if (typeof request.track.artist !== 'undefined') {
				trackTitle = request.track.artist + '  ' + request.track.title;
			} else {
				trackTitle = request.track.title;
			}

			getImageBlob(request.track.artwork_url)
				.then(function(blobUrl) {
					showTrackNotification(trackTitle, blobUrl);
				});

			return true;
		}
	} else if (request.type === 'voiceConnect') {
		getSettings('audioGranted').then(function(audioGranted) {
			if (audioGranted) {
				sendResponse(true);
				chrome.tabs.executeScript(sender.tab.id, {file: 'js/content.js'});
			}
		});
		return true;
	} else if (request.type === 'iconState') {
		if (!browserActionManager) {
			sendResponse(false);
			return;
		}

		if (request.state === 'listening') {
			browserActionManager.goRec();
		} else {
			browserActionManager.goG();
		}

		sendResponse(true);
	} else if (request.type === 'screenSharing') {
		getPermission('desktopCapture')
			.then(function() {
				chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], sender.tab, function(sourceId) {
					sendResponse({ sourceId: sourceId });
				});
			})
			.catch(function() {
				sendResponse({ error: 'permissionDenied' });
			});
		return true;
	} else if (request.type === 'getSpecs') {
		getSystemSpecs()
			.then(function(result) {
				sendResponse({
					cpu: result[0],
					memory: result[1],
					display: result[2]
				});
			});
		return true;
	} else if (request.type === 'isInstalled') {
		sendResponse(true);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'internal') {
		if (request.state === 'join') {
			addAvailableTab(sender.tab.id);

			if (pendingTabCommands[sender.tab.id]) {
				pendingTabCommands[sender.tab.id].forEach(function(payload) {
					commandTab(sender.tab.id, payload);
				});
				delete pendingTabCommands[sender.tab.id];
			}
		} else if (request.state === 'leave') {
			removeAvailableTab(sender.tab.id);

			getMusicActiveTab()
				.then(function(activeTab) {
					if (sender.tab.id === activeTab) {
						musicActiveTab = null;
						chrome.power.releaseKeepAwake();
					}
				});
		}
	} else if (request.type === 'toggleListening') {
		if (!webRecognizer) {
			return;
		}

		if (webRecognizer.running()) {
			webRecognizer.abort();
		} else {
			webRecognizer.start();
		}
	} else if (request.type === 'setSettings') {
		setSettings(request);
	} else if (request.type === 'getSettings') {
		return getSettings(request, sendResponse);
	} else if (request.type === 'hasPendingMessages') {
		sendResponse(false);
	} 
});

chrome.runtime.onSuspend.addListener(function() {
	Promise.all([getMusicActiveTab(), getNotificationBlobs(), getAvailableTabs()])
		.then(function(results) {
			chrome.storage.local.set({
				musicActiveTab: results[0],
				notificationBlobs: results[1],
				availableTabs: results[2]
			});
		});
});

chrome.runtime.onUpdateAvailable.addListener(function() {
	Promise.all([getMusicActiveTab(), getNotificationBlobs(), getAvailableTabs()])
		.then(function(results) {
			chrome.storage.local.set({
				musicActiveTab: results[0],
				notificationBlobs: results[1],
				availableTabs: results[2]
			}, function() {
				chrome.runtime.reload();
			});
		});
});

chrome.notifications.onClosed.addListener(function(notificationId) {
	getNotificationBlobs()
		.then(function(blobs) {
			if (blobs[notificationId]) {
				blobs[notificationId].forEach(function(blobURL) {
					URL.revokeObjectURL(blobURL);
				});
				delete blobs[notificationId];
			}
		});
});

chrome.notifications.onClicked.addListener(function(notificationId) {
	chrome.notifications.clear(notificationId);
});

function getMusicActiveTab() {
	return new Promise(function(resolve) {
		if (typeof musicActiveTab !== 'undefined') {
			resolve(musicActiveTab);
			return;
		}

		chrome.storage.local.get('musicActiveTab', function(result) {
			musicActiveTab = null;

			var tabId = result.musicActiveTab;
			if (tabId) {
				// Just in case the tab silently died
				chrome.tabs.get(tabId, function(tab) {
					if (tab) {
						musicActiveTab = tabId;
						resolve(musicActiveTab);
					} else {
						resolve(null);
					}
				})
			} else {
				resolve(null);
			}
		});
	});
}

var notificationBlobs;
function getNotificationBlobs() {
	return new Promise(function(resolve) {
		if (typeof notificationBlobs !== 'undefined') {
			resolve(notificationBlobs);
			return;
		}

		chrome.storage.local.get({notificationBlobs: {}}, function(result) {
			notificationBlobs = result.notificationBlobs;
			resolve(notificationBlobs);
		})
	});
}

var availableTabs;
function getAvailableTabs() {
	return new Promise(function(resolve) {
		if (typeof availableTabs !== 'undefined') {
			resolve(availableTabs);
			return;
		}

		chrome.storage.local.get({availableTabs: []}, function(result) {
			availableTabs = result.availableTabs;
			getAllTabs().then(function(allTabs) {
				var tabIds = [];

				allTabs.forEach(function(tab) {
					if (tab.id >= 0) {
						tabIds.push(tab.id);
					}
				});

				availableTabs = availableTabs.filter(function(tabId) {
					return tabIds.includes(tabId);
				});

				resolve(availableTabs);
			});
		});
	});
}

function addAvailableTab(tabId) {
	getAvailableTabs()
		.then(function(tabs) {
			if (tabs.indexOf(tabId) === -1) {
				tabs.push(tabId);
			}
		});
}

function removeAvailableTab(tabId) {
	getAvailableTabs()
		.then(function(tabs) {
			while ((index = tabs.indexOf(tabId)) !== -1) {
				tabs.splice(index, 1);
			}
		});
}

function selectTabHidden(tabId) {
	return new Promise(function(resolve) {
		if (!tabId) {
			resolve();
			return;
		}

		chrome.tabs.get(tabId, function(tab) {
			if (!tab.active) {
				resolve(tabId);
				return;
			}

			chrome.windows.get(tab.windowId, function(tabWindow) {
				if (tabWindow.state === 'minimized') {
					resolve(tabId);
				} else {
					resolve();
				}
			});
		});
	});
}

function commandTab(tabId, payload) {
	return new Promise(function(resolve, reject) {
		if (tabId && payload) {
			chrome.tabs.sendMessage(tabId, payload, function(result) {
				if (typeof result === 'undefined') {
					reject(chrome.runtime.lastError);
				} else if (result) {
					resolve(result);
				} else {
					reject();
				}
			});
		} else {
			reject();
		}
	});
}

function keyPressHandler(command) {
	getMusicActiveTab()
		.then(function(activeTab) {
			if (!activeTab) {
				return;
			}

			if (command === 'toggle_track') {
				commandTab(activeTab, {type: 'music', action: 'toggle'});
			} else if (command === 'next_track') {
				commandTab(activeTab, {type: 'music', action: 'next'});
			} else if (command === 'prev_track') {
				commandTab(activeTab, {type: 'music', action: 'previous'});
			}
		});
};

getSettings('globalMediaKeys').then(function(globalMediaKeys) {
	if (globalMediaKeys) {
		chrome.commands.onCommand.addListener(keyPressHandler);
	}
});
getSettings('musicNotifications').then(function(notifications) {
	musicNotifications = notifications;
});

function showTrackNotification(title, blobURL) {
	chrome.notifications.create('music:track', {
		type: 'basic',
		title: 'GTribe Music Player',
		message: title,
		silent: true,
		iconUrl: blobURL || 'icons/music.webp'
	}, function(notificationId) {
		linkBlobToNotification(blobURL, notificationId);

		// Hide notification after short timeout
		setTimeout(function() {
			chrome.notifications.clear(notificationId);
		}, 4000);
	});
}

function getSystemSpecs() {
	return Promise.all([
		new Promise(function(resolve) {
			chrome.system.cpu.getInfo(function(cpuInfo) {
				resolve({
					cores: cpuInfo.numOfProcessors,
					arch: cpuInfo.archName,
					model: cpuInfo.modelName.trim(),
					features: cpuInfo.features.join(',')
				});
			})
		}),
		new Promise(function(resolve) {
			chrome.system.memory.getInfo(function(memoryInfo) {
				resolve({
					size: memoryInfo.capacity
				});
			})
		}),
		new Promise(function(resolve) {
			chrome.system.display.getInfo(function(displayList) {
				var displays = [];
				displayList.forEach(function(display) {
					displays.push({
						name: display.name,
						width: display.bounds.width,
						height: display.bounds.height,
						internal: display.isInternal,
						primary: display.isPrimary,
						touch: display.hasTouchSupport
					});
				});
				resolve(displays);
			})
		})
	]);
}

function setSettings(request) {
	var setParams = {};
	setParams[request.key] = !!request.value;

	if (request.key === 'globalMediaKeys') {
		if (request.value) {
			chrome.commands.onCommand.addListener(keyPressHandler);
		} else {
			chrome.commands.onCommand.removeListener(keyPressHandler);
		}
	} else if (request.key === 'musicNotifications') {
		musicNotifications = !!request.value;
		if (!request.value) {
			chrome.notifications.getAll(function(notificationIds) {
				notificationIds.forEach(function(notificationId) {
					chrome.notifications.clear(notificationId);
				});
			});
		}
	} else if (request.key === 'voiceActivation') {
		clearTimeout(unloadVoiceActivationTimeout);
		clearTimeout(loadVoiceActivationTimeout);

		if (request.value) {
			if (voiceActivationLoaded) {
				resumeVoiceActivation();
			} else {
				loadVoiceActivationTimeout = setTimeout(loadVoiceActivation, request.priority ? 0 : 2000);
			}
		} else {
			pauseVoiceActivation();
			unloadVoiceActivationTimeout = setTimeout(unloadVoiceActivation, request.priority ? 0 : 2000);
		}
	} else if (request.key === 'voiceActivationCommand') {
		var newActivationCommand = parseInt(request.value) || ACTIVATE_SAMI;
		if (listening && newActivationCommand !== activationCommand) {
			activationCommand = newActivationCommand;
			reloadVoiceActivation();
		}
		setParams[request.key] = newActivationCommand;
	} else if (request.key === 'detectionSensitivity') {
		var newDetectionSensitivity = parseInt(request.value) || 30;
		if (listening && newDetectionSensitivity !== detectionSensitivity) {
			// Stop, then start the entire thing
			unloadVoiceActivation().then(loadVoiceActivation);
		}
		setParams[request.key] = newDetectionSensitivity;
	} else if (request.key === 'autoSpeak') {
		autoSpeak = !!request.value;
	} else if (request.key !== 'audioGranted') {
		return;
	}

	chrome.storage.local.set(setParams);
}

function getSettings(request, sendResponse) {
	var key = typeof request === 'string' ? request : request.key;

	var promise = new Promise(function(resolve) {
		if (key === 'globalMediaKeys' || key === 'musicNotifications' || key === 'voiceActivation' || key === 'audioGranted' || key === 'autoSpeak') {
			chrome.storage.local.get(key, function(result) {
				resolve(!!result[key]);
			});
		} else if (key === 'voiceActivationCommand' || key === 'detectionSensitivity') {
			chrome.storage.local.get(key, function(result) {
				resolve(parseInt(result[key]));
			});
		}
	});

	if (typeof sendResponse === 'function') {
		promise.then(sendResponse);
		return true;
	} else {
		return promise;
	}
}

function getPermission(permission) {
	return new Promise(function(resolve, reject) {
		var permissions = {permissions: [permission], origins: ['*://www.gamingtribe.com/*']};
		chrome.permissions.contains(permissions, function(result) {
			if (result) {
				resolve();
			} else {
				chrome.permissions.request(permissions, function(granted) {
					if (granted) {
						resolve();
					} else {
						reject();
					}
				});
			}
		});
	});
}

function getOneTab(tabId) {
	return new Promise(function(resolve) {
		chrome.tabs.get(baseTabId, function(tabData) {
			resolve(tabData);
		});
	});
}

function getAllTabs(isRelatedDomain) {
	return new Promise(function(resolve) {
		var filter = isRelatedDomain === false ? {} : {url: 'https://www.gamingtribe.com/*', windowType: 'normal'};
		filter.discarded= false;
		chrome.tabs.query(filter, function(tabsData) {
			resolve(tabsData);
		});
	});
};

function findDeliveryTabs(baseTabId) {
	return new Promise(function(resolve) {
		var tabsPromise;
		if (baseTabId) {
			tabsPromise = getOneTab(baseTabId)
				.then(function(tabData) {
					if (tabData) {
						return [tabData];
					} else {
						getAllTabs();
					}
				});
		} else {
			tabsPromise = getAllTabs();
		}

		tabsPromise.then(function(foundTabs) {
			if (foundTabs.length <= 1) {
				resolve(foundTabs);
			} else {
				var potentialTabs = foundTabs.filter(function(tab) {
					return !tab.discarded && tab.status === 'complete';
				});

				resolve(potentialTabs.sort(function(tabA, tabB) {
					if (tabA.active === tabB.active) {
						return tabB.index - tabA.index;
					} else {
						return tabB.active - tabA.active;
					}
				}));
			}
		})
	});
}

function addPendingTabCommand(tabId, command) {
	pendingTabCommands[tabId] = pendingTabCommands[tabId] || [];
	pendingTabCommands[tabId].push(command);

	setTimeout(function() {
		if (pendingTabCommands[tabId] && pendingTabCommands[tabId].indexOf(command) !== -1) { // Still pending and the same command is there (so nothing happened so far)
			delete pendingTabCommands[tabId]; // Remove the pending events
		}
	}, 60000);
}

var SpriteAnimation = function(context, url, frameCount, frameRate, loopLastFrames) {
	var image = new Image();
	image.src = url;

	var cycleDuration = (frameCount / frameRate) * 1000;
	var cycleFrameDuration = cycleDuration / frameCount;

	var loopDuration = loopLastFrames ? (loopLastFrames / frameRate) * 1000 : 0;
	var loopFrameDuration = loopLastFrames ? loopDuration / loopLastFrames : 0;

	var loopingStart = 0;
	var loopFrameNumberOffset = frameCount - loopLastFrames; // 9 - 3 = 6

	var startTime = performance.now();
	var ended = false;
	var endOnLoop = false;

	return {
		reset: function() {
			startTime = performance.now();
			loopingStart = 0;
			ended = false;
			endOnLoop = false;
		},
		isLooping: function() {
			return !!loopingStart;
		},
		lastLoop: function() {
			endOnLoop = true;
		},
		getImageData: function(timeDelta) {
			if (ended) {
				return null;
			}

			timeDelta = timeDelta >= 0 ? timeDelta : performance.now() - startTime;

			context.clearRect(0, 0, 32, 32);

			var mainFrameNumber;
			var nextFrameNumber;
			var frameBlend;

			if (loopingStart) {
				var loopPosition = (timeDelta - loopingStart) % loopDuration;
				var loopFrameNumber = (loopPosition / loopDuration) * loopLastFrames;
				var loopFrameNumberInt = loopFrameNumber|0;
				frameBlend = loopFrameNumber % 1;

				mainFrameNumber = loopFrameNumberOffset + loopFrameNumberInt;
				nextFrameNumber = frameBlend ? loopFrameNumberOffset + (((loopFrameNumberInt + 1) % loopFrameNumberInt) || 0) : -1;
			} else {
				var cyclePosition = timeDelta % cycleDuration;
				var frameNumber = (cyclePosition / cycleDuration) * frameCount;
				var frameNumberInt = frameNumber|0;
				frameBlend = frameNumber % 1;

				mainFrameNumber = frameNumberInt;
				nextFrameNumber = frameNumberInt + 1;

				if (nextFrameNumber >= frameCount) {
					if (loopLastFrames) {
						nextFrameNumber = loopFrameNumberOffset;
						loopingStart = timeDelta; // Start looping for next turn
					} else {
						nextFrameNumber = -1;
					}
				}
			}

			if (frameBlend > 0 && nextFrameNumber >= 0) {
				// Merge two frames
				context.globalCompositeOperation = 'lighter';

				context.globalAlpha = 1 - frameBlend;
				context.drawImage(image, mainFrameNumber * 32, 0, 32, 32, 0, 0, 32, 32);

				context.globalAlpha = frameBlend;
				context.drawImage(image, nextFrameNumber * 32, 0, 32, 32, 0, 0, 32, 32);
			} else {
				// Draw just current frame
				context.globalCompositeOperation = 'source-over';

				context.globalAlpha = 1;
				context.drawImage(image, mainFrameNumber * 32, 0, 32, 32, 0, 0, 32, 32);
			}

			if (nextFrameNumber === -1 || (endOnLoop && (nextFrameNumber === 0 || nextFrameNumber === mainFrameNumber))) {
				ended = true;
			}

			return context.getImageData(0, 0, 32, 32);
		}
	};
};

var BrowserActionManager = function() {
	var canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	var context2d = canvas.getContext('2d');

	var g2rec = new SpriteAnimation(context2d, 'icons/g2rec.png', 9, 22, 1);
	var rec2load = new SpriteAnimation(context2d, 'icons/rec2load.png', 9, 11, 3);
	var load2g = new SpriteAnimation(context2d, 'icons/load2g.png', 8, 22, 0);

	var defaultIconSet = {
		'16': 'icons/icon16.png',
		'32': 'icons/icon32.png'
	};

	var animationQueue = [];
	var currentAnimation = null;

	var resetIcon = function() {
		// Set to default icon
		animationQueue = [];
		currentAnimation = null;

		clearTimeout(nextFrame);
		nextFrame = null;

		chrome.browserAction.setIcon({ path: defaultIconSet });
	};

	var nextFrame;
	var processQueue = function() {
		var shouldContinue = true;
		var hasMoreInQueue = !!animationQueue.length;

		var imageData;
		if (currentAnimation && !hasMoreInQueue) {
			imageData = currentAnimation.getImageData();
		} else if (!currentAnimation && hasMoreInQueue) {
			// Start new animation
			currentAnimation = animationQueue.shift();
			currentAnimation.reset();
			imageData = currentAnimation.getImageData(0);
		} else if (currentAnimation && hasMoreInQueue) {
			// Transition to next animation
			currentAnimation.lastLoop();

			imageData = currentAnimation.getImageData();
			if (!imageData) {
				// Time to change animation
				currentAnimation = animationQueue.shift();
				currentAnimation.reset();
				imageData = currentAnimation.getImageData(0);
			}
		}

		if (imageData) {
			chrome.browserAction.setIcon({ imageData: imageData });
		} else {
			shouldContinue = false;
		}

		if (shouldContinue) {
			nextFrame = setTimeout(processQueue, 22);
		} else {
			resetIcon();
		}
	};

	return {
		reset: resetIcon,
		goRec: function() {
			var nextQueuedAnimation = animationQueue[animationQueue.length - 1];
			if (nextQueuedAnimation === g2rec || (!nextQueuedAnimation && currentAnimation === g2rec)) {
				return;
			}

			animationQueue.push(g2rec);
			nextFrame = nextFrame || setTimeout(processQueue, 22);
		},
		goLoad: function() {
			var nextQueuedAnimation = animationQueue[animationQueue.length - 1];
			if (nextQueuedAnimation === rec2load || (!nextQueuedAnimation && currentAnimation === rec2load)) {
				return;
			}

			if (nextQueuedAnimation === g2rec || (!nextQueuedAnimation && currentAnimation === g2rec)) {
				animationQueue.push(rec2load);
			} else {
				animationQueue.push(g2rec);
				animationQueue.push(rec2load);
			}

			nextFrame = nextFrame || setTimeout(processQueue, 22);
		},
		goG: function() {
			var nextQueuedAnimation = animationQueue[animationQueue.length - 1];
			if (nextQueuedAnimation === load2g || (!nextQueuedAnimation && currentAnimation === load2g) || currentAnimation === null) {
				return;
			}

			if (nextQueuedAnimation === rec2load || (!nextQueuedAnimation && currentAnimation === rec2load)) {
				animationQueue.push(load2g);
			} else if (nextQueuedAnimation === g2rec || (!nextQueuedAnimation && currentAnimation === g2rec)) {
				animationQueue.push(rec2load);
				animationQueue.push(load2g);
			} else {
				animationQueue.push(g2rec);
				animationQueue.push(rec2load);
				animationQueue.push(load2g);
			}

			nextFrame = nextFrame || setTimeout(processQueue, 22);
		}
	};
};

var WebRecognizer = function() {
	var webkitRecognizerRunning = false;

	var webkitRecognizer = new webkitSpeechRecognition();
	// webkitRecognizer.interimResults = true;
	webkitRecognizer.lang = 'en-US';
	webkitRecognizer.maxAlternatives = 5;

	var requestedTabId = null;
	var currentRequestId = 0;

	var processingFailTimeout;
	var doneCallback = function() {
		clearTimeout(processingFailTimeout);
		browserActionManager.goG();
		requestedTabId = null;
	};
	var failCallback = function() {
		clearTimeout(processingFailTimeout);
		browserActionManager.goG();
		callbackManager.remove(currentRequestId);
		requestedTabId = null;
	};

	var autoCancelTimeout;
	webkitRecognizer.onaudiostart = function(event) {
		webkitRecognizerRunning = true;
		browserActionManager.goRec();
		autoCancelTimeout = setTimeout(function() {
			if (webkitRecognizerRunning) {
				console.log('Auto-cancelling');
				webkitRecognizer.abort();
			}
		}, 2000);
	};
	webkitRecognizer.onspeechstart = function() {
		clearTimeout(autoCancelTimeout);

		currentRequestId = callbackManager.add(function(event, utterances) {
			if (event) {
				var command = {
					type: 'voice',
					action: 'process',
					event: event,
					utterances: utterances
				};

				chrome.windows.getLastFocused({windowTypes: ['normal']}, function(lastWindow) {
					if (!lastWindow || !lastWindow.id) {
						chrome.windows.create({url: 'https://www.gamingtribe.com/', focused: true, type: 'normal'}, function(window) {
							addPendingTabCommand(window.tabs[0].id, command);
						});
					} else {
						chrome.tabs.create({url: 'https://www.gamingtribe.com/', windowId: lastWindow.id}, function(tab) {
							addPendingTabCommand(tab.id, command);
						});

						chrome.windows.update(lastWindow.id, {focused: true});
					}
				});
			}

			doneCallback();
		});
	};
	webkitRecognizer.onaudioend = function() {
		webkitRecognizerRunning = false;
		browserActionManager.goLoad();
		clearTimeout(autoCancelTimeout);

		// Give it 5 seconds to process recognition results
		processingFailTimeout = setTimeout(failCallback, 5000);
	};

	var round = function(value, decimals) {
		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	};

	webkitRecognizer.onresult = function(event) {
		var resultList = event.results[event.resultIndex];

		var eventResultsResult = [];
        var resultUtterances = [];
		for (var i = 0, iLen = resultList.length; i < iLen; i++) {
			eventResultsResult[i] = {transcript: resultList[i].transcript, confidence: resultList[i].confidence};
			resultUtterances[i] = resultList[i].transcript;
        }

		(callbackManager.get(currentRequestId) || fnn)({results: [eventResultsResult], resultIndex: 0}, resultUtterances || []);
	};
	webkitRecognizer.onnomatch = function(event) {
		console.log('nomatch', event);
		failCallback();
	};
	webkitRecognizer.onerror = function(event) {
		console.log('error', event);
		failCallback();
	};

	this.running = function() {
		return webkitRecognizerRunning;
	};
	this.start = function(tabId) {
		if (!webkitRecognizerRunning) {
			requestedTabId = tabId;
			webkitRecognizer.start();
		}
	};
	this.abort = function(tabId) {
		if (typeof tabId === 'undefined' || requestedTabId === tabId) {
			webkitRecognizer.abort();
		}
	};
};

var voices = {all:[],male:[],female:[]};
function loadVoices() {
	var allVoices = speechSynthesis.getVoices().filter(function(voice) {
		return voice.lang.startsWith('en');
	});

	voices.all = allVoices;
	voices.male = [];
	voices.female = [];

	allVoices.forEach(function(voice) {
		if (voice.name.includes('Microsoft')) {
			if (/David|Sam|Mark|Richard|George|Ravi|Shaun|James/i.test(voice.name)) {
				voices.male.push(voice);
			} else {
				voices.female.push(voice);
			}
		} else if (/\bmale\b/i.test(voice.name)) {
			voices.male.push(voice);
		} else {
			voices.female.push(voice); // Female is normally default
		}
	});

	var sortLocalFirst = function(voiceA, voiceB) {
		return voiceA.localService === voiceB.localService ? 0 : (voiceA.localService ? -1 : 1);
	};

	voices.all = voices.all.sort(sortLocalFirst);
	voices.male = voices.male.sort(sortLocalFirst);
	voices.female = voices.female.sort(sortLocalFirst);
}
function speak(utteranceData) {
	var msg = new SpeechSynthesisUtterance();
	msg.text = utteranceData.text;

	msg.volume = typeof utteranceData.vol !== 'undefined' ? utteranceData.vol : msg.volume;
	msg.rate = typeof utteranceData.rate !== 'undefined' ? utteranceData.rate : msg.rate;
	msg.pitch = typeof utteranceData.pitch !== 'undefined' ? utteranceData.pitch : msg.pitch;

	var possibleVoices = utteranceData.voice.gender === 'male' ? voices.male : voices.female;
	possibleVoices = possibleVoices || voices.all;

	if (utteranceData.voice.locale) {
		var newPossibleVoices = possibleVoices.filter(function(voice) {
			return voice.lang === utteranceData.voice.locale;
		});
		possibleVoices = newPossibleVoices.length ? newPossibleVoices :  possibleVoices;
	}

	msg.voice = possibleVoices[0] || msg.voice;

	speechSynthesis.speak(msg);
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;
window.indexedDB = window.indexedDB || window.webkitIndexedDB;

var AudioRecorder = function(source, cfg) {
	this.consumers = [];
	var config = cfg || {};

	var inputBufferLength = config.inputBufferLength || 4096;
	var outputBufferLength = config.outputBufferLength || 4000;

	this.context = source.context;
	this.node = this.context.createScriptProcessor(inputBufferLength);

	var worker = new Worker('js/audioRecorderWorker.js');
	worker.postMessage({
	    command: 'init',
	    config: {
			sampleRate: this.context.sampleRate,
			outputBufferLength: outputBufferLength,
			outputSampleRate: (config.outputSampleRate || 16000)
		}
	});

	var recording = false;

	this.node.onaudioprocess = function(e) {
	    if (!recording) {
			return;
		}

	    worker.postMessage({
			command: 'record',
			buffer: [
				e.inputBuffer.getChannelData(0),
				e.inputBuffer.getChannelData(1)
			]
	    });
	};

	this.start = function(data) {
	    this.consumers.forEach(function(consumer, y, z) {
			consumer.postMessage({ command: 'start', data: data });
			recording = true;
			return true;
	    });

	    recording = true;

	    return (this.consumers.length > 0);
	};

	this.stop = function() {
	    if (recording) {
			this.consumers.forEach(function(consumer, y, z) {
				consumer.postMessage({ command: 'stop' });
			});
			recording = false;
	    }

	    worker.postMessage({ command: 'clear' });
	};

	this.cancel = function() {
	    this.stop();
	};

	myClosure = this;

	worker.onmessage = function(e) {
	    if ((e.data.command == 'newBuffer') && recording) {
			myClosure.consumers.forEach(function(consumer, y, z) {
				consumer.postMessage({ command: 'process', data: e.data.data });
			});
	    }
	};

	source.connect(this.node);
	this.node.connect(this.context.destination);
};

var CallbackManager = function() {
	var currentId = 0;
	var callbackPool = {};

	this.add = function(clb) {
		var id = currentId;
		callbackPool[id] = clb;
		currentId++;
		return id;
	};

	this.remove = function(id) {
		delete callbackPool[id];
	};

	this.get = function(id) {
		if (callbackPool.hasOwnProperty(id)) {
			var clb = callbackPool[id];
			delete callbackPool[id];
			return clb;
		}

		return null;
	};
};

function getImageBlob(imageUrl) {
	if (imageUrl) {
		return fetch(imageUrl)
			.then(function(response) {
				return response.blob();
			})
			.then(function(blob) {
				return URL.createObjectURL(blob);
			})
			.catch(function() {
				return;
			})
	} else {
		return Promise.resolve();
	}
}

function postRecognizerJob(payload) {
	var payload = payload || {};

	return new Promise(function(resolve) {
		if (callbackManager) {
			payload.callbackId = callbackManager.add(resolve);
		}

		if (recognizer) {
			recognizer.postMessage(payload);
		}
	});
}

function linkBlobToNotification(blobURL, notificationId) {
	if (blobURL) {
		getNotificationBlobs()
			.then(function(blobs) {
				blobs[notificationId] = blobs[notificationId] || [];
				blobs[notificationId].push(blobURL);
			});
	}
}

function pauseVoiceActivation() {
	if (recorder && listening) {
		recorder.stop();
		listening = false;
	}
}

function resumeVoiceActivation() {
	if (recorder && !listening) {
		lastDetectedCount = 0;
		recorder.start(activationCommand === ACTIVATE_SAMI ? 1 : 2);
		listening = true;
	}
}

function reloadVoiceActivation() {
	pauseVoiceActivation();
	resumeVoiceActivation();
}

function initAssistant() {
	callbackManager = new CallbackManager();
	browserActionManager = new BrowserActionManager();
	webRecognizer = new WebRecognizer();

	// WebSynthesizer
	loadVoices(); // Place request for voices
	speechSynthesis.onvoiceschanged = loadVoices;

	getSettings('voiceActivationCommand')
		.then(function(voiceActivationCommand) {
			activationCommand = voiceActivationCommand || ACTIVATE_SAMI;
		});
	getSettings('autoSpeak')
		.then(function(doAutoSpeak) {
			autoSpeak = doAutoSpeak;
		});
	getSettings('detectionSensitivity')
		.then(function(sensitivity) {
			detectionSensitivity = sensitivity || 30;
		});

	getSettings('audioGranted')
		.then(function(audioGranted) {
			if (audioGranted) {
				return getSettings('voiceActivation');
			}
		})
		.then(function(voiceActivation) {
			if (voiceActivation) {
				loadVoiceActivation();
			}
		});
}

function onIdleStateChangedVoice(newState) {
	if (newState === 'locked') {
		pauseVoiceActivation();
	} else {
		resumeVoiceActivation();
	}
}

function handleKeywordDetection(newDetection) {
	// TODO: run recognizer on newDetection

	// Try to contact a tab, otherwise run recognizer and launch a new tab
	var listenAndRunNewTab = function() {
		if (!webRecognizer.running()) {
			audioAlert.play();
			webRecognizer.start();
		}
	};

	getAvailableTabs().then(function(tabs) {
		if (tabs.length) {
			var promise = Promise.reject();
			tabs.forEach(function(tabId) {
				promise = promise.catch(function() {
					return commandTab(tabId, {type: 'voice', action: 'startListening'});
				});
			});

			promise.then(function() {
				audioAlert.play();
			}).catch(function() {
				listenAndRunNewTab();
			});
		} else {
			listenAndRunNewTab();
		}
	});
}

function loadVoiceActivation() {
	clearTimeout(unloadVoiceActivationTimeout);
	clearTimeout(loadVoiceActivationTimeout);

	if (startingUpVoiceActivation || voiceActivationLoaded) {
		return;
	}
	if (shuttingDownVoiceActivation) {
		loadVoiceActivationTimeout = setTimeout(loadVoiceActivation, 500);
		return;
	}
	startingUpVoiceActivation = true;

	var getAudioStream = function() {
		return new Promise(function(resolve, reject) {
			try {
				audioContext = new AudioContext();
			} catch (err) {
				reject(err);
			}

			navigator.mediaDevices.getUserMedia({ audio: true })
				.then(function(stream) {
					audioStream = stream;
					recorder = new AudioRecorder(audioContext.createMediaStreamSource(stream));
				}).then(resolve).catch(reject);
		})
	};
	var initAlertAudio = function() {
		// Audio for alert
		audioAlert = new Audio();
		audioAlert.preload = 'auto';
		audioAlert.volume = 0.7;
		if (!audioAlert.canPlayType('audio/flac')) {
			audioAlert.src = 'audio/alert.mp3';
		} else {
			audioAlert.src = 'audio/alert.flac';
		}

		return Promise.resolve();
	};
	var initRecognizerEngine = function() {
		return new Promise(function(resolve) {
			recognizer = new Worker('js/recognizer.js');
			recognizer.onmessage = function(e) {
				if (e.data.hasOwnProperty('hypseg')) {
					if (e.data.hypseg.length > lastDetectedCount) {
						lastDetectedCount = e.data.hypseg.length;
						var newDetection = e.data.hypseg[lastDetectedCount - 1];
						handleKeywordDetection(newDetection);
					}
				} else if (typeof e.data.id !== 'undefined') {
					(callbackManager.get(e.data.id) || fnn)(e.data.data || {});
				} else if (e.data.status && e.data.status === 'error') {
					console.error(e.data.command, e.data.code);
				} else if (e.data.ready === true) {
					resolve();
				}
			};

			postRecognizerJob();
		});
	};

	chrome.idle.onStateChanged.addListener(onIdleStateChangedVoice);

	getAudioStream()
		.then(initAlertAudio)
		.then(initRecognizerEngine)
		.then(postRecognizerJob.bind(this, {command: 'initialize', data: [["-kws_threshold", "1e-" + detectionSensitivity ]]}))
		.then(postRecognizerJob.bind(this, {command: 'addWords', data: [["HEY", "HH EY"], ["SAMI", "S AE M IY"], ["OKAY", "OW K EY"], ["GTRIBE", "JH IY T R AY B"]]}))
		.then(postRecognizerJob.bind(this, {command: 'addKeyword', data: activationCommand === ACTIVATE_SAMI ? 'HEY SAMI' : 'OKAY GTRIBE'}))
		.then(postRecognizerJob.bind(this, {command: 'addKeyword', data: activationCommand === ACTIVATE_SAMI ? 'OKAY GTRIBE' : 'HEY SAMI'}))
		.then(function() {
			recorder.consumers = [recognizer];
			startingUpVoiceActivation = false;
			voiceActivationLoaded = true;
			resumeVoiceActivation();
		})
		.catch(function(err) {
			console.error(err);

			startingUpVoiceActivation = false;

			if (err.name === 'MediaDeviceFailedDueToShutdown') {
				setSettings({key: 'audioGranted', value: false});
			}
		});
}

function unloadVoiceActivation() {
	clearTimeout(loadVoiceActivationTimeout);
	clearTimeout(unloadVoiceActivationTimeout);

	if (shuttingDownVoiceActivation || !voiceActivationLoaded) {
		return Promise.resolve();
	}
	if (startingUpVoiceActivation) {
		unloadVoiceActivationTimeout = setTimeout(unloadVoiceActivation, 500);
		return Promise.reject();
	}
	shuttingDownVoiceActivation = true;

	if (recorder) {
		recorder.stop();
		recorder = null;
		listening = false;
	}

	if (audioStream) {
		audioStream.getAudioTracks().forEach(function(track) {
			track.stop();
		});
		audioStream = null;
	}

	if (audioAlert) {
		audioAlert.pause();
		audioAlert.src = '';
		audioAlert = null;
	}

	chrome.idle.onStateChanged.removeListener(onIdleStateChangedVoice);

	var waitFor = [];

	if (audioContext) {
		waitFor.push(
			audioContext.close().then(function() {
				audioContext = null;
			})
		);
	}

	if (recognizer) {
		waitFor.push(
			postRecognizerJob({command: 'clear'}).then(function() {
				recognizer.terminate();
				recognizer = null;
			})
		);
	}

	return Promise.all(waitFor).then(function() {
		shuttingDownVoiceActivation = false;
		voiceActivationLoaded = false;
	});
}

function fnn() {}

initAssistant();
