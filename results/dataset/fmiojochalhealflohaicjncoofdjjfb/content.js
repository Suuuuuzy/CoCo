(function (window, chrome) {
	'use strict';

    var scriptName = "Content";
	var bgNucaPort = null;
	var doc = window.document;
	try {
		doc = window.top.document;
	} catch (ex) {
		console.log(ex);
		return;
    }

	var customErrorEventName = '_nuca_link_response_error';
	var eventInterfaceName = '_nuca_link_request';

	var _ResponseCodes = {
		errorResponse: 0x2635,
		deviceEvent: 0x1564,
		registerDeviceResponse: 0x5676,
		activateResponse: 0x3457,
		activatePreviousResponse: 0x3449,
		deactivateResponse: 0x3413,
		deviceNameResponse: 0x7686,
		ledChangeResponse: 0x6755,
        deviceChangeEvent: 0x1734,
		nativeLogMessage: 0x7817,
		logCode: 0x9876,
		getVersion: 0x9987,
        getVersionResponse: 0x9988
	};

	Object.prototype.getKeyByValue = function (value) {
	    for (var prop in this) {
	        if (this.hasOwnProperty(prop)) {
	            if (this[prop] === value)
	                return prop;
	        }
	    }
	};
	function injectNucaPowerMicChromeAdapterAPI() {
	    function apisrc_loaded() {
	        //console.debug("NucaPowerMicChromeAdapter API loaded.");

            var method = "NuancePowerMicWebExtension." + scriptName + ".injectNucaPowerMicChromeAdapterAPI.apisrc_loaded";
            var jsonRes = { logMethod: method, logMessage: "NucaPowerMicChromeAdapterAPI injected.", logLevel: 2 };
            doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
            onDocNucaRequest({
                detail: {
                    type: 0x9980 // setting flag for popup shouldPopupAppear
                }
            });
	        // ToDo: change the activation function 'NucaPowerMicChromeAdapterReady' to be a callback here
	    }

	    function apisrc_error(loadError) {
	       // console.debug(loadError);
	        var jsonRes = { errorCode: 2 }; //InternalError: 2,
	        doc.dispatchEvent(new CustomEvent(customErrorEventName, {
	            detail: jsonRes
	        }));
	        var method = "NuancePowerMicWebExtension." + scriptName + ".injectNucaPowerMicChromeAdapterAPI.apisrc_error";
	        var jsonRes = { logMethod: method, logMessage: "InternalError", logLevel: 0 };
	        doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
	    }

	    try {

	        var chromeAdapterAPIScript = doc.getElementById('_nucapowermicchromeadapterAPI_');
	        if (chromeAdapterAPIScript) {
	            for (var i = 0; i < doc.body.children.length; i++) {
	                if (doc.body.children[i].id == '_nucapowermicchromeadapterAPI_') {
	                    doc.body.removeChild(doc.body.children[i]);
	                }
	            }
	        }

	        chromeAdapterAPIScript = doc.createElement('script');
	        chromeAdapterAPIScript.src = chrome.extension.getURL('NucaPowerMicChromeAdapter.js');
	        chromeAdapterAPIScript.type = 'text/javascript';
	        chromeAdapterAPIScript.id = '_nucapowermicchromeadapterAPI_';
	        chromeAdapterAPIScript.onerror = apisrc_error;
	        chromeAdapterAPIScript.onload = apisrc_loaded;
	        doc.body.appendChild(chromeAdapterAPIScript);
	    } catch (ex) {
	        //console.debug(ex);
	        var jsonRes = { errorCode: 2 }; //InternalError: 2,
	        doc.dispatchEvent(new CustomEvent(customErrorEventName, {
	            detail: jsonRes
	        }));
	        var method = "NuancePowerMicWebExtension." + scriptName + ".injectNucaPowerMicChromeAdapterAPI.apisrc_error";
	        var jsonRes = { logMethod: method, logMessage: "InternalError", logLevel: 0 };
	        doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
	    }
	}

     function registerNewDevice(request) {
        doc._nuca_register_attempts = doc._nuca_register_attempts || 0;
        var interval_time = 7000;
        var limit = Math.ceil(5 * 60 * 1000 / interval_time);

        function sendRegisterNewDeviceRequest() {
            doc._nuca_register_attempts++;
            sendRequestToBackground(request);

            if (doc._nuca_register_attempts > limit) {
                clearInterval(doc._nuca_installation_ensurance_interval);
            }
        }

        // send first request:
        sendRegisterNewDeviceRequest();

        // clear interval if somehow previous exists:
        if (doc._nuca_installation_ensurance_interval) {
            clearInterval(doc._nuca_installation_ensurance_interval);
        }

        // and keep sending...
        doc._nuca_installation_ensurance_interval = setInterval(sendRegisterNewDeviceRequest, interval_time);
    }

    function sendRequestToBackground(request) {
        try {
            bgNucaPort.postMessage(request.detail);
        } catch (ex) {
            var jsonRes = { errorCode: 2 }; //InternalError: 2,
            doc.dispatchEvent(new CustomEvent(customErrorEventName, {
                detail: jsonRes
            }));
        }
    }

    function unInitialize() {
        //console.debug('uninitialize');
        doc.removeEventListener(eventInterfaceName, onDocNucaRequest);
        chrome.runtime.onMessage.removeListener(onMessageExtension);
        var jsonRes = { errorCode: 6 }; //InternalError: 2,
        doc.dispatchEvent(new CustomEvent(customErrorEventName, {
            detail: jsonRes
        }));
        var method = "NuancePowerMicWebExtension." + scriptName + ".unInitialize";
        var jsonRes = { logMethod:method, logMessage: "NotInitializedError", logLevel: 0 };
        doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
    }


    /**
     * NucaPowerMicChromeAdapter > ContentJS
     * called when NucaPowerMicChromeAdapter API raises an event for the ContentJS
     * @param {Obj} request 
     */
    function onDocNucaRequest(request) {
        //console.debug('onDocNucaRequest: ' + JSON.stringify(request.detail));
        var method = "NuancePowerMicWebExtension." + scriptName + ".onDocNucaRequest";
        var jsonRes = { logMethod: method, logMessage: JSON.stringify(request.detail), logLevel: 3 };
        doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
        var type = request.detail.type;
        switch (type) {
            case 0x5435:
                doc.dispatchEvent(new CustomEvent('0x4553', {}));
                break;
            case 0x2634:
                console.debug('onDocNucaRequest: injectAPI');
                injectNucaPowerMicChromeAdapterAPI();
                break;
            case 0x5675: // registeredDevice
                registerNewDevice(request);
                break;
            case _ResponseCodes.getVersionResponse:
                var response = {};
                response.type = _ResponseCodes.getVersionResponse;
                response.detail = request.detail;
                bgNucaPort.postMessage(response);
                break;
            default:
                sendRequestToBackground(request);
                break;
        }
    }

    function handleErrorFromBackground(request) {
        if (request.errorCode === 4 &&
			doc._nuca_register_attempts > 1) {
            return;
        }

        window.top._nuca_initialized = false;
        doc.dispatchEvent(new CustomEvent(customErrorEventName, {
            detail: { errorCode: request.errorCode }
        }));
    }

 /**
 * Background > Content
 * Called when the Background.js is responding the contentJS page
 * @param {Obj} request 
 * @param {Obj} port 
 */
    function onMessageExtension(request /*, port*/) {
        var method = "NuancePowerMicWebExtension." + scriptName + ".onMessageExtension";
        var text = _ResponseCodes.getKeyByValue(request.type);
        var jsonResLog = { logMethod: method, logMessage: text, logLevel: 3 };
        //var senderId = request.senderId;
        delete request.senderId;
        var type = request.type;
        delete request.type;
        var jsonRes = {};
        switch (type) {
            case _ResponseCodes.errorResponse:
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonResLog }));
                handleErrorFromBackground(request);
                break;
            case _ResponseCodes.registerDeviceResponse:
            	doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonResLog }));
                //destroy the Adapter popup after the Adapter has been installed
                var popupElement = document.getElementById('tingleModalBox');
                if (popupElement != null && popupElement != 'undefined') {
                    popupElement.parentNode.removeChild(popupElement);
                }

                jsonRes = { errorCode: request.errorCode, isAdapterOutdated: request.isAdapterOutdated };
                if (request.errorCode === 0) {
                    clearInterval(doc._nuca_installation_ensurance_interval);
                    if (!request.isAdapterOutdated) {
                        if (doc._nuca_check_focus_interval) {
                            clearInterval(doc._nuca_check_focus_interval);
                        }
                    }
                    doc._nuca_check_focus_interval = setInterval(doc.checkFocusChange, 1000);

                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_new_control", {
                        detail: jsonRes
                    }));
                    jsonRes = { logMethod: method, logMessage: "GetControlDevice successfully created", logLevel: 2 };
                    doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                } else {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_new_control_failed", {
                        detail: jsonRes
                    }));
                }
                break;
            case _ResponseCodes.deviceEvent:
                jsonRes = { deviceEventCode: request.deviceEventCode, deviceEventSourceCode: request.deviceEventSourceCode };
                doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_device_event", {
                    detail: jsonRes
                }));
                break;
            case _ResponseCodes.deviceChangeEvent: 
                jsonRes = { deviceChangedEventCode: request.deviceChangedEventCode, deviceName: request.deviceName };
                doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_device_changed_event", {
                    detail: jsonRes
                }));
                break;
            case _ResponseCodes.activateResponse:
                //console.debug('Received from background activate response.');
                var jsonRes = { logMethod: method, logMessage: "Received from background activate response", logLevel: 3 };
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                jsonRes = { errorCode: request.errorCode };
                if (request.errorCode === 0) {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_activate", { detail: null }));
                } else {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_activate_failed", {
                        detail: jsonRes
                    }));
                }
                break;
            case _ResponseCodes.deactivateResponse:
                //console.debug('Received from background deactivate response.');
                var jsonRes = { logMethod: method, logMessage: "Received from background deactivate response", logLevel: 3 };
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                jsonRes = { errorCode: request.errorCode };
                if (request.errorCode === 0) {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_deactivate", { detail: null }));
                } else {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_deactivate_failed", {
                        detail: jsonRes
                    }));
                }
                break;
            case _ResponseCodes.activatePreviousResponse: 
                //console.log('Received from background activatePrevious response.');
                var jsonRes = { logMethod: method, logMessage: "Received from background activatePrevious response", logLevel: 3 };
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                jsonRes = { errorCode: request.errorCode };
                if (request.errorCode === 0) {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_activatePrevious", { detail: null }));
                } else {
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_activatePrevious_failed", {
                        detail: jsonRes
                    }));
                }
                break;
            case _ResponseCodes.deviceNameResponse:
                //console.debug('Received from background device name response.');
                var jsonRes = { logMethod: method, logMessage: "Received from background device name response", logLevel: 3 };
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                if (request.errorCode === 0) {
                    var deviceNameValue = request.deviceName;
                    jsonRes = { deviceName: deviceNameValue };
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_get_device_name", { detail: jsonRes }));
                } else {
                    jsonRes = { errorCode: request.errorCode };
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_get_device_name_failed", { detail: jsonRes }));
                }
                break;
            case _ResponseCodes.ledChangeResponse: 
                //console.debug('Received from background led state response.');
                var jsonRes = { logMethod: method, logMessage: "Received from background led state response", logLevel: 3 };
                doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                if (request.errorCode === 0) {
                    var ledNewValue = request.newValue;
                    jsonRes = { newValue: ledNewValue };
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_led_changed", { detail: jsonRes }));
                } else {
                    jsonRes = { errorCode: request.errorCode };
                    doc.dispatchEvent(new CustomEvent("_nuca_link_response_on_led_changed_failed", { detail: jsonRes }));
                }
                break;
            case _ResponseCodes.nativeLogMessage: 
                //console.debug('Received from background Native Log Message');
                if (request.errorCode === 0) {
                    jsonRes = { logMethod: request.logMethod, logMessage: request.logMessage, logLevel: request.logLevel };
                    doc.dispatchEvent(new CustomEvent('_nuca_link_native_log_message', { detail: jsonRes }));
                }
                else {
                    jsonRes = { logMethod: request.logMethod, logMessage: request.logMessage, errorCode: request.errorCode, logLevel: request.logLevel };
                    doc.dispatchEvent(new CustomEvent('_nuca_link_native_log_message', { detail: jsonRes }));
                }
                break;
            case _ResponseCodes.logCode:
                //send logging from background
                if (request.errorCode === 0) {
                    jsonRes = { logMethod: request.logMethod, logMessage: request.logMessage, logLevel: request.logLevel };
                    doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                }
                else {
                    jsonRes = { logMethod: request.logMethod, logMessage: request.logMessage, errorCode: request.errorCode, logLevel: request.logLevel };
                    doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
                }
                break;
            case _ResponseCodes.getVersion:
                console.log("received from background integration file version");
                jsonRes = { type: _ResponseCodes.getVersion };
                doc.dispatchEvent(new CustomEvent('_nuca_link_integrationfileversion', { detail: jsonRes }));
                break;
            default:
                break;
        }
        return true;
    }

    function onDisconnectExtension(/*port*/) {
        unInitialize();
    }

    function sendBlur() {
        onDocNucaRequest({
            detail: {
                type: 0x4020
            }        
        });
    }

    function sendFocus() {
        onDocNucaRequest({
            detail: {
                type: 0x4010
            }        
        });
    }

    function isFocused() {
        var isCurrFocused = doc.hasFocus();
        try {
            var len = doc.getElementsByTagName('iframe').length;
            if (!isCurrFocused && len > 0) {
                //checking if one of the frames has focus - only supporting one frame level
                var i, w;
                for (i=0; i<len && !isCurrFocused; i++) {
                    w = doc.getElementsByTagName('iframe')[i];
                    isCurrFocused = isCurrFocused || doc.activeElement === w;
                }
            }
        } catch (e) {
            //console.log(e);
            var method = "NuancePowerMicWebExtension." + scriptName + ".isFocused";
            var jsonRes = { logMethod: method, logMessage: "exception:" + e, logLevel: 0 };
            doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
        }

        //console.log('current window focused: ', isCurrFocused);

        return isCurrFocused;
    }


	function init() {
        /*
            // content scripts *might* get loaded multiple times for one frame
            (https://stackoverflow.com/questions/39124570/chrome-extension-update-flow?noredirect=1&lq=1)
            LiadM: this happens upon updating the Extension. The content script is replanted in the code
            and the previous content.js become an 'orphaned'. DOM listeners though still being triggered.
        */
        /*
            If port to Extension already existing, disconnect and reconnect
        */
		if (!doc._nuca_link_request_event_added) {
			doc._nuca_link_request_event_added = true;
            /* ToDo:
                Change the communication between NucaPowerMicChromeAdapter.js and content.js to
                postMessage instead of dispatchEvent - to avoid CORS problem with Frames.
            */
			doc.addEventListener(eventInterfaceName, onDocNucaRequest);
			chrome.runtime.onMessage.addListener(onMessageExtension);

			bgNucaPort = chrome.runtime.connect(chrome.runtime.id);
			bgNucaPort.onDisconnect.addListener(onDisconnectExtension);

			doc.checkFocusChange = function () {
				var isCurrentlyFocused = isFocused();

				var focusChanged = (isCurrentlyFocused !== doc._nuca_lastIsFocusedResult);
				//console.log('focusChanged: ', focusChanged);

				if (focusChanged) {
				    //console.debug('Focus changed - current window focused: ', isCurrentlyFocused);
				    var method = "NuancePowerMicWebExtension." + scriptName + ".init.checkFocusChange";
				    var jsonRes = { logMethod: method, logMessage: "Focus changed", logLevel: 3 };
				    doc.dispatchEvent(new CustomEvent('_nuca_link_extension_message', { detail: jsonRes }));
					doc._nuca_lastIsFocusedResult = isCurrentlyFocused;
					if (isCurrentlyFocused) {
						sendFocus();
					}
					else {
						sendBlur();
					}
				}
			};

			doc._nuca_lastIsFocusedResult = isFocused();
		}
		// ------------------------------------------------------------------------
	}

	init();

})(window, chrome);