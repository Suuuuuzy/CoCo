/*jslint browser: true, devel: true */
/*global chrome*/

/* GOT FROM:  https://github.com/nfriedly/set-cookie-parser/tree/121842ea246b4ff9ba84836a9120a621faf3968c/ */
var parseSetCookie = (function () {
  'use strict';

  var defaultParseOptions = {
    decodeValues: true
  };

  function extend(target, source) {
    return Object.keys(source).reduce(function (target, key) {
      target[key] = source[key];
      return target;
    }, target);
  }

  function isNonEmptyString(str) {
    return typeof str == 'string' && !!str.trim();
  }

  function parseString(setCookieValue, options) {
    var parts = setCookieValue.split(';').filter(isNonEmptyString);
    var nameValue = parts.shift().split("=");
    var name = nameValue.shift();
    var value = nameValue.join("="); // everything after the first =, joined by a "=" if there was more than one part
    var cookie = {
      name: name, // grab everything before the first =
      value: options.decodeValues ? decodeURIComponent(value) : value // decode cookie value
    };

    parts.forEach(function (part) {
      var sides = part.split("=");
      var key = sides.shift().trimLeft().toLowerCase();
      var value = sides.join("=");
      if (key == "expires") {
        cookie.expires = new Date(value);
      } else if (key == 'max-age') {
        cookie.maxAge = parseInt(value, 10);
      } else if (key == 'secure') {
        cookie.secure = true;
      } else if (key == 'httponly') {
        cookie.httpOnly = true;
      } else {
        cookie[key] = value;
      }
    });

    return cookie;
  }

  function parse(input, options) {
    if (!input) {
      return [];
    }
    if (input.headers) {
      input = input.headers['Set-Cookie'];
    }
    if (!Array.isArray(input)) {
      input = [input];
    }

    var defaultOptions = extend({}, defaultParseOptions);
    if (options) {
      options = extend(defaultOptions, options);
    } else {
      options = defaultOptions;
    }

    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  }

  return parse;

}());

(function () {
  "use strict";
  var hostName = "br.gov.rn.set.host";

  chrome.runtime.onMessageExternal.addListener(function (requestFromWeb, sender, sendResponse) {
    console.debug("Message from client.js", requestFromWeb, sender);
    var request = {};
    request.method = requestFromWeb.method;
    request.params = requestFromWeb.params;
    request.sender = {};
    request.sender.url = sender.url;
    request.sender.title = sender.title;
    request.sender.browser = "Chrome";
    request.sender.userAgent = navigator.userAgent;
    request.data = requestFromWeb.data;

    console.debug("Sending to host", request);
    /* TODO: make this running forever */
    chrome.runtime.sendNativeMessage(hostName, request, function (respFromNative) {
      console.debug("Message from host", respFromNative);
      var resp = {};
      resp.type = null;
      resp.error = null;
      resp.data = null;

      if (respFromNative == null || respFromNative.type === "error") {
        resp.type = "error";
        if (chrome.runtime.lastError) {
          resp.error = "Error while interacting with host, check the logs (extension or host)";
          console.error("Error while interacting with host:", chrome.runtime.lastError.message);
        } else if (respFromNative && respFromNative.error) {
          resp.error = "Host reported an error while processing your request, check the logs (extension or host)";
          resp.exception = respFromNative['exception'];
          console.error("Host reported an error while sending your message", respFromNative['exceptionString']);
        } else {
          resp.error = "Error while sending the message to host, check the logs (extension or host)";
          console.error(resp.error);
        }

      } else {
        resp.data = respFromNative.data;
        resp.type = respFromNative.type;

        /*
         * XXX: hack in order to handler set-cookie header.
         *
         *  *.set.rn.gov.br has a requisite to set cookie on browser
         */

        /* RegEx: https://regex101.com/r/uI7vbl/2 --> match sites like *.set.rn.gov.br and localhost */
        var regex = /^https?:\/\/[^\/]*?\.?(?:set.rn.gov.br|localhost)(?::\d+)?(?:\/|$)/gm;
        try {
          if (request.method == "proxyRequest" && request.params.url.match(regex)) {
            var cookies = parseSetCookie(JSON.parse(resp.data));
            if (cookies) {
              cookies.forEach(function(cookie) {
                cookie.url = request.params.url;
                chrome.cookies.set(cookie, function (setCookie) {
                  if (chrome.runtime.lastError) {
                    console.error("Failed to set a cookie:", chrome.runtime.lastError);
                  }
                  if (setCookie) {
                    console.debug("The cookie has been set successful", setCookie);
                  }
                });
              });
            }
          }
        } catch(err) {
          console.error(err);
        }
      }
      console.debug("Sending to client.js", resp);
      sendResponse(resp);
    });
    return true;
  });
}());
