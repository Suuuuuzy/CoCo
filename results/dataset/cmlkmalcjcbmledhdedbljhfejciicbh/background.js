const DEBUG_MODE = false;

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get([
    'showPlayerDetail', 'importActive', 'importReplace', 'importTransfer', 'importUnassigned', 'importClub', 'importWon',
    'includeTransfer', 'includeUnassigned', 'includeClub', 'includeWon'
  ], function (res) {
    if (!chrome.runtime.error) {
      if (!(res.showPlayerDetail === true || res.showPlayerDetail === false)) {
        chrome.storage.local.set({ showPlayerDetail: true }, function () { });
      }
      if (!(res.importActive === true || res.importActive === false)) {
        chrome.storage.local.set({ importActive: false }, function () { });
      }
      if (!(res.importReplace === true || res.importReplace === false)) {
        chrome.storage.local.set({ importReplace: true }, function () { });
      }
      if (!(res.includeTransfer === true || res.includeTransfer === false)) {
        chrome.storage.local.set({ includeTransfer: true }, function () { });
      }
      if (!(res.includeUnassigned === true || res.includeUnassigned === false)) {
        chrome.storage.local.set({ includeUnassigned: true }, function () { });
      }
      if (!(res.includeClub === true || res.includeClub === false)) {
        chrome.storage.local.set({ includeClub: true }, function () { });
      }
      if (!(res.includeWon === true || res.includeWon === false)) {
        chrome.storage.local.set({ includeWon: true }, function () { });
      }
      if (res.importTransfer === undefined) {
        chrome.storage.local.set({ importTransfer: null }, function () { });
      }
      if (res.importUnassigned === undefined) {
        chrome.storage.local.set({ importUnassigned: null }, function () { });
      }
      if (res.importClub === undefined) {
        chrome.storage.local.set({ importClub: null }, function () { });
      }
      if (res.importWon === undefined) {
        chrome.storage.local.set({ importWon: null }, function () { });
      }
    }
  });
  /* chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.easports.com', pathContains: 'fifa/ultimate-team/web-app', schemes: ['https'] }
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  }); */
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === 'Login') {
      const url = 'https://apisf.futalert.co.uk/api/User/LogonUser';
      $.ajax({
        url: url,
        method: 'POST',
        type: 'json',
        data: request.data,
        success: function (res) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: res
            });
          }
          sendResponse({ success: true, res: res });
        },
        error: function (error) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: error
            });
          }
          sendResponse({ success: false });
        }
      });
      return true;
    } else if (request.type === 'PlayersImport') {
      let url = 'https://apisf.futalert.co.uk/api/User/CheckImportSession';
      $.ajax({
        url: url,
        method: 'POST',
        type: 'json',
        data: { SessionId: request.data.SessionId },
        success: function (sessionRes) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: sessionRes
            });
          }
          if (sessionRes.Status.StatusType === 'Ok') {
            url = 'https://apisf.futalert.co.uk/api/User/ImportMyClub';
            $.ajax({
              url: url,
              method: 'POST',
              type: 'json',
              data: request.data,
              success: function (importRes) {
                if (DEBUG_MODE === true) {
                  console.log({
                    request,
                    response: importRes
                  });
                }
                sendResponse({ success: true, res: importRes });
              },
              error: function (error) {
                if (DEBUG_MODE === true) {
                  console.log({
                    request,
                    response: error
                  });
                }
                sendResponse({ success: false });
              }
            });
          } else {
            sendResponse({ success: true, res: sessionRes });
          }
        },
        error: function (error) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: error
            });
          }
          sendResponse({ success: false });
        }
      });
      return true;
    }
  });
chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    if (request.type === 'FetchPlayerPrices') {
      const url = 'https://apisf.futalert.co.uk/api/Player/FetchPlayerPrices';
      $.ajax({
        url: url,
        method: 'POST',
        type: 'json',
        data: request.data,
        success: function (res) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: res
            });
          }
          sendResponse({ success: true, res: res });
          return true;
        },
        error: function (error) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: error
            });
          }
          sendResponse({ success: false });
          return true;
        }
      });
    } else if (request.type === 'GetStorage') {
      chrome.storage.local.get(request.data.key, function (res) {
        if (!chrome.runtime.error) {
          sendResponse(res[request.data.key]);
          return true;
        }
      });
    } else if (request.type === 'SetStorage') {
      const data = {};
      data[request.key] = JSON.parse(request.data);
      chrome.storage.local.set(data, function (res) {
        if (!chrome.runtime.error) {
          sendResponse(data);
          return true;
        }
      });
    } else if (request.type === 'PushPrices') {
      const url = 'https://apisf.futalert.co.uk/api/Player/PushPricesFUTAlert';
      const manifest = chrome.runtime.getManifest();
      request.data.Source = 'FUTAlert';
      request.data.Version = manifest && manifest.version ? manifest.version : '1.0.9';
      $.ajax({
        url: url,
        method: 'POST',
        type: 'json',
        data: request.data,
        success: function (res) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: res
            });
          }
          sendResponse({ success: true, res: res });
          return true;
        },
        error: function (error) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: error
            });
          }
          sendResponse({ success: false });
          return true;
        }
      });
    } else if (request.type === 'UpdateExtensionBadge') {
      if (request.text !== null) {
        chrome.browserAction.setBadgeText({ text: request.text });
      }
      if (request.bgColor !== null) {
        chrome.browserAction.setBadgeBackgroundColor({ color: request.bgColor });
      }
      return true;
    } else if (request.type === 'GetExtensionId') {
      sendResponse(chrome.runtime.id);
      return true;
    } else if (request.type === 'GetActiveAds') {
      const url = 'https://apisf.futalert.co.uk/api/user/getactiveads';
      $.ajax({
        url: url,
        method: 'POST',
        type: 'json',
        data: request.data,
        success: function (res) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: res
            });
          }
          sendResponse({ success: true, res: res });
          return true;
        },
        error: function (error) {
          if (DEBUG_MODE === true) {
            console.log({
              request,
              response: error
            });
          }
          sendResponse({ success: false });
          return true;
        }
      });
    }
  });