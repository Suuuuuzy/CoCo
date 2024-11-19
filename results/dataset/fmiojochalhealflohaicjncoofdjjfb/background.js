// Copyright (c) 2016 Nuance
/*
background.js is the event page (manifest: persistant=false)

*/
(function (chrome) {
	'use strict';

	var _stateMachine;
	var _nativeAdapterCode = 'com.nuance.pmicadapter';
	var _commandCodes = {
		activate: 0x3456,
		activatePrevious: 0x3448,
		deactivate: 0x3412,
		getDeviceName: 0x7685,
		ledState: 0x6754,
		registerDevice: 0x5675,
		tabFocused: 0x4010,
		tabBlurred: 0x4020,
		responseError: 0x2635,
		logCode: 0x9876,
		getVersionResponse: 0x9988,
        shouldPopupAppear: 0x9980
	};

	var _adapterResponseCodes = {
		deviceEvent: 0x1564,
		registerDeviceResponse: 0x5676,
		activateResponse: 0x3457,
		activatePreviousResponse: 0x3449,
		deactivateResponse: 0x3413,
		deviceNameResponse: 0x7686,
		ledChangeResponse: 0x6755,
        deviceChangeEvent: 0x1734,
        nativeLogMessage: 0x7817,
        nativeNotification: 0x8812,
	};

	Object.prototype.getKeyByValue = function( value ) {
		for( var prop in this ) {
			if( this.hasOwnProperty( prop ) ) {
				 if( this[ prop ] === value )
					 return prop;
			}
		}
	};

	var PENDING_CONNETION_THRESHOLD = 20 * 1000; // 20seconds
	var NEW_CONNETION_THRESHOLD = 20 * 1000; // 20seconds
	var autoActivate = false;
	var adapterConnected = false;
	var showPopup = false;
	var integrationFileVersion = "undefined";
	var alreadyDone = false;
	var _adapterURL = null;
	var _installType = "other";

	/**
	 * StateMachine handles the async states.
	 * It is reposnsible of ensuring not to lose the focus on SoD.
	 * When activating a new tab, it calls activatePrev, and if it is already  called, 
	 * the new tab activation will be put in a queue.
	 */
	function StateMachine() {
		console.debug('initializing the state machine');

		Object.defineProperty(this, "ActionPending", {
			get: function () {
				return this.currentState === this.AvailableStates.ACTIVATE_PREV_CALLED ||
				this.currentState === this.AvailableStates.REGISTER_DEVICE_CALLED ||
					this.currentState === this.AvailableStates.ACTIVATE_CALLED;
			}
		});

		Object.defineProperty(this, "noActivatedTab", {
			get: function () {
				return this.currentState === this.AvailableStates.INIT ||
					this.currentState === this.AvailableStates.REGISTER_DEVICE_DONE ||
					this.currentState === this.AvailableStates.ACTIVATE_PREV_DONE;
			}
		});

		Object.defineProperty(this, "AvailableStates", {
			get: function () {
				return {
					INIT: 0,
					ACTIVATE_PREV_CALLED: 1,
					ACTIVATE_PREV_DONE: 2,
					ACTIVATE_CALLED: 3,
					ACTIVATE_DONE: 4,
					REGISTER_DEVICE_CALLED: 5,
					REGISTER_DEVICE_DONE: 6
				};
			}
		});

		Object.defineProperty(this, "isActivateDone", {
			get: function() {
				return this.currentState === this.AvailableStates.ACTIVATE_DONE;
			}
		});

		Object.defineProperty(this, "isActivateCalled", {
			get: function() {
				return this.currentState === this.AvailableStates.ACTIVATE_CALLED;
			}
		});

		Object.defineProperty(this, "isActivatePrevCalled", {
			get: function() {
				return this.currentState === this.AvailableStates.ACTIVATE_PREV_CALLED;
			}
		});

		Object.defineProperty(this, "isActivatePrevDone", {
			get: function() {
				return this.currentState === this.AvailableStates.ACTIVATE_PREV_DONE;
			}
		});

		Object.defineProperty(this, "currentState", {
			set: function (newState) {
				console.log("StateMachine.currentState is changed to: " + this.AvailableStates.getKeyByValue(newState));
				_currentState = newState;

				if (newState === this.AvailableStates.ACTIVATE_DONE) {
					this.activeTab = this.tabPendingActivation;
					this.tabPendingActivation = null;
					this.onActivateDone();
				}

				if (newState === this.AvailableStates.ACTIVATE_PREV_DONE) {
					this.activeTab = null;
					this.onPrevDone();
				}
			},
			get: function () {
				return _currentState;
			}
		});

		Object.defineProperty(this, "currentStateName", {
			get: function () {
				return this.AvailableStates.getKeyByValue(this.currentState);
			}
		});

		Object.defineProperty(this, "activeTab", {
			get: function () {
				return _activeTab;
			},
			set: function (val) {
				console.log('_activeTab is changed to ' + JSON.stringify(val));
				_activeTab = val;
			}
		});

		Object.defineProperty(this, "tabPendingActivation", {
			get: function () {
				return _tabPendingActivation;
			},
			set: function (val) {
				console.log('_tabPendingActivation is changed to ' + JSON.stringify(val));
				_tabPendingActivation = val;
			}
		});

		var _currentState = this.AvailableStates.INIT;
		var _activeTab = null;
		var _tabPendingActivation = null;
		
		this._removedTabs = [];
		this._navigatedTabs = [];
		
		this.activationQueue = [];
		// tabMasking is used to identify a tab as another -such as a popup as its opener
		this.tabMasking = {};

		this.onPrevDone = function () {
			if (this.tabPendingActivation) {
				switchActiveTabTo(this.tabPendingActivation);
			}
		};

		this.onActivateDone = function () {
			// enabling the icon for this tab
			if (this.activeTab && this.activeTab.tabId){
				chrome.pageAction.show(this.activeTab.tabId);
			} else {
				console.error('ACTIVATE_DONE with no active tab');
			}
			
			var pendingActivatingTab = this.activationQueue.shift();
			if (pendingActivatingTab) {
				switchActiveTabTo(pendingActivatingTab);
			}
		};

		// state and caching
		this.portMap = {};
		this.bgPortMap = {};
		this.cacheMap = {};
	}

	StateMachine.prototype.setStorageTabId = function setStorageTabId(tabId) {
		chrome.storage.local.get(['nucaTabs'], function (storageResult) {
			console.log('setStorageTabId: ' + tabId);
			storageResult.nucaTabs = storageResult.nucaTabs || {};
			storageResult.nucaTabs[tabId] = {};

			console.log(JSON.stringify(storageResult.nucaTabs));

			chrome.storage.local.set(storageResult, function () {
				if (chrome.runtime.lastError) {
					console.log('Error setting ' + tabId);
				} else {
					console.log('Set ' + tabId);
				}
			});
		});
	};
	StateMachine.prototype.removeTabFromStorage = function removeTabFromStorage(tabId) {
		chrome.storage.local.get(['nucaTabs'], function (storageResult) {
			console.log('removeTabFromStorage: ' + tabId + ' :: ' + storageResult.nucaTabs[tabId]);

			delete storageResult.nucaTabs[tabId];

			console.log(JSON.stringify(storageResult.nucaTabs));

			chrome.storage.local.set(storageResult, function () {
				if (chrome.runtime.lastError) {
					console.debug('Error removing tab ' + tabId);
				}
			});
		});
	};
	StateMachine.prototype.initNucaTabsStorage = function initNucaTabsStorage(callback) {
		chrome.storage.local.set({ nucaTabs: {} }, function () {
			if (handleError()) {
				console.log("Failed to initialize storage.");
			} else {
				console.log("Successfully initialized storage.");
			}

			if (typeof callback === 'function') {
				callback();
			}
		});
	};

	StateMachine.prototype.isTabCurrentlyActive = function (tabId) {
		return  (this.currentState === this.AvailableStates.ACTIVATE_DONE &&
			portForTabId(tabId) &&
			this.activeTab && this.activeTab.tabId === tabId);
	};

	function getAdatapterVersion(callback) {
		chrome.runtime.getPackageDirectoryEntry(function (dirEntry) {
			dirEntry.getFile("version.json", undefined, function (fileEntry) {
				fileEntry.file(function (file) {
					var reader = new FileReader();
					reader.addEventListener("load", function () {
						var version = JSON.parse(reader.result);
						callback(version);
					});
					reader.readAsText(file);
				});
			}, function (e) {
				console.log("getAdapterVersion: " + e);
			});
		});
	}

	function ensureNumericTabId(tabId) {
		if(typeof(tabId) === 'string') {
			return parseInt(tabId, 10);
		} else {
			return tabId;
		}
	}

	/**
	 * is called when the alarm is set
	 * trying to connect to the Adapter
	 * @param {*} alarmObj - the alarm that was raise
	 */
	function tryConnectNative(alarmObj) {
		var tabId = ensureNumericTabId(alarmObj.name.split('_')[1]);

		if (_stateMachine.cacheMap[tabId] &&
			!_stateMachine.cacheMap[tabId].pendingConnection &&
			!_stateMachine.cacheMap[tabId].isConnected) {
			try {
				var request = {};
				request.senderId = tabId;
				request.type = _commandCodes.registerDevice;
				console.debug('connectNucaPowerMicChromeAdapter: ' + JSON.stringify(request));
				var tabPort = connectNucaPowerMicChromeAdapter(tabId, request);
				_stateMachine.portMap[tabId] = tabPort;

			} catch (error) {
				console.error('tryConnectNative', error);
				// at this point, we've sent once. no need to bother again
				//sendErrorMessageToContent(tabId, 4); // AdapterPackageNotInstalled
			}
		}

		if (_stateMachine.cacheMap[tabId] &&
			_stateMachine.cacheMap[tabId].isConnected) {

			_stateMachine.cacheMap[tabId].notInstalledFlag = false;
			chrome.alarms.clear(alarmObj.name);
		}
	}

    /**
	 * Shows the Adapter installation instructions 
	 */
	function showAdapterInstallationInstructions(tabId) {

	    if (alreadyDone == true)
	    {
	        console.log("alreadyDone = true --> popup won't be shown");
	        return 0;
		}
		// if no _adapterURL is set, doesn't make sense to show the popup to download
		if (_adapterURL == null) {
			console.log("URL not set.");
			return 0;
        }

	    console.log("showAdapterInstallationInstructions");
        //inject popup CSS
	    chrome.tabs.insertCSS(tabId, {
	        file: "installation_steps/tingle/tingle.css"
	    });

        //inject popup JS
	    chrome.tabs.executeScript(tabId, { file: "installation_steps/tingle/tingle.js" },
                   function (result) {

                   }
	             );

        //inject language script
	    var lang = navigator.language.split('-');
	    console.log(lang[0]);
	    if (lang && lang.length > 0 && (lang[0] == "en" || lang[0] == "ro")) {
	        chrome.tabs.executeScript(tabId, { file: "installation_steps/installation_en.js" },
                   function (result) {

                   }
	             );
	    }
	    else {
	        chrome.tabs.executeScript(tabId, { file: "installation_steps/installation_" + lang[0] + '.js' },
                   function (result) {

                   }
	             );
	    }
        //inject Adapter installation popup
		chrome.tabs.executeScript(tabId, {
			// passing the _adapterURL to the adapter_installation script.
			code: 'var downloadLink = "' + _adapterURL + '";' 
		}, function () {
				try {
					chrome.tabs.executeScript(tabId, { file: 'installation_steps/adapter_installation.js' });
				} catch (error) {
					console.error('error in executeScript: ', error);
					sendErrorMessageToContent(tabId, 4); //Adapter package not installed
				}
		});

	   alreadyDone = true;
	   console.log("alreadyDone set to true");
	}

    /**
	 * Is called when an alarm is set. 
	 * The alarms only begins when no Adapter was detected - i.e. when it was not installed
	 * @param {*} alarmObj 
	 */
	function onAlarm(alarmObj) {
		if (alarmObj && alarmObj.name.indexOf('tryConnectNativeIntervalTo') >= 0) {
			tryConnectNative(alarmObj);
		} 
	}

	function onDisconnectNative(port) {
		console.debug('Adapter port disconnected... ' + JSON.stringify(port));
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError);
		}
		var tabId = port.senderId;
		//var bgTabPort = _stateMachine.bgPortMap[tabId];
		if (_stateMachine.portMap[tabId]) {
			_stateMachine.cacheMap[tabId].wasDisconnected = true;
			_stateMachine.cacheMap[tabId].pendingConnection = false;
			_stateMachine.cacheMap[tabId].isConnected = false;
			_stateMachine.cacheMap[tabId].lastConnectionAttemptFailTimestamp = performance.now();
            
			var connectionAttemptTotalTime = _stateMachine.cacheMap[tabId].lastConnectionAttemptFailTimestamp -
				_stateMachine.cacheMap[tabId].connectionAttemptTimestamp;
			console.debug('Adapter port ' + tabId + ' disconnected after ' + connectionAttemptTotalTime + 'ms');

		    // ToDo: check if we can use connectionAttemptTotalTime to assist in detecting if the Adapter was not installed
		    //will open a new Adapter process if the previous one has closed
		    //the process won't open if closing the app or refreshing the page
			if (adapterConnected == true) {
			    var req = {
			        "senderId": tabId,
					"type": _commandCodes.registerDevice,
					"adapterURL": _adapterURL
			    };
				console.debug('connectNucaPowerMicChromeAdapter: ' + JSON.stringify(req));
			    var tabPort = connectNucaPowerMicChromeAdapter(tabId, req);
			    _stateMachine.portMap[tabId] = tabPort;
			    _stateMachine.cacheMap[tabId].notInstalledFlag = false;
              
			} else {
			    showPopup = true;
			}

			if (!_stateMachine.cacheMap[tabId].notInstalledFlag) {
				_stateMachine.cacheMap[tabId].notInstalledFlag = true;
				console.log('Setting the AutoActivate flag to true.');
				autoActivate = true;
				adapterConnected = false;
				console.debug('Notify that Adapter is not installed.');
				var response = {};
				response.errorCode = 4; // AdapterPackageNotInstalled
				response.type = _commandCodes.responseError;
				chrome.tabs.sendMessage(tabId, response);
				var msg = "Adapter package not installed / Adapter process not available";
				var jsonRes = { senderId: tabId, type: _commandCodes.logCode, errorCode: 4, logMessage: msg, logMethod: "NuancePowerMicWebExtension.Background.onDisconnectNative", logMessageSize: msg.length, logLevel: 0 };
				chrome.tabs.sendMessage(tabId, jsonRes);
				chrome.alarms.create('tryConnectNativeIntervalTo_' + tabId, {
					periodInMinutes: 1
				});
				if(showPopup == true && integrationFileVersion.startsWith("18")){
				    console.log("show Adapter installation popup.")
				    showAdapterInstallationInstructions(tabId);
				}
			}
		}
	}

	/**
	 * Registers a tab with the adapter, by openning a new port to the Adapter for it.
	 * The created port also holds a creation of a new instance of both the Adapter and the SMAudio
	 * @param {*} tabId 
	 * @param {*} request 
	 */
	function connectNucaPowerMicChromeAdapter(tabId, request) {

		_stateMachine.currentState = _stateMachine.AvailableStates.REGISTER_DEVICE_CALLED;

		var newport = chrome.runtime.connectNative(_nativeAdapterCode);
		if (!_stateMachine.cacheMap[tabId]) {
			_stateMachine.cacheMap[tabId] = {};
		}
		_stateMachine.cacheMap[tabId].isConnected = false;
		_stateMachine.cacheMap[tabId].pendingConnection = true;
		_stateMachine.cacheMap[tabId].senderId = tabId;
		_stateMachine.cacheMap[tabId].wasDisconnected = false;
		_stateMachine.cacheMap[tabId].connectionAttemptTimestamp = performance.now();

		newport.senderId = tabId;
		newport.onMessage.addListener(onMessageNative);
		newport.onDisconnect.addListener(onDisconnectNative);
		if (typeof _stateMachine.cacheMap[tabId].notInstalledFlag === "undefined") {
			_stateMachine.cacheMap[tabId].notInstalledFlag = false;
		}

		console.debug('Register new control with native application.' + JSON.stringify(request));
		newport.postMessage(request);

		return newport;
	}

	function portForTabId(tabId) {
		console.debug('portForTabId :: checking if ' + tabId + ' appears in ' + JSON.stringify(_stateMachine.portMap));
		if (!(tabId in _stateMachine.portMap)) {
			console.debug('portForTabId :: TabId does not exists in array');
			return null;
		}
		return _stateMachine.portMap[tabId];
	}

	function sendErrorMessageToContent(tabId, errorCode) {
		var response = {
			'errorCode': errorCode,
			type: _commandCodes.responseError
		};
		chrome.tabs.sendMessage(tabId, response);
	}

	function registerDevice(tabId, url) {
		console.log('Registering new control: ' + tabId);
		try {
		    if (tabId in _stateMachine.cacheMap) {
		        console.log('already connecting?');
		        // check if it is already in the state of connection attempt, and not for too long
		        if (_stateMachine.cacheMap[tabId].pendingConnection &&
					(performance.now() - _stateMachine.cacheMap[tabId].connectionAttemptTimestamp) < PENDING_CONNETION_THRESHOLD) {
		            console.log('already connecting.');
		            return false;
		        }

		        // or if it's just connected
                if(_stateMachine.cacheMap[tabId].connectionTimestamp > 0 &&
		            (performance.now() - _stateMachine.cacheMap[tabId].connectionTimestamp) < NEW_CONNETION_THRESHOLD) {
                    console.log('just connected.');
		            return false;
		        }
		    }

		    if (tabId in _stateMachine.portMap) {
		        console.log('already connected - disconnecting at ' + tabId);
				_stateMachine.portMap[tabId].disconnect();
			}
			if (tabId in _stateMachine.tabMasking) {
				delete _stateMachine.tabMasking[tabId];
			}

			var req = {
				"senderId": tabId,
				"type": _commandCodes.registerDevice,
                "adapterURL": url
			};
			_adapterURL = url;
			console.debug('connectNucaPowerMicChromeAdapter: ' + JSON.stringify(req));
			var tabPort = connectNucaPowerMicChromeAdapter(tabId, req);
			_stateMachine.portMap[tabId] = tabPort;
			_stateMachine.cacheMap[tabId].notInstalledFlag = false;
		} catch (error) {
		    console.error('registerDevice', error);
			_stateMachine.currentState = _stateMachine.AvailableStates.REGISTER_DEVICE_DONE;
			sendErrorMessageToContent(tabId, 4); //Adapter package not installed
		}
	}

	/**
	 * onMessageContent - handles messages from content.js
	 * content > background
	 * 
	 * @param {*} request - an object with type
	 * @param {*} port - a chrome.port object
	 */
	function onMessageContent(request, port) {
		console.log('received from content: ', _commandCodes.getKeyByValue(request.type));
		var tabId = port.sender.tab.id;
		switch (request.type) {
			case _commandCodes.registerDevice: // Register new control
				registerDevice(tabId, request.adapterURL);
				break;
			case _commandCodes.activatePrevious:
				activatePrevious();
				break;
			case _commandCodes.activate: 
				switchActiveTabTo({ tabId: tabId });
				break;
			case _commandCodes.tabBlurred:
				_stateMachine.browserHasFocus = false;
				if (_stateMachine.isActivateDone && 
					_stateMachine.activeTab &&
					_stateMachine.activeTab.tabId === tabId) {
						// only calling activatePrevious when the tab was blured and it was previously active...
						// unless it's because of a popup that masks it.
						chrome.tabs.query({active: true}, function (tabs) {
							var isMasking = tabs.some(function(tab) {
								return _stateMachine.tabMasking[tab.id] === _stateMachine.activeTab.tabId;
							});
							if (!isMasking) {
								activatePrevious();
							}
						});
					}
				break;
			case _commandCodes.tabFocused:
				_stateMachine.browserHasFocus = true;
				if (_stateMachine.noActivatedTab) {
					switchActiveTabTo({ tabId: tabId });
				}
				break;
		    case _commandCodes.logCode:
		        messageAdapter(tabId, request);
		        break;
		    case _commandCodes.getVersionResponse:
		        try {
		            // only show our Adapter popup in case our integration file is running in danube browser.
		            console.log("got version response. Integration file version is " + request.detail.newValue);
		            var method = "NuancePowerMicWebExtension.Background.onMessageContent";
		            if (request.detail.newValue === "undefined") {
		                var msg = "Integration file version: undefined. Installation type: " + _installType;
		                integrationFileVersion =  request.detail.newValue;
		                var jsonRes = { senderId: tabId, type: _commandCodes.logCode, errorCode: 0, logMessage: msg, logMethod: method, logMessageSize: msg.length, logLevel: 2 };
		                chrome.tabs.sendMessage(tabId, jsonRes);
                    } else {
		                var msg = "Integration file version: " + request.detail.newValue + ". Installation type: " + _installType;
		                var jsonRes = { senderId: tabId, type: _commandCodes.logCode, errorCode: 0, logMessage: msg, logMethod: method, logMessageSize: msg.length, logLevel: 2 };
		                chrome.tabs.sendMessage(tabId, jsonRes);
		                integrationFileVersion =  request.detail.newValue;
		            }
                }
		        catch (error) {
		            console.log(error);
		        }
		        break;
		    case _commandCodes.shouldPopupAppear:
                //reset flag for popup
		        alreadyDone = false;
		        break;
			default: {
				messageAdapter(tabId, request);
				break;
			}
		}
	}

	function onConnect(port) {
		port.onMessage.addListener(onMessageContent);
		var tabId = port.sender.tab.id;

		if (_stateMachine.bgPortMap[port.sender.tab.id]) {
		    console.log('disconnect port and reset cacheMap for tab: ' + tabId);
		    _stateMachine.bgPortMap[port.sender.tab.id].disconnect();
		    if (_stateMachine.cacheMap[tabId]) {
		        _stateMachine.cacheMap[tabId].isConnected = false;
		        _stateMachine.cacheMap[tabId].pendingConnection = false;
		        _stateMachine.cacheMap[tabId].wasDisconnected = true;
		        _stateMachine.cacheMap[tabId].connectionTimestamp = 0;
		    }
		}
		_stateMachine.bgPortMap[port.sender.tab.id] = port;

		chrome.storage.local.get(['nucaTabs'], function (tabs) {
			tabs.nucaTabs = tabs.nucaTabs || {};
			tabs.nucaTabs[tabId] = {};

			chrome.storage.local.set(tabs, function () {
				if (chrome.runtime.lastError) {
					console.log('Error setting ' + tabId);
				} else {
					//console.log('Set ' + tabId);
				}
			});
		});
	}

	/**
	 * compare between two versions (a, b)
	 * returns 1 if a > b
	 * returns 0 if a == b
	 * returns -1 if a < b
	 * @param {Obj} registeredVersion 
	 * @param {Obj} receivedVersion 
	 */
	function compareAdapterVersions(registeredVersion, receivedVersion) {
		var compareProperties = ['major', 'minor', 'build', 'patch'];
		var compResults = 0, i=0, len = compareProperties.length, val;
		for (; i<len && compResults === 0; i++) {
			val = compareProperties[i];
			compResults = Math.sign(registeredVersion[val] - receivedVersion[val]);
		}

		function verToString(o) {
			var ver = '';
			compareProperties.forEach(function (prop) {
				ver = ver + o[prop] + '.';
			});
			return ver;
		}
		console.log('compareAdapterVersions ', compResults, verToString(registeredVersion), verToString(receivedVersion));

		return compResults;
	}

    /*
	 * checks if the installed Adapter supports or not the AutoUpdate feature
	 * 
	 * @param {*} adapterVersion - the installed Adapter version
	 */
	function doesSupportAutoUpdate(adapterVersion) {
	    var compareProperties = ['major', 'minor', 'build', 'patch'];
	    compareProperties['major'] = 28;
	    if (adapterVersion.major <= compareProperties['major']) {
	        return false;
	    }
	    return true;
	}
	var _nucaAdapterNotificationID = null;
	function showUserNotification(title, text, nrButtons, button1Text, button2Text) {
		if (_installType === 'admin') {
			console.log('Central deployment installation - do not show auto-update notifications.');
			var msg = 'Central deployment installation - do not show auto-update notifications.';
			var jsonRes = { senderId: tabId, type: _commandCodes.logCode, errorCode: 0, logMessage: msg, logMethod: method, logMessageSize: msg.length, logLevel: 2 };
			chrome.tabs.sendMessage(tabId, jsonRes);

		}
		var _buttons = null;
		if (nrButtons === 1) {
	        _buttons = [{title: button1Text}];
	    } else if (nrButtons === 2) {
	        _buttons = [{title: button1Text}, { title: button2Text }];
	    }
	    chrome.notifications.create("", {
	        type: 'basic',
	        iconUrl: 'img/icon128.png',
	        title: title,
	        message: text,
	        buttons: _buttons
	    }, function (notificationId)	    {
	        console.log("notification id: " + notificationId);
	        _nucaAdapterNotificationID = notificationId;
	    });
	}
	function callbackNotificationWindow(notificationId, buttonIndex) {
	    if (notificationId === _nucaAdapterNotificationID) {
	        if (buttonIndex === 0)
	            console.log("User clicked first button.");
	        if (buttonIndex === 1)
	            console.log("User clicked second button.");
	    }
	}
	/**
	 * handles messages from the Adapter to the Extension:
	 * adapter > background
	 * 
	 * @param {*} message - object with 'type' property:
	 * @param {*} port 
	 */
	function onMessageNative(message, port) {
		//console.debug('Adapter > Background \n', _adapterResponseCodes.getKeyByValue(message.type));
		var tabId = ensureNumericTabId(port.senderId);
		var method = "NuancePowerMicWebExtension.Background.onMessageNative";
		switch (message.type) {
			case _adapterResponseCodes.deviceEvent:
				chrome.tabs.sendMessage(message.senderId, message);
				break;
			case _adapterResponseCodes.registerDeviceResponse:
			    console.debug('Adapter > Background :: new control device registered.');
				_stateMachine.currentState = _stateMachine.AvailableStates.REGISTER_DEVICE_DONE;
				chrome.alarms.clear('tryConnectNativeIntervalTo_' + tabId);

				_stateMachine.cacheMap[tabId].isConnected = true;
				_stateMachine.cacheMap[tabId].pendingConnection = false;
				_stateMachine.cacheMap[tabId].wasDisconnected = false;
				_stateMachine.cacheMap[tabId].connectionTimestamp = performance.now();

				var isOlder = compareAdapterVersions(_stateMachine.adapterVersion, message.adapterVersion) > 0;
				if (doesSupportAutoUpdate(message.adapterVersion) == false) {
					message.isAdapterOutdated = isOlder;
					showAdapterInstallationInstructions(tabId);
					var msg = "Adapter version is out of date. Install new Adapter package manually.";
					var jsonRes = { senderId: 0, type: _commandCodes.logCode, errorCode: 0, logMessage: msg, logMethod: method, logMessageSize: msg.length, logLevel: 2 };
					chrome.tabs.sendMessage(message.senderId, jsonRes);
					return;
				}

				if (message.errorCode !== 0) {
					chrome.tabs.sendMessage(tabId, message);
				} else {
				    chrome.tabs.sendMessage(message.senderId, message);
				    function verToString(o) {
				        var ver = '';
				        var compareProperties = ['major', 'minor', 'build', 'patch'];
				        compareProperties.forEach(function (prop) {
				            ver = ver + o[prop] + '.';
				        });
				        return ver;
				    }
				    adapterConnected = true;
				    showPopup = false;
				    var manifestData = chrome.runtime.getManifest();
				    var msg = "Adapter: " + verToString(message.adapterVersion) + " Extension: " + manifestData.version;
				    var jsonRes = { senderId: 0, type: _commandCodes.logCode, errorCode: 0, logMessage: msg, logMethod: method, logMessageSize: msg.length, logLevel: 2 };
				    chrome.tabs.sendMessage(message.senderId, jsonRes);
                }
				var totalConnectionAttemptTime = _stateMachine.cacheMap[tabId].connectionTimestamp - _stateMachine.cacheMap[tabId].connectionAttemptTimestamp;
				console.debug('total connection time: ' + totalConnectionAttemptTime + 'ms');
				if (autoActivate == true) {
				    switchActiveTabTo({ tabId: tabId });
				    autoActivate = false;
				}
				break;
			case _adapterResponseCodes.activateResponse:
				console.debug('Adapter > Background :: Activate response.');
				_stateMachine.currentState = _stateMachine.AvailableStates.ACTIVATE_DONE;
				chrome.tabs.sendMessage(message.senderId, message);
				break;
			case _adapterResponseCodes.activatePreviousResponse:
				console.debug('Adapter > Background :: Activate previous response.');
				_stateMachine.currentState = _stateMachine.AvailableStates.ACTIVATE_PREV_DONE;
				chrome.tabs.sendMessage(message.senderId, message);

				// check if it was called for a tab removal
				if(_stateMachine._removedTabs.includes(tabId)) {
					_stateMachine._removedTabs.splice(_stateMachine._removedTabs.indexOf(tabId), 1);
					onTabRemovedAndActivatePreviousWasCalled(tabId);
				} else {					
					if(_stateMachine._navigatedTabs.includes(tabId)) {
						_stateMachine._navigatedTabs.splice(_stateMachine._navigatedTabs.indexOf(tabId), 1);
						onTabNavigationAndActivatePreviousWasCalled(tabId);
					}

					// tab is still there but inactive
					chrome.pageAction.hide(tabId);					
				}
				break;
			case _adapterResponseCodes.deactivateResponse:
				console.debug('Adapter > Background :: Deactivate response.');
				chrome.tabs.sendMessage(message.senderId, message);
				break;
			case _adapterResponseCodes.deviceNameResponse:
				console.debug('Adapter > Background :: device name response.');
				chrome.tabs.sendMessage(message.senderId, message);
				break;
			case _adapterResponseCodes.ledChangeResponse:
				console.debug('Adapter > Background :: led change response.');
				chrome.tabs.sendMessage(message.senderId, message);
				break;
		    case _adapterResponseCodes.deviceChangeEvent:
		        console.debug('Adapter > Background :: device changed event.');
		        chrome.tabs.sendMessage(message.senderId, message);
		        // send instruction pressed . If we should add this workaround uncomment the next 2 lines.
		        //var jsonRes = { deviceEventCode: 21, deviceEventSourceCode: 0, senderId: message.senderId, type: 5476 };
		        //chrome.tabs.sendMessage(message.senderId, jsonRes);
		        break;
            case _adapterResponseCodes.nativeLogMessage:
		        //taking messages from Adapter and sending them to Extension
				chrome.tabs.sendMessage(message.senderId, message);
		        break;
		    case _adapterResponseCodes.nativeNotification:      
		        console.debug('Adapter > Background :: got notification: ' + message.text);
		        showUserNotification(message.title, message.text, 0, 0, 0);
		        break;
			default:
			    console.debug('Adapter > Background :: unknown response: ' + message.type);
				break;
		}
	}
	/**
	 * Sending messages to the Adapter
	 * background > adapter
	 * @param {*} tabId - sender tab Id
	 * @param {*} request - request obj (with type as hex)
	 */
	function messageAdapter(tabId, request) {
		console.log("messageAdapter for ", tabId, _commandCodes.getKeyByValue(request.type));
		var tabPort = portForTabId(tabId);
		if (!tabPort) {
			console.debug("background > adapter :: error - not initialized");
			sendErrorMessageToContent(tabId, 6); // NotInitializedError
			return;
		}
		if (_stateMachine.cacheMap[tabId].pendingConnection) {
			console.debug("background > adapter :: pending connection");
			return;
		}
		if (_stateMachine.cacheMap[tabId].wasDisconnected && 
			_stateMachine.cacheMap[tabId].pendingConnection === false) {
			console.debug("background > adapter :: error - was disconnected");
			sendErrorMessageToContent(tabId, 4); // AdapterPackageNotInstalled
			return;
		}
		if (_stateMachine.cacheMap[tabId].isConnected) {
			console.debug("background > adapter :: sending message " + JSON.stringify(request));		 
			tabPort.postMessage(request);
		}
	}

	/**
	 * converting messages to an Adapter request
	 * @param {object} activeTabObj  - must contain tabId
	 * @param {object} messageType - must contain details
	 */
	function convertMessageIdToAdapterRequest(activeTabObj, messageType) {
		console.log('convertMessageIdToAdapterRequest for message: ', _commandCodes.getKeyByValue(messageType));
		if (activeTabObj && activeTabObj.tabId) {
			var request = {
				type: messageType,
				tabId: activeTabObj.tabId
			};

			messageAdapter(activeTabObj.tabId, request);
		}
	}

	// maybe for future use
	// function deactivateDevice(tabObj) {
	// 	if (tabObj && tabObj.tabId) {
	// 		convertMessageIdToAdapterRequest(_stateMachine.activeTab, _commandCodes.deactivate);
	// 	}
	// }

	/**
	 * Basically returning control to SoD (if exists)
	 * @param {obj} tabObj - The tab that sends this request
	 */
	function activatePrevious(tabRemoved, tabId) {
		if (_stateMachine.currentState !== _stateMachine.AvailableStates.ACTIVATE_PREV_CALLED &&
			_stateMachine.currentState !== _stateMachine.AvailableStates.ACTIVATE_PREV_DONE) {
			if (_stateMachine.activeTab && portForTabId(_stateMachine.activeTab.tabId)) {
				console.log("activatePrevious :: returning control.");

				if (tabRemoved) {
					_stateMachine._removedTabs.push(tabId);
				}

				// sending ActivatePrevious request
				_stateMachine.currentState = _stateMachine.AvailableStates.ACTIVATE_PREV_CALLED;
				convertMessageIdToAdapterRequest(_stateMachine.activeTab, _commandCodes.activatePrevious);
			} else {
				console.log("activatePrevious :: no activeTab");
			}
		} else {
			console.log("activatePrevious :: activatePrev was already called");
		}
	}

	/**
	 * Activates the tabObj device
	 * @param {obj} tabObj 
	 */
	function activateDevice(tabObj) {
		if (_stateMachine.noActivatedTab) {
			if (portForTabId(tabObj.tabId)) {
				console.log("activateDevice :: grabbing control.");
				_stateMachine.currentState = _stateMachine.AvailableStates.ACTIVATE_CALLED;
				convertMessageIdToAdapterRequest(tabObj, _commandCodes.activate);
			} else {
				console.log("activateDevice :: unsupported tab was not found in portForTabId");
			}
		} else {
			// should it queue the request for later?
		}
	}

	function switchActiveTabTo(newActiveTabInfo) {
		console.log("switchActiveTabTo: " + JSON.stringify(newActiveTabInfo));

		if (_stateMachine.isActivateDone &&
			newActiveTabInfo.tabId === _stateMachine.activeTab.tabId) {
				console.log('switchActiveTabTo :: Tab is already activated - no action needed');
				return;
			}

		// chceking if the tab is masking another one
		if(_stateMachine.tabMasking[newActiveTabInfo.tabId]) {
			// changing the activation tab Id to be the masked one
			newActiveTabInfo.tabId = _stateMachine.tabMasking[newActiveTabInfo.tabId];
		}

		_stateMachine.tabPendingActivation = newActiveTabInfo;

		//ToDo: encapsulate this in the stateMachine as an action-tree (JSON)
		console.log('switchActiveTabTo :: currentState = ', _stateMachine.currentStateName);
		switch (_stateMachine.currentState) {
			case _stateMachine.AvailableStates.ACTIVATE_DONE:
				console.log("switchActiveTabTo :: activatePrevious (returning control to desktop app)");
				activatePrevious();
				break;
			case _stateMachine.AvailableStates.INIT:
			case _stateMachine.AvailableStates.ACTIVATE_PREV_DONE:
			case _stateMachine.AvailableStates.REGISTER_DEVICE_DONE:
				console.log("switchActiveTabTo :: activateDevice for tabId ", newActiveTabInfo.tabId);
				activateDevice(newActiveTabInfo);
				break;
			case _stateMachine.AvailableStates.ACTIVATE_PREV_CALLED:
				console.log("switchActiveTabTo :: postponing activation of tabId ", newActiveTabInfo.tabId);
				_stateMachine.onActivatePrevDone = function () {
					activateDevice(newActiveTabInfo);
				};
				break;
			case _stateMachine.AvailableStates.ACTIVATE_CALLED:
			case _stateMachine.AvailableStates.REGISTER_DEVICE_CALLED:
				console.log("switchActiveTabTo :: activating is already running, queing request to tabId ", newActiveTabInfo.tabId);
				// a previous call not yet returned, we need to call activatePrev first and then Activate the Current
				// but first, let's remove it from the queue if it was previously added:
				_stateMachine.activationQueue = _stateMachine.activationQueue.filter(function (tabInQueue) {
					return (tabInQueue.tabId !== newActiveTabInfo.tabId &&
						tabInQueue.windowId !== newActiveTabInfo.windowId);
				});
				_stateMachine.activationQueue.push(newActiveTabInfo);
				break;
		}
	}

	/**
	 * Fired when the currently focused window changes (as opposed to tab change).
	 * windowId - int representing the current focused window.
	 * if a different appp is focused, it equals chrome.windows.WINDOW_ID_NONE
	 */
	function onFocusChanged(windowId) {
		if (chrome.windows.WINDOW_ID_NONE === windowId) {
			console.log('onFocusChanged :: outside of browser - calling activatePrevious');
			activatePrevious();
		} else {
			console.log('onFocusChanged :: windowId=' + windowId);		
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				if (tabs.length > 0) {
				//	console.log("onFocusChanged :: tabId==" + tabs[0].id);
					switchActiveTabTo({ tabId: tabs[0].id, windowId: windowId });
				}
				else {
					console.log("No tabs open.");
				}
			});
		}
	}

	/**
	 * fires when a tab is activated.
	 * activeInfo is an object with the properties:
	 * - tabId
	 * - windowId
	 */
	function onTabActivated(activeInfo) {
		console.log("onTabActivated: " + JSON.stringify(activeInfo));
		switchActiveTabTo(activeInfo);
	}
	
	/**
	 * Is called when a tab was closed.
	 * it will call activatePrevious, and after a successful execution of it, 
	 * onTabRemovedAndActivatePreviousWasCalled will then be called
	 * @param {int} tabId 
	 */
	function onTabRemoved(tabId /*, removeInfo*/) {
		console.debug('onTabRemoved :: ', tabId);

		if (tabId in _stateMachine.tabMasking) {
			delete _stateMachine.tabMasking[tabId];
		}

		if (!(tabId in _stateMachine.portMap)) { 
			return;
		}

		// Removing the tab from the activation queue (in case it is there...)
		_stateMachine.activationQueue = _stateMachine.activationQueue.filter(function (tabInQueue) {
		    return (tabInQueue.tabId !== tabId);
		});

		if(_stateMachine.isTabCurrentlyActive(tabId)){
			activatePrevious(true, tabId);			
		} else {
			onTabRemovedAndActivatePreviousWasCalled(tabId);
		}
	}

	/**
	 * Second part of the onTabRemoved - will be called after activatePrevious is called
	 * @param {int} tabId 
	 */
	function onTabRemovedAndActivatePreviousWasCalled(tabId) {
		var p = _stateMachine.portMap[tabId];
		if (p) {
			p.disconnect();
			delete _stateMachine.portMap[tabId];
			delete _stateMachine.bgPortMap[tabId];
			delete _stateMachine.cacheMap[tabId];
		}

		_stateMachine.removeTabFromStorage(tabId);
	}

	/**
	 * Second part of the onTabRemoved - will be called after activatePrevious is called
	 * @param {int} tabId 
	 */
	function onTabNavigationAndActivatePreviousWasCalled(tabId) {
		console.log('onTabNavigationAndActivatePreviousWasCalled');
		var p = _stateMachine.portMap[tabId];
		if (p) {
			p.disconnect();
			delete _stateMachine.portMap[tabId];
		}
	}

	function onNewWindowCreated(newWindow) {
		if (newWindow.type === 'popup') {
			console.log('onNewWindowCreated :: opened popup widnow id = ' + newWindow.id);
		}
	}

	function detectWCISPopup(details) {
		console.log('detectWCISPopup: ' + details.tabId);
		if (details.sourceTabId && portForTabId(details.sourceTabId)) {
			// this tab should trigger the opener
			_stateMachine.tabMasking[details.tabId] = details.sourceTabId;
		}
	}
	
	function onBeforeNavigate(details) {
		if (details.frameId === 0) {
			if (_stateMachine.isTabCurrentlyActive(details.tabId) &&
			typeof(_stateMachine.tabMasking[details.tabId]) === 'undefined') {
				console.log('onBeforeNavigate', JSON.stringify(details));
				_stateMachine._navigatedTabs.push(details.tabId);
				activatePrevious();
			}
		}
	}

	function onStartup() {
		console.log('onStartup');
		init();
	}

	function handleError() {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError.message);
			return true;
		}

		return false;
	}

	function runContentJSonAllWindows() {
		chrome.windows.getAll({
			populate: true
		}, function (openWindows) {
			var execOptions = { file: 'content.js' };
			openWindows.forEach(function (currentWindow) {
				currentWindow.tabs.forEach(function (currentTab) {
					// Skip chrome://
					if (!currentTab.url.match(/(chrome):\/\//gi)) {
						console.log('executing content.js on tabId ' + currentTab.id);
						chrome.tabs.executeScript(currentTab.id, execOptions, handleError);
					}
				});
			});
		});
	}

	function postInstall() {
		console.log('postInstall');

		// Init tab storage
		_stateMachine.initNucaTabsStorage(function () {
			runContentJSonAllWindows();
		});
	}
	
	function postUpdate() {
		console.debug('postUpdate');
		runContentJSonAllWindows();
	}

	/*
	https://stackoverflow.com/questions/23895377/sending-message-from-a-background-script-to-a-content-script-then-to-a-injected/23895822#23895822
	ToDo:
	consider changing the update handling to
	 chrome.runtime.onUpdateAvailable (https://developer.chrome.com/extensions/runtime#event-onUpdateAvailable)
	and reloading with chrome.runtime.reload()
	*/
	function onInstalled(details) {
		console.debug('onInstalled: ' + JSON.stringify(details));
		//addPageRule();

		init();

		switch (details.reason) {
			case 'update':
				postUpdate();
				break;
			case 'install':
				postInstall();
				break;
		}
	}

	function init() {
		console.log('initializing...');
		_stateMachine = new StateMachine();
		// get info about installation type: "admin", "development", "normal", "sideload", or "other"
		chrome.management.getSelf((o) => {
			_installType = o.installType;
			console.log('InstallType : ' + _installType);
		});
		getAdatapterVersion(function (versionJSON) {
			_stateMachine.adapterVersion = versionJSON.adapterVersion;
		});
	}
	init();

	// Registering listners
	chrome.runtime.onInstalled.addListener(onInstalled);
	chrome.runtime.onConnect.addListener(onConnect);
	chrome.runtime.onStartup.addListener(onStartup);
	chrome.tabs.onActivated.addListener(onTabActivated);
	chrome.tabs.onRemoved.addListener(onTabRemoved);
	chrome.alarms.onAlarm.addListener(onAlarm);
	chrome.windows.onCreated.addListener(onNewWindowCreated);
	chrome.windows.onFocusChanged.addListener(onFocusChanged);	
	chrome.webNavigation.onCommitted.addListener(detectWCISPopup);
	chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);	
	chrome.webNavigation.onCreatedNavigationTarget.addListener(detectWCISPopup);
	chrome.notifications.onButtonClicked.addListener(callbackNotificationWindow);
	

	
})(chrome);