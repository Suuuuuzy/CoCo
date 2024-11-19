(function () {
    if (!document._nuca_link_logging_event_added) {
        document._nuca_link_logging_event_added = true;

        document.addEventListener('_nuca_link_response_error', function (JsonError) { return JsonError.detail.errorCode });
        document.addEventListener('_nuca_link_native_log_message', function (JsonLogMessage) {
            switch (JsonLogMessage.detail.logLevel) {
                case 3: {
                    Nuance.CaptureServices.Logger.logTraceFromAdapter(JsonLogMessage.detail.logMethod, JsonLogMessage.detail.logMessage);
                    break;
                }
                case 2: {
                    Nuance.CaptureServices.Logger.logInfoFromAdapter(JsonLogMessage.detail.logMethod, JsonLogMessage.detail.logMessage);
                    break;
                }
                case 1: {
                    Nuance.CaptureServices.Logger.logWarningFromAdapter(JsonLogMessage.detail.logMethod, JsonLogMessage.detail.logMessage);
                    break;
                }
                case 0: {
                    Nuance.CaptureServices.Logger.logErrorFromAdapter(JsonLogMessage.detail.logMethod, JsonLogMessage.detail.logMessage, JsonLogMessage.detail.errorCode);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        document.addEventListener('_nuca_link_extension_message', function (JsonLog) {
            switch (JsonLog.detail.logLevel) {
                case 3: {
                    Nuance.CaptureServices.Logger.logTrace(JsonLog.detail.logMethod, JsonLog.detail.logMessage);
                    break;
                }
                case 2: {
                    Nuance.CaptureServices.Logger.logInfo(JsonLog.detail.logMethod, JsonLog.detail.logMessage);
                    break;
                }
                case 1: {
                    Nuance.CaptureServices.Logger.logWarning(JsonLog.detail.logMethod, JsonLog.detail.logMessage);
                    break;
                }
                case 0: {
                    Nuance.CaptureServices.Logger.logError(JsonLog.detail.logMethod, JsonLog.detail.logMessage, JsonLog.detail.errorCode);
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
})();

(function (topWindow) {
    'use strict';

    topWindow.Nuance = topWindow.Nuance || {};
    topWindow.Nuance.CaptureServices = topWindow.Nuance.CaptureServices || {};

    /*
        0x5435 - null request for installation process
        0x4553 - null response for installation process
        0x5675 - register new control
        0x3456 - activate
        0x3412 - deactivate
        0x6754 - change led state
        0x7685 - get device name
        0x3448 - activatePrevious
    */
    
    Nuance.CaptureServices.LogLevel = {
        Debug: 4,
        Trace: 3,
        Info: 2,
        Warning: 1,
        Error: 0,
        Exclusive: -1
    };

    window.logListeners = [];
    window.logLevel = 2;
    window.scriptName = "NucaPowerMicChromeAdapter";

    var logLevelCode = {
        logCode: 0x9876
    };

    var Logger = function () {
        var indent = 0;
        this.setLogLevel = function (level) {
            if (level >= Nuance.CaptureServices.LogLevel.Error && level <= Nuance.CaptureServices.LogLevel.Trace) {
                logLevel = level;
                var msg = {
                    detail: {
                        type: logLevelCode.logCode,
                        logLevel: level
                    }
                };
                var method = "NuancePowerMicWebExtension." + scriptName + ".setLogLevel";
                var text = "LogLevel set to " + this.getStringLogLevel(logLevel);
                this.logInfo(method, text);
                document.dispatchEvent(new CustomEvent(eventInterface, msg));
            }
        };

        this.getStringLogLevel = function (level) {
            if (Nuance.CaptureServices.LogLevel.Debug === level)
                return "Debug";
            if (Nuance.CaptureServices.LogLevel.Trace === level)
                return "Trace";
            if (Nuance.CaptureServices.LogLevel.Info === level)
                return "Info";
            if (Nuance.CaptureServices.LogLevel.Warning === level)
                return "Warning";
            if (Nuance.CaptureServices.LogLevel.Error === level)
                return "Error";
            return "Exclusive";
        }

        this.getLogLevel = function () {
            var method = "NuancePowerMicWebExtension." + scriptName + ".getLogLevel";
            var text = "LogLevel is " + this.getStringLogLevel(logLevel);
            this.logInfo(method, text);
            return logLevel;
        };

        this.addListener = function (logListener) {
            if (!logListener || typeof (logListener) != "function") {
                return;
            }

            logListeners.push(logListener);
        };

        this.removeListener = function (logListener) {
            var index = logListeners.indexOf(logListener);
            if (index > -1)
                tlogListeners.splice(index, 1);
        };

        this.removeAllListeners= function () {
            logListeners = [];
        };

        this.addTimeStamp = function (text) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            function addZeroMs(i) {
                if (i < 10) {
                    i = "00" + i;
                }
                else if (i < 100) {
                    i = "0" + i;
                }
                return i;
            }
            var date = new Date();
            var auxText = date.getFullYear() + '-' + (addZero(date.getMonth() + 1)) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) +
                ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + '.' + addZeroMs(date.getMilliseconds());
            return auxText + ' ' + text;
        };

        this.logText = function (method, text, error, level) {
            if (logLevel < level)
                return;
            if (!text)
                text = "";
            this.log(method, text, error, level);
        };

        this.logDebug = function (method, text) {
            if (logLevel < Nuance.CaptureServices.LogLevel.Debug)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Debug);
        };

        this.logEnter = function (method, text) {
            var prefix = "ENTER";
            if (!text)
                text = "";
            this.logTrace(prefix + method, text);
            this.indent += 3;
        };

        this.logExit = function (method) {
            var prefix = "EXIT";
            this.indent -= 3;
            this.logTrace(prefix + method, "");
        };

        this.logTraceFromAdapter = function (method, text) {
            if (logLevel < 3)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Trace);
        };

        this.logTrace = function (method, text) {
            if (logLevel < 3)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Trace);
        };

        this.logInfoFromAdapter = function (method, text) {
            if (logLevel < 2)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Info);
        };

        this.logInfo = function (method, text) {
            if (logLevel < 2)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Info);
        };

        this.logWarningFromAdapter = function (method, text) {
            if (logLevel < 1)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Warning);
        };

        this.logWarning = function (method, text) {
            if (logLevel < 1)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Warning);
        };

        this.logErrorFromAdapter = function (method, text, error) {
            if (logLevel < 0)
                return;
            if (!text)
                text = "";
            if (!error)
                error = "";
            this.log(method, text, error, Nuance.CaptureServices.LogLevel.Error);
        };

        this.logError = function (method, text, error) {
            if (logLevel < 0)
                return;
            if (!text)
                text = "";
            if (!error)
                error = "";
            this.log(method, text, error, Nuance.CaptureServices.LogLevel.Error);
        };

        this.logExclusive = function (method, text) {
            if (logLevel != Nuance.CaptureServices.LogLevel.Exclusive)
                return;
            if (!text)
                text = "";
            this.log(method, text, "", Nuance.CaptureServices.LogLevel.Warning);
        };

        this.getLogLevelFromString = function (logLevelString) {
            logLevelString = logLevelString.toLowerCase();
            if (logLevelString === "debug")
                return Nuance.CaptureServices.LogLevel.Debug;
            if (logLevelString === "trace")
                return Nuance.CaptureServices.LogLevel.Trace;
            if (logLevelString === "info")
                return Nuance.CaptureServices.LogLevel.Info;
            if (logLevelString === "warning")
                return Nuance.CaptureServices.LogLevel.Warning;
            if (logLevelString === "exclusive")
                return Nuance.CaptureServices.LogLevel.Exclusive;
            return Nuance.CaptureServices.LogLevel.Error;
        };

        this.getArgumentString = function (startIndex, args) {
            var retString = "", i;
            for (i = startIndex; i < args.length; ++i) {
                if (i > startIndex)
                    retString += ", ";
                retString += args[i];
            }
            return retString;
        };

        this.getIndentString = function (ind) {
            if (!ind)
                ind = this.indent;
            var str = " ",
                i;
            for (i = 0; i < ind; ++i)
                str += " ";
            return str;
        };

        this.fireOnLog = function (level, text, error, method) {
            logListeners.forEach(function (element) { element(level, text, error, method); });
        },

        this.log = function (method, text, error, level) {
            this.fireOnLog(level, text, error, method);
        };
    };

    var eventInterface = '_nuca_link_request';
    var _commandCodes = {
        activate: 0x3456,
        activatePrevious: 0x3448,
        deactivate: 0x3412,
        getDeviceName: 0x7685,
        ledState: 0x6754,
        registerDevice: 0x5675
    };

    function getMessageObj(msgType, msgValue) {
        var msg = {
            detail: {
                type: msgType
            }
        };

        if (msgValue) {
            msg.detail.newValue = msgValue;
        }

        return msg;
    }

    function sendEventToContentJS(msgType, msgValue) {
        //console.log('Adapter > content ', msgType, msgValue);
        var method = "NuancePowerMicWebExtension." + scriptName + ".sendEventToContentJS";
        var text = "Adapter > content : Type " + msgType + " Value " + msgValue;
        Nuance.CaptureServices.Logger.logTrace(method, text);
        var msg = getMessageObj(msgType, msgValue);
        document.dispatchEvent(new CustomEvent(eventInterface, msg));
    }

    var ControlDevice = function () {
        this._onLedStateChanged = function (sender, oldvalue, newvalue) { };
        this._onLedStateChangeFailed = function (sender, errorvalue) { };
        this._onActivate = function (sender) { };
        this._onActivateFailed = function (sender, errorvalue) { };
        this._onDeactivate = function (sender) { };
        this._onDeactivateFailed = function (sender, errorvalue) { };
        this._onActivatePrevious = function (sender) { };
        this._onActivatePreviousFailed = function (sender, errorvalue) { };
        //this._onDeviceNameChanged = function (sender) { };
        //this._onDeviceNameChangeFailed = function (sender) { };
        this._onDeviceEvent = function (sender, evtcode, evsrccode) { };
        this._onDeviceChangedEvent = function (sender, evtcode, deviceName) { };
        this._onError = function (sender, err) { };
        this.ledState = 0;
        this.errorCode = 0;
    };

    ControlDevice.LedState = {
        Default: 0,
        Stop: 1,
        Play: 2,
        RecordInsert: 3,
        Record: 4,
        RecordBlink: 5,
        Cmd: 6,
        CmdBlink: 7
    };

    ControlDevice.DeviceEvent = {
        StopPressed: 1,
        StopReleased: 2,
        PlayPressed: 3,
        PlayReleased: 4,
        RecordPressed: 5,
        RecordReleased: 6,
        InsertPressed: 7,
        InsertReleased: 8,
        EOLPressed: 9,
        EOLReleased: 10,
        FastRewindPressed: 11,
        FastRewindReleased: 12,
        FastForwardPressed: 13,
        FastForwardReleased: 14,
        CommandPressed: 15,
        CommandReleased: 16,
        PlayStopTogglePressed: 17,
        PlayStopToggleReleased: 18,
        TriggerPressed: 19,
        TriggerReleased: 20,
        InstructionPressed: 21,
        InstructionReleased: 22,
        Function1Pressed: 23,
        Function1Released: 24,
        Function2Pressed: 25,
        Function2Released: 26,
        Function3Pressed: 27,
        Function3Released: 28,
        Function4Pressed: 29,
        Function4Released: 30,
        Smart1Pressed: 31,
        Smart1Released: 32,
        Smart2Pressed: 33,
        Smart2Released: 34
    };

    ControlDevice.DeviceEventSource = {
        MicControl: 1,
        FootControl: 2
    };

    ControlDevice.DeviceState = {
        Connected: 0,
        Disconnected: 1
    };

    ControlDevice.ErrorCodes = {
        DeviceError: 1,
        InternalError: 2,
        AdapterPackageNotInstalled: 4,
        ExtensionOutdated: 5,
        NotInitializedError: 6,
        AdapterPackageNotSupported: 7
    };
    
    // RELEASE SERVER
    ControlDevice.url = "https://speechanywhere.nuancehce.com/NuancePowerMic/NuancePowerMicWebAdapterSetup_121.4.241.0.exe";
					    
    // BETA STAGING SERVER
    //ControlDevice.url = "https://speechanywhere-staging.nuancehce.com/NuancePowerMic/NuancePowerMicWebAdapterSetup_121.4.241.0.exe";

    ControlDevice.prototype = {
        constructor: ControlDevice,

        set LedState(value) {
            var state = GetEnumValue(ControlDevice.LedState, value);
            var method = "NuancePowerMicWebExtension." + scriptName + ".set_LedState";
            Nuance.CaptureServices.Logger.logTrace(method, state);
            sendEventToContentJS(_commandCodes.ledState, value);
        },
        get LedState() {
            var state = GetEnumValue(ControlDevice.LedState, this.ledState);
            var method = "NuancePowerMicWebExtension." + scriptName + ".get_LedState";
            Nuance.CaptureServices.Logger.logInfo(method, state);
            return this.ledState;
        },
        activate: function () {
            //console.debug('chromeAdapter: sending activate');
            var method = "NuancePowerMicWebExtension." + scriptName + ".activate";
            Nuance.CaptureServices.Logger.logTrace(method, "activate ControlDevice");
            sendEventToContentJS(_commandCodes.activate);
        },
        deactivate: function () {
            //console.debug('chromeAdapter: sending deactivate');
            var method = "NuancePowerMicWebExtension." + scriptName + ".deactivate";
            Nuance.CaptureServices.Logger.logTrace(method, "deactivate ControlDevice");
            sendEventToContentJS(_commandCodes.deactivate);
        },
        activatePrevious: function () {
            // console.debug('chromeAdapter: sending activate previous');
            var method = "NuancePowerMicWebExtension." + scriptName + ".activatePrevious";
            Nuance.CaptureServices.Logger.logTrace(method, "activate previous ControlDevice");
            sendEventToContentJS(_commandCodes.activatePrevious);
        },
        getDeviceName: function (onSuccess, onError) {
            var responseCb;
            var responseFailCb;

            function removeEventListeners() {
                document.removeEventListener("_nuca_link_response_on_get_device_name", responseCb, false);
                document.removeEventListener("_nuca_link_response_on_get_device_name_failed", responseFailCb, false);
            }

            responseCb = function (response) {
                removeEventListeners();
                document._nucaControlDevice.deviceName = response.detail.deviceName;
                onSuccess(document._nucaControlDevice, response.detail.deviceName);
                var method = "NuancePowerMicWebExtension." + scriptName + ".getDeviceName";
                var text = "Device name is: " + response.detail.deviceName;
                Nuance.CaptureServices.Logger.logTrace(method, text);
            };

            responseFailCb = function (response) {
                removeEventListeners();
                onError(document._nucaControlDevice, ControlDevice.ErrorCodes.DeviceError);
                var method = "NuancePowerMicWebExtension." + scriptName + ".getDeviceName";
                var text = "No device connected";
                Nuance.CaptureServices.Logger.logTrace(method, text);
            };

            document.addEventListener("_nuca_link_response_on_get_device_name", responseCb);
            document.addEventListener("_nuca_link_response_on_get_device_name_failed", responseFailCb);
            sendEventToContentJS(_commandCodes.getDeviceName);
        },
        set onLedStateChanged(val) {
            this._onLedStateChanged = val;
        },
        get onLedStateChanged() {
            return this._onLedStateChanged;
        },
        set onLedStateChangeFailed(val) {
            this._onLedStateChangeFailed = val;
        },
        set onActivate(val) {
            this._onActivate = val;
        },
        set onActivateFailed(val) {
            this._onActivateFailed = val;
        },
        set onDeactivate(val) {
            this._onDeactivate = val;
        },
        set onDeactivateFailed(val) {
            this._onDeactivateFailed = val;
        },
        set onActivatePrevious(val) {
            this._onActivatePrevious = val;
        },
        set onActivatePreviousFailed(val) {
            this._onActivatePreviousFailed = val;
        },
        set onDeviceEvent(val) {
            this._onDeviceEvent = val;
        },
        set onDeviceChangedEvent(val) {
            this._onDeviceChangedEvent = val;
        },
        set onError(val) {
            this._onError = val;
        }
    };
    /*helper functions*/
    function GetEnumValue(enumObject, id) {
        for (var key in enumObject) {
            if (enumObject[key] == id)
                return key;
        }
    }
    /*helper functions*/
    function GetDeviceStateChangeFromEventCode(code) {
        if (code == ControlDevice.DeviceState.Disconnected) {
            return "Disconnected";
        }
        else if (code == ControlDevice.DeviceState.Connected) {
            return "Connected";
        }
    }
    /*helper functions*/
    
    ControlDevice.getAdapterPackageInstallationUrl = function () {
        var method = "NuancePowerMicWebExtension." + scriptName + ".getAdapterPackageInstallationUrl";
        Nuance.CaptureServices.Logger.logInfo(method, ControlDevice.url);
        return ControlDevice.url;
    };

    //this method was created to help us test the AutoUpdate functionality by sending the URL manually
    ControlDevice.setAdapterPackageInstallationUrl = function (adapterUrl) {
        if (adapterUrl) {
            ControlDevice.url = adapterUrl;
            var method = "NuancePowerMicWebExtension." + scriptName + ".setAdapterPackageInstallationUrl";
            Nuance.CaptureServices.Logger.logInfo(method, ControlDevice.url);
        } 
    }

    ControlDevice.getControlDevice = function (onSuccess, onError) {
        if (document._nucaControlDevice) {
            onSuccess(document._nucaControlDevice, document._nucaControlDevice.isAdapterOutdated);
            if (document._nucaControlDevice.errorCode) {
                var method = "NuancePowerMicWebExtension." + scriptName + ".getControlDevice";
                var text = "Error while creating control device!";
                Nuance.CaptureServices.Logger.logError(method, text, document._nucaControlDevice.errorCode);
                onError(document._nucaControlDevice.errorCode);
                document._nucaControlDevice.errorCode = 0;
            }
            return;
        }

        document.dispatchEvent(new CustomEvent('_nuca_link_request', {
            detail: { type: _commandCodes.registerDevice, adapterURL: ControlDevice.url } // Request new control device from native app
        }));

        if ((typeof (topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseCb) === 'undefined') ||
            (typeof (topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseError) === 'undefined')) {

            topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseCb = function (response) {
                //console.debug('Got new control response from content script...');
                var method = "NuancePowerMicWebExtension." + scriptName + ".getControlDevice";
                var text = "New control response from content script";
                Nuance.CaptureServices.Logger.logTrace(method, text);
                if (!response.detail.isAdapterOutdated) {
                    document.removeEventListener("_nuca_link_response_new_control", topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseCb, false);
                    delete topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseCb;
                }
                document._nucaControlDevice = new ControlDevice();
                document._nucaControlDevice.onError = onError;

                // Setup led state changed event
                document.addEventListener("_nuca_link_response_on_led_changed", function (response) {
                    //no need to log here since it is logged the same event in setLedState method
                    //var state = GetEnumValue(ControlDevice.LedState, response.detail.newValue);
                    //var text = "NuancePowerMicWebExtension." + scriptName + ".onLedChanged:" + state;
                    //Nuance.CaptureServices.Logger.logInfo("onLedChanged()", text);
                    var oldLedState = document._nucaControlDevice.ledState;
                    document._nucaControlDevice.ledState = response.detail.newValue;
                    document._nucaControlDevice._onLedStateChanged(document._nucaControlDevice, oldLedState, document._nucaControlDevice.ledState);
                });

                document.addEventListener("_nuca_link_response_on_led_changed_failed", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onLedChanged";
                    Nuance.CaptureServices.Logger.logError(method, "failed");
                    document._nucaControlDevice._onLedStateChangeFailed(document._nucaControlDevice, ControlDevice.ErrorCodes.DeviceError);
                });

                document.addEventListener("_nuca_link_response_on_activate", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onActivate";
                    Nuance.CaptureServices.Logger.logTrace(method, "succeeded");
                    document._nucaControlDevice._onActivate(document._nucaControlDevice);
                });

                document.addEventListener("_nuca_link_response_on_activate_failed", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onActivate";
                    Nuance.CaptureServices.Logger.logError(method, "failed");
                    document._nucaControlDevice._onActivateFailed(document._nucaControlDevice, ControlDevice.ErrorCodes.DeviceError);
                });

                document.addEventListener("_nuca_link_response_on_deactivate", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onDeactivate";
                    Nuance.CaptureServices.Logger.logTrace(method, "succeeded");
                    document._nucaControlDevice._onDeactivate(document._nucaControlDevice);
                });

                document.addEventListener("_nuca_link_response_on_deactivate_failed", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onDeactivate";
                    Nuance.CaptureServices.Logger.logError(method, "failed");
                    document._nucaControlDevice._onDectivateFailed(document._nucaControlDevice, ControlDevice.ErrorCodes.DeviceError);
                });

                document.addEventListener("_nuca_link_response_on_activatePrevious", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onActivatePrevious";
                    Nuance.CaptureServices.Logger.logTrace("onActivatePrevious()", "succeeded");
                    document._nucaControlDevice._onActivatePrevious(document._nucaControlDevice);
                });

                document.addEventListener("_nuca_link_response_on_activatePrevious_failed", function (response) {
                    var method = "NuancePowerMicWebExtension." + scriptName + ".onActivatePrevious";
                    Nuance.CaptureServices.Logger.logError(method, "failed");
                    document._nucaControlDevice._onActivatePreviousFailed(document._nucaControlDevice, ControlDevice.ErrorCodes.DeviceError);
                });

                // Setup device event
                document.addEventListener("_nuca_link_response_on_device_event", function (response) {
                    var evt = GetEnumValue(ControlDevice.DeviceEvent, response.detail.deviceEventCode);
                    var method = "NuancePowerMicWebExtension." + scriptName + ".OnDeviceEvent";
                    Nuance.CaptureServices.Logger.logTrace(method, evt);
                    document._nucaControlDevice._onDeviceEvent(document._nucaControlDevice, response.detail.deviceEventCode, response.detail.deviceEventSourceCode);
                });
                // device changed event
                document.addEventListener("_nuca_link_response_on_device_changed_event", function (response) {
                    var evt = response.detail.deviceName + " " + GetDeviceStateChangeFromEventCode(response.detail.deviceChangedEventCode);
                    var method = "NuancePowerMicWebExtension." + scriptName + ".OnDeviceChangedEvent";
                    Nuance.CaptureServices.Logger.logTrace(method, evt);
                    document._nucaControlDevice._onDeviceChangedEvent(document._nucaControlDevice, response.detail.deviceChangedEventCode, response.detail.deviceName);
                });
                document._nucaControlDevice.isAdapterOutdated = response.detail.isAdapterOutdated;
                onSuccess(document._nucaControlDevice, response.detail.isAdapterOutdated);

            };

            document.addEventListener("_nuca_link_response_new_control", ControlDevice.newRegResponseCb);

            topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseFailCb = function (response) {
                document.removeEventListener("_nuca_link_response_new_control_failed", topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseFailCb, false);
                delete topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseFailCb;
                var method = "NuancePowerMicWebExtension." + scriptName;
                var text = "Create control device failed. Error: " + ControlDevice.ErrorCodes.DeviceError;
                Nuance.CaptureServices.Logger.logError(method, text);
                //console.debug(typeof (topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseFailCb));
                onError(ControlDevice.ErrorCodes.DeviceError);
            };

            document.addEventListener("_nuca_link_response_new_control_failed", topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseFailCb);

            topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseError = function (response) {
                //var evt = GetEnumValue(ControlDevice.ErrorCodes, response.detail.errorCode);
                //var text = "NuancePowerMicWebExtension." + scriptName + " Got error response from content script: " + evt;
                //Nuance.CaptureServices.Logger.logError("ControlDevice()", text);
                //console.debug('Got error response from content script: ' + response.detail.errorCode);
                if (response.detail.errorCode == ControlDevice.ErrorCodes.NotInitializedError) {
                    document._nucaControlDevice = null;
                }
                if (document._nucaControlDevice) {
                    document._nucaControlDevice.errorCode = response.detail.errorCode;
                }

                onError(response.detail.errorCode);
            };

            document.addEventListener("_nuca_link_response_error", topWindow.Nuance.CaptureServices.ControlDevice.newRegResponseError);
        }
    };

    topWindow.Nuance.CaptureServices.ControlDevice = ControlDevice;
    topWindow.Nuance.CaptureServices.Logger = new Logger();
    topWindow.Nuance.CaptureServices.integrationFileVersion = "undefined";
    if (typeof (NucaPowerMicChromeAdapterReady) === "function") {
        NucaPowerMicChromeAdapterReady(ControlDevice);
        try {
            //sending version of integration file
            sendEventToContentJS(0x9988, window.Nuance.CaptureServices.integrationFileVersion);
        }
        catch (error) {
            var method = "NuancePowerMicWebExtension." + scriptName + ".getIntegrationFileVersion";
            Nuance.CaptureServices.Logger.logError(method, error);
        }
    } else {
        //console.debug("NucaPowerMicChromeAdapterReady was not found");
        var method = "NuancePowerMicWebExtension." + scriptName + ".getControlDevice";
        Nuance.CaptureServices.Logger.logInfo(method, "NucaPowerMicChromeAdapterReady not found");
    }
})(window.top);