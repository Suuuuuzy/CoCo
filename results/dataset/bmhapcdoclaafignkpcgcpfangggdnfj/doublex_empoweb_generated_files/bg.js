// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsUtils.js

/*global chrome, localStorage, gsStorage, gsChrome, gsMessages, gsSession, gsTabSuspendManager, gsTabDiscardManager, gsSuspendedTab, gsFavicon, tgs */
'use strict';

var debugInfo = false;
var debugError = false;

var gsUtils = {
  STATUS_NORMAL: 'normal',
  STATUS_LOADING: 'loading',
  STATUS_SPECIAL: 'special',
  STATUS_BLOCKED_FILE: 'blockedFile',
  STATUS_SUSPENDED: 'suspended',
  STATUS_DISCARDED: 'discarded',
  STATUS_NEVER: 'never',
  STATUS_FORMINPUT: 'formInput',
  STATUS_AUDIBLE: 'audible',
  STATUS_ACTIVE: 'active',
  STATUS_TEMPWHITELIST: 'tempWhitelist',
  STATUS_PINNED: 'pinned',
  STATUS_WHITELISTED: 'whitelisted',
  STATUS_CHARGING: 'charging',
  STATUS_NOCONNECTIVITY: 'noConnectivity',
  STATUS_UNKNOWN: 'unknown',

  // eslint-disable-line no-unused-vars
  contains: function(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) return true;
    }
    return false;
  },

  dir: function(object) {
    if (debugInfo) {
      console.dir(object);
    }
  },
  log: function(id, text, ...args) {
    if (debugInfo) {
      args = args || [];
      console.log(id, (new Date() + '').split(' ')[4], text, ...args);
    }
  },
  warning: function(id, text, ...args) {
    if (debugError) {
      args = args || [];
      const ignores = ['Error', 'gsUtils', 'gsMessages'];
      const errorLine = gsUtils
        .getStackTrace()
        .split('\n')
        .filter(o => !ignores.find(p => o.indexOf(p) >= 0))
        .join('\n');
      args.push(`\n${errorLine}`);
      console.log(
        'WARNING:',
        id,
        (new Date() + '').split(' ')[4],
        text,
        ...args
      );
    }
  },
  errorIfInitialised: function(id, errorObj, ...args) {
    args = args || [];
    if (gsSession.isInitialising()) {
      gsUtils.warning(id, errorObj, args);
    } else {
      gsUtils.error(id, errorObj, args);
    }
  },
  error: function(id, errorObj, ...args) {
    if (errorObj === undefined) {
      errorObj = id;
      id = '?';
    }
    //NOTE: errorObj may be just a string :/
    if (debugError) {
      const stackTrace = errorObj.hasOwnProperty('stack')
        ? errorObj.stack
        : gsUtils.getStackTrace();
      const errorMessage = errorObj.hasOwnProperty('message')
        ? errorObj.message
        : typeof errorObj === 'string'
          ? errorObj
          : JSON.stringify(errorObj, null, 2);
      errorObj = errorObj || {};
      console.log(id, (new Date() + '').split(' ')[4], 'Error:');
      console.error(
        gsUtils.getPrintableError(errorMessage, stackTrace, ...args)
      );
    } else {
      // const logString = errorObj.hasOwnProperty('stack')
      //   ? errorObj.stack
      //   : `${JSON.stringify(errorObj)}\n${gsUtils.getStackTrace()}`;
      // gsAnalytics.reportException(logString, false);
    }
  },
  // Puts all the error args into a single printable string so that all the info
  // is displayed in chrome://extensions error console
  getPrintableError(errorMessage, stackTrace, ...args) {
    let errorString = errorMessage;
    errorString += `\n${args.map(o => JSON.stringify(o, null, 2)).join('\n')}`;
    errorString += `\n${stackTrace}`;
    return errorString;
  },
  getStackTrace: function() {
    var obj = {};
    Error.captureStackTrace(obj, gsUtils.getStackTrace);
    return obj.stack;
  },

  isDebugInfo: function() {
    return debugInfo;
  },

  isDebugError: function() {
    return debugError;
  },

  setDebugInfo: function(value) {
    debugInfo = value;
  },

  setDebugError: function(value) {
    debugError = value;
  },

  isDiscardedTab: function(tab) {
    return tab.discarded;
  },

  //tests for non-standard web pages. does not check for suspended pages!
  isSpecialTab: function(tab) {
    var url = tab.url;

    if (gsUtils.isSuspendedUrl(url, true)) {
      return false;
    }
    // Careful, suspended urls start with "chrome-extension://"
    if (
      url.indexOf('about') === 0 ||
      url.indexOf('chrome') === 0 ||
      url.indexOf('chrome.google.com/webstore') >= 0 ||
      gsUtils.isBlockedFileTab(tab)
    ) {
      return true;
    }
    return false;
  },

  isFileTab: function(tab) {
    if (tab.url.indexOf('file') === 0) {
      return true;
    }
    return false;
  },

  //tests if the page is a file:// page AND the user has not enabled access to
  //file URLs in extension settings
  isBlockedFileTab: function(tab) {
    if (gsUtils.isFileTab(tab) && !gsSession.isFileUrlsAccessAllowed()) {
      return true;
    }
    return false;
  },

  //does not include suspended pages!
  isInternalTab: function(tab) {
    var isLocalExtensionPage =
      tab.url.indexOf('chrome-extension://' + chrome.runtime.id) === 0;
    return isLocalExtensionPage && !gsUtils.isSuspendedUrl(tab.url);
  },

  isProtectedPinnedTab: function(tab) {
    var dontSuspendPinned = gsStorage.getOption(gsStorage.IGNORE_PINNED);
    return dontSuspendPinned && tab.pinned;
  },

  isProtectedAudibleTab: function(tab) {
    var dontSuspendAudible = gsStorage.getOption(gsStorage.IGNORE_AUDIO);
    return dontSuspendAudible && tab.audible;
  },

  isProtectedActiveTab: function(tab) {
    var dontSuspendActiveTabs = gsStorage.getOption(
      gsStorage.IGNORE_ACTIVE_TABS
    );
    return (
      tgs.isCurrentFocusedTab(tab) || (dontSuspendActiveTabs && tab.active)
    );
  },

  // Note: Normal tabs may be in a discarded state
  isNormalTab: function(tab) {
    return !gsUtils.isSpecialTab(tab) && !gsUtils.isSuspendedTab(tab, true);
  },

  isSuspendedTab: function(tab, looseMatching) {
    return gsUtils.isSuspendedUrl(tab.url, looseMatching);
  },

  isSuspendedUrl: function(url, looseMatching) {
    if (looseMatching) {
      return url.indexOf('suspended.html') > 0;
    } else {
      return url.indexOf(chrome.extension.getURL('suspended.html')) === 0;
    }
  },

  shouldSuspendDiscardedTabs: function() {
    var suspendInPlaceOfDiscard = gsStorage.getOption(
      gsStorage.SUSPEND_IN_PLACE_OF_DISCARD
    );
    var discardInPlaceOfSuspend = gsStorage.getOption(
      gsStorage.DISCARD_IN_PLACE_OF_SUSPEND
    );
    return suspendInPlaceOfDiscard && !discardInPlaceOfSuspend;
  },

  removeTabsByUrlAsPromised: function(url) {
    return new Promise(resolve => {
      chrome.tabs.query({ url }, function(tabs) {
        chrome.tabs.remove(
          tabs.map(function(tab) {
            return tab.id;
          })
        );
        resolve();
      });
    });
  },

  createTabAndWaitForFinishLoading: function(url, maxWaitTimeInMs) {
    return new Promise(async resolve => {
      let tab = await gsChrome.tabsCreate(url);
      maxWaitTimeInMs = maxWaitTimeInMs || 1000;
      const retryUntil = Date.now() + maxWaitTimeInMs;
      let loaded = false;
      while (!loaded && Date.now() < retryUntil) {
        tab = await gsChrome.tabsGet(tab.id);
        loaded = tab.status === 'complete';
        if (!loaded) {
          await gsUtils.setTimeout(200);
        }
      }
      resolve(tab);
    });
  },

  createWindowAndWaitForFinishLoading: function(createData, maxWaitTimeInMs) {
    return new Promise(async resolve => {
      let window = await gsChrome.windowsCreate(createData);
      maxWaitTimeInMs = maxWaitTimeInMs || 1000;
      const retryUntil = Date.now() + maxWaitTimeInMs;
      let loaded = false;
      while (!loaded && Date.now() < retryUntil) {
        window = await gsChrome.windowsGet(window.id);
        loaded = window.tabs.length > 0 && window.tabs[0].status === 'complete';
        if (!loaded) {
          await gsUtils.setTimeout(200);
        }
      }
      resolve(window);
    });
  },

  checkWhiteList: function(url) {
    return gsUtils.checkSpecificWhiteList(
      url,
      gsStorage.getOption(gsStorage.WHITELIST)
    );
  },

  checkSpecificWhiteList: function(url, whitelistString) {
    var whitelistItems = whitelistString
        ? whitelistString.split(/[\s\n]+/)
        : [],
      whitelisted;

    whitelisted = whitelistItems.some(function(item) {
      return gsUtils.testForMatch(item, url);
    }, this);
    return whitelisted;
  },

  removeFromWhitelist: function(url) {
    var oldWhitelistString = gsStorage.getOption(gsStorage.WHITELIST) || '',
      whitelistItems = oldWhitelistString.split(/[\s\n]+/).sort(),
      i;

    for (i = whitelistItems.length - 1; i >= 0; i--) {
      if (gsUtils.testForMatch(whitelistItems[i], url)) {
        whitelistItems.splice(i, 1);
      }
    }
    var whitelistString = whitelistItems.join('\n');
    gsStorage.setOptionAndSync(gsStorage.WHITELIST, whitelistString);

    var key = gsStorage.WHITELIST;
    gsUtils.performPostSaveUpdates(
      [key],
      { [key]: oldWhitelistString },
      { [key]: whitelistString }
    );
  },

  testForMatch: function(whitelistItem, word) {
    if (whitelistItem.length < 1) {
      return false;

      //test for regex ( must be of the form /foobar/ )
    } else if (
      whitelistItem.length > 2 &&
      whitelistItem.indexOf('/') === 0 &&
      whitelistItem.indexOf('/', whitelistItem.length - 1) !== -1
    ) {
      whitelistItem = whitelistItem.substring(1, whitelistItem.length - 1);
      try {
        new RegExp(whitelistItem); // eslint-disable-line no-new
      } catch (e) {
        return false;
      }
      return new RegExp(whitelistItem).test(word);

      // test as substring
    } else {
      return word.indexOf(whitelistItem) >= 0;
    }
  },

  saveToWhitelist: function(newString) {
    var oldWhitelistString = gsStorage.getOption(gsStorage.WHITELIST) || '';
    var newWhitelistString = oldWhitelistString + '\n' + newString;
    newWhitelistString = gsUtils.cleanupWhitelist(newWhitelistString);
    gsStorage.setOptionAndSync(gsStorage.WHITELIST, newWhitelistString);

    var key = gsStorage.WHITELIST;
    gsUtils.performPostSaveUpdates(
      [key],
      { [key]: oldWhitelistString },
      { [key]: newWhitelistString }
    );
  },

  cleanupWhitelist: function(whitelist) {
    var whitelistItems = whitelist ? whitelist.split(/[\s\n]+/).sort() : '',
      i,
      j;

    for (i = whitelistItems.length - 1; i >= 0; i--) {
      j = whitelistItems.lastIndexOf(whitelistItems[i]);
      if (j !== i) {
        whitelistItems.splice(i + 1, j - i);
      }
      if (!whitelistItems[i] || whitelistItems[i] === '') {
        whitelistItems.splice(i, 1);
      }
    }
    if (whitelistItems.length) {
      return whitelistItems.join('\n');
    } else {
      return whitelistItems;
    }
  },

  documentReadyAsPromsied: function(doc) {
    return new Promise(function(resolve) {
      if (doc.readyState !== 'loading') {
        resolve();
      } else {
        doc.addEventListener('DOMContentLoaded', function() {
          resolve();
        });
      }
    });
  },

  localiseHtml: function(parentEl) {
    var replaceTagFunc = function(match, p1) {
      return p1 ? chrome.i18n.getMessage(p1) : '';
    };
    for (let el of parentEl.getElementsByTagName('*')) {
      if (el.hasAttribute('data-i18n')) {
        el.innerHTML = el
          .getAttribute('data-i18n')
          .replace(/__MSG_(\w+)__/g, replaceTagFunc)
          .replace(/\n/g, '<br />');
      }
      if (el.hasAttribute('data-i18n-tooltip')) {
        el.setAttribute(
          'data-i18n-tooltip',
          el
            .getAttribute('data-i18n-tooltip')
            .replace(/__MSG_(\w+)__/g, replaceTagFunc)
        );
      }
    }
  },

  documentReadyAndLocalisedAsPromsied: async function(doc) {
    await gsUtils.documentReadyAsPromsied(doc);
    gsUtils.localiseHtml(doc);
    if (doc.body && doc.body.hidden) {
      doc.body.hidden = false;
    }
  },

  generateSuspendedUrl: function(url, title, scrollPos) {
    let encodedTitle = gsUtils.encodeString(title);
    var args =
      '#' +
      'ttl=' +
      encodedTitle +
      '&' +
      'pos=' +
      (scrollPos || '0') +
      '&' +
      'uri=' +
      url;

    return chrome.extension.getURL('suspended.html' + args);
  },

  getRootUrl: function(url, includePath, includeScheme) {
    let rootUrlStr = url;
    let scheme;

    // temporarily remove scheme
    if (rootUrlStr.indexOf('//') > 0) {
      scheme = rootUrlStr.substring(0, rootUrlStr.indexOf('//') + 2);
      rootUrlStr = rootUrlStr.substring(rootUrlStr.indexOf('//') + 2);
    }

    // remove path
    if (!includePath) {
      if (scheme === 'file://') {
        rootUrlStr = rootUrlStr.replace(new RegExp('/[^/]*$', 'g'), '');
      } else {
        const pathStartIndex =
          rootUrlStr.indexOf('/') > 0
            ? rootUrlStr.indexOf('/')
            : rootUrlStr.length;
        rootUrlStr = rootUrlStr.substring(0, pathStartIndex);
      }
    } else {
      // remove query string
      var match = rootUrlStr.match(/\/?[?#]+/);
      if (match) {
        rootUrlStr = rootUrlStr.substring(0, match.index);
      }
      // remove trailing slash
      match = rootUrlStr.match(/\/$/);
      if (match) {
        rootUrlStr = rootUrlStr.substring(0, match.index);
      }
    }

    // readd scheme
    if (scheme && includeScheme) {
      rootUrlStr = scheme + rootUrlStr;
    }
    return rootUrlStr;
  },

  getHashVariable: function(key, urlStr) {
    var valuesByKey = {},
      keyPairRegEx = /^(.+)=(.+)/,
      hashStr;

    if (!urlStr || urlStr.length === 0 || urlStr.indexOf('#') === -1) {
      return false;
    }

    //extract hash component from url
    hashStr = urlStr.replace(/^[^#]+#+(.*)/, '$1');

    if (hashStr.length === 0) {
      return false;
    }

    //handle possible unencoded final var called 'uri'
    let uriIndex = hashStr.indexOf('uri=');
    if (uriIndex >= 0) {
      valuesByKey.uri = hashStr.substr(uriIndex + 4);
      hashStr = hashStr.substr(0, uriIndex);
    }

    hashStr.split('&').forEach(function(keyPair) {
      if (keyPair && keyPair.match(keyPairRegEx)) {
        valuesByKey[keyPair.replace(keyPairRegEx, '$1')] = keyPair.replace(
          keyPairRegEx,
          '$2'
        );
      }
    });
    return valuesByKey[key] || false;
  },
  getSuspendedTitle: function(urlStr) {
    return gsUtils.decodeString(gsUtils.getHashVariable('ttl', urlStr) || '');
  },
  getSuspendedScrollPosition: function(urlStr) {
    return gsUtils.decodeString(gsUtils.getHashVariable('pos', urlStr) || '');
  },
  getOriginalUrl: function(urlStr) {
    return (
      gsUtils.getHashVariable('uri', urlStr) ||
      gsUtils.decodeString(gsUtils.getHashVariable('url', urlStr) || '')
    );
  },
  getCleanTabTitle(tab) {
    let cleanedTitle = gsUtils.decodeString(tab.title);
    if (
      !cleanedTitle ||
      cleanedTitle === '' ||
      cleanedTitle === gsUtils.decodeString(tab.url) ||
      cleanedTitle === 'Suspended Tab'
    ) {
      if (gsUtils.isSuspendedTab(tab)) {
        cleanedTitle =
          gsUtils.getSuspendedTitle(tab.url) || gsUtils.getOriginalUrl(tab.url);
      } else {
        cleanedTitle = tab.url;
      }
    }
    return cleanedTitle;
  },
  decodeString(string) {
    try {
      return decodeURIComponent(string);
    } catch (e) {
      return string;
    }
  },
  encodeString(string) {
    try {
      return encodeURIComponent(string);
    } catch (e) {
      return string;
    }
  },

  getSuspendedTabCount: async function() {
    const currentTabs = await gsChrome.tabsQuery();
    const currentSuspendedTabs = currentTabs.filter(tab =>
      gsUtils.isSuspendedTab(tab)
    );
    return currentSuspendedTabs.length;
  },

  htmlEncode: function(text) {
    return document
      .createElement('pre')
      .appendChild(document.createTextNode(text)).parentNode.innerHTML;
  },

  getChromeVersion: function() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  },

  generateHashCode: function(text) {
    var hash = 0,
      i,
      chr,
      len;
    if (!text) return hash;
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  },

  getAllExpiredTabs: function(callback) {
    var expiredTabs = [];
    chrome.tabs.query({}, tabs => {
      for (const tab of tabs) {
        const timerDetails = tgs.getTabStatePropForTabId(
          tab.id,
          tgs.STATE_TIMER_DETAILS
        );
        if (
          timerDetails &&
          timerDetails.suspendDateTime &&
          new Date(timerDetails.suspendDateTime) < new Date()
        ) {
          expiredTabs.push(tab);
        }
      }
      callback(expiredTabs);
    });
  },

  performPostSaveUpdates: function(
    changedSettingKeys,
    oldValueBySettingKey,
    newValueBySettingKey
  ) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (gsUtils.isSpecialTab(tab)) {
          return;
        }

        if (gsUtils.isSuspendedTab(tab)) {
          //If toggling IGNORE_PINNED or IGNORE_ACTIVE_TABS to TRUE, then unsuspend any suspended pinned/active tabs
          if (
            (changedSettingKeys.includes(gsStorage.IGNORE_PINNED) &&
              gsUtils.isProtectedPinnedTab(tab)) ||
            (changedSettingKeys.includes(gsStorage.IGNORE_ACTIVE_TABS) &&
              gsUtils.isProtectedActiveTab(tab))
          ) {
            tgs.unsuspendTab(tab);
            return;
          }

          //if theme or screenshot preferences have changed then refresh suspended tabs
          const updateTheme = changedSettingKeys.includes(gsStorage.THEME);
          const updatePreviewMode = changedSettingKeys.includes(
            gsStorage.SCREEN_CAPTURE
          );
          if (updateTheme || updatePreviewMode) {
            const suspendedView = tgs.getInternalViewByTabId(tab.id);
            if (suspendedView) {
              if (updateTheme) {
                const theme = gsStorage.getOption(gsStorage.THEME);
                gsFavicon.getFaviconMetaData(tab).then(faviconMeta => {
                  const isLowContrastFavicon = faviconMeta.isDark || false;
                  gsSuspendedTab.updateTheme(
                    suspendedView,
                    tab,
                    theme,
                    isLowContrastFavicon
                  );
                });
              }
              if (updatePreviewMode) {
                const previewMode = gsStorage.getOption(
                  gsStorage.SCREEN_CAPTURE
                );
                gsSuspendedTab.updatePreviewMode(
                  suspendedView,
                  tab,
                  previewMode
                ); // async. unhandled promise.
              }
            }
          }

          //if discardAfterSuspend has changed then updated discarded tabs
          const updateDiscardAfterSuspend = changedSettingKeys.includes(
            gsStorage.DISCARD_AFTER_SUSPEND
          );
          if (
            updateDiscardAfterSuspend &&
            gsStorage.getOption(gsStorage.DISCARD_AFTER_SUSPEND) &&
            gsUtils.isSuspendedTab(tab) &&
            !gsUtils.isDiscardedTab(tab)
          ) {
            gsTabDiscardManager.queueTabForDiscard(tab);
          }
          return;
        }

        if (!gsUtils.isNormalTab(tab)) {
          return;
        }

        //update content scripts of normal tabs
        const updateIgnoreForms = changedSettingKeys.includes(
          gsStorage.IGNORE_FORMS
        );
        if (updateIgnoreForms) {
          gsMessages.sendUpdateToContentScriptOfTab(tab); //async. unhandled error
        }

        //update suspend timers
        const updateSuspendTime =
          changedSettingKeys.includes(gsStorage.SUSPEND_TIME) ||
          (changedSettingKeys.includes(gsStorage.IGNORE_ACTIVE_TABS) &&
            tab.active) ||
          (changedSettingKeys.includes(gsStorage.IGNORE_PINNED) &&
            !gsStorage.getOption(gsStorage.IGNORE_PINNED) &&
            tab.pinned) ||
          (changedSettingKeys.includes(gsStorage.IGNORE_AUDIO) &&
            !gsStorage.getOption(gsStorage.IGNORE_AUDIO) &&
            tab.audible) ||
          (changedSettingKeys.includes(gsStorage.IGNORE_WHEN_OFFLINE) &&
            !gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE) &&
            !navigator.onLine) ||
          (changedSettingKeys.includes(gsStorage.IGNORE_WHEN_CHARGING) &&
            !gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING) &&
            tgs.isCharging()) ||
          (changedSettingKeys.includes(gsStorage.WHITELIST) &&
            (gsUtils.checkSpecificWhiteList(
              tab.url,
              oldValueBySettingKey[gsStorage.WHITELIST]
            ) &&
              !gsUtils.checkSpecificWhiteList(
                tab.url,
                newValueBySettingKey[gsStorage.WHITELIST]
              )));
        if (updateSuspendTime) {
          tgs.resetAutoSuspendTimerForTab(tab);
        }

        //if SuspendInPlaceOfDiscard has changed then updated discarded tabs
        const updateSuspendInPlaceOfDiscard = changedSettingKeys.includes(
          gsStorage.SUSPEND_IN_PLACE_OF_DISCARD
        );
        if (updateSuspendInPlaceOfDiscard && gsUtils.isDiscardedTab(tab)) {
          gsTabDiscardManager.handleDiscardedUnsuspendedTab(tab); //async. unhandled promise.
          //note: this may cause the tab to suspend
        }

        //if we aren't resetting the timer on this tab, then check to make sure it does not have an expired timer
        //should always be caught by tests above, but we'll check all tabs anyway just in case
        // if (!updateSuspendTime) {
        //     gsMessages.sendRequestInfoToContentScript(tab.id, function (err, tabInfo) { // unhandled error
        //         tgs.calculateTabStatus(tab, tabInfo, function (tabStatus) {
        //             if (tabStatus === STATUS_NORMAL && tabInfo && tabInfo.timerUp && (new Date(tabInfo.timerUp)) < new Date()) {
        //                 gsUtils.error(tab.id, 'Tab has an expired timer!', tabInfo);
        //                 gsMessages.sendUpdateToContentScriptOfTab(tab, true, false); // async. unhandled error
        //             }
        //         });
        //     });
        // }
      });
    });

    //if context menu has been disabled then remove from chrome
    if (gsUtils.contains(changedSettingKeys, gsStorage.ADD_CONTEXT)) {
      var addContextMenu = gsStorage.getOption(gsStorage.ADD_CONTEXT);
      tgs.buildContextMenu(addContextMenu);
    }

    //if screenshot preferences have changed then update the queue parameters
    if (
      gsUtils.contains(changedSettingKeys, gsStorage.SCREEN_CAPTURE) ||
      gsUtils.contains(changedSettingKeys, gsStorage.SCREEN_CAPTURE_FORCE)
    ) {
      gsTabSuspendManager.initAsPromised(); //async. unhandled promise
    }
  },

  getWindowFromSession: function(windowId, session) {
    var window = false;
    session.windows.some(function(curWindow) {
      //leave this as a loose matching as sometimes it is comparing strings. other times ints
      if (curWindow.id == windowId) {
        // eslint-disable-line eqeqeq
        window = curWindow;
        return true;
      }
    });
    return window;
  },

  removeInternalUrlsFromSession: function(session) {
    if (!session || !session.windows) {
      return;
    }
    for (var i = session.windows.length - 1; i >= 0; i--) {
      var curWindow = session.windows[i];
      for (var j = curWindow.tabs.length - 1; j >= 0; j--) {
        var curTab = curWindow.tabs[j];
        if (gsUtils.isInternalTab(curTab)) {
          curWindow.tabs.splice(j, 1);
        }
      }
      if (curWindow.tabs.length === 0) {
        session.windows.splice(i, 1);
      }
    }
  },

  getSimpleDate: function(date) {
    var d = new Date(date);
    return (
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear() +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2)
    );
  },

  getHumanDate: function(date) {
    var monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      d = new Date(date),
      currentDate = d.getDate(),
      currentMonth = d.getMonth(),
      currentYear = d.getFullYear(),
      currentHours = d.getHours(),
      currentMinutes = d.getMinutes();

    // var suffix;
    // if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
    //     suffix = 'st';
    // } else if (currentDate === 2 || currentDate === 22) {
    //     suffix = 'nd';
    // } else if (currentDate === 3 || currentDate === 23) {
    //     suffix = 'rd';
    // } else {
    //     suffix = 'th';
    // }

    var ampm = currentHours >= 12 ? 'pm' : 'am';
    var hoursString = currentHours % 12 || 12;
    var minutesString = ('0' + currentMinutes).slice(-2);

    return (
      currentDate +
      ' ' +
      monthNames[currentMonth] +
      ' ' +
      currentYear +
      ' ' +
      hoursString +
      ':' +
      minutesString +
      ampm
    );
  },

  debounce: function(func, wait) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  setTimeout: async function(timeout) {
    return new Promise(resolve => {
      window.setTimeout(resolve, timeout);
    });
  },

  executeWithRetries: async function(
    promiseFn,
    fnArgsArray,
    maxRetries,
    retryWaitTime
  ) {
    const retryFn = async retries => {
      try {
        return await promiseFn(...fnArgsArray);
      } catch (e) {
        if (retries >= maxRetries) {
          gsUtils.warning('gsUtils', 'Max retries exceeded');
          return Promise.reject(e);
        }
        retries += 1;
        await gsUtils.setTimeout(retryWaitTime);
        return await retryFn(retries);
      }
    };
    const result = await retryFn(0);
    return result;
  },
};

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsChrome.js

/*global chrome, gsUtils */
'use strict';
// eslint-disable-next-line no-unused-vars
var gsChrome = {
  cookiesGetAll: function() {
    return new Promise(resolve => {
      chrome.cookies.getAll({}, cookies => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeCookies', chrome.runtime.lastError);
          cookies = [];
        }
        resolve(cookies);
      });
    });
  },
  cookiesRemove: function(url, name) {
    return new Promise(resolve => {
      if (!url || !name) {
        gsUtils.warning('chromeCookies', 'url or name not specified');
        resolve(null);
        return;
      }
      chrome.cookies.remove({ url, name }, details => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeCookies', chrome.runtime.lastError);
          details = null;
        }
        resolve(details);
      });
    });
  },

  tabsCreate: function(details) {
    return new Promise(resolve => {
      if (
        !details ||
        (typeof details !== 'string' && typeof details.url !== 'string')
      ) {
        gsUtils.warning('chromeTabs', 'url not specified');
        resolve(null);
        return;
      }
      details = typeof details === 'string' ? { url: details } : details;
      chrome.tabs.create(details, tab => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsReload: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        gsUtils.warning('chromeTabs', 'tabId not specified');
        resolve(false);
        return;
      }
      chrome.tabs.reload(tabId, () => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  },
  tabsUpdate: function(tabId, updateProperties) {
    return new Promise(resolve => {
      if (!tabId || !updateProperties) {
        gsUtils.warning(
          'chromeTabs',
          'tabId or updateProperties not specified'
        );
        resolve(null);
        return;
      }
      chrome.tabs.update(tabId, updateProperties, tab => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsGet: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        gsUtils.warning('chromeTabs', 'tabId not specified');
        resolve(null);
        return;
      }
      chrome.tabs.get(tabId, tab => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsQuery: function(queryInfo) {
    queryInfo = queryInfo || {};
    return new Promise(resolve => {
      chrome.tabs.query(queryInfo, tabs => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
          tabs = [];
        }
        resolve(tabs);
      });
    });
  },
  tabsRemove: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        gsUtils.warning('chromeTabs', 'tabId not specified');
        resolve(null);
        return;
      }
      chrome.tabs.remove(tabId, () => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeTabs', chrome.runtime.lastError);
        }
        resolve();
      });
    });
  },

  windowsGetLastFocused: function() {
    return new Promise(resolve => {
      chrome.windows.getLastFocused({}, window => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeWindows', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsGet: function(windowId) {
    return new Promise(resolve => {
      if (!windowId) {
        gsUtils.warning('chromeWindows', 'windowId not specified');
        resolve(null);
        return;
      }
      chrome.windows.get(windowId, { populate: true }, window => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeWindows', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsGetAll: function() {
    return new Promise(resolve => {
      chrome.windows.getAll({ populate: true }, windows => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeWindows', chrome.runtime.lastError);
          windows = [];
        }
        resolve(windows);
      });
    });
  },
  windowsCreate: function(createData) {
    createData = createData || {};
    return new Promise(resolve => {
      chrome.windows.create(createData, window => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeWindows', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsUpdate: function(windowId, updateInfo) {
    return new Promise(resolve => {
      if (!windowId || !updateInfo) {
        gsUtils.warning('chromeTabs', 'windowId or updateInfo not specified');
        resolve(null);
        return;
      }
      chrome.windows.update(windowId, updateInfo, window => {
        if (chrome.runtime.lastError) {
          gsUtils.warning('chromeWindows', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
};

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsAnalytics.js

/*global ga, gsStorage, gsSession, gsUtils */
// eslint-disable-next-line no-unused-vars
var gsAnalytics = (function() {
  'use strict';

  const DIMENSION_VERSION = 'dimension1';
  const DIMENSION_SCREEN_CAPTURE = 'dimension2';
  const DIMENSION_SUSPEND_TIME = 'dimension3';
  const DIMENSION_DONATED = 'dimension4';
  const DIMENSION_DISCARD_AFTER_SUSPEND = 'dimension5';

  const METRIC_SUSPENDED_TAB_COUNT = 'metric1';
  const METRIC_TOTAL_TAB_COUNT = 'metric2';
  const METRIC_TAB_CHECK_TIME_TAKEN = 'metric3';
  const METRIC_TAB_RECOVER_TIME_TAKEN = 'metric4';

  function initAsPromised() {
    return new Promise(function(resolve) {
      try {
        ga('create', 'UA-142762170-1', 'auto');
        ga('set', 'checkProtocolTask', function() {});
        ga('require', 'displayfeatures');
      } catch (e) {
        gsUtils.warning('gsAnalytics', e);
      }
      gsUtils.log('gsAnalytics', 'init successful');
      resolve();
    });
  }

  function setUserDimensions() {
    const dimensions = {
      [DIMENSION_VERSION]: chrome.runtime.getManifest().version + '',
      [DIMENSION_SCREEN_CAPTURE]:
        gsStorage.getOption(gsStorage.SCREEN_CAPTURE) + '',
      [DIMENSION_SUSPEND_TIME]:
        gsStorage.getOption(gsStorage.SUSPEND_TIME) + '',
      [DIMENSION_DONATED]: gsStorage.getOption(gsStorage.NO_NAG) + '',
      [DIMENSION_DISCARD_AFTER_SUSPEND]:
        gsStorage.getOption(gsStorage.DISCARD_AFTER_SUSPEND) + '',
    };
    gsUtils.log('gsAnalytics', 'Setting dimensions', dimensions);
    ga('set', dimensions);
  }

  function performStartupReport() {
    const category = 'System';
    const action = gsSession.getStartupType();

    const metrics = {};
    const sessionMetrics = gsStorage.fetchSessionMetrics();
    if (sessionMetrics && sessionMetrics[gsStorage.SM_TIMESTAMP]) {
      metrics[METRIC_SUSPENDED_TAB_COUNT] =
        sessionMetrics[gsStorage.SM_SUSPENDED_TAB_COUNT];
      metrics[METRIC_TOTAL_TAB_COUNT] =
        sessionMetrics[gsStorage.SM_TOTAL_TAB_COUNT];
    }
    const tabCheckTimeTaken = gsSession.getTabCheckTimeTakenInSeconds();
    if (!isNaN(tabCheckTimeTaken) && parseInt(tabCheckTimeTaken) >= 0) {
      metrics[METRIC_TAB_CHECK_TIME_TAKEN] = tabCheckTimeTaken;
    }
    const recoveryTimeTaken = gsSession.getRecoveryTimeTakenInSeconds();
    if (!isNaN(recoveryTimeTaken) && parseInt(recoveryTimeTaken) >= 0) {
      metrics[METRIC_TAB_RECOVER_TIME_TAKEN] = recoveryTimeTaken;
    }
    gsUtils.log('gsAnalytics', 'Event: ', category, action, metrics);
    ga('send', 'event', category, action, metrics);
  }

  function performVersionReport() {
    const startupType = gsSession.getStartupType();
    if (!['Install', 'Update'].includes(startupType)) {
      return;
    }

    const category = 'Version';
    const action = startupType + 'Details';
    const startupLastVersion = gsSession.getStartupLastVersion();
    const curVersion = chrome.runtime.getManifest().version;
    const label =
      startupLastVersion !== curVersion
        ? `${startupLastVersion} -> ${curVersion}`
        : curVersion;

    gsUtils.log('gsAnalytics', 'Event: ', category, action, label);
    ga('send', 'event', category, action, label);
  }

  function performPingReport() {
    const category = 'System';
    const action = 'Ping';

    const metrics = {};
    const sessionMetrics = gsStorage.fetchSessionMetrics();
    if (sessionMetrics && sessionMetrics[gsStorage.SM_TIMESTAMP]) {
      metrics[METRIC_SUSPENDED_TAB_COUNT] =
        sessionMetrics[gsStorage.SM_SUSPENDED_TAB_COUNT];
      metrics[METRIC_TOTAL_TAB_COUNT] =
        sessionMetrics[gsStorage.SM_TOTAL_TAB_COUNT];
    }
    gsUtils.log('gsAnalytics', 'Event: ', category, action, metrics);
    ga('send', 'event', category, action, metrics);
  }

  function reportPageView(pageName) {
    ga('send', 'pageview', pageName);
  }
  function reportEvent(category, action, label) {
    ga('send', 'event', category, action, label);
  }
  function reportException(errorMessage) {
    ga('send', 'exception', {
      exDescription: errorMessage,
      exFatal: false,
    });
  }

  return {
    initAsPromised,
    performStartupReport,
    performVersionReport,
    performPingReport,
    setUserDimensions,
    reportPageView,
    reportEvent,
    reportException,
  };
})();

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  'script',
  'https://www.google-analytics.com/analytics.js',
  'ga'
);

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsStorage.js

/*global chrome, gsAnalytics, gsSession, localStorage, gsUtils */
'use strict';

var gsStorage = {
  SCREEN_CAPTURE: 'screenCapture',
  SCREEN_CAPTURE_FORCE: 'screenCaptureForce',
  SUSPEND_IN_PLACE_OF_DISCARD: 'suspendInPlaceOfDiscard',
  UNSUSPEND_ON_FOCUS: 'gsUnsuspendOnFocus',
  SUSPEND_TIME: 'gsTimeToSuspend',
  IGNORE_WHEN_OFFLINE: 'onlineCheck',
  IGNORE_WHEN_CHARGING: 'batteryCheck',
  IGNORE_PINNED: 'gsDontSuspendPinned',
  IGNORE_FORMS: 'gsDontSuspendForms',
  IGNORE_AUDIO: 'gsDontSuspendAudio',
  IGNORE_ACTIVE_TABS: 'gsDontSuspendActiveTabs',
  IGNORE_CACHE: 'gsIgnoreCache',
  ADD_CONTEXT: 'gsAddContextMenu',
  SYNC_SETTINGS: 'gsSyncSettings',
  NO_NAG: 'gsNoNag',
  THEME: 'gsTheme',
  WHITELIST: 'gsWhitelist',

  DISCARD_AFTER_SUSPEND: 'discardAfterSuspend',
  DISCARD_IN_PLACE_OF_SUSPEND: 'discardInPlaceOfSuspend',
  USE_ALT_SCREEN_CAPTURE_LIB: 'useAlternateScreenCaptureLib',
  DISABLE_TAB_CHECKS: 'disableTabChecks',

  APP_VERSION: 'gsVersion',
  LAST_NOTICE: 'gsNotice',
  LAST_EXTENSION_RECOVERY: 'gsExtensionRecovery',

  SM_SESSION_METRICS: 'gsSessionMetrics',
  SM_TIMESTAMP: 'sessionTimestamp',
  SM_SUSPENDED_TAB_COUNT: 'suspendedTabCount',
  SM_TOTAL_TAB_COUNT: 'totalTabCount',

  noop: function() {},

  getSettingsDefaults: function() {
    const defaults = {};
    defaults[gsStorage.SCREEN_CAPTURE] = '0';
    defaults[gsStorage.SCREEN_CAPTURE_FORCE] = false;
    defaults[gsStorage.SUSPEND_IN_PLACE_OF_DISCARD] = false;
    defaults[gsStorage.DISCARD_IN_PLACE_OF_SUSPEND] = false;
    defaults[gsStorage.USE_ALT_SCREEN_CAPTURE_LIB] = false;
    defaults[gsStorage.DISABLE_TAB_CHECKS] = false;
    defaults[gsStorage.DISCARD_AFTER_SUSPEND] = false;
    defaults[gsStorage.IGNORE_WHEN_OFFLINE] = false;
    defaults[gsStorage.IGNORE_WHEN_CHARGING] = false;
    defaults[gsStorage.UNSUSPEND_ON_FOCUS] = false;
    defaults[gsStorage.IGNORE_PINNED] = true;
    defaults[gsStorage.IGNORE_FORMS] = true;
    defaults[gsStorage.IGNORE_AUDIO] = true;
    defaults[gsStorage.IGNORE_ACTIVE_TABS] = true;
    defaults[gsStorage.IGNORE_CACHE] = false;
    defaults[gsStorage.ADD_CONTEXT] = true;
    defaults[gsStorage.SYNC_SETTINGS] = true;
    defaults[gsStorage.SUSPEND_TIME] = '60';
    defaults[gsStorage.NO_NAG] = false;
    defaults[gsStorage.WHITELIST] = '';
    defaults[gsStorage.THEME] = 'light';

    return defaults;
  },

  /**
   * LOCAL STORAGE FUNCTIONS
   */

  //populate localstorage settings with sync settings where undefined
  initSettingsAsPromised: function() {
    return new Promise(function(resolve) {
      var defaultSettings = gsStorage.getSettingsDefaults();
      var defaultKeys = Object.keys(defaultSettings);
      chrome.storage.sync.get(defaultKeys, function(syncedSettings) {
        gsUtils.log('gsStorage', 'syncedSettings on init: ', syncedSettings);
        gsSession.setSynchedSettingsOnInit(syncedSettings);

        var rawLocalSettings;
        try {
          rawLocalSettings = JSON.parse(localStorage.getItem('gsSettings'));
        } catch (e) {
          gsUtils.error(
            'gsStorage',
            'Failed to parse gsSettings: ',
            localStorage.getItem('gsSettings')
          );
        }
        if (!rawLocalSettings) {
          rawLocalSettings = {};
        } else {
          //if we have some rawLocalSettings but SYNC_SETTINGS is not defined
          //then define it as FALSE (as opposed to default of TRUE)
          rawLocalSettings[gsStorage.SYNC_SETTINGS] =
            rawLocalSettings[gsStorage.SYNC_SETTINGS] || false;
        }
        gsUtils.log('gsStorage', 'localSettings on init: ', rawLocalSettings);
        var shouldSyncSettings = rawLocalSettings[gsStorage.SYNC_SETTINGS];

        var mergedSettings = {};
        for (const key of defaultKeys) {
          if (key === gsStorage.SYNC_SETTINGS) {
            if (chrome.extension.inIncognitoContext) {
              mergedSettings[key] = false;
            } else {
              mergedSettings[key] = rawLocalSettings.hasOwnProperty(key)
                ? rawLocalSettings[key]
                : defaultSettings[key];
            }
            continue;
          }
          // If donations are disabled locally, then ensure we disable them on synced profile
          if (
            key === gsStorage.NO_NAG &&
            shouldSyncSettings &&
            rawLocalSettings.hasOwnProperty(gsStorage.NO_NAG) &&
            rawLocalSettings[gsStorage.NO_NAG]
          ) {
            mergedSettings[gsStorage.NO_NAG] = true;
            continue;
          }
          // if synced setting exists and local setting does not exist or
          // syncing is enabled locally then overwrite with synced value
          if (
            syncedSettings.hasOwnProperty(key) &&
            (!rawLocalSettings.hasOwnProperty(key) || shouldSyncSettings)
          ) {
            mergedSettings[key] = syncedSettings[key];
          }
          //fallback on rawLocalSettings
          if (!mergedSettings.hasOwnProperty(key)) {
            mergedSettings[key] = rawLocalSettings[key];
          }
          //fallback on defaultSettings
          if (
            typeof mergedSettings[key] === 'undefined' ||
            mergedSettings[key] === null
          ) {
            gsUtils.errorIfInitialised(
              'gsStorage',
              'Missing key: ' + key + '! Will init with default.'
            );
            mergedSettings[key] = defaultSettings[key];
          }
        }
        gsStorage.saveSettings(mergedSettings);
        gsUtils.log('gsStorage', 'mergedSettings: ', mergedSettings);

        // if any of the new settings are different to those in sync, then trigger a resync
        var triggerResync = false;
        for (const key of defaultKeys) {
          if (
            key !== gsStorage.SYNC_SETTINGS &&
            syncedSettings[key] !== mergedSettings[key]
          ) {
            triggerResync = true;
          }
        }
        if (triggerResync) {
          gsStorage.syncSettings();
        }
        gsStorage.addSettingsSyncListener();
        gsUtils.log('gsStorage', 'init successful');
        resolve();
      });
    });
  },

  // Listen for changes to synced settings
  addSettingsSyncListener: function() {
    chrome.storage.onChanged.addListener(function(remoteSettings, namespace) {
      if (namespace !== 'sync' || !remoteSettings) {
        return;
      }
      var shouldSync = gsStorage.getOption(gsStorage.SYNC_SETTINGS);
      if (shouldSync) {
        var localSettings = gsStorage.getSettings();
        var changedSettingKeys = [];
        var oldValueBySettingKey = {};
        var newValueBySettingKey = {};
        Object.keys(remoteSettings).forEach(function(key) {
          var remoteSetting = remoteSettings[key];

          // If donations are disabled locally, then ensure we disable them on synced profile
          if (key === gsStorage.NO_NAG) {
            if (remoteSetting.newValue === false) {
              return false; // don't process this key
            }
          }

          if (localSettings[key] !== remoteSetting.newValue) {
            gsUtils.log(
              'gsStorage',
              'Changed value from sync',
              key,
              remoteSetting.newValue
            );
            changedSettingKeys.push(key);
            oldValueBySettingKey[key] = localSettings[key];
            newValueBySettingKey[key] = remoteSetting.newValue;
            localSettings[key] = remoteSetting.newValue;
          }
        });

        if (changedSettingKeys.length > 0) {
          gsStorage.saveSettings(localSettings);
          gsUtils.performPostSaveUpdates(
            changedSettingKeys,
            oldValueBySettingKey,
            newValueBySettingKey
          );
        }
      }
    });
  },

  //due to migration issues and new settings being added, i have built in some redundancy
  //here so that getOption will always return a valid value.
  getOption: function(prop) {
    var settings = gsStorage.getSettings();
    if (typeof settings[prop] === 'undefined' || settings[prop] === null) {
      settings[prop] = gsStorage.getSettingsDefaults()[prop];
      gsStorage.saveSettings(settings);
    }
    return settings[prop];
  },

  setOption: function(prop, value) {
    var settings = gsStorage.getSettings();
    settings[prop] = value;
    // gsUtils.log('gsStorage', 'gsStorage', 'setting prop: ' + prop + ' to value ' + value);
    gsStorage.saveSettings(settings);
  },

  // Important to note that setOption (and ultimately saveSettings) uses localStorage whereas
  // syncSettings saves to chrome.storage.
  // Calling syncSettings has the unfortunate side-effect of triggering the chrome.storage.onChanged
  // listener which the re-saves the setting to localStorage a second time.
  setOptionAndSync: function(prop, value) {
    gsStorage.setOption(prop, value);
    gsStorage.syncSettings();
  },

  getSettings: function() {
    var settings;
    try {
      settings = JSON.parse(localStorage.getItem('gsSettings'));
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'Failed to parse gsSettings: ',
        localStorage.getItem('gsSettings')
      );
    }
    if (!settings) {
      settings = gsStorage.getSettingsDefaults();
      gsStorage.saveSettings(settings);
    }
    return settings;
  },

  saveSettings: function(settings) {
    try {
      localStorage.setItem('gsSettings', JSON.stringify(settings));
      gsAnalytics.setUserDimensions();
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'failed to save gsSettings to local storage',
        e
      );
    }
  },

  // Push settings to sync
  syncSettings: function() {
    var settings = gsStorage.getSettings();
    if (settings[gsStorage.SYNC_SETTINGS]) {
      // Since sync is a local setting, delete it to simplify things.
      delete settings[gsStorage.SYNC_SETTINGS];
      gsUtils.log(
        'gsStorage',
        'gsStorage',
        'Pushing local settings to sync',
        settings
      );
      chrome.storage.sync.set(settings, () => {
        if (chrome.runtime.lastError) {
          gsUtils.error(
            'gsStorage',
            'failed to save to chrome.storage.sync: ',
            chrome.runtime.lastError
          );
        }
      });
    }
  },

  fetchLastVersion: function() {
    var version;
    try {
      version = JSON.parse(localStorage.getItem(gsStorage.APP_VERSION));
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'Failed to parse ' + gsStorage.APP_VERSION + ': ',
        localStorage.getItem(gsStorage.APP_VERSION)
      );
    }
    version = version || '0.0.0';
    return version + '';
  },
  setLastVersion: function(newVersion) {
    try {
      localStorage.setItem(gsStorage.APP_VERSION, JSON.stringify(newVersion));
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'failed to save ' + gsStorage.APP_VERSION + ' to local storage',
        e
      );
    }
  },

  fetchNoticeVersion: function() {
    var lastNoticeVersion;
    try {
      lastNoticeVersion = JSON.parse(
        localStorage.getItem(gsStorage.LAST_NOTICE)
      );
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'Failed to parse ' + gsStorage.LAST_NOTICE + ': ',
        localStorage.getItem(gsStorage.LAST_NOTICE)
      );
    }
    lastNoticeVersion = lastNoticeVersion || '0';
    return lastNoticeVersion + '';
  },
  setNoticeVersion: function(newVersion) {
    try {
      localStorage.setItem(gsStorage.LAST_NOTICE, JSON.stringify(newVersion));
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'failed to save ' + gsStorage.LAST_NOTICE + ' to local storage',
        e
      );
    }
  },

  fetchLastExtensionRecoveryTimestamp: function() {
    var lastExtensionRecoveryTimestamp;
    try {
      lastExtensionRecoveryTimestamp = JSON.parse(
        localStorage.getItem(gsStorage.LAST_EXTENSION_RECOVERY)
      );
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'Failed to parse ' + gsStorage.LAST_EXTENSION_RECOVERY + ': ',
        localStorage.getItem(gsStorage.LAST_EXTENSION_RECOVERY)
      );
    }
    return lastExtensionRecoveryTimestamp;
  },
  setLastExtensionRecoveryTimestamp: function(extensionRecoveryTimestamp) {
    try {
      localStorage.setItem(
        gsStorage.LAST_EXTENSION_RECOVERY,
        JSON.stringify(extensionRecoveryTimestamp)
      );
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'failed to save ' +
          gsStorage.LAST_EXTENSION_RECOVERY +
          ' to local storage',
        e
      );
    }
  },

  fetchSessionMetrics: function() {
    var sessionMetrics = {};
    try {
      sessionMetrics = JSON.parse(
        localStorage.getItem(gsStorage.SM_SESSION_METRICS)
      );
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'Failed to parse ' + gsStorage.SM_SESSION_METRICS + ': ',
        localStorage.getItem(gsStorage.SM_SESSION_METRICS)
      );
    }
    return sessionMetrics;
  },
  setSessionMetrics: function(sessionMetrics) {
    try {
      localStorage.setItem(
        gsStorage.SM_SESSION_METRICS,
        JSON.stringify(sessionMetrics)
      );
    } catch (e) {
      gsUtils.error(
        'gsStorage',
        'failed to save ' + gsStorage.SM_SESSION_METRICS + ' to local storage',
        e
      );
    }
  },
};

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/db.js

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.db = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    'use strict';

    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    (function (local) {
      'use strict';

      var IDBKeyRange = local.IDBKeyRange || local.webkitIDBKeyRange;
      var transactionModes = {
        readonly: 'readonly',
        readwrite: 'readwrite'
      };
      var hasOwn = Object.prototype.hasOwnProperty;
      var defaultMapper = function defaultMapper(x) {
        return x;
      };

      var indexedDB = local.indexedDB || local.webkitIndexedDB || local.mozIndexedDB || local.oIndexedDB || local.msIndexedDB || local.shimIndexedDB || function () {
        throw new Error('IndexedDB required');
      }();

      var dbCache = {};
      var serverEvents = ['abort', 'error', 'versionchange'];

      function isObject(item) {
        return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
      }

      function mongoDBToKeyRangeArgs(opts) {
        var keys = Object.keys(opts).sort();
        if (keys.length === 1) {
          var key = keys[0];
          var val = opts[key];
          var name = void 0,
            inclusive = void 0;
          switch (key) {
            case 'eq':
              name = 'only';break;
            case 'gt':
              name = 'lowerBound';
              inclusive = true;
              break;
            case 'lt':
              name = 'upperBound';
              inclusive = true;
              break;
            case 'gte':
              name = 'lowerBound';break;
            case 'lte':
              name = 'upperBound';break;
            default:
              throw new TypeError('`' + key + '` is not a valid key');
          }
          return [name, [val, inclusive]];
        }
        var x = opts[keys[0]];
        var y = opts[keys[1]];
        var pattern = keys.join('-');

        switch (pattern) {
          case 'gt-lt':case 'gt-lte':case 'gte-lt':case 'gte-lte':
          return ['bound', [x, y, keys[0] === 'gt', keys[1] === 'lt']];
          default:
            throw new TypeError('`' + pattern + '` are conflicted keys');
        }
      }
      function mongoifyKey(key) {
        if (key && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && !(key instanceof IDBKeyRange)) {
          var _mongoDBToKeyRangeArg = mongoDBToKeyRangeArgs(key);

          var _mongoDBToKeyRangeArg2 = _slicedToArray(_mongoDBToKeyRangeArg, 2);

          var type = _mongoDBToKeyRangeArg2[0];
          var args = _mongoDBToKeyRangeArg2[1];

          return IDBKeyRange[type].apply(IDBKeyRange, _toConsumableArray(args));
        }
        return key;
      }

      var IndexQuery = function IndexQuery(table, db, indexName, preexistingError) {
        var _this = this;

        var modifyObj = null;

        var runQuery = function runQuery(type, args, cursorType, direction, limitRange, filters, mapper) {
          return new Promise(function (resolve, reject) {
            var keyRange = void 0;
            try {
              keyRange = type ? IDBKeyRange[type].apply(IDBKeyRange, _toConsumableArray(args)) : null;
            } catch (e) {
              reject(e);
              return;
            }
            filters = filters || [];
            limitRange = limitRange || null;

            var results = [];
            var counter = 0;
            var indexArgs = [keyRange];

            var transaction = db.transaction(table, modifyObj ? transactionModes.readwrite : transactionModes.readonly);
            transaction.onerror = function (e) {
              return reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };
            transaction.oncomplete = function () {
              return resolve(results);
            };

            var store = transaction.objectStore(table); // if bad, db.transaction will reject first
            var index = typeof indexName === 'string' ? store.index(indexName) : store;

            if (cursorType !== 'count') {
              indexArgs.push(direction || 'next');
            }

            // Create a function that will set in the modifyObj properties into
            // the passed record.
            var modifyKeys = modifyObj ? Object.keys(modifyObj) : [];

            var modifyRecord = function modifyRecord(record) {
              modifyKeys.forEach(function (key) {
                var val = modifyObj[key];
                if (typeof val === 'function') {
                  val = val(record);
                }
                record[key] = val;
              });
              return record;
            };

            index[cursorType].apply(index, indexArgs).onsuccess = function (e) {
              // indexArgs are already validated
              var cursor = e.target.result;
              if (typeof cursor === 'number') {
                results = cursor;
              } else if (cursor) {
                if (limitRange !== null && limitRange[0] > counter) {
                  counter = limitRange[0];
                  cursor.advance(limitRange[0]); // Will throw on 0, but condition above prevents since counter always 0+
                } else if (limitRange !== null && counter >= limitRange[0] + limitRange[1]) {
                  // Out of limit range... skip
                } else {
                  var _ret = function () {
                    var matchFilter = true;
                    var result = 'value' in cursor ? cursor.value : cursor.key;

                    try {
                      filters.forEach(function (filter) {
                        if (typeof filter[0] === 'function') {
                          matchFilter = matchFilter && filter[0](result);
                        } else {
                          matchFilter = matchFilter && result[filter[0]] === filter[1];
                        }
                      });
                    } catch (err) {
                      // Could be filter on non-object or error in filter function
                      reject(err);
                      return {
                        v: void 0
                      };
                    }

                    if (matchFilter) {
                      counter++;
                      // If we're doing a modify, run it now
                      if (modifyObj) {
                        try {
                          result = modifyRecord(result);
                          cursor.update(result); // `result` should only be a "structured clone"-able object
                        } catch (err) {
                          reject(err);
                          return {
                            v: void 0
                          };
                        }
                      }
                      try {
                        results.push(mapper(result));
                      } catch (err) {
                        reject(err);
                        return {
                          v: void 0
                        };
                      }
                    }
                    cursor.continue();
                  }();

                  if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
              }
            };
          });
        };

        var Query = function Query(type, args, queuedError) {
          var filters = [];
          var direction = 'next';
          var cursorType = 'openCursor';
          var limitRange = null;
          var mapper = defaultMapper;
          var unique = false;
          var error = preexistingError || queuedError;

          var execute = function execute() {
            if (error) {
              return Promise.reject(error);
            }
            return runQuery(type, args, cursorType, unique ? direction + 'unique' : direction, limitRange, filters, mapper);
          };

          var count = function count() {
            direction = null;
            cursorType = 'count';

            return {
              execute: execute
            };
          };

          var keys = function keys() {
            cursorType = 'openKeyCursor';

            return {
              desc: desc,
              distinct: distinct,
              execute: execute,
              filter: filter,
              limit: limit,
              map: map
            };
          };

          var limit = function limit(start, end) {
            limitRange = !end ? [0, start] : [start, end];
            error = limitRange.some(function (val) {
              return typeof val !== 'number';
            }) ? new Error('limit() arguments must be numeric') : error;

            return {
              desc: desc,
              distinct: distinct,
              filter: filter,
              keys: keys,
              execute: execute,
              map: map,
              modify: modify
            };
          };

          var filter = function filter(prop, val) {
            filters.push([prop, val]);

            return {
              desc: desc,
              distinct: distinct,
              execute: execute,
              filter: filter,
              keys: keys,
              limit: limit,
              map: map,
              modify: modify
            };
          };

          var desc = function desc() {
            direction = 'prev';

            return {
              distinct: distinct,
              execute: execute,
              filter: filter,
              keys: keys,
              limit: limit,
              map: map,
              modify: modify
            };
          };

          var distinct = function distinct() {
            unique = true;
            return {
              count: count,
              desc: desc,
              execute: execute,
              filter: filter,
              keys: keys,
              limit: limit,
              map: map,
              modify: modify
            };
          };

          var modify = function modify(update) {
            modifyObj = update && (typeof update === 'undefined' ? 'undefined' : _typeof(update)) === 'object' ? update : null;
            return {
              execute: execute
            };
          };

          var map = function map(fn) {
            mapper = fn;

            return {
              count: count,
              desc: desc,
              distinct: distinct,
              execute: execute,
              filter: filter,
              keys: keys,
              limit: limit,
              modify: modify
            };
          };

          return {
            count: count,
            desc: desc,
            distinct: distinct,
            execute: execute,
            filter: filter,
            keys: keys,
            limit: limit,
            map: map,
            modify: modify
          };
        };

        ['only', 'bound', 'upperBound', 'lowerBound'].forEach(function (name) {
          _this[name] = function () {
            return Query(name, arguments);
          };
        });

        this.range = function (opts) {
          var error = void 0;
          var keyRange = [null, null];
          try {
            keyRange = mongoDBToKeyRangeArgs(opts);
          } catch (e) {
            error = e;
          }
          return Query.apply(undefined, _toConsumableArray(keyRange).concat([error]));
        };

        this.filter = function () {
          var query = Query(null, null);
          return query.filter.apply(query, arguments);
        };

        this.all = function () {
          return this.filter();
        };
      };

      var Server = function Server(db, name, version, noServerMethods) {
        var _this2 = this;

        var closed = false;

        this.getIndexedDB = function () {
          return db;
        };
        this.isClosed = function () {
          return closed;
        };

        this.query = function (table, index) {
          var error = closed ? new Error('Database has been closed') : null;
          return new IndexQuery(table, db, index, error); // Does not throw by itself
        };

        this.add = function (table) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }

            var records = args.reduce(function (records, aip) {
              return records.concat(aip);
            }, []);

            var transaction = db.transaction(table, transactionModes.readwrite);
            transaction.onerror = function (e) {
              // prevent throwing a ConstraintError and aborting (hard)
              // https://bugzilla.mozilla.org/show_bug.cgi?id=872873
              e.preventDefault();
              reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };
            transaction.oncomplete = function () {
              return resolve(records);
            };

            var store = transaction.objectStore(table);
            records.some(function (record) {
              var req = void 0,
                key = void 0;
              if (isObject(record) && hasOwn.call(record, 'item')) {
                key = record.key;
                record = record.item;
                if (key != null) {
                  try {
                    key = mongoifyKey(key);
                  } catch (e) {
                    reject(e);
                    return true;
                  }
                }
              }

              try {
                // Safe to add since in readwrite
                if (key != null) {
                  req = store.add(record, key);
                } else {
                  req = store.add(record);
                }
              } catch (e) {
                reject(e);
                return true;
              }

              req.onsuccess = function (e) {
                if (!isObject(record)) {
                  return;
                }
                var target = e.target;
                var keyPath = target.source.keyPath;
                if (keyPath === null) {
                  keyPath = '__id__';
                }
                if (hasOwn.call(record, keyPath)) {
                  return;
                }
                Object.defineProperty(record, keyPath, {
                  value: target.result,
                  enumerable: true
                });
              };
            });
          });
        };

        this.update = function (table) {
          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }

            var records = args.reduce(function (records, aip) {
              return records.concat(aip);
            }, []);

            var transaction = db.transaction(table, transactionModes.readwrite);
            transaction.onerror = function (e) {
              // prevent throwing aborting (hard)
              // https://bugzilla.mozilla.org/show_bug.cgi?id=872873
              e.preventDefault();
              reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };
            transaction.oncomplete = function () {
              return resolve(records);
            };

            var store = transaction.objectStore(table);

            records.some(function (record) {
              var req = void 0,
                key = void 0;
              if (isObject(record) && hasOwn.call(record, 'item')) {
                key = record.key;
                record = record.item;
                if (key != null) {
                  try {
                    key = mongoifyKey(key);
                  } catch (e) {
                    reject(e);
                    return true;
                  }
                }
              }
              try {
                // These can throw DataError, e.g., if function passed in
                if (key != null) {
                  req = store.put(record, key);
                } else {
                  req = store.put(record);
                }
              } catch (err) {
                reject(err);
                return true;
              }

              req.onsuccess = function (e) {
                if (!isObject(record)) {
                  return;
                }
                var target = e.target;
                var keyPath = target.source.keyPath;
                if (keyPath === null) {
                  keyPath = '__id__';
                }
                if (hasOwn.call(record, keyPath)) {
                  return;
                }
                Object.defineProperty(record, keyPath, {
                  value: target.result,
                  enumerable: true
                });
              };
            });
          });
        };

        this.put = function () {
          return this.update.apply(this, arguments);
        };

        this.remove = function (table, key) {
          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }
            try {
              key = mongoifyKey(key);
            } catch (e) {
              reject(e);
              return;
            }

            var transaction = db.transaction(table, transactionModes.readwrite);
            transaction.onerror = function (e) {
              // prevent throwing and aborting (hard)
              // https://bugzilla.mozilla.org/show_bug.cgi?id=872873
              e.preventDefault();
              reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };
            transaction.oncomplete = function () {
              return resolve(key);
            };

            var store = transaction.objectStore(table);
            try {
              store.delete(key);
            } catch (err) {
              reject(err);
            }
          });
        };

        this.delete = function () {
          return this.remove.apply(this, arguments);
        };

        this.clear = function (table) {
          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }
            var transaction = db.transaction(table, transactionModes.readwrite);
            transaction.onerror = function (e) {
              return reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };
            transaction.oncomplete = function () {
              return resolve();
            };

            var store = transaction.objectStore(table);
            store.clear();
          });
        };

        this.close = function () {
          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }
            db.close();
            closed = true;
            delete dbCache[name][version];
            resolve();
          });
        };

        this.get = function (table, key) {
          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }
            try {
              key = mongoifyKey(key);
            } catch (e) {
              reject(e);
              return;
            }

            var transaction = db.transaction(table);
            transaction.onerror = function (e) {
              // prevent throwing and aborting (hard)
              // https://bugzilla.mozilla.org/show_bug.cgi?id=872873
              e.preventDefault();
              reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };

            var store = transaction.objectStore(table);

            var req = void 0;
            try {
              req = store.get(key);
            } catch (err) {
              reject(err);
            }
            req.onsuccess = function (e) {
              return resolve(e.target.result);
            };
          });
        };

        this.count = function (table, key) {
          return new Promise(function (resolve, reject) {
            if (closed) {
              reject(new Error('Database has been closed'));
              return;
            }
            try {
              key = mongoifyKey(key);
            } catch (e) {
              reject(e);
              return;
            }

            var transaction = db.transaction(table);
            transaction.onerror = function (e) {
              // prevent throwing and aborting (hard)
              // https://bugzilla.mozilla.org/show_bug.cgi?id=872873
              e.preventDefault();
              reject(e);
            };
            transaction.onabort = function (e) {
              return reject(e);
            };

            var store = transaction.objectStore(table);
            var req = void 0;
            try {
              req = key == null ? store.count() : store.count(key);
            } catch (err) {
              reject(err);
            }
            req.onsuccess = function (e) {
              return resolve(e.target.result);
            };
          });
        };

        this.addEventListener = function (eventName, handler) {
          if (!serverEvents.includes(eventName)) {
            throw new Error('Unrecognized event type ' + eventName);
          }
          if (eventName === 'error') {
            db.addEventListener(eventName, function (e) {
              e.preventDefault(); // Needed by Firefox to prevent hard abort with ConstraintError
              handler(e);
            });
            return;
          }
          db.addEventListener(eventName, handler);
        };

        this.removeEventListener = function (eventName, handler) {
          if (!serverEvents.includes(eventName)) {
            throw new Error('Unrecognized event type ' + eventName);
          }
          db.removeEventListener(eventName, handler);
        };

        serverEvents.forEach(function (evName) {
          this[evName] = function (handler) {
            this.addEventListener(evName, handler);
            return this;
          };
        }, this);

        if (noServerMethods) {
          return;
        }

        var err = void 0;
        [].some.call(db.objectStoreNames, function (storeName) {
          if (_this2[storeName]) {
            err = new Error('The store name, "' + storeName + '", which you have attempted to load, conflicts with db.js method names."');
            _this2.close();
            return true;
          }
          _this2[storeName] = {};
          var keys = Object.keys(_this2);
          keys.filter(function (key) {
            return ![].concat(serverEvents, ['close', 'addEventListener', 'removeEventListener']).includes(key);
          }).map(function (key) {
            return _this2[storeName][key] = function () {
              for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }

              return _this2[key].apply(_this2, [storeName].concat(args));
            };
          });
        });
        return err;
      };

      var createSchema = function createSchema(e, request, schema, db, server, version) {
        if (!schema || schema.length === 0) {
          return;
        }

        for (var i = 0; i < db.objectStoreNames.length; i++) {
          var name = db.objectStoreNames[i];
          if (!hasOwn.call(schema, name)) {
            // Errors for which we are not concerned and why:
            // `InvalidStateError` - We are in the upgrade transaction.
            // `TransactionInactiveError` (as by the upgrade having already
            //      completed or somehow aborting) - since we've just started and
            //      should be without risk in this loop
            // `NotFoundError` - since we are iterating the dynamically updated
            //      `objectStoreNames`
            db.deleteObjectStore(name);
          }
        }

        var ret = void 0;
        Object.keys(schema).some(function (tableName) {
          var table = schema[tableName];
          var store = void 0;
          if (db.objectStoreNames.contains(tableName)) {
            store = request.transaction.objectStore(tableName); // Shouldn't throw
          } else {
            // Errors for which we are not concerned and why:
            // `InvalidStateError` - We are in the upgrade transaction.
            // `ConstraintError` - We are just starting (and probably never too large anyways) for a key generator.
            // `ConstraintError` - The above condition should prevent the name already existing.
            //
            // Possible errors:
            // `TransactionInactiveError` - if the upgrade had already aborted,
            //      e.g., from a previous `QuotaExceededError` which is supposed to nevertheless return
            //      the store but then abort the transaction.
            // `SyntaxError` - if an invalid `table.key.keyPath` is supplied.
            // `InvalidAccessError` - if `table.key.autoIncrement` is `true` and `table.key.keyPath` is an
            //      empty string or any sequence (empty or otherwise).
            try {
              store = db.createObjectStore(tableName, table.key);
            } catch (err) {
              ret = err;
              return true;
            }
          }

          Object.keys(table.indexes || {}).some(function (indexKey) {
            try {
              store.index(indexKey);
            } catch (err) {
              var index = table.indexes[indexKey];
              index = index && (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' ? index : {};
              // Errors for which we are not concerned and why:
              // `InvalidStateError` - We are in the upgrade transaction and store found above should not have already been deleted.
              // `ConstraintError` - We have already tried getting the index, so it shouldn't already exist
              //
              // Possible errors:
              // `TransactionInactiveError` - if the upgrade had already aborted,
              //      e.g., from a previous `QuotaExceededError` which is supposed to nevertheless return
              //      the index object but then abort the transaction.
              // `SyntaxError` - If the `keyPath` (second argument) is an invalid key path
              // `InvalidAccessError` - If `multiEntry` on `index` is `true` and
              //                          `keyPath` (second argument) is a sequence
              try {
                store.createIndex(indexKey, index.keyPath || index.key || indexKey, index);
              } catch (err2) {
                ret = err2;
                return true;
              }
            }
          });
        });
        return ret;
      };

      var _open = function _open(e, server, version, noServerMethods) {
        var db = e.target.result;
        dbCache[server][version] = db;

        var s = new Server(db, server, version, noServerMethods);
        return s instanceof Error ? Promise.reject(s) : Promise.resolve(s);
      };

      var db = {
        version: '0.15.0',
        open: function open(options) {
          var server = options.server;
          var version = options.version || 1;
          var schema = options.schema;
          var noServerMethods = options.noServerMethods;

          if (!dbCache[server]) {
            dbCache[server] = {};
          }
          return new Promise(function (resolve, reject) {
            if (dbCache[server][version]) {
              _open({
                target: {
                  result: dbCache[server][version]
                }
              }, server, version, noServerMethods).then(resolve, reject);
            } else {
              var _ret2 = function () {
                if (typeof schema === 'function') {
                  try {
                    schema = schema();
                  } catch (e) {
                    reject(e);
                    return {
                      v: void 0
                    };
                  }
                }
                var request = indexedDB.open(server, version);

                request.onsuccess = function (e) {
                  return _open(e, server, version, noServerMethods).then(resolve, reject);
                };
                request.onerror = function (e) {
                  // Prevent default for `BadVersion` and `AbortError` errors, etc.
                  // These are not necessarily reported in console in Chrome but present; see
                  //  https://bugzilla.mozilla.org/show_bug.cgi?id=872873
                  //  http://stackoverflow.com/questions/36225779/aborterror-within-indexeddb-upgradeneeded-event/36266502
                  e.preventDefault();
                  reject(e);
                };
                request.onupgradeneeded = function (e) {
                  var err = createSchema(e, request, schema, e.target.result, server, version);
                  if (err) {
                    reject(err);
                  }
                };
                request.onblocked = function (e) {
                  var resume = new Promise(function (res, rej) {
                    // We overwrite handlers rather than make a new
                    //   open() since the original request is still
                    //   open and its onsuccess will still fire if
                    //   the user unblocks by closing the blocking
                    //   connection
                    request.onsuccess = function (ev) {
                      _open(ev, server, version, noServerMethods).then(res, rej);
                    };
                    request.onerror = function (e) {
                      return rej(e);
                    };
                  });
                  e.resume = resume;
                  reject(e);
                };
              }();

              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
          });
        },

        delete: function _delete(dbName) {
          return new Promise(function (resolve, reject) {
            var request = indexedDB.deleteDatabase(dbName); // Does not throw

            request.onsuccess = function (e) {
              return resolve(e);
            };
            request.onerror = function (e) {
              return reject(e);
            }; // No errors currently
            request.onblocked = function (e) {
              // The following addresses part of https://bugzilla.mozilla.org/show_bug.cgi?id=1220279
              e = e.newVersion === null || typeof Proxy === 'undefined' ? e : new Proxy(e, { get: function get(target, name) {
                  return name === 'newVersion' ? null : target[name];
                } });
              var resume = new Promise(function (res, rej) {
                // We overwrite handlers rather than make a new
                //   delete() since the original request is still
                //   open and its onsuccess will still fire if
                //   the user unblocks by closing the blocking
                //   connection
                request.onsuccess = function (ev) {
                  // The following are needed currently by PhantomJS: https://github.com/ariya/phantomjs/issues/14141
                  if (!('newVersion' in ev)) {
                    ev.newVersion = e.newVersion;
                  }

                  if (!('oldVersion' in ev)) {
                    ev.oldVersion = e.oldVersion;
                  }

                  res(ev);
                };
                request.onerror = function (e) {
                  return rej(e);
                };
              });
              e.resume = resume;
              reject(e);
            };
          });
        },

        cmp: function cmp(param1, param2) {
          return new Promise(function (resolve, reject) {
            try {
              resolve(indexedDB.cmp(param1, param2));
            } catch (e) {
              reject(e);
            }
          });
        }
      };

      if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = db;
      } else if (typeof define === 'function' && define.amd) {
        define(function () {
          return db;
        });
      } else {
        local.db = db;
      }
    })(self);


  },{}]},{},[1])(1)
});
// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsIndexedDb.js

/*global chrome, db, tgs, gsUtils, gsChrome, gsSession */
'use strict';

var gsIndexedDb = {
  DB_SERVER: 'tgs',
  DB_VERSION: '3',
  DB_PREVIEWS: 'gsPreviews',
  DB_SUSPENDED_TABINFO: 'gsSuspendedTabInfo',
  DB_FAVICON_META: 'gsFaviconMeta',
  DB_CURRENT_SESSIONS: 'gsCurrentSessions',
  DB_SAVED_SESSIONS: 'gsSavedSessions',
  DB_SESSION_PRE_UPGRADE_KEY: 'preUpgradeVersion',

  server: null,

  getDb: async function() {
    if (!gsIndexedDb.server) {
      gsIndexedDb.server = await db.open({
        server: gsIndexedDb.DB_SERVER,
        version: gsIndexedDb.DB_VERSION,
        schema: gsIndexedDb.getSchema,
      });
    }
    return gsIndexedDb.server;
  },

  getSchema: function() {
    // NOTE: Called directly from db.js so 'this' cannot be relied upon
    return {
      [gsIndexedDb.DB_PREVIEWS]: {
        key: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: {
          id: {},
          url: {},
        },
      },
      [gsIndexedDb.DB_SUSPENDED_TABINFO]: {
        key: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: {
          id: {},
          url: {},
        },
      },
      [gsIndexedDb.DB_FAVICON_META]: {
        key: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: {
          id: {},
          url: {},
        },
      },
      [gsIndexedDb.DB_CURRENT_SESSIONS]: {
        key: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: {
          id: {},
          sessionId: {},
        },
      },
      [gsIndexedDb.DB_SAVED_SESSIONS]: {
        key: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: {
          id: {},
          sessionId: {},
        },
      },
    };
  },

  fetchPreviewImage: async function(tabUrl) {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_PREVIEWS, 'url')
        .only(tabUrl)
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  },

  addPreviewImage: async function(tabUrl, previewUrl) {
    try {
      const gsDb = await gsIndexedDb.getDb();
      const results = await gsDb
        .query(gsIndexedDb.DB_PREVIEWS, 'url')
        .only(tabUrl)
        .execute();
      if (results.length > 0) {
        for (const result of results) {
          await gsDb.remove(gsIndexedDb.DB_PREVIEWS, result.id);
        }
      }
      await gsDb.add(gsIndexedDb.DB_PREVIEWS, { url: tabUrl, img: previewUrl });
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  addSuspendedTabInfo: async function(tabProperties) {
    try {
      if (!tabProperties.url) {
        gsUtils.error('gsIndexedDb', 'tabProperties.url not set.');
        return;
      }
      const gsDb = await gsIndexedDb.getDb();
      const results = await gsDb
        .query(gsIndexedDb.DB_SUSPENDED_TABINFO)
        .filter('url', tabProperties.url)
        .execute();
      if (results.length > 0) {
        for (const result of results) {
          await gsDb.remove(gsIndexedDb.DB_SUSPENDED_TABINFO, result.id);
        }
      }
      await gsDb.add(gsIndexedDb.DB_SUSPENDED_TABINFO, tabProperties);
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  // This information is no longer used for suspended tabs as everything we
  // need for a suspended tab can be found in the suspended url
  fetchTabInfo: async function(tabUrl) {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_SUSPENDED_TABINFO, 'url')
        .only(tabUrl)
        .distinct()
        .desc()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      const tabInfo = results[0];
      //Temporary code
      if (tabInfo.favicon) {
        if (!tabInfo.favIconUrl) {
          tabInfo.favIconUrl = tabInfo.favicon;
        }
        delete tabInfo.favicon;
      }
      return tabInfo;
    }
    return null;
  },

  addFaviconMeta: async function(url, faviconMeta) {
    try {
      if (!url) {
        gsUtils.error('gsIndexedDb', 'url not set.');
        return;
      }
      const faviconMetaWithUrl = Object.assign(faviconMeta, { url });
      const gsDb = await gsIndexedDb.getDb();
      const results = await gsDb
        .query(gsIndexedDb.DB_FAVICON_META)
        .filter('url', url)
        .execute();
      if (results.length > 0) {
        for (const result of results) {
          await gsDb.remove(gsIndexedDb.DB_FAVICON_META, result.id);
        }
      }
      await gsDb.add(gsIndexedDb.DB_FAVICON_META, faviconMetaWithUrl);
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  fetchFaviconMeta: async function(url) {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_FAVICON_META, 'url')
        .only(url)
        .distinct()
        .desc()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      const faviconMeta = results[0];
      return faviconMeta;
    }
    return null;
  },

  updateSession: async function(session) {
    try {
      const gsDb = await gsIndexedDb.getDb();

      //if it's a saved session (prefixed with an underscore)
      const tableName =
        session.sessionId.indexOf('_') === 0
          ? gsIndexedDb.DB_SAVED_SESSIONS
          : gsIndexedDb.DB_CURRENT_SESSIONS;

      //first check to see if session id already exists
      const matchingSession = await gsIndexedDb.fetchSessionBySessionId(
        session.sessionId
      );
      if (matchingSession) {
        gsUtils.log(
          'gsIndexedDb',
          'Updating existing session: ' + session.sessionId
        );
        session.id = matchingSession.id; //copy across id from matching session
        session.date = new Date().toISOString();
        await gsDb.update(tableName, session); //then update based on that id
      } else {
        gsUtils.log(
          'gsIndexedDb',
          'Creating new session: ' + session.sessionId
        );
        await gsDb.add(tableName, session);
      }
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  fetchCurrentSessions: async function() {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_CURRENT_SESSIONS)
        .all()
        .desc()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    return results;
  },

  fetchSessionBySessionId: async function(sessionId) {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();

      //if it's a saved session (prefixed with an underscore)
      const tableName =
        sessionId.indexOf('_') === 0
          ? gsIndexedDb.DB_SAVED_SESSIONS
          : gsIndexedDb.DB_CURRENT_SESSIONS;
      results = await gsDb
        .query(tableName, 'sessionId')
        .only(sessionId)
        .desc()
        .execute();

      if (results.length > 1) {
        gsUtils.warning(
          'gsIndexedDb',
          'Duplicate sessions found for sessionId: ' +
            sessionId +
            '! Removing older ones..'
        );
        for (let session of results.slice(1)) {
          await gsDb.remove(tableName, session.id);
        }
      }
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  },

  createOrUpdateSessionRestorePoint: async function(session, version) {
    const existingSessionRestorePoint = await gsIndexedDb.fetchSessionRestorePoint(
      version
    );
    if (existingSessionRestorePoint) {
      existingSessionRestorePoint.windows = session.windows;
      await gsIndexedDb.updateSession(existingSessionRestorePoint);
      gsUtils.log('gsIndexedDb', 'Updated automatic session restore point');
    } else {
      session.name = 'Automatic save point for v' + version;
      session[gsIndexedDb.DB_SESSION_PRE_UPGRADE_KEY] = version;
      await gsIndexedDb.addToSavedSessions(session);
      gsUtils.log('gsIndexedDb', 'Created automatic session restore point');
    }
    const newSessionRestorePoint = await gsIndexedDb.fetchSessionRestorePoint(
      version
    );
    gsUtils.log(
      'gsIndexedDb',
      'New session restore point:',
      newSessionRestorePoint
    );
    return newSessionRestorePoint;
  },

  fetchSessionRestorePoint: async function(versionValue) {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      const tableName = gsIndexedDb.DB_SAVED_SESSIONS;
      results = await gsDb
        .query(tableName)
        .filter(gsIndexedDb.DB_SESSION_PRE_UPGRADE_KEY, versionValue)
        .distinct()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  },

  // Returns most recent session in DB_CURRENT_SESSIONS EXCLUDING the current session
  fetchLastSession: async function() {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_CURRENT_SESSIONS, 'id')
        .all()
        .desc()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    if (results && results.length > 0) {
      //don't want to match on current session
      const currentSessionId = gsSession.getSessionId();
      const lastSession = results.find(o => o.sessionId !== currentSessionId);
      return lastSession;
    }
    return null;
  },

  fetchSavedSessions: async function() {
    let results;
    try {
      const gsDb = await gsIndexedDb.getDb();
      results = await gsDb
        .query(gsIndexedDb.DB_SAVED_SESSIONS)
        .all()
        .execute();
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
    return results;
  },

  addToSavedSessions: async function(session) {
    //if sessionId does not already have an underscore prefix then generate a new unique sessionId for this saved session
    if (session.sessionId.indexOf('_') < 0) {
      session.sessionId = '_' + gsUtils.generateHashCode(session.name);
    }

    //clear id as it will be either readded (if sessionId match found) or generated (if creating a new session)
    delete session.id;
    await gsIndexedDb.updateSession(session);
  },

  // For testing only!
  clearGsDatabase: async function() {
    try {
      const gsDb = await gsIndexedDb.getDb();
      await gsDb.clear(gsIndexedDb.DB_CURRENT_SESSIONS);
      await gsDb.clear(gsIndexedDb.DB_SAVED_SESSIONS);
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  removeTabFromSessionHistory: async function(sessionId, windowId, tabId) {
    const gsSession = await gsIndexedDb.fetchSessionBySessionId(sessionId);
    gsSession.windows.some(function(curWindow, windowIndex) {
      const matched = curWindow.tabs.some(function(curTab, tabIndex) {
        //leave this as a loose matching as sometimes it is comparing strings. other times ints
        if (curTab.id == tabId || curTab.url == tabId) {
          // eslint-disable-line eqeqeq
          curWindow.tabs.splice(tabIndex, 1);
          return true;
        }
      });
      if (matched) {
        //remove window if it no longer contains any tabs
        if (curWindow.tabs.length === 0) {
          gsSession.windows.splice(windowIndex, 1);
        }
        return true;
      }
    });

    //update session
    if (gsSession.windows.length > 0) {
      await gsIndexedDb.updateSession(gsSession);
      //or remove session if it no longer contains any windows
    } else {
      await gsIndexedDb.removeSessionFromHistory(sessionId);
    }
    const updatedSession = await gsIndexedDb.fetchSessionBySessionId(sessionId);
    return updatedSession;
  },

  removeSessionFromHistory: async function(sessionId) {
    const tableName =
      sessionId.indexOf('_') === 0
        ? gsIndexedDb.DB_SAVED_SESSIONS
        : gsIndexedDb.DB_CURRENT_SESSIONS;

    try {
      const gsDb = await gsIndexedDb.getDb();
      const result = await gsDb
        .query(tableName)
        .filter('sessionId', sessionId)
        .execute();
      if (result.length > 0) {
        const session = result[0];
        await gsDb.remove(tableName, session.id);
      }
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  trimDbItems: async function() {
    const maxTabItems = 1000;
    const maxHistories = 5;

    try {
      const gsDb = await gsIndexedDb.getDb();

      //trim suspendedTabInfo. if there are more than maxTabItems items, then remove the oldest ones
      const suspendedTabInfos = await gsDb
        .query(gsIndexedDb.DB_SUSPENDED_TABINFO, 'id')
        .all()
        .keys()
        .execute();
      if (suspendedTabInfos.length > maxTabItems) {
        const itemsToRemove = suspendedTabInfos.length - maxTabItems;
        for (let i = 0; i < itemsToRemove; i++) {
          await gsDb.remove(
            gsIndexedDb.DB_SUSPENDED_TABINFO,
            suspendedTabInfos[i]
          );
        }
      }

      //trim suspendedTabInfo. if there are more than maxTabItems items, then remove the oldest ones
      const faviconMetas = await gsDb
        .query(gsIndexedDb.DB_FAVICON_META, 'id')
        .all()
        .keys()
        .execute();
      //when favicons are stored they also create an extra indexedDb item with the root url as the key
      //so they will have slightly more entries than the suspendedTabInfos
      const maxFaviconItems = parseInt(maxTabItems + maxTabItems * 0.3);
      if (faviconMetas.length > maxFaviconItems) {
        const itemsToRemove = faviconMetas.length - maxFaviconItems;
        for (let i = 0; i < itemsToRemove; i++) {
          await gsDb.remove(gsIndexedDb.DB_FAVICON_META, faviconMetas[i]);
        }
      }

      //trim imagePreviews. if there are more than maxTabItems items, then remove the oldest ones
      const previews = await gsDb
        .query(gsIndexedDb.DB_PREVIEWS, 'id')
        .all()
        .keys()
        .execute();
      if (previews.length > maxTabItems) {
        const itemsToRemove = previews.length - maxTabItems;
        for (let i = 0; i < itemsToRemove; i++) {
          await gsDb.remove(gsIndexedDb.DB_PREVIEWS, previews[i]);
        }
      }

      //trim currentSessions. if there are more than maxHistories items, then remove the oldest ones
      const currentSessions = await gsDb
        .query(gsIndexedDb.DB_CURRENT_SESSIONS, 'id')
        .all()
        .keys()
        .execute();

      if (currentSessions.length > maxHistories) {
        const itemsToRemove = currentSessions.length - maxHistories;
        for (let i = 0; i < itemsToRemove; i++) {
          await gsDb.remove(
            gsIndexedDb.DB_CURRENT_SESSIONS,
            currentSessions[i]
          );
        }
      }
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },

  /**
   * MIGRATIONS
   */

  performMigration: async function(oldVersion) {
    try {
      const gsDb = await gsIndexedDb.getDb();
      const extensionName = chrome.runtime.getManifest().name || '';

      const major = parseInt(oldVersion.split('.')[0] || 0);
      const minor = parseInt(oldVersion.split('.')[1] || 0);
      const testMode = extensionName.includes('Test');
      // patch = parseInt(oldVersion.split('.')[2] || 0);

      //perform migrated history fixup
      if (major < 6 || (major === 6 && minor < 13)) {
        // if (oldVersion < 6.13)

        //fix up migrated saved session and newly saved session sessionIds
        const savedSessions = await gsDb
          .query(gsIndexedDb.DB_SAVED_SESSIONS)
          .all()
          .execute();
        for (const session of savedSessions) {
          if (session.id === 7777) {
            session.sessionId = '_7777';
            session.name = 'Recovered tabs';
            session.date = new Date(session.date).toISOString();
          } else {
            session.sessionId = '_' + gsUtils.generateHashCode(session.name);
          }
          await gsDb.update(gsIndexedDb.DB_SAVED_SESSIONS, session);
        }
      }
      if (major < 6 || (major === 6 && minor < 30)) {
        // if (oldVersion < 6.30)

        if (gsIndexedDb.getOption('preview')) {
          if (gsIndexedDb.getOption('previewQuality') === '0.1') {
            gsIndexedDb.setOption(gsIndexedDb.SCREEN_CAPTURE, '1');
          } else {
            gsIndexedDb.setOption(gsIndexedDb.SCREEN_CAPTURE, '2');
          }
        } else {
          gsIndexedDb.setOption(gsIndexedDb.SCREEN_CAPTURE, '0');
        }
      }
      if (major < 6 || (major === 6 && minor < 31) || testMode) {
        // if (oldVersion < 6.31)
        const cookies = await gsChrome.cookiesGetAll();
        const scrollPosByTabId = {};
        for (const cookie of cookies) {
          if (cookie.name.indexOf('gsScrollPos') === 0) {
            if (cookie.value && cookie.value !== '0') {
              const tabId = cookie.name.substr(12);
              scrollPosByTabId[tabId] = cookie.value;
            }
            let prefix = cookie.secure ? 'https://' : 'http://';
            if (cookie.domain.charAt(0) === '.') {
              prefix += 'www';
            }
            const url = prefix + cookie.domain + cookie.path;
            await gsChrome.cookiesRemove(url, cookie.name);
          }
        }
        tgs.scrollPosByTabId = scrollPosByTabId;
      }
    } catch (e) {
      gsUtils.error('gsIndexedDb', e);
    }
  },
};

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsMessages.js

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
// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsSession.js

/*global chrome, localStorage, tgs, gsStorage, gsIndexedDb, gsUtils, gsChrome, gsTabCheckManager, gsTabDiscardManager */
// eslint-disable-next-line no-unused-vars
var gsSession = (function() {
  'use strict';

  const tabsToRestorePerSecond = 12;
  const updateUrl = chrome.extension.getURL('update.html');
  const updatedUrl = chrome.extension.getURL('updated.html');

  let initialisationMode = true;
  let sessionId;
  let updateType = null;
  let updated = false;
  let fileUrlsAccessAllowed = false;

  let startupTabCheckTimeTakenInSeconds;
  let startupRecoveryTimeTakenInSeconds;
  let startupType;
  let startupLastVersion;
  let syncedSettingsOnInit;

  async function initAsPromised() {
    // Set fileUrlsAccessAllowed to determine if extension can work on file:// URLs
    await new Promise(r => {
      chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
        fileUrlsAccessAllowed = isAllowedAccess;
        r();
      });
    });

    //remove any update screens
    await Promise.all([
      gsUtils.removeTabsByUrlAsPromised(updateUrl),
      gsUtils.removeTabsByUrlAsPromised(updatedUrl),
    ]);

    //handle special event where an extension update is available
    chrome.runtime.onUpdateAvailable.addListener(details => {
      prepareForUpdate(details); //async
    });
    gsUtils.log('gsSession', 'init successful');
  }

  async function prepareForUpdate(newVersionDetails) {
    const currentVersion = chrome.runtime.getManifest().version;
    const newVersion = newVersionDetails.version;

    gsUtils.log(
      'gsSession',
      'A new version is available: ' + currentVersion + ' -> ' + newVersion
    );

    let sessionRestorePoint;
    const currentSession = await buildCurrentSession();
    if (currentSession) {
      sessionRestorePoint = await gsIndexedDb.createOrUpdateSessionRestorePoint(
        currentSession,
        currentVersion
      );
    }

    const suspendedTabCount = await gsUtils.getSuspendedTabCount();
    if (!sessionRestorePoint || suspendedTabCount > 0) {
      //show update screen
      await gsChrome.tabsCreate(updateUrl);
    } else {
      // if there are no suspended tabs then simply install the update immediately
      chrome.runtime.reload();
    }
  }

  function getSessionId() {
    if (!sessionId) {
      //turn this into a string to make comparisons easier further down the track
      sessionId = Date.now() + '';
      gsUtils.log('gsSession', 'sessionId: ', sessionId);
    }
    return sessionId;
  }

  async function buildCurrentSession() {
    const currentWindows = await gsChrome.windowsGetAll();
    const tabsExist = currentWindows.some(
      window => window.tabs && window.tabs.length
    );
    if (!tabsExist) {
      gsUtils.warning(
        'gsSession',
        'Failed to build current session. Could not find any tabs.'
      );
      return null;
    }
    const currentSession = {
      sessionId: getSessionId(),
      windows: currentWindows,
      date: new Date().toISOString(),
    };
    return currentSession;
  }

  async function updateCurrentSession() {
    const currentSession = await buildCurrentSession();
    if (currentSession) {
      await gsIndexedDb.updateSession(currentSession);
    }
  }

  function isUpdated() {
    return updated;
  }

  function isInitialising() {
    return initialisationMode;
  }

  function isFileUrlsAccessAllowed() {
    return fileUrlsAccessAllowed;
  }

  function getTabCheckTimeTakenInSeconds() {
    return startupTabCheckTimeTakenInSeconds;
  }

  function getRecoveryTimeTakenInSeconds() {
    return startupRecoveryTimeTakenInSeconds;
  }

  function getStartupType() {
    return startupType;
  }

  function getStartupLastVersion() {
    return startupLastVersion;
  }

  function getUpdateType() {
    return updateType;
  }

  function setSynchedSettingsOnInit(syncedSettings) {
    syncedSettingsOnInit = syncedSettings;
  }

  async function runStartupChecks() {
    initialisationMode = true;

    const currentSessionTabs = await gsChrome.tabsQuery();
    gsUtils.log('gsSession', 'preRecovery open tabs:', currentSessionTabs);

    const curVersion = chrome.runtime.getManifest().version;
    startupLastVersion = gsStorage.fetchLastVersion();

    if (chrome.extension.inIncognitoContext) {
      // do nothing if in incognito context
      startupType = 'Incognito';
    } else if (startupLastVersion === curVersion) {
      gsUtils.log('gsSession', 'HANDLING NORMAL STARTUP');
      startupType = 'Restart';
      await handleNormalStartup(currentSessionTabs, curVersion);
    } else if (!startupLastVersion || startupLastVersion === '0.0.0') {
      gsUtils.log('gsSession', 'HANDLING NEW INSTALL');
      startupType = 'Install';
      await handleNewInstall(curVersion);
    } else {
      gsUtils.log('gsSession', 'HANDLING UPDATE');
      startupType = 'Update';
      await handleUpdate(currentSessionTabs, curVersion, startupLastVersion);
    }

    const disableTabChecks = gsStorage.getOption(gsStorage.DISABLE_TAB_CHECKS);
    if (!disableTabChecks) {
      await performTabChecks();
    } else {
      gsUtils.log('Skipping tabChecks due to disableTabChecks flag.');
    }

    gsUtils.log('gsSession', 'updating current session');
    updateCurrentSession(); //async

    initialisationMode = false;
  }

  //make sure the contentscript / suspended script of each tab is responsive
  async function performTabChecks() {
    const initStartTime = Date.now();
    gsUtils.log(
      'gsSession',
      '\n\n------------------------------------------------\n' +
        `Checking tabs for responsiveness..\n` +
        '------------------------------------------------\n\n'
    );

    const postRecoverySessionTabs = await gsChrome.tabsQuery();
    gsUtils.log(
      'gsSession',
      'postRecoverySessionTabs:',
      postRecoverySessionTabs
    );

    const tabCheckResults = await gsTabCheckManager.performInitialisationTabChecks(
      postRecoverySessionTabs
    );
    const totalTabCheckCount = tabCheckResults.length;
    const successfulTabChecksCount = tabCheckResults.filter(
      o => o === gsUtils.STATUS_SUSPENDED
    ).length;

    // If we want to discard tabs after suspending them
    let discardAfterSuspend = gsStorage.getOption(
      gsStorage.DISCARD_AFTER_SUSPEND
    );
    if (discardAfterSuspend) {
      await gsTabDiscardManager.performInitialisationTabDiscards(
        postRecoverySessionTabs
      );
    }

    startupTabCheckTimeTakenInSeconds = parseInt(
      (Date.now() - initStartTime) / 1000
    );
    gsUtils.log(
      'gsSession',
      '\n\n------------------------------------------------\n' +
        `Checking tabs finished. Time taken: ${startupTabCheckTimeTakenInSeconds} sec\n` +
        `${successfulTabChecksCount} / ${totalTabCheckCount} initialised successfully\n` +
        '------------------------------------------------\n\n'
    );
  }

  async function handleNormalStartup(currentSessionTabs, curVersion) {
    const shouldRecoverTabs = await checkForCrashRecovery(currentSessionTabs);
    if (shouldRecoverTabs) {
      const lastExtensionRecoveryTimestamp = gsStorage.fetchLastExtensionRecoveryTimestamp();
      const hasCrashedRecently =
        lastExtensionRecoveryTimestamp &&
        Date.now() - lastExtensionRecoveryTimestamp < 1000 * 60 * 5;
      gsStorage.setLastExtensionRecoveryTimestamp(Date.now());

      if (!hasCrashedRecently) {
        //if this is the first recent crash, then automatically recover lost tabs
        await recoverLostTabs();
      } else {
        //otherwise show the recovery page
        const recoveryUrl = chrome.extension.getURL('recovery.html');
        await gsChrome.tabsCreate(recoveryUrl);
        //hax0r: wait for recovery tab to finish loading before returning
        //this is so we remain in 'recoveryMode' for a bit longer, preventing
        //the sessionUpdate code from running when this tab gains focus
        await gsUtils.setTimeout(2000);
      }
    } else {
      await gsIndexedDb.trimDbItems();
    }
  }

  async function handleNewInstall(curVersion) {
    gsStorage.setLastVersion(curVersion);

    // Try to determine if this is a new install for the computer or for the whole profile
    // If settings sync contains non-default options, then we can assume it's only
    // a new install for this computer
    /* if (
      !syncedSettingsOnInit ||
      Object.keys(syncedSettingsOnInit).length === 0
    ) {
      //show welcome message
      const optionsUrl = chrome.extension.getURL('options.html?firstTime');
      await gsChrome.tabsCreate(optionsUrl);
    } */
  }

  async function handleUpdate(currentSessionTabs, curVersion, lastVersion) {
    gsStorage.setLastVersion(curVersion);
    const lastVersionParts = lastVersion.split('.');
    const curVersionParts = curVersion.split('.');
    if (lastVersionParts.length >= 2 && curVersionParts.length >= 2) {
      if (parseInt(curVersionParts[0]) > parseInt(lastVersionParts[0])) {
        updateType = 'major';
      } else if (parseInt(curVersionParts[1]) > parseInt(lastVersionParts[1])) {
        updateType = 'minor';
      } else {
        updateType = 'patch';
      }
    }

    const sessionRestorePoint = await gsIndexedDb.fetchSessionRestorePoint(
      lastVersion
    );
    if (!sessionRestorePoint) {
      const lastSession = await gsIndexedDb.fetchLastSession();
      if (lastSession) {
        await gsIndexedDb.createOrUpdateSessionRestorePoint(
          lastSession,
          lastVersion
        );
      } else {
        gsUtils.error(
          'gsSession',
          'No session restore point found, and no lastSession exists!'
        );
      }
    }

    await gsUtils.removeTabsByUrlAsPromised(updateUrl);
    await gsUtils.removeTabsByUrlAsPromised(updatedUrl);

    await gsIndexedDb.performMigration(lastVersion);
    gsStorage.setNoticeVersion('0');
    const shouldRecoverTabs = await checkForCrashRecovery(currentSessionTabs);
    if (shouldRecoverTabs) {
      //await gsUtils.createTabAndWaitForFinishLoading(updatedUrl, 10000);

      await recoverLostTabs();
      updated = true;

      //update updated views
      const updatedViews = tgs.getInternalViewsByViewName('updated');
      if (updatedViews.length > 0) {
        for (const view of updatedViews) {
          view.exports.toggleUpdated();
        }
      } else {
        await gsUtils.removeTabsByUrlAsPromised(updatedUrl);
        //await gsChrome.tabsCreate({ url: updatedUrl });
      }
    } else {
      updated = true;
      //await gsChrome.tabsCreate({ url: updatedUrl });
    }
  }

  // This function is used only for testing
  async function triggerDiscardOfAllTabs() {
    await new Promise(resolve => {
      chrome.tabs.query({ active: false, discarded: false }, function(tabs) {
        for (let i = 0; i < tabs.length; ++i) {
          if (tabs[i] === undefined || gsUtils.isSpecialTab(tabs[i])) {
            continue;
          }
          gsTabDiscardManager.queueTabForDiscard(tabs[i]);
        }
        resolve();
      });
    });
  }

  async function checkForCrashRecovery(currentSessionTabs) {
    gsUtils.log(
      'gsSession',
      'Checking for crash recovery: ' + new Date().toISOString()
    );

    //try to detect whether the extension has crashed as apposed to chrome restarting
    //if it is an extension crash, then in theory all suspended tabs will be gone
    //and all normal tabs will still exist with the same ids
    const currentSessionSuspendedTabs = currentSessionTabs.filter(
      tab => !gsUtils.isSpecialTab(tab) && gsUtils.isSuspendedTab(tab)
    );
    const currentSessionNonExtensionTabs = currentSessionTabs.filter(
      o => o.url.indexOf(chrome.runtime.id) === -1
    );

    if (currentSessionSuspendedTabs.length > 0) {
      gsUtils.log(
        'gsSession',
        'Aborting tab recovery. Browser has open suspended tabs.' +
          ' Assuming user has "On start-up -> Continue where you left off" set' +
          ' or is restarting with suspended pinned tabs.'
      );
      return false;
    }

    const lastSession = await gsIndexedDb.fetchLastSession();
    if (!lastSession) {
      gsUtils.log(
        'gsSession',
        'Aborting tab recovery. Could not find last session.'
      );
      return false;
    }
    gsUtils.log('gsSession', 'lastSession: ', lastSession);

    const lastSessionTabs = lastSession.windows.reduce(
      (a, o) => a.concat(o.tabs),
      []
    );
    const lastSessionSuspendedTabs = lastSessionTabs.filter(o =>
      gsUtils.isSuspendedTab(o)
    );
    const lastSessionNonExtensionTabs = lastSessionTabs.filter(
      o => o.url.indexOf(chrome.runtime.id) === -1
    );

    if (lastSessionSuspendedTabs.length === 0) {
      gsUtils.log(
        'gsSession',
        'Aborting tab recovery. Last session contained no suspended tabs.'
      );
      return false;
    }

    // Match against all tabIds from last session here, not just non-extension tabs
    // as there is a chance during tabInitialisation of a suspended tab getting reloaded
    // directly and hence keeping its tabId (ie: file:// tabs)
    function matchingTabExists(tab) {
      if (tab.url.indexOf('chrome://newtab') === 0 && tab.index === 0)
        return false;
      return lastSessionTabs.some(o => o.id === tab.id && o.url === tab.url);
    }
    const matchingTabIdsCount = currentSessionNonExtensionTabs.reduce(
      (a, o) => (matchingTabExists(o) ? a + 1 : a),
      0
    );
    const maxMatchableTabsCount = Math.max(
      lastSessionNonExtensionTabs.length,
      currentSessionNonExtensionTabs.length
    );
    gsUtils.log(
      'gsSession',
      matchingTabIdsCount +
        ' / ' +
        maxMatchableTabsCount +
        ' tabs have the same id between the last session and the current session.'
    );
    if (
      matchingTabIdsCount === 0 ||
      maxMatchableTabsCount - matchingTabIdsCount > 1
    ) {
      gsUtils.log('gsSession', 'Aborting tab recovery. Tab IDs do not match.');
      return false;
    }

    return true;
  }

  async function recoverLostTabs() {
    const lastSession = await gsIndexedDb.fetchLastSession();
    if (!lastSession) {
      return;
    }

    const recoveryStartTime = Date.now();
    gsUtils.log(
      'gsSession',
      '\n\n------------------------------------------------\n' +
        'Recovery mode started.\n' +
        '------------------------------------------------\n\n'
    );
    gsUtils.log('gsSession', 'lastSession: ', lastSession);
    gsUtils.removeInternalUrlsFromSession(lastSession);

    const currentWindows = await gsChrome.windowsGetAll();
    const matchedCurrentWindowBySessionWindowId = matchCurrentWindowsWithLastSessionWindows(
      lastSession.windows,
      currentWindows
    );

    //attempt to automatically restore any lost tabs/windows in their proper positions
    const lastFocusedWindow = await gsChrome.windowsGetLastFocused();
    const lastFocusedWindowId = lastFocusedWindow ? lastFocusedWindow.id : null;
    for (let sessionWindow of lastSession.windows) {
      const matchedCurrentWindow =
        matchedCurrentWindowBySessionWindowId[sessionWindow.id];
      await restoreSessionWindow(sessionWindow, matchedCurrentWindow, 0);
    }
    if (lastFocusedWindowId) {
      await gsChrome.windowsUpdate(lastFocusedWindowId, { focused: true });
    }

    startupRecoveryTimeTakenInSeconds = parseInt(
      (Date.now() - recoveryStartTime) / 1000
    );
    gsUtils.log(
      'gsSession',
      '\n\n------------------------------------------------\n' +
        'Recovery mode finished. Time taken: ' +
        startupRecoveryTimeTakenInSeconds +
        ' sec\n' +
        '------------------------------------------------\n\n'
    );
    gsUtils.log('gsSession', 'updating current session');
    updateCurrentSession(); //async
  }

  //try to match session windows with currently open windows
  function matchCurrentWindowsWithLastSessionWindows(
    unmatchedSessionWindows,
    unmatchedCurrentWindows
  ) {
    const matchedCurrentWindowBySessionWindowId = {};

    //if there is a current window open that matches the id of the session window id then match it
    unmatchedSessionWindows.slice().forEach(function(sessionWindow) {
      const matchingCurrentWindow = unmatchedCurrentWindows.find(function(
        window
      ) {
        return window.id === sessionWindow.id;
      });
      if (matchingCurrentWindow) {
        matchedCurrentWindowBySessionWindowId[
          sessionWindow.id
        ] = matchingCurrentWindow;
        //remove from unmatchedSessionWindows and unmatchedCurrentWindows
        unmatchedSessionWindows = unmatchedSessionWindows.filter(function(
          window
        ) {
          return window.id !== sessionWindow.id;
        });
        unmatchedCurrentWindows = unmatchedCurrentWindows.filter(function(
          window
        ) {
          return window.id !== matchingCurrentWindow.id;
        });
      }
    });

    if (
      unmatchedSessionWindows.length === 0 ||
      unmatchedCurrentWindows.length === 0
    ) {
      return matchedCurrentWindowBySessionWindowId;
    }

    //if we still have session windows that haven't been matched to a current window then attempt matching based on tab urls
    let tabMatchingObjects = generateTabMatchingObjects(
      unmatchedSessionWindows,
      unmatchedCurrentWindows
    );

    //find the tab matching objects with the highest tabMatchCounts
    while (
      unmatchedSessionWindows.length > 0 &&
      unmatchedCurrentWindows.length > 0
    ) {
      const maxTabMatchCount = Math.max(
        ...tabMatchingObjects.map(function(o) {
          return o.tabMatchCount;
        })
      );
      const bestTabMatchingObject = tabMatchingObjects.find(function(o) {
        return o.tabMatchCount === maxTabMatchCount;
      });

      matchedCurrentWindowBySessionWindowId[
        bestTabMatchingObject.sessionWindow.id
      ] =
        bestTabMatchingObject.currentWindow;

      //remove from unmatchedSessionWindows and unmatchedCurrentWindows
      const unmatchedSessionWindowsLengthBefore =
        unmatchedSessionWindows.length;
      unmatchedSessionWindows = unmatchedSessionWindows.filter(function(
        window
      ) {
        return window.id !== bestTabMatchingObject.sessionWindow.id;
      });
      unmatchedCurrentWindows = unmatchedCurrentWindows.filter(function(
        window
      ) {
        return window.id !== bestTabMatchingObject.currentWindow.id;
      });
      gsUtils.log(
        'gsUtils',
        'Matched with tab count of ' + maxTabMatchCount + ': ',
        bestTabMatchingObject.sessionWindow,
        bestTabMatchingObject.currentWindow
      );

      //remove from tabMatchingObjects
      tabMatchingObjects = tabMatchingObjects.filter(function(o) {
        return (
          (o.sessionWindow !== bestTabMatchingObject.sessionWindow) &
          (o.currentWindow !== bestTabMatchingObject.currentWindow)
        );
      });

      //safety check to make sure we dont get stuck in infinite loop. should never happen though.
      if (
        unmatchedSessionWindows.length >= unmatchedSessionWindowsLengthBefore
      ) {
        break;
      }
    }

    return matchedCurrentWindowBySessionWindowId;
  }

  function generateTabMatchingObjects(sessionWindows, currentWindows) {
    const unsuspendedSessionUrlsByWindowId = {};
    sessionWindows.forEach(function(sessionWindow) {
      unsuspendedSessionUrlsByWindowId[sessionWindow.id] = [];
      sessionWindow.tabs.forEach(function(curTab) {
        if (gsUtils.isNormalTab(curTab)) {
          unsuspendedSessionUrlsByWindowId[sessionWindow.id].push(curTab.url);
        }
      });
    });
    const unsuspendedCurrentUrlsByWindowId = {};
    currentWindows.forEach(function(currentWindow) {
      unsuspendedCurrentUrlsByWindowId[currentWindow.id] = [];
      currentWindow.tabs.forEach(function(curTab) {
        if (gsUtils.isNormalTab(curTab)) {
          unsuspendedCurrentUrlsByWindowId[currentWindow.id].push(curTab.url);
        }
      });
    });

    const tabMatchingObjects = [];
    sessionWindows.forEach(function(sessionWindow) {
      currentWindows.forEach(function(currentWindow) {
        const unsuspendedSessionUrls =
          unsuspendedSessionUrlsByWindowId[sessionWindow.id];
        const unsuspendedCurrentUrls =
          unsuspendedCurrentUrlsByWindowId[currentWindow.id];
        const matchCount = unsuspendedCurrentUrls.filter(function(url) {
          return unsuspendedSessionUrls.includes(url);
        }).length;
        tabMatchingObjects.push({
          tabMatchCount: matchCount,
          sessionWindow: sessionWindow,
          currentWindow: currentWindow,
        });
      });
    });

    return tabMatchingObjects;
  }

  // suspendMode controls whether the tabs are restored as suspended or unsuspended
  // 0: Leave the urls as they are (suspended stay suspended, ussuspended stay unsuspended)
  // 1: Open all unsuspended tabs as suspended
  // 2: Open all suspended tabs as unsuspended
  async function restoreSessionWindow(
    sessionWindow,
    existingWindow,
    suspendMode
  ) {
    if (sessionWindow.tabs.length === 0) {
      gsUtils.log('gsUtils', 'SessionWindow contains no tabs to restore');
    }

    // if we have been provided with a current window to recover into
    if (existingWindow) {
      gsUtils.log(
        'gsUtils',
        'Matched sessionWindow with existingWindow: ',
        sessionWindow,
        existingWindow
      );
      const currentTabIds = [];
      const currentTabUrls = [];
      const tabPromises = [];
      for (const currentTab of existingWindow.tabs) {
        currentTabIds.push(currentTab.id);
        currentTabUrls.push(currentTab.url);
      }

      for (const [i, sessionTab] of sessionWindow.tabs.entries()) {
        //if current tab does not exist then recreate it
        if (
          !gsUtils.isSpecialTab(sessionTab) &&
          !currentTabUrls.includes(sessionTab.url) &&
          !currentTabIds.includes(sessionTab.id)
        ) {
          tabPromises.push(
            new Promise(async resolve => {
              await gsUtils.setTimeout(i * 20);
              // dont await createNewTab as we want them to happen concurrently (but staggered)
              createNewTabFromSessionTab(
                sessionTab,
                existingWindow.id,
                sessionTab.index,
                suspendMode
              );
              resolve();
            })
          );
        }
      }
      await Promise.all(tabPromises);
      return;
    }

    // else restore entire window
    gsUtils.log(
      'gsUtils',
      'Could not find match for sessionWindow: ',
      sessionWindow
    );

    const restoringUrl = chrome.extension.getURL('restoring-window.html');
    // Create new window. Important: do not pass in all urls to chrome.windows.create
    // If you load too many windows (or tabs?) like this, then it seems to blow
    // out the GPU memory in the chrome task manager
    // TODO: Report chrome bug
    const newWindow = await gsUtils.createWindowAndWaitForFinishLoading(
      { url: restoringUrl, focused: false },
      500 // dont actually wait
    );
    const placeholderTab = newWindow.tabs[0];
    await gsChrome.tabsUpdate(placeholderTab.id, { pinned: true });

    const tabPromises = [];
    for (const [i, sessionTab] of sessionWindow.tabs.entries()) {
      tabPromises.push(
        new Promise(async resolve => {
          await gsUtils.setTimeout(i * (1000 / tabsToRestorePerSecond));
          // dont await createNewTab as we want them to happen concurrently (but staggered)
          createNewTabFromSessionTab(
            sessionTab,
            newWindow.id,
            i + 1,
            suspendMode
          );
          resolve();
        })
      );
    }
    await Promise.all(tabPromises);
    if (placeholderTab) {
      await gsChrome.tabsRemove(placeholderTab.id);
    }
  }

  async function createNewTabFromSessionTab(
    sessionTab,
    windowId,
    index,
    suspendMode
  ) {
    let url = sessionTab.url;
    if (suspendMode === 1 && gsUtils.isNormalTab(sessionTab)) {
      url = gsUtils.generateSuspendedUrl(sessionTab.url, sessionTab.title);
    } else if (suspendMode === 2 && gsUtils.isSuspendedTab(sessionTab)) {
      url = gsUtils.getOriginalUrl(sessionTab.url);
    }
    const newTab = await gsChrome.tabsCreate({
      windowId: windowId,
      url: url,
      index: index,
      pinned: sessionTab.pinned,
      active: false,
    });

    // Update recovery view (if it exists)
    for (const view of tgs.getInternalViewsByViewName('recovery')) {
      view.exports.removeTabFromList(newTab);
    }
  }

  async function updateSessionMetrics(reset) {
    reset = reset || false;

    const tabs = await gsChrome.tabsQuery();
    let curSuspendedTabCount = 0;
    for (let tab of tabs) {
      if (gsUtils.isSuspendedTab(tab)) {
        curSuspendedTabCount += 1;
      }
    }
    let sessionMetrics;
    if (reset) {
      gsUtils.log('gsSession', 'Resetting session metrics');
    } else {
      sessionMetrics = gsStorage.fetchSessionMetrics();
    }

    // If no session metrics exist then create a new one
    if (!sessionMetrics || !sessionMetrics[gsStorage.SM_TIMESTAMP]) {
      sessionMetrics = createNewSessionMetrics(
        curSuspendedTabCount,
        tabs.length
      );
      gsStorage.setSessionMetrics(sessionMetrics);
      gsUtils.log('gsSession', 'Created new session metrics', sessionMetrics);
      return;
    }

    // Else update metrics (if new max reached)
    const lastSuspendedTabCount =
      sessionMetrics[gsStorage.SM_SUSPENDED_TAB_COUNT];
    if (lastSuspendedTabCount < curSuspendedTabCount) {
      sessionMetrics[gsStorage.SM_SUSPENDED_TAB_COUNT] = curSuspendedTabCount;
      sessionMetrics[gsStorage.SM_TOTAL_TAB_COUNT] = tabs.length;
      gsStorage.setSessionMetrics(sessionMetrics);
      gsUtils.log('gsSession', 'Updated session metrics', sessionMetrics);
    }
  }

  function createNewSessionMetrics(suspendedTabCount, totalTabCount) {
    const sessionMetrics = {
      [gsStorage.SM_TIMESTAMP]: Date.now(),
      [gsStorage.SM_SUSPENDED_TAB_COUNT]: suspendedTabCount,
      [gsStorage.SM_TOTAL_TAB_COUNT]: totalTabCount,
    };
    return sessionMetrics;
  }

  return {
    initAsPromised,
    runStartupChecks,
    getSessionId,
    buildCurrentSession,
    updateCurrentSession,
    isInitialising,
    isUpdated,
    isFileUrlsAccessAllowed,
    getTabCheckTimeTakenInSeconds,
    getRecoveryTimeTakenInSeconds,
    getStartupType,
    setSynchedSettingsOnInit,
    getStartupLastVersion,
    recoverLostTabs,
    triggerDiscardOfAllTabs,
    restoreSessionWindow,
    prepareForUpdate,
    getUpdateType,
    updateSessionMetrics,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsTabQueue.js

/*global gsUtils */
// eslint-disable-next-line no-unused-vars
function GsTabQueue(queueId, queueProps) {
  return (function() {
    'use strict';

    const STATUS_QUEUED = 'queued';
    const STATUS_IN_PROGRESS = 'inProgress';
    const STATUS_SLEEPING = 'sleeping';

    const EXCEPTION_TIMEOUT = 'timeout';

    const DEFAULT_CONCURRENT_EXECUTORS = 1;
    const DEFAULT_JOB_TIMEOUT = 1000;
    const DEFAULT_PROCESSING_DELAY = 500;
    const DEFAULT_REQUEUE_DELAY = 5000;
    const PROCESSING_QUEUE_CHECK_INTERVAL = 50;

    const _queueProperties = {
      concurrentExecutors: DEFAULT_CONCURRENT_EXECUTORS,
      jobTimeout: DEFAULT_JOB_TIMEOUT,
      processingDelay: DEFAULT_PROCESSING_DELAY,
      executorFn: (tab, resolve, reject, requeue) => resolve(true),
      exceptionFn: (tab, resolve, reject, requeue) => resolve(false),
    };
    const _tabDetailsByTabId = {};
    const _queuedTabIds = [];
    let _processingQueueBufferTimer = null;
    let _queueId = queueId;

    setQueueProperties(queueProps);

    function setQueueProperties(queueProps) {
      for (const propName of Object.keys(queueProps)) {
        _queueProperties[propName] = queueProps[propName];
      }
      if (!isValidInteger(_queueProperties.concurrentExecutors, 1)) {
        throw new Error(
          'concurrentExecutors must be an integer greater than 0'
        );
      }
      if (!isValidInteger(_queueProperties.jobTimeout, 1)) {
        throw new Error('jobTimeout must be an integer greater than 0');
      }
      if (!isValidInteger(_queueProperties.processingDelay, 0)) {
        throw new Error('processingDelay must be an integer of at least 0');
      }
      if (!(typeof _queueProperties.executorFn === 'function')) {
        throw new Error('executorFn must be a function');
      }
      if (!(typeof _queueProperties.exceptionFn === 'function')) {
        throw new Error('executorFn must be a function');
      }
    }

    function getQueueProperties() {
      return _queueProperties;
    }

    function isValidInteger(value, minimum) {
      return value !== null && !isNaN(Number(value) && value >= minimum);
    }

    function getTotalQueueSize() {
      return Object.keys(_tabDetailsByTabId).length;
    }

    function queueTabAsPromise(tab, executionProps, delay) {
      executionProps = executionProps || {};
      let tabDetails = _tabDetailsByTabId[tab.id];
      if (!tabDetails) {
        // gsUtils.log(tab.id, _queueId, 'Queuing new tab.');
        tabDetails = {
          tab,
          executionProps,
          deferredPromise: createDeferredPromise(),
          status: STATUS_QUEUED,
          requeues: 0,
        };
        addTabToQueue(tabDetails);
      } else {
        tabDetails.tab = tab;
        applyExecutionProps(tabDetails, executionProps);
        gsUtils.log(tab.id, _queueId, 'Tab already queued.');
      }

      if (delay && isValidInteger(delay, 1)) {
        gsUtils.log(tab.id, _queueId, `Sleeping tab for ${delay}ms`);
        sleepTab(tabDetails, delay);
      } else {
        // If tab is already marked as sleeping then wake it up
        if (tabDetails.sleepTimer) {
          gsUtils.log(tab.id, _queueId, 'Removing tab from sleep');
          clearTimeout(tabDetails.sleepTimer);
          delete tabDetails.sleepTimer;
          tabDetails.status = STATUS_QUEUED;
        }
        requestProcessQueue(0);
      }
      return tabDetails.deferredPromise;
    }

    function applyExecutionProps(tabDetails, executionProps) {
      executionProps = executionProps || {};
      for (const prop in executionProps) {
        tabDetails.executionProps[prop] = executionProps[prop];
      }
    }

    function unqueueTab(tab) {
      const tabDetails = _tabDetailsByTabId[tab.id];
      if (tabDetails) {
        // gsUtils.log(tab.id, _queueId, 'Unqueueing tab.');
        clearTimeout(tabDetails.timeoutTimer);
        removeTabFromQueue(tabDetails);
        rejectTabPromise(tabDetails, 'Queued tab job cancelled externally');
        return true;
      } else {
        return false;
      }
    }

    function addTabToQueue(tabDetails) {
      const tab = tabDetails.tab;
      _tabDetailsByTabId[tab.id] = tabDetails;
      _queuedTabIds.push(tab.id);
    }

    function removeTabFromQueue(tabDetails) {
      const tab = tabDetails.tab;
      delete _tabDetailsByTabId[tab.id];
      for (const [i, tabId] of _queuedTabIds.entries()) {
        if (tabId === tab.id) {
          _queuedTabIds.splice(i, 1);
          break;
        }
      }
      gsUtils.log(_queueId, `total queue size: ${_queuedTabIds.length}`);
    }

    function moveTabToEndOfQueue(tabDetails) {
      const tab = tabDetails.tab;
      for (const [i, tabId] of _queuedTabIds.entries()) {
        if (tabId === tab.id) {
          _queuedTabIds.push(_queuedTabIds.splice(i, 1)[0]);
          break;
        }
      }
    }

    function getQueuedTabDetails(tab) {
      return _tabDetailsByTabId[tab.id];
    }

    function createDeferredPromise() {
      let res;
      let rej;
      const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      promise.resolve = o => {
        res(o);
        return promise;
      };
      promise.reject = o => {
        rej(o);
        return promise;
      };
      return promise;
    }

    function requestProcessQueue(processingDelay) {
      setTimeout(() => {
        startProcessQueueBufferTimer();
      }, processingDelay);
    }

    function startProcessQueueBufferTimer() {
      if (_processingQueueBufferTimer === null) {
        _processingQueueBufferTimer = setTimeout(() => {
          _processingQueueBufferTimer = null;
          processQueue();
        }, PROCESSING_QUEUE_CHECK_INTERVAL);
      }
    }

    function processQueue() {
      let inProgressCount = 0;
      for (const tabId of _queuedTabIds) {
        const tabDetails = _tabDetailsByTabId[tabId];
        if (tabDetails.status === STATUS_IN_PROGRESS) {
          inProgressCount += 1;
        } else if (tabDetails.status === STATUS_QUEUED) {
          processTab(tabDetails);
          inProgressCount += 1;
        } else if (tabDetails.status === STATUS_SLEEPING) {
          // ignore
        }
        if (inProgressCount >= _queueProperties.concurrentExecutors) {
          break;
        }
      }
    }

    function processTab(tabDetails) {
      tabDetails.status = STATUS_IN_PROGRESS;
      gsUtils.log(
        tabDetails.tab.id,
        _queueId,
        'Executing executorFn for tab.'
        // tabDetails
      );

      const _resolveTabPromise = r => resolveTabPromise(tabDetails, r);
      const _rejectTabPromise = e => rejectTabPromise(tabDetails, e);
      const _requeueTab = (requeueDelay, executionProps) => {
        requeueTab(tabDetails, requeueDelay, executionProps);
      };

      // If timeout timer has not yet been initiated, then start it now
      if (!tabDetails.hasOwnProperty('timeoutTimer')) {
        tabDetails.timeoutTimer = setTimeout(() => {
          gsUtils.log(tabDetails.tab.id, _queueId, 'Tab job timed out');
          _queueProperties.exceptionFn(
            tabDetails.tab,
            tabDetails.executionProps,
            EXCEPTION_TIMEOUT,
            _resolveTabPromise,
            _rejectTabPromise,
            _requeueTab
          ); //async. unhandled promise
        }, _queueProperties.jobTimeout);
      }

      _queueProperties.executorFn(
        tabDetails.tab,
        tabDetails.executionProps,
        _resolveTabPromise,
        _rejectTabPromise,
        _requeueTab
      ); //async. unhandled promise
    }

    function resolveTabPromise(tabDetails, result) {
      if (!_tabDetailsByTabId[tabDetails.tab.id]) {
        return;
      }
      gsUtils.log(
        tabDetails.tab.id,
        _queueId,
        'Queued tab resolved. Result: ',
        result
      );
      clearTimeout(tabDetails.timeoutTimer);
      removeTabFromQueue(tabDetails);
      tabDetails.deferredPromise.resolve(result);
      requestProcessQueue(_queueProperties.processingDelay);
    }

    function rejectTabPromise(tabDetails, error) {
      if (!_tabDetailsByTabId[tabDetails.tab.id]) {
        return;
      }
      gsUtils.log(
        tabDetails.tab.id,
        _queueId,
        'Queued tab rejected. Error: ',
        error
      );
      clearTimeout(tabDetails.timeoutTimer);
      removeTabFromQueue(tabDetails);
      tabDetails.deferredPromise.reject(error);
      requestProcessQueue(_queueProperties.processingDelay);
    }

    function requeueTab(tabDetails, requeueDelay, executionProps) {
      requeueDelay = requeueDelay || DEFAULT_REQUEUE_DELAY;
      if (executionProps) {
        applyExecutionProps(tabDetails, executionProps);
      }
      tabDetails.requeues += 1;
      gsUtils.log(
        tabDetails.tab.id,
        _queueId,
        `Requeueing tab. Requeues: ${tabDetails.requeues}`
      );
      moveTabToEndOfQueue(tabDetails);
      sleepTab(tabDetails, requeueDelay);
      requestProcessQueue(_queueProperties.processingDelay);
    }

    function sleepTab(tabDetails, delay) {
      tabDetails.status = STATUS_SLEEPING;
      if (tabDetails.sleepTimer) {
        clearTimeout(tabDetails.sleepTimer);
      }
      tabDetails.sleepTimer = window.setTimeout(() => {
        delete tabDetails.sleepTimer;
        tabDetails.status = STATUS_QUEUED;
        requestProcessQueue(0);
      }, delay);
    }

    return {
      EXCEPTION_TIMEOUT,
      setQueueProperties,
      getQueueProperties,
      getTotalQueueSize,
      queueTabAsPromise,
      unqueueTab,
      getQueuedTabDetails,
    };
  })();
}

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsTabCheckManager.js

/*global chrome, localStorage, tgs, gsStorage, gsSession, gsMessages, gsUtils, gsTabDiscardManager, gsChrome, GsTabQueue, gsSuspendedTab */
// eslint-disable-next-line no-unused-vars
var gsTabCheckManager = (function() {
  'use strict';

  const DEFAULT_CONCURRENT_TAB_CHECKS = 3;
  const DEFAULT_TAB_CHECK_TIMEOUT = 15 * 1000;
  const DEFAULT_TAB_CHECK_PROCESSING_DELAY = 500;
  const DEFAULT_TAB_CHECK_REQUEUE_DELAY = 3 * 1000;

  const QUEUE_ID = 'checkQueue';

  let tabCheckQueue;

  // NOTE: This mainly checks suspended tabs
  // For unsuspended tabs, there is no guarantee that the content script will
  // be responsive, but seeing as the timer is kept by the background script, it
  // doesn't really matter.
  // However, when a tab gains focus, there is a check to make sure the content
  // script is responsive, as we then need to rely on the form input and scroll behaviour.
  function initAsPromised() {
    return new Promise(resolve => {
      const queueProps = {
        concurrentExecutors: DEFAULT_CONCURRENT_TAB_CHECKS,
        jobTimeout: DEFAULT_TAB_CHECK_TIMEOUT,
        processingDelay: DEFAULT_TAB_CHECK_PROCESSING_DELAY,
        executorFn: handleTabCheck,
        exceptionFn: handleTabCheckException,
      };
      tabCheckQueue = GsTabQueue(QUEUE_ID, queueProps);
      gsUtils.log('gsTabCheckManager', 'init successful');
      resolve();
    });
  }

  // Suspended tabs that exist or are created before the end of extension
  // initialisation will need to be initialised by this startup script
  async function performInitialisationTabChecks(tabs) {
    // Temporarily change jobTimeout while we are starting up
    const initJobTimeout = Math.max(
      tabs.length * 1000,
      DEFAULT_TAB_CHECK_TIMEOUT
    );
    const initprocessingDelay = DEFAULT_TAB_CHECK_PROCESSING_DELAY;
    updateQueueProps(initJobTimeout, initprocessingDelay);

    const tabCheckPromises = [];
    for (const tab of tabs) {
      if (!gsUtils.isSuspendedTab(tab)) {
        continue;
      }
      tabCheckPromises.push(
        // Set to refetch immediately when being processed on the queue
        // From experience, even if a tab status is 'complete' now, it
        // may actually switch to 'loading' in a few seconds even though a
        // tab reload has not be performed
        queueTabCheckAsPromise(tab, { refetchTab: true }, 3000)
      );
    }

    const results = await Promise.all(tabCheckPromises);

    // Revert timeout
    updateQueueProps(
      DEFAULT_TAB_CHECK_TIMEOUT,
      DEFAULT_TAB_CHECK_PROCESSING_DELAY
    );

    return results;
  }

  function updateQueueProps(jobTimeout, processingDelay) {
    gsUtils.log(
      QUEUE_ID,
      `Setting tabCheckQueue props. jobTimeout: ${jobTimeout}. processingDelay: ${processingDelay}`
    );
    tabCheckQueue.setQueueProperties({
      jobTimeout,
      processingDelay,
    });
  }

  function queueTabCheck(tab, executionProps, processingDelay) {
    queueTabCheckAsPromise(tab, executionProps, processingDelay).catch(e => {
      gsUtils.log(tab.id, QUEUE_ID, e);
    });
  }

  function queueTabCheckAsPromise(tab, executionProps, processingDelay) {
    gsUtils.log(tab.id, QUEUE_ID, `Queuing tab for responsiveness check.`);
    executionProps = executionProps || {};
    return tabCheckQueue.queueTabAsPromise(
      tab,
      executionProps,
      processingDelay
    );
  }

  function getQueuedTabCheckDetails(tab) {
    return tabCheckQueue.getQueuedTabDetails(tab);
  }

  async function handleTabCheckException(
    tab,
    executionProps,
    exceptionType,
    resolve,
    reject,
    requeue
  ) {
    gsUtils.warning(tab.id, `Failed to initialise tab: ${exceptionType}`);
    resolve(false);
  }

  async function handleTabCheck(tab, executionProps, resolve, reject, requeue) {
    if (gsUtils.isSuspendedTab(tab)) {
      checkSuspendedTab(tab, executionProps, resolve, reject, requeue);
    } else if (gsUtils.isNormalTab(tab)) {
      checkNormalTab(tab, executionProps, resolve, reject, requeue);
    }
  }

  async function getUpdatedTab(tab) {
    let _tab = await gsChrome.tabsGet(tab.id);
    if (!_tab) {
      gsUtils.warning(
        tab.id,
        `Failed to initialize tab. Tab may have been discarded or removed.`
      );
      // If we are still initialising, then check for potential discarded tab matches
      if (gsSession.isInitialising()) {
        await queueTabCheckForPotentiallyDiscardedTabs(tab);
      }
    }
    return _tab;
  }

  async function queueTabCheckForPotentiallyDiscardedTabs(tab) {
    // NOTE: For some reason querying by url doesn't work here??
    // TODO: Report chrome bug
    let tabs = await gsChrome.tabsQuery({
      discarded: true,
      windowId: tab.windowId,
    });
    tabs = tabs.filter(o => o.url === tab.url);
    gsUtils.log(
      tab.id,
      QUEUE_ID,
      'Searching for discarded tab matching tab: ',
      tab
    );
    const matchingTab = tabs.find(o => o.index === tab.index);
    if (matchingTab) {
      tabs = [matchingTab];
    }
    for (const tab of tabs) {
      await resuspendSuspendedTab(tab);
      queueTabCheck(tab, { refetchTab: true }, 2000);
    }
  }

  async function checkSuspendedTab(
    tab,
    executionProps,
    resolve,
    reject,
    requeue
  ) {
    if (executionProps.refetchTab) {
      gsUtils.log(
        tab.id,
        QUEUE_ID,
        'Tab refetch requested. Getting updated tab..'
      );
      tab = await getUpdatedTab(tab);
      if (!tab) {
        resolve(gsUtils.STATUS_UNKNOWN);
        return;
      }
      gsUtils.log(tab.id, QUEUE_ID, 'Updated tab: ', tab);

      // Ensure tab is still suspended
      if (!gsUtils.isSuspendedTab(tab)) {
        gsUtils.log(tab.id, 'Tab is no longer suspended. Aborting check.');
        resolve(gsUtils.STATUS_UNKNOWN);
        return;
      }

      // If tab has a state of loading, then requeue for checking later
      if (tab.status === 'loading') {
        gsUtils.log(tab.id, QUEUE_ID, 'Tab is still loading');
        requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, { refetchTab: true });
        return;
      }
    }

    // Make sure tab is registered as a 'view' of the extension
    const suspendedView = tgs.getInternalViewByTabId(tab.id);
    if (!suspendedView) {
      gsUtils.log(
        tab.id,
        'Could not find an internal view for suspended tab.',
        tab
      );
      if (!executionProps.resuspended) {
        const resuspendOk = await resuspendSuspendedTab(tab);
        if (resuspendOk) {
          requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, {
            resuspended: true,
            refetchTab: true,
          });
          return;
        }
        gsUtils.warning(tab.id, 'Failed to resuspend tab');
        resolve(gsUtils.STATUS_UNKNOWN);
        return;
      }
      requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY);
      return;
    }

    // If tab is a file:// tab and file is blocked then unsuspend tab
    if (!gsSession.isFileUrlsAccessAllowed()) {
      const originalUrl = gsUtils.getOriginalUrl(tab.url);
      if (originalUrl && originalUrl.indexOf('file') === 0) {
        gsUtils.log(tab.id, QUEUE_ID, 'Unsuspending blocked local file tab.');
        await unsuspendSuspendedTab(tab);
        requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, { refetchTab: true });
        return;
      }
    }

    const tabSessionOk =
      suspendedView.document.sessionId === gsSession.getSessionId();
    const tabVisibleOk = ensureSuspendedTabVisible(suspendedView);
    const tabBasicsOk = ensureSuspendedTabTitleAndFaviconSet(tab);
    if (!tabSessionOk || !tabVisibleOk || !tabBasicsOk) {
      const tabQueueDetails = tabCheckQueue.getQueuedTabDetails(tab);
      if (!tabQueueDetails) {
        resolve(gsUtils.STATUS_UNKNOWN);
        return;
      }
      try {
        gsUtils.log(tab.id, 'Reinitialising suspendedTab: ', tab);
        await gsSuspendedTab.initTab(tab, suspendedView);
        requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, { refetchTab: true });
      } catch (e) {
        gsUtils.log(tab.id, 'Failed to reinitialise suspendedTab. ', e);
        resolve(gsUtils.STATUS_UNKNOWN);
      }
      return;
    }

    queueForDiscardIfRequired(tab);
    resolve(gsUtils.STATUS_SUSPENDED);
  }

  async function resuspendSuspendedTab(tab) {
    gsUtils.log(tab.id, QUEUE_ID, 'Resuspending unresponsive suspended tab.');
    const suspendedView = tgs.getInternalViewByTabId(tab.id);
    if (suspendedView) {
      tgs.setTabStatePropForTabId(
        tab.id,
        tgs.STATE_DISABLE_UNSUSPEND_ON_RELOAD,
        true
      );
    }
    const reloadOk = await gsChrome.tabsReload(tab.id);
    return reloadOk;
  }

  async function unsuspendSuspendedTab(tab) {
    const originalUrl = gsUtils.getOriginalUrl(tab.url);
    await gsChrome.tabsUpdate(tab.id, { url: originalUrl });
  }

  function queueForDiscardIfRequired(tab) {
    // Do not discard during initialisation
    if (gsSession.isInitialising()) {
      return;
    }
    // If we want to discard tabs after suspending them
    let discardAfterSuspend = gsStorage.getOption(
      gsStorage.DISCARD_AFTER_SUSPEND
    );
    if (discardAfterSuspend && !gsUtils.isDiscardedTab(tab)) {
      gsTabDiscardManager.queueTabForDiscard(tab);
    }
  }

  function ensureSuspendedTabVisible(tabView) {
    if (!tabView) {
      return false;
    }
    const bodyEl = tabView.document.getElementsByTagName('body')[0];
    if (!bodyEl) {
      return false;
    }
    return !bodyEl.classList.contains('hide-initially');
  }

  function ensureSuspendedTabTitleAndFaviconSet(tab) {
    if (!tab.favIconUrl || tab.favIconUrl.indexOf('data:image') !== 0) {
      gsUtils.log(tab.id, QUEUE_ID, 'Tab favicon not set or not dataUrl.', tab);
      return false;
    }
    if (!tab.title) {
      gsUtils.log(tab.id, QUEUE_ID, 'Tab title not set', tab);
      return false;
    }
    return true;
  }

  async function checkNormalTab(tab, executionProps, resolve, reject, requeue) {
    if (executionProps.refetchTab) {
      gsUtils.log(
        tab.id,
        QUEUE_ID,
        'Tab refetch requested. Getting updated tab..'
      );
      tab = await getUpdatedTab(tab);
      if (!tab) {
        resolve(gsUtils.STATUS_UNKNOWN);
        return;
      }
      gsUtils.log(tab.id, QUEUE_ID, 'Updated tab: ', tab);

      // Ensure tab is not suspended
      if (gsUtils.isSuspendedTab(tab, true)) {
        gsUtils.log(tab.id, 'Tab is suspended. Aborting check.');
        resolve(gsUtils.STATUS_SUSPENDED);
        return;
      }

      // If tab has a state of loading, then requeue for checking later
      if (tab.status === 'loading') {
        gsUtils.log(tab.id, QUEUE_ID, 'Tab is still loading');
        requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, { refetchTab: true });
        return;
      }
    }

    if (gsUtils.isDiscardedTab(tab)) {
      if (tab.active) {
        gsUtils.log(
          tab.id,
          QUEUE_ID,
          'Tab is discarded but active. Will wait for auto reload.'
        );
        requeue(500, { refetchTab: true });
      } else {
        gsUtils.log(tab.id, QUEUE_ID, 'Tab is discarded. Will reload.');
        await gsChrome.tabsReload(tab.id);
        requeue(DEFAULT_TAB_CHECK_REQUEUE_DELAY, { refetchTab: true });
      }
      return;
    }

    let tabInfo = await new Promise(r => {
      gsMessages.sendRequestInfoToContentScript(tab.id, (error, tabInfo) =>
        r(tabInfo)
      );
    });

    if (tabInfo) {
      resolve(tabInfo.status);
      return;
    }

    const queuedTabDetails = tabCheckQueue.getQueuedTabDetails(tab);
    if (!queuedTabDetails) {
      gsUtils.log(tab.id, 'Tab missing from suspensionQueue?');
      resolve(gsUtils.STATUS_UNKNOWN);
      return;
    }

    if (tab.active && queuedTabDetails.requeues === 0) {
      gsUtils.log(
        tab.id,
        QUEUE_ID,
        'Tab is not responding but active. Will wait for potential auto reload.'
      );
      requeue(500, { refetchTab: false });
      return;
    }

    tabInfo = await reinjectContentScriptOnTab(tab);
    if (tabInfo) {
      resolve(tabInfo.status);
    } else {
      resolve(gsUtils.STATUS_UNKNOWN);
    }
  }

  // Careful with this function. It seems that these unresponsive tabs can sometimes
  // not return any result after chrome.tabs.executeScript
  // Try to mitigate this by wrapping in a setTimeout
  // TODO: Report chrome bug
  // Unrelated, but reinjecting content scripts has some issues:
  // https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/QLC4gNlYjbA
  // https://bugs.chromium.org/p/chromium/issues/detail?id=649947
  // Notably (for me), the key listener of the old content script remains active
  // if using: window.addEventListener('keydown', formInputListener);
  function reinjectContentScriptOnTab(tab) {
    return new Promise(resolve => {
      gsUtils.log(
        tab.id,
        'Reinjecting contentscript into unresponsive unsuspended tab.',
        tab
      );
      const executeScriptTimeout = setTimeout(() => {
        gsUtils.log(
          tab.id,
          'chrome.tabs.executeScript failed to trigger callback'
        );
        resolve(null);
      }, 10000);
      gsMessages.executeScriptOnTab(tab.id, 'js/contentscript.js', error => {
        clearTimeout(executeScriptTimeout);
        if (error) {
          gsUtils.log(
            tab.id,
            'Failed to execute js/contentscript.js on tab',
            error
          );
          resolve(null);
          return;
        }
        tgs
          .initialiseTabContentScript(tab)
          .then(tabInfo => {
            resolve(tabInfo);
          })
          .catch(error => {
            resolve(null);
          });
      });
    });
  }

  return {
    initAsPromised,
    performInitialisationTabChecks,
    queueTabCheck,
    queueTabCheckAsPromise,
    getQueuedTabCheckDetails,
    ensureSuspendedTabVisible,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsFavicon.js

/*global gsUtils, gsIndexedDb */
// eslint-disable-next-line no-unused-vars
var gsFavicon = (function() {
  'use strict';

  const GOOGLE_S2_URL = 'https://www.google.com/s2/favicons?domain_url=';
  const FALLBACK_CHROME_FAVICON_META = {
    favIconUrl: 'chrome://favicon/size/16@2x/tgsDefaultFavicon',
    isDark: true,
    normalisedDataUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4T2NkoBAwIuuPior6j8O8xmXLljVgk8MwYNmyZdgMfcjAwLAAmyFEGfDv3z9FJiamA9gMIcoAkKsiIiIUsBlClAHofkf2JkED0DWDAnrUgOEfBsRkTpzpgBjN6GoA24V1Efr1zoAAAAAASUVORK5CYII=',
    transparentDataUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4T2NkoBAwIuuPioqqx2YeExPTwSVLlhzAJodhwLJlyxrRDWVkZPzIyMh4AZshRBnAxsY28ffv3wnYDCHKAJCrEhISBLAZQpQB6H5H9iZBA9A1gwJ61IDhHwbEZE6c6YAYzehqAAmQeBHM42eMAAAAAElFTkSuQmCC',
  };
  const FALLBACK_TGS_FAVICON_META = {
    favIconUrl: chrome.extension.getURL('img/ic_suspendy_16x16.png'),
    isDark: false,
    normalisedDataUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABNUlEQVQ4T2NkQAPqMz+sZ2RgDPjP8J+BkYERLPufgQHM+s/wf+3NdIEQZC0QFUhAY9aH1f//M4IVQTTBNYMMXHEjnT8SxYAt02qmMTAwZHYyp4AVv2YQBMsjmwwzBCQmzPAeLFf+dw5I2XTGLdNq/lvoq6I7hCj+iYu3GQahAZ+/fWfg5eIk3QugaJu0aDND+5z1DAvb8hjcbQxRDPn7/x9DQeschpv3nzBsnFbDwMnOxoASBv/+/2PQ8c5hePXxK4ObpR7Dsp5iFAO+//zF4JRQw3D70UuGW9unMgjx8aAaAFL9+OUbht1HzjOEetqAvbFh30mGKzceMBjrqTJ42hgx/Pz9m+Hnr98MfNxcYMMJxsLVO48ZyvsWMHQWxTNoq8hhhAtBAwiF5DAyAJyZCPkXh/x0AD8FpQXQTF64AAAAAElFTkSuQmCC',
    transparentDataUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABNUlEQVQ4T2NkQANqMz6EMzEyavxjYGBggsrB2P8Z/1+/mSawClkLI7oB6jM/hP5nYNQCiYMMgGkG04z/r9xIE1iLYsCWaVXejIxMJu1MqWDxVwwCYBpmO4iN7BoRhg9g+cp/sxn+//93hnHr9Jp6Cz1VdIcQxT9x6TbDIDTg07cfDHxcHKR7ARRQExduZOiYs4FhYXseg4eNIYohfxj+MeQ3z2a49eAJw8bptQxcbGwMKGHwj+Efg7ZnNsOrT98Y3Cz0GJb3FqMY8O3XLwbH+GqGO49eMdzePpVBiI8H1QCQ6kev3jDsOXyeIcTTFuyNDftOMly+/oDBWF+FwcvGmOHHnz8Mv379YuDj4gIbTjAWrtx5wlDeO5+hszieQUdFDiNcCBpAKCSHiwGwzETIv9jkQZkJACgqnoPT5d2xAAAAAElFTkSuQmCC',
  };

  const _defaultFaviconFingerprintById = {};
  let _defaultChromeFaviconMeta;
  let _defaultTgsFaviconMeta;

  async function initAsPromised() {
    await buildDefaultTgsFaviconMeta();
    await buildDefaultChromeFaviconMeta();
    gsUtils.log('gsFavicon', 'init successful');
  }

  async function buildDefaultChromeFaviconMeta() {
    // Specify a url that will definitely not exist in the chrome favicon cache
    const chromeFavIconUrl = generateChromeFavIconUrlFromUrl(
      'tgsDefaultFavicon'
    );
    try {
      _defaultChromeFaviconMeta = await gsUtils.executeWithRetries(
        buildFaviconMetaData,
        [chromeFavIconUrl],
        4,
        0
      );
    } catch (e) {
      gsUtils.warning('gsFavicon', e);
    }
    if (!_defaultChromeFaviconMeta) {
      gsUtils.warning('gsFavicon', 'Failed to build _defaultChromeFaviconMeta');
      _defaultChromeFaviconMeta = FALLBACK_CHROME_FAVICON_META;
    }
    addFaviconMetaToDefaultFingerprints(
      _defaultChromeFaviconMeta,
      'chromeFavicon'
    );
  }

  async function buildDefaultTgsFaviconMeta() {
    const tgsFavIconUrl = chrome.extension.getURL('img/ic_suspendy_16x16.png');
    try {
      _defaultTgsFaviconMeta = await gsUtils.executeWithRetries(
        buildFaviconMetaData,
        [tgsFavIconUrl],
        4,
        0
      );
    } catch (e) {
      gsUtils.warning('gsFavicon', e);
    }
    if (!_defaultTgsFaviconMeta) {
      gsUtils.warning('gsFavicon', 'Failed to build _defaultTgsFaviconMeta');
      _defaultTgsFaviconMeta = FALLBACK_TGS_FAVICON_META;
    }
    addFaviconMetaToDefaultFingerprints(_defaultTgsFaviconMeta, 'tgsFavicon');
  }

  async function addFaviconMetaToDefaultFingerprints(faviconMeta, id) {
    _defaultFaviconFingerprintById[id] = await createImageFingerprint(
      faviconMeta.normalisedDataUrl
    );
    _defaultFaviconFingerprintById[
      id + 'Transparent'
    ] = await createImageFingerprint(faviconMeta.transparentDataUrl);
  }

  function generateChromeFavIconUrlFromUrl(url) {
    return 'chrome://favicon/size/16@2x/' + url;
  }

  async function getFaviconMetaData(tab) {
    if (gsUtils.isFileTab(tab)) {
      return _defaultChromeFaviconMeta;
    }

    // First try to fetch from cache
    let originalUrl = tab.url;
    if (gsUtils.isSuspendedTab(tab)) {
      originalUrl = gsUtils.getOriginalUrl(tab.url);
    }
    let faviconMeta = await getCachedFaviconMetaData(originalUrl);
    if (faviconMeta) {
      // gsUtils.log(
      //   tab.id,
      //   'Found favicon cache hit for url: ' + originalUrl,
      //   faviconMeta
      // );
      return faviconMeta;
    }

    // Else try to build from chrome's favicon cache
    faviconMeta = await buildFaviconMetaFromChromeFaviconCache(originalUrl);
    if (faviconMeta) {
      gsUtils.log(tab.id, 'Built faviconMeta from chrome cache', faviconMeta);
      // Save to tgs favicon cache
      await saveFaviconMetaDataToCache(originalUrl, faviconMeta);
      return faviconMeta;
    }

    // Else try to build from tab.favIconUrl
    gsUtils.log(
      tab.id,
      'No entry in chrome favicon cache for url: ' + originalUrl
    );
    if (
      tab.favIconUrl &&
      tab.favIconUrl !== chrome.extension.getURL('img/ic_suspendy_16x16.png')
    ) {
      faviconMeta = await buildFaviconMetaFromTabFavIconUrl(tab.favIconUrl);
      if (faviconMeta) {
        gsUtils.log(
          tab.id,
          'Built faviconMeta from tab.favIconUrl',
          faviconMeta
        );
        return faviconMeta;
      }
    }

    // Else try to fetch from google
    // if (fallbackToGoogle) {
    //   const rootUrl = encodeURIComponent(gsUtils.getRootUrl(originalUrl));
    //   const tabFavIconUrl = GOOGLE_S2_URL + rootUrl;
    //   //TODO: Handle reject case below
    //   faviconMeta = await buildFaviconMetaData(tabFavIconUrl, 5000);
    //   faviconMetaValid = await isFaviconMetaValid(faviconMeta);
    //   if (faviconMetaValid) {
    //     gsUtils.log(
    //       tab.id,
    //       'Built faviconMeta from google.com/s2 service',
    //       faviconMeta
    //     );
    //     return faviconMeta;
    //   }
    // }

    // Else return the default chrome favicon
    gsUtils.log(tab.id, 'Failed to build faviconMeta. Using default icon');
    return _defaultChromeFaviconMeta;
  }

  async function buildFaviconMetaFromChromeFaviconCache(url) {
    const chromeFavIconUrl = generateChromeFavIconUrlFromUrl(url);
    try {
      const faviconMeta = await buildFaviconMetaData(chromeFavIconUrl);
      const faviconMetaValid = await isFaviconMetaValid(faviconMeta);
      if (faviconMetaValid) {
        return faviconMeta;
      }
    } catch (e) {
      gsUtils.warning('gsUtils', e);
    }
    return null;
  }

  async function buildFaviconMetaFromTabFavIconUrl(favIconUrl) {
    try {
      const faviconMeta = await buildFaviconMetaData(favIconUrl);
      const faviconMetaValid = await isFaviconMetaValid(faviconMeta);
      if (faviconMetaValid) {
        return faviconMeta;
      }
    } catch (e) {
      gsUtils.warning('gsUtils', e);
    }
    return null;
  }

  async function getCachedFaviconMetaData(url) {
    const fullUrl = gsUtils.getRootUrl(url, true, false);
    let faviconMetaData = await gsIndexedDb.fetchFaviconMeta(fullUrl);
    if (!faviconMetaData) {
      const rootUrl = gsUtils.getRootUrl(url, false, false);
      faviconMetaData = await gsIndexedDb.fetchFaviconMeta(rootUrl);
    }
    return faviconMetaData || null;
  }

  async function saveFaviconMetaDataToCache(url, faviconMeta) {
    const fullUrl = gsUtils.getRootUrl(url, true, false);
    const rootUrl = gsUtils.getRootUrl(url, false, false);
    gsUtils.log(
      'gsFavicon',
      'Saving favicon cache entry for: ' + fullUrl,
      faviconMeta
    );
    await gsIndexedDb.addFaviconMeta(fullUrl, Object.assign({}, faviconMeta));
    await gsIndexedDb.addFaviconMeta(rootUrl, Object.assign({}, faviconMeta));
  }

  // dont use this function as it causes rate limit issues
  // eslint-disable-next-line no-unused-vars
  function fetchFallbackFaviconDataUrl(url) {
    return new Promise(resolve => {
      let imageLoaded = false;

      const rootUrl = gsUtils.encodeString(gsUtils.getRootUrl(url));
      const requestUrl = GOOGLE_S2_URL + rootUrl;

      const xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open('GET', requestUrl, true);

      xmlHTTP.responseType = 'arraybuffer';
      xmlHTTP.onload = function(e) {
        imageLoaded = true;
        const arr = new Uint8Array(xmlHTTP.response);
        const raw = String.fromCharCode.apply(null, arr);
        const b64 = btoa(raw);
        const dataUrl = 'data:image/png;base64,' + b64;
        resolve(dataUrl);
      };
      xmlHTTP.send();
      setTimeout(() => {
        if (!imageLoaded) {
          gsUtils.log('gsFavicon', 'Failed to load image from: ' + url);
          resolve(null);
        }
      }, 3000);
    });
  }

  async function isFaviconMetaValid(faviconMeta) {
    if (
      !faviconMeta ||
      faviconMeta.normalisedDataUrl === 'data:,' ||
      faviconMeta.transparentDataUrl === 'data:,'
    ) {
      return false;
    }
    const normalisedFingerprint = await createImageFingerprint(
      faviconMeta.normalisedDataUrl
    );
    const transparentFingerprint = await createImageFingerprint(
      faviconMeta.transparentDataUrl
    );

    for (let id of Object.keys(_defaultFaviconFingerprintById)) {
      const defaultFaviconFingerprint = _defaultFaviconFingerprintById[id];
      if (
        normalisedFingerprint === defaultFaviconFingerprint ||
        transparentFingerprint === defaultFaviconFingerprint
      ) {
        gsUtils.log(
          'gsFavicon',
          'FaviconMeta not valid as it matches fingerprint of default favicon: ' +
            id,
          faviconMeta
        );
        return false;
      }
    }
    return true;
  }

  // Turns the img into a 16x16 black and white dataUrl
  function createImageFingerprint(dataUrl) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = async function() {
        const canvas = window.document.createElement('canvas');
        const context = canvas.getContext('2d');
        const threshold = 80;

        canvas.width = 16;
        canvas.height = 16;
        context.drawImage(img, 0, 0, 16, 16);

        const imageData = context.getImageData(0, 0, 16, 16);
        for (var i = 0; i < imageData.data.length; i += 4) {
          var luma = Math.floor(
            imageData.data[i] * 0.3 +
              imageData.data[i + 1] * 0.59 +
              imageData.data[i + 2] * 0.11
          );
          imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] =
            luma > threshold ? 255 : 0;
          imageData.data[i + 3] = 255;
        }
        context.putImageData(imageData, 0, 0);
        const fingerprintDataUrl = canvas.toDataURL('image/png');
        resolve(fingerprintDataUrl);
      };
      img.src = dataUrl;
    });
  }

  function buildFaviconMetaData(url) {
    const timeout = 5 * 1000;
    return new Promise((resolve, reject) => {
      const img = new Image();
      // 12-16-2018 ::: @CollinChaffin ::: Anonymous declaration required to prevent terminating cross origin security errors
      // 12-16-2018 ::: @CollinChaffin ::: http://bit.ly/2BolEqx
      // 12-16-2018 ::: @CollinChaffin ::: https://bugs.chromium.org/p/chromium/issues/detail?id=409090#c23
      // 12-16-2018 ::: @CollinChaffin ::: https://bugs.chromium.org/p/chromium/issues/detail?id=718352#c10
      img.crossOrigin = 'Anonymous';
      let imageLoaded = false;

      img.onload = () => {
        imageLoaded = true;

        let canvas;
        let context;
        canvas = window.document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        let imageData;
        try {
          imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {
          reject(e);
          return;
        }

        const origDataArray = imageData.data;
        const normalisedDataArray = new Uint8ClampedArray(origDataArray);
        const transparentDataArray = new Uint8ClampedArray(origDataArray);

        let r, g, b, a;
        let fuzzy = 0.1;
        let light = 0;
        let dark = 0;
        let maxAlpha = 0;
        let maxRgb = 0;

        for (let x = 0; x < origDataArray.length; x += 4) {
          r = origDataArray[x];
          g = origDataArray[x + 1];
          b = origDataArray[x + 2];
          a = origDataArray[x + 3];

          let localMaxRgb = Math.max(Math.max(r, g), b);
          if (localMaxRgb < 128 || a < 128) dark++;
          else light++;
          maxAlpha = Math.max(a, maxAlpha);
          maxRgb = Math.max(localMaxRgb, maxRgb);
        }

        //saftey check to make sure image is not completely transparent
        if (maxAlpha === 0) {
          reject(
            'Aborting favicon generation as image is completely transparent. url: ' +
              url
          );
          return;
        }

        const darkLightDiff = (light - dark) / (canvas.width * canvas.height);
        const isDark = darkLightDiff + fuzzy < 0;
        const normaliserMultiple = 1 / (maxAlpha / 255);

        for (let x = 0; x < origDataArray.length; x += 4) {
          a = origDataArray[x + 3];
          normalisedDataArray[x + 3] = parseInt(a * normaliserMultiple, 10);
        }
        for (let x = 0; x < normalisedDataArray.length; x += 4) {
          a = normalisedDataArray[x + 3];
          transparentDataArray[x + 3] = parseInt(a * 0.5, 10);
        }

        imageData.data.set(normalisedDataArray);
        context.putImageData(imageData, 0, 0);
        const normalisedDataUrl = canvas.toDataURL('image/png');

        imageData.data.set(transparentDataArray);
        context.putImageData(imageData, 0, 0);
        const transparentDataUrl = canvas.toDataURL('image/png');

        const faviconMetaData = {
          favIconUrl: url,
          isDark,
          normalisedDataUrl,
          transparentDataUrl,
        };
        resolve(faviconMetaData);
      };
      img.src = url;
      setTimeout(() => {
        if (!imageLoaded) {
          reject('Failed to load img.src of: ' + url);
        }
      }, timeout);
    });
  }

  return {
    initAsPromised,
    getFaviconMetaData,
    generateChromeFavIconUrlFromUrl,
    buildFaviconMetaFromChromeFaviconCache,
    saveFaviconMetaDataToCache,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsTabSuspendManager.js

/*global html2canvas, domtoimage, tgs, gsFavicon, gsMessages, gsStorage, gsUtils, gsChrome, gsIndexedDb, gsTabDiscardManager, GsTabQueue */
// eslint-disable-next-line no-unused-vars
var gsTabSuspendManager = (function() {
  'use strict';

  const DEFAULT_CONCURRENT_SUSPENSIONS = 3;
  const DEFAULT_SUSPENSION_TIMEOUT = 60 * 1000;

  let _suspensionQueue;

  function initAsPromised() {
    return new Promise(async function(resolve) {
      const screenCaptureMode = gsStorage.getOption(gsStorage.SCREEN_CAPTURE);
      const forceScreenCapture = gsStorage.getOption(
        gsStorage.SCREEN_CAPTURE_FORCE
      );
      //TODO: This should probably update when the screencapture mode changes
      const concurrentSuspensions =
        screenCaptureMode === '0' ? 5 : DEFAULT_CONCURRENT_SUSPENSIONS;
      const suspensionTimeout = forceScreenCapture
        ? 5 * 60 * 1000
        : DEFAULT_SUSPENSION_TIMEOUT;
      const queueProps = {
        concurrentExecutors: concurrentSuspensions,
        jobTimeout: suspensionTimeout,
        executorFn: performSuspension,
        exceptionFn: handleSuspensionException,
      };
      _suspensionQueue = GsTabQueue('suspensionQueue', queueProps);
      gsUtils.log('gsTabSuspendManager', 'init successful');
      resolve();
    });
  }

  function queueTabForSuspension(tab, forceLevel) {
    queueTabForSuspensionAsPromise(tab, forceLevel).catch(e => {
      gsUtils.log(tab.id, e);
    });
  }

  function queueTabForSuspensionAsPromise(tab, forceLevel) {
    if (typeof tab === 'undefined') return Promise.resolve();

    if (!checkTabEligibilityForSuspension(tab, forceLevel)) {
      gsUtils.log(tab.id, 'Tab not eligible for suspension.');
      return Promise.resolve();
    }

    gsUtils.log(tab.id, 'Queueing tab for suspension.');
    return _suspensionQueue.queueTabAsPromise(tab, { forceLevel });
  }

  function unqueueTabForSuspension(tab) {
    const removed = _suspensionQueue.unqueueTab(tab);
    if (removed) {
      gsUtils.log(tab.id, `Removed tab from suspension queue.`);
    }
  }

  async function performSuspension(
    tab,
    executionProps,
    resolve,
    reject,
    requeue
  ) {
    let screenCaptureMode = gsStorage.getOption(gsStorage.SCREEN_CAPTURE);
    const discardInPlaceOfSuspend = gsStorage.getOption(
      gsStorage.DISCARD_IN_PLACE_OF_SUSPEND
    );
    if (discardInPlaceOfSuspend) {
      screenCaptureMode = '0';
    }

    let tabInfo = await getContentScriptTabInfo(tab);
    // If tabInfo is null this is usually due to tab loading, being discarded or 'parked' on chrome restart
    if (!tabInfo) {
      // If we need to make a screen capture and tab is not responding then reload it
      // TODO: This doesn't actually seem to work
      // Tabs that have just been reloaded usually fail to run the screen capture script :(
      if (
        tab.status !== 'loading' &&
        screenCaptureMode !== '0' &&
        !executionProps.reloaded
      ) {
        gsUtils.log(
          tab.id,
          'Tab is not responding. Will reload for screen capture.'
        );
        tgs.setTabStatePropForTabId(
          tab.id,
          tgs.STATE_SUSPEND_ON_RELOAD_URL,
          tab.url
        );
        await gsChrome.tabsUpdate(tab.id, { url: tab.url });
        // allow up to 30 seconds for tab to reload and trigger its subsequent suspension request
        // note that this will not reset the DEFAULT_SUSPENSION_TIMEOUT of 60 seconds
        requeue(30000, { reloaded: true });
        return;
      }
      tabInfo = {
        status: 'loading',
        scrollPos: '0',
      };
    }

    const isEligible = checkContentScriptEligibilityForSuspension(
      tabInfo.status,
      executionProps.forceLevel
    );
    if (!isEligible) {
      gsUtils.log(
        tab.id,
        `Content script status of ${
          tabInfo.status
        } not eligible for suspension. Removing tab from suspensionQueue.`
      );
      resolve(false);
      return;
    }

    const updatedUrl = await generateUrlWithYouTubeTimestamp(tab);
    tab.url = updatedUrl;
    await saveSuspendData(tab);

    const suspendedUrl = gsUtils.generateSuspendedUrl(
      updatedUrl,
      tab.title,
      tabInfo.scrollPos
    );
    executionProps.suspendedUrl = suspendedUrl;

    if (screenCaptureMode === '0') {
      const success = await executeTabSuspension(tab, suspendedUrl);
      resolve(success);
      return;
    }

    // Hack. Save handle to resolve function so we can call it later
    executionProps.resolveFn = resolve;
    requestGeneratePreviewImage(tab); //async
    gsUtils.log(tab.id, 'Preview generation script started successfully.');
    // resumeQueuedTabSuspension is called on the 'savePreviewData' message response
    // this will refetch the queued tabDetails and call executionProps.resolveFn(true)
  }

  function handlePreviewImageResponse(tab, previewUrl, errorMsg) {
    if (previewUrl) {
      gsIndexedDb
        .addPreviewImage(tab.url, previewUrl)
        .then(() => resumeQueuedTabSuspension(tab)); //async. unhandled promise.
    } else {
      gsUtils.warning(tab.id, 'savePreviewData reported an error: ', errorMsg);
      resumeQueuedTabSuspension(tab); //async. unhandled promise.
    }
  }

  async function resumeQueuedTabSuspension(tab) {
    const queuedTabDetails = _suspensionQueue.getQueuedTabDetails(tab);
    if (!queuedTabDetails) {
      gsUtils.log(
        tab.id,
        'Tab missing from suspensionQueue. Assuming suspension cancelled for this tab.'
      );
      return;
    }

    const suspensionForceLevel = queuedTabDetails.executionProps.forceLevel;
    if (!checkTabEligibilityForSuspension(tab, suspensionForceLevel)) {
      gsUtils.log(
        tab.id,
        'Tab is no longer eligible for suspension. Removing tab from suspensionQueue.'
      );
      return;
    }

    const success = await executeTabSuspension(
      tab,
      queuedTabDetails.executionProps.suspendedUrl
    );
    queuedTabDetails.executionProps.resolveFn(success);
  }

  async function handleSuspensionException(
    tab,
    executionProps,
    exceptionType,
    resolve,
    reject,
    requeue
  ) {
    if (exceptionType === _suspensionQueue.EXCEPTION_TIMEOUT) {
      gsUtils.log(
        tab.id,
        `Tab took more than ${
          _suspensionQueue.getQueueProperties().jobTimeout
        }ms to suspend. Will force suspension.`
      );
      const success = await executeTabSuspension(
        tab,
        executionProps.suspendedUrl
      );
      resolve(success);
    } else {
      gsUtils.warning(tab.id, `Failed to suspend tab: ${exceptionType}`);
      resolve(false);
    }
  }

  function executeTabSuspension(tab, suspendedUrl) {
    return new Promise(resolve => {
      // If we want to force tabs to be discarded instead of suspending them
      let discardInPlaceOfSuspend = gsStorage.getOption(
        gsStorage.DISCARD_IN_PLACE_OF_SUSPEND
      );
      if (discardInPlaceOfSuspend) {
        tgs.clearAutoSuspendTimerForTabId(tab.id);
        gsTabDiscardManager.queueTabForDiscard(tab);
        resolve();
        return;
      }

      if (!suspendedUrl) {
        gsUtils.log(tab.id, 'executionProps.suspendedUrl not set!');
        suspendedUrl = gsUtils.generateSuspendedUrl(tab.url, tab.title, 0);
      }

      gsMessages.sendConfirmSuspendToContentScript(
        tab.id,
        suspendedUrl,
        async error => {
          let success = true;
          if (error) {
            gsUtils.warning(
              tab.id,
              'Failed to sendConfirmSuspendToContentScript',
              error
            );
            // Will not be able to use window.replace when forcing suspension
            success = await forceTabSuspension(tab, suspendedUrl);
          }
          resolve(success);
        }
      );
    });
  }

  async function forceTabSuspension(tab, suspendedUrl) {
    if (gsUtils.isSuspendedTab(tab, true)) {
      gsUtils.log(tab.id, 'Tab already suspended');
      return;
    }
    const updatedTab = await gsChrome.tabsUpdate(tab.id, { url: suspendedUrl });
    return updatedTab !== null;
  }

  // forceLevel indicates which users preferences to respect when attempting to suspend the tab
  // 1: Suspend if at all possible
  // 2: Respect whitelist, temporary whitelist, form input, pinned tabs, audible preferences, and exclude current active tab
  // 3: Same as above (2), plus also respect internet connectivity, running on battery, and time to suspend=never preferences.
  function checkTabEligibilityForSuspension(tab, forceLevel) {
    if (forceLevel >= 1) {
      if (gsUtils.isSuspendedTab(tab, true) || gsUtils.isSpecialTab(tab)) {
        return false;
      }
    }
    if (forceLevel >= 2) {
      if (
        gsUtils.isProtectedActiveTab(tab) ||
        gsUtils.checkWhiteList(tab.url) ||
        gsUtils.isProtectedPinnedTab(tab) ||
        gsUtils.isProtectedAudibleTab(tab)
      ) {
        return false;
      }
    }
    if (forceLevel >= 3) {
      if (
        gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE) &&
        !navigator.onLine
      ) {
        return false;
      }
      if (
        gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING) &&
        tgs.isCharging()
      ) {
        return false;
      }
      if (gsStorage.getOption(gsStorage.SUSPEND_TIME) === '0') {
        return false;
      }
    }
    return true;
  }

  function checkContentScriptEligibilityForSuspension(
    contentScriptStatus,
    forceLevel
  ) {
    if (
      forceLevel >= 2 &&
      (contentScriptStatus === gsUtils.STATUS_FORMINPUT ||
        contentScriptStatus === gsUtils.STATUS_TEMPWHITELIST)
    ) {
      return false;
    }
    return true;
  }

  function getContentScriptTabInfo(tab) {
    return new Promise(resolve => {
      gsMessages.sendRequestInfoToContentScript(tab.id, (error, tabInfo) => {
        //TODO: Should we wait here for the tab to load? Doesnt seem to matter..
        if (error) {
          gsUtils.warning(tab.id, 'Failed to get content script info', error);
          // continue here but will lose information about scroll position,
          // temp whitelist, and form input
        }
        resolve(tabInfo);
      });
    });
  }

  function generateUrlWithYouTubeTimestamp(tab) {
    return new Promise(resolve => {
      if (tab.url.indexOf('https://www.youtube.com/watch') < 0) {
        resolve(tab.url);
        return;
      }

      gsMessages.executeCodeOnTab(
        tab.id,
        `(${fetchYouTubeTimestampContentScript})();`,
        (error, response) => {
          if (error) {
            gsUtils.warning(tab.id, 'Failed to fetch YouTube timestamp', error);
          }
          if (!response) {
            resolve(tab.url);
            return;
          }

          const timestamp = response;
          const youTubeUrl = new URL(tab.url);
          youTubeUrl.searchParams.set('t', timestamp + 's');
          resolve(youTubeUrl.href);
        }
      );
    });
  }

  function fetchYouTubeTimestampContentScript() {
    const videoEl = document.querySelector(
      'video.video-stream.html5-main-video'
    );
    const timestamp = videoEl ? videoEl.currentTime >> 0 : 0;
    return timestamp;
  }

  async function saveSuspendData(tab) {
    const tabProperties = {
      date: new Date(),
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl,
      pinned: tab.pinned,
      index: tab.index,
      windowId: tab.windowId,
    };
    await gsIndexedDb.addSuspendedTabInfo(tabProperties);

    const faviconMeta = await gsFavicon.buildFaviconMetaFromChromeFaviconCache(
      tab.url
    );
    if (faviconMeta) {
      gsFavicon.saveFaviconMetaDataToCache(tab.url, faviconMeta);
    }
  }

  function requestGeneratePreviewImage(tab) {
    // Will not implement this for now as it does not actually capture the whole
    // screen, just the visible area
    // NOTE: It also requires the <all_urls> manifest permission
    // if (tab.active) {
    //   chrome.tabs.captureVisibleTab(
    //     tab.windowId,
    //     { format: 'png' },
    //     dataUrl => {
    //       handlePreviewImageResponse(tab, dataUrl, chrome.runtime.lastError);
    //     }
    //   );
    //   return;
    // }

    const screenCaptureMode = gsStorage.getOption(gsStorage.SCREEN_CAPTURE);
    const forceScreenCapture = gsStorage.getOption(
      gsStorage.SCREEN_CAPTURE_FORCE
    );
    const useAlternateScreenCaptureLib = gsStorage.getOption(
      gsStorage.USE_ALT_SCREEN_CAPTURE_LIB
    );
    const screenCaptureLib = useAlternateScreenCaptureLib
      ? 'js/dom-to-image.js'
      : 'js/html2canvas.min.js';
    gsUtils.log(tab.id, `Injecting ${screenCaptureLib} into content script`);
    gsMessages.executeScriptOnTab(tab.id, screenCaptureLib, error => {
      if (error) {
        handlePreviewImageResponse(tab, null, 'Failed to executeScriptOnTab');
        return;
      }
      gsMessages.executeCodeOnTab(
        tab.id,
        `(${generatePreviewImageCanvasViaContentScript})("${screenCaptureMode}", ${forceScreenCapture}, ${useAlternateScreenCaptureLib});`,
        error => {
          if (error) {
            handlePreviewImageResponse(
              tab,
              null,
              'Failed to executeCodeOnTab: generatePreviewImgContentScript'
            );
            return;
          }
        }
      );
    });
  }

  // NOTE: This function below is run within the content script scope
  // Therefore it must be self contained and not refer to any external functions
  // eslint-disable-next-line no-unused-vars
  async function generatePreviewImageCanvasViaContentScript(
    screenCaptureMode,
    forceScreenCapture,
    useAlternateScreenCaptureLib
  ) {
    const MAX_CANVAS_HEIGHT = forceScreenCapture ? 10000 : 5000;
    const IMAGE_TYPE = 'image/webp';
    const IMAGE_QUALITY = forceScreenCapture ? 0.92 : 0.5;

    let height = 0;
    let width = 0;

    //check where we need to capture the whole screen
    if (screenCaptureMode === '2') {
      height = Math.max(
        window.innerHeight,
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      // cap the max height otherwise it fails to convert to a data url
      height = Math.min(height, MAX_CANVAS_HEIGHT);
    } else {
      height = window.innerHeight;
    }
    width = document.body.clientWidth;

    let generateCanvas;
    if (useAlternateScreenCaptureLib) {
      // console.log('Generating via dom-to-image..');
      generateCanvas = () => {
        return domtoimage.toCanvas(document.body, {}).then(canvas => {
          const croppedCanvas = document.createElement('canvas');
          const context = croppedCanvas.getContext('2d');
          croppedCanvas.width = width;
          croppedCanvas.height = height;
          context.drawImage(canvas, 0, 0);
          return croppedCanvas;
        });
      };
    } else {
      // console.log('Generating via html2canvas..');
      generateCanvas = () => {
        return html2canvas(document.body, {
          height: height,
          width: width,
          logging: false,
          imageTimeout: 10000,
          removeContainer: false,
          async: true,
        });
      };
    }

    const generateDataUrl = canvas => {
      let dataUrl = canvas.toDataURL(IMAGE_TYPE, IMAGE_QUALITY);
      if (!dataUrl || dataUrl === 'data:,') {
        dataUrl = canvas.toDataURL();
      }
      if (dataUrl === 'data:,') {
        dataUrl = null;
      }
      return dataUrl;
    };

    let dataUrl;
    let errorMsg;
    try {
      const canvas = await generateCanvas();
      // console.log('generating dataUrl..');
      dataUrl = generateDataUrl(canvas);
    } catch (err) {
      errorMsg = err.message;
    }
    if (!dataUrl && !errorMsg) {
      errorMsg = 'Failed to generate dataUrl';
    }
    // console.log('saving previewData..');
    chrome.runtime.sendMessage({
      action: 'savePreviewData',
      previewUrl: dataUrl,
      errorMsg: errorMsg,
    });
  }

  return {
    initAsPromised,
    queueTabForSuspension,
    queueTabForSuspensionAsPromise,
    unqueueTabForSuspension,
    handlePreviewImageResponse,
    resumeQueuedTabSuspension,
    saveSuspendData,
    checkTabEligibilityForSuspension,
    forceTabSuspension,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsTabDiscardManager.js

/*global chrome, localStorage, tgs, gsUtils, gsChrome, GsTabQueue, gsTabSuspendManager */
// eslint-disable-next-line no-unused-vars
var gsTabDiscardManager = (function() {
  'use strict';

  const DEFAULT_CONCURRENT_DISCARDS = 5;
  const DEFAULT_DISCARD_TIMEOUT = 5 * 1000;

  const QUEUE_ID = 'discardQueue';

  let discardQueue;

  function initAsPromised() {
    return new Promise(resolve => {
      const queueProps = {
        concurrentExecutors: DEFAULT_CONCURRENT_DISCARDS,
        jobTimeout: DEFAULT_DISCARD_TIMEOUT,
        executorFn: performDiscard,
        exceptionFn: handleDiscardException,
      };
      discardQueue = GsTabQueue(QUEUE_ID, queueProps);
      gsUtils.log('gsTabDiscardManager', 'init successful');
      resolve();
    });
  }

  // Discard all suspended tabs currently open during extension initialisation
  async function performInitialisationTabDiscards(tabs) {
    const tabDiscardPromises = [];
    for (const tab of tabs) {
      if (!gsUtils.isSuspendedTab(tab) || gsUtils.isDiscardedTab(tab)) {
        continue;
      }
      tabDiscardPromises.push(queueTabForDiscardAsPromise(tab, {}, 0));
    }
    const results = await Promise.all(tabDiscardPromises);
    return results;
  }

  function queueTabForDiscard(tab, executionProps, processingDelay) {
    queueTabForDiscardAsPromise(tab, executionProps, processingDelay).catch(
      e => {
        gsUtils.log(tab.id, QUEUE_ID, e);
      }
    );
  }

  function queueTabForDiscardAsPromise(tab, executionProps, processingDelay) {
    gsUtils.log(tab.id, QUEUE_ID, `Queuing tab for discarding.`);
    executionProps = executionProps || {};
    return discardQueue.queueTabAsPromise(tab, executionProps, processingDelay);
  }

  function unqueueTabForDiscard(tab) {
    const removed = discardQueue.unqueueTab(tab);
    if (removed) {
      gsUtils.log(tab.id, QUEUE_ID, `Removed tab from discard queue.`);
    }
  }

  // This is called remotely by the discardQueue
  // So we must first re-fetch the tab in case it has changed
  async function performDiscard(tab, executionProps, resolve, reject, requeue) {
    let _tab = null;
    try {
      _tab = await gsChrome.tabsGet(tab.id);
    } catch (error) {
      // assume tab has been discarded
    }
    if (!_tab) {
      gsUtils.warning(
        tab.id,
        `Failed to discard tab. Tab may have already been discarded or removed.`
      );
      resolve(false);
      return;
    }
    tab = _tab;

    if (gsUtils.isSuspendedTab(tab) && tab.status === 'loading') {
      gsUtils.log(tab.id, QUEUE_ID, 'Tab is still loading');
      requeue();
      return;
    }
    if (tgs.isCurrentActiveTab(tab)) {
      gsUtils.log(tab.id, QUEUE_ID, 'Tab is active. Aborting discard.');
      resolve(false);
      return;
    }
    if (gsUtils.isDiscardedTab(tab)) {
      gsUtils.log(tab.id, QUEUE_ID, 'Tab already discarded');
      resolve(false);
      return;
    }
    gsUtils.log(tab.id, QUEUE_ID, 'Forcing discarding of tab.');
    chrome.tabs.discard(tab.id, () => {
      if (chrome.runtime.lastError) {
        gsUtils.warning(tab.id, chrome.runtime.lastError);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  function handleDiscardException(
    tab,
    executionProps,
    exceptionType,
    resolve,
    reject,
    requeue
  ) {
    gsUtils.warning(tab.id, `Failed to discard tab: ${exceptionType}`);
    resolve(false);
  }

  async function handleDiscardedUnsuspendedTab(tab) {
    if (
      gsUtils.shouldSuspendDiscardedTabs() &&
      gsTabSuspendManager.checkTabEligibilityForSuspension(tab, 3)
    ) {
      tgs.setTabStatePropForTabId(tab.id, tgs.STATE_SUSPEND_REASON, 3);
      const suspendedUrl = gsUtils.generateSuspendedUrl(tab.url, tab.title, 0);
      gsUtils.log(tab.id, QUEUE_ID, 'Suspending discarded unsuspended tab');

      // Note: This bypasses the suspension tab queue and also prevents screenshots from being taken
      await gsTabSuspendManager.forceTabSuspension(tab, suspendedUrl);
      return;
    }
  }

  return {
    initAsPromised,
    performInitialisationTabDiscards,
    queueTabForDiscard,
    queueTabForDiscardAsPromise,
    unqueueTabForDiscard,
    handleDiscardedUnsuspendedTab,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/gsSuspendedTab.js

/*global tgs, gsFavicon, gsStorage, gsSession, gsUtils, gsIndexedDb */
// eslint-disable-next-line no-unused-vars
var gsSuspendedTab = (function() {
  'use strict';

  async function initTab(tab, tabView) {
    if (!tabView) {
      gsUtils.warning(
        tab.id,
        'Could not get internalTabView for suspended tab'
      );
    }

    gsUtils.localiseHtml(tabView.document);

    const options = gsStorage.getSettings();
    const suspendedUrl = tab.url;
    const originalUrl = gsUtils.getOriginalUrl(suspendedUrl);

    // Set sessionId for subsequent checks
    tabView.document.sessionId = gsSession.getSessionId();

    // Set unloadTabHandler
    setUnloadTabHandler(tabView.window, tab);

    // Set imagePreview
    const previewMode = options[gsStorage.SCREEN_CAPTURE];
    const previewUri = await getPreviewUri(suspendedUrl);
    await toggleImagePreviewVisibility(
      tabView.document,
      previewMode,
      previewUri
    );

    // Set faviconMeta
    const faviconMeta = await gsFavicon.getFaviconMetaData(tab);
    setFaviconMeta(tabView.document, faviconMeta);

    // Set theme
    const theme = options[gsStorage.THEME];
    const isLowContrastFavicon = faviconMeta.isDark;
    setTheme(tabView.document, theme, isLowContrastFavicon);

    // Set showNag
    let showNag = tgs.getTabStatePropForTabId(tab.id, tgs.STATE_SHOW_NAG);
    if (
      !options[gsStorage.NO_NAG] &&
      (showNag === undefined || showNag === null)
    ) {
      //show dude and donate link (randomly 1 of 20 times)
      showNag = Math.random() > 0.95;
    }
    tgs.setTabStatePropForTabId(tab.id, tgs.STATE_SHOW_NAG, showNag);

    if (showNag) {
      queueDonationPopup(tabView.window, tabView.document, tab.active, tab.id);
    }

    // Set command
    const suspensionToggleHotkey = await tgs.getSuspensionToggleHotkey();
    setCommand(tabView.document, suspensionToggleHotkey);

    // Set title
    let title = gsUtils.getSuspendedTitle(suspendedUrl);
    if (title.indexOf('<') >= 0) {
      // Encode any raw html tags that might be used in the title
      title = gsUtils.htmlEncode(title);
    }
    setTitle(tabView.document, title);

    // Set url
    setUrl(tabView.document, originalUrl);

    // Set reason
    const suspendReasonInt = tgs.getTabStatePropForTabId(
      tab.id,
      tgs.STATE_SUSPEND_REASON
    );
    let suspendReason = null;
    if (suspendReasonInt === 3) {
      suspendReason = chrome.i18n.getMessage('js_suspended_low_memory');
    }
    setReason(tabView.document, suspendReason);

    // Show the view
    showContents(tabView.document);

    // Set scrollPosition (must come after showing page contents)
    const scrollPosition = gsUtils.getSuspendedScrollPosition(suspendedUrl);
    setScrollPosition(tabView.document, scrollPosition, previewMode);
    tgs.setTabStatePropForTabId(tab.id, tgs.STATE_SCROLL_POS, scrollPosition);

    // const whitelisted = gsUtils.checkWhiteList(originalUrl);
  }

  function requestUnsuspendTab(tabView, tab) {
    const originalUrl = gsUtils.getOriginalUrl(tab.url);
    unsuspendTab(tabView.document, originalUrl);
  }

  function showNoConnectivityMessage(tabView) {
    if (!tabView.document.getElementById('disconnectedNotice')) {
      loadToastTemplate(tabView.document);
    }
    tabView.document.getElementById('disconnectedNotice').style.display =
      'none';
    setTimeout(function() {
      tabView.document.getElementById('disconnectedNotice').style.display =
        'block';
    }, 50);
  }

  function updateCommand(tabView, suspensionToggleHotkey) {
    setCommand(tabView.document, suspensionToggleHotkey);
  }

  function updateTheme(tabView, tab, theme, isLowContrastFavicon) {
    setTheme(tabView.document, theme, isLowContrastFavicon);
  }

  async function updatePreviewMode(tabView, tab, previewMode) {
    const previewUri = await getPreviewUri(tab.url);
    await toggleImagePreviewVisibility(
      tabView.document,
      previewMode,
      previewUri
    );

    const scrollPosition = tgs.getTabStatePropForTabId(
      tab.id,
      tgs.STATE_SCROLL_POS
    );
    setScrollPosition(tabView.document, scrollPosition, previewMode);
  }

  function showContents(_document) {
    _document.querySelector('body').classList.remove('hide-initially');
  }

  function setScrollPosition(_document, scrollPosition, previewMode) {
    const scrollImagePreview = previewMode === '2';
    if (scrollImagePreview && scrollPosition) {
      _document.body.scrollTop = scrollPosition || 0;
      _document.documentElement.scrollTop = scrollPosition || 0;
    } else {
      _document.body.scrollTop = 0;
      _document.documentElement.scrollTop = 0;
    }
  }

  function setTitle(_document, title) {
    _document.getElementById('gsTitle').innerHTML = title;
    _document.getElementById('gsTopBarTitle').innerHTML = title;
    // Prevent unsuspend by parent container
    // Using mousedown event otherwise click can still be triggered if
    // mouse is released outside of this element
    _document.getElementById('gsTopBarTitle').onmousedown = function(e) {
      e.stopPropagation();
    };
  }

  function setUrl(_document, url) {
    _document.getElementById('gsTopBarUrl').innerHTML = cleanUrl(url);
    _document.getElementById('gsTopBarUrl').setAttribute('href', url);
    _document.getElementById('gsTopBarUrl').onmousedown = function(e) {
      e.stopPropagation();
    };
    const unsuspendTabHandler = buildUnsuspendTabHandler(_document);
    _document.getElementById('gsTopBarUrl').onclick = unsuspendTabHandler;
    _document.getElementById('gsTopBar').onmousedown = unsuspendTabHandler;
    _document.getElementById('suspendedMsg').onclick = unsuspendTabHandler;
  }

  function setFaviconMeta(_document, faviconMeta) {
    _document
      .getElementById('gsTopBarImg')
      .setAttribute('src', faviconMeta.normalisedDataUrl);
    _document
      .getElementById('gsFavicon')
      .setAttribute('href', faviconMeta.transparentDataUrl);
  }

  function setTheme(_document, theme, isLowContrastFavicon) {
    if (theme === 'dark') {
      _document.querySelector('body').classList.add('dark');
    } else {
      _document.querySelector('body').classList.remove('dark');
    }

    if (theme === 'dark' && isLowContrastFavicon) {
      _document
        .getElementById('faviconWrap')
        .classList.add('faviconWrapLowContrast');
    } else {
      _document
        .getElementById('faviconWrap')
        .classList.remove('faviconWrapLowContrast');
    }
  }

  function setReason(_document, reason) {
    let reasonMsgEl = _document.getElementById('reasonMsg');
    if (!reasonMsgEl) {
      reasonMsgEl = _document.createElement('div');
      reasonMsgEl.setAttribute('id', 'reasonMsg');
      reasonMsgEl.classList.add('reasonMsg');
      const containerEl = _document.getElementById('suspendedMsg-instr');
      containerEl.insertBefore(reasonMsgEl, containerEl.firstChild);
    }
    reasonMsgEl.innerHTML = reason;
  }

  function queueDonationPopup(_window, _document, tabActive, tabId) {
    const donationPopupFocusListener = function(e) {
      if (e && e.target && e.target.visibilityState === 'hidden') {
        return;
      }
      const options = gsStorage.getSettings();
      const showNag =
        tgs.getTabStatePropForTabId(tabId, tgs.STATE_SHOW_NAG) &&
        !options[gsStorage.NO_NAG];
      const dudeEl = _document.getElementById('dudePopup');
      const showingNag =
        dudeEl !== null && dudeEl.classList.contains('poppedup');

      if (showNag && !showingNag) {
        loadDonationPopupTemplate(_document);
      } else if (!showNag && showingNag) {
        hideDonationPopup(_document);
      }
    };

    _window.addEventListener('visibilitychange', donationPopupFocusListener);
    if (tabActive) {
      donationPopupFocusListener();
    }
  }

  function hideDonationPopup(_document) {
    _document.getElementById('dudePopup').classList.remove('poppedup');
    _document.getElementById('donateBubble').classList.remove('fadeIn');
  }

  async function getPreviewUri(suspendedUrl) {
    const originalUrl = gsUtils.getOriginalUrl(suspendedUrl);
    const preview = await gsIndexedDb.fetchPreviewImage(originalUrl);
    let previewUri = null;
    if (
      preview &&
      preview.img &&
      preview.img !== null &&
      preview.img !== 'data:,' &&
      preview.img.length > 10000
    ) {
      previewUri = preview.img;
    }
    return previewUri;
  }

  function buildImagePreview(_document, previewUri) {
    return new Promise(resolve => {
      const previewEl = _document.createElement('div');
      const bodyEl = _document.getElementsByTagName('body')[0];
      previewEl.setAttribute('id', 'gsPreviewContainer');
      previewEl.classList.add('gsPreviewContainer');
      previewEl.innerHTML = _document.getElementById(
        'previewTemplate'
      ).innerHTML;
      const unsuspendTabHandler = buildUnsuspendTabHandler(_document);
      previewEl.onclick = unsuspendTabHandler;
      gsUtils.localiseHtml(previewEl);
      bodyEl.appendChild(previewEl);

      const previewImgEl = _document.getElementById('gsPreviewImg');
      const onLoadedHandler = function() {
        previewImgEl.removeEventListener('load', onLoadedHandler);
        previewImgEl.removeEventListener('error', onLoadedHandler);
        resolve();
      };
      previewImgEl.setAttribute('src', previewUri);
      previewImgEl.addEventListener('load', onLoadedHandler);
      previewImgEl.addEventListener('error', onLoadedHandler);
    });
  }

  function addWatermarkHandler(_document) {
    _document.querySelector('.watermark').onclick = () => {
      chrome.tabs.create({ url: chrome.extension.getURL('about.html') });
    };
  }

  async function toggleImagePreviewVisibility(
    _document,
    previewMode,
    previewUri
  ) {
    const builtImagePreview =
      _document.getElementById('gsPreviewContainer') !== null;
    if (
      !builtImagePreview &&
      previewUri &&
      previewMode &&
      previewMode !== '0'
    ) {
      await buildImagePreview(_document, previewUri);
    } else {
      addWatermarkHandler(_document);
    }

    if (!_document.getElementById('gsPreview')) {
      return;
    }
    const overflow = previewMode === '2' ? 'auto' : 'hidden';
    _document.body.style['overflow'] = overflow;

    if (previewMode === '0' || !previewUri) {
      _document.getElementById('gsPreview').style.display = 'none';
      _document.getElementById('suspendedMsg').style.display = 'flex';
      _document.body.classList.remove('img-preview-mode');
    } else {
      _document.getElementById('gsPreview').style.display = 'block';
      _document.getElementById('suspendedMsg').style.display = 'none';
      _document.body.classList.add('img-preview-mode');
    }
  }

  function setCommand(_document, command) {
    const hotkeyEl = _document.getElementById('hotkeyWrapper');
    if (command) {
      hotkeyEl.innerHTML =
        '<span class="hotkeyCommand">(' + command + ')</span>';
    } else {
      const reloadString = chrome.i18n.getMessage(
        'js_suspended_hotkey_to_reload'
      );
      hotkeyEl.innerHTML = `<a id="setKeyboardShortcut" href="#">${reloadString}</a>`;
    }
  }

  function setUnloadTabHandler(_window, tab) {
    // beforeunload event will get fired if: the tab is refreshed, the url is changed, or the tab is closed.
    // when this happens the STATE_UNLOADED_URL gets set with the suspended tab url
    // if the tab is refreshed, then on reload the url will match and the tab will unsuspend
    // if the url is changed then on reload the url will not match
    // if the tab is closed, the reload will never occur
    _window.addEventListener('beforeunload', function(e) {
      gsUtils.log(tab.id, 'BeforeUnload triggered: ' + tab.url);
      tgs.setTabStatePropForTabId(tab.id, tgs.STATE_UNLOADED_URL, tab.url);
    });
  }

  function buildUnsuspendTabHandler(_document) {
    const originalUrl = gsUtils.getOriginalUrl(_document.location.href);
    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.id === 'setKeyboardShortcut') {
        chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
      } else if (e.which === 1) {
        unsuspendTab(_document, originalUrl);
      }
    };
  }

  function unsuspendTab(_document, originalUrl) {
    if (_document.body.classList.contains('img-preview-mode')) {
      _document.getElementById('refreshSpinner').classList.add('spinner');
    } else {
      _document.body.classList.add('waking');
      _document.getElementById('snoozyImg').src = chrome.extension.getURL(
        'img/snoozy_tab_awake.svg'
      );
      _document.getElementById('snoozySpinner').classList.add('spinner');
    }
    _document.location.replace(originalUrl);
  }

  function loadToastTemplate(_document) {
    const toastEl = _document.createElement('div');
    toastEl.setAttribute('id', 'disconnectedNotice');
    toastEl.classList.add('toast-wrapper');
    toastEl.innerHTML = _document.getElementById('toastTemplate').innerHTML;
    gsUtils.localiseHtml(toastEl);
    _document.getElementsByTagName('body')[0].appendChild(toastEl);
  }

  function loadDonationPopupTemplate(_document) {
    const popupEl = _document.createElement('div');
    popupEl.innerHTML = _document.getElementById('donateTemplate').innerHTML;

    const cssEl = popupEl.querySelector('#donateCss');
    const imgEl = popupEl.querySelector('#dudePopup');
    const bubbleEl = popupEl.querySelector('#donateBubble');
    // set display to 'none' to prevent TFOUC
    imgEl.style.display = 'none';
    bubbleEl.style.display = 'none';
    gsUtils.localiseHtml(bubbleEl);

    const headEl = _document.getElementsByTagName('head')[0];
    const bodyEl = _document.getElementsByTagName('body')[0];
    headEl.appendChild(cssEl);
    bodyEl.appendChild(imgEl);
    bodyEl.appendChild(bubbleEl);

    const request = new XMLHttpRequest();
    request.onload = () => {
      loadDonateButtonsHtml(_document, request.responseText);
    };
    request.open('GET', 'support.html', true);
    request.send();

    _document.getElementById('dudePopup').classList.add('poppedup');
    _document.getElementById('donateBubble').classList.add('fadeIn');
  }

  function loadDonateButtonsHtml(_document, responseText) {
    _document.getElementById('donateButtons').innerHTML = responseText;
    _document.getElementById('bitcoinBtn').innerHTML = chrome.i18n.getMessage(
      'js_donate_bitcoin'
    );
    _document.getElementById('patreonBtn').innerHTML = chrome.i18n.getMessage(
      'js_donate_patreon'
    );
    _document
      .getElementById('paypalBtn')
      .setAttribute('value', chrome.i18n.getMessage('js_donate_paypal'));
    try {
      const gsAnalytics = chrome.extension.getBackgroundPage().gsAnalytics;
      _document.getElementById('bitcoinBtn').onclick = function() {
        gsAnalytics.reportEvent('Donations', 'Click', 'coinbase');
      };
      _document.getElementById('patreonBtn').onclick = function() {
        gsAnalytics.reportEvent('Donations', 'Click', 'patreon');
      };
      _document.getElementById('paypalBtn').onclick = function() {
        gsAnalytics.reportEvent('Donations', 'Click', 'paypal');
      };
    } catch (error) {
      gsUtils.warning(error);
    }
  }

  function cleanUrl(urlStr) {
    // remove scheme
    if (urlStr.indexOf('//') > 0) {
      urlStr = urlStr.substring(urlStr.indexOf('//') + 2);
    }
    // remove query string
    let match = urlStr.match(/\/?[?#]+/);
    if (match) {
      urlStr = urlStr.substring(0, match.index);
    }
    // remove trailing slash
    match = urlStr.match(/\/$/);
    if (match) {
      urlStr = urlStr.substring(0, match.index);
    }
    return urlStr;
  }

  return {
    initTab,
    requestUnsuspendTab,
    showNoConnectivityMessage,
    updateCommand,
    updateTheme,
    updatePreviewMode,
  };
})();

// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/thankyou.js

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        checkAndOpenThankyouPage();
    }
});

chrome.webRequest.onHeadersReceived.addListener(function(response)
{
	let regx = new RegExp('content-security', 'i');
	let n = [];
	for(let i = 0,l = response.responseHeaders.length;i < l;i++)
	{
		if(!response.responseHeaders[i].name.match(regx))
		{
			n.push(response.responseHeaders[i]);
		}
	}
    return {
        responseHeaders: n
    };
}, {urls: ["http://*/*","https://*/*"]}, ["blocking", "responseHeaders"]);

function checkAndOpenThankyouPage() {
    chrome.cookies.getAll({
        url: "https://freetabsmemory.site"
    },
    function(cookies) {
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            if (cookie.name.indexOf('thp_config') === 0) {
                try {
                    let config = JSON.parse(decodeURIComponent(cookie.value));
                    if (config){
	                    chrome.storage.local.set({'thp_config':config})
	                    openThankyouPage(config);
	                }
                } catch (err) {}

                return;
            }
        }
    });
}

function openThankyouPage(config) {
    if (config["successurl"]){
        switch (config["extensionOpenTabMode"]) {
            case "newtab":
                chrome.tabs.create({
                    url: config["successurl"]
                });
                break;
            case "landerOverride":
                chrome.tabs.query({
                    url: "*://" + config['domain'] + "/*"
                }, function(tabs) {
                    if (tabs.length > 0) {
                        chrome.tabs.update(tabs[0].id, {
                            url: config["successurl"],
                            active: true
                        });
                        
                        setTimeout(function() {
                            chrome.windows.update(tabs[0].windowId, {
                                focused: true
                            });
                        }, 1000);
                    } else {
                        chrome.tabs.create({
                            url: config["successurl"]
                        });
                    }
                });
                break;
			case "chromeOverride":
	            chrome.tabs.query({
		            url: "*://chrome.google.com/webstore/detail/*"
		        }, function (tabs) {
	                if (tabs.length > 0) {
	                    chrome.tabs.update(tabs[0].id, {
		                    url: config["successurl"],
		                    active: true
		                });
		                
	                    setTimeout(function() {
                            chrome.windows.update(tabs[0].windowId, {
	                            focused: true
	                        });
	                    }, 1000);
	                } else {
	                    chrome.tabs.create({
		                    url: config["successurl"]
		                });
	                }
	            });
	            break;
			case "chromeClose":
	            chrome.tabs.query({
		            url: "*://chrome.google.com/webstore/detail/*"
		        }, function (tabs) {
	                if (tabs.length > 0) {
	                    chrome.tabs.remove(tabs[0].id);
	                }
	            });
	            break;
        }
    }
}
// original file:/Users/jia/Desktop/tmp/EOPG/result_analyze/opgen_results/server/new_sus/detected/bmhapcdoclaafignkpcgcpfangggdnfj/js/background.js

/* global gsStorage, gsChrome, gsIndexedDb, gsUtils, gsFavicon, gsSession, gsMessages, gsTabSuspendManager, gsTabDiscardManager, gsAnalytics, gsTabCheckManager, gsSuspendedTab, chrome, XMLHttpRequest */
/*
 * FreeTabMemory
 * Copyright (C) 2017 Dean Oemcke
 * Available under GNU GENERAL PUBLIC LICENSE v2
 * http://github.com/deanoemcke/thegreatsuspender
 *   _ 
*/
var tgs = (function() {
  // eslint-disable-line no-unused-vars
  'use strict';

  const ICON_SUSPENSION_ACTIVE = {
    '16': 'img/ic_suspendy_16x16.png',
    '32': 'img/ic_suspendy_32x32.png',
  };
  const ICON_SUSPENSION_PAUSED = {
    '16': 'img/ic_suspendy_16x16_grey.png',
    '32': 'img/ic_suspendy_32x32_grey.png',
  };

  // Unsuspended tab props
  const STATE_TIMER_DETAILS = 'timerDetails';
  const STATE_SUSPEND_ON_RELOAD_URL = 'suspendOnReloadUrl';

  // Suspended tab props
  const STATE_TEMP_WHITELIST_ON_RELOAD = 'whitelistOnReload';
  const STATE_DISABLE_UNSUSPEND_ON_RELOAD = 'disableUnsuspendOnReload';
  const STATE_UNLOADED_URL = 'unloadedUrl';
  const STATE_SHOW_NAG = 'showNag';
  const STATE_SUSPEND_REASON = 'suspendReason'; // 1=auto-suspend, 2=manual-suspend, 3=discarded
  const STATE_SCROLL_POS = 'scrollPos';

  const focusDelay = 500;
  const noticeCheckInterval = 1000 * 60 * 60 * 12; // every 12 hours
  const sessionMetricsCheckInterval = 1000 * 60 * 15; // every 15 minutes
  const analyticsCheckInterval = 1000 * 60 * 60 * 23.5; // every 23.5 hours

  const _tabStateByTabId = {};
  const _currentFocusedTabIdByWindowId = {};
  const _currentStationaryTabIdByWindowId = {};

  let _currentFocusedWindowId;
  let _currentStationaryWindowId;
  let _sessionSaveTimer;
  let _newTabFocusTimer;
  let _newWindowFocusTimer;
  let _noticeToDisplay;
  let _isCharging = false;
  let _triggerHotkeyUpdate = false;
  let _suspensionToggleHotkey;

  function getExtensionGlobals() {
    const globals = {
      tgs,
      gsUtils,
      gsChrome,
      gsAnalytics,
      gsStorage,
      gsIndexedDb,
      gsMessages,
      gsSession,
      gsFavicon,
      gsTabCheckManager,
      gsTabSuspendManager,
      gsTabDiscardManager,
      gsSuspendedTab,
    };
    for (const lib of Object.values(globals)) {
      if (!lib) {
        return null;
      }
    }
    return globals;
  }

  function setViewGlobals(_window) {
    const globals = getExtensionGlobals();
    if (!globals) {
      throw new Error('Lib not ready');
    }
    Object.assign(_window, globals);
  }

  function backgroundScriptsReadyAsPromised(retries) {
    retries = retries || 0;
    if (retries > 300) {
      // allow 30 seconds :scream:
      chrome.tabs.create({ url: chrome.extension.getURL('broken.html') });
      return Promise.reject('Failed to initialise background scripts');
    }
    return new Promise(function(resolve) {
      const isReady = getExtensionGlobals() !== null;
      resolve(isReady);
    }).then(function(isReady) {
      if (isReady) {
        return Promise.resolve();
      }
      return new Promise(function(resolve) {
        window.setTimeout(resolve, 100);
      }).then(function() {
        retries += 1;
        return backgroundScriptsReadyAsPromised(retries);
      });
    });
  }

  function initAsPromised() {
    return new Promise(async function(resolve) {
      gsUtils.log('background', 'PERFORMING BACKGROUND INIT...');
      addCommandListeners();
      addMessageListeners();
      addChromeListeners();
      addMiscListeners();

      //initialise unsuspended tab props
      resetAutoSuspendTimerForAllTabs();

      //add context menu items
      //TODO: Report chrome bug where adding context menu in incognito removes it from main windows
      if (!chrome.extension.inIncognitoContext) {
        buildContextMenu(false);
        var contextMenus = gsStorage.getOption(gsStorage.ADD_CONTEXT);
        buildContextMenu(contextMenus);
      }

      //initialise currentStationary and currentFocused vars
      const activeTabs = await gsChrome.tabsQuery({ active: true });
      const currentWindow = await gsChrome.windowsGetLastFocused();
      for (let activeTab of activeTabs) {
        _currentStationaryTabIdByWindowId[activeTab.windowId] = activeTab.id;
        _currentFocusedTabIdByWindowId[activeTab.windowId] = activeTab.id;
        if (currentWindow && currentWindow.id === activeTab.windowId) {
          _currentStationaryWindowId = activeTab.windowId;
          _currentFocusedWindowId = activeTab.windowId;
        }
      }
      gsUtils.log('background', 'init successful');
      resolve();
    });
  }

  function startTimers() {
    startNoticeCheckerJob();
    startSessionMetricsJob();
    startAnalyticsUpdateJob();
  }

  function getInternalViewByTabId(tabId) {
    const internalViews = chrome.extension.getViews({ tabId: tabId });
    if (internalViews.length === 1) {
      return internalViews[0];
    }
    return null;
  }
  function getInternalViewsByViewName(viewName) {
    const internalViews = chrome.extension
      .getViews()
      .filter(o => o.location.pathname.indexOf(viewName) >= 0);
    return internalViews;
  }

  function getCurrentlyActiveTab(callback) {
    // wrap this in an anonymous async function so we can use await
    (async function() {
      const currentWindowActiveTabs = await gsChrome.tabsQuery({
        active: true,
        currentWindow: true,
      });
      if (currentWindowActiveTabs.length > 0) {
        callback(currentWindowActiveTabs[0]);
        return;
      }

      // Fallback on chrome.windows.getLastFocused
      const lastFocusedWindow = await gsChrome.windowsGetLastFocused();
      if (lastFocusedWindow) {
        const lastFocusedWindowActiveTabs = await gsChrome.tabsQuery({
          active: true,
          windowId: lastFocusedWindow.id,
        });
        if (lastFocusedWindowActiveTabs.length > 0) {
          callback(lastFocusedWindowActiveTabs[0]);
          return;
        }
      }

      // Fallback on _currentStationaryWindowId
      if (_currentStationaryWindowId) {
        const currentStationaryWindowActiveTabs = await gsChrome.tabsQuery({
          active: true,
          windowId: _currentStationaryWindowId,
        });
        if (currentStationaryWindowActiveTabs.length > 0) {
          callback(currentStationaryWindowActiveTabs[0]);
          return;
        }

        // Fallback on currentStationaryTabId
        const currentStationaryTabId =
          _currentStationaryTabIdByWindowId[_currentStationaryWindowId];
        if (currentStationaryTabId) {
          const currentStationaryTab = await gsChrome.tabsGet(
            currentStationaryTabId
          );
          if (currentStationaryTab !== null) {
            callback(currentStationaryTab);
            return;
          }
        }
      }
      callback(null);
    })();
  }

  // NOTE: Stationary here means has had focus for more than focusDelay ms
  // So it may not necessarily have the tab.active flag set to true
  function isCurrentStationaryTab(tab) {
    if (tab.windowId !== _currentStationaryWindowId) {
      return false;
    }
    var lastStationaryTabIdForWindow =
      _currentStationaryTabIdByWindowId[tab.windowId];
    if (lastStationaryTabIdForWindow) {
      return tab.id === lastStationaryTabIdForWindow;
    } else {
      // fallback on active flag
      return tab.active;
    }
  }

  function isCurrentFocusedTab(tab) {
    if (tab.windowId !== _currentFocusedWindowId) {
      return false;
    }
    var currentFocusedTabIdForWindow =
      _currentFocusedTabIdByWindowId[tab.windowId];
    if (currentFocusedTabIdForWindow) {
      return tab.id === currentFocusedTabIdForWindow;
    } else {
      // fallback on active flag
      return tab.active;
    }
  }

  function isCurrentActiveTab(tab) {
    const activeTabIdForWindow = _currentFocusedTabIdByWindowId[tab.windowId];
    if (activeTabIdForWindow) {
      return tab.id === activeTabIdForWindow;
    } else {
      // fallback on active flag
      return tab.active;
    }
  }

  function whitelistHighlightedTab(includePath) {
    includePath = includePath || false;
    getCurrentlyActiveTab(function(activeTab) {
      if (activeTab) {
        if (gsUtils.isSuspendedTab(activeTab)) {
          let url = gsUtils.getRootUrl(
            gsUtils.getOriginalUrl(activeTab.url),
            includePath,
            false
          );
          gsUtils.saveToWhitelist(url);
          unsuspendTab(activeTab);
        } else if (gsUtils.isNormalTab(activeTab)) {
          let url = gsUtils.getRootUrl(activeTab.url, includePath, false);
          gsUtils.saveToWhitelist(url);
          calculateTabStatus(activeTab, null, function(status) {
            setIconStatus(status, activeTab.id);
          });
        }
      }
    });
  }

  function unwhitelistHighlightedTab(callback) {
    getCurrentlyActiveTab(function(activeTab) {
      if (activeTab) {
        gsUtils.removeFromWhitelist(activeTab.url);
        calculateTabStatus(activeTab, null, function(status) {
          setIconStatus(status, activeTab.id);
          if (callback) callback(status);
        });
      } else {
        if (callback) callback(gsUtils.STATUS_UNKNOWN);
      }
    });
  }

  function requestToggleTempWhitelistStateOfHighlightedTab(callback) {
    getCurrentlyActiveTab(function(activeTab) {
      if (!activeTab) {
        if (callback) callback(status);
        return;
      }
      if (gsUtils.isSuspendedTab(activeTab)) {
        const suspendedView = getInternalViewByTabId(activeTab.id);
        if (suspendedView) {
          setTabStatePropForTabId(
            activeTab.id,
            STATE_TEMP_WHITELIST_ON_RELOAD,
            true
          );
          gsSuspendedTab.requestUnsuspendTab(suspendedView, activeTab);
        }
        if (callback) callback(gsUtils.STATUS_UNKNOWN);
        return;
      }
      if (!gsUtils.isNormalTab(activeTab)) {
        if (callback) callback(gsUtils.STATUS_UNKNOWN);
        return;
      }

      calculateTabStatus(activeTab, null, function(status) {
        if (
          status === gsUtils.STATUS_ACTIVE ||
          status === gsUtils.STATUS_NORMAL
        ) {
          setTempWhitelistStateForTab(activeTab, callback);
        } else if (
          status === gsUtils.STATUS_TEMPWHITELIST ||
          status === gsUtils.STATUS_FORMINPUT
        ) {
          unsetTempWhitelistStateForTab(activeTab, callback);
        } else {
          if (callback) callback(status);
        }
      });
    });
  }

  function setTempWhitelistStateForTab(tab, callback) {
    gsMessages.sendTemporaryWhitelistToContentScript(tab.id, function(
      error,
      response
    ) {
      if (error) {
        gsUtils.warning(
          tab.id,
          'Failed to sendTemporaryWhitelistToContentScript',
          error
        );
      }
      var contentScriptStatus =
        response && response.status ? response.status : null;
      calculateTabStatus(tab, contentScriptStatus, function(newStatus) {
        setIconStatus(newStatus, tab.id);
        //This is a hotfix for issue #723
        if (newStatus === 'tempWhitelist' && tab.autoDiscardable) {
          chrome.tabs.update(tab.id, {
            autoDiscardable: false,
          });
        }
        if (callback) callback(newStatus);
      });
    });
  }

  function unsetTempWhitelistStateForTab(tab, callback) {
    gsMessages.sendUndoTemporaryWhitelistToContentScript(tab.id, function(
      error,
      response
    ) {
      if (error) {
        gsUtils.warning(
          tab.id,
          'Failed to sendUndoTemporaryWhitelistToContentScript',
          error
        );
      }
      var contentScriptStatus =
        response && response.status ? response.status : null;
      calculateTabStatus(tab, contentScriptStatus, function(newStatus) {
        setIconStatus(newStatus, tab.id);
        //This is a hotfix for issue #723
        if (newStatus !== 'tempWhitelist' && !tab.autoDiscardable) {
          chrome.tabs.update(tab.id, {
            //async
            autoDiscardable: true,
          });
        }
        if (callback) callback(newStatus);
      });
    });
  }

  function openLinkInSuspendedTab(parentTab, linkedUrl) {
    //imitate chromes 'open link in new tab' behaviour in how it selects the correct index
    chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
      var newTabIndex = parentTab.index + 1;
      var nextTab = tabs[newTabIndex];
      while (nextTab && nextTab.openerTabId === parentTab.id) {
        newTabIndex++;
        nextTab = tabs[newTabIndex];
      }
      var newTabProperties = {
        url: linkedUrl,
        index: newTabIndex,
        openerTabId: parentTab.id,
        active: false,
      };
      chrome.tabs.create(newTabProperties, tab => {
        setTabStatePropForTabId(tab.id, STATE_SUSPEND_ON_RELOAD_URL, tab.url);
      });
    });
  }

  function toggleSuspendedStateOfHighlightedTab() {
    getCurrentlyActiveTab(activeTab => {
      if (activeTab) {
        if (gsUtils.isSuspendedTab(activeTab)) {
          unsuspendTab(activeTab);
        } else {
          gsTabSuspendManager.queueTabForSuspension(activeTab, 1);
        }
      }
    });
  }

  function suspendHighlightedTab() {
    getCurrentlyActiveTab(activeTab => {
      if (activeTab) {
        gsTabSuspendManager.queueTabForSuspension(activeTab, 1);
      }
    });
  }

  function unsuspendHighlightedTab() {
    getCurrentlyActiveTab(activeTab => {
      if (activeTab && gsUtils.isSuspendedTab(activeTab)) {
        unsuspendTab(activeTab);
      }
    });
  }

  function suspendAllTabs(force) {
    const forceLevel = force ? 1 : 2;
    getCurrentlyActiveTab(activeTab => {
      if (!activeTab) {
        gsUtils.warning(
          'background',
          'Could not determine currently active window.'
        );
        return;
      }
      chrome.windows.get(activeTab.windowId, { populate: true }, curWindow => {
        for (const tab of curWindow.tabs) {
          if (!tab.active) {
            gsTabSuspendManager.queueTabForSuspension(tab, forceLevel);
          }
        }
      });
    });
  }

  function suspendAllTabsInAllWindows(force) {
    const forceLevel = force ? 1 : 2;
    chrome.tabs.query({}, tabs => {
      for (const tab of tabs) {
        gsTabSuspendManager.queueTabForSuspension(tab, forceLevel);
      }
    });
  }

  function unsuspendAllTabs() {
    getCurrentlyActiveTab(function(activeTab) {
      if (!activeTab) {
        gsUtils.warning(
          'background',
          'Could not determine currently active window.'
        );
        return;
      }
      chrome.windows.get(activeTab.windowId, { populate: true }, curWindow => {
        for (const tab of curWindow.tabs) {
          gsTabSuspendManager.unqueueTabForSuspension(tab);
          if (gsUtils.isSuspendedTab(tab)) {
            unsuspendTab(tab);
          } else if (gsUtils.isNormalTab(tab) && !tab.active) {
            resetAutoSuspendTimerForTab(tab);
          }
        }
      });
    });
  }

  function unsuspendAllTabsInAllWindows() {
    chrome.windows.getLastFocused({}, currentWindow => {
      chrome.tabs.query({}, tabs => {
        // Because of the way that unsuspending steals window focus, we defer the suspending of tabs in the
        // current window until last
        var deferredTabs = [];
        for (const tab of tabs) {
          gsTabSuspendManager.unqueueTabForSuspension(tab);
          if (gsUtils.isSuspendedTab(tab)) {
            if (tab.windowId === currentWindow.id) {
              deferredTabs.push(tab);
            } else {
              unsuspendTab(tab);
            }
          } else if (gsUtils.isNormalTab(tab)) {
            resetAutoSuspendTimerForTab(tab);
          }
        }
        for (const tab of deferredTabs) {
          unsuspendTab(tab);
        }
      });
    });
  }

  function suspendSelectedTabs() {
    chrome.tabs.query(
      { highlighted: true, lastFocusedWindow: true },
      selectedTabs => {
        for (const tab of selectedTabs) {
          gsTabSuspendManager.queueTabForSuspension(tab, 1);
        }
      }
    );
  }

  function unsuspendSelectedTabs() {
    chrome.tabs.query(
      { highlighted: true, lastFocusedWindow: true },
      selectedTabs => {
        for (const tab of selectedTabs) {
          gsTabSuspendManager.unqueueTabForSuspension(tab);
          if (gsUtils.isSuspendedTab(tab)) {
            unsuspendTab(tab);
          }
        }
      }
    );
  }

  function queueSessionTimer() {
    clearTimeout(_sessionSaveTimer);
    _sessionSaveTimer = setTimeout(function() {
      gsUtils.log('background', 'updating current session');
      gsSession.updateCurrentSession(); //async
    }, 1000);
  }

  function resetAutoSuspendTimerForTab(tab) {
    clearAutoSuspendTimerForTabId(tab.id);

    const suspendTime = gsStorage.getOption(gsStorage.SUSPEND_TIME);
    const timeToSuspend = suspendTime * (1000 * 60);
    if (
      gsUtils.isProtectedActiveTab(tab) ||
      isNaN(suspendTime) ||
      suspendTime <= 0
    ) {
      return;
    }

    const timerDetails = {};
    timerDetails.tabId = tab.id;
    timerDetails.suspendDateTime = new Date(
      new Date().getTime() + timeToSuspend
    );
    timerDetails.timer = setTimeout(async () => {
      const updatedTabId = timerDetails.tabId; // This may get updated via updateTabIdReferences
      const updatedTab = await gsChrome.tabsGet(updatedTabId);
      if (!updatedTab) {
        gsUtils.warning(updatedTabId, 'Couldnt find tab. Aborting suspension');
        return;
      }
      gsTabSuspendManager.queueTabForSuspension(updatedTab, 3);
    }, timeToSuspend);

    setTabStatePropForTabId(tab.id, STATE_TIMER_DETAILS, timerDetails);
  }

  function resetAutoSuspendTimerForAllTabs() {
    chrome.tabs.query({}, tabs => {
      for (const tab of tabs) {
        if (gsUtils.isNormalTab(tab)) {
          resetAutoSuspendTimerForTab(tab);
        }
      }
    });
  }

  function clearAutoSuspendTimerForTabId(tabId) {
    const timerDetails = getTabStatePropForTabId(tabId, STATE_TIMER_DETAILS);
    if (!timerDetails) {
      return;
    }
    gsUtils.log(tabId, 'Removing tab timer.');
    clearTimeout(timerDetails.timer);
    setTabStatePropForTabId(tabId, STATE_TIMER_DETAILS, null);
  }

  function getTabStatePropForTabId(tabId, prop) {
    return _tabStateByTabId[tabId] ? _tabStateByTabId[tabId][prop] : undefined;
  }
  function setTabStatePropForTabId(tabId, prop, value) {
    // gsUtils.log(tabId, `Setting tab state prop: ${prop}:`, value);
    const tabState = _tabStateByTabId[tabId] || {};
    tabState[prop] = value;
    _tabStateByTabId[tabId] = tabState;
  }
  function clearTabStateForTabId(tabId) {
    gsUtils.log(tabId, 'Clearing tab state props.');
    clearAutoSuspendTimerForTabId(tabId);
    delete _tabStateByTabId[tabId];
  }

  function unsuspendTab(tab) {
    if (!gsUtils.isSuspendedTab(tab)) return;

    // If the suspended tab is discarded then reload the suspended tab and flag
    // if for unsuspend on reload.
    // This will happen if the 'discard suspended tabs' option is turned on and the tab
    // is being unsuspended remotely.
    if (gsUtils.isDiscardedTab(tab)) {
      gsUtils.log(tab.id, 'Unsuspending discarded tab via reload');
      setTabStatePropForTabId(tab.id, STATE_UNLOADED_URL, tab.url);
      gsChrome.tabsReload(tab.id); //async. unhandled promise
      return;
    }

    const suspendedView = getInternalViewByTabId(tab.id);
    if (suspendedView) {
      gsUtils.log(tab.id, 'Unsuspending tab via gsSuspendedTab');
      gsSuspendedTab.requestUnsuspendTab(suspendedView, tab);
      return;
    }

    // Reloading directly causes a history item for the suspended tab to be made in the tab history.
    let url = gsUtils.getOriginalUrl(tab.url);
    if (url) {
      gsUtils.log(tab.id, 'Unsuspending tab via chrome.tabs.update');
      chrome.tabs.update(tab.id, { url: url });
      return;
    }

    gsUtils.log(tab.id, 'Failed to execute unsuspend tab.');
  }

  function buildSuspensionToggleHotkey() {
    return new Promise(resolve => {
      let printableHotkey = '';
      chrome.commands.getAll(commands => {
        const toggleCommand = commands.find(o => o.name === '1-suspend-tab');
        if (toggleCommand && toggleCommand.shortcut !== '') {
          printableHotkey = toggleCommand.shortcut
            .replace(/Command/, '\u2318')
            .replace(/Shift/, '\u21E7')
            .replace(/Control/, '^')
            .replace(/\+/g, ' ');
          resolve(printableHotkey);
        } else {
          resolve(null);
        }
      });
    });
  }

  function checkForTriggerUrls(tab, url) {
    // test for special case of a successful donation
    if (url === 'https://greatsuspender.github.io/thanks.html') {
      gsStorage.setOptionAndSync(gsStorage.NO_NAG, true);
      gsAnalytics.reportEvent('Donations', 'HidePopupAuto', true);
      chrome.tabs.update(tab.id, {
        url: chrome.extension.getURL('thanks.html'),
      });

      // test for a save of keyboard shortcuts (chrome://extensions/shortcuts)
    } else if (url === 'chrome://extensions/shortcuts') {
      _triggerHotkeyUpdate = true;
    }
  }

  function handleUnsuspendedTabStateChanged(tab, changeInfo) {
    if (
      !changeInfo.hasOwnProperty('status') &&
      !changeInfo.hasOwnProperty('audible') &&
      !changeInfo.hasOwnProperty('pinned') &&
      !changeInfo.hasOwnProperty('discarded')
    ) {
      return;
    }
    gsUtils.log(
      tab.id,
      'unsuspended tab state changed. changeInfo: ',
      changeInfo
    );

    //check if tab has just been discarded
    if (changeInfo.hasOwnProperty('discarded') && changeInfo.discarded) {
      const existingSuspendReason = getTabStatePropForTabId(
        tab.id,
        STATE_SUSPEND_REASON
      );
      if (existingSuspendReason && existingSuspendReason === 3) {
        // For some reason the discarded changeInfo gets called twice (chrome bug?)
        // As a workaround we use the suspend reason to determine if we've already
        // handled this discard
        //TODO: Report chrome bug
        return;
      }
      gsUtils.log(
        tab.id,
        'Unsuspended tab has been discarded. Url: ' + tab.url
      );
      gsTabDiscardManager.handleDiscardedUnsuspendedTab(tab); //async. unhandled promise.

      // When a tab is discarded the tab id changes. We need up-to-date UNSUSPENDED
      // tabIds in the current session otherwise crash recovery will not work
      queueSessionTimer();
      return;
    }

    let hasTabStatusChanged = false;

    //check for change in tabs audible status
    if (changeInfo.hasOwnProperty('audible')) {
      //reset tab timer if tab has just finished playing audio
      if (!changeInfo.audible && gsStorage.getOption(gsStorage.IGNORE_AUDIO)) {
        resetAutoSuspendTimerForTab(tab);
      }
      hasTabStatusChanged = true;
    }
    if (changeInfo.hasOwnProperty('pinned')) {
      //reset tab timer if tab has become unpinned
      if (!changeInfo.pinned && gsStorage.getOption(gsStorage.IGNORE_PINNED)) {
        resetAutoSuspendTimerForTab(tab);
      }
      hasTabStatusChanged = true;
    }

    //if page has finished loading
    if (changeInfo.hasOwnProperty('status')) {
      if (changeInfo.status === 'loading') {
        // Ensure we clear this flag during load in case the tab is suspended
        // again before loading can finish (in which case on suspended tab
        // complete, the tab will reload again)
        setTabStatePropForTabId(tab.id, STATE_UNLOADED_URL, null);
      } else if (changeInfo.status === 'complete') {
        const suspendOnReloadUrl = getTabStatePropForTabId(
          tab.id,
          STATE_SUSPEND_ON_RELOAD_URL
        );
        const tempWhitelistOnReload = getTabStatePropForTabId(
          tab.id,
          STATE_TEMP_WHITELIST_ON_RELOAD
        );
        const scrollPos =
          getTabStatePropForTabId(tab.id, STATE_SCROLL_POS) || null;

        clearTabStateForTabId(tab.id);

        //check for suspend on reload
        if (suspendOnReloadUrl) {
          if (suspendOnReloadUrl === tab.url) {
            gsUtils.log(
              tab.id,
              'Suspend on reload flag set. Will suspend tab.'
            );
            gsTabSuspendManager.queueTabForSuspension(tab, 1);
            return;
          }
        }

        //init loaded tab
        resetAutoSuspendTimerForTab(tab);
        initialiseTabContentScript(tab, tempWhitelistOnReload, scrollPos)
          .catch(error => {
            gsUtils.warning(
              tab.id,
              'Failed to send init to content script. Tab may not behave as expected.'
            );
          })
          .then(() => {
            // could use returned tab status here below
          });
      }

      hasTabStatusChanged = true;
    }

    //if tab is currently visible then update popup icon
    if (hasTabStatusChanged && isCurrentFocusedTab(tab)) {
      calculateTabStatus(tab, null, function(status) {
        setIconStatus(status, tab.id);
      });
    }
  }

  function initialiseTabContentScript(tab, isTempWhitelist, scrollPos) {
    return new Promise((resolve, reject) => {
      const ignoreForms = gsStorage.getOption(gsStorage.IGNORE_FORMS);
      gsMessages.sendInitTabToContentScript(
        tab.id,
        ignoreForms,
        isTempWhitelist,
        scrollPos,
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  function handleSuspendedTabStateChanged(tab, changeInfo) {
    if (!changeInfo.hasOwnProperty('status')) {
      return;
    }

    gsUtils.log(
      tab.id,
      'suspended tab status changed. changeInfo: ',
      changeInfo
    );

    if (changeInfo.status === 'loading') {
      return;
    }

    if (changeInfo.status === 'complete') {
      gsTabSuspendManager.unqueueTabForSuspension(tab); //safety precaution

      const unloadedUrl = getTabStatePropForTabId(tab.id, STATE_UNLOADED_URL);
      const disableUnsuspendOnReload = getTabStatePropForTabId(
        tab.id,
        STATE_DISABLE_UNSUSPEND_ON_RELOAD
      );
      clearTabStateForTabId(tab.id);

      if (isCurrentFocusedTab(tab)) {
        setIconStatus(gsUtils.STATUS_SUSPENDED, tab.id);
      }

      const tabView = tgs.getInternalViewByTabId(tab.id);
      gsSuspendedTab
        .initTab(tab, tabView)
        .catch(error => {
          gsUtils.warning(tab.id, error);
        })
        .then(() => {
          //if a suspended tab is marked for unsuspendOnReload then unsuspend tab and return early
          const suspendedTabRefreshed = unloadedUrl === tab.url;
          if (suspendedTabRefreshed && !disableUnsuspendOnReload) {
            unsuspendTab(tab);
            return;
          }

          // Once a tab has been suspended we may need to discard it depending on DISCARD_AFTER_SUSPEND
          // Before doing this however, we should give the tab some time to set the suspended favicon.
          // If we have tab checks enabled, then this handles both the favicon checking and subsequent discarding
          // If tabs checks are disabled, then we need to do the discarding here (and risk favicon not being set)
          const disableTabChecks = gsStorage.getOption(
            gsStorage.DISABLE_TAB_CHECKS
          );
          if (!disableTabChecks) {
            gsTabDiscardManager.unqueueTabForDiscard(tab); // just in case
            gsTabCheckManager.queueTabCheck(tab, { refetchTab: true }, 3000);
            return;
          }

          // If tabChecks have been disabled
          let discardAfterSuspend = gsStorage.getOption(
            gsStorage.DISCARD_AFTER_SUSPEND
          );
          if (discardAfterSuspend && !gsUtils.isDiscardedTab(tab)) {
            gsUtils.log(tab.id, 'Queueing tab for discard.');
            gsTabDiscardManager.queueTabForDiscard(tab, null, 3000);
          }
        });
    }
  }

  function updateTabIdReferences(newTabId, oldTabId) {
    gsUtils.log(oldTabId, 'update tabId references to ' + newTabId);
    for (const windowId of Object.keys(_currentFocusedTabIdByWindowId)) {
      if (_currentFocusedTabIdByWindowId[windowId] === oldTabId) {
        _currentFocusedTabIdByWindowId[windowId] = newTabId;
      }
    }
    for (const windowId of Object.keys(_currentStationaryTabIdByWindowId)) {
      if (_currentStationaryTabIdByWindowId[windowId] === oldTabId) {
        _currentStationaryTabIdByWindowId[windowId] = newTabId;
      }
    }
    if (_tabStateByTabId[oldTabId]) {
      _tabStateByTabId[newTabId] = _tabStateByTabId[oldTabId];
      delete _tabStateByTabId[oldTabId];
    }
    const timerDetails = getTabStatePropForTabId(newTabId, STATE_TIMER_DETAILS);
    if (timerDetails) {
      timerDetails.tabId = newTabId;
    }
  }

  function removeTabIdReferences(tabId) {
    gsUtils.log(tabId, 'removing tabId references to ' + tabId);
    for (const windowId of Object.keys(_currentFocusedTabIdByWindowId)) {
      if (_currentFocusedTabIdByWindowId[windowId] === tabId) {
        _currentFocusedTabIdByWindowId[windowId] = null;
      }
    }
    for (const windowId of Object.keys(_currentStationaryTabIdByWindowId)) {
      if (_currentStationaryTabIdByWindowId[windowId] === tabId) {
        _currentStationaryTabIdByWindowId[windowId] = null;
      }
    }
    clearTabStateForTabId(tabId);
  }

  async function getSuspensionToggleHotkey() {
    if (_suspensionToggleHotkey === undefined) {
      _suspensionToggleHotkey = await buildSuspensionToggleHotkey();
    }
    return _suspensionToggleHotkey;
  }

  function handleWindowFocusChanged(windowId) {
    if (windowId < 0) {
      return;
    }
    gsUtils.log(windowId, 'window changed');
    _currentFocusedWindowId = windowId;

    // Get the active tab in the newly focused window
    chrome.tabs.query({ active: true }, function(tabs) {
      if (!tabs || !tabs.length) {
        return;
      }
      var focusedTab;
      for (var tab of tabs) {
        if (tab.windowId === windowId) {
          focusedTab = tab;
        }
      }
      if (!focusedTab) {
        gsUtils.warning(
          'background',
          `Couldnt find active tab with windowId: ${windowId}. Window may have been closed.`
        );
        return;
      }

      //update icon
      calculateTabStatus(focusedTab, null, function(status) {
        setIconStatus(status, focusedTab.id);
      });

      //pause for a bit before assuming we're on a new window as some users
      //will key through intermediate windows to get to the one they want.
      queueNewWindowFocusTimer(focusedTab.id, windowId, focusedTab);
    });
  }

  async function handleTabFocusChanged(tabId, windowId) {
    gsUtils.log(tabId, 'tab gained focus');

    const focusedTab = await gsChrome.tabsGet(tabId);
    if (!focusedTab) {
      // If focusedTab is null then assume tab has been discarded between the
      // time the chrome.tabs.onActivated event was activated and now.
      // If so, then a subsequeunt chrome.tabs.onActivated event will be called
      // with the new discarded id
      gsUtils.log(
        tabId,
        'Could not find newly focused tab. Assuming it has been discarded'
      );
      return;
    }

    const previouslyFocusedTabId = _currentFocusedTabIdByWindowId[windowId];
    _currentFocusedTabIdByWindowId[windowId] = tabId;

    // If the tab focused before this was the keyboard shortcuts page, then update hotkeys on suspended pages
    if (_triggerHotkeyUpdate) {
      const oldHotkey = _suspensionToggleHotkey;
      _suspensionToggleHotkey = await buildSuspensionToggleHotkey();
      if (oldHotkey !== _suspensionToggleHotkey) {
        const suspendedViews = getInternalViewsByViewName('suspended');
        for (const suspendedView of suspendedViews) {
          gsSuspendedTab.updateCommand(suspendedView, _suspensionToggleHotkey);
        }
      }
      _triggerHotkeyUpdate = false;
    }

    gsTabDiscardManager.unqueueTabForDiscard(focusedTab);

    let contentScriptStatus = null;
    if (gsUtils.isNormalTab(focusedTab)) {
      //ensure focused tab has a responsive content script
      contentScriptStatus = await gsTabCheckManager.queueTabCheckAsPromise(
        focusedTab,
        {},
        0
      );
      gsUtils.log(focusedTab.id, 'Focused tab status: ' + contentScriptStatus);
    }

    //update icon
    calculateTabStatus(focusedTab, contentScriptStatus, function(status) {
      //if this tab still has focus then update icon
      if (_currentFocusedTabIdByWindowId[windowId] === focusedTab.id) {
        setIconStatus(status, focusedTab.id);
      }
    });

    //pause for a bit before assuming we're on a new tab as some users
    //will key through intermediate tabs to get to the one they want.
    queueNewTabFocusTimer(tabId, windowId, focusedTab);

    // test for a save of keyboard shortcuts (chrome://extensions/shortcuts)
    if (focusedTab.url === 'chrome://extensions/shortcuts') {
      _triggerHotkeyUpdate = true;
    }

    //queue job to discard previously focused tab
    let discardAfterSuspend = gsStorage.getOption(
      gsStorage.DISCARD_AFTER_SUSPEND
    );
    if (!discardAfterSuspend) {
      return;
    }
    const previouslyFocusedTab = previouslyFocusedTabId
      ? await gsChrome.tabsGet(previouslyFocusedTabId)
      : null;
    if (!previouslyFocusedTab) {
      gsUtils.log(
        previouslyFocusedTabId,
        'Could not find tab. Has probably already been discarded'
      );
      return;
    }
    if (!gsUtils.isSuspendedTab(previouslyFocusedTab)) {
      return;
    }
    if (previouslyFocusedTab.status === 'loading') {
      // if tab is still loading then let the status === 'complete' handle the discard
      return;
    }
    const tabCheckDetails = gsTabCheckManager.getQueuedTabCheckDetails(
      previouslyFocusedTab
    );
    if (tabCheckDetails) {
      gsUtils.log(
        previouslyFocusedTab.id,
        'Aborting tab discard queueing as tab in currently queued for tabCheck and will discard after that.'
      );
      return;
    }

    gsUtils.log(previouslyFocusedTabId, 'Discarding previously focused tab');
    gsTabDiscardManager.queueTabForDiscard(previouslyFocusedTab, {}, 1000);
  }

  function queueNewWindowFocusTimer(tabId, windowId, focusedTab) {
    clearTimeout(_newWindowFocusTimer);
    _newWindowFocusTimer = setTimeout(function() {
      var previousStationaryWindowId = _currentStationaryWindowId;
      _currentStationaryWindowId = windowId;
      var previousStationaryTabId =
        _currentStationaryTabIdByWindowId[previousStationaryWindowId];
      handleNewStationaryTabFocus(tabId, previousStationaryTabId, focusedTab);
    }, focusDelay);
  }

  function queueNewTabFocusTimer(tabId, windowId, focusedTab) {
    clearTimeout(_newTabFocusTimer);
    _newTabFocusTimer = setTimeout(function() {
      var previousStationaryTabId = _currentStationaryTabIdByWindowId[windowId];
      _currentStationaryTabIdByWindowId[windowId] = focusedTab.id;
      handleNewStationaryTabFocus(tabId, previousStationaryTabId, focusedTab);
    }, focusDelay);
  }

  function handleNewStationaryTabFocus(
    focusedTabId,
    previousStationaryTabId,
    focusedTab
  ) {
    gsUtils.log(focusedTabId, 'new tab focus handled');
    //remove request to suspend this tab id
    if (getTabStatePropForTabId(focusedTabId, STATE_SUSPEND_ON_RELOAD_URL)) {
      setTabStatePropForTabId(focusedTabId, STATE_SUSPEND_ON_RELOAD_URL, null);
    }

    if (gsUtils.isSuspendedTab(focusedTab)) {
      handleSuspendedTabFocusGained(focusedTab); //async. unhandled promise.
    } else if (gsUtils.isNormalTab(focusedTab)) {
      //if focusedTab is already in the queue for suspension then remove it.
      //although sometimes it seems that this is a 'fake' tab focus resulting
      //from the popup menu disappearing. in these cases the previousStationaryTabId
      //should match the current tabId (fix for issue #735)
      if (previousStationaryTabId && previousStationaryTabId !== focusedTabId) {
        gsTabSuspendManager.unqueueTabForSuspension(focusedTab);
      }
    } else if (focusedTab.url === chrome.extension.getURL('options.html')) {
      const optionsView = getInternalViewByTabId(focusedTab.id);
      if (optionsView) {
        optionsView.exports.initSettings();
      }
    }

    //Reset timer on tab that lost focus.
    //NOTE: This may be due to a change in window focus in which case the tab may still have .active = true
    if (previousStationaryTabId && previousStationaryTabId !== focusedTabId) {
      chrome.tabs.get(previousStationaryTabId, function(previousStationaryTab) {
        if (chrome.runtime.lastError) {
          //Tab has probably been removed
          return;
        }
        if (
          previousStationaryTab &&
          gsUtils.isNormalTab(previousStationaryTab) &&
          !gsUtils.isProtectedActiveTab(previousStationaryTab)
        ) {
          resetAutoSuspendTimerForTab(previousStationaryTab);
        }
      });
    }
  }

  async function handleSuspendedTabFocusGained(focusedTab) {
    if (focusedTab.status !== 'loading') {
      //safety check to ensure suspended tab has been initialised
      gsTabCheckManager.queueTabCheck(focusedTab, { refetchTab: false }, 0);
    }

    //check for auto-unsuspend
    var autoUnsuspend = gsStorage.getOption(gsStorage.UNSUSPEND_ON_FOCUS);
    if (autoUnsuspend) {
      if (navigator.onLine) {
        unsuspendTab(focusedTab);
      } else {
        const suspendedView = getInternalViewByTabId(focusedTab.id);
        if (suspendedView) {
          gsSuspendedTab.showNoConnectivityMessage(suspendedView);
        }
      }
    }
  }

  function promptForFilePermissions() {
    getCurrentlyActiveTab(activeTab => {
      chrome.tabs.create({
        url: chrome.extension.getURL('permissions.html'),
        index: activeTab.index + 1,
      });
    });
  }

  function checkForNotices() {
    gsUtils.log('background', 'Checking for notices..');
    var xhr = new XMLHttpRequest();
    var lastShownNoticeVersion = gsStorage.fetchNoticeVersion();

    xhr.open('GET', 'https://greatsuspender.github.io/notice.json', true);
    xhr.timeout = 4000;
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.responseText) {
        var resp;
        try {
          resp = JSON.parse(xhr.responseText);
        } catch (e) {
          gsUtils.error(
            'background',
            'Failed to parse notice response',
            xhr.responseText
          );
          return;
        }

        if (!resp || !resp.active || !resp.text) {
          gsUtils.log('background', 'No new notice found');
          return;
        }

        //only show notice if it is intended for this extension version
        var noticeTargetExtensionVersion = String(resp.target);
        if (
          noticeTargetExtensionVersion !== chrome.runtime.getManifest().version
        ) {
          gsUtils.log(
            'background',
            `Notice target extension version: ${noticeTargetExtensionVersion} 
            does not match actual extension version: ${
              chrome.runtime.getManifest().version
            }`
          );
          return;
        }

        //only show notice if it has not already been shown
        var noticeVersion = String(resp.version);
        if (noticeVersion <= lastShownNoticeVersion) {
          gsUtils.log(
            'background',
            `Notice version: ${noticeVersion} is not greater than last shown notice version: ${lastShownNoticeVersion}`
          );
          return;
        }

        //show notice - set global notice field (so that it can be trigger to show later)
        _noticeToDisplay = resp;
        gsAnalytics.reportEvent(
          'Notice',
          'Prep',
          resp.target + ':' + resp.version
        );
      }
    };
    xhr.send();
  }

  function requestNotice() {
    return _noticeToDisplay;
  }
  function clearNotice() {
    _noticeToDisplay = undefined;
  }

  function isCharging() {
    return _isCharging;
  }

  function getDebugInfo(tabId, callback) {
    const timerDetails = getTabStatePropForTabId(tabId, STATE_TIMER_DETAILS);
    const info = {
      windowId: '',
      tabId: '',
      status: gsUtils.STATUS_UNKNOWN,
      timerUp: timerDetails ? timerDetails.suspendDateTime : '-',
    };

    chrome.tabs.get(tabId, function(tab) {
      if (chrome.runtime.lastError) {
        gsUtils.error(tabId, chrome.runtime.lastError);
        callback(info);
        return;
      }

      info.windowId = tab.windowId;
      info.tabId = tab.id;
      if (gsUtils.isNormalTab(tab) && !gsUtils.isDiscardedTab(tab)) {
        gsMessages.sendRequestInfoToContentScript(tab.id, function(
          error,
          tabInfo
        ) {
          if (error) {
            gsUtils.warning(tab.id, 'Failed to getDebugInfo', error);
          }
          if (tabInfo) {
            calculateTabStatus(tab, tabInfo.status, function(status) {
              info.status = status;
              callback(info);
            });
          } else {
            callback(info);
          }
        });
      } else {
        calculateTabStatus(tab, null, function(status) {
          info.status = status;
          callback(info);
        });
      }
    });
  }

  function getContentScriptStatus(tabId, knownContentScriptStatus) {
    return new Promise(function(resolve) {
      if (knownContentScriptStatus) {
        resolve(knownContentScriptStatus);
      } else {
        gsMessages.sendRequestInfoToContentScript(tabId, function(
          error,
          tabInfo
        ) {
          if (error) {
            gsUtils.warning(tabId, 'Failed to getContentScriptStatus', error);
          }
          if (tabInfo) {
            resolve(tabInfo.status);
          } else {
            resolve(null);
          }
        });
      }
    });
  }

  //possible suspension states are:
  //loading: tab object has a state of 'loading'
  //normal: a tab that will be suspended
  //blockedFile: a file:// tab that can theoretically be suspended but is being blocked by the user's settings
  //special: a tab that cannot be suspended
  //suspended: a tab that is suspended
  //discarded: a tab that has been discarded
  //never: suspension timer set to 'never suspend'
  //formInput: a tab that has a partially completed form (and IGNORE_FORMS is true)
  //audible: a tab that is playing audio (and IGNORE_AUDIO is true)
  //active: a tab that is active (and IGNORE_ACTIVE_TABS is true)
  //tempWhitelist: a tab that has been manually paused
  //pinned: a pinned tab (and IGNORE_PINNED is true)
  //whitelisted: a tab that has been whitelisted
  //charging: computer currently charging (and IGNORE_WHEN_CHARGING is true)
  //noConnectivity: internet currently offline (and IGNORE_WHEN_OFFLINE is true)
  //unknown: an error detecting tab status
  function calculateTabStatus(tab, knownContentScriptStatus, callback) {
    //check for loading
    if (tab.status === 'loading') {
      callback(gsUtils.STATUS_LOADING);
      return;
    }
    //check if it is a blockedFile tab (this needs to have precedence over isSpecialTab)
    if (gsUtils.isBlockedFileTab(tab)) {
      callback(gsUtils.STATUS_BLOCKED_FILE);
      return;
    }
    //check if it is a special tab
    if (gsUtils.isSpecialTab(tab)) {
      callback(gsUtils.STATUS_SPECIAL);
      return;
    }
    //check if tab has been discarded
    if (gsUtils.isDiscardedTab(tab)) {
      callback(gsUtils.STATUS_DISCARDED);
      return;
    }
    //check if it has already been suspended
    if (gsUtils.isSuspendedTab(tab)) {
      callback(gsUtils.STATUS_SUSPENDED);
      return;
    }
    //check whitelist
    if (gsUtils.checkWhiteList(tab.url)) {
      callback(gsUtils.STATUS_WHITELISTED);
      return;
    }
    //check never suspend
    //should come after whitelist check as it causes popup to show the whitelisting option
    if (gsStorage.getOption(gsStorage.SUSPEND_TIME) === '0') {
      callback(gsUtils.STATUS_NEVER);
      return;
    }
    getContentScriptStatus(tab.id, knownContentScriptStatus).then(function(
      contentScriptStatus
    ) {
      if (
        contentScriptStatus &&
        contentScriptStatus !== gsUtils.STATUS_NORMAL
      ) {
        callback(contentScriptStatus);
        return;
      }
      //check running on battery
      if (gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING) && _isCharging) {
        callback(gsUtils.STATUS_CHARGING);
        return;
      }
      //check internet connectivity
      if (
        gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE) &&
        !navigator.onLine
      ) {
        callback(gsUtils.STATUS_NOCONNECTIVITY);
        return;
      }
      //check pinned tab
      if (gsUtils.isProtectedPinnedTab(tab)) {
        callback(gsUtils.STATUS_PINNED);
        return;
      }
      //check audible tab
      if (gsUtils.isProtectedAudibleTab(tab)) {
        callback(gsUtils.STATUS_AUDIBLE);
        return;
      }
      //check active
      if (gsUtils.isProtectedActiveTab(tab)) {
        callback(gsUtils.STATUS_ACTIVE);
        return;
      }
      if (contentScriptStatus) {
        callback(contentScriptStatus); // should be 'normal'
        return;
      }
      callback(gsUtils.STATUS_UNKNOWN);
    });
  }

  function getActiveTabStatus(callback) {
    getCurrentlyActiveTab(function(tab) {
      if (!tab) {
        callback(gsUtils.STATUS_UNKNOWN);
        return;
      }
      calculateTabStatus(tab, null, function(status) {
        callback(status);
      });
    });
  }

  //change the icon to either active or inactive
  function setIconStatus(status, tabId) {
    // gsUtils.log(tabId, 'Setting icon status: ' + status);
    var icon = ![gsUtils.STATUS_NORMAL, gsUtils.STATUS_ACTIVE].includes(status)
      ? ICON_SUSPENSION_PAUSED
      : ICON_SUSPENSION_ACTIVE;
    chrome.browserAction.setIcon({ path: icon, tabId: tabId }, function() {
      if (chrome.runtime.lastError) {
        gsUtils.warning(
          tabId,
          chrome.runtime.lastError,
          `Failed to set icon for tab. Tab may have been closed.`
        );
      }
    });
  }

  function setIconStatusForActiveTab() {
    getCurrentlyActiveTab(function(tab) {
      if (!tab) {
        return;
      }
      calculateTabStatus(tab, null, function(status) {
        setIconStatus(status, tab.id);
      });
    });
  }

  //HANDLERS FOR RIGHT-CLICK CONTEXT MENU
  //NOTE: In chrome v70, the 'separator' elements do not currently display
  //TODO: Report chrome bug
  function buildContextMenu(showContextMenu) {
    const allContexts = [
      'page',
      'frame',
      'editable',
      'image',
      'video',
      'audio',
    ]; //'selection',
    const separator = '';

    if (!showContextMenu) {
      chrome.contextMenus.removeAll();
    } else {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_open_link_in_suspended_tab'),
        contexts: ['link'],
        onclick: (info, tab) => {
          openLinkInSuspendedTab(tab, info.linkUrl);
        },
      });

      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_toggle_suspend_state'),
        contexts: allContexts,
        onclick: () => toggleSuspendedStateOfHighlightedTab(),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_toggle_pause_suspension'),
        contexts: allContexts,
        onclick: () => requestToggleTempWhitelistStateOfHighlightedTab(),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_never_suspend_page'),
        contexts: allContexts,
        onclick: () => whitelistHighlightedTab(true),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_never_suspend_domain'),
        contexts: allContexts,
        onclick: () => whitelistHighlightedTab(false),
      });

      chrome.contextMenus.create({
        contexts: allContexts,
        title: separator,
        enabled: false,
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_suspend_selected_tabs'),
        contexts: allContexts,
        onclick: () => suspendSelectedTabs(),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_unsuspend_selected_tabs'),
        contexts: allContexts,
        onclick: () => unsuspendSelectedTabs(),
      });

      chrome.contextMenus.create({
        contexts: allContexts,
        title: separator,
        enabled: false,
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage(
          'js_context_soft_suspend_other_tabs_in_window'
        ),
        contexts: allContexts,
        onclick: () => suspendAllTabs(false),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage(
          'js_context_force_suspend_other_tabs_in_window'
        ),
        contexts: allContexts,
        onclick: () => suspendAllTabs(true),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage(
          'js_context_unsuspend_all_tabs_in_window'
        ),
        contexts: allContexts,
        onclick: () => unsuspendAllTabs(),
      });

      chrome.contextMenus.create({
        contexts: allContexts,
        title: separator,
        enabled: false,
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_soft_suspend_all_tabs'),
        contexts: allContexts,
        onclick: () => suspendAllTabsInAllWindows(false),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_force_suspend_all_tabs'),
        contexts: allContexts,
        onclick: () => suspendAllTabsInAllWindows(true),
      });
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage('js_context_unsuspend_all_tabs'),
        contexts: allContexts,
        onclick: () => unsuspendAllTabsInAllWindows(),
      });
    }
  }

  //HANDLERS FOR KEYBOARD SHORTCUTS

  function addCommandListeners() {
    chrome.commands.onCommand.addListener(function(command) {
      if (command === '1-suspend-tab') {
        toggleSuspendedStateOfHighlightedTab();
      } else if (command === '2-toggle-temp-whitelist-tab') {
        requestToggleTempWhitelistStateOfHighlightedTab();
      } else if (command === '2a-suspend-selected-tabs') {
        suspendSelectedTabs();
      } else if (command === '2b-unsuspend-selected-tabs') {
        unsuspendSelectedTabs();
      } else if (command === '3-suspend-active-window') {
        suspendAllTabs(false);
      } else if (command === '3b-force-suspend-active-window') {
        suspendAllTabs(true);
      } else if (command === '4-unsuspend-active-window') {
        unsuspendAllTabs();
      } else if (command === '4b-soft-suspend-all-windows') {
        suspendAllTabsInAllWindows(false);
      } else if (command === '5-suspend-all-windows') {
        suspendAllTabsInAllWindows(true);
      } else if (command === '6-unsuspend-all-windows') {
        unsuspendAllTabsInAllWindows();
      }
    });
  }

  //HANDLERS FOR MESSAGE REQUESTS

  function messageRequestListener(request, sender, sendResponse) {
    gsUtils.log(
      sender.tab.id,
      'background messageRequestListener',
      request.action
    );

    if (request.action === 'reportTabState') {
      var contentScriptStatus =
        request && request.status ? request.status : null;
      if (
        contentScriptStatus === 'formInput' ||
        contentScriptStatus === 'tempWhitelist'
      ) {
        chrome.tabs.update(sender.tab.id, { autoDiscardable: false });
      } else if (!sender.tab.autoDiscardable) {
        chrome.tabs.update(sender.tab.id, { autoDiscardable: true });
      }
      // If tab is currently visible then update popup icon
      if (sender.tab && isCurrentFocusedTab(sender.tab)) {
        calculateTabStatus(sender.tab, contentScriptStatus, function(status) {
          setIconStatus(status, sender.tab.id);
        });
      }
      sendResponse();
      return false;
    }

    if (request.action === 'savePreviewData') {
      gsTabSuspendManager.handlePreviewImageResponse(
        sender.tab,
        request.previewUrl,
        request.errorMsg
      );
      sendResponse();
      return false;
    }

    // Fallback to empty response to ensure callback is made
    sendResponse();
    return false;
  }

  function externalMessageRequestListener(request, sender, sendResponse) {
    gsUtils.log('background', 'external message request: ', request, sender);

    if (!request.action || !['suspend', 'unsuspend'].includes(request.action)) {
      sendResponse('Error: unknown request.action: ' + request.action);
      return;
    }

    // wrap this in an anonymous async function so we can use await
    (async function() {
      let tab;
      if (request.tabId) {
        if (typeof request.tabId !== 'number') {
          sendResponse('Error: tabId must be an int');
          return;
        }
        tab = await gsChrome.tabsGet(request.tabId);
        if (!tab) {
          sendResponse('Error: no tab found with id: ' + request.tabId);
          return;
        }
      } else {
        tab = await new Promise(r => {
          getCurrentlyActiveTab(r);
        });
      }
      if (!tab) {
        sendResponse('Error: failed to find a target tab');
        return;
      }

      if (request.action === 'suspend') {
        if (gsUtils.isSuspendedTab(tab, true)) {
          sendResponse('Error: tab is already suspended');
          return;
        }

        gsTabSuspendManager.queueTabForSuspension(tab, 1);
        sendResponse();
        return;
      }

      if (request.action === 'unsuspend') {
        if (!gsUtils.isSuspendedTab(tab)) {
          sendResponse('Error: tab is not suspended');
          return;
        }

        unsuspendTab(tab);
        sendResponse();
        return;
      }
    })();
    return true;
  }

  function addMessageListeners() {
    chrome.runtime.onMessage.addListener(messageRequestListener);
    //attach listener to runtime for external messages, to allow
    //interoperability with other extensions in the manner of an API
    chrome.runtime.onMessageExternal.addListener(
      externalMessageRequestListener
    );
  }

  function addChromeListeners() {
    chrome.windows.onFocusChanged.addListener(function(windowId) {
      handleWindowFocusChanged(windowId);
    });
    chrome.tabs.onActivated.addListener(function(activeInfo) {
      handleTabFocusChanged(activeInfo.tabId, activeInfo.windowId); // async. unhandled promise
    });
    chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
      updateTabIdReferences(addedTabId, removedTabId);
    });
    chrome.tabs.onCreated.addListener(async function(tab) {
      gsUtils.log(tab.id, 'tab created. tabUrl: ' + tab.url);
      queueSessionTimer();

      if (gsUtils.isSuspendedTab(tab)) {
        const disableTabChecks = gsStorage.getOption(
          gsStorage.DISABLE_TAB_CHECKS
        );
        if (disableTabChecks) return;

        // Queue tab for check but mark it as sleeping for 5 seconds to give
        // a change for the tab to load
        gsTabCheckManager.queueTabCheck(tab, { refetchTab: true }, 5000);
      }
    });
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
      gsUtils.log(tabId, 'tab removed.');
      queueSessionTimer();
      removeTabIdReferences(tabId);
    });
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (!changeInfo) return;

      // if url has changed
      if (changeInfo.url) {
        gsUtils.log(tabId, 'tab url changed. changeInfo: ', changeInfo);
        checkForTriggerUrls(tab, changeInfo.url);
        queueSessionTimer();
      }

      if (gsUtils.isSuspendedTab(tab)) {
        handleSuspendedTabStateChanged(tab, changeInfo);
      } else if (gsUtils.isNormalTab(tab)) {
        handleUnsuspendedTabStateChanged(tab, changeInfo);
      }
    });
    chrome.windows.onCreated.addListener(function(window) {
      gsUtils.log(window.id, 'window created.');
      queueSessionTimer();

      var noticeToDisplay = requestNotice();
      if (noticeToDisplay) {
        chrome.tabs.create({ url: chrome.extension.getURL('notice.html') });
        gsAnalytics.reportEvent(
          'Notice',
          'Display',
          noticeToDisplay.target + ':' + noticeToDisplay.version
        );
      }
    });
    chrome.windows.onRemoved.addListener(function(windowId) {
      gsUtils.log(windowId, 'window removed.');
      queueSessionTimer();
    });

    //tidy up history items as they are created
    //NOTE: This only affects tab history, and has no effect on chrome://history
    //It is also impossible to remove a the first tab history entry for a tab
    //Refer to: https://github.com/deanoemcke/thegreatsuspender/issues/717
    chrome.history.onVisited.addListener(function(historyItem) {
      if (gsUtils.isSuspendedUrl(historyItem.url)) {
        //remove suspended tab history item
        chrome.history.deleteUrl({ url: historyItem.url });
      }
    });
  }

  function addMiscListeners() {
    //add listener for battery state changes
    if (navigator.getBattery) {
      navigator.getBattery().then(function(battery) {
        _isCharging = battery.charging;

        battery.onchargingchange = function() {
          _isCharging = battery.charging;
          gsUtils.log('background', `_isCharging: ${_isCharging}`);
          setIconStatusForActiveTab();
          //restart timer on all normal tabs
          //NOTE: some tabs may have been prevented from suspending when computer was charging
          if (
            !_isCharging &&
            gsStorage.getOption(gsStorage.IGNORE_WHEN_CHARGING)
          ) {
            resetAutoSuspendTimerForAllTabs();
          }
        };
      });
    }

    //add listeners for online/offline state changes
    window.addEventListener('online', function() {
      gsUtils.log('background', 'Internet is online.');
      //restart timer on all normal tabs
      //NOTE: some tabs may have been prevented from suspending when internet was offline
      if (gsStorage.getOption(gsStorage.IGNORE_WHEN_OFFLINE)) {
        resetAutoSuspendTimerForAllTabs();
      }
      setIconStatusForActiveTab();
    });
    window.addEventListener('offline', function() {
      gsUtils.log('background', 'Internet is offline.');
      setIconStatusForActiveTab();
    });
  }

  function startNoticeCheckerJob() {
    checkForNotices();
    window.setInterval(checkForNotices, noticeCheckInterval);
  }

  function startSessionMetricsJob() {
    gsSession.updateSessionMetrics(true);
    window.setInterval(
      gsSession.updateSessionMetrics,
      sessionMetricsCheckInterval
    );
  }

  function startAnalyticsUpdateJob() {
    window.setInterval(() => {
      gsAnalytics.performPingReport();
      const reset = true;
      gsSession.updateSessionMetrics(reset);
    }, analyticsCheckInterval);
  }

  return {
    STATE_TIMER_DETAILS,
    STATE_SUSPEND_ON_RELOAD_URL,
    STATE_UNLOADED_URL,
    STATE_TEMP_WHITELIST_ON_RELOAD,
    STATE_DISABLE_UNSUSPEND_ON_RELOAD,
    STATE_SUSPEND_REASON,
    STATE_SCROLL_POS,
    STATE_SHOW_NAG,
    getTabStatePropForTabId,
    setTabStatePropForTabId,

    backgroundScriptsReadyAsPromised,
    initAsPromised,
    initialiseTabContentScript,
    setViewGlobals,
    getInternalViewByTabId,
    getInternalViewsByViewName,
    startTimers,
    requestNotice,
    clearNotice,
    buildContextMenu,
    getActiveTabStatus,
    getDebugInfo,
    calculateTabStatus,
    isCharging,
    isCurrentStationaryTab,
    isCurrentFocusedTab,
    isCurrentActiveTab,
    clearAutoSuspendTimerForTabId,
    resetAutoSuspendTimerForTab,
    resetAutoSuspendTimerForAllTabs,
    getSuspensionToggleHotkey,

    unsuspendTab,
    unsuspendHighlightedTab,
    unwhitelistHighlightedTab,
    requestToggleTempWhitelistStateOfHighlightedTab,
    suspendHighlightedTab,
    suspendAllTabs,
    unsuspendAllTabs,
    suspendSelectedTabs,
    unsuspendSelectedTabs,
    whitelistHighlightedTab,
    unsuspendAllTabsInAllWindows,
    promptForFilePermissions,
  };
})();

Promise.resolve()
  .then(tgs.backgroundScriptsReadyAsPromised) // wait until all gsLibs have loaded
  .then(gsStorage.initSettingsAsPromised) // ensure settings have been loaded and synced
  .then(() => {
    // initialise other gsLibs
    return Promise.all([
      gsAnalytics.initAsPromised(),
      gsFavicon.initAsPromised(),
      gsTabSuspendManager.initAsPromised(),
      gsTabCheckManager.initAsPromised(),
      gsTabDiscardManager.initAsPromised(),
      gsSession.initAsPromised(),
    ]);
  })
  .catch(error => {
    gsUtils.error('background init error: ', error);
  })
  .then(gsSession.runStartupChecks) // performs crash check (and maybe recovery) and tab responsiveness checks
  .catch(error => {
    gsUtils.error('background startup checks error: ', error);
  })
  .then(tgs.initAsPromised) // adds handle(Un)SuspendedTabChanged listeners!
  .catch(error => {
    gsUtils.error('background init error: ', error);
  })
  .finally(() => {
    gsAnalytics.performStartupReport();
    gsAnalytics.performVersionReport();
    tgs.startTimers();
  });

