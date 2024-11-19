/*jslint browser: true, devel: true */
/*global chrome*/

(function (window, name) {
  "use strict";

  var minimalVersion = 50;

  var module = {};

  module.version = "1.0.2";
  module._extensionId = null;
  module._type = null;

  var sendMessage = function(req) {
    return new Promise(function(resolve, reject) {

      var chromeVersion = parseInt((/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]);
      if (chromeVersion < minimalVersion) {
        var resp = {};
        resp.type = 'error';
        resp.error = 'Chrome version < ' + minimalVersion;
        resp.data = null;
        reject(resp);
        return;
      }

      chrome.runtime.sendMessage(module._extensionId, req, function (resp) {
        if (resp && resp.type != 'error') {
          resolve(resp);
          return;
        }
        if (resp === undefined) {
          resp = {};
          resp.type = 'error';
          resp.error = 'Cannot communicate with extension';
          resp.data = null;
          if (chrome.runtime.lastError) {
            console.error('Cannot communicate with extension', chrome.runtime.lastError.message);
          }
        }
        reject(resp);
      });

    });
  };

  var proxyRequest = function (url, params, type) {
    var req = {};
    req.method = 'proxyRequest';
    req.params = {url: url, params: params, type: type};

    return sendMessage(req).then(function(result){
      /* got result from proxy, let's unpack it */
      return new Promise(function(resolve, reject) {

        if (result.type != 'result') {
          /* forbidden type? */
          resolve(result);
          return;
        }

        var data = JSON.parse(result.data);
        if (data.type == 'error') {
          reject(data);
        } else {
          if (data.contentType.toLowerCase().indexOf("json") != -1) {
            try {
              data.data = JSON.parse(data.data);
            } catch(err) {}
          }
          resolve(data);
        }
      })
    });
  };

  var sign = function(data, algo) {
    var req = {};
    req.method = "sign";
    req.params = {data: data, algorithm: algo};

    return sendMessage(req).then(function(result) {
      /* got result from signer, let's unpack it */
      if (result.type != 'result') {
          /* forbidden type? */
          return result;
      }

      var data = JSON.parse(result.data);
      return data;
    });
  }

  var signXML = function(data) {
    var req = {};
    req.method = "sign";
    /* only sha1 is supported by http://www.w3.org/TR/xmldsig-core/ */
    req.params = {data: data, xmlSign: true, algorithm: 'sha1'};

    return sendMessage(req).then(function(result) {
      /* got result from signer, let's unpack it */
      if (result.type != 'result') {
          /* forbidden type? */
          return result;
      }

      var data = JSON.parse(result.data);
      return data;
    });
  }

  var getCertificate = function(){
    var req = {};
    req.method = "getCertificate";
    req.params = {};

    return sendMessage(req);
  }

  var getHostVersion = function() {
    var req = {};
    req.method = "version";
    req.params = {};

    return sendMessage(req);
  }

  /* public API */
  module.proxyRequest = proxyRequest;
  module.sign = sign;
  module.signXML = signXML;
  module.getHostVersion = getHostVersion;
  window[name] = module;

})(window, "SetRNSecurity");
