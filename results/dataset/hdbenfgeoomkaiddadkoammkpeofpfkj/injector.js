/*jslint browser: true, devel: true */
/*global chrome*/

(function () {
  "use strict";

  var s1, s2;

  /* client script */
  s1 = document.createElement('script');
  s1.src = chrome.extension.getURL('client.js');

  /* extension reference to itself */
  s2 = document.createElement('script');
  s2.textContent = '(' + function (window, moduleName, chromeExtensionId) {
    window[moduleName]._extensionId = chromeExtensionId;
    window[moduleName]._type = 'chrome';
  } + ')(window, "SetRNSecurity", "' + chrome.runtime.id + '")';

  /* inject both */
  (document.head || document.documentElement).appendChild(s1);

  s1.onload = function () {
    s1.parentNode.removeChild(s1);
    (document.head || document.documentElement).appendChild(s2);
    s2.onload = function () { s2.parentNode.removeChild(s2); };
  };
}());
