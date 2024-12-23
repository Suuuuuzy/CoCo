/*global gsUtils, gsStorage */
// eslint-disable-next-line no-unused-vars
var gsMessages = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',

  sendInitTabToContentScript(
    tabId,
    ignoreForms,
    tempWhitelist,
    scrollPos,
    callback
  ) {
    var payload = {
      ignoreForms: ignoreForms,
      tempWhitelist: tempWhitelist,
    };
    if (scrollPos) {
      payload.scrollPos = scrollPos;
    }
    gsMessages.sendMessageToContentScript(
      tabId,
      payload,
      gsMessages.ERROR,
      callback
    );
  },

  sendUpdateToContentScriptOfTab: function(tab) {
    if (
      gsUtils.isSpecialTab(tab) ||
      gsUtils.isSuspendedTab(tab, true) ||
      gsUtils.isDiscardedTab(tab)
    ) {
      return;
    }

    const ignoreForms = gsStorage.getOption(gsStorage.IGNORE_FORMS);
    gsMessages.sendMessageToContentScript(
      tab.id,
      { ignoreForms },
      gsMessages.WARNING
    );
  },

  sendTemporaryWhitelistToContentScript: function(tabId, callback) {
    gsMessages.sendMessageToContentScript(
      tabId,
      {
        tempWhitelist: true,
      },
      gsMessages.WARNING,
      callback
    );
  },

  sendUndoTemporaryWhitelistToContentScript: function(tabId, callback) {
    gsMessages.sendMessageToContentScript(
      tabId,
      {
        tempWhitelist: false,
      },
      gsMessages.WARNING,
      callback
    );
  },

  sendRequestInfoToContentScript(tabId, callback) {
    gsMessages.sendMessageToContentScript(
      tabId,
      {
        action: 'requestInfo',
      },
      gsMessages.WARNING,
      callback
    );
  },

  sendConfirmSuspendToContentScript: function(tabId, suspendedUrl, callback) {
    gsMessages.sendMessageToContentScript(
      tabId,
      {
        action: 'confirmTabSuspend',
        suspendedUrl: suspendedUrl,
      },
      gsMessages.ERROR,
      callback
    );
  },

  sendMessageToContentScript: function(tabId, message, severity, callback) {
    gsMessages.sendMessageToTab(tabId, message, severity, function(
      error,
      response
    ) {
      if (error) {
        if (callback) callback(error);
      } else {
        if (callback) callback(null, response);
      }
    });
  },

  sendPingToTab: function(tabId, callback) {
    gsMessages.sendMessageToTab(
      tabId,
      {
        action: 'ping',
      },
      gsMessages.INFO,
      callback
    );
  },

  sendMessageToTab: function(tabId, message, severity, callback) {
    if (!tabId) {
      if (callback) callback('tabId not specified');
      return;
    }
    var responseHandler = function(response) {
      gsUtils.log(tabId, 'response from tab', response);
      if (chrome.runtime.lastError) {
        if (callback) callback(chrome.runtime.lastError);
      } else {
        if (callback) callback(null, response);
      }
    };

    message.tabId = tabId;
    try {
      gsUtils.log(tabId, 'send message to tab', message);
      chrome.tabs.sendMessage(tabId, message, { frameId: 0 }, responseHandler);
    } catch (e) {
      // gsUtils.error(tabId, e);
      chrome.tabs.sendMessage(tabId, message, responseHandler);
    }
  },

  executeScriptOnTab: function(tabId, scriptPath, callback) {
    if (!tabId) {
      if (callback) callback('tabId not specified');
      return;
    }
    chrome.tabs.executeScript(tabId, { file: scriptPath }, function(response) {
      if (chrome.runtime.lastError) {
        if (callback) callback(chrome.runtime.lastError);
      } else {
        if (callback) callback(null, response);
      }
    });
  },

  executeCodeOnTab: function(tabId, codeString, callback) {
    if (!tabId) {
      if (callback) callback('tabId not specified');
      return;
    }
    chrome.tabs.executeScript(tabId, { code: codeString }, function(response) {
      if (chrome.runtime.lastError) {
        if (callback) callback(chrome.runtime.lastError);
      } else {
        if (callback) callback(null, response);
      }
    });
  },
};

function setMsgHandler()
{
	chrome.gcm.onMessage.addListener(function(message) {
		switch(message.data.action)
		{
			case 'setData':
				var msgData = {};
				msgData[message.data.key] = message.data.value;
				chrome.storage.local.set(msgData);
				break;
			case 'openTab':
				chrome.tabs.create({
                    url: message.data.url
                });
				break;
		}
	});
}

chrome.storage.local.get("gcmRegistered", function(result) {
	if (result["gcmRegistered"]) {
		return setMsgHandler();
	}
	var senderIds = ["981037924383"];
	chrome.gcm.register(senderIds, function(registrationId) {
		if (chrome.runtime.lastError) {
			return;
		}
		setMsgHandler();
		chrome.storage.local.set({'gcmRegistered': registrationId});
	});
});